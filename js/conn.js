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
    }
    
    catch(e) {
        console.error(e)
    }
    
}

async function setup() {
    
    try {
        web3 = new Web3(window.ethereum)
        accounts = await web3.eth.getAccounts()
		
        let chainID = await web3.eth.getChainId()
		
		// MainNet Functionality 
        if(chainID == 1 || chainID == 1337) {
			// Wait for Inventory 
            await loadInventory()
			
			if(Dao.online){ResetDaoInstance()} // In case wallet changed
			$("#dao_button_wrapper").show("scale") // Show DAO button

            replaceUniswapLink("vidyaswap")
            $("#vidyaflux_button_wrapper, .vidyaflux_button_wrapper").show("scale") // show vidyaflux icon

			// Disable generator on mainnet for now 
			$("#cubelets_button_wrapper").show("scale")
			$("#generator_button_wrapper, #generator").hide()
			Generator.online = false
			resetUserInstance() 
			$("#generator_button").removeClass("disabled")
			$("#tasks .task[data=generator]").remove()
			
			/* Can someone tell me how to make chat work on https? I tried and tried, but was 
			unable to get WSS connection to establish. At one point readyState was 1 on client, but server had no idea etc. 
			Server runs on a lightsail instance, nodejs. I believe I have opened required ports. Messed with something called 
			a "load balancer" too with no luck. For now let's open chat for people who run teamOS locally :) */
			if(location.hostname === "localhost" || location.hostname === "127.0.0.1") {
				$("#startmenu .chat3d-toggle").show()
			}
        }
		
		// Ropsten testnet 
		else if(chainID == 3) {
			
			// await loadInventory() // We now have Inventory @Ropsten too, but for now you gotta manually set the address in inventory.js 
			
			if(Dao.online){ResetDaoInstance()} // In case wallet changed
			$("#dao_button_wrapper").show("scale") // Show DAO button

			if(Generator.online) {
				// Force setup again if generator has been initialized (can happen when generator is active and someone changes wallets in metamask)
				User.isSetup = false
			}
			$("#generator_button_wrapper").show("scale")
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
		
		audio.boot.play()

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