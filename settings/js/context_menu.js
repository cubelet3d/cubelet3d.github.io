let isFullScreen = false

if (document.addEventListener) {
    document.addEventListener('contextmenu', function(e) {
    drawContextMenu(e)
    e.preventDefault()
    }, false)
} else {
    document.attachEvent('oncontextmenu', function() {
        window.event.returnValue = false
    })
}

function drawContextMenu(e) {
	
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
                
        }
        
        $(".context-menu").addClass("hidden")
    })
})