// Admin function
async function adminSetup() {
	try {
		await Generator.teller.methods.addCommitment("4", "7", "2", "1000").send({from: accounts[0]}).then(console.log("Option 1 added!"))
		await Generator.teller.methods.addCommitment("10", "14", "5", "1000").send({from: accounts[0]}).then(console.log("Option 2 added!"))
		await Generator.teller.methods.addCommitment("290", "30", "145", "10000").send({from: accounts[0]}).then(console.log("Option 3 added!"))
		await Generator.teller.methods.addCommitment("990", "92", "495", "10000").send({from: accounts[0]}).then(console.log("Option 4 added!"))
		await Generator.teller.methods.addCommitment("22", "182", "11", "100").send({from: accounts[0]}).then(console.log("Option 5 added!"))
		await Generator.teller.methods.addCommitment("50", "365", "25", "100").send({from: accounts[0]}).then(console.log("Option 6 added!"))
		
		// await Generator.teller.methods.toggleCommitment("1").send({from: accounts[0]}).then(console.log("Toggled commitment: 1"))
		// await Generator.teller.methods.toggleCommitment("2").send({from: accounts[0]}).then(console.log("Toggled commitment: 2"))
		// await Generator.teller.methods.toggleCommitment("3").send({from: accounts[0]}).then(console.log("Toggled commitment: 3"))
		// await Generator.teller.methods.toggleCommitment("4").send({from: accounts[0]}).then(console.log("Toggled commitment: 4"))
		// await Generator.teller.methods.toggleCommitment("5").send({from: accounts[0]}).then(console.log("Toggled commitment: 5"))
		// await Generator.teller.methods.toggleCommitment("6").send({from: accounts[0]}).then(console.log("Toggled commitment: 6"))
	}
	catch(e) {
		console.error(e)
	}
}

let Vault 

let Generator = {
	endCommitClick: 0,
	daysDrawn: false,
	notification: false, // When a user has 0 balance the notify() is used to link them to uniswap. This bool prevents the popup from showing over and over again.
	teller: null,
	instance: null,
	online: false,
	pool: {
		dai: {
			approved: false,
			token: "0x0000000000000000000000000000000000000000", // DAI token address 
			lptoken: "0x0000000000000000000000000000000000000000", // The LP token for TKN/DAI pair 
			teller: "0x0000000000000000000000000000000000000000" // The Teller contract address for TKN/DAI pool 
		},
		eth: {
			approved: false,
			token: "0xc778417e063141139fce010982780140aa0cd5ab", // WETH token address 
			lptoken: "0x18691f5bcedd9f363ce306f7dfb25bde8e1d1cd9", // The Uniswap V2 LP token for VIDYA/ETH 
			teller: "0xA00158168C06943C014F9413f57eBeb78Ca36E6D", // The Teller contract address for VIDYA/ETH pool 
			url: "https://app.uniswap.org/#/add/v2/ETH/0x0CbCaFD9f1B9d7c41B6F55BbddE06Bee3Aa7B791"
		},
		dark: {
			approved: false,
			token: "0x0000000000000000000000000000000000000000", // Dark matter token address 
			lptoken: "0x0000000000000000000000000000000000000000", // The LP token for TKN/DARK pair 
			teller: "0x0000000000000000000000000000000000000000" // The Teller contract address for TKN/DARK pool 
		},
		single: {
			approved: false,
			token: "0x0CbCaFD9f1B9d7c41B6F55BbddE06Bee3Aa7B791",
			lptoken: "0x0CbCaFD9f1B9d7c41B6F55BbddE06Bee3Aa7B791",
			teller: "0xad5d3c75DcBEbe5B2d22577115A465A32d6650F0",
			url: "#"
		}
	},
	commitmentOptions: {
		1: {
			days: 7,
			bonus: 0.4
		},
		2: {
			days: 14,
			bonus: 1
		},
		3: {
			days: 30,
			bonus: 2.9
		},
		4: {
			days: 92,
			bonus: 9.9
		},
		5: {
			days: 182,
			bonus: 22
		},
		6: {
			days: 365,
			bonus: 50
		}
	},
	commitmentOptionsSingle: {
		1: {
			days: 14,
			bonus: 0.4
		},
		2: {
			days: 28,
			bonus: 1
		},
		3: {
			days: 60,
			bonus: 2.9
		},
		4: {
			days: 184,
			bonus: 9.9
		},
		5: {
			days: 364,
			bonus: 22
		},
		6: {
			days: 730,
			bonus: 50
		}
	}
}

let User = {
	isSetup: false,
	canDepositLP: false,
	canWithdrawLP: false,
	canCommit: false,
	selectedOption: null, // The selected commitment option on the UI (Generator.commitmentOptions)
	commitment: {
		status: false,
		matured: false,
		timeLeft: "0", // Time left until commitment matures 
		amount: "0", // Amt commited 
		index: "0" // The index in commitmentInfo[] in Teller contract = Generator.commitmentOptions[User.commitment.index]
	},
	pendingDeposit: false,
	pendingWithdraw: false,
	pendingCommit: false,
	pendingClaim: false,
	pendingBreakCommit: false,
	balance: "0", // Current pools lptoken balance in wei 
	deposited: "0", // Current pools deposited lptoken for this user 
	depositAvailableToWithdraw: "0", // lp token that is not locked and can be withdrawn right now
	depositAvailableToCommit: "0", // same as above just for commit 
	rewards: "0", // rewards the user can claim right now 
	currentPool: null,
	currentTeller: "0x0000000000000000000000000000000000000000", // active teller for this user 
	currentLPToken: "0x0000000000000000000000000000000000000000" // active generator for this user
}

let generatorInterval = null
let generatorFullyLoaded = false

$(document).ready(function() {
	// Guide 
	$("#generatorGuideLink").on("click", function() {
		window.open("generator/User_Manual.pdf")
	})
	
	$("body").on("mouseover", "#generator_button", function() {
		$("#generator_button .icon").removeClass("generator").addClass("generator-hover")
	})
	$("body").on("mouseleave", "#generator_button", function() {
		$("#generator_button .icon").removeClass("generator-hover").addClass("generator")
	})
	
	// Deposit LP token input field listener 
	$(document).on("input", "#generator-deposit-container input", function() {
		resetCommitSelection()
		$(".generator-input-field").not($(this)).val("")
		$("#generator-withdraw-lp-button, #generator-commit-lp-button").addClass("disabled")
		if($(this).val() > 0 && User.canDepositLP) {
			// If input field value is > 0 and user can deposit then enable the confirm button 
			$("#generator-deposit-lp-button").removeClass("disabled")
		} else {
			$("#generator-deposit-lp-button").addClass("disabled")
		}
	})
	
	// Withdraw LP token input field listener similar to deposit button... 
	$(document).on("input", "#generator-withdraw-container input", function() {
		resetCommitSelection()
		$(".generator-input-field").not($(this)).val("")
		$("#generator-deposit-lp-button, #generator-commit-lp-button").addClass("disabled")
		if($(this).val() > 0 && User.canWithdrawLP) {
			$("#generator-withdraw-lp-button").removeClass("disabled")
		} else {
			$("#generator-withdraw-lp-button").addClass("disabled")
		}
	})
	
	// Commit LP token input field listener similar to above...
	$(document).on("input", "#generator-commit-container input", function() {
		$(".generator-input-field").not($(this)).val("")
		$("#generator-deposit-lp-button, #generator-withdraw-lp-button").addClass("disabled")
		if($(this).val() > 0 && User.canCommit) {
			$("#generator-commit-lp-button").removeClass("disabled")
		} else {
			$("#generator-commit-lp-button").addClass("disabled")
		}
	})
	
	// Claim rewards button handler 
	$(document).on("click", "#generator-claim-button", function() {
		claimRewards()
	})
	
	// Enable / Approve button 
	$(document).on("click", ".generator-enable-button", function() {
		let pool = $(this).attr("pool")
		let action = $(this).attr("action")
		if(pool != void null && action != void null) {
			switch(action) {
				case "enable":
				generatorEnable(pool)
				break;
				case "disable":
				generatorDisable(pool)
				break;
			}
		} else {
			// If for some reason button attribute is not set
			error("Could not detect current pool. Try refreshing the page.")
		}
	})
	
	// Set generator online status 
	$("body").on("click", "#generator_button, #generator .close_button", function() {
		if(!Generator.online) {
			Generator.online = true
			loadGeneratorRates()
			$("#generator_button").addClass("disabled")
		} else {
			Generator.online = false
			resetUserInstance() 
			$("#generator_button").removeClass("disabled")
		}
	})
	
	$("body").on("click", ".generator-enter-button", function() {
		generatorLoadingScreen() // Show overlay upon entering a pool (gets removed after loop has run once)
		let pool = $(this).closest(".generator-option").attr("data")
		$(".generator-enable-button").attr("pool", pool) // Attribute for approve button 
		audio.open.play()
		$(".generator-menu, .generator-title").hide()
		$("#pool-title").text(pool)
		$("#pool-title").attr("data", pool)
		if(pool === "dark") {
			$("#pool-title-2").text("ETH")
		} else {
			$("#pool-title-2").text("VIDYA")
		}
		$("#available").text(web3.utils.fromWei(User.balance))
		$("#deposited").text(web3.utils.fromWei(User.deposited))
		$("input").val("")
		$(".generator-pool").show("fold")

		// Start the loop 
		User.currentPool = pool
		generatorInterval = setInterval(generatorLoop, 2000)
	})
	
	$("body").on("click", ".generator-back-button", function() {
		$(this).closest(".generator-pool").hide()
		$(".generator-menu, .generator-title").show()
		resetUserInstance() 
	})
	
	// Handle user input & button clicks for Deposit and Withdraw 
	$("body").on("click", ".generator-user-input .generator-deposit-withdraw", function() {
		let button  = $(this)
		let pool	= $("#pool-title").attr("data") // DAI, ETH, DARK, etc.
		let type    = button.closest(".generator-user-input").attr("data") // Action type either deposit or withdraw
		let action  = button.attr("data") // Which button was pressed: either 'max' or 'confirm'
		let value   = button.closest(".generator-user-input").find(".generator-input-field").val() // Value of input field

		switch(type) {
			case "deposit":
				if(action == "max") {
					$(".generator-input-field").val("")
					$("#generator-withdraw-lp-button, #generator-commit-lp-button").addClass("disabled")
					button.closest(".generator-user-input").find(".generator-input-field").val(web3.utils.fromWei(User.balance))
					if(User.balance > 0) {
						// For UX, if user has a balance remove disabled class from confirm button, duh. 
						$("#generator-deposit-lp-button").removeClass("disabled")
					} else {
						error("You don't have any tokens to deposit. Try adding liquidity on Uniswap first!")
					}
				}
				else if(action == "confirm") {
					if(parseFloat(value) > 0) {
						if(parseFloat(value) <= parseFloat(web3.utils.fromWei(User.balance))) {
							prepareTransaction(pool, type, value)
						} else {
							error("Cannot deposit more than what you have")
						}
					} else {
						error("Invalid value!")
					}
				}
				else {
					error("Unknown command!")
				}
				break;
			case "withdraw":
				if(action == "max") {
					$(".generator-input-field").val("")
					$("#generator-deposit-lp-button, #generator-commit-lp-button").addClass("disabled")
					button.closest(".generator-user-input").find(".generator-input-field").val(web3.utils.fromWei(User.depositAvailableToWithdraw))
					if(User.depositAvailableToWithdraw > 0) {
						$("#generator-withdraw-lp-button").removeClass("disabled")
					} else {
						error("You don't have any available / unlocked tokens to withdraw.")
					}
				}
				else if(action == "confirm") {
					if(parseFloat(value) > 0) {
						if(parseFloat(value) <= parseFloat(web3.utils.fromWei(User.depositAvailableToWithdraw))) {
							prepareTransaction(pool, type, value)
						} else {
							error("Cannot withdraw more than what you have deposited")
						}
					} else {
						error("Invalid value!")
					}
				}
				else {
					error("Unknown command!")
				}
				break;
		}
		
		resetCommitSelection()
	})
	
	// Handle user input & button clicks for Commitment options 
	$(document).on("click", ".generator-user-input .generator-vesting-option", function() {
		$(".generator-vesting-option").removeClass("generator-button-pressed")
		$(this).addClass("generator-button-pressed")
		let option = $(this).attr("data")
		User.selectedOption = option
	})
	
	$(document).on("click", ".generator-vesting", function() {
		let button  = $(this)
		let pool	= $("#pool-title").attr("data") // DAI, ETH, DARK, etc.
		let action  = button.attr("data") // Which button was pressed (max or confirm)
		let value	= null
		
		switch(action) {
			case "max":
				$(".generator-input-field").val("")
				$("#generator-deposit-lp-button, #generator-withdraw-lp-button").addClass("disabled")
				// Check if user has anything to commit 
				if(User.depositAvailableToCommit > 0) {
					$("#generator-commit-container input").val(web3.utils.fromWei(User.depositAvailableToCommit)) // Fill the input field 
					$("#generator-commit-lp-button").removeClass("disabled") // Enable confirm button  
				} else {
					error("Nothing to commit! Make sure you have available LP tokens that are not already commited.")
					$("#generator-commit-container input").val("")
					$("#generator-commit-lp-button").addClass("disabled")
				}
			break;
			
			case "confirm":
				if(User.selectedOption != null) {
					value = $("#generator-commit-container input").val() // Set value
					if(value > 0) {
						if(value <= User.depositAvailableToCommit) {
							prepareTransaction(pool, "commit", value)
						} else {
							error("Can't commit more than your available deposit amount!")
						}	
					} else {
						error("Value to commit was not set...")
					}
				} else {
					error("Please pick a commitment option!")
				}
			break;
		}
		
	})
	
	// End commit button 
	$(document).on("click", "#generator-endcommit-button", function() {
		if(User.commitment.status) {
			if(User.commitment.timeLeft > 0) {
				// Penalty applies
				if(Generator.endCommitClick == 0) {
					Generator.endCommitClick++
					error("Ending a commitment early will incur a penalty equal to 50% of your commit bonus. Any rewards left unclaimed before ending a commitment are forfeited. If you are sure about this go ahead and click end commit one more time.", true)
				} else {
					Generator.endCommitClick = 0
					breakCommitment()
				}
				
			}
		} else {
			// Shouldn't get here in the first place
			error("No active commitment found!")
		}
	})
	
})

// Handles prepared transactions (stuff that has passed initial checks)  
function prepareTransaction(pool, type, value) {
	switch(type) {
		case "deposit":
		depositLP(pool, value)
		break;
		case "withdraw":
		withdrawLP(pool, value)
		break;
		case "commit":
		commitToPool(pool, value)
		break;
	}
}

// Function to deposit LP tokens into the current Teller  
async function depositLP(pool, value) {
	try {
		await Generator.teller.methods.depositLP(web3.utils.toWei(value.toString())).send({from: accounts[0]})
		.on("transactionHash", function(hash) {
			User.pendingDeposit = true
			notify('<div class="text-align-center"><a href="https://etherscan.io/tx/'+hash+'" target="_blank">Depositing</a> to '+pool+' pool...</div>')
			$("#generator-deposit-max-button, #generator-deposit-lp-button, #generator-deposit-container .generator-input-field").addClass("disabled") // Temporarily disable 
		})
		.on("receipt", function(receipt) {
			User.pendingDeposit = false
			notify('<div class="text-align-center">Deposit to '+pool+' pool was successful!</div>')
			$("#generator-deposit-max-button").removeClass("disabled")
			$("#generator-deposit-container .generator-input-field").removeClass("disabled").val("") // Reset the input and re-enable 
		})
	}
	catch(e) {
		console.error(e)
	}
}

// Function to withdraw LP tokens from Teller 
async function withdrawLP(pool, value) {
	try {
		await Generator.teller.methods.withdraw(web3.utils.toWei(value.toString())).send({from: accounts[0]})
		.on("transactionHash", function(hash) {
			User.pendingWithdraw = true 
			notify('<div class="text-align-center"><a href="https://etherscan.io/tx/'+hash+'" target="_blank">Withdrawing</a> from '+pool+' pool...</div>')
			$("#generator-withdraw-max-button, #generator-withdraw-lp-button, #generator-withdraw-container .generator-input-field").addClass("disabled") // Temporarily disable 
		})
		.on("receipt", function(receipt) {
			User.pendingWithdraw = false 
			notify('<div class="text-align-center">Withdraw from '+pool+' pool was successful!</div>')
			$("#generator-withdraw-max-button").removeClass("disabled")
			$("#generator-withdraw-container .generator-input-field").removeClass("disabled").val("") // Reset the input and re-enable 
		})
	}
	catch(e) {
		console.error(e)
	}
}

// Function to commit LP tokens for a period of time 
async function commitToPool(pool, value) {
	try {
		if(User.selectedOption > 0) {
			await Generator.teller.methods.commit(web3.utils.toWei(value.toString()), User.selectedOption).send({from: accounts[0]})
			.on("transactionHash", function(hash) {
				User.pendingCommit = true 
				notify('<div class="text-align-center"><a href="https://etherscan.io/tx/'+hash+'" target="_blank">Commit </a> '+generatorTruncateDecimal(value)+' to '+pool+' pool...</div>')
				$("#generator-commit-max-button, #generator-commit-lp-button, #generator-commit-container .generator-input-field").addClass("disabled") // Temporarily disable 
			})
		.on("receipt", function(receipt) {
			User.pendingCommit = false 
			notify('<div class="text-align-center">Commit to '+pool+' pool was successful!</div>')
			$("#generator-commit-max-button").removeClass("disabled")
			$("#generator-commit-container .generator-input-field").removeClass("disabled").val("") // Reset the input and re-enable 
		})
		} else {
			error("No option is selected.")
		}
	}
	catch(e) {
		console.error(e)
	}
}

// Function to claim earned rewards
async function claimRewards() {
	try {
		await Generator.teller.methods.claimExternal().send({from: accounts[0]})
		.on("transactionHash", function(hash) {
			User.pendingClaim = true 
			notify('<div class="text-align-center"><a href="https://etherscan.io/tx/'+hash+'" target="_blank">Claiming</a> rewards from '+User.currentPool+' pool...</div>')
			$("#generator-claim-button").addClass("disabled")
		})
		.on("receipt", function(receipt) {
			let amount = web3.utils.fromWei(web3.utils.hexToNumberString(receipt.events[0].raw.data))
			User.pendingClaim = false
			notify('<div class="text-align-center">'+parseFloat(amount).toFixed(4)+' VIDYA claimed successfully!</div>')
		})
	}
	catch(e) {
		console.error(e)
	}
}

// Function to break the commitment early 
async function breakCommitment() {
	try {
		await Generator.teller.methods.breakCommitment().send({from: accounts[0]})
		.on("transactionHash", function(hash) {
			User.pendingBreakCommit = true 
			$("#generator-endcommit-button").addClass("disabled")
			notify('<div class="text-align-center"><a href="https://etherscan.io/tx/'+hash+'" target="_blank">Ending commitment early </a> in '+User.currentPool+' pool...</div>')
		})
		.on("receipt", function(receipt) {
			User.pendingBreakCommit = false 
			$("#generator-endcommit-button").removeClass("disabled")
			notify('<div class="text-align-center">Commitment ended in '+User.currentPool+' pool!</div>')
		})
	}
	catch(e) {
		console.error(e)
	}
}

// Function to approve max uint256 of LP tokens on the current Teller 
async function generatorEnable(pool) {
	try {
		await Generator.instance.methods.approve(Generator.pool[pool].teller, "115792089237316195423570985008687907853269984665640564039457584007913129639935").send({from: accounts[0]})
		.on("transactionHash", function(hash) {
			notify('<div class="text-align-center"><a href="https://etherscan.io/tx/'+hash+'" target="_blank">Approving token</a> for '+pool+' pool...</div>')
		})
		.on("receipt", function(receipt) {
			notify('<div class="text-align-center">Approval for '+pool+' pool was successful!</div>')
		})
	}
	catch(e) {
		console.error(e)
	}
}

// Function to revoke approval of LP tokens on current Teller 
async function generatorDisable(pool) {
	try {
		await Generator.instance.methods.approve(Generator.pool[pool].teller, "0").send({from: accounts[0]})
		.on("transactionHash", function(hash) {
			notify('<div class="text-align-center"><a href="https://etherscan.io/tx/'+hash+'" target="_blank">Revoking approval for </a>'+pool+' pool...</div>')
		})
		.on("receipt", function(receipt) {
			notify('<div class="text-align-center">Revoked approval for '+pool+' pool!</div>')
		})
	}
	catch(e) {
		console.error(e)
	}
}

async function generatorSetup(pool) {
	try {
		User.currentTeller = Generator.pool[pool].teller
		User.currentLPToken = Generator.pool[pool].lptoken
		Generator.instance = new web3.eth.Contract(LPTokenABI, User.currentLPToken)
		Generator.teller = new web3.eth.Contract(TellerABI, User.currentTeller)

		User.isSetup = true 
	}
	catch(e) {
		console.error(e)
	}
}

async function generatorLoop() {
	try {
		if(!User.isSetup) {
			await generatorSetup(User.currentPool)
		}
		
		// UI
		if(!Generator.daysDrawn) {
			if(User.currentPool == "eth") {
				allTheNormalPeople()
			} 
			else if(User.currentPool == "single") {
				adjustTellerDaysOnUIForSingleSidedStaking()
			}
			else {
				console.error("I don't recognize this pool")
			}
			
			Generator.daysDrawn = true 
		}
		
		// Check for allowance 
		await Generator.instance.methods.allowance(accounts[0], User.currentTeller).call().then(function(r) {
			// Check if allowance > 0, it's either max uint256 or 0 when done through this UI
			if(r > 0) {
				Generator.pool[User.currentPool].approved = true 
			} else {
				Generator.pool[User.currentPool].approved = false
			}
			
			// Toggle enable/approve button 
			if(Generator.pool[User.currentPool].approved) {
				$(".generator-enable-button").attr("action", "disable") // Generator is enabled so next action is "disable" 
				$(".generator-enable-button").removeClass("glow") // Don't need to glow any more 
				$(".generator-enable-dial").css({
					left: "auto",
					right: "0",
					background: "var(--purple)"
				}).text("on") // Put the dial to the right and write "on" on it indicating enabled status 
			} else {
				$(".generator-enable-button").attr("action", "enable") // Generator is disabled so next action is "enable"
				$(".generator-enable-button").addClass("glow") // Make it glow again 
				$(".generator-enable-dial").css({
					left: "0",
					right: "auto",
					background: "var(--indigo-dark)"
				}).text("off") // Put the dial to the left position and write "off" on it indicating disabled status 
			}
		})
		
		// Check for LP token balance  
		await Generator.instance.methods.balanceOf(accounts[0]).call().then(function(r) {
			if(r != User.balance) {
				User.balance = r
			}
			if(User.balance > 0) {
				if(!User.pendingDeposit) {
					$("#generator-balance-container, #generator-deposit-container input, #generator-deposit-max-button").removeClass("disabled")
				}
			} else {
				if(!Generator.notification) {
					if(!User.commitment.status) {
					  notify('You can get Liquidity Pool tokens from <a href="'+Generator.pool[User.currentPool].url+'" target="_blank">Uniswap</a>')
					}
					Generator.notification = true
				}
				$("#generator-balance-container, #generator-deposit-container input, #generator-deposit-max-button").addClass("disabled")
			}
			
			$("#generator-balance").text(web3.utils.fromWei(User.balance))
		})
		
		// Check if LP token is approved for use on Teller and User has LP token balance > 0 
		if(Generator.pool[User.currentPool].approved && User.balance > 0) {
			User.canDepositLP = true // The user can deposit 
			if(!User.pendingDeposit) {
				$("#generator-deposit-container, #generator-deposit-container input, #generator-deposit-max-button").removeClass("disabled")
			}
		} else {
			User.canDepositLP = false // The user can't deposit 
			$("#generator-deposit-container input, #generator-deposit-max-button").addClass("disabled")
		}
		
		// Check for deposited LP & other things from getUserInfo() call
		await Generator.teller.methods.getUserInfo(accounts[0]).call({from: accounts[0]}).then(function(r) {
		    
			// r[0] = time left to unlock 
			if(r[0] > 0) {
			    if(r[0] != User.commitment.timeLeft) {
			       User.commitment.timeLeft = r[0] 
			    }
			} else {
			    if(User.commitment.timeLeft > 0) {
			        User.commitment.timeLeft = "0"
			    }
			}
			
			// r[1] = amount commited  
			if(r[1] > 0) {
			    if(r[1] != User.commitment.amount) {
				    User.commitment.amount = r[1]
				    User.commitment.status = true
				    $("#generator-commited-amount").text(generatorTruncateDecimal(web3.utils.fromWei(User.commitment.amount)))
			    }
			} else {
			    if(User.commitment.amount > 0) {
			        User.commitment.amount = "0"
			        $("#generator-commited-amount").text(User.commitment.amount)
			    }
			    else if(User.commitment.status) {
			        User.commitment.status = false
			    }
			}
			
			// r[2] = commitment index 
			if(r[2] > 0) {
			    if(User.commitment.index !== r[2]) {
			        User.commitment.index = r[2]
			    }
			} else {
			    if(User.commitment.index !== 0) {
			        User.commitment.index = "0"
			    }
			}
			
			// r[3] = claimAmount = users earned rewards, yield, divs. whatever you wanna call it
			if(r[3] != User.rewards) {
				User.rewards = r[3]
			}
			if(User.rewards > 0 && !User.pendingClaim) {
				$("#generator-user-rewards").text(parseFloat(web3.utils.fromWei(User.rewards)).toFixed(4) + " VIDYA").removeClass("hidden")
				$("#generator-claim-button").removeClass("disabled")
			} else {
				$("#generator-claim-button").addClass("disabled")
				$("#generator-user-rewards").text("").addClass("hidden")
			}
			
			// Set available tokens that can be withdrawn: totalLPDeposited - commitedAmount 
			// Also set same value for commit amount
			let available = (web3.utils.toBN(r[4]).sub(web3.utils.toBN(r[1]))).toString()
			if(available != User.depositAvailableToWithdraw) {
				User.depositAvailableToWithdraw = available
				User.depositAvailableToCommit = available 
			}
			// Set withdraw status 
			if(User.depositAvailableToWithdraw > 0) {
				User.canWithdrawLP = true 
				if(!User.pendingWithdraw) {
					$("#generator-withdraw-container, #generator-withdraw-container input, #generator-withdraw-max-button").removeClass("disabled")
				}
			} else {
				User.canWithdrawLP = false 
				$("#generator-withdraw-container input, #generator-withdraw-max-button").addClass("disabled")
			}
			
			// Enable / disable commitment options 
			if(User.depositAvailableToCommit > 0) {
				if(!User.commitment.status) {
					// Here user does not yet have active commitment 
					User.canCommit = true
				} else {
					// Here user has active commitment so they can only add to their existing position.
					if(User.depositAvailableToCommit > 0) {
						if(!User.canCommit) {
							User.canCommit = true
						}
					} else {
						User.canCommit = false
					}
				}
			} else {
				User.canCommit = false
			}
			
			if(User.canCommit && !User.pendingCommit) {
				$("#generator-commit-container, #generator-commit-container input, #generator-commit-max-button, .generator-vesting-option").removeClass("disabled")
			} else {
				$("#generator-commit-container input, #generator-commit-max-button, .generator-vesting-option").addClass("disabled")
			}

			// totalLPDeposited LP tokens for the current user 
			if(r[4] != User.deposited) {
				User.deposited = r[4]
			}
			if(User.deposited > 0) {
				$("#generator-deposited").text(web3.utils.fromWei(User.deposited))
				$("#generator-deposited-container").removeClass("disabled")
			} else {
				$("#generator-deposited").text("0")
				$("#generator-deposited-container").addClass("disabled")
			}
		})
		
		// Process user commitments only when index is not 0 and status is true 
		if(User.commitment.index != 0 && User.commitment.status) {
			User.selectedOption = User.commitment.index
			$("#generator-commitment-notch").text("Add commitment")
			$("#generator-commited-penalty").text(Generator.commitmentOptions[User.commitment.index].bonus / 2+"%")
			$(".generator-vesting-option").hide()
			$("#generator-commitment-details").show()
			$("#generator-endcommit-button").show()
			if(!User.pendingBreakCommit) {
				$("#generator-endcommit-button").removeClass("disabled")
			}
			if(User.commitment.timeLeft == 0) {
				User.commitment.matured = true
			} else {
				User.commitment.matured = false
			}
			if(!User.commitment.matured) {
				let timeRemaining = User.commitment.timeLeft
				let minute = 60
				let hour = 60 * 60
				let day = 60 * 60 * 24
				let dayFloor = Math.floor(timeRemaining / day)
				let hourFloor = Math.floor((timeRemaining - dayFloor * day) / hour)
				let minuteFloor = Math.floor((timeRemaining - dayFloor * day - hourFloor * hour) / minute)
				let secondFloor = Math.floor((timeRemaining - dayFloor * day - hourFloor * hour - minuteFloor * minute))
				if (secondFloor <= 0 && minuteFloor <= 0) {
					User.commitment.matured = true
				} else {
					if (timeRemaining > 0) {
						$("#generator-commited-timeleft").html(dayFloor + " days")
						if(dayFloor <= 0) {$("#generator-commited-timeleft").html(hourFloor + " hours")}
						if(hourFloor <= 0) {$("#generator-commited-timeleft").html(minuteFloor + " minutes")}
						if(minuteFloor <= 0) {$("#generator-commited-timeleft").html(secondFloor + " seconds")}
					}
				}
			} else {
				$("#generator-commited-timeleft").html('Finished!')
				$("#generator-commited-penalty").text("N/A")
				$("#generator-endcommit-button").hide()
			}
		} else {
			// Reset the title 
			if($("#generator-commitment-notch").text() !== "Commit") {
				$("#generator-commitment-notch").text("Commit")
			}
			// Reset the fields 
			$("#generator-commited-amount, #generator-commited-timeleft, #generator-commited-penalty").text("")
			// Show options panel 
			$(".generator-vesting-option").show()
			$("#generator-commitment-details").hide()
			$("#generator-endcommit-button").hide()
		}

	}
	catch(e) {
		console.error(e)
	}
	
	if(!generatorFullyLoaded) {
		generatorFullyLoaded = true
		generatorLoadingScreen()
	}
}

function resetUserInstance() {
	if(generatorInterval != void null) {
		clearInterval(generatorInterval)
		generatorInterval = null
	}
	Generator.endCommitClick = 0
	Generator.daysDrawn = false
	User.commitment.matured = false
	Generator.notification = false
	User.isSetup = false
	User.currentPool = null
	User.currentTeller = "0x0000000000000000000000000000000000000000"
	User.currentLPToken = "0x0000000000000000000000000000000000000000"

	generatorFullyLoaded = false
	
	// Reset UI
	$(".glow").removeClass("glow") // Remove all glowing things 
	$(".onoff").addClass("disabled") // Disable all onoff items 
	$(".generator-pool-body input").val("") // Reset input fields 
	$("#generator-balance, #generator-deposited").text("") // These too...
	
	// and these 
	$('.generator-vesting-option[data="1"]').text('')
	$('.generator-vesting-option[data="2"]').text('')
	$('.generator-vesting-option[data="3"]').text('')
	$('.generator-vesting-option[data="4"]').text('')
	$('.generator-vesting-option[data="5"]').text('')
	$('.generator-vesting-option[data="6"]').text('')
}

// Resets commit option selection 
// Note that the input field is reset elsewhere currently too...
function resetCommitSelection() {
	User.selectedOption = null
	$("#generator-commit-container input").val("")
	$(".generator-button-pressed").removeClass("generator-button-pressed")
}

function generatorLoadingScreen() {
	if(!generatorFullyLoaded) {
		$(".generator-pool-body-overlay").show()
	} else {
		$(".generator-pool-body-overlay").hide()
	}
}

// Truncates decimal places without rounding
function generatorTruncateDecimal(number) {
    // Truncate to 5 decimal places 
    return number.match(/^-?\d+(?:\.\d{0,5})?/)[0];
}

// REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
function adjustTellerDaysOnUIForSingleSidedStaking() {
	$('.generator-vesting-option[data="1"]').text('14 days = +0.4%')
	$('.generator-vesting-option[data="2"]').text('28 days = +1%')
	$('.generator-vesting-option[data="3"]').text('60 days = +2.9%')
	$('.generator-vesting-option[data="4"]').text('184 days = +9.9%')
	$('.generator-vesting-option[data="5"]').text('364 days = +22%')
	$('.generator-vesting-option[data="6"]').text('730 days = +50%')
}
function allTheNormalPeople() {
	$('.generator-vesting-option[data="1"]').text('7 days = +0.4%')
	$('.generator-vesting-option[data="2"]').text('14 days = +1%')
	$('.generator-vesting-option[data="3"]').text('30 days = +2.9%')
	$('.generator-vesting-option[data="4"]').text('92 days = +9.9%')
	$('.generator-vesting-option[data="5"]').text('182 days = +22%')
	$('.generator-vesting-option[data="6"]').text('365 days = +50%')
}

async function loadGeneratorRates() {
	try {
	Vault = new web3.eth.Contract(VaultABI, "0x5BfCc3ad8e5ad7A710174837AD84E5029e714eDB")
	let vidyaRate = await Vault.methods.vidyaRate().call()
	let totalPriority = await Vault.methods.totalPriority().call()
	let ethvidyaPriority = await Vault.methods.tellerPriority(Generator.pool.eth.teller).call()
	let singlePriority = await Vault.methods.tellerPriority(Generator.pool.single.teller).call()
	// let totalDistributed = await Vault.methods.totalDistributed().call()
	
	vidyaRate = parseFloat(web3.utils.fromWei(vidyaRate))
	totalPriority = parseFloat(web3.utils.fromWei(totalPriority))
	ethvidyaPriority = parseFloat(web3.utils.fromWei(ethvidyaPriority))
	singlePriority = parseFloat(web3.utils.fromWei(singlePriority))

	let ethvidyaDistRate = (vidyaRate / totalPriority * ethvidyaPriority) * 13
	$("#ethvidyaDistRate").text(ethvidyaDistRate.toFixed(4) + ' VIDYA per block')
	let singlevidyaDistRate = (vidyaRate / totalPriority * singlePriority) * 13 
	$("#singlevidyaDistRate").text(singlevidyaDistRate.toFixed(4) + ' VIDYA per block')
	
	// $("#GeneratorTotalDistributed").text(parseFloat(web3.utils.fromWei(totalDistributed)).toFixed(4) + ' VIDYA')
	}
	catch(e) {
		console.error(e)
	}
}