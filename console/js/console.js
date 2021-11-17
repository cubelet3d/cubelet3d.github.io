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
	"help",
	"info",
	"clear",
	"log",
	"get",
	"???"
]

var command = "cmd"
var buffer  = ""
var consoleOpen = false
var pastedData

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
				$("#commandprompt-input").bind("paste", function(e) {
					pastedData = e.originalEvent.clipboardData.getData('text')
				})
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
			case "help":
				cmdmsg("<div>"+JSON.stringify(commands)+"</div>")
			break;
			case "info":
				if(split[1] == "tokenid" && split[2] > 0) {
					getTokenInfo(split[2])
				} else {
					cmdmsg("<div>Usage: info [tokenid][INT]</div>")
				}
			break;
			case "clear": 
				$("#consoleContent").find("*").not("#commandprompt-input").remove()
				cmdmsg("<div>Cleared...</div>")
			break;
			case "log":
				if(split[1] == "vidya") {
					logTransfers(vidya)
				} else if(split[1] == "inventory") {
					logTransfers(inventoryContract)
				} else {
					cmdmsg("<div>Usage: log [vidya,inventory]</div>")
				}
			break;
			
			// What the fuck even is this... lmao
			case "get":
				if(split[1] && pastedData) {
					if(Inventory) {
						if(split[1].substring(0,9) == "equipment") {
							if(web3.utils.isAddress(pastedData)) {
								getEquipment(pastedData)
								pastedData = null
							} else {
								cmdmsg("<div>Invalid address...</div>")
							}
						} else {
							cmdmsg("<div>Usage: get [equipment][address]</div>")
						}
					} else {
						cmdmsg("<div>Please connect to Ethereum mainNet</div>")
					}
				} else {
					cmdmsg("<div>Usage: get [equipment][address]</div>")
				}
			break;
			
			case "???":
			function _0x4bb0(_0x54194e,_0x404667){var _0x1e14c8=_0x1e14();return _0x4bb0=function(_0x4bb0c3,_0x3fe000){_0x4bb0c3=_0x4bb0c3-0x7e;var _0x43833c=_0x1e14c8[_0x4bb0c3];return _0x43833c;},_0x4bb0(_0x54194e,_0x404667);}var _0x32076a=_0x4bb0;(function(_0x5f0eca,_0x533edc){var _0x4bad4e=_0x4bb0,_0x1e62d6=_0x5f0eca();while(!![]){try{var _0x6e260b=-parseInt(_0x4bad4e(0x81))/0x1*(-parseInt(_0x4bad4e(0xa0))/0x2)+-parseInt(_0x4bad4e(0x7e))/0x3+parseInt(_0x4bad4e(0x8c))/0x4+-parseInt(_0x4bad4e(0x86))/0x5+-parseInt(_0x4bad4e(0x82))/0x6*(-parseInt(_0x4bad4e(0x8f))/0x7)+-parseInt(_0x4bad4e(0x99))/0x8*(parseInt(_0x4bad4e(0x87))/0x9)+parseInt(_0x4bad4e(0x9b))/0xa*(-parseInt(_0x4bad4e(0x94))/0xb);if(_0x6e260b===_0x533edc)break;else _0x1e62d6['push'](_0x1e62d6['shift']());}catch(_0x5e6a45){_0x1e62d6['push'](_0x1e62d6['shift']());}}}(_0x1e14,0x4b142));function _0x1e14(){var _0x186c02=['202220zZKpFW','35604bxLteP','draggable','stringify','72942YPMCMU','addClass','1825720qZiAqY','70WzhZbF','202983wdARTe','3764803ckfmfx','21QMrUTm','8pmjbXb','location','394958TOFHyJ','737sZXkCg','127.0.0.1','localhost','push','prepend','712FAUUdY','1067502bqyHrJ','30200EoBgIr','48ZtZBMu','includes','91725xXHGGe','#desk','355778uaSQmM','6475420QrHcld','1342941sHrGsY','This\x20feature\x20only\x20works\x20on\x20localhost','attr','2CutiIy','6nQXBgd','#cubescape','shift','.handle'];_0x1e14=function(){return _0x186c02;};return _0x1e14();}if(document[_0x32076a(0x92)]['href'][_0x32076a(0x9d)](_0x32076a(0x95))||document['location']['href']['includes'](_0x32076a(0x96))){$(_0x32076a(0x9f))[_0x32076a(0x98)](unescape(csx));function _0x4a47(_0x1f2b42,_0x4b3605){var _0x2bbce7=_0xeb43();return _0x4a47=function(_0x25ab44,_0x5473d3){_0x25ab44=_0x25ab44-0x1ed;var _0x5d7a76=_0x2bbce7[_0x25ab44];return _0x5d7a76;},_0x4a47(_0x1f2b42,_0x4b3605);}var _0x4b699d=_0x4a47;(function(_0x1a7714,_0x44f807){var _0x2879af=_0x32076a,_0x1469f8=_0x4a47,_0x124cd7=_0x1a7714();while(!![]){try{var _0x184a0a=-parseInt(_0x1469f8(0x200))/0x1+parseInt(_0x1469f8(0x1fe))/0x2+parseInt(_0x1469f8(0x1fd))/0x3*(parseInt(_0x1469f8(0x1ff))/0x4)+-parseInt(_0x1469f8(0x1f8))/0x5+-parseInt(_0x1469f8(0x1f6))/0x6*(parseInt(_0x1469f8(0x1fb))/0x7)+-parseInt(_0x1469f8(0x1f9))/0x8*(-parseInt(_0x1469f8(0x1fc))/0x9)+-parseInt(_0x1469f8(0x1f7))/0xa*(parseInt(_0x1469f8(0x1f2))/0xb);if(_0x184a0a===_0x44f807)break;else _0x124cd7['push'](_0x124cd7['shift']());}catch(_0x420a4e){_0x124cd7[_0x2879af(0x97)](_0x124cd7[_0x2879af(0x84)]());}}}(_0xeb43,0xa3c4e),$(_0x4b699d(0x1ef))[_0x4b699d(0x1f0)]({'containment':_0x4b699d(0x1f1),'handle':_0x4b699d(0x1f5),'snap':!![],'start':function(_0x15cdd6,_0x5be96d){var _0x4d534b=_0x4b699d;$(this)[_0x4d534b(0x1ee)](_0x4d534b(0x1f4));},'stop':function(_0x5c4c05,_0x3a9b73){var _0x3ce05b=_0x32076a,_0x5dafc9=_0x4b699d;localStorage[_0x5dafc9(0x1f3)]($(this)[_0x3ce05b(0x80)]('id'),JSON[_0x5dafc9(0x1ed)](_0x3a9b73[_0x5dafc9(0x1fa)])),setTimeout(function(){var _0x1a8887=_0x5dafc9;$(_0x5c4c05['target'])['removeClass'](_0x1a8887(0x1f4));},0x64);}}));function _0xeb43(){var _0x21bd8a=_0x32076a,_0x156aa2=[_0x21bd8a(0x8a),_0x21bd8a(0x8d),_0x21bd8a(0xa1),_0x21bd8a(0x9c),'offset',_0x21bd8a(0x90),'1971153USPxLS',_0x21bd8a(0x9a),_0x21bd8a(0x93),_0x21bd8a(0x91),_0x21bd8a(0x9e),_0x21bd8a(0x89),_0x21bd8a(0x8b),_0x21bd8a(0x83),_0x21bd8a(0x88),'parent',_0x21bd8a(0x8e),'setItem','dragging',_0x21bd8a(0x85)];return _0xeb43=function(){return _0x156aa2;},_0xeb43();}}else error(_0x32076a(0x7f));
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
					cmdmsg('<div><img src="../../inventory/json/'+result.template+'.png" style="width: 42px; height: 42px"></div>')
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

async function logTransfers(what) {
	if(!Inventory) {
		cmdmsg("<div>Please connect to Ethereum mainNet</div>")
	} else {
		cmdmsg("<div>Listening for Transfer events...</div>")
		try {
			let block = await web3.eth.getBlockNumber() 
			let sub = web3.eth.subscribe("logs", {
				fromBlock: block,
				address: what,
				topics: ["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"]
			})
			.on("data", async function(r) {
				try {
					let from = "0x"+r.topics[1].substring(26)
					let to = "0x"+r.topics[2].substring(26)
					
					if(what == vidya) {
						let amt = parseFloat(web3.utils.fromWei(web3.utils.hexToNumberString(r.data))).toFixed(4)
						cmdmsg('<div style="font-size:90%">---VIDYA Transfer---<br><span class="cmdhighlight">From:</span> '+formatAddress(from)+', <span class="cmdhighlight">To:</span>: '+formatAddress(to)+', <span class="cmdhighlight">Amt:</span>: '+amt+' [<a href="https://etherscan.io/tx/'+r.transactionHash+'" target="_blank">View</a>]</div>')
					}
					
					if(what == inventoryContract) {
						let tokenId = r.topics[3]
						cmdmsg('<div style="font-size:90%">---ITEM Transfer---<br><span class="cmdhighlight">From:</span> '+formatAddress(from)+', <span class="cmdhighlight">To:</span>: '+formatAddress(to)+', <span class="cmdhighlight">TokenId:</span>: '+web3.utils.hexToNumberString(tokenId)+' [<a href="https://etherscan.io/tx/'+r.transactionHash+'" target="_blank">View</a>]</div>')
					}
				}
				catch(e) {
					console.error(e)
				}
			})
		}
		catch(e) {
			console.error(e)
		}
	}
}

async function getEquipment(address) {
	try {
		cmdmsg("<div>Fetching equipment info...</div>")
		let equippedTokenIds
		let eq = []
		await Inventory.methods.getEquipment(address).call().then(function(result) {
			equippedTokenIds = result 
		})
		await Inventory.methods.getTemplateIDsByTokenIDs(equippedTokenIds).call().then(async function(result) {
			for(let i = 0; i < result.length; i++) {
				if(result[i] > 0) {
					await $.getJSON('https://team3d.io/inventory/json/'+result[i]+'.json', function(r) {
						eq[i] = r["name"]
					})
				} else {
					eq[i] = "N/A"
				}
			}
			cmdmsg('<div><span class="cmdhighlight">Head:</span> '+eq[0]+'</div>')
			cmdmsg('<div><span class="cmdhighlight">Left hand:</span> '+eq[1]+'</div>')
			cmdmsg('<div><span class="cmdhighlight">Neck:</span> '+eq[2]+'</div>')
			cmdmsg('<div><span class="cmdhighlight">Right hand:</span> '+eq[3]+'</div>')
			cmdmsg('<div><span class="cmdhighlight">Chest:</span> '+eq[4]+'</div>')
			cmdmsg('<div><span class="cmdhighlight">Legs:</span> '+eq[5]+'</div>')
		})
	}
	catch(e) {
		console.log(e)
	}
}