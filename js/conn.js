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
			
            // Subscribe to network change 
            window.ethereum.on('networkChanged', function(networkId) {
                setup()
            })
        }
    
        /*else {
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
        }*/
    }
    
    catch(e) {
        console.error(e)
    }
    
}

async function setup() {
    
    try {
        web3 = new Web3(window.ethereum)
        accounts = await web3.eth.getAccounts()
		
        // Network check
        let chainID = await web3.eth.getChainId()
        if(chainID == 1 || chainID == 1337) {
			// This is Ethereum MainNet
            await loadInventory() // We only have inventory on MainNet right now
            replaceUniswapLink("vidyaswap")
            $("#vidyaflux_button_wrapper, .vidyaflux_button_wrapper").show("scale") // show vidyaflux icon
            
            // Flux check 
            let fabi = [{"constant":true,"inputs":[{"internalType":"address","name":"_customerAddress","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]
            let fins = new web3.eth.Contract(fabi,"0x34317e2da45fec7c525aca8dabf22cbc877128a3")
            await fins.methods.balanceOf(inventoryUser).call().then(function(r) {
                if(r == "0") {
                    notify('<div style="font-size:1rem;text-align:center">Staking is live!</div><p>Learn more by clicking on the VidyaFlux icon.</p>')
                }
            })
        }
        else if(chainID == 137) {
			// This is Polygon
            replaceUniswapLink("quickswap")
			$(".mainnet_object").fadeOut() // Hide all mainnet things
        } else {
			notify("Please connect either to Ethereum mainNet or Polygon")
		}

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
    }
    
    catch(e) {
        console.error(e)
    }
    
}

// Replaces Uniswap link
function replaceUniswapLink(what) {
    $("#uniswap-button-wrapper, .uniswap-button-wrapper").html('<div id="'+what+'_button" class="flex-box col center-vertical" data="'+what+'"> \
    <div class="icon desktop-icon '+what+' no-pointer-events shortcut"></div> \
    <span class="font-monospace text-align-center">'+what+'</span> \
    </div>')
    let elem = $('#'+what+'_button')
    $(elem).css({"opacity":"0"})
    setTimeout(function() {$(elem).css({"opacity":"1"})}, 100)
    setTimeout(function() {$(elem).css({"opacity":"0"})}, 200)
    setTimeout(function() {$(elem).css({"opacity":"1"})}, 300)
    setTimeout(function() {$(elem).css({"opacity":"0"})}, 400)
    setTimeout(function() {$(elem).css({"opacity":"1"})}, 500)
}