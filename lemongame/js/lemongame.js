let LemonGame = {
	online: false,
	instance: null,
	interval: null,
	address: "0xf1261B8aD1a1c1856F0DE117Cd90BAc64b386285",
	ownedLemons: [],
	collectionURL: "https://opensea.io/assets/ethereum/ethereum/0xf1261B8aD1a1c1856F0DE117Cd90BAc64b386285",
	minBalance: 0.1,
	mintPrice: "100000000000000000", // 0.1 eth  
	mintCap: 10,
	tune: new Audio("lemongame/lemontune.mp3")
}

$(document).on("click", ".lemongame_button_wrapper", function() {
	if(!LemonGame.online) {
		initLemonGame()
	}
})

$(document).on("click", "#lemongame .close_button", function() {
	if(LemonGame.online) {
		resetLemonGameInstance()
	}
})

$(document).on("click", "#lemongame-collection-button", function() {
	audio.click.play()
	window.open(LemonGame.collectionURL)
})

$(document).on("click", "#lemongame-mintbutton", function() { 
	audio.click.play()
	let amt = parseInt($("#lemongame-mint-amt").val())
	if(amt > 0 && amt <= LemonGame.mintCap) {
		lemonGameMintLemon(amt.toString())
	} else {
		error("You can mint between 0-"+LemonGame.mintCap+" lemons at a time!")
	}
})

$(document).on("click", ".lemongame-lemon", function() {
	audio.click.play()
	let id = $(this).attr("data")
	$(".lemongame-lemon").removeClass("template-console-header-menu-active")
	$('.lemongame-lemon[data~="'+id+'"]').addClass("template-console-header-menu-active")
	LemonGame.activeLemon = id 
	drawLemonDetailedView(id)
})

$(document).on("click", ".lemongame-rottenlemon", function() {
	audio.click.play()
	let id = $(this).attr("data")
	$(".lemongame-rottenlemon").removeClass("template-console-header-menu-active")
	$('.lemongame-rottenlemon[data~="'+id+'"]').addClass("template-console-header-menu-active")
	$("#lemongame-claim-rottenlemon").show()
	LemonGame.activeRottenLemon = id 
	drawConsolationInfo(id)
})

$(document).on("click", "#lemongame-claim-rottenlemon", function() {
	audio.click.play()
	if(LemonGame.activeRottenLemon > 0) {
		claimRottenLemon(LemonGame.activeRottenLemon)
	} else {
		error("Unknown rotten lemon! Try clicking on one maybe?")
	}
})

$(document).on("click", ".lemongame-lemonade", function() {
	audio.click.play()
	let id = $(this).attr("data")
	$(".lemongame-lemonade").removeClass("template-console-header-menu-active")
	$('.lemongame-lemonade[data~="'+id+'"]').addClass("template-console-header-menu-active")
	$("#lemongame-claim-lemonade").show() 
	LemonGame.activeLemonade = id 
	drawConsolationInfo(id)
})

$(document).on("click", "#lemongame-claim-lemonade", function() {
	audio.click.play()
	if(LemonGame.activeLemonade > 0) {
		claimLemonade(LemonGame.activeLemonade)
	} else {
		error("Unknown lemonade! Try clicking on one maybe?")
	}
})

$(document).on("click", ".lemonade-tabs", function() {
	audio.click.play()
	let tab = $(this).attr("data")
	$(".lemongame-tab").hide()
	$("#"+tab+"").show()
	$(".lemonade-tabs").removeClass("template-console-header-menu-active")
	$('.lemonade-tabs[data~="'+tab+'"]').addClass("template-console-header-menu-active")
})

$(document).on("click", "#lemongame-volume", function() {
	if($(this).hasClass("volume-icon-hi")) {
		$(this).removeClass("volume-icon-hi")
		$(this).addClass("volume-icon-muted")
		LemonGame.tune.pause()
	} else {
		$(this).removeClass("volume-icon-muted")
		$(this).addClass("volume-icon-hi")
		LemonGame.tune.play()
	}
})

$(document).on("click", "#lemongame-input-address", function() {
	$(this).val("")
})

$(document).on("click", "#lemongame-send-lemon", function() {
	audio.click.play()
	let addr = $("#lemongame-input-address").val()
	if(web3.utils.isAddress(addr)) {
		sendLemonTo(addr, LemonGame.activeLemon)
	}
})

async function initLemonGame() {
	try {
		LemonGame.instance = new web3.eth.Contract(lemongameABI, LemonGame.address)
		LemonGame.online = true
		await lemonGameLoop()
		populateLemonsList()
		$(".lemongame_button_wrapper").addClass("disabled")
		LemonGame.interval = setInterval(lemonGameLoop, 2000)
		LemonGame.tune.loop = true
		LemonGame.tune.play()		
	}
	catch(e) {
		console.error(e)
		$("#lemongame-status").text("Error...")
	}
}

async function lemonGameLoop(reload) {
	try {
		if(LemonGame.online) {
			
			await LemonGame.instance.methods.balanceOf(accounts[0]).call().then(function(r) {
				LemonGame.lemonsBalance = r
			})
			
			await LemonGame.instance.methods.raffleIndex().call().then(function(r) {
				// If the round changes while UI is open 
				if(LemonGame.raffleIndex !== "undefined" && r > LemonGame.raffleIndex) {
					$("#lemongame-status").text("Ready")
					populateLemonsList()
				}
				LemonGame.raffleIndex = r 
			})
			
			// 0, eth to winner, 1 token for losers, 2 tokenId of start, 3 number of raffle tickets
			await LemonGame.instance.methods.raffleData(LemonGame.raffleIndex, 0).call().then(function(r) {
				LemonGame.pooledEth = r
			})
			await LemonGame.instance.methods.raffleData(LemonGame.raffleIndex, 3).call().then(function(r) {
				LemonGame.lemonsInCurrentRound = r
			})
			
			await LemonGame.instance.methods.endTimes(LemonGame.raffleIndex).call().then(function(r) {
				LemonGame.timeLeft = r - Math.floor(Date.now() / 1000)
			})
			
			await web3.eth.getBalance(accounts[0]).then(function(r) {
				LemonGame.ethBalance = r
			})
			
			await LemonGame.instance.methods.hardCap().call().then(function(r) {
				LemonGame.hardCap = r
			})
			
			// UI 
			$(".lemons-raffleIndex").text(LemonGame.raffleIndex)
			$(".lemons-lemonsInCurrentRound").text(LemonGame.lemonsInCurrentRound)
			$(".lemons-pooledeth").text(parseFloat(web3.utils.fromWei(LemonGame.pooledEth)).toFixed(2))
			$(".lemons-timeleft").text(getTimeLeft(LemonGame.timeLeft))
			

			// Enable / disable buttons 
			let check = 0
			if(parseFloat(web3.utils.fromWei(LemonGame.ethBalance)) > parseFloat(LemonGame.minBalance)) {
				check++
			} else {
				$("#lemongame-status").text("Not enough ETH to mint")
			}
			if(parseFloat(web3.utils.fromWei(LemonGame.pooledEth)) < parseFloat(web3.utils.fromWei(LemonGame.hardCap))) {
				check++
			} else {
				$("#lemongame-status").text("Current round sold out!")
			}
			if(check == 2) {
				$("#lemongame-status").text("Ready")
				if($("#lemongame-mintbutton").hasClass("disabled")) {
					$("#lemongame-mintbutton").removeClass("disabled")
				}
			}
			
			// Hide loading screen 
			if(!$(".lemongame-loading-outer").hasClass("hidden")) {
				$(".lemongame-loading-outer").addClass("hidden")
			}
			
			if(reload) {
				populateLemonsList()
			}
		}
	}
	catch(e) {
		console.error(e)
		$("#lemongame-status").text("Error...")
	}
}

async function populateLemonsList() {
	try {
		if(LemonGame.lemonsBalance > 0) {
			
			LemonGame.ownedLemons = []
			LemonGame.ownedRottenLemons = []
			LemonGame.ownedLemonade = []
			$("#owned-lemons").empty()
			$("#owned-rottenlemons").empty()
			$("#owned-lemonade").empty()
			$(".lemongame-owned-lemons-wrapper").html('<div class="flex-box flex-center lemongame-nolemons"><div>Loading...</div></div>')

			for(let i = 0; i < LemonGame.lemonsBalance; i++) {
				let id  = await LemonGame.instance.methods.tokenOfOwnerByIndex(accounts[0], i).call()
				let uri = await LemonGame.instance.methods.tokenURI(id).call()
				if(uri == "https://w3.lol/img/lemon.json") {
					LemonGame.ownedLemons.push(id)
				}
				else if(uri == "https://w3.lol/img/rottenlemon.json") {
					LemonGame.ownedRottenLemons.push(id)
				}
				else if(uri == "https://w3.lol/img/lemonade.json") {
					LemonGame.ownedLemonade.push(id)
				}
			}
			
			drawOwnedLemons()
			
		} else {
			$(".lemongame-owned-lemons-wrapper").html('<div class="flex-box flex-center lemongame-nolemons"><div>No lemons</div></div>')
		}
	}
	catch(e) {
		console.error(e)
		$("#lemongame-status").text("Error...")
	}
}

async function lemonGameMintLemon(amt) {
	try {
		if(LemonGame.online) {
			let val = web3.utils.toBN(amt).mul(web3.utils.toBN(LemonGame.mintPrice)).toString()
			await LemonGame.instance.methods.mintLemon(amt).send({from:accounts[0], value: val})
			.on("transactionHash", function(hash) {
				notify('<div class="text-align-center"><a href="https://etherscan.io/tx/'+hash+'" target="_blank">Minting</a> lemons...</div>')
			})
			.on("receipt", function(receipt) {
				notify('<div class="text-align-center">You minted some lemons!</div>')
				lemonGameLoop(true)
			})
		}
	}
	catch(e) {
		console.error(e)
		$("#lemongame-status").text("Error...")
	}
}

function resetLemonGameInstance() {
	LemonGame.tune.pause()
	LemonGame.instance = null
	LemonGame.online = false
	clearInterval(LemonGame.interval)
	LemonGame.interval = null
	$(".lemongame_button_wrapper").removeClass("disabled")
	$(".lemongame-loading-outer").removeClass("hidden")
	$(".lemons-raffleIndex").text("...")
	$(".lemons-lemonsInCurrentRound").text("...")
	$(".lemons-totalsupply").text("...")
	$(".lemons-pooledeth").text("...")
	$(".lemons-timeleft").text("...")
	$("#owned-lemons").empty()
	$("#owned-rottenlemons").empty()
	$("#owned-lemonade").empty()
}

function drawOwnedLemons() {
	$("#owned-lemons").empty()
	$("#owned-rottenlemons").empty()
	$("#owned-lemonade").empty()
	
	if(LemonGame.ownedLemons.length == 0) {
		$("#owned-lemons").html('<div class="flex-box flex-center lemongame-nolemons"><div>No lemons</div></div>')
	} else {
		for(let i = 0; i < LemonGame.ownedLemons.length; i++) {
			$("#owned-lemons").append('<div class="lemongame-owned-lemon lemongame-lemon" data="'+LemonGame.ownedLemons[i]+'"></div>')
		}	
	}
	
	if(LemonGame.ownedRottenLemons.length == 0) {
		$("#owned-rottenlemons").html('<div class="flex-box flex-center lemongame-nolemons"><div>No rotten lemons</div></div>')
	} else {
		for(let i = 0; i < LemonGame.ownedRottenLemons.length; i++) {
			$("#owned-rottenlemons").append('<div class="lemongame-owned-lemon lemongame-rottenlemon" data="'+LemonGame.ownedRottenLemons[i]+'"></div>')
		}		
	}
	
	if(LemonGame.ownedLemonade.length == 0) {
		$("#owned-lemonade").html('<div class="flex-box flex-center lemongame-nolemons"><div>No lemonade</div></div>')
	} else {
		for(let i = 0; i < LemonGame.ownedLemonade.length; i++) {
			$("#owned-lemonade").append('<div class="lemongame-owned-lemon lemongame-lemonade" data="'+LemonGame.ownedLemonade[i]+'"></div>')
		}		
	}
}

async function drawLemonDetailedView(id) {
	try {
		if($("#lemongame-lemon-view").hasClass("hidden")) {
			$("#lemongame-lemon-view").removeClass("hidden")
		}
		$(".lemongame-lemonId").text(id)
		if($("#lemongame-send-lemon").hasClass("disabled")) {
			$("#lemongame-send-lemon").removeClass("disabled")
		}
	}
	catch(e) {
		console.error(e)
	}
}

async function sendLemonTo(addr, id) {
	try {
		await LemonGame.instance.methods.safeTransferFrom(accounts[0], addr, id).send({from: accounts[0]})
		.on("transactionHash", function(hash) {
			notify('<div class="text-align-center"><a href="https://etherscan.io/tx/'+hash+'" target="_blank">Sending</a> lemon no. #'+id+'...</div>')
		})
		.on("receipt", function(receipt) {
			notify('<div class="text-align-center">Your lemon has been sent!</div>')
			let index = LemonGame.ownedLemons.indexOf(id)
			if (index !== -1) {
			  LemonGame.ownedLemons.splice(index, 1)
			}
			$('.lemongame-lemon[data~="'+id+'"]').remove() 
			if(LemonGame.ownedLemons.length == 0) {
				$("#owned-lemons").html('<div class="flex-box flex-center lemongame-nolemons"><div>No lemons</div></div>')
			}
			LemonGame.activeLemon = null
			
			$(".lemongame-lemonId").text("...")
			$("#lemongame-send-lemon").addClass("disabled")
		})		
	}
	catch(e) {
		console.error(e)
	}
}

async function drawConsolationInfo(id) {
	try {
		await LemonGame.instance.methods.rewardAmount(id).call().then(function(r) {
			let reward = r[0]
			let winner = r[1]
			if(!winner) {
				$(".rottenlemons-reward").text("...")
				if($("#lemongame-rottenlemon-rewards").hasClass("hidden")) {
					$("#lemongame-rottenlemon-rewards").removeClass("hidden")
				}
				$(".rottenlemons-reward").text(decimal(web3.utils.fromWei(reward)))
			} else {
				$(".lemonade-reward").text("...")
				if($("#lemongame-lemonade-rewards").hasClass("hidden")) {
					$("#lemongame-lemonade-rewards").removeClass("hidden")
				}
				$(".lemonade-reward").text(decimal(web3.utils.fromWei(reward)))
			}
		})
	}
	catch(e) {
		console.error(e)
	}
}

async function claimRottenLemon(id) {
	try {
		await LemonGame.instance.methods.claimPrize(id).send({from: accounts[0]})
		.on("transactionHash", function(hash) {
			notify('<div class="text-align-center"><a href="https://etherscan.io/tx/'+hash+'" target="_blank">Eating</a> rotten lemon...</div>')
		})
		.on("receipt", function(receipt) {
			notify('<div class="text-align-center">You ate a rotten lemon... eww!</div>')
			//lemonGameLoop(true) lets see if we can get away with simply removing the current lemon id 
			let index = LemonGame.ownedRottenLemons.indexOf(id)
			if (index !== -1) {
			  LemonGame.ownedRottenLemons.splice(index, 1)
			}
			$('.lemongame-rottenlemon[data~="'+id+'"]').remove()
			$(".rottenlemons-reward").text("...")
			$("#lemongame-rottenlemon-rewards").addClass("hidden")
			$("#lemongame-claim-rottenlemon").hide()
			if(LemonGame.ownedRottenLemons.length == 0) {
				$("#owned-rottenlemons").html('<div class="flex-box flex-center lemongame-nolemons"><div>No rotten lemons</div></div>')
			}
			LemonGame.activeRottenLemon = null
		})
	}
	catch(e) {
		console.error(e)
	}
}

async function claimLemonade(id) {
	try {
		await LemonGame.instance.methods.claimPrize(id).send({from: accounts[0]})
		.on("transactionHash", function(hash) {
			notify('<div class="text-align-center"><a href="https://etherscan.io/tx/'+hash+'" target="_blank">Drinking</a> lemonade...</div>')
		})
		.on("receipt", function(receipt) {
			notify('<div class="text-align-center">You drank the lemonade... yum!</div>')
			let index = LemonGame.ownedLemonade.indexOf(id)
			if (index !== -1) {
			  LemonGame.ownedLemonade.splice(index, 1)
			}
			$('.lemongame-lemonade[data~="'+id+'"]').remove() 
			$(".lemonade-reward").text("...")
			$("#lemongame-lemonade-rewards").addClass("hidden")
			$("#lemongame-claim-lemonade").hide()
			if(LemonGame.ownedLemonade.length == 0) {
				$("#owned-lemonade").html('<div class="flex-box flex-center lemongame-nolemons"><div>No lemonade</div></div>')
			}
			LemonGame.activeLemonade = null
		})
	}
	catch(e) {
		console.error(e)
	}
}

// Returns time left from input seconds 
// Feel free to use it elsewhere in the future 
/*
function getTimeLeft(input) {
	let timeRemaining = input
	let minute = 60
	let hour = 60 * 60
	let day = 60 * 60 * 24
	let dayFloor = Math.floor(timeRemaining / day)
	let hourFloor = Math.floor((timeRemaining - dayFloor * day) / hour)
	let minuteFloor = Math.floor((timeRemaining - dayFloor * day - hourFloor * hour) / minute)
	let secondFloor = Math.floor((timeRemaining - dayFloor * day - hourFloor * hour - minuteFloor * minute))
	if (timeRemaining <= 0) {
		if(LemonGame.lemonsInCurrentRound >= LemonGame.mintCap) {
			return "Finished!"
		} else {
			return LemonGame.mintCap - parseInt(LemonGame.lemonsInCurrentRound) + " lemons to go"
		}
		
	} else {
		if(hourFloor ==0 && dayFloor ==0 && minuteFloor <=0) {return secondFloor + " seconds"}
		if(hourFloor <= 0 && minuteFloor > 0) {return minuteFloor + " minutes"}
		if(dayFloor <= 0 && hourFloor > 0) {return hourFloor + " hours"}
		if(dayFloor > 0) {return dayFloor + " days"}
	}
} */

// Soya fix 
function getTimeLeft(input) {
    let timeRemaining = input
    let minute = 60
    let hour = 60 * 60
    let day = 60 * 60 * 24
    
    let dayFloor = Math.floor(timeRemaining / day)
    let hourFloor = Math.floor((timeRemaining - dayFloor * day) / hour)
    let minuteFloor = Math.floor((timeRemaining - dayFloor * day - hourFloor * hour) / minute)
    let secondFloor = Math.floor((timeRemaining - dayFloor * day - hourFloor * hour - minuteFloor * minute))
    if (timeRemaining <= 0) {
        if(LemonGame.lemonsInCurrentRound >= LemonGame.mintCap) {
            return "Finished!"
        } else {
            return LemonGame.mintCap - parseInt(LemonGame.lemonsInCurrentRound) + " lemons to go"
        }
        
    } else {
          if(dayFloor > 0) {return dayFloor + " days"}
        else if(hourFloor > 0) {return hourFloor + " hours"}
        else if(minuteFloor > 0) {return minuteFloor + " minutes"}
        else {return secondFloor + " seconds"}
    }
}