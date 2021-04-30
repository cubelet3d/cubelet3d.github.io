let fluxHeaderWrapperHeight
let isTimer = false

$(document).ready(function() {
    fluxHeaderWrapperHeight = $(".flux-header-wrapper").outerHeight()
    $("#vidyaflux .console-content").css("height", "calc(100% - "+(fluxHeaderWrapperHeight+40)+"px) ")
    $("#vidyaflux").addClass("hidden")
    
    $(".flux-nav").click(function(e) {
        let el = $(e.target).attr("data")
        loadFluxContent(el)
    })
    
    if($(window).width() < 460) {
        $(".flux-header").addClass("col")
    }
    
    /* Don't even ask... */
    $("#vidyaflux_button, .vidyaflux_button").click(function() {

        if(!fluxHeaderWrapperHeight) {
            $("#vidyaflux").css({"opacity":"0"})
            $("#vidyaflux").removeClass("hidden")
            fluxHeaderWrapperHeight = $(".flux-header-wrapper").outerHeight()
            $("#vidyaflux .console-content").css("height", "calc(100% - "+(fluxHeaderWrapperHeight+40)+"px) ")
            $("#vidyaflux").addClass("hidden")
            $("#vidyaflux").css("opacity", "1")
        }
        showContent("vidyaflux")
        setTimeout(setupFlux, 300) // wait for animation
        fluxClosed = false
    })
    
    // Stops loops from running 
    $("#vidyaflux .close_button").click(function() {
        fluxClosed = true
    })
})

function loadFluxContent(el) {
    $(".flux-content").hide()
    $(".flux-content[data="+el+"]").show()
}

let fluxClosed = true

let fluxurl = "https://team3d.io/#/"

let user, refText

let approveAmount, // What the user will be approving
    sellAmount // What the user will be selling
    
let buyPrice,
    sellPrice,
    entryFee,
    exitFee
    
let canWithdraw = false,
    canReinvest = false

let fluxallowance, // allowance from contract 
    approved, // boolean 
    balance,
    dividends,
    stakeBalance,
    stakePercent
    
let totalStakeBalance,
    totalTokenBalance,
    refEarnings,
    allTimeRefEarnings,
    totalInvested,
    totalWithdrawn

let Token,
    Stake,
    TokenContract = "0x3D3D35bb9bEC23b06Ca00fe472b50E7A4c692C30",
    StakeContract = "0x34317e2Da45FeC7c525aCa8dAbF22CbC877128a3",
    fluxuniswapURL = "https://uniswap.exchange/swap?outputCurrency="
    
let defaultRef = "0xf56345338Cb4CddaF915ebeF3bfde63E70FE3053"

let inventoryFund

async function setupFlux() {
    setReferrer()
    
    // if(!isTimer) {setupTimer()} no longer needed, but leaving the timer code in here anyway 
    
    try {
        Stake = new web3.eth.Contract(abi_stake, StakeContract);
        Token = new web3.eth.Contract(VIDYA_ABI, TokenContract); // comment this out 
        // accounts = await web3.eth.getAccounts();
        user = inventoryUser

        getOneTimeData();
        getData(); // Starts looping every 3s
        getFluxAllowance(); // Starts looping every 5s

    } catch (e) {
        console.error(e)
    }
    
}

function setupTimer() {
    isTimer = true
    var remainingTime = 1608501600;
    var haha = '<span id="haha"></span>';
    $('#hehe').append(haha);
    
    var MMode = setInterval(function(){ MModeTimer(remainingTime)}, 1000);
    
    function MModeTimer(remainingTime) {
        var currentTime = new Date().getTime() / 1000;
        var futureTime = remainingTime;
        var timeRemaining = futureTime - currentTime;
        var minute = 60;
        var hour = 60 * 60;
        var day = 60 * 60 * 24;
        var dayFloor = Math.floor(timeRemaining / day);
        var hourFloor = Math.floor((timeRemaining - dayFloor * day) / hour);
        var minuteFloor = Math.floor((timeRemaining - dayFloor * day - hourFloor * hour) / minute);
        var secondFloor = Math.floor((timeRemaining - dayFloor * day - hourFloor * hour - minuteFloor * minute));
        
        if (secondFloor <= 0 && minuteFloor <= 0) {
            $(".fluxStartTimer").remove()
            clearInterval(MModeTimer)
        } else {
            if (futureTime > currentTime) {
                $(".fluxStartTimer").css("display","flex")
                $('#haha').html(hourFloor + " Hours " + minuteFloor + " Minutes " + secondFloor + " Seconds ");
            }
        }
    }
}

async function getOneTimeData() {
    
    $("#reflink").text(fluxurl+user)
    
    try {
        await Stake.methods.getOneTimeData().call({
            from: user
        }).then(function(r) {
            entryFee = parseInt(r[0])
            exitFee = parseInt(r[1])
        })
    }
    catch(e) {
        console.error(e)
    }
}

// MultiData
async function getData() {

    if (approved) {
        $("button#buy").removeClass("disabled")
    } else {
        if (!$("button#buy").hasClass("disabled")) {
            $("button#buy").addClass("disabled")
        }
    }
    
    // The call data
    try {
        
        // Inventory fund
        await Stake.methods.inventoryFund().call().then(function(r) {
            if(inventoryFund != r) {
                inventoryFund = r
                refresh($(".inventory-pot"), inventoryFund)
            }
        })
        
        // Fetch totalInvested
        await Stake.methods.getInvested().call({from: user}).then(function(r) {
            if(totalInvested !== r) {
                totalInvested = r
                refresh($(".totalInvested"), totalInvested)
            }
        })
        
        await Stake.methods.multiData().call({
            from: user
        }).then(function(r) {
            if (r[0] !== totalTokenBalance) {
                totalTokenBalance = r[0];
                refresh($(".totalTokenBalance"), r[0]);
            }
            if (r[1] !== totalStakeBalance) {
                totalStakeBalance = r[1];
                refresh($(".totalStakeBalance"), r[1]);
            }
            if (r[2] !== stakeBalance) {
                stakeBalance = r[2];
                refresh($(".stakeBalance"), r[2]);
            }
            if (r[3] !== balance) {
                balance = r[3];
                refresh($(".balance"), r[3]);
            }
            if (r[4] !== dividends) {
                dividends = r[4];
                refresh($(".dividends"), r[4]);
            }
            
            if (r[5] !== buyPrice) {
                buyPrice = r[5];
            }
            
            if (r[6] !== sellPrice) {
                sellPrice = r[6];
            }
			
			if(r[7] !== allTimeRefEarnings) {
				allTimeRefEarnings = r[7];
				refresh($(".allTimeRefEarnings"), r[7]);
			}
			
			if(r[8] !== refEarnings) {
				refEarnings = r[8];
				refresh($(".refEarnings"), r[8]);
			}
			
			/*  Useless and inaccurate data,
			    Contract tracks this wrong
			if(r[9] !== totalInvested) {
				totalInvested = r[9];
				refresh($(".totalInvested"), r[9]);
			}
			*/
			
			if(r[10] !== totalWithdrawn) {
			    totalWithdrawn = r[10]
			    refresh($(".totalWithdrawn"), r[10])
			}
            
            // Calculate & show user stake
            let _userBalance = web3.utils.fromWei(stakeBalance);
            let _contractBalance = web3.utils.fromWei(totalStakeBalance);
            let _userStake = (_userBalance * 100 / _contractBalance).toFixed(2);
            if(_userStake != stakePercent && _userStake !== "NaN") {
                stakePercent = _userStake;
                refresh($(".stakePercent"), web3.utils.toWei(stakePercent));
            }
        });
        
        
        // When user runs out of balance 
        if(parseInt(web3.utils.fromWei(balance)) == 0) {
            $("#uniswapPrompt").empty()
            $("#uniswapPrompt").html("<div> \
        <div>No VIDYA found in wallet. You can buy some on Uniswap if you like!</div> \
        <div> \
            <button id=\"buyFromUniswap\" class=\"inventory-button margin-top-1rem\">Buy From Uniswap</button> \
        </div> \
        </div>")
        }
        
        // When user has no stake 
        if(parseFloat(web3.utils.fromWei(stakeBalance)) == 0) {
            if($("#buyStakePrompt").hasClass("closed")) {
                $("#buyStakePrompt").removeClass("closed")
            }
        } else {
            if(!$("#buyStakePrompt").hasClass("closed")) {
                $("#buyStakePrompt").addClass("closed")
            }
        }

        if(!canWithdraw) {
            if(parseFloat(web3.utils.fromWei(refEarnings)) > 0) {
                canWithdraw = true
            }
        }
        
        if(!canReinvest) {
            if(parseFloat(web3.utils.fromWei(dividends)) > 0) {
                canReinvest = true
                canWithdraw = true // If has divs, they can withdraw 
            }
        }
            
        if(canWithdraw) {
            $("#withdraw").removeClass("disabled")
        } else {
            if(!$("#withdraw").hasClass("disabled")) {
                $("#withdraw").addClass("disabled")
            }
        }

        if(canReinvest) {
            $("#reinvest").removeClass("disabled")
        } else {
            if(!$("#reinvest").hasClass("disabled")) {
                $("#reinvest").addClass("disabled")
            }
        }

        if(!fluxClosed) {
            setTimeout(getData, 2000)
        }
    } catch (e) {
        console.error(e)
    }

}

async function getFluxAllowance() {
    try {
        // Token => VIDYA 
        await Token.methods.allowance(user, StakeContract).call().then(function(r) {
            if (fluxallowance !== r) {
                fluxallowance = r;
                refresh($(".approved"), r);
                if (parseFloat(fluxallowance) > 0) {
                    approved = true;
                    $("#approve").css({
                        "opacity" : "0.3"
                    })
                } else {
                    approved = false;
                    $("#approve").css({
                        "opacity" : "1"
                    })
                }
            }
        })
        
        if(!fluxClosed) {
            setTimeout(getFluxAllowance, 5000)
        }
    } catch (e) {
        console.error(e)
    }
}


async function approve(amount) {
    try {
        // Don't forget to change Token => VIDYA 
        await Token.methods.approve(StakeContract, amount).send({
                from: user
            })
            .on("transactionHash", function(hash) {
                notify('<div class="text-align-center"><a href="https://etherscan.io/tx/'+hash+'" target="_blank">Approving</a> VIDYA for trading...</div>')
            })
            .on("receipt", function(receipt) {
                cleanup()
                getFluxAllowance()
                $("[contenteditable=\"true\"]").text("0")
                notify('<div class="text-align-center">VIDYA approved successfully!</div>')
            })
            .on("error", function(error) {
                console.error(error)
            })
    } catch (e) {
        console.error(e)
    }
}


async function buy(amount, referral) {
    try {
        await Stake.methods.buy(amount, referral).send({
                from: user
            })
            .on("transactionHash", function(hash) {
                notify('<div class="text-align-center"><a href="https://etherscan.io/tx/'+hash+'" target="_blank">Buying</a> FLUX...</div>')
            })
            .on("receipt", function(receipt) {
                cleanup()
                notify('<div class="text-align-center">Bought FLUX successfully!</div>')
            })
            .on("error", function(error) {
                console.error(error)
            })
    } catch (e) {
        console.error(e)
    }
}


async function sell(amount, referral) {
    try {
        await Stake.methods.sell(amount, referral).send({
                from: user
            })
            .on("transactionHash", function(hash) {
                notify('<div class="text-align-center"><a href="https://etherscan.io/tx/'+hash+'" target="_blank">Selling</a> FLUX...</div>')
            })
            .on("receipt", function(receipt) {
                cleanup()
                notify('<div class="text-align-center">Sold FLUX successfully!</div>')
            })
            .on("error", function(error) {
                console.error(error)
            })
    } catch (e) {
        console.error(e)
    }
}


async function withdraw() {
    try {
        await Stake.methods.withdraw().send({
                from: user
            })
            .on("transactionHash", function(hash) {
                notify('<div class="text-align-center"><a href="https://etherscan.io/tx/'+hash+'" target="_blank">Withdrawing</a> VIDYA...</div>')
            })
            .on("receipt", function(receipt) {
                canWithdraw = false
                canReinvest = false // withdraw() withdraws it all! 
                notify('<div class="text-align-center">VIDYA withdrawn successfully!</div>')
            })
            .on("error", function(error) {
                console.error(error)
            })
    } catch (e) {
        console.error(e)
    }
}


async function reinvest() {
    try {
        await Stake.methods.reinvest().send({
                from: user
            })
            .on("transactionHash", function(hash) {
                notify('<div class="text-align-center"><a href="https://etherscan.io/tx/'+hash+'" target="_blank">Reinvesting</a> VIDYA...</div>')
            })
            .on("receipt", function(receipt) {
                canReinvest = false
                notify('<div class="text-align-center">VIDYA reinvested successfully!</div>')
            })
            .on("error", function(error) {
                console.error(error)
            })
    } catch (e) {
        console.error(e)
    }
}


async function castSpell() {
    let txHash
    try {
        await Stake.methods.feedInventory().send({
            from: user
        })
        .on("transactionHash", function(hash) {
            txHash = hash
            notify('<div class="text-align-center">Casting <a href="https://etherscan.io/tx/'+hash+'" target="_blank">magic spell</a><br>This might take a while...</div>')
        })
        /*  Again this just like in uniswap.js
            Can anyone tell me this this receipt isn't working? pls sirs 
            
        .on("receipt", function(receipt) {
            let bonusTokens = parseFloat(web3.utils.fromWei(r.events.Transfer[1].returnValues.tokens)).toFixed(4)
            notify('<div class="text-align-center">Spell cast successfully!<br>You got '+bonusTokens+' VIDYA</div>')
        })
        */
        
        // Instead i await it like so...
        let receipt = await web3.eth.getTransactionReceipt(txHash)
        let bonusTokens = parseFloat(web3.utils.fromWei(web3.utils.hexToNumberString(receipt.logs[1].data))).toFixed(2) // oof 
        notify('<div class="text-align-center">Spell cast successfully!<br>You got '+bonusTokens+' VIDYA</div>')
    }
    catch(e) {
        console.error(e)
    }
}


if (localStorage.getItem("referrer") === null) {
    window.localStorage.setItem("referrer", JSON.stringify(defaultRef));
}


function setReferrer() {
    let path = window.location.href;
    let match = path.match(/\/#\/(.+)\??/);
    if (match) {
        let ref = decodeURIComponent(match[1]);
        if (web3.utils.isAddress(ref)) {
            window.localStorage.setItem("referrer", JSON.stringify(ref));
        }
    }
}


// Truncates decimal places without rounding
function decimal(number) {
    // Truncate to 2 decimal places 
    return number.match(/^-?\d+(?:\.\d{0,2})?/)[0];
}


function refresh(element, newval) {
    $(element).fadeOut();
    $(element).text(decimal(web3.utils.fromWei(newval)));
    $(element).fadeIn();
}


function updateBuyEstimate(newval) {
    let amount
    if(!newval) {
        amount = $("#tokenToSpend").text()
    } else {
        amount = newval
    }
    if(amount !== "" && parseFloat(amount) > 0) {
        let divs = amount * entryFee / 100
        let stakeReceived = amount - divs
        let wei = web3.utils.toWei(stakeReceived.toString())
        refresh(("#buyEstimate"), wei)
        
        approveAmount = web3.utils.toWei(amount)
    }
}


function updateSellEstimate(newval) {
    let amount
    if(!newval) {
        amount = $("#stakeToSpend").text()
    } else {
        amount = newval
    }
    if(amount !== "" && parseFloat(amount) > 0) {
        let divs = amount * exitFee / 100;
        let tokenReceived = amount - divs;
        let wei = web3.utils.toWei(tokenReceived.toString());
        refresh(("#sellEstimate"), wei);
        
        sellAmount = web3.utils.toWei(amount)
    }
}


function jesusFuckingChrist(data, element, balance, action) {
        let _percent   = data.toString()
        let _percentBN = new BigNumber(_percent)
        let _balanceBN = new BigNumber(web3.utils.fromWei(balance))
        let _hundredPercent = new BigNumber(100)
        let _result = (_balanceBN.multipliedBy(_percentBN)).dividedBy(_hundredPercent).decimalPlaces(18).toString()
        
        // Display the amount on UI nicely  
        switch(action) {
            case "buy":
            updateBuyEstimate(_result)
            break
            case "sell":
            updateSellEstimate(_result)
            break
        }
        
        $(element).text(decimal(_result))
}


function cleanup() {
    if($("#tokenToSpend").text() !== "0") {
        $("#tokenToSpend").text("0")
    }
    if($("#buyEstimate").text() !== "0") {
        $("#buyEstimate").text("0")
    }
    if($("#stakeToSpend").text() !== "0") {
        $("#stakeToSpend").text("0")
    }
    if($("#sellEstimate").text() !== "0") {
        $("#sellEstimate").text("0")
    }
}


function copy(element) {
    var range, selection, worked

    if (document.body.createTextRange) {
        range = document.body.createTextRange()
        range.moveToElementText(element)
        range.select()
    } else if (window.getSelection) {
        selection = window.getSelection()
        range = document.createRange()
        range.selectNodeContents(element)
        selection.removeAllRanges()
        selection.addRange(range)
    }

    try {
        refText = $(element).html()
        document.execCommand('copy')
        $(element).text("Copied!")
        $("#reflink").addClass("no-pointer-events")
        setTimeout(function() {
            $(element).html(refText)
            $("#reflink").removeClass("no-pointer-events")
        }, 1000)
    } catch (err) {
        console.error(err)
    }
}


$(document).ready(function(){
    // Block all non numbers 
    $('.flux-input[contenteditable="true"]').keypress(function(e) {
        var x = event.charCode || event.keyCode
        if (isNaN(String.fromCharCode(e.which)) && x!=46 || x===32 || x===13 || (x===46 && event.currentTarget.innerText.includes('.'))) e.preventDefault()
    })

    /*** Focus, keyup events ***/
    $("#tokenToSpend").focus(function() { $("#tokenToSpend").text("") })
    $("#tokenToSpend").on("keyup", function() { updateBuyEstimate() })
    $("#stakeToSpend").focus(function() { $("#stakeToSpend").text("") })
    $("#stakeToSpend").on("keyup", function() { updateSellEstimate() })
    
    /*** CLICK EVENTS ***/
    $("#buyPercent").on("click", ".btn", function(e) {
        if(typeof(balance) !== "undefined" && balance !== "0") {
            jesusFuckingChrist(parseInt($(e.target).attr("data")), $("#tokenToSpend"), balance, "buy")
        }
    })
    
    $("#sellPercent").on("click", ".btn", function(e) {
        if(typeof(stakeBalance) !== "undefined" && stakeBalance !== "" && stakeBalance !== "0") {
            jesusFuckingChrist(parseInt($(e.target).attr("data")), $("#stakeToSpend"), stakeBalance, "sell")
        }
    })
    
    $("body").on("click", "#buyFromUniswap", function() {
        window.open(fluxuniswapURL+TokenContract);
    })
    
    $("#approve").on("click", function() {
        if(typeof(approveAmount) == "string" && approveAmount !== "" && parseFloat(approveAmount) > 0) {
            approve(approveAmount)
        }
    })
    
    $("#buy").click(function() {
        if(approved) {
            let referral = JSON.parse(window.localStorage.getItem('referrer'))
            buy(fluxallowance, referral)
        }
    })
    
    $("#sell").click(function() {
        if(typeof(sellAmount) !== "undefined" && sellAmount !== "0" && parseFloat(sellAmount) > 0) {
            let referral = JSON.parse(window.localStorage.getItem('referrer'))
            sell(sellAmount, referral)
        }
    })
    
    $("#reinvest").click(function() {
        if(canReinvest) {
            reinvest()
        }
    })
    
    $("#withdraw").click(function() {
        if(canWithdraw) {
            withdraw()
        }
    })

    $("#reflink").click(function() {
        copy(this)
    })
    
    $("#btn-magic").click(function() {
        if(parseFloat(inventoryFund) > 0) {
            castSpell()
        } else {
            notify('<div class="text-align-center">Sorry, but the Inventory fund is empty right now.</div>')
        }
    })

})
