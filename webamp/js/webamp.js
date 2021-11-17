let isWebamp = false
let isWebampClosed = false

let webamp = new Webamp({
	initialTracks: [
		{
			metaData: {
				artist: "EverLight",
				title: "System Initialize"
			},
			url: "webamp/tracks/1 - System Initialize.mp3"
		},
		{
			metaData: {
				artist: "EverLight",
				title: "Binary Dreams"
			},
			url: "webamp/tracks/2 - Binary Dreams.mp3"
		},
		{
			metaData: {
				artist: "EverLight",
				title: "We Build Towers"
			},
			url: "webamp/tracks/3 - We Build Towers.mp3"
		},
		{
			metaData: {
				artist: "EverLight",
				title: "Labyrinth"
			},
			url: "webamp/tracks/4 - Labyrinth.mp3"
		},
		{
			metaData: {
				artist: "EverLight",
				title: "Skyline"
			},
			url: "webamp/tracks/5 - Skyline.mp3"
		},
		{
			metaData: {
				artist: "EverLight",
				title: "Deathtrap"
			},
			url: "webamp/tracks/6 - Deathtrap.mp3"
		},
		{
			metaData: {
				artist: "EverLight",
				title: "Obsidian"
			},
			url: "webamp/tracks/7 - Obsidian.mp3"
		},
		{
			metaData: {
				artist: "EverLight",
				title: "Shaman"
			},
			url: "webamp/tracks/8 - Shaman.mp3"
		},
		{
			metaData: {
				artist: "EverLight",
				title: "Heliosphere"
			},
			url: "webamp/tracks/9 - Heliosphere.mp3"
		},
		{
			metaData: {
				artist: "EverLight",
				title: "Occult"
			},
			url: "webamp/tracks/10 - Occult.mp3"
		},
		{
			metaData: {
				artist: "EverLight",
				title: "Mega-hurts"
			},
			url: "webamp/tracks/11 - Mega-hurts.mp3"
		},
		{
			metaData: {
				artist: "EverLight",
				title: "Ascension (feat. Iconoclast)"
			},
			url: "webamp/tracks/12 - Ascension (feat. Iconoclast).mp3"
		}
	],
	initialSkin: {
		url: "webamp/team3d.wsz"
	},
	zIndex: 10000
})

$(document).ready(function() {
	$(".webamp-toggle").on("click", function() {
		if(!isWebamp) { 
			webamp.renderWhenReady(document.getElementById('webamp-wrapper'))
			isWebamp = !isWebamp 
		}
		else if(isWebampClosed) {
			$("#webamp").show()
			isWebampClosed = !isWebampClosed
		}
		else {
			$("#webamp").hide()
			webamp.stop()
			isWebampClosed = !isWebampClosed
		}
	})
})

const unsubscribe = webamp.onClose(() => {
    isWebampClosed = true 
});

const icon = document.getElementById('webamp-toggle');
webamp.onClose(() => {
	audio.close.play()
    icon.addEventListener('click', () => {
        webamp.reopen();
    });
})