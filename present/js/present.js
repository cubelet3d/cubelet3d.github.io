const presentABI = [
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "bank",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_eventId",
				"type": "uint256"
			}
		],
		"name": "claimPresent",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "contract ERC20",
				"name": "t",
				"type": "address"
			}
		],
		"name": "claimTokens",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_admin",
				"type": "address"
			}
		],
		"name": "editAdmin",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_bank",
				"type": "address"
			}
		],
		"name": "editBank",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_eventId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_range",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_offset",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_eventEnd",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "editEvent",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "eventEnd",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "nonce",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "offset",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "presentClaimed",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "price",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "range",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
const presentAddress = "0xa53a32051190331688E330fBFE0ae55099D4B8bd"
let Present // Contract instance 
let PresentEventId = 0 // Admin change this for every new event 

$(document).ready(function() {
    checkForInventory()
	
    $("#present_button").click(function() {
        claimPresent()
    })
	
	$("#PresentMobile").click(function() {
		claimPresent()
	})
})
async function claimPresent() {
    try {
        await Present.methods.claimPresent(PresentEventId).send({from:inventoryUser})
		.on("transactionHash", function(hash) {
			notify('<div class="text-align-center"><a href="https://etherscan.io/tx/'+hash+'" target="_blank">Claiming</a> present...</div>')
		})
		.on("receipt", function(receipt) {
			$("#present_button_wrapper").hide()
			loadInventory() // refresh 
			notify('<div class="text-align-center">Present claimed!</div>')
		})
    }
    catch(e) {
        console.log(e)
    }
}

// Checks for when inventory gets loaded aka. user logs in with metamask 
function checkForInventory() {
	if(!inventoryLoaded) {
		setTimeout(checkForInventory, 1000)
	} else {
		// Inventory is loaded, user is authenticated!
		Present = new web3.eth.Contract(presentABI, presentAddress)
		checkIfEligible()
	}
}

async function checkIfEligible() {
	let a = false // can claim because not claimed yet 
	let b = false // can claim because event is not over yet 
	try {
		await Present.methods.presentClaimed(PresentEventId, inventoryUser).call().then(function(r) {
			if(!r) {
				a = true
			}
		})
		await Present.methods.eventEnd(PresentEventId).call().then(function(r) {
			let now = Math.round(new Date().getTime()/1000)
			if(now <= r) {
				b = true
			}
		})
		
		// Final check, both need to be true 
		if(a && b) {
			$("#present_button_wrapper").show("scale")
			if(isMobile) {
				$(".present_button_wrapper").show("scale")
			}
		} else {
			// Can't claim
		}
	}
	catch(e) {
		console.error(e)
	}
}