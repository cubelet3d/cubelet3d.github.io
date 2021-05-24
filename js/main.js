var cmd;
var telegramURL = "https://t.me/Team3D_Official";
var discordURL = "https://discord.gg/g4X2R38";
var uniswapURL = "https://app.uniswap.org/#/swap?outputCurrency=0x3D3D35bb9bEC23b06Ca00fe472b50E7A4c692C30"
var twitterURL = "https://twitter.com/Team3D_Official"
var openseaURL = "https://opensea.io/assets/inventory-v2"
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
    
    let panelHeight = $(".panel").outerHeight()
    let panelWidth = $(".panel").outerWidth()

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
    
    $(".menu-item, .desktop-icon-container, #Cube").on("click", function(e) {
        let clickedMenuItem = $(e.target).attr("data");
        let activeMenuItem = $(".active");
        
        for (let i = 0; i < activeMenuItem.length; i++) {
            $(activeMenuItem[i]).removeClass("active");
        }
        
        if(!$(this).hasClass("active") && !$(this).find("div").hasClass("desktop-icon")) {
            if($(this).attr("data") !== "cubelog") {
                $(this).addClass("active")
            }
        }
        
        // Show glass overlay on active button 
        if($(this).find("div").hasClass("hidden")) {
            let glassElement = $(this).find("div");
            showGlass(glassElement)
        }
        
        $($(this).find("div")).removeClass("hidden")
        
        showContent(clickedMenuItem)
        
        if($(this).find("div").hasClass("game")) {
            loadGame(clickedMenuItem) // Loads wolf3d
        }
        
        if($(this).find("div").hasClass("shortcut")) {
            loadShortcut(clickedMenuItem)
        }
        
        if($(this).find("div").hasClass("distributor")) {
            distribute(clickedMenuItem)
        }
		
		console.log(clickedMenuItem)
    });

    // Close button handler 
    $(".close_button").on("click", function() {
        hideAll() // can't be assed 
        $(".active").removeClass("active")
        showGlass("nonExistingElement") // this will work 

        // cmd gets assigned when a game (DOSBox) is open 
        if(typeof(cmd) !== "undefined") {
            // Terminate game instance 
            cmd.exit()
        }
    })
    
    
    
    let roadmapWidth = $("#roadmap").width();
    var carWidth = roadmapWidth * 30 / 100; // 30% in layout.css 
    var carHeight = carWidth * 28.212290502793298 / 100; // 28.. is aspect ratio thing
    let testarossa = $("#testarossa");
    $(testarossa).css({
        "height" : ""+carHeight+"px",
        "position" : "absolute",
        "left" : "-"+carWidth+"px",
        "bottom" : "0"
    });
    
    // Roadmap scroll event 
    $("#roadmap .console-content").scroll(function() {
        let position = $(this).scrollTop();
        let adjusted = (-carWidth) + position;
        
        // Animate it 
        // Note: this has a 420 millisecond transform transition delay in CSS 
        $("#testarossa").css({
            "transform" : "translateX("+adjusted+"px)"
        });
    })
    
});

$(function() {
    $(".draggable").draggable({
        containment: "parent",
        handle: ".handle",
        snap: true,
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
})

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
            if($($("#"+elementID+"")) && elementID !== "presale") {
                $($("#"+elementID+"")).css({
                    "bottom" : "0"
                })
            }
        }
    }
})

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

// Load a game 
function loadGame(game) {
    $("#"+game+" .console-content").html("<canvas id=\"jsdos\"></canvas>");
    $("#"+game+"").css("opacity", "1");

    Dos(document.getElementById("jsdos"), { 
        wdosboxUrl: "https://js-dos.com/6.22/current/wdosbox.js" 
    }).ready((fs, main) => {
      fs.extract("https://team3d.io/games/"+game+".zip", "/game").then(() => {
        main(["-c", "CD game/"+game+"", "-c", ""+game+".exe"]).then((ci) => {
            cmd = ci;
        });
      });
    });
}

function setFocus(game) {
    var iframe = $("#"+game+"-window")[0];
    iframe.contentWindow.focus();
}

function showGlass(elem) {
    // Remove the rest
    for(let i = 0; i < $(".menu-item > div.glass").length; i++) {
        if(elem !== $(".menu-item > div.glass")) {
            $(".menu-item > div.glass").hide();
            $(".menu-item > div.glass").addClass("hidden");
        }
    }
    setTimeout(function() {
       $(elem).show("clip"); 
    }, 300)
    
}

function showContent(tab) {
    // cmd gets assigned when a game is open 
    if(typeof(cmd) !== "undefined") {
        // Terminate game instance 
        cmd.exit();
    }
    
    hideAll();
    
    setTimeout(function() {
    let tabs = $(".console");
    let tabToShow;
    for (let i = 0; i < tabs.length; i++) {
        if($(tabs[i]).attr("data") == tab) {
            tabToShow = tabs[i];
            $(tabToShow).show("fold");
            $(tabToShow).addClass("active-console");
            break;
        }
    }
    }, 300);
    
    // Token sale specific 
    if(tab == "token_sale") {
        // Preload the image 
        let src = $('.sadgrill').css('background-image');
        let url = src.match(/\((.*?)\)/)[1].replace(/('|")/g,'');
        let img = new Image();
        img.onload = function() {
            // Pulsate into view 
            $(".sadgrill").show("pulsate");
        }
        img.src = url;
        if (img.complete) img.onload();
    }

    // Roadmap specific 
    if(tab == "roadmap") {
        let src = $('.computer').css('background-image');
        let url = src.match(/\((.*?)\)/)[1].replace(/('|")/g,'');
        let img = new Image();
        img.onload = function() {
            $(".computer").show("shake");
        }
        img.src = url;
        if (img.complete) img.onload();
    }
    
    // FAQ (now media) 
    if(tab == "faq") {
        let src = $('.facepalm').css('background-image');
        let url = src.match(/\((.*?)\)/)[1].replace(/('|")/g,'');
        let img = new Image();
        img.onload = function() {
            $(".facepalm").show("pulsate");
        }
        img.src = url;
        if (img.complete) img.onload();
    }
    
    // Cubelog 
    if(tab == "cubelog") {
        let src = $('.cubelog').css('background-image');
        let url = src.match(/\((.*?)\)/)[1].replace(/('|")/g,'');
        let img = new Image();
        img.onload = function() {
            $(".cubelog").show("pulsate");
        }
        img.src = url;
        if (img.complete) img.onload();
    }

}

function hideAll() {
    let tabs = $(".active-console");
    for (let i = 0; i < tabs.length; i++) {
        $(tabs[i]).hide("explode");
    }
    
    // pause video
    $("video")[0].pause()
	$("video")[1].pause()
}

$(window).on('load', function() {
    $("#Loading").fadeOut(1000);
    
    setTimeout(function() {
        $("#Cube").css({
            "top" : "-20%",
            "left" : "45%",
            "z-index" : "1" // Fixes a bug where #Menu and .menu-items have a line on the right
        });
        $("#Cube").show("bounce");
    }, 1000);
});

// Randomize wallpapers
const numberOfWallpapers = 10;
const wallpapersDirectory = "https://team3d.io/img/wallpapers/";

function randomWallpapers() {
    
    let wp = localStorage.getItem("wallpaper")
    
    if(wp == null || wp == "null") {
        
        let wallpapers = [];
        for(i = 0; i < numberOfWallpapers; i++) {
            // Assumes it's a JPG
            wallpapers.push(i+".jpg");
        }
        let rn = Math.floor((Math.random() * numberOfWallpapers));
        $("body").css("background-image", "url("+wallpapersDirectory+wallpapers[rn]+")");
        
    } else {
        loadWallpaper()
    }
    
}

function rand(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;		
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
