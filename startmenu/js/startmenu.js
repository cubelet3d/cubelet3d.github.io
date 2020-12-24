$(document).ready(function() {
    
    $("#startmenu").mouseleave(function() {
        $("#startmenu").addClass("hidden")
        if( $("#start-button").hasClass("start-active") ) {
            $("#start-button").removeClass("start-active")
        }
    })
    
    $("#start-button").click(function(e) {
        if( $("#startmenu").hasClass("hidden") ) {
            $("#startmenu").removeClass("hidden")
            $("#start-button").addClass("start-active")
        } else {
            // 2nd click hides it again 
            $("#startmenu").addClass("hidden")
            $("#start-button").removeClass("start-active")
        }
    })
    
    $(".startmenu-content > .item").click(function(e) {
        let clicked = $(e.target).attr("data")
        if( $("#"+clicked+"").hasClass("hidden") ) {
            $("#"+clicked+"").removeClass("hidden")
        } else {
            $("#"+clicked+"").addClass("hidden")
        }
    })
    
    $("#startmenu .button").click(function(e) {
        let clicked = $(e.target).attr("data")
        loadShortcut(clicked) // ../../main.js function 
    })
    
    $("#startmenu .data-button").click(function(e) {
        let clicked = $(e.target).attr("data")
        showContent(clicked) // ../../main.js function 
    })
    
})