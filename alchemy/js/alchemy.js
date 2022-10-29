let keysToLookFor = ["56", "57", "58", "59", "60"]

let Alchemy = {
	address: "0xf9360e25F4f47a0de4b456C9DB55F7A953b819dB",
	online: false,
	interval: null,
	backgroundSound: new Audio("alchemy/sounds/background.mp3"),
	putItemSound: new Audio("alchemy/sounds/putitem.mp3"),
	hoverSound: new Audio("alchemy/sounds/hoversound.mp3"),
	placedKeys: [],
	unlocked: false,
	claimed: false,
	hints: {
		"56": 'Nudimmud narrowed the great tribal chasms that men could move freely between them, intermingling until they cohered as one. Thereafter, they proclaimed: "O lord, thankful are we for this bounty, one which you have bestowed at a juncture duly fixed. Verily, the yoke of ignorance has lifted from our napes, founding from our many nations a kin of blood and spirit".',
		"57": "The altar demands an offering of the flesh.",
		"58": "Of the watchers, one awaits you. Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened unto you.",
		"59": "Hosts of little lies grow through every somber truth. Yearning vivaciously, seeking ultimate pleasure, your dilating appetite presumes life's inclinations.",
		"60": "U2VlayBvdXQgdGhlIHdpdGNoLg=="
	}
}

$(document).on("click", "#alchemy_button", function() {
	if(!Alchemy.online) {
		initAlchemy() 
	}
})

$(document).on("click", "#alchemy .close_button", function() {
	if(Alchemy.online) {
		resetAlchemyInstance()
	}
})

$(".alchemy-reward").on("click", function() {
	if(Alchemy.unlocked) {
		if(!Alchemy.claimed) {
			getSpooked()
		} else {
			error("Claimed already!")
		}
	}
})

$(".alchemy-item").on("click", function(r) {
	let templateId = $(this).attr("data")
	let tokenId = $(this).attr("tokenId")
	if(tokenId > 0) {
		alchemyPutItem(tokenId)
	} else {
		error(Alchemy.hints[templateId])
	}
})

$(".alchemy-item").on("mouseover", function(r) {
	$(".alchemy-item").removeClass("alchemy-item-glow")
	let item = $(this).attr("data")
	// Check if have item 
	if($(this).hasClass("owned")) {
		$(this).addClass("alchemy-item-glow")
		Alchemy.hoverSound.play()
	}
})

$(".alchemy-item").on("mouseleave", function(r) {
	$(this).removeClass("alchemy-item-glow")
})

function alchemyCheckForItems() {
	// inventoryUserItems is a var from inventory.js that has all the tokenIds the user owns 
	// inventoryUserTemplates are templateIds of those items 
	// so... 
	for(let i = 0; i < inventoryUserTemplates.length; i++) {
		if(keysToLookFor.includes(inventoryUserTemplates[i])) {
			// temp.push(i) < pushes templateIds 
			// temp.push(inventoryUserItems[i]) // < pushes tokenIds
			$(".alchemy-item[data="+inventoryUserTemplates[i]+"]").addClass("owned") // add owned class to owned item slots
			$(".alchemy-item[data="+inventoryUserTemplates[i]+"]").attr("tokenId", inventoryUserItems[i]) // add tokenId straight to item 
		}
	}
}

function alchemyUpdateKeysUI() {
	let temp = 0
	for(let i = 0; i < 5; i++) {
		if(Alchemy.placedKeys[i]) {
			$(".alchemy-item[data="+keysToLookFor[i]+"]").css({
				"background-image": "url(inventory/json/"+keysToLookFor[i]+".png)",
				"pointer-events": "none"
			})
			$(".alchemy-item[data="+keysToLookFor[i]+"]").addClass("alchemy-item-glow")
			temp++
		}
	}
	
	// If 5 keys placed, has not claimed and is a vidyan 
	if(temp == 5 && !Alchemy.claimed && Alchemy.vidyan) {
		$(".alchemy-reward").removeClass("no-pointer-events")
		$(".alchemy-reward").addClass("alchemy-item-glow")
		$(".alchemy-reward").css({
			"background-image": "url(inventory/json/lockbox.png)"
		})
	}
}

async function alchemyCheckForKeys() {
	try {
		await Alchemy.instance.methods.insertedKeys().call().then(function(r) {
			if(r !== Alchemy.placedKeys) {
				Alchemy.placedKeys = r
				alchemyUpdateKeysUI()
			}
		})
	}
	catch(e) {
		console.error(e)
	}
}

async function initAlchemy() {
	try {
		Alchemy.instance = new web3.eth.Contract(AlchemyABI, Alchemy.address)
		Alchemy.backgroundSound.loop = true
		Alchemy.backgroundSound.play() 
		$(".alchemy_button_wrapper").addClass("disabled")
		Alchemy.interval = setInterval(alchemyLoop, 2000) 
		Alchemy.online = true 
	}
	catch(e) {
		console.error(e)
	}
}

async function alchemyLoop() {
	try {
		// Check if unlocked 
		await Alchemy.instance.methods.unlocked().call().then(function(r) {
			if(r && !Alchemy.unlocked) {
				Alchemy.unlocked = true
			}
		})
		
		// Check if claimed 
		await Alchemy.instance.methods.claimed(accounts[0]).call().then(function(r) {
			if(r && !Alchemy.claimed) {
				Alchemy.claimed = true 
			}
		})
		
		// Check if vidyan 
		await Alchemy.instance.methods.vidyans(accounts[0]).call().then(function(r) {
			if(r && !Alchemy.vidyan) {
				Alchemy.vidyan = true 
			}
		})
		
		// await loadInventory() // Can't really do without this... let's see if maybe we can 
		await alchemyCheckForItems() // Check if user has keys 
		await alchemyCheckForKeys() // check for placed keys 		
		
	}
	catch(e) {
		console.error(e)
	}
}

function resetAlchemyInstance() {
	Alchemy.backgroundSound.pause()
	clearInterval(Alchemy.interval)
	Alchemy.interval = null
	$(".alchemy_button_wrapper").removeClass("disabled")
	$(".alchemy-item").removeClass("owned")
	Alchemy.instance = null 
	Alchemy.online = false 
}

async function alchemyPutItem(tokenId) {
	try {
		await Alchemy.instance.methods.putKey(tokenId).send({from: accounts[0]})
		.on("transactionHash", function(hash) {
			notify('<div class="text-align-center"><a href="https://etherscan.io/tx/'+hash+'" target="_blank">Placing</a> item on pentagram...</div>')
		})
		.on("receipt", function(receipt) {
			Alchemy.putItemSound.play() 
			notify('<div class="text-align-center">You feel an eerie presence...</div>')
			loadInventory()
		})
	}
	catch(e) {
		console.error(e)
	}
}

async function getSpooked() {
	try {
		await Alchemy.instance.methods.getSpooked().send({from: accounts[0]})
		.on("transactionHash", function(hash) {
			notify('<div class="text-align-center"><a href="https://etherscan.io/tx/'+hash+'" target="_blank">Getting</a> spooked...</div>')
		})
		.on("receipt", function(receipt) {
			Alchemy.putItemSound.play() 
			notify('<div class="text-align-center">You dun Spooked!</div>')
			$(".alchemy-reward").css({
				"background-image": "none"
			})
			loadInventory()
		})
	}
	catch(e) {
		console.error(e)
	}
}