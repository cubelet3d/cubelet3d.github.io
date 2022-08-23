let LemonGame = {
	online: false,
	instance: null,
	interval: null,
	address: "0x5766156B354309Ee13d975053D0fdf1450cA6687",
	ownedLemons: [],
	collectionURL: "https://team3d.io"
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
	lemonGameMintLemon()
})

$(document).on("click", ".lemongame-owned-lemon", function() {
	audio.click.play()
	let id = $(this).attr("data")
	window.open(LemonGame.collectionURL + "/" + id)
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
			await LemonGame.instance.methods.tokenIds().call().then(async function(r) {
				LemonGame.totalSupply = r
			})
			await LemonGame.instance.methods.ethTracker().call().then(function(r) {
				LemonGame.pooledEth = r
			})
			await LemonGame.instance.methods.endTime().call().then(function(r) {
				LemonGame.timeLeft = r - Math.floor(Date.now() / 1000)
			})
			await web3.eth.getBalance(accounts[0]).then(function(r) {
				LemonGame.ethBalance = r
			})
			await LemonGame.instance.methods.hardCap().call().then(function(r) {
				LemonGame.hardCap = r
			})
			await LemonGame.instance.methods.rollStatus().call().then(function(r) {
				LemonGame.rollStatus = r 
			})
			
			// UI 
			$(".lemons-totalsupply").text(LemonGame.totalSupply)
			$(".lemons-pooledeth").text(parseFloat(web3.utils.fromWei(LemonGame.pooledEth)).toFixed(2))
			$(".lemons-timeleft").text(getTimeLeft(LemonGame.timeLeft))
			

			// Enable / disable buttons 
			let check = 0
			if(web3.utils.fromWei(LemonGame.ethBalance) > 0.1) {
				check++
			} else {
				$("#lemongame-status").text("Error... not enough ETH")
			}
			if(web3.utils.fromWei(LemonGame.pooledEth) < web3.utils.fromWei(LemonGame.hardCap)) {
				check++
			} else {
				if(LemonGame.rollStatus == 1) {
					$("#lemongame-status").text("Rolling dice...")
				} 
				else if(LemonGame.rollStatus == 2) {
					$("#lemongame-status").text("Game has ended!")
				}
				else {
					$("#lemongame-status").text("Error... lemons sold out!")
				}
			}
			if(check == 3) {
				$("#lemongame-status").text("Ready")
				if($("#lemongame-mintbutton").hasClass("disabled")) {
					$("#lemongame-mintbutton").removeClass("disabled")
				}
			} else {
				$("#lemongame-mintbutton").addClass("disabled")
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
		let balance = await LemonGame.instance.methods.balanceOf(accounts[0]).call()
		if(balance > 0) {
			LemonGame.ownedLemons = []
			$(".lemongame-owned-lemons-wrapper").empty()
			$(".lemongame-owned-lemons-wrapper").html('<div class="flex-box flex-center lemongame-nolemons"><div>Loading...</div></div>')
			for(let i = 1; i <= LemonGame.totalSupply; i++) {
				let x = await LemonGame.instance.methods.ownerOf(i).call()
				if(x == accounts[0]) {
					LemonGame.ownedLemons.push(i)
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

async function lemonGameMintLemon() {
	try {
		if(LemonGame.online) {
			await LemonGame.instance.methods.mintLemon().send({from:accounts[0], value: "10000000000000000"})
			.on("transactionHash", function(hash) {
				notify('<div class="text-align-center"><a href="https://etherscan.io/tx/'+hash+'" target="_blank">Minting</a> a lemon...</div>')
			})
			.on("receipt", function(receipt) {
				notify('<div class="text-align-center">You just bought a lemon!</div>')
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
	$(".lemons-totalsupply").text("...")
	$(".lemons-pooledeth").text("...")
	$(".lemons-timeleft").text("...")
}

function drawOwnedLemons() {
	$(".lemongame-owned-lemons-wrapper").empty()
	for(let i = 0; i < LemonGame.ownedLemons.length; i++) {
		$(".lemongame-owned-lemons-wrapper").append('<div class="lemongame-owned-lemon" data="'+LemonGame.ownedLemons[i]+'"></div>')
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
		return "Finished!"
	} else {
		if(minuteFloor <= 0) {return secondFloor + " seconds"}
		if(hourFloor <= 0 && minuteFloor > 0) {return minuteFloor + " minutes"}
		if(dayFloor <= 0 && hourFloor > 0) {return hourFloor + " hours"}
		if(dayFloor > 0) {return dayFloor + " days"}
	}
}