let isFullScreen = false

if (document.addEventListener) {
    document.addEventListener('contextmenu', function(e) {
	e.preventDefault()
    drawContextMenu(e)
    }, false)
} else {
    document.attachEvent('oncontextmenu', function() {
        window.event.returnValue = false
    })
}

function drawContextMenu(e) {
	if($(e.srcElement[0]).attr("id") == "browser-search-field" || $(e.srcElement[0]).attr("id") == "lemongame-input-address") {
		$(".context-menu").append('<div class="item paste" data="paste" target="'+$(e.srcElement[0]).attr("id")+'">Paste</div>')
	}
	
	if(notepadRC) {
		$(".context-menu").append('<div class="item notepad-delete" data="'+0+'">Delete</div>')
	}	
	
    $(".context-menu").removeClass("hidden")

    let xPos = e.pageX
    let yPos = e.pageY
    let offset = 3

    $(".context-menu").css({
        "top" : ""+yPos-offset+"px",
        "left" : ""+xPos-offset+"px"
    })

}

$(document).ready(function() {
    $(".context-menu").on("mouseleave", function() {
        $(".context-menu").addClass("hidden")
		notepadRC = false
		$(".notepad-delete").remove() 
		notepadID = null 
		$(".paste").remove()
    })
    $("body").click(".context-menu.item", function(e) {
        let action = $(e.target).attr("data")
        switch(action) {
            case "fullscreen":
                if(!isFullScreen) {
                    let el = document.documentElement
                    if (el.requestFullscreen) {
                    el.requestFullscreen();
                    } else if (el.webkitRequestFullscreen) { /* Safari */
                    el.webkitRequestFullscreen();
                    } else if (el.msRequestFullscreen) { /* IE11 */
                    el.msRequestFullscreen();
                    }
                    isFullScreen = !isFullScreen
                } else {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                    isFullScreen = !isFullScreen
                }
                break;
                
            case "reload":
                location.reload()
                break;
                
            case "settings":
                showContent(action)
                break;
				
			case "paste":
				let target = $(e.target).attr("target")
				pasteInInput($("#"+target+""))
				break;
                
        }
        
        $(".context-menu").addClass("hidden")
    })
})

async function pasteInInput(el) {
	try {
		let content = await navigator.clipboard.readText()
		$(el).val(content)
	}
	catch(e) {
		console.error(e)
	}
}