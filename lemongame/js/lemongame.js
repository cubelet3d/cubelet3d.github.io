let LemonGame = {
	online: false,
	instance: null,
	interval: null,
	address: "0xb6cdC8Dfe9dbC38554fE8b5F18B290997C9a3D73",
	ownedLemons: [],
	collectionURL: "https://team3d.io",
	minBalance: 0.001,
	minToRoll: 5,
	mintPrice: 0.001,
	mintCap: 50
}

$(document).on("click", "#lemongame_button_wrapper", function() {
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
		lemonGameMintLemon(amt)
	} else {
		error("You can mint between 0-"+LemonGame.mintCap+" lemons at a time!")
	}
})

$(document).on("click", ".lemongame-owned-lemon", function() {
	audio.click.play()
	let id = $(this).attr("data")
	window.open(LemonGame.collectionURL + "/" + id)
})

$(document).on("click", ".lemonade-tabs", function() {
	audio.click.play()
	let tab = $(this).attr("data")
	$(".lemongame-tab").hide()
	$("#"+tab+"").show()
	//$('.lemongame-tab[data~="'+tab+'"]').show()
	$(".lemonade-tabs").removeClass("template-console-header-menu-active")
	$('.lemonade-tabs[data~="'+tab+'"]').addClass("template-console-header-menu-active")
})

async function initLemonGame() {
	try {
		LemonGame.instance = new web3.eth.Contract(lemongameABI, LemonGame.address)
		LemonGame.online = true
		await lemonGameLoop()
		populateLemonsList()
		$("#lemongame_button_wrapper").addClass("disabled")
		LemonGame.interval = setInterval(lemonGameLoop, 2000)
	}
	catch(e) {
		console.error(e)
		$("#lemongame-status").text("Error...")
	}
}

async function lemonGameLoop(reload) {
	try {
		if(LemonGame.online) {
			/*await LemonGame.instance.methods.totalSupply().call().then(async function(r) {
				LemonGame.totalSupply = r
			})*/
			
			await LemonGame.instance.methods.balanceOf(accounts[0]).call().then(function(r) {
				LemonGame.lemonsBalance = r
			})
			
			await LemonGame.instance.methods.raffleIndex().call().then(function(r) {
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
			//$(".lemons-totalsupply").text(LemonGame.totalSupply)
			$(".lemons-lemonsInCurrentRound").text(LemonGame.lemonsInCurrentRound)
			$(".lemons-pooledeth").text(parseFloat(web3.utils.fromWei(LemonGame.pooledEth)).toFixed(2))
			$(".lemons-timeleft").text(getTimeLeft(LemonGame.timeLeft))
			

			// Enable / disable buttons 
			let check = 0
			if(web3.utils.fromWei(LemonGame.ethBalance) > LemonGame.minBalance) {
				check++
			} else {
				$("#lemongame-status").text("Not enough ETH to mint")
			}
			if(web3.utils.fromWei(LemonGame.pooledEth) < web3.utils.fromWei(LemonGame.hardCap)) {
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
	console.log("Populate")
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
					console.log("Found lemon: "+id)
				}
				else if(uri == "https://w3.lol/img/rottenlemon.json") {
					LemonGame.ownedRottenLemons.push(id)
					console.log("Found rotten lemon: "+id)
				}
				else if(uri == "https://w3.lol/img/lemonade.json") {
					LemonGame.ownedLemonade.push(id)
					console.log("Found lemonade: "+id)
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
			let val = web3.utils.toWei((amt * LemonGame.mintPrice).toString())
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
	LemonGame.instance = null
	LemonGame.online = false
	clearInterval(LemonGame.interval)
	LemonGame.interval = null
	$("#lemongame_button_wrapper").removeClass("disabled")
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

// Returns time left from input seconds 
// Feel free to use it elsewhere in the future 
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
		if(LemonGame.lemonsInCurrentRound >= 10) {
			return "Finished!"
		} else {
			return 10 - parseInt(LemonGame.lemonsInCurrentRound) + " lemons to go"
		}
		
	} else {
		if(minuteFloor <= 0) {return secondFloor + " seconds"}
		if(hourFloor <= 0 && minuteFloor > 0) {return minuteFloor + " minutes"}
		if(dayFloor <= 0 && hourFloor > 0) {return hourFloor + " hours"}
		if(dayFloor > 0) {return dayFloor + " days"}
	}
}