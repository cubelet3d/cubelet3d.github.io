let notifications = 0; 
let errors        = 0; 

let notificationBox = 
`<div class="notify">
    <div class="notify-icon-wrapper">
        <div class="notify-icon"></div>
    </div>
    <div class="notify-msg-wrapper">
        <div class="notify-msg"></div>
    </div>
    <div class="notify-btn-wrapper">
        <div class="notify-btn">OK</div>
    </div>
</div>`; 

let errorBox = 
`<div class="error-box">
	<div class="error-icon-wrapper">
		<div class="error-icon"></div>
	</div>
	<div class="error-msg-wrapper scrollbar">
		<div class="error-msg"></div>
	</div>
	<div class="error-btn-wrapper">
		<div class="error-btn inventory-button">OK</div>
	</div>
</div>`; 

function notify(msg, action) {
	audio.msage.play(); 
	
	let thisNotificationId = notifications;
    notifications++; 
    
    let a = $(notificationBox).attr("data", thisNotificationId);
	
	// find OK button 
    let b = $(a).find("div.notify-btn"); 
    $(b).attr("data", thisNotificationId); 
    
	// find message div 
    let c = $(a).find("div.notify-msg"); 
    $(c).append(msg); 
    
    // Custom actions 
    switch(action) {
        case "signMessage":
            let d = $(a).find("div.notify-btn-wrapper"); 
            $(d).html('<div class="sign-btn" data="'+thisNotificationId+'">OK</div>'); 
            break;
        case "reload":
            let u = $(a).find("div.notify-btn-wrapper"); 
            $(u).html('<div class="reload-btn" data="'+thisNotificationId+'">OK</div>'); 
            break;
		}
    
    // append box to body
    $("body").append(a); 
    $(a).animate({
        "opacity":"1",
        "bottom":"64px"
    }); 
	
	setTimeout(function() {
		var notification = $('.notify[data='+thisNotificationId+']');
		
		// Start the transition
		notification.css({"opacity":"0", "bottom":"-250px"});

		// Listen for the end of the transition
		notification.one('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function() {
			// This function is called after the transition completes
			notification.remove();
		});
	}, 5000); // Wait 5000 milliseconds (5 seconds)
}

function error(msg, warn) {
	let thisErrorId = errors; 
	errors++
	let a = $(errorBox).attr("data", thisErrorId); 
	let b = $(a).find("div.error-btn"); 
	$(b).attr("data", thisErrorId); 
	let c = $(a).find("div.error-msg"); 
	if(warn) {
		// audio.warn.play(); 
		$(c).append('Warning:<br>'+msg); 
	} else {
		audio.error.play();
		$(c).append('Error:<br>'+msg); 
	}
    $("body").append(a);
}

$(document).ready(function() {
    $("body").on("click", ".notify-btn", function() {
        let id = $(this).attr("data"); 
        $(".notify[data="+id+"]").remove(); 
    }); 
	
    $("body").on("click", ".error-btn", function() {
        let id = $(this).attr("data"); 
		
		// cake3d special 
		let hiddenData = $(".error-box[data=" + id + "]").find(".resetCake3D");
		if (hiddenData.length) {
			resetGame();
		}		
		
        $(".error-box[data="+id+"]").remove(); 
    }); 
    
    // sign.js special 
    $("body").on("click", ".sign-btn", function() {
        let messageToSign = $("#messageToSign").val(); 
        if(messageToSign !== "") {
            signMessage(messageToSign); 
        }
        let id = $(this).attr("data"); 
        $(".notify[data="+id+"]").remove(); 
    })
    
    // reload action
    $("body").on("click", ".reload-btn", function() {
        location.reload(); 
    })
})