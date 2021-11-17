let chat3d = null
let chat3d_data = {
	authed: false,
	clientsOnline: 0,
	activeUsers: {},
	uid: ''
}

$(document).on('keypress', function(e) {
    if(e.which == 13) {
        handleMessage()
    }
})

$(document).ready(function() {
	$("#chat3d-toggle").on("click",function(){
		if(chat3d == void null) {
chat3d = new WebSocket("ws://13.49.76.188:8080")
chat3d.onmessage = (event) => {
let data = JSON.parse(event.data)
chat3d_data.authed = data.authed
chat3d_data.clientsOnline = data.clientsOnline
chat3d_data.activeUsers = data.activeUsers
chat3d_data.uid = data.uid

switch(data.type) {
case "join":
$("#chat3d-chat").append('<p><span style="color: '+data.color+';">'+sanitize(data.user)+'</span> joined!</p>')
break;

case "message":
if(chat3d_data.authed) {
if($(".chat3d-sign-wrapper").is(":visible")) {
$(".chat3d-sign-wrapper").remove()
}
}
$("#chat3d-chat").append('<p style="color: '+data.color+';">'+sanitize(data.user)+': '+sanitize(data.msg)+'</p>')
break;

case "leave":
$("#chat3d-chat").append('<p><span style="color: '+data.color+';">'+sanitize(data.user)+'</span> left...</p>')
break;

case "welcome":
$("#chat3d-chat").append('<p style="color: '+data.color+';">'+sanitize(data.user)+': '+sanitize(data.msg)+'</p>')
break;
}

if(chat3d_data.authed) {
$(".chat3d-userlist").empty()
let arr = Object.values(chat3d_data.activeUsers)
for(let i = 0; i < arr.length; i++) {
$(".chat3d-userlist").append('<div style="color:'+arr[i]['color']+'">'+arr[i]['username']+'</div>')
}
}

$("#chat3d-chat").scrollTop($("#chat3d-chat")[0].scrollHeight)
}

		}
	})
	$(document).on("click", ".chat3d-sign", function() {
		chat3dSignIn()
	})
	$(document).on("click", ".chat3d-send", function() {
		handleMessage()
	})
	$("#chat3d .close_button").on("click", function() {
		chat3d_data.authed = false
		chat3d_data.clientsOnline = 0,
		chat3d_data.activeUsers = {},
		chat3d_data.uid = ''
		$(".chat3d-chat").empty()
		$(".chat3d-userlist").empty()
		$(".chat3d-userlist").append('<div class="chat3d-sign-wrapper flex-box full-height full-width flex-center"><button class="chat3d-sign inventory-button">Sign in</button></div>')
		chat3d.close()
		chat3d = null 
	})
})

async function chat3dSignIn() {
	let message = web3.utils.sha3(chat3d_data.uid)
	let signature = await web3.eth.personal.sign(message, accounts[0])
	let payload = web3.utils.toHex("TeamOSAuth") + accounts[0].substr(2) + signature.substr(2)
	chat3d.send(payload)
}

function handleMessage() {
	let message = $(".chat3d-input").val()
	if(message.length > 0) {
		chat3d.send(message)
		$("#chat3d-chat").scrollTop($("#chat3d-chat")[0].scrollHeight)
		$(".chat3d-input").val("")
	}
}

function sanitize(string) {
  const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      "/": '&#x2F;',
	  '`': '&grave;'
  };
  const reg = /[&<>"'/]/ig;
  return string.replace(reg, (match)=>(map[match]));
}

Object.values = function(object) {
  var values = [];
  for(var property in object) {
    values.push(object[property]);
  }
  return values;
}