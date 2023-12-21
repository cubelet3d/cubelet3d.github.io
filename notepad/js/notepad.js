/***
	This notepad version doesn't have the publish to blockchain functionality (you can thank ghost3d for that)
	What's more, I've added a few tweaks here that can't be found in the experimental teamOS version. 
	Autosave is now removed from this version to both save on resources and make the notepad experience, well, more notepad-ish. 
***/

let notepadRC = false // Used in context menu to add delete button for owned notes
let notepadID = null // Used in context menu to indicate which note to delete 

// Notes from the management 
let Notepad = {
	0: "readme",
	1: "browser",
	2: "lemons",
	3: "agnosia"
}

// Loads text files into the folder on UI 
function loadTextFiles() {
	$("#notesWrapper").empty() 
	for(let i = 0; i < Object.keys(Notepad).length; i++) {
		$("#notesWrapper").append('<div class="notepad-note desktop-icon-container flex-box col center-vertical non-mobile" data="'+i+'"> \
		<div class="icon desktop-icon notepad no-pointer-events shortcut"></div> \
		<span class="font-monospace text-align-center">'+Notepad[i].substring(0,8)+'.txt</span> \
		</div>')
	}
	let UserNotes = JSON.parse(localStorage.getItem("UserNotes"))
	if(UserNotes) {
		for(let i = 0; i < Object.keys(UserNotes).length; i++) {
		$("#notesWrapper").prepend('<div class="notepad-note user-note desktop-icon-container flex-box col center-vertical non-mobile" data="'+i+'"> \
		<div class="icon desktop-icon notepad no-pointer-events shortcut"></div> \
		<span class="font-monospace text-align-center">'+Object.keys(UserNotes)[i].substring(0,8)+'.txt</span> \
		</div>')
		}
	}
}

// Loads content to the notepad container 
function loadToNotepad(filename, what, size, owner) {
	if(!$("#notepad:visible").length > 0) {
		showContent("notepad")
	}
	$("#notepadTextArea").val(what)
	$("#notepad .notepad-filename").text(filename+'.txt')
	$("#notepad .notepad-filesize").text(size+' bytes')
	$("#notepad .notepad-owner").text(owner)
}

// Show the save prompt before saving a file 
function notepadSavePrompt() {
	let box = '<div class="save-as-prompt flex-box col"><div class="flex-box prompt-header"><div class="notepad icon"></div><div class="C64">Please provide a name for your file</div></div><div class="flex-box prompt-body"><input id="notepad-save-filename-input" type="text" class="C64"><div id="notepad-save-filename-button" class="template-button">Save</div><div class="template-button notepad-save-cancel">Cancel</div></div></div>'
	$("#Main").append(box)
}

// Delete a localhost note 
function deleteNotepadNote(id) {
	let UserNotes = JSON.parse(localStorage.getItem("UserNotes"))
	if(UserNotes) {
		audio.delete.play()
		let what = Object.keys(UserNotes)[id]
		delete UserNotes[what]
		localStorage.setItem("UserNotes", JSON.stringify(UserNotes))
		loadTextFiles() 
	}
}




/**
	CLICK EVENTS 
**/

// Remove the status bar on a new notepad instance 
$("#notepad_button").on("click", function() {
	notepadFocusView()
	$("#notepad .template-status-bar-option").hide()
})

// Put the delete button in the context menu (check settings/js/context_menu.js)
$(document).on("contextmenu", ".user-note", function(e) {
	notepadRC = true
	notepadID = $(this).attr("data")
})

// Trigger the delete function 
$(document).on("click", ".notepad-delete", function() {
	if(notepadID) {
		deleteNotepadNote(notepadID)
	}
})

// Load the text files into view when clicking the folder icon 
$(document).on("click", "#texts_folder_button", function() {
	loadTextFiles()
})

// Handle clicks on each individual note icon 
$(document).on("click", ".notepad-note", function() {
	notepadFocusView()
	audio.click.play()
	let id = $(this).attr("data")
	// Check if its a user written note 
	if($(this).hasClass("user-note")) {
		let UserNotes = JSON.parse(localStorage.getItem("UserNotes"))
		if(UserNotes) {
			let what = Object.values(UserNotes)[id]
			let filename = Object.keys(UserNotes)[id]
			loadToNotepad(filename, what, (new TextEncoder().encode(what)).length, "localhost")
		}
	} 
	// It's a note from management 
	else {
		$.get('notepad/files/'+Notepad[id]+'.txt', function(r) {
			loadToNotepad(Notepad[id], r, (new TextEncoder().encode(r)).length, "cube3d")
		})
	}
	
	// Show the status bar 
	$("#notepad .template-status-bar-option").show() 
})

// Clear the notepad content when user clicks new note button or closes the notepad 
$(document).on("click", "#notepad .new-note, #notepad .close_button", function() {
	$("#notepadTextArea").val("") 
})

// Trigger the note save prompt  
$(document).on("click", "#notepad .save", function() {
	notepadSavePrompt() 
})

// Download the note to your machine 
$(document).on("click", "#notepad .save-as", function() {
	if($("#notepadTextArea").val().length > 0) {
		download($("#notepadTextArea").val(), $("#notepadTextArea").val().substring(0,10), "text/plain");
	}
})

// Handle notepad filename saving from the save prompt 
$(document).on("click", "#notepad-save-filename-button", function() {
	let filename = $("#notepad-save-filename-input").val().split(" ").join("_")
	let content  = $("#notepadTextArea").val()
	if(filename.length > 0) {
		audio.click.play()
		let UserNotes = JSON.parse(localStorage.getItem("UserNotes"))
		if(!UserNotes) {
			UserNotes = {}
		}
		UserNotes[filename] = content
		localStorage.setItem("UserNotes", JSON.stringify(UserNotes))
		$("#notepad-save-filename-input").val("")
		$(".save-as-prompt").remove()
		loadTextFiles()
	} else {
		audio.error.play() 
	}
})

// Cancel the save process and close the prompt 
$(document).on("click", ".notepad-save-cancel", function() {
	audio.click.play()
	$("#notepad-save-filename-input").val("")
	$(".save-as-prompt").remove()
})

// Make the notepad window appear on top 
function notepadFocusView() {
	$("#texts_folder").removeClass("active-console")
	$("#notepad").addClass("active-console")
}