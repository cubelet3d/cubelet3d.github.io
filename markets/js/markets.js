let url = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum%2Cvidya&vs_currencies=usd"

let price_vidya, price_eth, price_gas

let price_refresh_interval = 60000

async function fetchPrices() {
    await $.ajax({
        url: url,
        type: "GET",
        dataType: "JSON",
        success: function(r) {
            if(r) {
                if(price_vidya !== r.vidya.usd.toFixed(3)) {
                    price_vidya = r.vidya.usd.toFixed(3)
                    $("#vidya-price").fadeOut(100)
                    $("#vidya-price").text(price_vidya)
                    $("#vidya-price").fadeIn()
                }
                if(price_eth !== r.ethereum.usd.toFixed(2)) {
                    price_eth = r.ethereum.usd.toFixed(2)
                    $("#eth-price").fadeOut(100)
                    $("#eth-price").text(price_eth)
                    $("#eth-price").fadeIn()
                }
            }
        },
        error: function(e) {
            console.log(e)
        }
    })
    
    if(typeof(accounts) !== "undefined" && $("#gas-price").is(":visible")) {
    	await web3.eth.getGasPrice().then((result) => {
    		if(price_gas !== parseInt(result)) {
    		    price_gas = parseInt(result)
    		    $("#gas-price").fadeOut(100)
    		    $("#gas-price").text(parseFloat(web3.utils.fromWei(price_gas.toString(), "gwei")).toFixed(2))
    		    $("#gas-price").fadeIn()
    		}
    	})
    }
    
    setTimeout(fetchPrices, price_refresh_interval)
}

$(document).ready(function() {
    fetchPrices()
})
