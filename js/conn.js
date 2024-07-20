let chainID, alchemy, infura = null;
let web3, 
    accounts, 
    connected = false;

window.addEventListener('load', async () => {
    if (window.ethereum) {
        $("#connect").css("display", "flex");
    } else {
        $("#connect").html("Web3 not found");
        $("#connect").css("display", "flex");
    }
});

$(document).ready(function() {
    $("#connect").click(function() {
        init();
    });

    let icon = $("#connect .icon");
    let anim = false;

    icon.hover(
        function() {
            if (!anim) {
                anim = true;
                icon.removeClass("connect").addClass("connect-hover");
                setTimeout(function() {
                    icon.removeClass("connect, connect-hover").addClass("connect-anim-done");
                    anim = false;
                    if ($("#connect .icon:hover").length == 0) {
                        icon.removeClass("connect-hover, connect-anim-done").addClass("connect");
                    }
                }, 1500);
            }
        },
        function() {
            icon.removeClass("connect-hover, connect-anim-done").addClass("connect");
        }
    );
});

async function init() {
    $("#desk").addClass("no-pointer-events");

    try {
        if (window.ethereum) {
            await ethereum.request({
                method: 'eth_requestAccounts'
            });

            $("#connect").addClass("disabled");
            $("#connect").html(`<div class="user-icon user-picture margin-right-1rem"></div><div><span id="web3-loading">Loading...</span></div>`);
            $(".user-picture").html(`<div class="template-loading-outer flex-box flex-start no-pointer-events"><div class="template-loading-inner"></div></div>`);

            await setup();

            window.ethereum.on("accountsChanged", (accounts) => {
                setup();
            });
            window.ethereum.on('chainChanged', function(networkId) {
                setup();
            });

            checkVersion();
        }
    } catch (e) {
        console.error(e);
    }
}

async function setup() {
    try {
        web3 = new Web3(window.ethereum);
        accounts = await web3.eth.getAccounts();
        chainID = await web3.eth.getChainId();
		alchemy = null; 
		
		// Mainnet & localhost  
        if(chainID == 1 || chainID == 1337) {
			$(".testnet_object").fadeOut();
			$(".l2_object").fadeOut(); 
			
			VidyaAddress = "0x3d3d35bb9bec23b06ca00fe472b50e7a4c692c30"; 
			inventoryContract = "0x9680223f7069203e361f55fefc89b7c1a952cdcc"; 			

			await fetchPricesOnChain();
            await loadInventory();

            replaceUniswapLink("vidyaswap");
            $("#vidyaflux_button_wrapper, .vidyaflux_button_wrapper").show("scale");
			
			// Generator 
			if(Generator.online) {
				// Force setup again if generator has been initialized (can happen when generator is active and someone changes wallets in metamask)
				User.isSetup = false;
			}
			if(isMobile) {
				$(".generator-button-wrapper-mobile").show("scale");
				$("#lemongame_button_wrapper_mobile").show("scale");
			} else {
				$("#generator_button_wrapper").show("scale");
				$("#lemongame_button_wrapper").show("scale");
			}
			
			$("#browser_button_wrapper").show("scale");
			$("#alchemy_button_wrapper").show("scale");
        } 
		
		// Arbitrum One 
		else if (chainID == 42161) {
			$(".mainnet_object").fadeOut();
			VidyaAddress = "0x3d48ae69a2F35D02d6F0c5E84CFE66bE885f3963"; 
			inventoryContract = "0x2Ce68A50a0e5738E675ed9a9899D86a01f2a9a0B"; 
			await loadInventory(); 
			
			// Agnosia 
			alchemy = new Web3(new Web3.providers.HttpProvider('https://arb-mainnet.g.alchemy.com/v2/WaECH19QGPKr0R83WmeJyVc7UC8-cLzU'));
			infura = new Web3(new Web3.providers.WebsocketProvider('wss://arbitrum-mainnet.infura.io/ws/v3/05e9a62a1e294897a90e2bf90df2cf96'));
			await tcg_base_init();
		}
		
		// Sepolia network  
		/* else if(chainID == 11155111) {
			notify("Connected to Sepolia testnet!");
			$(".mainnet_object").fadeOut()
			// $("#multipass_button_wrapper").show("scale")
			// $("#alchemy_button_wrapper").show("scale")
			VidyaAddress = "0xf51986be66acec5bb671fec00503e877f66006b6"; 
			
			distributorContract = "0x8A6F9dba6dd87bC1FEF6eA4cc21d2eC5Ad4478FB"
			inventoryContract = "0xb4aF2A2F18AC71879eE5391a33f71De5840BCA77" 
			await loadInventory()
			
			tcg_base_init(); // Agnosia 
			
			$('#tcg_base_button_wrapper_mobile').show('scale'); // Agnosia mobile link 
		} 
		
		// Polygon 
        else if(chainID == 137) {
            replaceUniswapLink("quickswap")
			$(".mainnet_object").fadeOut() // Hide all mainnet things
        } else {
			notify("Please connect either to Ethereum mainnet, Sepolia testnet or Polygon network"); 
		} */

        // Hide spinner
        $(".user-picture").html('');
        
        let blockie = blockies.create({seed:accounts[0].toLowerCase()}).toDataURL();
        $(".user-picture").css("background-image", "url("+blockie+")");
        $("#web3-loading").text("Connected!");
		
		$("#startmenu .chat3d-toggle").show(); // enable chat
		$("#desk").removeClass("no-pointer-events");
		
		audio.boot.play();
		
		connected = true;
		
		execute();
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


})