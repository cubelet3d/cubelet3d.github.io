let Vault
let VaultAddress = "0xe4684AFE69bA238E3de17bbd0B1a64Ce7077da42"
let ethVidyaLP

let Generator = {
	stats: [],
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
			token: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // WETH token address 
			lptoken: "0xDA3706c9A099077e6BC389D1baf918565212A54D", // The Uniswap V2 LP token for VIDYA/ETH 
			teller: "0xD9BecdB8290077fAf79A2637a5f2FDf5033b2486", // The Teller contract address for VIDYA/ETH pool 
			url: "https://app.uniswap.org/#/add/v2/ETH/0x3D3D35bb9bEC23b06Ca00fe472b50E7A4c692C30?chain=mainnet",
			startBlock: 14164845
		},
		dark: {
			approved: false,
			token: "0x0000000000000000000000000000000000000000", // Dark matter token address 
			lptoken: "0x0000000000000000000000000000000000000000", // The LP token for TKN/DARK pair 
			teller: "0x0000000000000000000000000000000000000000" // The Teller contract address for TKN/DARK pool 
		},
		single: {
			approved: false,
			token: "0x3D3D35bb9bEC23b06Ca00fe472b50E7A4c692C30",
			lptoken: "0x3D3D35bb9bEC23b06Ca00fe472b50E7A4c692C30",
			teller: "0x4E053ac1F6F34A73F5Bbd876eFd20525EAcB5382",
			url: "https://app.uniswap.org/#/swap?outputCurrency=0x3D3D35bb9bEC23b06Ca00fe472b50E7A4c692C30&chain=mainnet",
			startBlock: 14164866
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
	$("body").on("click", ".generator-amount-reveal", function() {
		let txHash = $(this).closest(".generator-event-wrapper").attr("txHash")
		loadClaimAmountFromTx(txHash, $(this))
	})
	$("body").on("click", "#generator-event-log-button", function() {
		let pool = $(this).attr("pool")
		audio.click.play() 
		loadGeneratorEventLog(pool)
	})
	$("body").on("click", "#generator-event-log-close-button", function() {
		audio.click.play() 
		$("#generator-event-log").css("display", "none")
	})
	$("body").on("click", "#generator-charts-button", function() {
		let pool = $(this).attr("pool")
		audio.click.play() 
		generatorGetAllEvents(pool)
	})
	$("body").on("click", "#generator-charts-close-button", function() {
		audio.click.play() 
		$("#generator-charts").css("display", "none")
	})
	$("body").on("click", "#generator-stats-button", function() {
		audio.click.play()
		generatorLoadStats()
	})
	$("body").on("click", "#generator-stats-close-button", function() {
		audio.click.play() 
		$("#generator-stats").css("display", "none")
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
	$("body").on("click", "#generator_button, #generator_mobile_button, #generator .close_button", function() {
		if(!Generator.online) {
			Generator.online = true
			loadGeneratorRates()
			ethVidyaLP = new web3.eth.Contract(ethVidyaLPABI, Generator.pool.eth.lptoken)
			$("#generator_button_wrapper").addClass("disabled")
		} else {
			Generator.online = false
			resetUserInstance() 
			$("#generator_button_wrapper").removeClass("disabled")
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
		await Generator.instance.methods.balanceOf(accounts[0]).call().then(async function(r) {
			if(r != User.balance) {
				User.balance = r
			}
			if(User.balance > 0) {
				if(!User.pendingDeposit) {
					$("#generator-balance-container, #generator-deposit-container input, #generator-deposit-max-button").removeClass("disabled")
				}
			} else {
				if(User.currentPool == "eth") {
					if(!Generator.notification) {
						if(!User.commitment.status) {
						  notify('You can get Liquidity Pool tokens from <a href="'+Generator.pool[User.currentPool].url+'" target="_blank">Uniswap</a>')
						}
						Generator.notification = true
					}
				}
				$("#generator-balance-container, #generator-deposit-container input, #generator-deposit-max-button").addClass("disabled")
			}
			
			let b = web3.utils.fromWei(User.balance)
			
			$("#generator-balance").text(b)
			
			if(User.currentPool == "eth") {
				await LPInUSD().then(function(r) {
					let t = b * r 
					$("#generator-balance").prop("title", "$"+decimal(t.toString())+" USD")
				})
			} else if(User.currentPool == "single") {
				let t = b * price_vidya 
				$("#generator-balance").prop("title", "$"+decimal(t.toString())+" USD")
			} else {
				// idk bru 
			}
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
		await Generator.teller.methods.getUserInfo(accounts[0]).call({from: accounts[0]}).then(async function(r) {
		    
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
					let amt = generatorTruncateDecimal(web3.utils.fromWei(User.commitment.amount))
					let lol = null
					if(User.currentPool == "eth") {
						let usd = await LPInUSD()
						lol = abbr(amt * usd)
					}
					else if(User.currentPool == "single") {
						lol = abbr(amt * price_vidya)
					}
					else {
						error("Hallelujah!")
					}
				    $("#generator-commited-amount").text(amt + " ($"+lol+" USD)")
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
				let d = web3.utils.fromWei(User.deposited)
				$("#generator-deposited").text(d)
				$("#generator-deposited-container").removeClass("disabled")
				if(User.currentPool == "eth") {
					await LPInUSD().then(function(r) {
						let t = d * r 
 						$("#generator-deposited").prop("title", "$"+decimal(t.toString())+" USD")
					})
				}
				else if(User.currentPool == "single") {
					let t = d * price_vidya
					$("#generator-deposited").prop("title", "$"+decimal(t.toString())+" USD")
				}
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
				if (timeRemaining <= 0) {
					User.commitment.matured = true
				} else {
					if(minuteFloor <= 0) {$("#generator-commited-timeleft").html(secondFloor + " seconds")}
					if(hourFloor <= 0 && minuteFloor > 0) {$("#generator-commited-timeleft").html(minuteFloor + " minutes")}
					if(dayFloor <= 0 && hourFloor > 0) {$("#generator-commited-timeleft").html(hourFloor + " hours")}
					if(dayFloor > 0) {$("#generator-commited-timeleft").html(dayFloor + " days")}
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
		$("#generator-event-log-button").removeClass("disabled").attr("pool", User.currentPool)
		$("#generator-charts-button").removeClass("disabled").attr("pool", User.currentPool)
		$("#generator-stats-button").removeClass("disabled")
	}
}

function resetUserInstance() {
	if(generatorInterval != void null) {
		clearInterval(generatorInterval)
		generatorInterval = null
	}
	Generator.stats = []
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
	$("#generator-event-log-button").addClass("disabled") 
	$("#generator-charts-button").addClass("disabled")
	$("#generator-stats-button").addClass("disabled")
	
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

// It's a lil bit retarded but that's how I roll 
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
		Vault = new web3.eth.Contract(VaultABI, VaultAddress)
		let vidyaRate = await Vault.methods.vidyaRate().call()
		let totalPriority = await Vault.methods.totalPriority().call()
		let ethvidyaPriority = await Vault.methods.tellerPriority(Generator.pool.eth.teller).call()
		let singlePriority = await Vault.methods.tellerPriority(Generator.pool.single.teller).call()
		let totalDistributed = await Vault.methods.totalDistributed().call()
		
		await loadTellerBalances()
		
		vidyaRate = parseFloat(web3.utils.fromWei(vidyaRate))
		//totalPriority = parseFloat(web3.utils.fromWei(totalPriority))
		//ethvidyaPriority = parseFloat(web3.utils.fromWei(ethvidyaPriority))
		//singlePriority = parseFloat(web3.utils.fromWei(singlePriority))

		let ethvidyaDistRate = (vidyaRate / totalPriority * ethvidyaPriority) * 13
		$("#ethvidyaDistRate").text(ethvidyaDistRate.toFixed(4) + ' VIDYA per block')
		let singlevidyaDistRate = (vidyaRate / totalPriority * singlePriority) * 13 
		$("#singlevidyaDistRate").text(singlevidyaDistRate.toFixed(4) + ' VIDYA per block')
		
		$("#GeneratorTotalDistributed").text(abbr(parseFloat(web3.utils.fromWei(totalDistributed)), 1) + ' VIDYA') 
		
		let vidyasInLp = 0 
		let vidyasInSingle = 0 
		
		// APR things (thanks Soya and Blast)
		Generator.pool.eth.lptokenTotalSupply = await ethVidyaLP.methods.totalSupply().call()
		await ethVidyaLP.methods.getReserves().call().then(function(r) {
			vidyasInLp = generatorTruncateDecimal(web3.utils.fromWei(r[0]))
			let lmao = (web3.utils.fromWei(r[0]) * 2) * (Generator.vidyaEthBalance / Generator.pool.eth.lptokenTotalSupply)
			Generator.pool.eth.apr = (vidyaRate * 60 * 60 * 24 * 365 * ethvidyaPriority) / (totalPriority * lmao) * 100
			$("#ethVidyaApr").text(Generator.pool.eth.apr.toFixed(2) + "%")
		})
		Generator.pool.single.apr = (vidyaRate * 60 * 60 * 24 * 365 * singlePriority) / (totalPriority * web3.utils.fromWei(Generator.vidyaSingleBalance)) * 100
		$("#singleVidyaApr").text(Generator.pool.single.apr.toFixed(2) + "%")	
		
		await VIDYA.methods.balanceOf(Generator.pool.single.teller).call().then(function(r) {
			vidyasInSingle = generatorTruncateDecimal(web3.utils.fromWei(r))
		})

		// More new things 
		let vidyasToDollars = (Number(vidyasInLp) + Number(vidyasInSingle)) * price_vidya 
		$("#GeneratorTotalValueLocked").text(abbr(parseFloat(vidyasToDollars), 1) + " USD")
		
		fetch("https://78.141.202.176/info/").then(r => r.json().then(r => {
			let res = r.result[0]
			let avgLPDays = parseInt(res.sumLP / res.countLP)
			let avgSingleDays = parseInt((res.sumShingle / res.countShingle) / 100) // ghost3d: single teller has different decimals 
			let totalStakers = parseInt(res.countLP + res.countShingle)
			let avgBetweenPools = avgLPDays + avgSingleDays / 2 
			$("#GeneratorTotalStakers").text(totalStakers)
			$("#GeneratorAverageCommitment").text(avgBetweenPools + " days")
		}))
		.catch(function(e) {
			// do something on error ie. don't show the boxes on UI
			console.error(e)
		})
	}
	catch(e) {
		console.error(e)
	}
}

// March 15, 2022 Update 
loadTellerBalances = async () => {
	Generator.vidyaEthTeller = new web3.eth.Contract(LPTokenABI, Generator.pool.eth.lptoken)
	Generator.vidyaEthBalance = await Generator.vidyaEthTeller.methods.balanceOf(Generator.pool.eth.teller).call()
	$('#vidyaEthTellerBalance').text(abbr(parseFloat(web3.utils.fromWei(Generator.vidyaEthBalance)), 1) + ' LP')
	
	Generator.vidyaSingleTeller = new web3.eth.Contract(LPTokenABI, Generator.pool.single.lptoken)
	Generator.vidyaSingleBalance = await Generator.vidyaSingleTeller.methods.balanceOf(Generator.pool.single.teller).call()
	$('#vidyaSingleTellerBalance').text(abbr(parseFloat(web3.utils.fromWei(Generator.vidyaSingleBalance)), 1) + ' VIDYA')
}

loadGeneratorEventLog = async (pool) => {
	$("#generator-event-log-content").empty() 
	$("#generator-event-log-status-message").text("Loading...")
	$("#generator-event-log").css("display", "flex")
	// let vidyaEthLP = new web3.eth.Contract(TellerABI, Generator.pool.eth.teller)
	// let singleLP = new web3.eth.Contract(TellerABI, Generator.pool.single.teller)
	
	if(pool == "eth") {
		/*let reserves = await ethVidyaLP.methods.getReserves().call()
		let totalSupply = await ethVidyaLP.methods.totalSupply().call()
		let vidya = web3.utils.fromWei(reserves[0])
		let eth = web3.utils.fromWei(reserves[1])
		let totalValue = (vidya * price_vidya) + (eth * price_eth)
		let lptokenValue = totalValue / web3.utils.fromWei(totalSupply)*/
		let lptokenValue = await LPInUSD()
		await web3.eth.getBlockNumber().then(function(r) {
			let fromBlock = r - 46522 // Approx 7 days ago
			Generator.teller.events.allEvents({fromBlock: fromBlock}, function(error, event) {
				if(event.event == "Claimed") {
					$("#generator-event-log-content").append('<div class="generator-event-wrapper flex-box" txHash="'+event.transactionHash+'"><div class="generator-event-icon generator-icon-eth"></div><div class="flex-box col full-width"><div class="generator-event-title">Claim rewards</div><div class="flex-box space-between"><div>From: '+formatAddress(event.returnValues.provider)+'</div><div class="generator-amount-reveal">[Reveal amount]</div><div>[<a href="https://etherscan.io/tx/'+event.transactionHash+'" target="_blank">Etherscan</a>]</div></div></div></div>')
				}
				else if(event.event == "LpDeposited") {
					$("#generator-event-log-content").append('<div class="generator-event-wrapper flex-box"><div class="generator-event-icon generator-icon-eth"></div><div class="flex-box col full-width"><div class="generator-event-title">LP Deposited</div><div class="flex-box space-between"><div>From: '+formatAddress(event.returnValues.provider)+'</div><div>'+abbr(parseFloat(web3.utils.fromWei(event.returnValues.amount)), 1)+' ($'+abbr(parseFloat(lptokenValue*web3.utils.fromWei(event.returnValues.amount)), 1)+' USD)</div><div>[<a href="https://etherscan.io/tx/'+event.transactionHash+'" target="_blank">Etherscan</a>]</div></div></div></div>')
				}
				else if(event.event == "Withdrew") {
					$("#generator-event-log-content").append('<div class="generator-event-wrapper flex-box"><div class="generator-event-icon generator-icon-eth"></div><div class="flex-box col full-width"><div class="generator-event-title">Withdraw</div><div class="flex-box space-between"><div>From: '+formatAddress(event.returnValues.provider)+'</div><div>'+abbr(parseFloat(web3.utils.fromWei(event.returnValues.amount)), 1)+' ($'+abbr(parseFloat(lptokenValue*web3.utils.fromWei(event.returnValues.amount)), 1)+' USD)</div><div>[<a href="https://etherscan.io/tx/'+event.transactionHash+'" target="_blank">Etherscan</a>]</div></div></div></div>')
				}
				else if(event.event == "Commited") {
					$("#generator-event-log-content").append('<div class="generator-event-wrapper flex-box"><div class="generator-event-icon generator-icon-eth"></div><div class="flex-box col full-width"><div class="generator-event-title">Commit</div><div class="flex-box space-between"><div>From: '+formatAddress(event.returnValues.provider)+'</div><div>'+abbr(parseFloat(web3.utils.fromWei(event.returnValues.commitedAmount)), 1)+' ($'+abbr(parseFloat(lptokenValue*web3.utils.fromWei(event.returnValues.commitedAmount)), 1)+' USD)</div><div>[<a href="https://etherscan.io/tx/'+event.transactionHash+'" target="_blank">Etherscan</a>]</div></div></div></div>')
				}
				else if(event.event == "CommitmentBroke") {
					$("#generator-event-log-content").append('<div class="generator-event-wrapper flex-box"><div class="generator-event-icon generator-icon-eth"></div><div class="flex-box col full-width"><div class="generator-event-title">Commitment broke</div><div class="flex-box space-between"><div>From: '+formatAddress(event.returnValues.provider)+'</div><div>'+abbr(parseFloat(web3.utils.fromWei(event.returnValues.tokenSentAmount)), 1)+' ($'+abbr(parseFloat(lptokenValue*web3.utils.fromWei(event.returnValues.tokenSentAmount)), 1)+' USD)</div><div>[<a href="https://etherscan.io/tx/'+event.transactionHash+'" target="_blank">Etherscan</a>]</div></div></div></div>')
				}
			})
		})
	}
	
	else if(pool == "single") {
		await web3.eth.getBlockNumber().then(function(r) {
			let fromBlock = r - 46522 // Approx 7 days ago
			Generator.teller.events.allEvents({fromBlock: fromBlock}, function(error, event) {
				if(event.event == "Claimed") {
					$("#generator-event-log-content").append('<div class="generator-event-wrapper flex-box" txHash="'+event.transactionHash+'"><div class="generator-event-icon generator-icon-single"></div><div class="flex-box col full-width"><div class="generator-event-title">Claim rewards</div><div class="flex-box space-between"><div>From: '+formatAddress(event.returnValues.provider)+'</div><div class="generator-amount-reveal">[Reveal amount]</div><div>[<a href="https://etherscan.io/tx/'+event.transactionHash+'" target="_blank">Etherscan</a>]</div></div></div></div>')
				}
				else if(event.event == "LpDeposited") {
					$("#generator-event-log-content").append('<div class="generator-event-wrapper flex-box"><div class="generator-event-icon generator-icon-single"></div><div class="flex-box col full-width"><div class="generator-event-title">VIDYA Deposited</div><div class="flex-box space-between"><div>From: '+formatAddress(event.returnValues.provider)+'</div><div>'+abbr(parseFloat(web3.utils.fromWei(event.returnValues.amount)), 1)+' ($'+abbr(parseFloat(price_vidya*web3.utils.fromWei(event.returnValues.amount)), 1)+' USD)</div><div>[<a href="https://etherscan.io/tx/'+event.transactionHash+'" target="_blank">Etherscan</a>]</div></div></div></div>')
				}
				else if(event.event == "Withdrew") {
					$("#generator-event-log-content").append('<div class="generator-event-wrapper flex-box"><div class="generator-event-icon generator-icon-single"></div><div class="flex-box col full-width"><div class="generator-event-title">Withdraw</div><div class="flex-box space-between"><div>From: '+formatAddress(event.returnValues.provider)+'</div><div>'+abbr(parseFloat(web3.utils.fromWei(event.returnValues.amount)), 1)+' ($'+abbr(parseFloat(price_vidya*web3.utils.fromWei(event.returnValues.amount)), 1)+' USD)</div><div>[<a href="https://etherscan.io/tx/'+event.transactionHash+'" target="_blank">Etherscan</a>]</div></div></div></div>')
				}
				else if(event.event == "Commited") {
					$("#generator-event-log-content").append('<div class="generator-event-wrapper flex-box"><div class="generator-event-icon generator-icon-single"></div><div class="flex-box col full-width"><div class="generator-event-title">Commit</div><div class="flex-box space-between"><div>From: '+formatAddress(event.returnValues.provider)+'</div><div>'+abbr(parseFloat(web3.utils.fromWei(event.returnValues.commitedAmount)), 1)+' ($'+abbr(parseFloat(price_vidya*web3.utils.fromWei(event.returnValues.commitedAmount)), 1)+' USD)</div><div>[<a href="https://etherscan.io/tx/'+event.transactionHash+'" target="_blank">Etherscan</a>]</div></div></div></div>')
				}
				else if(event.event == "CommitmentBroke") {
					$("#generator-event-log-content").append('<div class="generator-event-wrapper flex-box"><div class="generator-event-icon generator-icon-single"></div><div class="flex-box col full-width"><div class="generator-event-title">Commitment broke</div><div class="flex-box space-between"><div>From: '+formatAddress(event.returnValues.provider)+'</div><div>'+abbr(parseFloat(web3.utils.fromWei(event.returnValues.tokenSentAmount)), 1)+' ($'+abbr(parseFloat(price_vidya*web3.utils.fromWei(event.returnValues.tokenSentAmount)), 1)+' USD)</div><div>[<a href="https://etherscan.io/tx/'+event.transactionHash+'" target="_blank">Etherscan</a>]</div></div></div></div>')
				}
			})
		})
	}

	$("#generator-event-log-status-message").text("Events from past 7 days")
}

// Thanks Blastscout... 
loadClaimAmountFromTx = async(txHash, element) => {
	$(element).text("Loading...")
	await web3.eth.getTransactionReceipt(txHash).then(function(r) {
		$(element).text(abbr(parseFloat(web3.utils.fromWei(web3.utils.hexToNumberString(r.logs[0].data))), 1)+' ($'+abbr(parseFloat(price_vidya*web3.utils.fromWei(web3.utils.hexToNumberString(r.logs[0].data))), 1)+' USD)')
	})
}

LPInUSD = async() => {
	try {
		let reserves = await ethVidyaLP.methods.getReserves().call()
		let totalSupply = await ethVidyaLP.methods.totalSupply().call()
		let vidya = web3.utils.fromWei(reserves[0])
		let eth = web3.utils.fromWei(reserves[1])
		let totalValue = (vidya * price_vidya) + (eth * price_eth)
		let lptokenValue = totalValue / web3.utils.fromWei(totalSupply)
		return lptokenValue
	}
	catch(e) {
		console.error(e)
	}
}

generatorGetAllEvents = async(pool) => {
	try {
		
		if(Generator.instance) {
			
			let noData = []
			
			$("#generator-charts-errors").text("")
			$("#generator-charts-content").empty() 
			$("#generator-charts-status-message").text("Loading...")
			$("#generator-charts").css("display", "flex")
			
			// Things to declare 
			let provider, amount, data, blockNumber 

			let block = await web3.eth.getBlockNumber()

			// Get past events 
			await Generator.teller.getPastEvents("Claimed", {fromBlock: block - 46522}, async function(error, events) {
				let result = []
				for(let i = 0; i < events.length; i++) {
					await web3.eth.getTransactionReceipt(events[i].transactionHash).then(function(r) {
						amount      = web3.utils.fromWei(web3.utils.hexToNumberString(r.logs[0].data))
						blockNumber = r.blockNumber
						provider    = r.from
						data        = [blockNumber, provider, amount]
						
						result.push(data)
					})
				}
				
				let xValues = []
				let yValues = []
				for(let i = 0; i < result.length; i++) {
					xValues.push(result[i][0].toString())
					yValues.push(decimal(result[i][2]))
				}
				
				if(xValues.length > 0 && yValues.length > 0) {
					$("#generator-charts-content").append('<div id="generator-claims-chart-wrapper" class="generator-sub-section flex-box col"><div class="generator-pool-label flex-box"><div class="notch">Claims</div></div><canvas id="generator-claims-chart" class="generator-chart"></canvas></div>')
					generatorDrawChart("generator-claims-chart", xValues, yValues)
				} else {
					noData.push("Claimed")
				}
				
			// LpDeposited
			await Generator.teller.getPastEvents("LpDeposited", {fromBlock: block - 46522}, function(error, events) {
				let xValues = []
				let yValues = []
				for (let i = 0; i < events.length; i++) {
					xValues.push(events[i].blockNumber)
					yValues.push(decimal(web3.utils.fromWei(events[i].returnValues.amount)))
				}
				if(xValues.length > 0 && yValues.length > 0) {
					$("#generator-charts-content").append('<div id="generator-lpdeposits-chart-wrapper" class="generator-sub-section flex-box col"><div class="generator-pool-label flex-box"><div class="notch">Deposits</div></div><canvas id="generator-lpdeposits-chart" class="generator-chart"></canvas></div>')
					generatorDrawChart("generator-lpdeposits-chart", xValues, yValues)
				} else {
					noData.push("LpDeposited")
				}
			})
			
			// Withdraws 
			await Generator.teller.getPastEvents("Withdrew", {fromBlock: block - 46522}, function(error, events) {
				let xValues = []
				let yValues = []
				for (let i = 0; i < events.length; i++) {
					xValues.push(events[i].blockNumber)
					yValues.push(decimal(web3.utils.fromWei(events[i].returnValues.amount)))
				}
				if(xValues.length > 0 && yValues.length > 0) {
					$("#generator-charts-content").append('<div id="generator-withdraws-chart-wrapper" class="generator-sub-section flex-box col"><div class="generator-pool-label flex-box"><div class="notch">Withdraws</div></div><canvas id="generator-withdraws-chart" class="generator-chart"></canvas></div>')
					generatorDrawChart("generator-withdraws-chart", xValues, yValues)
				} else {
					noData.push("Withdrew")
				}
			})
			
			// Commits 
			await Generator.teller.getPastEvents("Commited", {fromBlock: block - 46522}, function(error, events) {
				let xValues = []
				let yValues = []
				for (let i = 0; i < events.length; i++) {
					xValues.push(events[i].blockNumber)
					yValues.push(decimal(web3.utils.fromWei(events[i].returnValues.commitedAmount)))
				}
				if(xValues.length > 0 && yValues.length > 0) {
					$("#generator-charts-content").append('<div id="generator-commited-chart-wrapper" class="generator-sub-section flex-box col"><div class="generator-pool-label flex-box"><div class="notch">Commits</div></div><canvas id="generator-commited-chart" class="generator-chart"></canvas></div>')
					generatorDrawChart("generator-commited-chart", xValues, yValues)
				} else {
					noData.push("Committed")
				}
			})
			
			// CommitmentBroke
			await Generator.teller.getPastEvents("CommitmentBroke", {fromBlock: block - 46522}, function(error, events) {
				let xValues = []
				let yValues = []
				for (let i = 0; i < events.length; i++) {
					xValues.push(events[i].blockNumber)
					yValues.push(decimal(web3.utils.fromWei(events[i].returnValues.tokenSentAmount)))
				}
				if(xValues.length > 0 && yValues.length > 0) {
					$("#generator-charts-content").append('<div id="generator-commitbroke-chart-wrapper" class="generator-sub-section flex-box col"><div class="generator-pool-label flex-box"><div class="notch">Commit broke</div></div><canvas id="generator-commitbroke-chart" class="generator-chart"></canvas></div>')
					generatorDrawChart("generator-commitbroke-chart", xValues, yValues)
				} else {
					noData.push("CommitmentBroke")
				}
			})
			
			if(noData.length < 5) {
				$("#generator-charts-status-message").text("Events from past 7 days")
			} else {
				$("#generator-charts-status-message").text("No events found")
			}
			$("#generator-charts-errors").text('No data found for the following events: '+noData.join(", "))
			
			})
			
		}
		
	}
	
	catch(e) {
		console.error(e)
	}
	
}

// https://www.chartjs.org/docs/2.9.4
function generatorDrawChart(el, xValues, yValues) {
	
	Chart.defaults.global.defaultFontColor  		= "white"
	Chart.defaults.global.defaultFontFamily 		= "'C64', monospace"
	Chart.defaults.global.defaultFontSize   		= 16
	Chart.defaults.global.tooltips.backgroundColor 	= "rgba(95,8,95,0.7)"
	
	new Chart(el, {
	  type: "line",
	  data: {
		labels: xValues,
		datasets: [{
		  fill: false,
		  lineTension: 0,
		  backgroundColor: "rgba(255, 31, 220, 0.5)",
		  borderColor: "rgba(255, 31, 220, 0.5)",
		  data: yValues
		}]
	  },
	  options: {
		legend: {display: false},
		scales: {
		  yAxes: [{
			ticks: {
			  beginAtZero: true
			}
		  }],
		  xAxes: [{
			ticks: {
			  beginAtZero: false
			}
		  }]
		}
	  }
	})
	
}

async function generatorGetAllDeposits() {
	let startBlock = Generator.pool[User.currentPool].startBlock
	let lpDeposits = {}
	let result 
	try {
		await Generator.teller.getPastEvents("LpDeposited", {fromBlock: startBlock}, function(error, events) {
			for (let i = 0; i < events.length; i++) {
				let user   = events[i].returnValues.provider
				let amount = Number(web3.utils.fromWei(events[i].returnValues.amount))
				let value  = lpDeposits[user]
				if(!value) {
					lpDeposits[user] = amount 
				}
				else if(value > 0) {
					lpDeposits[user] = lpDeposits[user] + amount 
				}
				else {
					console.log("idk what happened...")
				}
			}
			
			let sorted = Object.entries(lpDeposits).sort((a, b) => a[1] - b[1])
			let desc   = sorted.reverse()
			
			result     = desc 
		})
		
		return result
	}
	catch(e) {
		console.error(e)
	}
}

async function generatorLoadStats() {
	try {
		$("#generator-stats-content").empty()
		$("#generator-stats-content").append('<div id="generator-stats-header" class="hidden flex-box space-between generator-stats-entry generator-stats-header"><div class="ellipsis generator-address" style="flex: 1">Address</div><div id="generator-stats-header-totalDeposit" class="generator-stats-totalDeposited" style="flex: 1; text-align: right">Deposit</div><div id="generator-stats-header-totalCommit" style="flex: 1; text-align: right">Commit</div><div id="generator-stats-header-timeLeft" class="generator-stats-timeLeft" style="flex: 1; text-align: right">Time left</div></div>')
		$("#generator-stats-status-message").text("Loading...")
		$("#generator-stats").css("display", "flex")
		
		let result = await generatorGetAllDeposits()
		
		let usersInfo = {}
		
		let count = 0
		
		for(let i = 0; i < result.length; i++) {
			await Generator.teller.methods.getUserInfo(result[i][0]).call({from: result[i][0]}).then(function(r) {
				usersInfo[result[i][0]] = r
				Generator.stats.push(usersInfo[result[i][0]])
				Generator.stats[i][5] = result[i][0] // set the address too
			})

			$("#generator-stats-status-message").text("Loading "+count+" / "+result.length)
			count++
		}

		let sortedByCommit = Generator.stats.sort((a, b) => b[1] - a[1])

		for(let i = 0; i < Generator.stats.length; i++) {
			let userAddress    = sortedByCommit[i][5]
			let userTimeLeft   = sortedByCommit[i][0]
			let totalDeposited = abbr(Number(web3.utils.fromWei(sortedByCommit[i][4])), 2)
			let totalCommitted = abbr(Number(web3.utils.fromWei(sortedByCommit[i][1])), 2)
			
			// let totalDeposited = abbr(result[i][1], 2) // total ever (from LpDeposited event)
			// let totalDeposited = abbr(Number(web3.utils.fromWei(usersInfo[result[i][0]][4])), 2) // total LP deposited return value from Teller (blame Blastscout if it's bad)
			// let totalCommitted = abbr(Number(web3.utils.fromWei(usersInfo[result[i][0]][1])), 2) // actual committed amount from UserInfo call 
			
			/*$("#generator-stats-content").append('<a href="https://etherscan.io/address/'+result[i][0]+'" target="_blank"><div class="flex-box space-between generator-stats-entry"><div class="ellipsis generator-address" style="flex: 1">'+result[i][0]+'</div><div class="generator-stats-totalDeposited" style="flex: 1; text-align: right">'+totalDeposited+'</div><div class="generator-highlight-amount" style="flex: 1; text-align: right">'+totalCommitted+'</div><div class="generator-stats-timeLeft" style="flex: 1; text-align: right">'+getTimeLeft(usersInfo[result[i][0]][0])+'</div></div></a>')*/
			
			$("#generator-stats-content").append('<a href="https://etherscan.io/address/'+userAddress+'" target="_blank"><div class="flex-box space-between generator-stats-entry"><div class="ellipsis generator-address" style="flex: 1">'+userAddress+'</div><div class="generator-stats-totalDeposited" style="flex: 1; text-align: right">'+totalDeposited+'</div><div class="generator-highlight-amount" style="flex: 1; text-align: right">'+totalCommitted+'</div><div class="generator-stats-timeLeft" style="flex: 1; text-align: right">'+getTimeLeft(userTimeLeft)+'</div></div></a>')
		}
		
		$("#generator-stats-status-message").text("Finished loading!")
		$("#generator-stats-header").removeClass("hidden")
	}
	catch(e) {
		console.error(e)
	}
}