const MAX_UINT256 = "115792089237316195423570985008687907853269984665640564039457584007913129639935"
let DaoLoopInterval = null 

let Dao = {
	"type": "",
	"online": false,
	"address": "0x930bE1de32692C36000d8A14F3b94779f50871ED",
	"instance": null,
	"isActive": false,
	"isDevil": false,
	"userIsVoter": false,
	"tokenInstance": null,
	"tokenAddress": "0x0CbCaFD9f1B9d7c41B6F55BbddE06Bee3Aa7B791", // vidya 
	"approved": false,
	"hypercubes": {
		"24": false,
		"25": false,
		"26": false,
		"27": false,
		"28": false
	},
	"UserHyperCubes": {
		// These turn true in inventory.js's load function if the user holds 'em @line 283 as of 2/3/2022 
		"24": false,
		"25": false,
		"26": false,
		"27": false,
		"28": false
	}
}

// Set dao online status 
$(document).on("click", "#dao_button, #dao .close_button", function() {
	if(!Dao.online) {
		DaoSetup()
		$("#dao_button").addClass("disabled")
	} else {
		Dao.online = false
		ResetDaoInstance() 
		console.log("Dao is offline..")
		$("#dao_button").removeClass("disabled")
	}
})

$(document).on("click", ".template-enter-button", async function() {
	let dao = $(this).closest(".template-gateway-option").attr("data")
	Dao.type = dao 
	$(".template-screen-body-overlay[data~="+dao+"]").show()
	$("#daoGateway").hide()
	await listActiveAgendas()
	$(".template-screen-body-overlay[data~="+dao+"]").hide()
	$(".template-screen[data~="+dao+"]").show("fold")
	$("#dao-screen-title").text(dao)
})

$(document).on("click", ".template-back-button", function() {
	$(this).closest(".template-screen").hide()
	ResetDaoInstance()
	$(this).closest(".template-gateway-wrapper").show()
})

$(document).on("click", ".dao-enable-button", function() {
	let action = $(this).attr("action")
	if(action != void null) {
		daoToggleAllowance(action)
	} else {
		// If for some reason button attribute is not set
		error("Could not detect dao. Try refreshing the page.")
	}
})

$(document).on("click", ".dao-vote-button", function() {
	let agendaId = $(this).closest(".dao-agenda").attr("agendaId")
	let vote = $(this).attr("data")
	let voteCost = $(this).closest(".dao-agenda").attr("voteCost")
	let hodlReq  = $(this).closest(".dao-agenda").attr("hodlReq")
	voteForAgenda(agendaId, vote, voteCost, hodlReq)
})

/*	Hypercube slots click event:
	User should only be able to actually click on it when they 
	have that cube in inventory. */
$(document).on("click", ".hypercube", function() {
	let id = $(this).attr("data")
	let tokenId = $(this).attr("tokenId")
	if(tokenId != void null) {
		putHyperCube(id, tokenId)
	} else {
		error("Bruh... I think you broke the Internet")
	}
	
})

async function DaoSetup() {
	try {
		$("#daoLoading").css({"display" : "flex"})
		Dao.instance = new web3.eth.Contract(dao_abi, Dao.address)
		Dao.tokenInstance = new web3.eth.Contract([{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}], Dao.tokenAddress)
		DaoLoopInterval = setInterval(DaoLoop, 2000)
		Dao.online = true 
		console.log("Dao started!")
	}
	catch(e) {
		console.error(e)
	}
}

async function ResetDaoInstance() {
	try {
		clearInterval(DaoLoopInterval)
		DaoLoopInterval = null 
		Dao.isActive = false
		Dao.type = ""
		Dao.approved = false 
		
		// Delete UIs
		$("#daoGateway").hide() 
		$("#daoMain").hide()
		$("#daoDevil").hide()
		$("#DaoAgendas").empty() 
		$("#dao-screen-title").text("????")
		$(".dao-role-inner").text("Read-only")
		
		console.log("Dao instance reset")
		
		if(Dao.online) {
			DaoSetup()
		}
	}
	catch(e) {
		console.error(e)
	}
}

async function DaoLoop() {
	console.log("Dao loop ran")
	try {
		if(!Dao.isActive) {
			await Dao.instance.methods.active().call().then(function(r) {
				if(r) {
					Dao.isActive = true
					console.log("Dao is activated!")
					// Show DAO UI
					setTimeout(function() {
						$("#daoDevil").hide() // If devil is there, hide it 
						$("#daoGateway").css({"display" : "flex"}).removeClass("hidden")
					}, 420) // offset loading screen fadeOut 
				} else {
					// Show Gateway UI
					setTimeout(function() {
						$("#daoDevil").css({"display" : "flex"}).removeClass("hidden")
					}, 420) // offset loading screen fadeOut 
					if(!Dao.isDevil) {
						Dao.isDevil = true 
					}
					console.log("Dao is not activated yet..")
				}
			})
		}
		
		// Are we looking at General dao?
		if(Dao.type == "general") {
			// Does the user have voter rights? 
			if(!Dao.userIsVoter) {
				await Dao.instance.methods.voters(accounts[0]).call().then(function(r) {
					if(r) {
						Dao.userIsVoter = true 
					}
				})
			}
			// General dao has optional vote cost so need to check allowance here
			if(!Dao.approved) {
				await Dao.tokenInstance.methods.allowance(accounts[0], Dao.address).call().then(function(r) {
					if(r > 0) {
						Dao.approved = true 
					}
				})
			}
		}
		
		if(Dao.isDevil) {
			console.log("Devil mode")
			
			let hyperCubes = ["24","25","26","27","28"]
			
			// Check for user's hypercubes & enable the boxes on UI 
			for(let i = 0; i < hyperCubes.length; i++) {
				if(Dao.UserHyperCubes[hyperCubes[i]]) { // Reminder: these get set true in inventory.js's load() function ;) 
					// Only disable button if hypercube not yet placed in Dao 
					if(!Dao.hypercubes[hyperCubes[i]]) {
						$('.hypercube[data~="'+hyperCubes[i]+'"]').removeClass("disabled")
					}
				}
				
				// Check for placed cubes & set backgrounds 
				if(!Dao.hypercubes[hyperCubes[i]]) {
					await Dao.instance.methods.hyperCubes(hyperCubes[i]).call().then(function(r) {
						if(r) {
							Dao.hypercubes[hyperCubes[i]] = true
							$('.hypercube[data~="'+hyperCubes[i]+'"]').addClass("disabled").css({
								"background":'url(../../inventory/json/'+hyperCubes[i]+'.png) no-repeat',
								"background-size":"cover"
							})
							console.log("Set dao hypercube true, set background")
						}
					})
				}
			}
			
			if(Dao.hypercubes["24"] && Dao.hypercubes["25"] && Dao.hypercubes["26"] && Dao.hypercubes["27"] && Dao.hypercubes["28"]) {
				Dao.isDevil = false
				console.log("Devil turned off..")
			}
			
		}
		
		// Enable / disable button on UI 
		if(Dao.approved) {
			$(".dao-enable-button").attr("action", "disable")
			$(".dao-enable-button").removeClass("glow")
			$(".dao-enable-dial").css({left: "auto", right: "0", background: "var(--purple)"}).text("on")
		} else {
			$(".dao-enable-button").attr("action", "enable")
			$(".dao-enable-button").addClass("glow")
			$(".dao-enable-dial").css({left: "0", right: "auto", background: "var(--indigo-dark)"}).text("off")
		}
		
		if(Dao.userIsVoter) {
			$(".dao-role-inner").text("Voter")
		} else {
			if($(".dao-role-inner").text() !== "Read-only") {
				$(".dao-role-inner").text("Read-only")
			}
		}
		
		if(Dao.userIsVoter && Dao.approved) {
			$(".dao-vote-button").removeClass("disabled")
		} else {
			$(".dao-vote-button").addClass("disabled")
		}

		// Remove loading screen 
		$("#daoLoading").fadeOut(420)
	}
	catch(e) {
		console.error(e)
	}
}

async function putHyperCube(id, tokenId) {
	let slots = {"24": "Blue","25": "Purple","26": "Green","27": "Red","28": "Yellow"}
	try {
		await Dao.instance.methods.putHyperCube(tokenId).send({from: accounts[0]})
		.on("transactionHash", function(hash) {
			notify('<div class="text-align-center"><a href="https://etherscan.io/tx/'+hash+'" target="_blank">Placing HyperCube</a> in the '+slots[id]+' slot...</div>')
		})
		.on("receipt", function(receipt) {
			notify('<div class="text-align-center">HyperCube accepted!</div>')
		})
	}
	catch(e) {
		console.error(e)
	}
}

async function voteForAgenda(agendaId, vote, voteCost, hodlReq) {
	try {
		let requirements = {"voteCost":false, "hodlReq":false}
		let daoUserBalance = await Dao.tokenInstance.methods.balanceOf(accounts[0]).call()
		if(voteCost > 0) {
			if(parseFloat(web3.utils.fromWei(daoUserBalance)) >= parseFloat(web3.utils.fromWei(voteCost))) {
				requirements.voteCost = true
			} else {
				error("Vote cost exceeds your available token balance!")
			}
		} else {
			requirements.voteCost = true
		}
		if(hodlReq > 0) {
			if(parseFloat(web3.utils.fromWei(daoUserBalance)) >= parseFloat(web3.utils.fromWei(hodlReq))) {
				requirements.hodlReq = true
			} else {
				error("You do not meet the HODL requirement to cast this vote!")
			}
		} else {
			requirements.hodlReq = true
		}
		if(requirements.voteCost && requirements.hodlReq) {
			let _vote = null
			if(vote == "no") {
				_vote = 0
			}
			else if(vote == "yes") {
				_vote = 1
			}
			else {
				console.error("The fuck?")
			}
			await Dao.instance.methods.voteFor(agendaId, _vote).send({from: accounts[0]})
			.on("transactionHash", function(hash) {
				notify('<div class="text-align-center"><a href="https://etherscan.io/tx/'+hash+'" target="_blank">Voting</a> "'+vote+'" on Agenda #'+agendaId+'...</div>')
			})
			.on("receipt", function(receipt) {
				listActiveAgendas()
				notify('<div class="text-align-center">Your vote has been cast. Thank you!</div>')
			})
		} else {
			console.error("You do not meet some of the vote requirements!")
		}
	}
	catch(e) {
		console.error(e)
	}
}

async function daoToggleAllowance(action) {
	try {
		if(action == "enable") {
			await Dao.tokenInstance.methods.approve(Dao.address, MAX_UINT256).send({from: accounts[0]})
			.on("transactionHash", function(hash) {
				notify('<div class="text-align-center"><a href="https://etherscan.io/tx/'+hash+'" target="_blank">Approving token</a> for dao...</div>')
			})
			.on("receipt", function(receipt) {
				notify('<div class="text-align-center">Approval for dao was successful!</div>')
			})
		}
		else if(action == "disable") {
			await Dao.tokenInstance.methods.approve(Dao.address, "0").send({from: accounts[0]})
			.on("transactionHash", function(hash) {
				notify('<div class="text-align-center"><a href="https://etherscan.io/tx/'+hash+'" target="_blank">Resetting allowance</a> for dao...</div>')
			})
			.on("receipt", function(receipt) {
				Dao.approved = false
				notify('<div class="text-align-center">Allowance for dao was reset successfully!</div>')
			})
		}
		else {
			error("Cannot understand the command!")
		}
	}
	catch(e) {
		console.error(e)
	}
}

async function listActiveAgendas() {
	try {
		$("#DaoAgendas").empty() 
		let now = Math.round(new Date().getTime()/1000) 
		let list
		await Dao.instance.methods.fetchActiveAgendas().call().then(function(r) {
			list = r // Array of ID's of active Agendas 
		})
		for(let i = 0; i < list.length; i++) {
			await Dao.instance.methods.agendas(list[i]).call().then(async function(r) {
				let voted = await Dao.instance.methods.voted(list[i], accounts[0]).call()
				addAgenda(list[i], r.title, r.votePrice, r.hodlRequirement, r.start, r.end, r.no, r.yes, voted)
				console.log("Listed agenda #"+list[i])
			})
		}
		
		if(list.length == 0) {
			$("#DaoAgendas").prepend("There are currently no active Agendas")
		}
		console.log("Active agendas loaded!") 
		
	}
	catch(e) {
		console.error(e)
	}
}

// Adds an Agenda to #DaoAgendas
function addAgenda(id, title, voteCost, hodlRequirement, start, end, noVotes, yesVotes, voted) {
	let totalVotes = parseInt(noVotes) + parseInt(yesVotes)
	let noVotesPercent = 0
	if(noVotes > 0) {
		noVotesPercent = parseInt(noVotes) * 100 / totalVotes
	}
	let yesVotesPercent = 0
	if(yesVotes > 0) {
		yesVotesPercent = parseInt(yesVotes) * 100 / totalVotes 
	}
	let ui_options = ''
	if(!voted) {
		ui_options = '<div class="template-button dao-vote-button" data="yes">Yes <span>'+yesVotesPercent.toString().split(".")[0]+'%</span></div> \
	<div class="template-button dao-vote-button" data="no">No <span>'+noVotesPercent.toString().split(".")[0]+'%</span></div>'
	} else {
		ui_options = '<div class="template-button disabled">Yes <span>'+yesVotesPercent.toString().split(".")[0]+'%</span></div> \
	<div class="template-button disabled">No <span>'+noVotesPercent.toString().split(".")[0]+'%</span></div>'
	}
	let ui = '<div class="template-notch">#'+id+' [ Ends in <span class="agenda-endtime" agendaId="'+id+'">'+daoAgendaTimeLeft(end)+'</span> ]</div> \
	<div class="dao-agenda flex-box col" agendaId="'+id+'" voteCost="'+voteCost+'" hodlReq="'+hodlRequirement+'"> \
	<div class="dao-agenda-title">'+title+'</div> \
	<div class="dao-agenda-options-wrapper flex-box space-between"> \
	<div class="dao-agenda-options-requirements flex-box"> \
	<div>Hodl:<span class="dao-hodl-req">'+generatorTruncateDecimal(web3.utils.fromWei(hodlRequirement))+'</span></div> \
	<div>Cost:<span class="dao-cost">'+generatorTruncateDecimal(web3.utils.fromWei(voteCost))+'</span></div> \
	</div> \
	<div class="dao-agenda-options flex-box">'+ui_options+'</div> \
	</div> \
	</div>'
	$("#DaoAgendas").prepend(ui)
}

function daoAgendaTimeLeft(endTime) {
	var currentTime = new Date().getTime()/1000
	var timeRemaining = endTime - currentTime
	var minute = 60
	var hour = 60 * 60
	var day = 60 * 60 * 24
	var dayFloor = Math.floor(timeRemaining / day)
	var hourFloor = Math.floor((timeRemaining - dayFloor * day) / hour)
	var minuteFloor = Math.floor((timeRemaining - dayFloor * day - hourFloor * hour) / minute)
	var secondFloor = Math.floor((timeRemaining - dayFloor * day - hourFloor * hour - minuteFloor * minute))
	if (timeRemaining <= 0) {
		return "Finished!"
	} else {
		if (endTime > currentTime) {
			if(dayFloor > 0) {return dayFloor+" days"}
			if(dayFloor <= 0 && hourFloor > 0) {return hourFloor+" hours"}
			if(hourFloor <= 0 && minuteFloor > 0) {return minuteFloor+" minutes"}
			if(minuteFloor <= 0) {return secondFloor+" seconds"}
		}
	}
}