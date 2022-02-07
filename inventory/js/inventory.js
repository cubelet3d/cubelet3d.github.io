let inventoryAccounts,
    inventoryUser,
    inventoryProfilePicture,
    equipment,
    equipmentSlots = ["head", "left hand", "neck", "right hand", "chest", "legs"],
    inventoryLoaded = false
    
let inventoryContract = "0x9680223F7069203E361f55fEFC89B7c1A952CDcc",
// let inventoryContract = "0x38090E1107c3163703F6AdCb811AAfdEbBd6f651", // ROPSTEN  
    Inventory
    
let distributorContract = "0x9Ff7D98442e4169b0e4d0Eea40E778ba86b72fC8",
    Distributor
 
let VIDYA_ABI
let VIDYA
let tokenBalance

let hasMakeitStack = false

let totalTemplates = 53
    
let inventoryUserItems = [] // Array of tokenId's the user owns 
let inventoryUserTemplates = [] // Array of templateId's the user owns 
let unique_slots = []
let uris = []
let activeItemTemplateId
let activeItemEquipmentSlot
let activeItemTokenId // ERC721 id 
let activeItemFeatures = []
let inventoryUserLevel
  
async function loadInventory() {
    try {
        // inventoryAccounts = await web3.eth.getAccounts()
        inventoryUser = await accounts[0]
        Inventory = new web3.eth.Contract(inventoryABI, inventoryContract)
        
        VIDYA_ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"tokens","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"approveAndCall","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_min","type":"uint256"},{"internalType":"uint256","name":"_max","type":"uint256"}],"name":"distributePresale","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_presaleAddr","type":"address"}],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]
        VIDYA = new web3.eth.Contract(VIDYA_ABI, "0x3D3D35bb9bEC23b06Ca00fe472b50E7A4c692C30")

        // Distributor 
        Distributor = new web3.eth.Contract(distABI, distributorContract)

        await load()
        await checkBalances()
        
        // no need to await for this one, can be delayed, doesn't ruin UX 
        loadDistributor()
    }
    catch(e) {
        console.error(e)
    }
}

// Fixes equipmentPosition for all Candy Cane Scarf items 
async function scarfHotFix(_tokenId) {
	try {
		let ree = false
		let abi = [{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"check","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"execute","outputs":[],"stateMutability":"nonpayable","type":"function"}]
		let con = new web3.eth.Contract(abi,"0xad633d13213cFc52f8745a0E31AE5a725A69D3D7")
		
		await con.methods.check(_tokenId).call().then(function(r){
			ree = r
		})
		
		if(ree) {
			await con.methods.execute(_tokenId).send({from:accounts[0]})
			.on("transactionHash", function(hash) {
				notify('<div>Applying hotfix</div><div class="margin-top-05rem">Waiting for <a href="https://etherscan.io/tx/'+hash+'" target="_blank">transaction</a> to confirm...</div>')
			})
			.on("receipt", function(receipt) {
				notify('<div>Fixed! (hopefully)</div>')
			})
		} else {
			console.error("No...")
			cmdmsg("<div>Error: not a scarf...</div>")
		}
	}
	catch(e) {
		console.error(e)
	}
}

async function propagateInventorySlots(n) {
	try {
		$("#inventory-items").empty() // clean it up first. wallet switch bug-fix  
		let numberOfItems = n
		for(let i = 0; i < numberOfItems; i++) {
			$("#inventory-items").append('<div class="inventory-item flex-box row" data="'+i+'"><span class="amount"></span></div>')
		}
	}
	catch(e) {
		console.error(e)
	}
}

async function loadDistributor() {
    try {

        // As more templates are introduced, this loop can get pretty bad (will address this later)
        for(let i = 0; i < totalTemplates; i++) {
            await Distributor.methods.allowed(inventoryUser, i).call().then(function(r) {
                if(r) {
                    $.getJSON("https://team3d.io/inventory/json/"+i+".json")
                    .done(function(data) {
                        let _template = data.template
                        let _name = data.name
                        let _image = data.image
                        let _slot
                        if(data.slot == "") {
                            _slot = 0
                        } else {
                            _slot = data.slot
                        }
                        
                        let msg = "<div class=\"flex-box col flex-center\">\
                        <div class=\"margin-bottom-05rem\">New item arrived!</div>\
                        <div id=\"claimNewNFT\" data=\""+_template+"\" name=\""+_name+"\" slot=\""+_slot+"\"><img class=\"full-width full-height\" src="+_image+" alt="+_name+"/></div>\
                        </div>"
                        
                        notify(msg)

                    })
                }
            })
            
            
            /*  Oxygen Tank 
                Available until 42 are claimed 
            
            
            if(i = 36) {
                let now = Math.round(new Date().getTime()/1000)
				let amt = await Distributor.methods.amtClaimed(36).call()
                if(parseFloat(web3.utils.fromWei(amt)) < 42) {
                await Distributor.methods.claimed(36,inventoryUser).call().then(function(r) {
                    if(!r) {
                        let msg = "<div class=\"flex-box col flex-center\">\
                        <div class=\"margin-bottom-05rem\">Supply drop!</div>\
                        <div id=\"claimTimedNFT\" data=\"36\" name=\"Oxygen Tank\" slot=\"0\"><img class=\"full-width full-height\" src=\"https://team3d.io/inventory/json/36.png\" alt=\"Oxygen Tank\"/></div>\
                        </div>"
                        notify(msg)
                    } else {
                        console.log("Oxygen Tank already claimed!")
                    }
                })
                } else {
                    console.log("Event is over..")
                }
            }
			
			*/
			
			
			
            /*  Halloween even 2021 
                Available until Tue Nov 02 2021 08:00:00 GMT+0000
			
            if(i = 52) {
                let now = Math.round(new Date().getTime()/1000)
                if(now < 1635840000) {
                await Distributor.methods.claimed(52,inventoryUser).call().then(function(r) {
                    if(!r) {
                        let msg = "<div class=\"flex-box col flex-center\">\
                        <div class=\"margin-bottom-05rem\">Happy Halloween!</div>\
                        <div id=\"claimTimedNFT\" data=\"52\" name=\"Halloween mask\" slot=\"0\"><img class=\"full-width full-height\" src=\"https://team3d.io/inventory/json/52.png\" alt=\"Halloween mask\"/></div>\
                        </div>"
                        notify(msg)
                    } else {
                        console.log("Halloween mask already claimed!")
                    }
                })
                } else {
                    console.log("Event is over..")
                }
            }
			*/
			
			
            
            
            
        }
    }
    catch(e) {
        console.error(e)
    }
}

// Claim NFT
async function distributeNFT(id, slot, name) {
    try {
        await Distributor.methods.claimItem(id,slot).send({
            from: inventoryUser
        })
        .on("transactionHash", function(hash) {
			notify('<div>Claiming '+name+'</div><div class="margin-top-05rem">Waiting for <a href="https://etherscan.io/tx/'+hash+'" target="_blank">transaction</a> to confirm...</div>')
        })
        .on("receipt", function(receipt) {
			notify('<div>'+name+' claimed!</div>')
        })

        load()
    }
    catch(e) {
        console.error(e)
    }
}

// Claim Timed NFT
async function distributeTimedNFT(id, slot, name) {
    try {
        await Distributor.methods.claimTimedItem(id,slot).send({
            from: inventoryUser
        })
        .on("transactionHash", function(hash) {
            notify('<div>Claiming '+name+'</div><div class="margin-top-05rem">Waiting for <a href="https://etherscan.io/tx/'+hash+'" target="_blank">transaction</a> to confirm...</div>')
        })
        .on("receipt", function(receipt) {
            notify('<div>'+name+' claimed!</div>')
        })

        load()
    }
    catch(e) {
        console.error(e)
    }
}

async function checkBalances() {
    if(inventoryLoaded) {
        await VIDYA.methods.balanceOf(inventoryUser).call().then(function(r) {
            if(r !== tokenBalance) {
                tokenBalance = r
                $("#balance .amount").text(abbr(parseFloat(web3.utils.fromWei(tokenBalance)), 1))
                $("#tokenDetailedBalance").text(decimal(web3.utils.fromWei(tokenBalance)))

                // Has 500k vidya?
                if(parseFloat(web3.utils.fromWei(tokenBalance)) >= 500000) {
                    hasMakeitStack = true
                }
            }
        })

        await Inventory.methods.getLevel(inventoryUser).call().then(function(r) {
            if(r !== inventoryUserLevel) {
                inventoryUserLevel = r
                $("#inventoryUserLevel").text(inventoryUserLevel)
            }
        })

    }
    
    setTimeout(checkBalances, 1000)
}

async function load() {
    // Clean up inventory if there's anything there
    $(".inventory-item:not(#balance)").html('<span class="amount"></span>')
    $(".inventory-item:not(#balance)").css({
        "background-image" : ""
    })

    // ... and reset uris[] too so user doesn't see item description when they hover on an empty box (after burn/transfer)
    if(uris.length > 0) { uris = [] }

    // Load the initial user's inventory 
    inventoryUserItems = await Inventory.methods.getItemsByOwner(inventoryUser).call() // Owned item id's (erc721 id)
    inventoryUserTemplates = await Inventory.methods.getTemplateIDsByTokenIDs(inventoryUserItems).call() // template id's of those items 

    let temp_slot = {}
    let temp_slots = []
    for(let i = 0; i < inventoryUserTemplates.length; i++) {
        temp_slot = {
            "templateId" : inventoryUserTemplates[i],
            "amount" : getOccurrence(inventoryUserTemplates, inventoryUserTemplates[i]),
            "uri" : "https://team3d.io/inventory/json/"+inventoryUserTemplates[i]+".json"
        }
        
        temp_slots[i] = temp_slot
		
		
		
		// Additional functionality for Dao 
		// added on 2/3/2022 by Cope3d❤️
		let hyperCubes = ["24","25","26","27","28"]
		if(hyperCubes.includes(inventoryUserTemplates[i])) {
			Dao.UserHyperCubes[inventoryUserTemplates[i]] = true
			// Set the ERC721 tokenId as element's attribute
			$('.hypercube[data~="'+inventoryUserTemplates[i]+'"]').attr("tokenId", inventoryUserItems[i])
		}
		
		
		
    }

    // Thanks: https://dev.to/marinamosti/removing-duplicates-in-an-array-of-objects-in-js-with-sets-3fep
    unique_slots = Array.from(new Set(temp_slots.map(a => a.templateId)))
    .map(templateId => {
    return temp_slots.find(a => a.templateId === templateId)
    })
	
	// Propagate default 16 slots 
	if(unique_slots.length < 16) {
		await propagateInventorySlots(16)
	} else {
		await propagateInventorySlots(unique_slots.length) 
	}
    
    // Populate inventory slots with unique stacked items 
    for(let i = 0; i < unique_slots.length; i++) {
        
        // Set uris[] here 
        uris[i] = "https://team3d.io/inventory/json/"+unique_slots[i].templateId+".json"
        
        $(".inventory-item[data="+i+"]").css({
            "background-image" : "url(https://team3d.io/inventory/json/"+unique_slots[i].templateId+".png"
        })
        $(".inventory-item[data="+i+"] > .amount").text(abbr(unique_slots[i].amount, 1))
    }
    
    $("#inventory_button_wrapper, .inventory_button_wrapper").show("scale")
    
    inventoryProfilePicture = blockies.create({
        seed:inventoryUser.toLowerCase()
    }).toDataURL();
    $(".profile-picture").css("background-image", "url("+inventoryProfilePicture+")");
    $(".username").text(formatAddress(inventoryUser))
    
    // Load equipment
    equipment = await Inventory.methods.getEquipment(inventoryUser).call()
    
    let headItem = ""
    
    for(let i = 0; i < equipment.length; i++) {
        
        // Any non-zero values? (0 means no item)
        if(parseInt(equipment[i]) != 0) {
            let uri = await Inventory.methods.tokenURI(equipment[i]).call() // Fetch the uri (it's a .json file)
            let item = uri.substr(0, uri.lastIndexOf(".")) + ".png"; // Turn it into a .png
            
            if(parseInt(equipment[0]) != 0 && headItem == "") {
                headItem = item
            }
            
            // Assign item to its slot 
            $(".equipment[data~="+i+"]:not(.equipment[data~="+0+"])").css({
                "background" : "url("+item+")",
                "background-size" : "cover"
            })
            
            // Note to self: gotta make this more efficient as more items are introduced in the future!!
            let filename = uri.replace(/^.*[\\\/]/, '')
            if(filename == "32.json") {
                // Santa hat found, fetch its extra CSS
                $.getJSON( uri, function( data ) {
                    var items = {}
                    $.each( data, function( key, val ) {
                        items[key] = val
                    })
                    
                    // Apply better looking CSS
                    $(".head-slot").css({
                        "width" : " "+items.width+"px ",
                        "height" : " "+items.height+"px ",
                        "top" : " "+items.top+"px ",
                        "left" : " "+items.left+"px "
                    })
                })
            }
			
			// Custom CSS for phats... yes I know, please give me a break. 
			if(filename == "46.json" || filename == "47.json" || filename == "48.json" || filename == "49.json" || filename == "50.json" || filename == "51.json") {
				$(".head-slot").css({
					"transform" : "rotate(25deg)",
					"width" : "42px",
					"height" : "42px",
					"top" : "-28px"
				})
			}
        }

    }
    
    // Assign headItem if found at this point 
    $("#head-slot").css({
        "background" : "url("+headItem+")",
        "background-size" : "cover"
    })

    // Make it official 
    inventoryLoaded = true;
}

async function getFeaturesOfItem(tokenId) {
    $("#item-submenu-detailed").html('<div>Loading...</div>')
    
    try {
        await Inventory.methods.getFeaturesOfItem(tokenId).call().then(function(r) {
            activeItemFeatures = r
            $("#item-submenu-detailed").html('<div class="tokenId">ERC721 ID: '+tokenId+'</div><div class="features">Features: '+activeItemFeatures+'</div>')
            
            // Populate the #actions container here with burn, transfer, etc buttons
            $("#actions").html('<button id="send" class="inventory-button" tokenid="'+tokenId+'">Send</button>')
            
            // Add open button for treasure chests 
            if(activeItemTemplateId == 6) {
                $("#actions").append('<button id="burn" class="inventory-button" tokenid="'+tokenId+'">Open</button>')
            }
        })
    }
    catch(e) {
        console.error(e)
    }
    
}

async function burn(tokenId) {
    try {
        await Inventory.methods.burn(tokenId).send({
            from: inventoryUser
        })
        .on("transactionHash", function(hash) {
            
            let msg
            
            // 6 = treasure chest 
            // So let's show opening chest instead of burning it 
            if(activeItemTemplateId == "6") {
                msg = '<div>Opening treasure chest with id: '+tokenId+'</div>'
            } else {
                msg = '<div>Burning token with id: '+tokenId+'</div>'
            }
            
            notify(msg)
            
        })
        .on("receipt", function(receipt) {
            if(activeItemTemplateId == "6") {
                
                let rewardInHex = receipt.events[0].raw.data
                let rewardInNumber = web3.utils.fromWei(web3.utils.hexToNumberString(rewardInHex))
                
                msg = '<div>You opened a treasure chest...</div>\
                <div>...and found '+rewardInNumber+' VIDYA inside!!</div>'
            } else {
                msg = '<div>Token with id: '+tokenId+' successfully burned!</div>'
            }
            
            notify(msg)
            
            cleanup("transferERC721")
            load()
        })
    }
    catch(e) {
        console.error(e)
    }
}

async function checkVidya(amount,address) {
    try {
        await VIDYA.methods.balanceOf(inventoryUser).call().then(function(r) {
            if( parseFloat(web3.utils.fromWei(r)) >= parseFloat(web3.utils.fromWei(amount)) ) {
                transferVidya(amount,address) 
            } else {
                console.error("Not enough tokens")
            }
        })
    }
    catch(e) {
        console.error(e)
    }
}

async function transferVidya(amount,address) {

    try {
        await VIDYA.methods.transfer(address,amount).send({
            from: inventoryUser
        })
        .on("transactionHash", function(hash) {
            let msg = '<div>\
                Sending '+web3.utils.fromWei(amount)+' VIDYA to '+formatAddress(address)+'</div>\
                <div class="margin-top-05rem">Waiting for <a href="https://etherscan.io/tx/'+hash+'" target="_blank">transaction</a> to confirm...</div>'
            notify(msg)
        })
        .on("receipt", function(receipt) {
            let msg = '<div>Transfer of '+web3.utils.fromWei(amount)+' VIDYA to '+formatAddress(address)+' was successful!</div>'
            notify(msg)
            cleanup("transferVidya")
            load()
        })
    }
    catch(e) {
        console.error(e)
    }
}

async function transferERC721(receiver,tokenId) {
    try {
        await Inventory.methods.transferFrom(inventoryUser, receiver, tokenId).send({
            from: inventoryUser
        })
        .on("transactionHash", function(hash) {
            let msg = '<div>\
                Sending token with ID '+tokenId+' to '+formatAddress(receiver)+'</div>\
                <div class="margin-top-05rem">Waiting for <a href="https://etherscan.io/tx/'+hash+'" target="_blank">transaction</a> to confirm...</div>'
            notify(msg)
        })
        .on("receipt", function(receipt) {
            let msg = '<div>Transfer of token with ID '+tokenId+' to '+formatAddress(receiver)+' was successful!</div>'
            notify(msg)
            cleanup("transferERC721")
            load()
        })
    }
    catch(e) {
        console.error(e)
    }
}

async function equip(activeItemTokenId, activeItemEquipmentSlot) {
    try {
        await Inventory.methods.equip(activeItemTokenId, activeItemEquipmentSlot).send({
            from: inventoryUser
        })
        .on("transactionHash", function(hash) {
            let msg = '<div>\
                Equipping item with ID '+activeItemTokenId+' to slot "'+equipmentSlots[activeItemEquipmentSlot]+'"</div>\
                <div class="margin-top-05rem">Waiting for <a href="https://etherscan.io/tx/'+hash+'" target="_blank">transaction</a> to confirm...</div>'
            notify(msg)
        })
        .on("receipt", function(receipt) {
            let msg = '<div>Equipped item with ID '+activeItemTokenId+' to slot "'+equipmentSlots[activeItemEquipmentSlot]+'"!</div>'
            notify(msg)
            cleanup("transferERC721")
            load() 
        })
    }
    catch(e) {
        console.error(e)
    }
}

async function approveVidya(amount) {
    try {
        await VIDYA.methods.approve(inventoryContract, web3.utils.toWei(amount)).send({
            from: inventoryUser
        })
        .on("transactionHash", function(hash) {
            notify('<div>Approving VIDYA...</div>')
        })
        .on("receipt", function(receipt) {
            notify('<div>VIDYA Approved!</div>')
            cleanup("transferERC721")
            load()
        })
    }
    catch(e) {
        console.error(e)
    }
}

// Truncates decimal places without rounding
function decimal(number) {
    // Truncate to 4 decimal places 
    let temp = number.match(/^-?\d+(?:\.\d{0,4})?/)[0];
    // Slap commas here and there 
    return temp.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatAddress(address) {
    let firstSix = address.substring(0, 6)
    let lastFour = address.substr(address.length - 4)
    return firstSix + "..." + lastFour
}

// Count the number of times value appears in array 
// https://stackoverflow.com/a/37366345
function getOccurrence(array, value) {
    var count = 0
    array.forEach((v) => (v === value && count++))
    return count
}

// https://stackoverflow.com/a/20798567
function getAllIndexes(arr, val) {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}

/* Yeah no, I'm not that smart 
Thanks: https://stackoverflow.com/a/32638472 */
abbr = function(num, fixed) {
  if (num === null) { return null; } // terminate early
  if (num === 0) { return '0'; } // terminate early
  fixed = (!fixed || fixed < 0) ? 0 : fixed; // number of decimal places to show
  var b = (num).toPrecision(2).split("e"), // get power
      k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
      c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3) ).toFixed(1 + fixed), // divide by power
      d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
      e = d + ['', 'K', 'M', 'B', 'T'][k]; // append power
  return e;
}

function itemSubMenuInView() { return $('#item-submenu > .user-items').html().length > 0 }
function itemSubMenuDetailedInView() { return $("#item-submenu-detailed").html().length > 0 }
function actionsInView() { return $("#actions").html().length > 0 }

/*  Could also use this below in the future
    Remember that the element needs to be empty()*/
function elementInView(element) { return $(element).html().length > 0 }

function cleanup(event) {

    switch(event) {
        case "transferERC721":
            // Clean up everything
            $("#actions").empty()
            $("#item-submenu > .user-items").empty()
            break;
            
        case "transferVidya":
            // Don't clean up...
            break;
    }
    
    // If #item-submenu-detailed is visible and this isn't triggered by inventory mouseleave, reset its contents
    if(itemSubMenuDetailedInView() && event !== "inventoryMouseLeave") {
        $("#item-submenu-detailed").empty()
    }
    
    // Same goes for #actions where send/burn buttons would otherwise get their id's messed up 
    if(actionsInView() && event !== "inventoryMouseLeave") { 
        $("#actions").empty() 
    }
    
    // When user is not looking at submenu item (ie. just hovering on items in the beginning)
    if(!itemSubMenuInView()) {
        if(uris.length == 0) {
            $("#examine").text("You haven't found any items yet...")
        } else {
            $("#examine").text("Hover an item to inspect it")
        }
    }
    
}

function fetchUriData(id, action) {
    cleanup() // Clean up all unnecessary stuff
    
    switch(action) {
        case "hover":
            break;
    }
    
    let inventoryItemsWidth = $("#inventory-items").outerWidth()
    $("#item-submenu, #item-submenu-detailed").css({
        "width" : ""+inventoryItemsWidth+"px"
    })
    
    if(id == "balance") {
        
        $("#examine").html('<div class="item-name">VIDYA</div>\
        <div class="item-description">'+printQuote()+'</div>')
        
        if(action == "click") {
            
            $("#examine > .item-description").html('<div><span>Balance: </span><span id="tokenDetailedBalance">'+decimal(web3.utils.fromWei(tokenBalance))+'</span></div>')

            // If #actions in view from looking at ERC721's earlier 
            if(actionsInView()) { $("#actions").empty() }
            
            $("#item-submenu > .user-items").html('\
<div class="flex-box col full-width">\
    <div class="font-size-70percent">Amount:</div>\
    <input id="transferVidyaAmount" class="input amount" type="number"></input>\
    <div class="font-size-70percent">Recepient:</div>\
    <div id="sendFormWrapper" class="flex-box">\
        <input id="receiverVidyaAddress" class="input amount full-width center-vertical" spellcheck="false"></input>\
        <button id="transferVidyaButton" class="inventory-button">Send</button>\
    </div>\
</div>')

            $("#transferVidyaAmount").css({
                "width" : "50%",
                "height" : ""+$("#sendFormWrapper").height()+"px"
            })
        }

    } else {
        // Fetch description from uri 
        if(id < uris.length) {
            $("#examine").text("Loading...")
            
            $.getJSON(uris[id])
            .done(function(data) {
                activeItemTemplateId = data.template
                activeItemEquipmentSlot = data.slot
                $("#examine").html('<div class="item-name">'+data.name+'</div><div class="item-description">'+data.description+'</div>')
                
                // Click actions 
                if(action == "click") {
                    // Get all indexes from inventoryUserTemplates[] where activeItemTemplateId appears 
                    // These (should) point to the correct ERC721 tokenId in inventoryUserItems[]
                    let templateIndexes = getAllIndexes(inventoryUserTemplates, activeItemTemplateId)
                    
                    // Get the ERC721 tokenIds that match our activeItemTemplateId template 
                    let result = []
                    for(let i = 0; i < templateIndexes.length; i++) {
                        result.push( inventoryUserItems[templateIndexes[i]] )
                    }
                    
                    // Propagate #item-submenu 
                    $("#item-submenu > .user-items").empty()
                    for(let i = 0; i < result.length; i++) {
                        $("#item-submenu > .user-items").append('<div class="inventory-item submenu-item" tokenid="'+result[i]+'"></div>')
                        $(".submenu-item").css({
                            "background-image" : "url(https://team3d.io/inventory/json/"+activeItemTemplateId+".png"
                        })
                    }
                }
            })
        }
    }
}

// Quotes
let quotes = [
"Vidya token will send your parents to space",
"Vidya token will bring world peace",
"Vidya token will solve world hunger",
"Vidya token will reverse global warming",
"Vidya token has information that will lead to the arrest of Hillary Clinton",
"Backed by nothing other than a promise from anonymous devs to continue developing games" // Sorry Ghost, I can't remove this line. It's wrong. Fuck the normies.
]
function printQuote() {return quotes[randInt(0, quotes.length - 1)]}
function randInt(min,max) {return Math.floor(Math.random() * (max - min + 1) + min)}

$(document).ready(function() {
    $("#balance").css({
        "background-image" : "url(https://team3d.io/img/icons/vidyarotate.gif)"
    })
    
    // Hover on inventory item
    $(".inventory-item").on("mouseover", function() {
        let id = $(this).attr("data")
        
        // Prevent long paragraphs from stretching the #examine out of bounds by giving it a fixed width 
        let width = $("#examine").outerWidth()
        $("#examine").css({
            "width" : ""+width+"px"
        })

        // Fetch the uri if there are no currently selected items
        if( $("#inventory .inventorySelectedItem").length == 0) {
            fetchUriData(id, "hover")
        }
    })

    // Click on inventory item 
    $(document).on("click", ".inventory-item", function() {
        cleanup()
        
        let id = $(this).attr("data")

        $("#inventory .inventorySelectedItem").removeClass("inventorySelectedItem") // Remove bg from all 
        $(this).addClass("inventorySelectedItem") // Add bg to selected only 

        fetchUriData(id, "click")
    })
    
    
    // Mouseover on character equipment slot 
    $("#character").on("mouseover", ".equipment", function(e) {
        
        // Is the user in detailed view?
        if(itemSubMenuDetailedInView()) {
            let slot = $(this).attr("data")
            if(activeItemEquipmentSlot == slot) {
                $(this).addClass("equip-active")
            }
        }
    })
    
        // Removes the slot background effect..
        $("#character").on("mouseleave", ".equipment", function(e) {
            if($(this).hasClass("equip-active")) {
                $(this).removeClass("equip-active")
            }
        })
        
    
    // Click on character equipment slot
    $("#character").on("click", ".equipment", function(e) {
        
        // Is the user in detailed view?
        if(itemSubMenuDetailedInView()) {
            
            // Should we eve bother? 
            if($(this).hasClass("equip-active")) {
                equip(activeItemTokenId, activeItemEquipmentSlot)
            }
        }
    })
    
    // Click on submenu item with tokenId 
    $("#item-submenu").on("click", ".submenu-item", function(e) {
        
        let tokenId = $(this).attr("tokenid")
        activeItemTokenId = tokenId
        
        if(tokenId) {
            $("#inventory .inventorySelectedItem").removeClass("inventorySelectedItem") // Remove bg from all 
            $(this).addClass("inventorySelectedItem") // Add bg to selected only
            
            $("#item-submenu-detailed").text("Loading...")
            getFeaturesOfItem(tokenId)
            $("#item-submenu-detailed").text(activeItemFeatures)
        }
    })
    
    // Click on #actions buttons 
    $("#actions").on("click", function(e) {
        switch($(e.target).attr("id")) {
            case "burn":
                burn($(e.target).attr("tokenid"))
                break;
                
            case "send":
                $("#item-submenu-detailed").html('<div class="flex-box col full-width">\
                  <div class="font-size-70percent">Receiver:</div>\
                  <div class="flex-box">\
                  <input id="receiverERC721" class="input amount full-width center-vertical" spellcheck="false" tokenid="'+$(e.target).attr("tokenid")+'"></input>\
                  <button id="confirmERC721Transfer" class="inventory-button">Go</button>\
                  </div>\
                  </div>')
                break;
        }
    })
    
    $("#item-submenu-detailed").on("click", "#confirmERC721Transfer", function() {
        let tokenId = $("#receiverERC721").attr("tokenId")
        let receiver = $("#receiverERC721").val()
        
        if(web3.utils.isAddress(receiver)) {
            transferERC721(receiver,tokenId)
        }
    })
    
    // Handle transfer vidya button 
    $("#item-submenu").on("click", "#transferVidyaButton", function(e) {
        let amount, address
        let a, b = false
        
        if( parseFloat($("#transferVidyaAmount").val()) > 0 ) {
            amount = web3.utils.toWei( $("#transferVidyaAmount").val() )
            a = true
        } else {
            console.error("Invalid amount: "+amount)
        }
        
        if( web3.utils.isAddress( $("#receiverVidyaAddress").val() ) ) {
            address = $("#receiverVidyaAddress").val()
            b = true
        }
        
        if(a && b) {
            checkVidya(amount, address)
        }
    })

    // Reset #examine and #item-submenu on mouseleave 
    $("#inventory").on("mouseleave", function() {
        if(!itemSubMenuInView()) {
            $("#inventory .inventorySelectedItem").removeClass("inventorySelectedItem") // remove bg from active item
        }
        cleanup("inventoryMouseLeave")
    })

    // Approve Vidya 
    $("#approveVidyaButton").on("click", function(r) {
        approveVidya("1000")
    })
    
    // Claim nft
    $("body").on("click", "#claimNewNFT", function(e) {
        let _id = parseInt($(this).attr("data"))
        let _slot = parseInt($(this).attr("slot"))
        let _name = $(this).attr("name")
        distributeNFT(_id, _slot, _name)
    })
    
    // Claim timed nft (new notify.js method)
    $("body").on("click", "#claimTimedNFT", function(e) {
        let _id = parseInt($(this).attr("data"))
        let _slot = parseInt($(this).attr("slot"))
        let _name = $(this).attr("name")
        distributeTimedNFT(_id, _slot, _name)
    })
    
})