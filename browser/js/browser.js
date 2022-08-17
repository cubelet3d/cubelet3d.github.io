let BrowserABI
let BrowserContract
let BrowserViewFunctions

async function browserFetchABI(contract) {
	try {
		$("#browser-view-functions-list").empty()
		$("#browser-status").text("Loading...")
		let apiKey   = "" // not for you ser 
		let url_base = "https://api.etherscan.io/api?module=contract&action=getabi&address="
		let fullURL  = url_base.concat(contract, '&apikey='+apiKey)
		await $.getJSON(fullURL).then((data) => {
			BrowserABI      = JSON.parse(data.result)
			BrowserContract = new web3.eth.Contract(BrowserABI, contract)
		})

		BrowserViewFunctions = browserViewFunctions()
		for(let i = 0; i < BrowserViewFunctions.length; i++) {
			let args = []
			for(let e = 0; e < BrowserViewFunctions[i].inputs.length; e++) {
				args.push(BrowserViewFunctions[i].inputs[e].type)
			}
			if(args.length > 0) {
				$("#browser-view-functions-list").append('<div class="browser-function-list-item flex-box space-between" data="'+i+'" args="'+args+'"><div class="flex-box col space-between full-width"><div class="browser-view-function-name padding-left-5px">'+BrowserViewFunctions[i].name+'</div><div class="browser-view-function-inputs-wrapper padding-left-5px"><input class="browser-view-function-inputs" placeholder="'+args+'"></input></div></div><div class="browser-function-call-button template-button flex-box align-center"><span>Call</span></div></div>')
			} else {
				$("#browser-view-functions-list").append('<div class="browser-function-list-item flex-box space-between" data="'+i+'" args="'+args+'"><div class="flex-box col space-between full-width"><div class="browser-view-function-name padding-left-5px">'+BrowserViewFunctions[i].name+'</div><div class="browser-view-function-inputs-wrapper padding-left-5px"><input class="browser-view-function-inputs" placeholder="none" disabled></input></div></div><div class="browser-function-call-button template-button flex-box align-center"><span>Call</span></div></div>')
			}
			
		}
		
		$("#browser-result").empty()
		$("#browser-result").text("You can now call all view functions")
		$("#browser-status").text("Ready!")
		
		audio.msage.play()
	}
	catch(e) {
		console.error(e)
		$("#browser-status").text("Error...")
		audio.error.play()
	}
}

async function browserCallFunction(index, name, args) {
	try {
		$("#browser-status").text("Loading...")
		if(args) {
			await BrowserContract["methods"][BrowserViewFunctions[index].name](...browserConvertedArgs(args)).call().then(function(r) {
				$(".browser-result-wrapper").effect("highlight", {color: 'white'}, 300)
				$("#browser-result").text(name+": "+JSON.stringify(r, null, 4))
			})	
		} else {
			await BrowserContract["methods"][BrowserViewFunctions[index].name]().call().then(function(r) {
				$(".browser-result-wrapper").effect("highlight", {color: 'white'}, 300)
				$("#browser-result").text(name+": "+JSON.stringify(r, null, 4))
			})	
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

function browserViewFunctions() {
	if(BrowserABI) {
		let list = [] 
		for(let i = 0; i < BrowserABI.length; i++) {
			if(BrowserABI[i].stateMutability == "view") {
				list.push(BrowserABI[i])
			}
		}
		return list
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
	$(".browser-function-list-item").removeClass("browser-active-row")
	$(this).parent().addClass("browser-active-row")
	let name  = $(this).parent().find(".browser-view-function-name").text()
	let index = $(this).parent().attr("data")
	let value = $(this).parent().find(".browser-view-function-inputs").val()
	if(value) {
		let args = value.split(/,(?![^\[\]]*\])/)
		browserCallFunction(index, name, args)	
	} else {
		browserCallFunction(index, name)
	}
})