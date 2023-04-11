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
	
	$("#desk").addClass("no-pointer-events");
    
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
            window.ethereum.on('chainChanged', function(networkId) {
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
			
			await fetchPricesOnChain()
			
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
			
			$("#alchemy_button_wrapper").show("scale")
			
        }
		
		// "Girly" network  
		else if(chainID == 5) {
			notify("Connected to Goerli testnet!")
			$(".mainnet_object").fadeOut()
			$("#multipass_button_wrapper").show("scale")
			// $("#alchemy_button_wrapper").show("scale")
			VidyaAddress = "0xFFE93E63E94da7A44739b6aBFA25B81CEd979a6b"
			distributorContract = "0xc26dEe9B7530e2c47eE2E87f4323A346432208B2"
			inventoryContract = "0xfbCc08d711664Fe9514404e4d9597774Ae3A0a63" 
			await loadInventory()
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
		
		$("#startmenu .chat3d-toggle").show() // enable chat
		
		$("#desk").removeClass("no-pointer-events");
		
		audio.boot.play()
		
		connected = true 
		
		execute()

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

function execute() {
	let queryString = window.location.search
	let urlParams   = new URLSearchParams(queryString)
    let program     = urlParams.get('open')
	$("#"+program+"_button").trigger("click")
}

$(document).ready(function() {
	let icon = $("#connect .icon")
	let anim = false

	icon.hover(
		function() {
			if(!anim) {
				anim = true 
				icon.removeClass("connect").addClass("connect-hover")
				setTimeout(function() {
					icon.removeClass("connect, connect-hover").addClass("connect-anim-done")
					anim = false 
					if($("#connect .icon:hover").length == 0) {
						icon.removeClass("connect-hover, connect-anim-done").addClass("connect")
					}
				}, 1500)
			}
		},
		function() {
			icon.removeClass("connect-hover, connect-anim-done").addClass("connect")
		}
	)

})