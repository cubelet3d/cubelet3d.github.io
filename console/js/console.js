const consoleUI = '<div id="commandprompt" class="console absolute bottom draggable" data="commandprompt"> \
<div class="consoleHeader handle ui-draggable-handle flex-box space-between center-vertical"> \
	<div class="flex-box center-vertical"> \
		<div class="icon icon-console-prompt"></div> \
		<div class="consoleTitle default">C:\\team3d\\cmd.exe</div> \
	</div> \
	<button id="commandCloseButton" class="close_button">X</button> \
</div> \
<div id="consoleContent" class="commandprompt-content console-content scrollbar"> \
	<div id="commandprompt-input" contenteditable="true"></div> \
</div> \
</div>'

const commands = [
	"info"
]

var command = "cmd";
var buffer  = "";
var consoleOpen = false;

$("html").keyup(function(e) {
	if(!consoleOpen) {
		buffer += e.key
		if (command.includes(buffer)) {
			// Good...
			if(command == buffer) {
				// Matched!
				consoleOpen = true
				buffer = ""
				$("#Main .panel").append(consoleUI)
				$("#commandprompt-input").focus()
				$('#commandprompt-input').keydown(function(e) {
					// Limit to 40 chars
					if($(this).text().length === 40 && event.keyCode != 8) {
						event.preventDefault()
					}
					// trap the return key being pressed
					if (e.keyCode === 13) {
						if($(this).text().length > 0) {
							let content = $("#commandprompt-input").text()
							processCommand(content)
						}
						$("#commandprompt-input").empty()
						// prevent the default behaviour of return key pressed
						return false;
					}
				});
			}
		} else {
			// Reset buffer 
			buffer = ""
		}
	}
})

$(document).ready(function() {
	$("body").on("click", "#commandCloseButton", function() {
		$("#commandprompt").remove()
		consoleOpen = false
	})
})

function processCommand(cmd) {
	cmdmsg("<div>"+cmd+"</div>")
	let split = cmd.split(" "); // Split after space
	if(commands.includes(split[0])) {
		switch(split[0]) {
			case "info":
				if(split[1] == "tokenid" && split[2] > 0) {
					getTokenInfo(split[2])
				} else {
					cmdmsg("<div>Usage: info tokenid INT</div>")
				}
			break;
		}
	} else {
		cmdmsg('<div>"'+cmd+'" is not a recognized command.</div>')
	}
}

function cmdmsg(msg) {
	$("#consoleContent").append(msg)
	scroll()
}

function scroll(){
    $("#consoleContent").scrollTop($("#consoleContent")[0].scrollHeight);
}

async function getTokenInfo(tokenId) {
	if(!Inventory) {
		cmdmsg("<div>Please connect to Ethereum mainNet</div>")
	} else {
		cmdmsg("<div>Fetching token info...</div>")
		try {
			await Inventory.methods.tokenURI(tokenId).call().then(function(r) {
				$.getJSON(r, function(result) {
					cmdmsg("<div><span class='cmdhighlight'>Template:</span> "+result.template+"</div>")
					cmdmsg("<div><span class='cmdhighlight'>Name:</span> "+result.name+"</div>")
					cmdmsg("<div><span class='cmdhighlight'>Description:</span> "+result.description+"</div>")
					let slots = ["head", "left hand", "neck", "right hand", "chest", "legs"]
					cmdmsg("<div><span class='cmdhighlight'>Equipment slot:</span> "+slots[result.slot]+"</div>")
				})
			})
		}
		catch(e) {
			cmdmsg("<div>error...</div>")
			console.error(e)
		}
	}
}