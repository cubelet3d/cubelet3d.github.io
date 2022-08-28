let BrowserABI
let BrowserContract
let BrowserAllFunctions = {
	read: [],
	write: [],
	payable: []
}

async function browserFetchABI(contract) {
	try {
		$("#browser-view-functions-list, #browser-write-functions-list, #browser-payable-functions-list").empty()
		$("#browser-status").text("Loading...")
		
		let apiKey   = "" // no 
		let url_base = "https://api.etherscan.io/api?module=contract&action=getabi&address="
		let fullURL  = url_base.concat(contract, '&apikey='+apiKey)
		
		await $.getJSON(fullURL).then((data) => {
			BrowserABI      = JSON.parse(data.result)
			BrowserContract = new web3.eth.Contract(BrowserABI, contract)
		})

		BrowserAllFunctions = browserAllFunctions()
		
		for(let i = 0; i < BrowserAllFunctions.read.length; i++) {
			let args = []
			for(let e = 0; e < BrowserAllFunctions.read[i].inputs.length; e++) {
				args.push(BrowserAllFunctions.read[i].inputs[e].type)
			}
			if(args.length > 0) {
				$("#browser-view-functions-list").append('<div class="browser-function-list-item flex-box space-between" data="'+i+'" args="'+args+'" type="read"><div class="flex-box col space-between full-width"><div class="browser-view-function-name padding-left-5px">'+BrowserAllFunctions.read[i].name+'</div><div class="browser-view-function-inputs-wrapper padding-left-5px"><input class="browser-view-function-inputs" placeholder="'+args+'"></input></div></div><div class="browser-function-call-button template-button flex-box align-center"><span>Call</span></div></div>')
			} else {
				$("#browser-view-functions-list").append('<div class="browser-function-list-item flex-box space-between" data="'+i+'" args="'+args+'" type="read"><div class="flex-box col space-between full-width"><div class="browser-view-function-name padding-left-5px">'+BrowserAllFunctions.read[i].name+'</div><div class="browser-view-function-inputs-wrapper padding-left-5px"><input class="browser-view-function-inputs" placeholder="none" disabled></input></div></div><div class="browser-function-call-button template-button flex-box align-center"><span>Call</span></div></div>')
			}
		}
		
		for(let i = 0; i < BrowserAllFunctions.write.length; i++) {
			let args = []
			for(let e = 0; e < BrowserAllFunctions.write[i].inputs.length; e++) {
				args.push(BrowserAllFunctions.write[i].inputs[e].type)
			}
			if(args.length > 0) {
				$("#browser-write-functions-list").append('<div class="browser-function-list-item flex-box space-between" data="'+i+'" args="'+args+'" type="write"><div class="flex-box col space-between full-width"><div class="browser-write-function-name padding-left-5px">'+BrowserAllFunctions.write[i].name+'</div><div class="browser-write-function-inputs-wrapper padding-left-5px"><input class="browser-view-function-inputs" placeholder="'+args+'"></input></div></div><div class="browser-function-call-button template-button flex-box align-center"><span>Send</span></div></div>')
			} else {
				$("#browser-write-functions-list").append('<div class="browser-function-list-item flex-box space-between" data="'+i+'" args="'+args+'" type="write"><div class="flex-box col space-between full-width"><div class="browser-write-function-name padding-left-5px">'+BrowserAllFunctions.write[i].name+'</div><div class="browser-write-function-inputs-wrapper padding-left-5px"><input class="browser-view-function-inputs" placeholder="none" disabled></input></div></div><div class="browser-function-call-button template-button flex-box align-center"><span>Send</span></div></div>')
			}
		}
		
		for(let i = 0; i < BrowserAllFunctions.payable.length; i++) {
			let args = []
			for(let e = 0; e < BrowserAllFunctions.payable[i].inputs.length; e++) {
				args.push(BrowserAllFunctions.payable[i].inputs[e].type)
			}
			if(args.length > 0) {
				$("#browser-payable-functions-list").append('<div class="browser-function-list-item flex-box space-between" data="'+i+'" args="'+args+'" type="payable"><div class="flex-box col space-between full-width"><div class="browser-payable-function-name padding-left-5px">'+BrowserAllFunctions.payable[i].name+'</div><div class="browser-payable-function-inputs-wrapper padding-left-5px"><input class="browser-view-function-inputs" placeholder="'+args+'"></input></div></div><div class="browser-function-call-button template-button flex-box align-center"><span>Send</span></div></div>')
			} else {
				$("#browser-payable-functions-list").append('<div class="browser-function-list-item flex-box space-between" data="'+i+'" args="'+args+'" type="payable"><div class="flex-box col space-between full-width"><div class="browser-payable-function-name padding-left-5px">'+BrowserAllFunctions.payable[i].name+'</div><div class="browser-payable-function-inputs-wrapper padding-left-5px"><input class="browser-view-function-inputs" placeholder="none" disabled></input></div></div><div class="browser-function-call-button template-button flex-box align-center"><span>Send</span></div></div>')
			}
		}
		
		if(BrowserAllFunctions.read.length == 0) {
			$("#browser-view-functions-list").html('<div style="padding:0.5rem">Sorry, no read functions found</div>')
		}
		else if(BrowserAllFunctions.write.length == 0) {
			$("#browser-write-functions-list").html('<div style="padding:0.5rem">Sorry, no write functions found</div>')
		}
		else if(BrowserAllFunctions.payable.length == 0) {
			$("#browser-payable-functions-list").html('<div style="padding:0.5rem">Sorry, no payable functions found</div>')
		}
		
		$("#browser-result").empty()
		$("#browser-result").text("You can now call and send transactions. Since this is a beta version it is advised to double check the transaction data when sending transactions.")
		$("#browser-status").text("Ready!")
		
		audio.msage.play()
	}
	catch(e) {
		console.error(e)
		$("#browser-status").text("Error...")
		audio.error.play()
	}
}

async function browserCallFunction(index, name, args, type) {
	try {
		$("#browser-status").text("Loading...")
		if(type == "read") {
			if(args) {
				await BrowserContract["methods"][BrowserAllFunctions[type][index].name](...browserConvertedArgs(args)).call().then(function(r) {
					$(".browser-result-wrapper").effect("highlight", {color: 'white'}, 300)
					$("#browser-result").text(name+": "+JSON.stringify(r, null, 4))
				})	
			} else {
				await BrowserContract["methods"][BrowserAllFunctions[type][index].name]().call().then(function(r) {
					$(".browser-result-wrapper").effect("highlight", {color: 'white'}, 300)
					$("#browser-result").text(name+": "+JSON.stringify(r, null, 4))
				})	
			}
		}
		if(type == "write") {
			if(args) {
				await BrowserContract["methods"][BrowserAllFunctions[type][index].name](...browserConvertedArgs(args)).send({from: accounts[0]})
					.on("transactionHash", function(hash) {
						notify('<div class="text-align-center"><a href="https://etherscan.io/tx/'+hash+'" target="_blank">Sending</a> transaction...</div>')
					})
					.on("receipt", function(receipt) {
						notify('<div class="text-align-center">Transaction confirmed!</div>')
						$(".browser-result-wrapper").effect("highlight", {color: 'white'}, 300)
						$("#browser-result").text(name+": "+JSON.stringify(receipt, null, 4))
					})
			} else {
				await BrowserContract["methods"][BrowserAllFunctions[type][index].name]().send({from: accounts[0]})
					.on("transactionHash", function(hash) {
						notify('<div class="text-align-center"><a href="https://etherscan.io/tx/'+hash+'" target="_blank">Sending</a> transaction...</div>')
					})
					.on("receipt", function(receipt) {
						notify('<div class="text-align-center">Transaction confirmed!</div>')
						$(".browser-result-wrapper").effect("highlight", {color: 'white'}, 300)
						$("#browser-result").text(name+": "+JSON.stringify(receipt, null, 4))
					})				
			}
		}
		if(type == "payable") {
			$(".browser-result-wrapper").effect("highlight", {color: 'white'}, 300)
			$("#browser-result").text("Payable txs not implemented yet...")
		}
		
		$("#browser-status").text("Ready!")
		audio.msage.play()
	}
	catch(e) {
		console.error(e)
		$("#browser-status").text("Error...")
		audio.error.play()
	}
}

function browserAllFunctions() {
	try {
		if(BrowserABI) {
			let list = {
				read: [],
				write: [],
				payable: []
			}
			for(let i = 0; i < BrowserABI.length; i++) {
				if(BrowserABI[i].type !== "constructor") {
					if(BrowserABI[i].stateMutability == "view") {
						list.read.push(BrowserABI[i])
					}
					if(BrowserABI[i].stateMutability == "nonpayable") {
						list.write.push(BrowserABI[i])
					}
					if(BrowserABI[i].stateMutability == "payable") {
						list.payable.push(BrowserABI[i])
					}
				}
			}
			
			return list
		}
	}
	catch(e) {
		audio.error.play()
		console.error(e)
		$("#browser-status").text("Error...")
	}
}

function browserShowTab(tab) {
	$(".browser-functions-list").addClass("hidden")
	switch(tab) {
		case "read":
			$("#browser-view-functions-list").removeClass("hidden")
			break;
		case "write": 
			$("#browser-write-functions-list").removeClass("hidden")
			break; 
		case "payable": 
			$("#browser-payable-functions-list").removeClass("hidden")
			break; 
	}
}

// Credits to mr Soyamilk 
  function browserConvertedArgs(argsIn) {
    return argsIn.map((arg) => {
      if(arg.includes('[') && arg.includes(']')) {
        return JSON.parse(arg.replace(/'/g, '"'));
      }
      return arg;
    })
  }

$(document).on("click", ".browser-tab", function() {
	audio.click.play() 
	$(".browser-tab").removeClass("browser-tab-active")
	$(this).addClass("browser-tab-active")
	let tab = $(this).attr("data")
	browserShowTab(tab)
})

$(document).on("click", "#browser-search-field", function() {
	$(this).val("")
})

$(document).on("click", "#browser-go-button", function() {
	audio.click.play()
	let addr = $("#browser-search-field").val()
	if(addr.length == 42) {
		browserFetchABI(addr)
	}
})

$(document).on("click", ".browser-function-call-button", function() {
	audio.click.play() 
	$(".browser-function-list-item").removeClass("browser-active-row")
	$(this).parent().addClass("browser-active-row")
	let name  = $(this).parent().find(".browser-view-function-name").text()
	let index = $(this).parent().attr("data")
	let value = $(this).parent().find(".browser-view-function-inputs").val()
	let type  = $(this).parent().attr("type")
	if(value) {
		let args = value.split(/,(?![^\[\]]*\])/)
		browserCallFunction(index, name, args, type)	
	} else {
		browserCallFunction(index, name, false, type)
	}
})