let notifications = 0
let errors = 0

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

let errorBox = '\
<div class="error-box">\
  <div class="error-icon-wrapper">\
    <div class="error-icon"></div>\
  </div>\
  <div class="error-msg-wrapper scrollbar">\
    <div class="error-msg"></div>\
  </div>\
  <div class="error-btn-wrapper">\
    <div class="error-btn inventory-button">OK</div>\
  </div>\
</div>'

function notify(msg, action) {
	audio.msage.play() 
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
        "bottom":"64px"
    })
	
	setTimeout(function() {
		$('.notify[data='+notifications+']').animate({"opacity":"0","bottom":"-250px"})
	}, 20000)

}

function error(msg) {
	audio.error.play()
	errors++
	let a = $(errorBox).attr("data", errors)
	let b = $(a).find("div.error-btn")
	$(b).attr("data", errors)
	let c = $(a).find("div.error-msg")
	$(c).append('Error:<br>'+msg)
    $("body").append(a)
}

$(document).ready(function() {
    $("body").on("click", ".notify-btn", function() {
        let id = $(this).attr("data")
        $(".notify[data="+id+"]").hide()
    })
    $("body").on("click", ".error-btn", function() {
        let id = $(this).attr("data")
        $(".error-box[data="+id+"]").hide()
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