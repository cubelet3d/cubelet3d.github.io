let notifications = 0

let notificationBox = '\
<div class="notify">\
    <div class="notify-icon-wrapper">\
        <div class="notify-icon"></div>\
    </div>\
    <div class="notify-msg-wrapper">\
        <div class="notify-msg"></div>\
    </div>\
    <div class="notify-btn-wrapper">\
        <div class="notify-btn">OK</div>\
    </div>\
</div>'

function notify(msg, action) {
    // increment notifications counter 
    notifications++
    
    // make a new box based on template and add notifications int as data attribute
    let a = $(notificationBox).attr("data", notifications)
    
    // find the OK button
    let b = $(a).find("div.notify-btn")
    
    // add notifications int as data attribute on the button too (so we'll know which box it will close, duh)
    $(b).attr("data", notifications)
    
    // find notify-msg 
    let c = $(a).find("div.notify-msg")
    
    // append the msg
    $(c).append(msg)
    
    // Custom actions 
    switch(action) {
        
        case "signMessage":
            let d = $(a).find("div.notify-btn-wrapper")
            $(d).html('<div class="sign-btn" data="'+notifications+'">OK</div>')
            break;
            
        case "reload":
            let u = $(a).find("div.notify-btn-wrapper")
            $(u).html('<div class="reload-btn" data="'+notifications+'">OK</div>')
            break;
            
    }
    
    // append box to body
    $("body").append(a)
    $(a).animate({
        "opacity":"1",
        "bottom":"0"
    })

}

$(document).ready(function() {
    $("body").on("click", ".notify-btn", function() {
        let id = $(this).attr("data")
        $(".notify[data="+id+"]").hide()
    })
    
    // sign.js special 
    $("body").on("click", ".sign-btn", function() {
        let messageToSign = $("#messageToSign").val()
        if(messageToSign !== "") {
            signMessage(messageToSign)
        }

        let id = $(this).attr("data")
        $(".notify[data="+id+"]").hide()
    })
    
    // reload action
    $("body").on("click", ".reload-btn", function() {
        location.reload()
    })
})