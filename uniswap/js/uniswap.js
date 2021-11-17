let uniswap, // uniswap instance 
    swapAction = "eth-to-vidya", // default direction
    ethBalance, // user's eth balance 
    minimumReceived, // min. received when accounting for slippage
    amountsOut = ["0","0"], // default amountsOut array
    slippage = 1, // 1% default slippage
    allowance

// contracts 
const weth = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      router = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      vidya = "0x3D3D35bb9bEC23b06Ca00fe472b50E7A4c692C30"
  
// typing limiter for #input-currency-amount field
let typingTimer,
    doneTypingInterval = 1000 // ms to wait

// initialize
async function loadExchange() {
    try {
        uniswap = new web3.eth.Contract(
            routerABI, 
            router
        )
        
        await getBalance()
        await getAllowance()
        // replaceUniswapLink() this happens in conn.js now 
        updateUI()
    }
    catch(e) {
        console.error(e)
    }
}

// Get the ETH balance for the user 
async function getBalance() {
    
    try {
        // inventoryUser is set in inventory/js/inventory.js
        await web3.eth.getBalance(inventoryUser).then(function(r) {
            if(r !== ethBalance) {
                ethBalance = r
            }
        })
    }
    
    catch(e) {
        console.error(e)
    }
    
}

// Get approved amount
async function getAllowance() {
    
    try {
        // VIDYA is defined in inventory/js/inventory.js
        // so is inventoryUser
        await VIDYA.methods.allowance(inventoryUser, router).call().then(function(r) {
            if(allowance !== r) {
                allowance = r
            }
        })
    }
    
    catch(e) {
        console.error(e)
    }
    
}

// Get the output amount (depending on path) based on input amount
// amountIn - uint256 input amount
// path - array [] ie. [weth, vidya] or vice versa 
async function getAmountsOut(amountIn, path) {
    try {
        await uniswap.methods.getAmountsOut(amountIn, path).call().then(function(r) {
            if(amountsOut[0] !== r[0] || amountsOut[1] !== r[1]) {
                amountsOut = r
            }
        })

        // update #output-currency-amount value on UI 
        $("#output-currency-amount").val( decimal(web3.utils.fromWei(amountsOut[1])) )
    }
    catch(e) {
        console.error(e)
    }
}

// User has done typing in #input-currency-amount
async function doneTyping() {
    
    try {
        let inputAmount = web3.utils.toWei($("#input-currency-amount").val())
        
        // depending on trade direction fetch data using the correct path order 
        switch(swapAction) {
            
            case "eth-to-vidya":
                await getAmountsOut(inputAmount, [weth,vidya])
                break;
                
            case "vidya-to-eth":
                await getAmountsOut(inputAmount, [vidya,weth])
                break;
                
        }
        
        getMinimumReceived()
        
    }
    
    catch(e) {
        console.error(e)
    }
    
}

// Swap ETH to VIDYA
async function swapETHForExactTokens() {
    
    try {
        let amountOutMin = await getMinimumReceived()
        let in15mins = Math.floor(Date.now() / 1000) + 900
        let txHash
        
        await uniswap.methods.swapETHForExactTokens(
            amountOutMin,
            [weth, vidya],
            inventoryUser, // set in inventory/js/inventory.js
            in15mins.toString()
        ).send({
            from: inventoryUser,
            value: amountsOut[0]
        })
        .on("transactionHash", function(hash) {
            txHash = hash
            notify('<div>ETH -> VIDYA</div><div>Waiting for <a href="https://etherscan.io/tx/'+hash+'" target="_blank">transaction</a> to confirm...</div>')
        })
        
        /* This never fires for some reason... yet it works in approveVidya() just fine. 
        
        Any ideas?
        
        .on("receipt", function(receipt) {
            notify('<div>ETH -> VIDYA</div><div><a href="https://etherscan.io/tx/'+hash+'" target="_blank">Transaction</a> confirmed & trade completed successfully!</div>')
            console.log(receipt)
        })
        
        */
        
        // Let's just await for receipt like so 
        let receipt = await web3.eth.getTransactionReceipt(txHash)
        notify('<div>VIDYA -> ETH</div><div><a href="https://etherscan.io/tx/'+txHash+'" target="_blank">Transaction</a> confirmed & trade completed successfully!</div>')
        
        // Wait 1s and refresh UI
        setTimeout(function() {
            updateUI(swapAction)
        }, 1000)
    }
    
    catch(e) {
        console.error(e)
    }
    
}

// Swap VIDYA to ETH
async function swapExactTokensForETH() {
    
    try {
        let amountIn = web3.utils.toWei($("#input-currency-amount").val().toString())
        let amountOutMin = await getMinimumReceived()
        let in15mins = Math.floor(Date.now() / 1000) + 900
        let txHash
        
        await uniswap.methods.swapExactTokensForETH(
            amountIn,
            amountOutMin,
            [vidya, weth],
            inventoryUser, // set in inventory/js/inventory.js
            in15mins.toString()
        ).send({
            from: inventoryUser
        })
        .on("transactionHash", function(hash) {
            txHash = hash
            notify('<div>VIDYA -> ETH</div><div>Waiting for <a href="https://etherscan.io/tx/'+hash+'" target="_blank">transaction</a> to confirm...</div>')
        })
        
        // await for receipt 
        let receipt = await web3.eth.getTransactionReceipt(txHash)
        notify('<div>VIDYA -> ETH</div><div><a href="https://etherscan.io/tx/'+txHash+'" target="_blank">Transaction</a> confirmed & trade completed successfully!</div>')
        
        // Wait 1s and refresh UI
        setTimeout(function() {
            updateUI(swapAction)
        }, 1000)
    }
    
    catch(e) {
        console.error(e)
    }
    
}

// Approve VIDYA on router 
async function approveVidya() {
    
    try {
        // VIDYA is defined in inventory/js/inventory.js
        // so is inventoryUser
        await VIDYA.methods.approve(router, "115792089237316195423570985008687907853269984665640564039457584007913129639935").send({
            from: inventoryUser
        })
        .on("transactionHash", function(hash) {
            notify('Approving VIDYA for trading on the Uniswap router contract...')
        })
        .on("receipt", function(receipt) {
            notify("VIDYA approved!")
        })
        
        // Refresh the UI with new data 
        updateUI()
    }
    
    catch(e) {
        console.error(e)
    }
    
}

// Switch exchange direction for the UI (elements, data attributes and such)
async function updateUI() {
    
    await getBalance() // get eth balance 
    await getAllowance() // get allowance 

    switch(swapAction) {
        
        case "eth-to-vidya":
            $("#input-currency-label").text("ETH")
            $("#input-currency-balance").text( decimal(web3.utils.fromWei(ethBalance)) )
            $("#input-currency-amount").val("")
            $("#output-currency-label").text("VIDYA")
            $("#output-currency-balance").text( decimal(web3.utils.fromWei(tokenBalance)) ) // tokenBalance is set inside checkBalances() in inventory.js
            $("#output-currency-amount").val("")
            $("#minimum-received").text("0.0000")
            break;
            
        case "vidya-to-eth":
            $("#input-currency-label").text("VIDYA")
            $("#input-currency-balance").text( decimal(web3.utils.fromWei(tokenBalance)) ) // tokenBalance is set inside checkBalances() in inventory.js
            $("#input-currency-amount").val("")
            $("#output-currency-label").text("ETH")
            $("#output-currency-balance").text( decimal(web3.utils.fromWei(ethBalance)) )
            $("#output-currency-amount").val("")
            $("#minimum-received").text("0.0000")
            
            // Display "approve VIDYA" prompt if VIDYA is not approved
            if(!parseFloat(web3.utils.fromWei(allowance)) > 0) {
                $("#approve-overlay").css({
                    "opacity" : "1",
                    "pointer-events" : "all"
                })
            } else {
                $("#approve-overlay").css({
                    "opacity" : "0",
                    "pointer-events" : "none"
                })
            }
            break;
            
    }

}

// Swap action decider   
// triggered by swap button click
function swap(swapAction) {

    switch(swapAction) {
        
        case "eth-to-vidya":
            if(validateETHSwap()) {
                swapETHForExactTokens()
            } else {
                $("#uniswap-swap").text("Insufficient ETH balance")
                setTimeout(function () {
                    $("#uniswap-swap").text("Swap")
                }, 1000)
            }
            break;
            
        case "vidya-to-eth":
            if(validateVidyaSwap()) {
                swapExactTokensForETH()
            } else {
                $("#uniswap-swap").text("Insufficient VIDYA balance")
                setTimeout(function () {
                    $("#uniswap-swap").text("Swap")
                }, 1000)
            }
            break;
            
    }
    
}

// A few checks to validate the input 
function validateVidyaSwap() {
    let inputAmount = web3.utils.toWei($("#input-currency-amount").val())
    if( parseFloat($("#input-currency-amount").val()) > 0 &&
        parseFloat(web3.utils.fromWei(tokenBalance)) >= parseFloat($("#input-currency-amount").val()) ) {
        return true
    } else {
        return false
    }
}

// And for eth too, could probably merge into 1 function
function validateETHSwap() {
    let inputAmount = web3.utils.toWei($("#input-currency-amount").val())
    if( parseFloat($("#input-currency-amount").val()) > 0 &&
        parseFloat(web3.utils.fromWei(ethBalance)) >= parseFloat($("#input-currency-amount").val()) ) {
        return true
    } else {
        return false
    }
}

// Truncates decimal places without rounding
function decimal(number) {
    // Truncate to 4 decimal places 
    return number.match(/^-?\d+(?:\.\d{0,4})?/)[0];
}

// Calculates minimum received (accounts for slippage)
// Depends on amountsOut[] from getAmountsOut() 
// returns value in wei 
function getMinimumReceived() {
    
    let inputAmount = parseFloat(web3.utils.fromWei(amountsOut[0])),
        outputAmount = parseFloat(web3.utils.fromWei(amountsOut[1]))
        
    // With slippage 
    let science = parseFloat((outputAmount - (outputAmount * slippage / 100)).toString())

    // toFixed() so it doesn't convert to scientific notation 
    let result = web3.utils.toWei( science.toFixed(18) )
    
    // Update on UI (Yes I am aware I am converting back and forth between wei for no reason)
    $("#minimum-received").text( decimal(web3.utils.fromWei(result)) )
    
    return result
    
}

/*function replaceUniswapLink() {
    $("#uniswap-button-wrapper, .uniswap-button-wrapper").html('<div id="vidyaswap_button" class="desktop-icon-container flex-box col center-vertical" data="vidyaswap"> \
    <div class="icon desktop-icon vidyaswap no-pointer-events shortcut"></div> \
    <span class="font-monospace text-align-center">vidyaswap</span> \
    </div>')
    
    // Attempt to mimic jQuery's pulsate effect... lol
    let elem = $("#vidyaswap_button")
    $(elem).css({"opacity":"0"})
    
    setTimeout(function() {
        $(elem).css({"opacity":"1"})
    }, 100)
    
    setTimeout(function() {
        $(elem).css({"opacity":"0"})
    }, 200)
    
    setTimeout(function() {
        $(elem).css({"opacity":"1"})
    }, 300)
    
    setTimeout(function() {
        $(elem).css({"opacity":"0"})
    }, 400)
    
    setTimeout(function() {
        $(elem).css({"opacity":"1"})
    }, 500)
}*/

// when document is ready 
$(document).ready(function() {

    $("#uniswap-switch").click(function(e) {
        
        // get current action
        let action = $(e.target).attr("data")
        
        // switch to new action
        switch(action) {
            
            case "eth-to-vidya":
                $(this).attr("data", "vidya-to-eth")
            
                // set swapAction
                swapAction = "vidya-to-eth"
                break;
                
            case "vidya-to-eth":
                $(this).attr("data", "eth-to-vidya")
                
                // set swapAction
                swapAction = "eth-to-vidya"
                break;
                
        }
        
        // Refresh the UI 
        updateUI()
        
    })
    
    $("#input-currency-max-button").click(function(e) {

        switch(swapAction) {
            
            case "eth-to-vidya":
                $("#input-currency-amount").val(decimal(web3.utils.fromWei(ethBalance)))
                break;
                
            case "vidya-to-eth":
                $("#input-currency-amount").val(decimal(web3.utils.fromWei(tokenBalance)))
                break;
            
        }
        
        // Behave as if the user has "done typing" in the input field 
        clearTimeout(typingTimer)
        if(parseFloat($("#input-currency-amount").val()) > 0) {
            typingTimer = setTimeout(doneTyping, doneTypingInterval)
        }
        
    })
    
    $("#uniswap-swap").click(function(e) {
        
        if( parseFloat($("#input-currency-amount").val()) > 0 ) {
            swap(swapAction)
        } else {
            $("#uniswap-swap").text("Invalid amount")
            setTimeout(function () {
                $("#uniswap-swap").text("Swap")
            }, 1000)
        }
        
    })

    // Trigger when user types a number between 0-9 or backspace in #input-currency-amount
    // This might only work on English keyboards though...
    $("#input-currency-amount").on("keyup", function(e) {
        if(e.which >= 48 && e.which <= 57 || e.which == 8) {
            clearTimeout(typingTimer)
            if(parseFloat($("#input-currency-amount").val()) > 0) {
                typingTimer = setTimeout(doneTyping, doneTypingInterval)
            }
        }
    })
    
    $("#approve-button").click(function(e) {
        approveVidya()
    })
    
    // The non-mobile button 
    $("#uniswap-button-wrapper, .uniswap-button-wrapper").on("click", "#vidyaswap_button", function(e) {
        loadExchange() // load it here, since there are no horrible loops in here it's fine to leave as is 
        // showContent("vidyaswap") happens in main.js now 
    })
    
})