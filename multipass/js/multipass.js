/*
	DON'T FORGET
	------------
	
	ask ghost to draw 8bit multipass icons 

	ask ghost to make 5.mp4 video for default multipass 

*/




/***
	GLOBAL VARIABLES   
***/

let MultiPass = {
	online: false,
	instance: null,
	contract: "0x1faaB2E972f08a01813Ff83Ef9E044C23B4447e2", // Goerli testnet
	collectionURL: "https://opensea.io/collection/inventory-v2",
	manualURL: "multipass/MultiPass_User_Manual.pdf",
	Filler: {
		description: "MultiPass is an experimental new concept where NFTs are backed by Ethereum which can be redeemed at any time by the owner.",
		src: "../multipass/img/5.mp4"
	},
	// Leaving these here so you know what to reset in resetMultiPassInstance() 
	activeTokenId: null,
	currentBuyPriceInWei: null,
	statistics: {},
	tokenIdsToMerge: []
}

// A little extra to use localhost stuff as the animation (It's in PASS.src too, but maybe this is faster?)
let ranks = {
	Plebeian: "../multipass/img/0",
	Gladiator: "../multipass/img/1",
	Centurion: "../multipass/img/2",
	Magister: "../multipass/img/3",
	Overlord: "../multipass/img/4"
}




/***
	EVENT LISTENERS 
***/

$(document).on("keyup", "#mp-buylevels-input, #mp-mintamt-input, #mp-burnlevels-input", function() {
	let val = $(this).val()
	let  id = $(this).attr("id")
	let max = parseInt(this.max)
	let min = parseInt(this.min)
	
	if(val !== "") { // There are also some interesting inline stuff on the html input itself
        if (parseInt(this.value) > max) {
            this.value = max
			mpUpdateId(id, max)
        }
		if(parseInt(this.value) < min) {
			this.value = min
			mpUpdateId(id, min)
		}
		
		mpUpdateId(id, val)
	}
})




/***
	CLICK EVENTS 
***/

$(document).on("click", "#mp-mint-button", function() {
	if(parseInt($("#mp-mintamt-input").val()) > 0) {
		mintMultiPass()
	}
})

$(document).on("click", "#mp-view-collection-button", function() {
	window.open(MultiPass.collectionURL)
})

$(document).on("click", "#mp-whitepaper-button", function() {
	window.open(MultiPass.manualURL)
})

$(document).on("click", ".multipass-list-item", function() {
	let tokenId = $(this).attr("data")
	// Fetch the right one from MultiPass.owned & send it to populateMultiPassDetailedView() 
	for(let i = 0; i < MultiPass.owned.length; i++) {
		if(MultiPass.owned[i].id == tokenId) {
			let PASS = MultiPass.owned[i]
			populateMultiPassDetailedView(PASS)
			// give it a glow 
			$(".multipass-list-item").removeClass("mp-list-item-highlight")
			$(this).addClass("mp-list-item-highlight")
		}
	}
	// Set activeTokenId
	MultiPass.activeTokenId = tokenId
	// Reset tokenIdsToMerge for a simpler UX hopefully (don't need to scroll and uncheck them)
	MultiPass.tokenIdsToMerge = []
	// Set the 0 index as the active token for MultiPass.sol (this is where you merge the rest into)
	MultiPass.tokenIdsToMerge.push(MultiPass.activeTokenId)
})

// Change MultiPass online status (init and reset)
$(document).on("click", "#multipass_button, #multipass .close_button", function() {
	if(!MultiPass.online) {
		MultiPass.online = true
		initializeMultiPass()
		$("#multipass_button").addClass("disabled")
	} else {
		MultiPass.online = false
		resetMultiPassInstance()
		$("#multipass_button").removeClass("disabled")
	}
})

// Handle clicks on merge button 
$(document).on("click", "#mp-merge-button", function() {
	if(MultiPass.tokenIdsToMerge.length <= 10) {
		mergeMultiPasses(MultiPass.tokenIdsToMerge)
	}
})

// Handle clicks on the burn button 
$(document).on("click", "#mp-burn-button", function() {
	if(parseInt(MultiPass.activeTokenId) > 0) {
		let tokenIdLevel
		for(let i = 0; i < MultiPass.owned.length; i++) {
			if(MultiPass.owned[i].id == MultiPass.activeTokenId) {
				tokenIdLevel = MultiPass.owned[i].level
			}
		}
		burnMultiPassLevels(MultiPass.activeTokenId, tokenIdLevel, 0) // Set 0 to burn whole token 
	} else {
		console.log("Token to burn is unknown")
	}
})

// Handles clicks on the multipasses select box & builds MultiPass.tokenIdsToMerge for use later on the merge function 
$(document).on("click", ".mp-selectpass-checkbox", function(e) {
	e.stopPropagation() // Prevent events from firing on parents (.multipass-list-item)
	let tokenId = $(this).parent().attr("data")
	if(MultiPass.activeTokenId) {
		// Check if it's not the same token 
		if(tokenId !== MultiPass.activeTokenId) {
			// Validate this array (index 0 should be the one pass you want to merge the rest into and it's set right after clicking on .multipass-list-item)
			if(MultiPass.tokenIdsToMerge.length > 0 && MultiPass.tokenIdsToMerge.length < 10) { // do one more push if it's 9, right? 
				// Make sure tokenId hasn't been already added to array 
				if(jQuery.inArray(tokenId, MultiPass.tokenIdsToMerge) == -1) {
					MultiPass.tokenIdsToMerge.push(tokenId) // push it 
					// When it got this far it makes sense to remove the disabled class on merge container
					$("#mp-merge-wrapper").removeClass("disabled")
					// Also to add a checkmark in the multipass checkbox 
					$(this).addClass("mp-checked")
					$(this).removeClass("mp-unchecked")
				} else {
					console.log("tokenId: "+tokenId+" already added... removing")
					// So... let's remove it again as the user clearly wants to UNCHECK it am i rite? 
					let index = MultiPass.tokenIdsToMerge.indexOf(tokenId)
					if (index > -1) { // only splice array when item is found
						MultiPass.tokenIdsToMerge.splice(index, 1) // 2nd parameter means remove one item only
					}
					// And remove its checkmark 
					$(this).addClass("mp-unchecked")
					$(this).removeClass("mp-checked")
					// If array length is now only 1 also disable the merge functionality 
					if(MultiPass.tokenIdsToMerge.length <= 1) {
						$("#mp-merge-wrapper").addClass("disabled")
					}
				}
			} else {
				error("You can merge up to 10 multipasses at once.")
			}
		} else {
			error("Cannot merge the multipass into itself!")
		}
	} else {
		console.log("Active tokenId not set. Try clicking on .multipass-list-item")
	}
})

// Handle clicks on buy levels button 
$(document).on("click", "#mp-buylevels-button", function() {
	let buyamt = $("#mp-buylevels-input").val()
	if(parseInt(buyamt) > 0) {
		if(MultiPass.activeTokenId) {
			buyMultiPassLevels(MultiPass.activeTokenId, buyamt)
		} else {
			console.log("MultiPass.activeTokenId is unknown.. try clicking a multipass list item.")
		}
	} else if(buyamt == "") {
		error("buyAmount input empty!")
	}
})

// Handle clicks on burn levels button
$(document).on("click", "#mp-burnlevels-button", function() {
	if(parseInt(MultiPass.activeTokenId) > 0) {
		let levelsToBurn = $("#mp-burnlevels-input").val()
		if(levelsToBurn !== "") {
			let tokenIdLevel
			for(let i = 0; i < MultiPass.owned.length; i++) {
				if(MultiPass.owned[i].id == MultiPass.activeTokenId) {
					tokenIdLevel = MultiPass.owned[i].level
				}
			}
			if(parseInt(tokenIdLevel) > parseInt(levelsToBurn)) {
				burnMultiPassLevels(MultiPass.activeTokenId, tokenIdLevel, levelsToBurn)
			}
			else if(parseInt(tokenIdLevel) == parseInt(levelsToBurn)) {
				burnMultiPassLevels(MultiPass.activeTokenId, tokenIdLevel, 0) // Burn all 
			}
			else {
				error("Can't burn levels the multipass doesn't have!")
			}
		} else {
			error("levelToBurn input empty!")
		}
	} else {
		console.log("MultiPass.activeTokenId is unknown.. try clicking a multipass list item.")
	}
})




/***
	INIT & KILL FUNCTIONS 
***/

async function initializeMultiPass() {
	try {
		// Show loading screen
		$("#multipassLoading").css("display", "flex")
		
		// Unload or set default look on multipass detailed view 
		unloadMultiPassDetailsView()
		
		// Init instance 
		MultiPass.instance = new web3.eth.Contract(MultiPassABI, MultiPass.contract)
		
		// Run these once to populate price of 1 token initially 
		updateMultiPassBuyPrice()
		updateMultiPassBuyLevelsPrice()
		updateMultiPassBurnLevelsGain("1")
		
		// Run this to populate owned passes list 
		populateMultipassList()
		
		// Run this to populate statistics 
		populateMultiPassStatistics()
		
		// Remove loading screen 
		$("#multipassLoading").css("display", "none")
		
		console.log("MultiPass now initialized!")
	}
	catch(e) {
		console.error(e)
	}
}

// Unload the whole multipass from UI (opposite of initialize())
function resetMultiPassInstance() {
	console.log("Resetting MultiPass...")
	MultiPass.instance = null
	MultiPass.Filler.description = "MultiPass is an experimental new concept where NFTs are backed by Ethereum which can be redeemed at any time by the owner."
	MultiPass.Filler.src = "../multipass/img/5.mp4"
	MultiPass.activeTokenId = null
	MultiPass.currentBuyPriceInWei = null
	MultiPass.statistics = {}
	MultiPass.tokenIdsToMerge = []
	MultiPass.online = false
	console.log("Your struggle makes you beautiful.")
}




/***
	UI FUNCTIONS  
***/

// Populate multipass detailed view 
// Note: At this point the populateMultipassList() must have completed & built the entire MultiPass.owned array (I think it's always true, but lmk if it's not...)
function populateMultiPassDetailedView(PASS) {
	$("#mp-detailed-rank").text(PASS.rank)
	$("#mp-detailed-level").text(PASS.level)
	$("#mp-detailed-reservedETH").text(PASS.reservedETH)
	$("#mp-detailed-description").text(PASS.description)
	
	let src = ranks[PASS.rank]+".mp4"
	$("#mp-video-source").attr("src", src) // Add new src 
	$("#multipassLogo")[0].load() // Reload it 
	
	// Remove disabled class from its functionality interface(s)
	$("#mp-buylevels-wrapper").removeClass("disabled")
	$("#mp-burnlevels-wrapper").removeClass("disabled")
	$("#mp-redeem-wrapper").removeClass("disabled")
}

// Set multipass details view back to default filler content & disable functionality interface(s)
function unloadMultiPassDetailsView() {
	$("#mp-detailed-rank").text("MultiPass")
	$("#mp-detailed-level").text("0")
	$("#mp-detailed-reservedETH").text("0.0000")
	$("#mp-detailed-description").text(MultiPass.Filler.description)
	
	$("#mp-video-source").attr("src", MultiPass.Filler.src)
	$("#multipassLogo")[0].load()
	
	$("#mp-buylevels-wrapper").addClass("disabled")
	$("#mp-burnlevels-wrapper").addClass("disabled")
	$("#mp-redeem-wrapper").addClass("disabled")
}

// Populate the MultiPass.owned array & draw owned passes on UI 
async function populateMultipassList() {
	try {
		MultiPass.owned = [] // Reset this array 
		$("#mp-list-of-passes").empty()
		$("#mp-list-of-passes").html('<div class="mp-list-of-passes-loading flex-box col flex-center full-width"><div>Loading...</div></div>')
		let balance = await MultiPass.instance.methods.balanceOf(accounts[0]).call()
		if(balance > 0) {
			for(let i = 0; i < balance; i++) {
				let n = await MultiPass.instance.methods.tokenOfOwnerByIndex(accounts[0], i).call()
				let x = await MultiPass.instance.methods.tokenURI(n).call()
				let j = atob(x.substring(29))
				let r = JSON.parse(j)
				
				// Reset current PASS 
				let PASS = {}
				
				// Set tokenId 
				PASS.id = n
				// Set rank
				PASS.rank = r.name
				// Set description 
				PASS.description = r.description
				// Set image / video src 
				PASS.src = r.image
				// Set level
				PASS.level = r.attributes[1].value
				// Set reserved ETH & truncate to 4 decimal places
				await MultiPass.instance.methods.ETHToReceive(PASS.level).call().then(function(r){PASS.reservedETH = web3.utils.fromWei(r).match(/^-?\d+(?:\.\d{0,4})?/)[0]})

				// Push the PASS in MultiPass.owned 
				MultiPass.owned.push(PASS)
				
				// Draw the PASS on UI
				$("#mp-list-of-passes").append('<div class="multipass-list-item relative" data="'+PASS.id+'"><div class="mp-card-level">Lv. '+PASS.level+'</div><div class="mp-selectpass-checkbox mp-unchecked"></div><div class="mp-card-reserve flex-box align-center"><span class="mini-eth-icon mp-mini-eth-icon"></span><span>'+PASS.reservedETH+'</span></div><div style="background: url(img/'+ranks[PASS.rank]+'.png); background-size: contain; background-repeat: no-repeat; background-position: bottom;" class="mp-list-item-icon"></div></div>')
			}
			
			$(".mp-list-of-passes-loading").remove() 
		} else {
			$("#mp-list-of-passes").html('<div class="flex-box col flex-center full-width"><div>You don\'t own any</div></div>')
		}
	}
	catch(e) {
		console.error(e)
	}
}

// Updates buy price field 
async function updateMultiPassBuyPrice() {
	try {
		if(MultiPass.online) {
			let buyamt = $("#mp-mintamt-input").val()
			await MultiPass.instance.methods.priceToken(buyamt).call().then(function(r) {
				MultiPass.currentBuyPriceInWei = r // set this for the mint function 
				$("#mp-total-mint-price").text(web3.utils.fromWei(r).match(/^-?\d+(?:\.\d{0,4})?/)[0])
			})
		} else {
			console.log("MultiPass is not online...")
		}
	}
	catch(e) {
		console.error(e)
	}
}

// Updates buy levels price field 
async function updateMultiPassBuyLevelsPrice() {
	try {
		if(MultiPass.online) {
			let buyamt = $("#mp-buylevels-input").val()
			if(buyamt > 0 && buyamt <= 100) {
				await MultiPass.instance.methods.priceToken("1").call().then(function(r) {
					let buyprice = web3.utils.fromWei(r).match(/^-?\d+(?:\.\d{0,4})?/)[0]
					let totalprice = buyprice * buyamt / 10 
					$("#mp-total-buylv-price").text(totalprice.toFixed(4))
				})
			}
		}
	}
	catch(e) {
		console.error(e)
	}
}

// Updates statistics view 
async function populateMultiPassStatistics() {
	try {
		if(MultiPass.online) {
			MultiPass.statistics = {} // Reset or declare this first 
			// Set totalSupply
			await MultiPass.instance.methods.totalSupply().call().then(function(r){MultiPass.statistics.totalSupply = r})
			// Set highest level
			await MultiPass.instance.methods.topLevel().call().then(function(r){MultiPass.statistics.highestLevel = r})
			// Set pooled ETH 
			await web3.eth.getBalance(MultiPass.contract).then(function(r){MultiPass.statistics.pooledETH = web3.utils.fromWei(r).match(/^-?\d+(?:\.\d{0,4})?/)[0]})
			// Set mint price 
			await MultiPass.instance.methods.priceToken("1").call().then(function(r){
				MultiPass.statistics.buyPriceOfOneLevelInWei = r
				MultiPass.statistics.mintPrice = web3.utils.fromWei(r).match(/^-?\d+(?:\.\d{0,4})?/)[0]
			})
			
			await MultiPass.instance.methods.mintCount().call().then(function(r){MultiPass.statistics.totalMinted = r})
			await MultiPass.instance.methods.burnCount().call().then(function(r){MultiPass.statistics.totalBurned = r})
			await MultiPass.instance.methods.levelsBought().call().then(function(r){MultiPass.statistics.totalLevelsBought = r})
			await MultiPass.instance.methods.levelsBurned().call().then(function(r){MultiPass.statistics.totalLevelsBurned = r})
			
			// Draw data on UI
			$(".mp-circulating-supply").text(MultiPass.statistics.totalSupply)
			$(".mp-passes-minted").text(MultiPass.statistics.totalMinted)
			$(".mp-passes-burned").text(MultiPass.statistics.totalBurned)
			$(".mp-levels-bought").text(MultiPass.statistics.totalLevelsBought)
			$(".mp-levels-burned").text(MultiPass.statistics.totalLevelsBurned)
			$(".mp-highest-level").text(MultiPass.statistics.highestLevel)
			$(".mp-pooled-eth").text(MultiPass.statistics.pooledETH)
			$(".mp-mint-price").text(MultiPass.statistics.mintPrice)
		}
	}
	catch(e) {
		console.error(e)
	}
}

// Update burn levels gain amount 
async function updateMultiPassBurnLevelsGain(levels) {
	try {
		if(MultiPass.online) {
			if(levels > 0 && levels <= 100) {
				await MultiPass.instance.methods.ETHToReceive("1").call().then(function(r) {
					$("#mp-total-burn-gain").text((web3.utils.fromWei(r).match(/^-?\d+(?:\.\d{0,4})?/)[0] * levels).toFixed(4))
				})
			}
		}
	}
	catch(e) {
		console.error(e)
	}
}




/***
	SEND TRANSACTIONS 
***/

async function mintMultiPass() {
	try {
		if(MultiPass.online) {
			let mintamt = $("#mp-mintamt-input").val()
			if(MultiPass.currentBuyPriceInWei !== null) {
				await MultiPass.instance.methods.mint(mintamt).send({from: accounts[0], value: MultiPass.currentBuyPriceInWei})
				.on("transactionHash", function(hash) {
					$("#mp-buylevels-wrapper, #mp-burnlevels-wrapper, #mp-redeem-wrapper, #mp-mint-button").addClass("disabled")
					notify('<div class="text-align-center"><a href="https://etherscan.io/tx/'+hash+'" target="_blank">MultiPass mint</a> in progress...</div>')
				})
				.on("receipt", function(receipt) {
					$("#mp-buylevels-wrapper, #mp-burnlevels-wrapper, #mp-redeem-wrapper, #mp-mint-button").removeClass("disabled")
					notify('<div class="text-align-center">MultiPass mint was successful!</div>')
					// At this point you should reload owned multipass list and statistics 
					reloadOwnedMultiPassesAndStatistics()
				})
			} else {
				console.error("MultiPass.currentBuyPriceInWei is null")
			}
		}
	}
	catch(e) {
		console.error(e)
	}
}

async function mergeMultiPasses(passes) {
	try {
		if(MultiPass.online) {
			await MultiPass.instance.methods.mergePasses(passes).send({from: accounts[0]})
			.on("transactionHash", function(hash) {
				$("#mp-buylevels-wrapper, #mp-burnlevels-wrapper, #mp-merge-wrapper, #mp-redeem-wrapper").addClass("disabled")
				notify('<div class="text-align-center"><a href="https://etherscan.io/tx/'+hash+'" target="_blank">MultiPass merge</a> in progress...</div>')
			})
			.on("receipt", async function(receipt) {
				$("#mp-buylevels-wrapper, #mp-burnlevels-wrapper, #mp-redeem-wrapper").removeClass("disabled") // except merge wrapper because there is nothing to merge 
				notify('<div class="text-align-center">MultiPass merge was successful!</div>')
				// At this point you should reload owned multipass list and statistics 
				resetTokenIdsToMerge()
				await reloadOwnedMultiPassesAndStatistics() // await because populateMultipassList() 
				reloadActiveMultipass()
			})
		}
	}
	catch(e) {
		console.error(e)
	}
}

async function burnMultiPassLevels(tokenId, tokenIdLevel, levelsToBurnInput) {
	try {
		if(MultiPass.online) {
			let temp = {message: "", success: "", burned: null, lvToBurn: null}
			if(parseInt(levelsToBurnInput) == 0 || parseInt(tokenIdLevel) == parseInt(levelsToBurnInput)) {
				temp.message = 'the entire MultiPass'
				temp.success = 'The MultiPass has been destroyed!'
				temp.burned  = true,
				temp.lvToBurn= tokenIdLevel
			} else {
				temp.message = levelsToBurnInput+' levels'
				temp.success = levelsToBurnInput+' levels have been redeemed!'
				temp.burned  = false,
				temp.lvToBurn= levelsToBurnInput
			}
			// Do the burning 
			await MultiPass.instance.methods.burnAccessLevels(tokenId, temp.lvToBurn).send({from: accounts[0]})
			.on("transactionHash", function(hash) {
				$("#mp-buylevels-wrapper, #mp-burnlevels-wrapper, #mp-redeem-wrapper").addClass("disabled")
				notify('<div class="text-align-center"><a href="https://etherscan.io/tx/'+hash+'" target="_blank">Redeeming</a> '+temp.message+'. Please wait...</div>')
			})
			.on("receipt", async function(receipt) {
				$("#mp-buylevels-wrapper, #mp-burnlevels-wrapper, #mp-redeem-wrapper").removeClass("disabled")
				notify('<div class="text-align-center">'+temp.success+'</div>')
				resetTokenIdsToMerge()
				await reloadOwnedMultiPassesAndStatistics()
				if(temp.burned) {
					unloadMultiPassDetailsView()
				} else {
					reloadActiveMultipass() // The multipass didn't burn completely 
				}
			})	
		}
	}
	catch(e) {
		console.error(e)
	}
}

async function buyMultiPassLevels(tokenId, levelsToBuy) {
	try {
		if(MultiPass.online) {
			let totalEthToSend = web3.utils.toBN(levelsToBuy).mul(web3.utils.toBN(MultiPass.statistics.buyPriceOfOneLevelInWei)).div(web3.utils.toBN("10")).toString()
			await MultiPass.instance.methods.buyAccessLevels(tokenId, levelsToBuy).send({from: accounts[0], value: totalEthToSend})
			.on("transactionHash", function(hash) {
				$("#mp-buylevels-wrapper, #mp-burnlevels-wrapper, #mp-redeem-wrapper, #mp-mint-button").addClass("disabled")
				notify('<div class="text-align-center"><a href="https://etherscan.io/tx/'+hash+'" target="_blank">Buying</a> MultiPass access levels. Please wait...</div>')
			})
			.on("receipt", async function(receipt) {
				$("#mp-buylevels-wrapper, #mp-burnlevels-wrapper, #mp-redeem-wrapper, #mp-mint-button").removeClass("disabled")
				notify('<div class="text-align-center">Bought MultiPass access levels!</div>')
				// At this point you should reload owned multipass list and statistics 
				resetTokenIdsToMerge()
				await reloadOwnedMultiPassesAndStatistics() // await because populateMultipassList() 
				reloadActiveMultipass()
			})
		}
	}
	catch(e) {
		console.error(e)
	}
}




/*** 
	HELPERS 
***/

async function reloadOwnedMultiPassesAndStatistics() {
	try {
		// Run this to populate owned passes list 
		await populateMultipassList()
		// Run this to populate statistics 
		await populateMultiPassStatistics()
	}
	catch(e) {
		console.error(e)
	}
}

// Refreshes the data on multipass screen on the actively viewed multipass 
// Note that at this point populateMultipassList() has to have updated everything 
function reloadActiveMultipass() {
	for(let i = 0; i < MultiPass.owned.length; i++) {
		if(MultiPass.activeTokenId == MultiPass.owned[i].id) {
			populateMultiPassDetailedView(MultiPass.owned[i])
		}
	}
}

// Reset tokenIdsToMerge array and remove checkmarks from UI
// Note: checkmarks probably get removed anyway as you overwrite the list?
function resetTokenIdsToMerge() {
	MultiPass.tokenIdsToMerge = []
	$("#mp-merge-wrapper").addClass("disabled") // Disable the merge functionality as no tokens are selected 
}

function mpUpdateId(id, val) {
	if(id == "mp-mintamt-input") {
		updateMultiPassBuyPrice()
	}
	else if(id == "mp-buylevels-input") {
		updateMultiPassBuyLevelsPrice()
	}
	else if(id == "mp-burnlevels-input") {
		updateMultiPassBurnLevelsGain(val)
	}
	else {
		console.log("Unknown id..")
	}
}