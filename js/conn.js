window.addEventListener('load', async () => {
    if(window.ethereum) {
        $("#connect").css("display","flex")
    } else {
        $("#connect").html("Web3 not found")
        $("#connect").css("display","flex")
    }
})

$(document).ready(function() {
    $("#connect").click(function() {
        init()
    })
})

var web3, accounts

async function init() {
    
    try {
        if (window.ethereum) {
            await ethereum.request({method: 'eth_requestAccounts'})

            $("#connect").addClass("disabled")
            $("#connect").html('<div class="user-icon user-picture margin-right-1rem">\
            </div><div class="margin-right-1rem"><span id="web3-loading">Loading...</span></div>')
            $(".user-picture").html('<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>');
            
            await setup()
            
            // Subscribe to accounts change
            window.ethereum.on("accountsChanged", (accounts) => {
                setup()
            })
        }
    
        else {
			// Is any provider given to us at all please? 
            if(Web3.givenProvider != void 0) {
				$("#connect").addClass("disabled")
				$("#connect").html('<div class="user-icon user-picture margin-right-1rem">\
				</div><div class="margin-right-1rem"><span id="web3-loading">Loading...</span></div>')
				$(".user-picture").html('<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>');
				
				await setup()
				
				// Subscribe to accounts change
				window.ethereum.on("accountsChanged", (accounts) => {
					setup()
				})
			}
        }
    }
    
    catch(e) {
        console.error(e)
    }
    
}

async function setup() {
    
    try {
        web3 = new Web3(window.ethereum)
        accounts = await web3.eth.getAccounts()
        
        await loadInventory()
        // await loadExchange()
        replaceUniswapLink() // replace uniswap link with vidyaswap icon
        $("#vidyaflux_button_wrapper, .vidyaflux_button_wrapper").show("scale") // show vidyaflux icon

        // Hide spinner
        $(".user-picture").html('')
        
        let blockie = blockies.create({seed:accounts[0].toLowerCase()}).toDataURL()
        $(".user-picture").css("background-image", "url("+blockie+")");
        $("#web3-loading").text("Connected!")
        
    	let gasPrice
    	await web3.eth.getGasPrice().then((result) => {
    		gasPrice = parseInt(result)
    	})
        
        $("#gas-price-wrapper").css("display","flex")
        $("#gas-price").text(parseFloat(web3.utils.fromWei(gasPrice.toString(), "gwei")).toFixed(2))
        
        // Network check
        await web3.eth.net.getNetworkType().then(function(r) {
            if(r !== "main") {
                notify("Please connect to the Ethereum MainNet")
            }
        })
		
        // Flux check 
        let fabi = [{"constant":true,"inputs":[{"internalType":"address","name":"_customerAddress","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]
        let fins = new web3.eth.Contract(fabi,"0x34317e2da45fec7c525aca8dabf22cbc877128a3")
        await fins.methods.balanceOf(inventoryUser).call().then(function(r) {
            if(r == "0") {
                notify('<div style="font-size:1rem;text-align:center">Staking is live!</div><p>Learn more by clicking on the VidyaFlux icon.</p>')
            } else {
				// This is not an easter egg, you won't get anything for reporting this 
			}
        })
		
    }
    
    catch(e) {
        console.error(e)
    }
    
}