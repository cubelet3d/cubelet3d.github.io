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
	"cubescape",
	"fixscarf",
	"grr",
	"doom"
]

var command = "cmd"
var buffer  = ""
var consoleOpen = false
var pastedData
var shooting = {}

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
			
			case "cubescape":
			if(!window.location.href.includes("https")) {
			$("#desk").append('<div id="cubescape" class="console absolute draggable ui-draggable active-console" data="cubescape" style="width: 518px; height: 388px; overflow: hidden;"><div class="consoleHeader handle ui-draggable-handle flex-box space-between center-vertical"><div class="flex-box center-vertical"><div class="icon desktop-exe"></div><div class="consoleTitle default">C:\\team3d\\CubeScape.jar</div></div><div class="flex-box"><button class="minimize_button">_</button><button class="close_button">X</button></div></div><iframe src="http://13.51.170.52/client/#members,13.51.170.52,80,65537,7201400650430333022929044024192399910487638020720817675284860205859231816832336418245822654520187327018485587023447543364288069097738462129828831570588879,true" height="350px" width="513px" style="border: 0; overflow: hidden; display: block; background: transparent;"></iframe></div>');
			} else {
				error('<div style="font-size:90%">Cubescape does not work on https. Try running on localhost or play <a style="border-bottom:2px solid white" href="http://cubescape.lol/" target="_blank">here</a> instead.</div>')
			}
			break;
			
			case "fixscarf":
				if(parseFloat(split[1])>0){
					scarfHotFix(split[1])
				} else {
					cmdmsg("<div>Usage: fixscarf [tokenId]</div>")
				}
			break;
			
			case "grr":
				shooting.active = true 
				shooting.pistol = true 
				$("#Main").append('<div id="shootme" style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; z-index: 9999; background: rgba(0, 0, 0, 0.1)"></div>')
			break;
			
			case "doom": 
			$("#desk").append('<div id="doom" class="console absolute draggable" data="doom" style="width: 646px; height: 446px;"><div class="consoleHeader handle ui-draggable-handle flex-box space-between center-vertical"><div class="flex-box center-vertical"><div class="icon desktop-exe"></div><div class="consoleTitle default">C:\\team3d\\DOOM.EXE</div></div><div class="flex-box"><button class="minimize_button">_</button><button class="close_button">X</button></div></div><div class="console-content flex-box flex-center" style="overflow: hidden;"><div></div></div></div>')
			loadGame("doom")
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

$(document).on("click", "#shootme", function(e) {
	if(shooting.pistol) {
		audio.fire.play()
		$('<div />').addClass('bullethole').css({
			top: e.offsetY - 25,
			left: e.offsetX - 25
		}).appendTo('#shootme')
	}
	else if(shooting.hammer) {
		audio.shatter.play()
		$('<div />').addClass('hammerhole').css({
			top: e.offsetY - 40,
			left: e.offsetX - 40
		}).appendTo('#shootme')	
	}
})

$(document).keyup(function(e) {
	if(shooting.active) {
		if(e.key === "Escape") {
			$("#shootme").remove()
			shooting.active = false
		}
		else if(e.key == 1) {
			shooting.hammer = false 
			shooting.pistol = true 
		}
		else if(e.key == 2) {
			shooting.pistol = false 
			shooting.hammer = true 
		}
	}
})