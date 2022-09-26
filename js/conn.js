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

var web3, accounts, connected = false

async function init() {
    
    try {
        if (window.ethereum) {
            await ethereum.request({method: 'eth_requestAccounts'})

            $("#connect").addClass("disabled")
            $("#connect").html('<div class="user-icon user-picture margin-right-1rem">\
            </div><div><span id="web3-loading">Loading...</span></div>')
            $(".user-picture").html('<div class="template-loading-outer flex-box flex-start no-pointer-events"><div class="template-loading-inner"></div></div>');
            
            await setup()
            
            // Subscribe to accounts change
            window.ethereum.on("accountsChanged", (accounts) => {
                setup()
            })
			
            // Subscribe to network change 
            window.ethereum.on('networkChanged', function(networkId) {
                setup()
            })
			
			checkVersion() 
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
			$(".testnet_object").fadeOut()
			
            await loadInventory()

            replaceUniswapLink("vidyaswap")
            $("#vidyaflux_button_wrapper, .vidyaflux_button_wrapper").show("scale") // show vidyaflux icon
			$("#cubelets_button_wrapper").show("scale") // cubelets icon 
			
			// Generator 
			if(Generator.online) {
				// Force setup again if generator has been initialized (can happen when generator is active and someone changes wallets in metamask)
				// Note to self: this object & variable is too generic 
				User.isSetup = false
			}
			if(isMobile) {
				$(".generator-button-wrapper-mobile").show("scale")
				$("#lemongame_button_wrapper_mobile").show("scale")
			} else {
				$("#generator_button_wrapper").show("scale")
				$("#lemongame_button_wrapper").show("scale")
			}
			
			$("#browser_button_wrapper").show("scale") // browser 
        }
		
		// Ropsten testnet 
		else if(chainID == 3) {
			notify("Connected to Ropsten testnet!")
			/*  Ropsten Inventory
				Note that present and distributor contracts don't exist on Ropsten right now
				hence the console errors as inventory.js is trying to find 'em */
			VidyaAddress = "0x0CbCaFD9f1B9d7c41B6F55BbddE06Bee3Aa7B791"
			inventoryContract = "0x38090E1107c3163703F6AdCb811AAfdEbBd6f651" 
			await loadInventory()
		}
		
		
		// Rinkeby 
		else if(chainID == 4) {
			notify("Connected to Rinkeby testnet!")
			VidyaAddress = "0x071a2A775b76387e6B58b39b2D43ce74A7302277"
			inventoryContract = "0x0CbCaFD9f1B9d7c41B6F55BbddE06Bee3Aa7B791" 
			// Similarly to Ropsten, the Rinkeby network doesn't have present and distributor either 
			await loadInventory()
		}
		
		// "Girly" network  
		else if(chainID == 5) {
			// Console errors due to no inventory, no vidya, no nothing. Idk why anyone would choose to test on this network... 
			$(".mainnet_object").fadeOut()
			$("#multipass_button_wrapper").show("scale")
		}
		
		// The useless Polygon 
        else if(chainID == 137) {
            replaceUniswapLink("quickswap")
			$(".mainnet_object").fadeOut() // Hide all mainnet things
        } else {
			notify("Please connect either to Ethereum mainNet, Ropsten testNet or Polygon network")
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
		
		$("#startmenu .chat3d-toggle").show() // enable chat
		
		audio.boot.play()
		
		connected = true 

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

async function checkVersion() {
	let live = await $.get("https://w3.lol/version.txt")
	let ours = await $.get("settings/version.txt")
	if(live !== ours) {
		notify('There is a new version of TeamOS available! You can download it <a href="https://github.com/cubelet3d/cubelet3d.github.io" target="_blank">here</a>.')
	}
}