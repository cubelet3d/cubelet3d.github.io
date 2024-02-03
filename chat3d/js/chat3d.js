let chat3d = null;
const chat3d_data = {
	authenticated: false,
	clientsOnline: 0,
	activeUsers: {},
	uid: "",
};

$(document).on("click", ".chat3d_name", function() {
	let address = $(this).attr("address");
	window.open(`https://etherscan.io/address/${address}`, '_blank');
});

$(document).on("keypress", function (e) {
	if (e.which == 13) {
		handleMessage();
	}
});

$(document).ready(function () {
	$("#chat3d-toggle").on("click", function () {
		if (chat3d == void null) {
			chat3d = new WebSocket("wss://vidyapad.com/chat/");
			
			// Heart beat 
			chat3d.onopen = function () {
				var t = setInterval(function() {
					if (chat3d.readyState != 1) {
						clearInterval(t);
						return;
					}
					chat3d.send(JSON.stringify({"type": "ping"}));
				}, 30000);
			};
			
			chat3d.onmessage = (event) => {
				const data = JSON.parse(event.data);
				//console.log(data); 
				chat3d_data.authenticated = data.authenticated;
				chat3d_data.clientsOnline = data.clientsOnline;
				chat3d_data.activeUsers = data.activeUsers;
				
				// Set uid 
				if(!chat3d_data.uid) {
					chat3d_data.uid = data.uid;
				}

				switch (data.type) {
					case "join":
						$("#chat3d-chat").append(
							`<p class="flex-box flex-center"><span style="color: ${data.color};">${formatAddress(sanitize(
								data.username,
							))}</span> joined!</p>`,
						);
						break;

					case "message":
						if (chat3d_data.authenticated) {
							if ($(".chat3d-sign-wrapper").is(":visible")) {
								$(".chat3d-sign-wrapper").remove();
							}
						}
						let msg;
						if (data.tokenId > 0) {
							// Users with a tokenId get their image from a URL
							msg = `<p style="color: ${data.color}; padding: 5px 0;" class="flex-box"><img src="https://team3d.io/inventory/json/${data.tokenId}.png" style="width: 16px; height: 16px; margin-right: 4px;"/>${formatAddress(sanitize(data.username))}: ${sanitizeAndTransformText(data.msg)}</p>`;
						} else {
							// Users without a tokenId get a blockie as their profile image
							let blockieImage = blockies.create({size: 8, scale: 2, seed: data.username.toLowerCase()}).toDataURL(); 
							msg = `<p style="color: ${data.color}; padding: 5px 0;" class="flex-box"><img src="${blockieImage}" style="width: 16px; height: 16px; margin-right: 4px;"/>${formatAddress(sanitize(data.username))}: ${sanitizeAndTransformText(data.msg)}</p>`;
						}
						$("#chat3d-chat").append(msg);
						
						// Sound 
						if(chat3d_data.uid !== data.uid) {
							audio.msage.play(); 
						}
						
						break;

					case "leave":
						$("#chat3d-chat").append(
							`<p class="flex-box center-vertical"><span style="color: ${data.color};">${sanitize(
								data.username,
							)}</span> left...</p>`,
						);
						break;

					case "welcome":
						$("#chat3d-chat").append(
							`<p class="flex-box center-vertical" style="color: ${data.color};">${sanitize(
								data.username,
							)}: ${sanitize(data.msg)}</p>`,
						);
						break;
						
					case "typing": 
						// console.log(formatAddress(data.username) + " is typing...");
						break;
				}

				if (chat3d_data.authenticated) {
					$(".chat3d-userlist").empty();
					const arr = Object.values(chat3d_data.activeUsers);
					for (let i = 0; i < arr.length; i++) {
						let pfp = arr[i].tokenId > 0 
							? `<img src="https://team3d.io/inventory/json/${arr[i].tokenId}.png" style="width: 16px; height: 16px; margin-right: 4px;"/>` 
							: `<span style="display: inline-block; width: 16px; height: 16px; margin-right: 4px; background: url(${blockies.create({size: 8, scale: 2, seed: arr[i].username.toLowerCase()}).toDataURL()});"></span>`;
						$(".chat3d-userlist").append(
							`<div style="color:${arr[i]["color"]}; display: flex; align-items: center; padding: 5px 0;">${pfp}<span style="cursor: pointer;" class="chat3d_name" address="${arr[i]["username"]}">${formatAddress(arr[i]["username"])}</span></div>`,
						);
					}
				}

				$("#chat3d-chat").scrollTop($("#chat3d-chat")[0].scrollHeight);
			};
		}
	});
	$(document).on("click", ".chat3d-sign", function () {
		chat3dSignIn();
	});
	$(document).on("click", ".chat3d-send", function () {
		handleMessage();
	});
	$("#chat3d .close_button").on("click", function () {
		chat3d_data.authenticated = false;
		(chat3d_data.clientsOnline = 0),
			(chat3d_data.activeUsers = {}),
			(chat3d_data.uid = "");
		$(".chat3d-chat").empty();
		$(".chat3d-userlist").empty();
		$(".chat3d-userlist").append(
			'<div class="chat3d-sign-wrapper flex-box full-height full-width flex-center"><button class="chat3d-sign inventory-button">Sign in</button></div>',
		);
		chat3d.close();
		chat3d = null;
	});
});

async function chat3dSignIn() {
	const message = web3.utils.sha3(chat3d_data.uid);
	const signature = await web3.eth.personal.sign(message, accounts[0]);
	const payload =
		web3.utils.toHex("TeamOSAuth") +
		accounts[0].substr(2) +
		signature.substr(2);
	chat3d.send(
		JSON.stringify({
			adr: payload,
		}),
	);
}

function handleMessage() {
	const message = $(".chat3d-input").val();
	if (message.length > 0) {
		chat3d.send(JSON.stringify({ data: message }));
		$("#chat3d-chat").scrollTop($("#chat3d-chat")[0].scrollHeight);
		$(".chat3d-input").val("");
	}
}

function sanitize(string) {
    const htmlEscapeMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
    };

    return string.replace(/[&<>"'`=/]/g, (char) => htmlEscapeMap[char]);
}

function sanitizeText(text) {
  const htmlEntities = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&#39;': "'",
    '&quot;': '"'
  };

  return text.replace(/&amp;|&lt;|&gt;|&#39;|&quot;/g, function(match) {
    return htmlEntities[match];
  });
}

/*function transformEmojis(text) {
    // Example of transforming :@ into an emoji image
    return text.replace(/:\@/g, '<img style="width: 16px; height: 16px; padding: 1px;" src="chat3d/img/angry_smile.png" alt="angry">');
}*/

function transformEmojis(text) {
    const emojiReplacements = {
        ':@': '<img style="width: 16px; height: 16px;" src="chat3d/img/angry_smile.png" alt="angry">',
        ':)': '<img style="width: 16px; height: 16px;" src="chat3d/img/regular_smile.png" alt="happy">',
        ':(': '<img style="width: 16px; height: 16px;" src="chat3d/img/sad_smile.png" alt="sad">',
        ':O': '<img style="width: 16px; height: 16px;" src="chat3d/img/omg_smile.png" alt="omg">',
		':S': '<img style="width: 16px; height: 16px;" src="chat3d/img/confused_smile.png" alt="confused">',
		'(H)': '<img style="width: 16px; height: 16px;" src="chat3d/img/shades_smile.png" alt="shades">',
		':P': '<img style="width: 16px; height: 16px;" src="chat3d/img/tongue_smile.png" alt="tongue">',
		':|': '<img style="width: 16px; height: 16px;" src="chat3d/img/what_face.png" alt="what">',
		';)': '<img style="width: 16px; height: 16px;" src="chat3d/img/wink_smile.gif" alt="wink">',
		'(A)': '<img style="width: 16px; height: 16px;" src="chat3d/img/angel_smile.png" alt="angel">',
		":'(": '<img style="width: 16px; height: 16px;" src="chat3d/img/cry_smile.gif" alt="cry">',
		'(6)': '<img style="width: 16px; height: 16px;" src="chat3d/img/devil_smile.png" alt="devil">',
		':$': '<img style="width: 16px; height: 16px;" src="chat3d/img/red_smile.png" alt="red">',
		'(V)': '<img style="width: 16px; height: 16px;" src="img/icons/vidyarotate.gif" alt="vidya">',
    };

    Object.keys(emojiReplacements).forEach(pattern => {
        const escapedPattern = pattern.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1'); // Escape special characters
        const regex = new RegExp(escapedPattern, 'g');
        text = text.replace(regex, emojiReplacements[pattern]);
    });

    return text;
}

function sanitizeAndTransformText(text) {
    let sanitizedText = sanitizeText(text);
    return transformEmojis(sanitizedText);
}

Object.values = function (object) {
	const values = [];
	for (const property in object) {
		values.push(object[property]);
	}
	return values;
};

// Sends typing event when user types in the input
function sendTypingEvent() {
  chat3d.send(JSON.stringify({"type": "typing"}));
}

// Add event listener to input element
function initTypingEvent() {
  const input = document.querySelector(".chat3d-input");
  if (input) {
    input.addEventListener("input", sendTypingEvent);
  } else {
    console.error("Input element with class 'chat3d-input' not found.");
  }
}

// Initialize the event listener
initTypingEvent();
