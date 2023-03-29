// let url = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum%2Cvidya&vs_currencies=usd"

let price_vidya, price_eth, price_gas

let price_refresh_interval = 60000

/*async function fetchPrices() {
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
})*/

async function fetchPricesOnChain() {
	try {
		let abi = [{"constant":true,"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint32","name":"_blockTimestampLast","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"}]
		let pool = new web3.eth.Contract(abi, "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11") // dai/weth pool 
		let pool2 = new web3.eth.Contract(abi, "0xDA3706c9A099077e6BC389D1baf918565212A54D")// vidya/weth pool 
		let eth_price, vidya_price = null 
		
		await pool.methods.getReserves().call().then(function(r) {
			let dai = web3.utils.fromWei(r._reserve0)
			let eth = web3.utils.fromWei(r._reserve1)
			let usd = dai / eth 
			eth_price = usd 
		})
		
		await pool2.methods.getReserves().call().then(function(r) {
			let vidya = web3.utils.fromWei(r._reserve0)
			let eth = web3.utils.fromWei(r._reserve1)
			let vidyaInEth = vidya / eth 
			vidya_price = vidyaInEth 
		})
		
		let vidyaInUsd = eth_price / vidya_price 
		
		price_eth = eth_price 
		price_vidya = vidyaInUsd
		
    	await web3.eth.getGasPrice().then((result) => {
    		price_gas = parseInt(result)
    	})
        
		$("#eth-price").text(price_eth.toFixed(2))
		$("#vidya-price").text(price_vidya.toFixed(2))
        $("#gas-price").text(parseFloat(web3.utils.fromWei(price_gas.toString(), "gwei")).toFixed(2))
		
		if($("#markets").hasClass("hidden")) {$("#markets").removeClass("hidden")}
		
		setTimeout(fetchPricesOnChain, price_refresh_interval)
	}
	catch(e) {
		console.error(e)
	}
}