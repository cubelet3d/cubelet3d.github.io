/***

                                                                                                                                
                                                                                                                                
               AAA                                                                                      iiii                    
              A:::A                                                                                    i::::i                   
             A:::::A                                                                                    iiii                    
            A:::::::A                                                                                                           
           A:::::::::A           ggggggggg   gggggnnnn  nnnnnnnn       ooooooooooo       ssssssssss   iiiiiii   aaaaaaaaaaaaa   
          A:::::A:::::A         g:::::::::ggg::::gn:::nn::::::::nn   oo:::::::::::oo   ss::::::::::s  i:::::i   a::::::::::::a  
         A:::::A A:::::A       g:::::::::::::::::gn::::::::::::::nn o:::::::::::::::oss:::::::::::::s  i::::i   aaaaaaaaa:::::a 
        A:::::A   A:::::A     g::::::ggggg::::::ggnn:::::::::::::::no:::::ooooo:::::os::::::ssss:::::s i::::i            a::::a 
       A:::::A     A:::::A    g:::::g     g:::::g   n:::::nnnn:::::no::::o     o::::o s:::::s  ssssss  i::::i     aaaaaaa:::::a 
      A:::::AAAAAAAAA:::::A   g:::::g     g:::::g   n::::n    n::::no::::o     o::::o   s::::::s       i::::i   aa::::::::::::a 
     A:::::::::::::::::::::A  g:::::g     g:::::g   n::::n    n::::no::::o     o::::o      s::::::s    i::::i  a::::aaaa::::::a 
    A:::::AAAAAAAAAAAAA:::::A g::::::g    g:::::g   n::::n    n::::no::::o     o::::ossssss   s:::::s  i::::i a::::a    a:::::a 
   A:::::A             A:::::Ag:::::::ggggg:::::g   n::::n    n::::no:::::ooooo:::::os:::::ssss::::::si::::::ia::::a    a:::::a 
  A:::::A               A:::::Ag::::::::::::::::g   n::::n    n::::no:::::::::::::::os::::::::::::::s i::::::ia:::::aaaa::::::a 
 A:::::A                 A:::::Agg::::::::::::::g   n::::n    n::::n oo:::::::::::oo  s:::::::::::ss  i::::::i a::::::::::aa:::a
AAAAAAA                   AAAAAAA gggggggg::::::g   nnnnnn    nnnnnn   ooooooooooo     sssssssssss    iiiiiiii  aaaaaaaaaa  aaaa
                                          g:::::g                                                                               
                              gggggg      g:::::g                                                                               
                              g:::::gg   gg:::::g                                                                               
                               g::::::ggg:::::::g                                                                               
                                gg:::::::::::::g                                                                                
                                  ggg::::::ggg                                                                                  
                                     gggggg                                                                                     

***/

let player1Color = 'linear-gradient(315deg, rgba(193, 233, 114, 0.1) 0%, rgba(45, 89, 85, 0.1) 100%)'; // "linear-gradient(315deg, #91b2d3 0%, #527fa4 100%)"; 
let player2Color = 'linear-gradient(315deg, rgba(125, 78, 239, 0.1) 0%, rgba(32, 30, 79, 0.1) 100%)'; // "linear-gradient(315deg, #e68888 0%, #c53f3f 100%)"; 

const tcg_base_audio = {
	'your_turn': new Audio('games/tcg_base/sounds/sfx/your_turn.wav'),
	'you_win': new Audio('games/tcg_base/sounds/sfx/you_win.wav'),
	'you_lose': new Audio('games/tcg_base/sounds/sfx/you_lose.wav'),
	'same': new Audio('games/tcg_base/sounds/sfx/same.wav'),
	'plus': new Audio('games/tcg_base/sounds/sfx/plus.wav'),
	'new_match_found': new Audio('games/tcg_base/sounds/sfx/new_match_found.wav'),
	'ladle_sip': new Audio('games/tcg_base/sounds/sfx/ladle_sip.wav'),
	'ladle_dunk': new Audio('games/tcg_base/sounds/sfx/ladle_dunk.wav'),
	'draw': new Audio('games/tcg_base/sounds/sfx/draw.wav'),
	'cauldron_slow': new Audio('games/tcg_base/sounds/sfx/cauldron_slow.wav'),
	'cauldron_fast': new Audio('games/tcg_base/sounds/sfx/cauldron_fast.wav'),
	'card_place_01': new Audio('games/tcg_base/sounds/sfx/card_place_01.wav'),
	'card_place_02': new Audio('games/tcg_base/sounds/sfx/card_place_02.wav'),
	'card_place_03': new Audio('games/tcg_base/sounds/sfx/card_place_03.wav'),
	'card_place_04': new Audio('games/tcg_base/sounds/sfx/card_place_04.wav'),
	'card_flip_01': new Audio('games/tcg_base/sounds/sfx/card_flip_01.wav'),
	'card_flip_02': new Audio('games/tcg_base/sounds/sfx/card_flip_02.wav'),
	'card_flip_03': new Audio('games/tcg_base/sounds/sfx/card_flip_03.wav'),
	'button_press': new Audio('games/tcg_base/sounds/sfx/button_press.wav'),
	'button_hover': new Audio('games/tcg_base/sounds/sfx/button_hover.wav'),
	'card_flip_03_rev': new Audio('games/tcg_base/sounds/sfx/card_flip_03_rev.wav'),
	'stone_button_hover': new Audio('games/tcg_base/sounds/sfx/stone_button_hover.wav'),
	'stone_button_press': new Audio('games/tcg_base/sounds/sfx/stone_button_press.wav')
}

// Ensure looping 
tcg_base_audio['cauldron_slow'].loop = true;
tcg_base_audio['cauldron_fast'].loop = true;

tcg_base_audio['ladle_dunk'].volume = 0.25; // was too noisy 

tcg_base_system = {
	vidy_address: "0xFFE93E63E94da7A44739b6aBFA25B81CEd979a6b",
	pack_address: "0x4061ACF3ee36fe2C6a1594928ff278fcfc56fd51", // old > "0x27Cb29B6ddBae13146E50F546D806E04dBc4e739",
	game_address: "0xD2E3ACB122B6eEcbb60353A737b34A2c17B080A2", // old > "0x5E49E898C18Bd504170c926dD5b244165905F175",
	card_address: "0xFdf664aE84c6D959cE4D72f07F08CB8a58B55579", // old > "0x7B4aB1B6f20aF6555B24C2BccAfBB82b1c5a60aE", 
	caul_address: "0x9aa8D9dee5F55dBaA1D20B9534bB4c8f834453a0", // old > "0x1360398fFD6E9148Bd3FEc2910afa0660DFcE4cB",
	pack: null,
	game: null,
	card: null
}

// Starter pack
tcg_base_pack = {
	pendingBuy: false,
	pendingOpen: false,
	openTab: {
		play: false,
		deck: false,
		options: false
	}
}

// Player 
let tcg_base_player = {
	cards: null,
	currentPage: 0,
	selectedAvailableCards: [],
	selectedForMultiUpload: [],
	selectedForMultiDownload: [],
	savedHand: [],
	selectedCardType: null,
	cauldron: {
		totalWeight: 0,
		userWeight: 0,
		rewardsClaimed: 0,
		tokensClaimable: 0
	},
	cauldronGlobal: {
		totalBurned: 0,
		totalClaimed: 0
	}
}

// Games 
let tcg_base_games = {
	gamesNeedPlayer: [],
	playerGames: [], 
	gameDetails: {},
	gamesLoop: null,
	revealedGames: [],
	revealedHands: {},
	revealedHandsData: {},
	openGames: new Set(),
	gameTokenUris: {},
	gameSelectedCards: {},
	endedGames: new Set(),
	winnerSelectedCards: [],
	contentAppended: {},
	gameIdsLoadedToList: {
		availableGames: new Set(),
		yourGames: new Set() 
	},
	pfpCache: {}
}

/*	Playlist functionality */
let tcg_base_baseVolume = localStorage.getItem('tcg_base_volume') || 0.4;
let $volumeSlider = $('#tcg_base_volumeSlider');
$volumeSlider.val(tcg_base_baseVolume);

// Set initial CSS variable for the background gradient
let percentage = ((tcg_base_baseVolume - $volumeSlider.attr("min")) / ($volumeSlider.attr("max") - $volumeSlider.attr("min"))) * 100;
$volumeSlider.css('--slider-percentage', percentage + '%');

// Initialize the audio playlist
const tcg_base_gameAudio = {
  playlist: [
    new Audio('games/tcg_base/sounds/Over_the_Horizon.mp3'),
	new Audio('games/tcg_base/sounds/Fabled.mp3'),
	new Audio('games/tcg_base/sounds/Journey_Across_The_Valley.mp3'),
	new Audio('games/tcg_base/sounds/Transitory_Mists.mp3'),
    // Add more tracks here as you go along
  ],
  currentTrackIndex: 0,
};

// Function to play the previous track in the playlist
function tcg_base_playPreviousTrack() {
  // Stop and reset the current track
  let currentTrack = tcg_base_gameAudio.playlist[tcg_base_gameAudio.currentTrackIndex];
  currentTrack.pause();
  currentTrack.currentTime = 0;
  
  // Move to the previous track
  tcg_base_gameAudio.currentTrackIndex = (tcg_base_gameAudio.currentTrackIndex - 1 + tcg_base_gameAudio.playlist.length) % tcg_base_gameAudio.playlist.length;
  currentTrack = tcg_base_gameAudio.playlist[tcg_base_gameAudio.currentTrackIndex];
  
  let trackTitle = currentTrack.src.split('/').pop().split('.mp3')[0].replace(/_/g, ' ');
  $('.tcg_base_currentTrack').text(`Currently playing: ${trackTitle}`);
  
  // Play the new track
  currentTrack.volume = tcg_base_baseVolume;
  currentTrack.play();
}

// Function to play the next track in the playlist
function tcg_base_playNextTrack() {
  // Stop and reset the current track
  let currentTrack = tcg_base_gameAudio.playlist[tcg_base_gameAudio.currentTrackIndex];
  currentTrack.pause();
  currentTrack.currentTime = 0;

  // Move to the next track
  tcg_base_gameAudio.currentTrackIndex = (tcg_base_gameAudio.currentTrackIndex + 1) % tcg_base_gameAudio.playlist.length;
  currentTrack = tcg_base_gameAudio.playlist[tcg_base_gameAudio.currentTrackIndex];
  
  let trackTitle = currentTrack.src.split('/').pop().split('.mp3')[0].replace(/_/g, ' ');
  $('.tcg_base_currentTrack').text(`Currently playing: ${trackTitle}`);
  
  // Play the new track
  currentTrack.volume = tcg_base_baseVolume;
  currentTrack.play();
}

// Attach an 'ended' event listener to each track
tcg_base_gameAudio.playlist.forEach((track, index) => {
  track.addEventListener('ended', function() {
    tcg_base_playNextTrack();
  });
});

// Function to start the playlist with fade-in
function tcg_base_startPlaylist() {
  let volume = 0;
  let currentTrack = tcg_base_gameAudio.playlist[tcg_base_gameAudio.currentTrackIndex];
  currentTrack.volume = volume;
  currentTrack.play();
  
  let trackTitle = currentTrack.src.split('/').pop().split('.mp3')[0].replace(/_/g, ' ');
  $('.tcg_base_currentTrack').text(`Currently playing: ${trackTitle}`);

  let fade = setInterval(function() {
    if (volume < tcg_base_baseVolume) {
      volume = Math.min(volume + 0.1, tcg_base_baseVolume); // Cap at baseVolume
      currentTrack.volume = volume;
    } else {
      clearInterval(fade);
    }
  }, 100);
}

// Function to stop the playlist with fade-out
function tcg_base_stopPlaylist() {
  let currentTrack = tcg_base_gameAudio.playlist[tcg_base_gameAudio.currentTrackIndex];
  let volume = currentTrack.volume;

  let fade = setInterval(function() {
    if (volume > 0) {
      volume = Math.max(volume - 0.1, 0); // Cap at 0
      currentTrack.volume = volume;
    } else {
      // Pause the track
      currentTrack.pause();
      // Reset its time to start
      currentTrack.currentTime = 0;
      // Remove the 'ended' event listener
      // currentTrack.removeEventListener('ended', tcg_base_playNextTrack);
      clearInterval(fade);
    }
  }, 100);
}


$(document).ready(function() {
	  // Load saved hand from localStorage
	  tcg_base_player.savedHand = JSON.parse(localStorage.getItem('savedHand')) || [];

	  // Initialize button states
	  const $saveHand = $('#saveHand');
	  const $loadHand = $('#loadHand');
	  
	  if (tcg_base_player.savedHand.length === 5) {
		$loadHand.removeClass('disabled');
	  } else {
		$loadHand.addClass('disabled');
	  }
	
	/*	Game specific hover effects for player's hands (because CSS can't handle "this") <- epic inside joke between me and my best friend GPT4 */
	$(document).on('mouseenter', '.tcg_base_player_cards_list .tcg_base_player_card', function() {
	  let $thisCard = $(this);
	  let $gameWindow = $thisCard.closest('[id^=tcg_base_game_window_]');
	  let gameId = $gameWindow.attr('id').split('_').pop();
	  
      // Check if gameDetails exists for this gameId, if not, assume practice mode
	  let inPracticeMode = !tcg_base_games.gameDetails[gameId];
	  let playerTurn = inPracticeMode ? true : !tcg_base_games.gameDetails[gameId][7];	  

	  if(playerTurn) {
		  $(this).css('transform', 'translateX(20px)');
	  }
	}).on('mouseleave', '.tcg_base_player_cards_list .tcg_base_player_card', function() {
	  $(this).css('transform', 'translateX(0)');
	});

	$(document).on('mouseenter', '.tcg_base_opponent_cards_list .tcg_base_player_card', function() {
	  let $thisCard = $(this);
	  let $gameWindow = $thisCard.closest('[id^=tcg_base_game_window_]');
	  let gameId = $gameWindow.attr('id').split('_').pop();
	  
	  let inPracticeMode = !tcg_base_games.gameDetails[gameId];
	  let opponentTurn = inPracticeMode ? true : tcg_base_games.gameDetails[gameId][7];

	  if(opponentTurn) {
		  $(this).css('transform', 'translateX(-20px)');
	  }
	}).on('mouseleave', '.tcg_base_opponent_cards_list .tcg_base_player_card', function() {
	  $(this).css('transform', 'translateX(0)');
	});
	
	// Click handler for the Agnosia.exe on Desktop 
	$(document).on("click", "#tcg_base_button", async function() {
		$("#tcg_base_button_wrapper").addClass('disabled'); 
		await tcg_base_init();
		await tcg_base_startPlaylist(); 
		// $("#tcg_base_button_wrapper").removeClass('disabled'); 
		
		// Load user address into profile link 
		$('.tcg_base_menu_profile_link').text(formatAddress(accounts[0]));
		$('.tcg_base_menu_profile_link').attr('data-address', accounts[0]);
	});
	
	// Hover handler for it  
	$(document).on('mouseover', '#tcg_base_button', function() {
		$('#tcg_base_button .agnosia-exe').addClass('agnosia-exe-hover').removeClass('agnosia-exe'); 
	}); 
	$(document).on('mouseleave', '#tcg_base_button', function() {
		$('#tcg_base_button .agnosia-exe-hover').addClass('agnosia-exe').removeClass('agnosia-exe-hover'); 
	}); 	
	
	// Click handler for closing the Agnosia game 
	$(document).on("click", "#tcg_base .close_button", function() {
		tcg_base_resetAllContainers();
		tcg_base_resetAllInstances();
		$("#tcg_base_button_wrapper").removeClass('disabled'); 
	});
	
	// Try and get the referral address from URL 
	const queryString = window.location.search;
	const urlParams   = new URLSearchParams(queryString);
	const referral    = urlParams.get('referral');
	
	// Store referral in session if found, otherwise set a default referral 
	localStorage.setItem('tcg_base_starterpack_referral', referral || "0x6e2D7086277F27B64c551EB014EE53Df415f4F13");
	
	// Click handler for closing modals 
	$(".tcg_base_modal_close_button").on("click", function() {
		let id = $(this).attr("data");
		closeModal(id); 
	});
	
	// Click handler for close button in the endgame modal  
	$(document).on("click", ".tcg_base_modal_close_button_endgame", function() {
		let id = $(this).attr("data");
		closeModalEndgame(id); 
	});

	// Click handler for the sidebar menu that is under the Logo 
	$(".tcg_base_menu_option").on("click", function(e) {
		$(".tcg_base_menu_option").removeClass("tcg_base_menu_option_active");
		$(this).addClass("tcg_base_menu_option_active");
		let option = $(e.target).attr("data"); 
		tcg_base_open_tab(option); 
	});
	
	
	
	
/* DECK TAB */

	// Click handler for the cards in the cards list (the templates list)
	$(document).on("click", ".tcg_base_deckview_carditem", function() {
		let cardName = $(this).attr("data-card-name");

		$(".tcg_base_card_stats").addClass("hidden");
		$(".tcg_base_deckview_carditem").removeClass("tcg_base_deckview_carditem_active");
		$(this).addClass("tcg_base_deckview_carditem_active");

		tcg_base_deckview_loadTokenIdsList(cardName);
		
		// Mark button 
		$(".tcg_base_tokenId_mark").removeAttr("data-tokenid");
		$(".tcg_base_tokenId_mark").removeAttr("data-slotid");
		$(".tcg_base_tokenId_mark").addClass("disabled");
		
		// Deposit & Withdraw buttons 
		$(".tcg_base_tokenId_deposit").removeAttr("data-tokenid");
		$(".tcg_base_tokenId_withdraw").removeAttr("data-tokenid");
		tcg_base_player.selectedForMultiUpload.length > 0 ? $(".tcg_base_tokenId_deposit").removeClass("disabled") : $(".tcg_base_tokenId_deposit").addClass("disabled");
		$(".tcg_base_tokenId_withdraw").addClass("disabled");
		
		// Brew button 
		$(".tcg_base_tokenId_brew").removeAttr("data-tokenid");
		// $(".tcg_base_tokenId_brew").addClass("disabled");
		tcg_base_player.selectedForMultiUpload.length > 0 ? $(".tcg_base_tokenId_brew").removeClass("disabled") : $(".tcg_base_tokenId_brew").addClass("disabled");
	});
	
	// Click handler for the pager buttons in Deck section (card levels from 1 to 10 are shown as pages)
	$(document).on("click", ".tcg_base_card_list_nav", function() {
		let direction = $(this).data('direction');
		let currentPage = tcg_base_player.currentPage;

		currentPage += (direction === 'left') ? -1 : 1;

		tcg_base_player.currentPage = currentPage;
		$('.tcg_base_card_list_pagenumber').text(currentPage);
		updateNavigationButtons(currentPage);

		turnPage();
	});
	
	// Click handler for tokenIds in the tokenIds list (draws tokenId details)
	$(document).on("click", ".tcg_base_tokenIds_list_row", async function() {
		let row = $(".tcg_base_tokenIds_list_row");
		row.removeClass("tcg_base_tokenIds_list_row_active");
		$(this).addClass("tcg_base_tokenIds_list_row_active");
		let tokenId = $(this).attr("data-tokenId");
		await updateCardDetails(tokenId);
	});
	
	// Click handler for SELECT button (the button that sends cards to ascension list)
	$(document).on("click", ".tcg_base_tokenId_mark", function() {
		let tokenId  = $(this).attr("data-tokenid");
		let cardSlot = $(this).attr("data-slotid");
		
		const targets = $(".tcg_base_ascend_card");

		if (tokenId > 0 && cardSlot > 0) {

			// Check if any of the target divs already have the same tokenId
			let tokenIdExists = false;
			for (let target of targets) {
				if (target.getAttribute('data-tokenid') == tokenId) {
					tokenIdExists = true;
					break;
				}
			}

			// If tokenId doesn't exist in any of the target divs, proceed to add or update it
			if (!tokenIdExists) {
				for (let target of targets) {
					// Check if the div has the matching slotid
					if (target.getAttribute('data-slotid') == cardSlot) {
						// Set the tokenId attribute to the div
						target.setAttribute('data-tokenid', tokenId);
						// Set the background image 
						target.style.backgroundImage = 'url('+getCardDetailsByTokenId(tokenId, tcg_base_player.cards).image+')';
						// Add the glow class and remove it after the animation is finished
						target.classList.add('glowAscendCard');
						setTimeout(() => {
							target.classList.remove('glowAscendCard');
						}, 1000);

						break;
					}

				}
			} else {
				error("You have already selected this card!");
			}
		}

		// Check if all targets have been set
		let allTargetsSet = true;
		for (let target of targets) {
			if (!target.hasAttribute('data-tokenid')) {
				allTargetsSet = false;
				break;
			}
		}

		// If all targets are set, remove "disabled" class from .tcg_base_ascend_button
		if (allTargetsSet) {
			$('.tcg_base_ascend_button').removeClass('disabled');
		} else {
			$('.tcg_base_ascend_button').addClass('disabled');
		}
	});
	
	// "Deselect button" aka. the card image in Ascension list 
	$(document).on("click", ".tcg_base_ascend_card", function() {
		let tokenId  = $(this).attr("data-tokenid");
		let cardSlot = $(this).attr("data-slotid");
		if(tokenId > 0 && cardSlot > 0) {
			$(this).removeAttr("data-tokenid"); // remove tokenid 
			$(this).css("background-image", ""); // reset background image 
			$('.tcg_base_ascend_button').addClass('disabled'); // disable ascend button since no longer 11 cards 
			$(".tcg_base_ascend_tokeninfo").text(""); // remove the info 
		}
	});
	
	// Mouseover event for the ascend cards list cards (this just shows tokenId of hovered card)
	$(document).on("mouseover", ".tcg_base_ascend_card", function() {
		let tokenId  = $(this).attr("data-tokenid");
		if(tokenId > 0) {
			$(".tcg_base_ascend_tokeninfo").text("tokenId: #"+tokenId)
		}
	});
	
	// Mouse leave event for the ascend cards list cards 
	$(document).on("mouseleave", ".tcg_base_ascend_card", function() {
		let tokenId  = $(this).attr("data-tokenid");
		$(".tcg_base_ascend_tokeninfo").text("");
	});
	
	// Click handler for the Ascend button  
	$(document).on("click", ".tcg_base_ascend_button", async function() {
	  const { tokenIds, tokenLevels } = getAscendTokenIds();
	  const allSameLevel = tokenLevels.every(level => level === tokenLevels[0]);

	  if (tokenIds.length === 11) {
		if (!allSameLevel) {
		  error("All selected tokens must have the same level.");
		  return;
		}

		const hasPendingRequest = await tcg_base_hasPendingRequest();

		if (!hasPendingRequest) {
		  tcg_base_ascendToNextLevel(tokenIds);
		} else {
		  error("Cannot ascend to next level before opening existing starter pack.");
		}
	  } else {
		error("Incorrect amount of tokenIds selected. You can try clicking on Deck button again to reload everything and start over.");
	  }
	});
	
	// Click handler for Ascend approval button 
	$(document).on("click", ".tcg_base_approve_button", function() {
		tcg_base_approveAscension();
	});
	
	// Click handler for deposit button in card's details view  
	$(document).on("click", ".tcg_base_tokenId_deposit", async function() {
		let selectedTokenIds = tcg_base_player.selectedForMultiUpload;
		if(selectedTokenIds.length === 0) {
			let tokenId  = $(this).attr("data-tokenid");
			let cardName = $(this).closest('.tcg_base_card_info_inner').find('.tcg_base_card_name').text();
			let level    = $('.tcg_base_card_list_pagenumber').text();
			tcg_base_handleDeposit(tokenId, cardName, level); 
		} else {
			tcg_base_handleDepositForMultiUpload(selectedTokenIds);
		}
	});
	
	// Click handler for Approve button in card's details view 
	$(document).on("click", ".tcg_base_approve_deposit_button", function() {
		let data = $(this).closest(".tcg_base_modal").attr("data");
		tcg_base_setApprovalForAll(data); 
	});
	
	// Click handler for withdraw button in card's details view  
	$(document).on("click", ".tcg_base_tokenId_withdraw", function() {
		let selectedTokenIds = tcg_base_player.selectedForMultiDownload;
		if(selectedTokenIds.length === 0) {
			let tokenId  = $(this).attr("data-tokenid");
			let cardName = $(this).closest('.tcg_base_card_info_inner').find('.tcg_base_card_name').text();
			let level    = $('.tcg_base_card_list_pagenumber').text();
			tcg_base_handleWithdraw(tokenId, cardName, level); 
		} else {
			tcg_base_handleWithdrawForMultiDownload(selectedTokenIds);
		}
		
	}); 
	
	// Handles multiselect for tokenIds for multi-upload 
	// CSS: .tcg_base_count_depositcards + .tcg_base_tokenIds_list_row_multiselect (so you can't click uploaded ones yet)
	$(document).on('click', '.tcg_base_tokenIds_list_row_multiselect', async function() {
		let tokenIdDiv = $(this).siblings('.tcg_base_tokenIds_list_row');
		let tokenId = tokenIdDiv.attr('data-tokenid');
		
		let currentCardType = tokenIdDiv.hasClass('tcg_base_count_depositcards') ? 'uploaded' : 'downloaded';
		
		if (tcg_base_player.selectedCardType === null) {
			// Set the type for the first card
			tcg_base_player.selectedCardType = currentCardType;
		} else if (tcg_base_player.selectedCardType !== currentCardType) {
			console.log(tcg_base_player.selectedCardType, currentCardType); 
			// Mismatch, notify the user
			error(`Can't mix uploaded and downloaded cards for multi-action.`);
			return;
		}
		
		if(currentCardType === 'uploaded') {
			// Handle multi-download 
			console.log('Clicked uploaded tokenId:', tokenId);
			// If card is locked then don't send it in the handler function at all 
			let truth = await canCardBeWithdrawn(tokenId); 
			if(!truth) {
				error(`This card is currently locked in a game and cannot be downloaded.`); 

				// Reset the selection before returning 
				let tokenIds = tcg_base_player.selectedForMultiDownload;
				// Check if all selected cards have been deselected
				if (tokenIds.length === 0) {
					tcg_base_player.selectedCardType = null;  // Reset the selected type
				}

				return; 
			}
			tcg_base_handleMultiDownload(tokenId, this); 
		} else {
			// Handle multi-upload
			console.log('Clicked non-uploaded tokenId:', tokenId);
			tcg_base_handleMultiUpload(tokenId, this);
		}
	});
	
	// Handles brewing of cards 
	$(document).on('click', '.tcg_base_tokenId_brew', async function() {
		
		// Check if approved first 
		let allowed = await tcg_base_system.card.methods.isApprovedForAll(accounts[0], tcg_base_system.caul_address).call();
		if(!allowed) {
			await tcg_base_system.card.methods.setApprovalForAll(tcg_base_system.caul_address, true).send({from: accounts[0]})
			.on('transactionHash', function(hash) {
				notify(`<div class="flex-box flex-center">Approving Cauldron...</div>`); 
			})
			.on('receipt', async function(receipt) {
				notify(`<div class="flex-box flex-center">Cauldron approved!</div>`); 
			})
			.on('error', function(error) {
				error('Something went wrong, check console.'); 
				console.log(error); 
			})
		}		
		
		// Reuse multi-upload stuff 
		let selectedTokenIds = tcg_base_player.selectedForMultiUpload;
		let tokenIdsToPass = selectedTokenIds.length ? selectedTokenIds : [$(this).attr('data-tokenid')]; 

		// let tokenId = $(this).attr('data-tokenid'); 
		await tcg_base_system.caul.methods.increaseCauldronPortion(tokenIdsToPass).send({from: accounts[0]})
		.on('transactionHash', function(hash) {
			$('.tcg_base_tokenId_deposit').addClass('disabled'); 
			notify(`<div class="flex-box flex-center">Brewing some cards...</div>`); 
		})
		.on('receipt', async function(receipt) {
			resetMultiUpload(); 
			await tcg_base_open_tab("deck"); 
			
			// Check if vidya was claimed or not 
			if (receipt.events.Claimed && receipt.events.Claimed.returnValues) {
				let reward = Number(web3.utils.fromWei(receipt.events.Claimed.returnValues.amount)).toFixed(2); 
				notify(`<div style="text-align: center;">Cards brewed successfully. You withdrew your outstanding balance of <span class="tcg_base_golden_text">${reward} VIDYA</span></div>`); 
			} else {
				notify(`<div style="text-align: center;">Cards brewed successfully.</div>`); 
			}
			
		})
		.on('error', function(error) {
			error('Something went wrong, check console.'); 
			console.log(error); 
		})
	}); 
	
	
	
	
	/* STARTER PACK */
	
	// Buy button 
	$(document).on("click", ".tcg_base_buypack_button", function() {
		let referral = localStorage.getItem("tcg_base_starterpack_referral");
		tcg_base_buyStarterPack(referral);
	});
	
	// Open button  
	$(document).on("click", ".tcg_base_openpack_button", function() {
		tcg_base_openStarterPack();
	});
	
	
	
	
	/* PLAY TAB */
	
	// Handles clicks in Available cards list in Play section 
	tcg_base_player.filledSlots = 0; // Initialize counter for filled slots
	$(document).on("click", ".tcg_base_play_cardinfo_select", function() {
		const $this = $(this);
		const isSelected = $this.hasClass("selected");
		const tokenId = $this.attr("data-tokenId");

		// Add or remove tokenId from array and handle card slots
		if (isSelected) {
			tcg_base_player.selectedAvailableCards = tcg_base_player.selectedAvailableCards.filter(id => id !== tokenId);
			let slot = $(".tcg_base_card_to_start_game[data-tokenId='" + tokenId + "']");
			slot.attr("data-tokenId", "0"); // Reset slot
			slot.css("background-image", ""); // Reset background
			slot.html(''); // Reset values 
			tcg_base_player.filledSlots--; // Decrease counter
		} else if (tcg_base_player.filledSlots < 5) { // Check if there is an empty slot
			tcg_base_player.selectedAvailableCards.push(tokenId);
			let card = tcg_base_player.depositedUsableTokenUris.find(card => card.tokenId === tokenId); // Find the card
			let slot = $(".tcg_base_card_to_start_game[data-tokenId='0']").first();
			slot.attr("data-tokenId", tokenId); // Fill the first empty slot
			slot.css("background-image", `url(${card.image})`); // Set background image
			slot.html(`<div class="tcg_base_available_cards_card_values relative C64">
						<div class="card_value_top">${card.attributes.find(function(attr){return attr.trait_type === 'Top'}).value}</div>
						<div class="card_value_left">${card.attributes.find(function(attr){return attr.trait_type === 'Left'}).value}</div>
						<div class="card_value_right">${card.attributes.find(function(attr){return attr.trait_type === 'Right'}).value}</div>
						<div class="card_value_bottom">${card.attributes.find(function(attr){return attr.trait_type === 'Bottom'}).value}</div>
					</div>`); // Set the values 
			tcg_base_player.filledSlots++; // Increase counter
		} else {
			// Alert the user if there are no available slots
			error("All slots are filled. Please deselect a card before selecting a new one.");
			return;
		}
		
		$this.toggleClass("selected")
			  .text(isSelected ? "Select" : "Deselect")
			  .parent()
			  .toggleClass("selected");
			  
		// Check if all slots are filled and update the New Game button
		const $createNewGame = $('#createNewGame');
		const $practiceGame = $('#practiceGame'); 
		const $saveHand = $('#saveHand'); // get the saveHand button
		if (tcg_base_player.selectedAvailableCards.length === 5) {
			$createNewGame.removeClass('disabled');
			$saveHand.removeClass('disabled');
			$practiceGame.removeClass('disabled'); 
		} else {
			$createNewGame.addClass('disabled');
			$saveHand.addClass('disabled');
			$practiceGame.addClass('disabled'); 
		}	
	});
	
	// Click handler for the card slots in new game creation area so player can unselect them easily 
	$(document).on("click", ".tcg_base_card_to_start_game", function() {
		const $this = $(this);
		const tokenId = $this.attr("data-tokenId");
		
		// Only proceed if the slot isn't empty
		if (tokenId !== "0") {
			// Reset the slot
			$this.attr("data-tokenId", "0");
			$this.css("background-image", "");
			$this.html(''); 

			// Find the corresponding card in the list and update its state
			let $cardInfo = $(".tcg_base_play_cardinfo_select[data-tokenId='" + tokenId + "']");
			$cardInfo.removeClass("selected").text("Select");
			$cardInfo.parent().removeClass("selected");

			// Remove the card from selectedAvailableCards
			tcg_base_player.selectedAvailableCards = tcg_base_player.selectedAvailableCards.filter(id => id !== tokenId);
			
			// Decrease the counter
			tcg_base_player.filledSlots--;
			
			// Check if all slots are filled and update the New Game button
			const $createNewGame = $('#createNewGame');
			const $practiceGame = $('#practiceGame');
			if (tcg_base_player.selectedAvailableCards.length < 5) {
				$createNewGame.addClass('disabled');
				$practiceGame.addClass('disabled'); 
			}
		}
	});
	
	// Only allows numerical input in gameStartWager and tcg_base_discordId
	$("#gameStartWager, #tcg_base_discordId, #tcg_base_inventory_tokenId").on("keypress", function (e) {
		let charCode = (e.which) ? e.which : e.keyCode;
		if ((charCode < 48 || charCode > 57) && charCode !== 44 && charCode !== 46) // ASCII for 0-9, comma, and dot
			return false;
		return true;
	});

	// Paste handler for wager input field 
	$("#gameStartWager, #tcg_base_discordId").on("paste", function(e) {
		var pastedData = e.originalEvent.clipboardData.getData('text');
		if (!/^[0-9,]*$/.test(pastedData)) {
			e.preventDefault();
		}
	});
	
	// Click handler for trade rule buttons 
	$(document).on('click', '.tcg_base_traderule_select', function() {
		$('.tcg_base_traderule_select').removeClass('selected');
		$(this).addClass('selected');
	});
	
	// Click handler for create new game button 
	$("#createNewGame").click(function() {
		let selectedTradeRule = $(".tcg_base_traderule_select.selected").attr("data-traderule");
		let wagerInputAmount  = $("#gameStartWager").text();
		let friend = $('#tcg_base_friendAddress').text() || '0x0000000000000000000000000000000000000000';
		if(!web3.utils.isAddress(friend) && friend !== '') {
			error(`Friend address doesn't look valid..`); 
			return; 
		}
		if(friend.toLowerCase() === accounts[0].toLowerCase()) {
			error(`Can't play against yourself!`); 
			return; 
		}
		let handLimit = $('#tcg_base_handLimiter').val(); // Hand limiter value is 45 by default 
		if(selectedTradeRule < 4 && !isNaN(wagerInputAmount) && typeof wagerInputAmount === "string" && tcg_base_player.selectedAvailableCards.length === 5) {
			initializeGame(tcg_base_player.selectedAvailableCards, web3.utils.toWei(wagerInputAmount), selectedTradeRule, friend, handLimit); 
		} else {
			error("Please check trade rule, wager input amount, and ensure exactly five cards are selected."); 
		}
	});
	
	// Click handler for practice game button 
	$(document).on('click', '#practiceGame, .win_lose_button', function() {
		practice(); 
	}); 
	
	// Click handler for max wager button 
	$("#gameStartWagerMax").click(function() {
		let maxWager = web3.utils.fromWei(tcg_base_player.vidyaBalance);
		$("#gameStartWager").text(maxWager);
	});
	
	// Click handler for save hand button
	$(document).on('click', '#saveHand', function() {
		if (tcg_base_player.selectedAvailableCards.length === 5) {
			tcg_base_player.savedHand = [...tcg_base_player.selectedAvailableCards];
			localStorage.setItem('savedHand', JSON.stringify(tcg_base_player.savedHand));
			$('#loadHand').removeClass('disabled');  // Enable the load hand button
			$('#saveHand').addClass('disabled');  // Disable the save hand button
		} else {
			error('You must select exactly 5 cards to save a hand.');
			return; 
		}
		
		// Update button states
		const $createNewGame = $('#createNewGame');
		const $saveHand = $('#saveHand');
		const $loadHand = $('#loadHand');

		if (tcg_base_player.selectedAvailableCards.length === 5) {
			$createNewGame.removeClass('disabled');
			$saveHand.removeClass('disabled');
		} else {
			$createNewGame.addClass('disabled');
			$saveHand.addClass('disabled');
		}

		if (tcg_base_player.savedHand.length === 5) {
			$loadHand.removeClass('disabled');
		} else {
			$loadHand.addClass('disabled');
		}
		
		notify(`<div class="flex-box flex-center">Favorite hand saved!</div>`); 
		
	});
	
	// Click handler for load hand button 
	$(document).on('click', '#loadHand', function() {
		tcg_base_player.savedHand = JSON.parse(localStorage.getItem('savedHand')) || [];
		
		// Check if all saved cards are still available
		const allCardsAvailable = tcg_base_player.savedHand.length > 0 && tcg_base_player.savedHand.every(tokenId => 
		  tcg_base_player.depositedUsableTokenUris.some(card => card.tokenId === tokenId)
		);

		if (!allCardsAvailable) {
			error("Some cards in the saved hand are no longer available.");
			$('#saveHand').removeClass('disabled'); // Enable the save button
			return;
		}
		
		tcg_base_player.filledSlots = 0;

		// Reset the selected state for all cards in the list
		$(".tcg_base_play_available_card_info").removeClass("selected").find(".tcg_base_play_cardinfo_select").removeClass('selected').text("Select");
		
		// Clear previously saved slots
		$(".tcg_base_card_to_start_game[data-saved='true']").each(function() {
			$(this).attr("data-tokenId", "0");
			$(this).css("background-image", "");
			$(this).html('');
			$(this).removeAttr("data-saved");
		});

		// Load the saved hand
		tcg_base_player.savedHand.forEach(tokenId => {
			const card = tcg_base_player.depositedUsableTokenUris.find(c => c.tokenId === tokenId);
			let slot = $(".tcg_base_card_to_start_game[data-tokenId='0']").first();

			slot.attr("data-tokenId", tokenId);
			slot.css("background-image", `url(${card.image})`);
			slot.attr("data-saved", "true");
			slot.html(`<div class="tcg_base_available_cards_card_values relative C64">
						<div class="card_value_top">${card.attributes.find(attr => attr.trait_type === 'Top').value}</div>
						<div class="card_value_left">${card.attributes.find(attr => attr.trait_type === 'Left').value}</div>
						<div class="card_value_right">${card.attributes.find(attr => attr.trait_type === 'Right').value}</div>
						<div class="card_value_bottom">${card.attributes.find(attr => attr.trait_type === 'Bottom').value}</div>
					</div>`);

			// Update the selected state in the list for this tokenId
			$(`.tcg_base_play_cardinfo_select[data-tokenid="${tokenId}"]`).addClass("selected").text("Deselect").parent().addClass("selected");
			
			tcg_base_player.filledSlots++;
		});

		// Set selectedAvailableCards to the saved hand
		tcg_base_player.selectedAvailableCards = [...tcg_base_player.savedHand];

		// Check if all slots are filled and update the New Game button
		const $createNewGame = $('#createNewGame');
		const $practiceGame = $('#practiceGame'); 
		const $saveHand = $('#saveHand');
		const $loadHand = $('#loadHand');

		if (tcg_base_player.selectedAvailableCards.length === 5) {
			$createNewGame.removeClass('disabled');
			$practiceGame.removeClass('disabled'); 
			$saveHand.removeClass('disabled');
		} else {
			$createNewGame.addClass('disabled');
			$practiceGame.addClass('disabled'); 
			$saveHand.addClass('disabled');
		}

		if (tcg_base_player.savedHand.length === 5) {
			$loadHand.removeClass('disabled');
		} else {
			$loadHand.addClass('disabled');
		}
		
		notify(`<div class="flex-box flex-center">Favorite hand loaded!</div>`); 
	});

	// Click handler for opening advanced options window
	$(document).on('click', '#tcg_base_advancedSettingsOpenButton', function() {
	  let sliderValue = $('#tcg_base_handLimiter').val();
	  let percentage = (sliderValue / 45) * 100;  // Convert the value to percentage

	  $('#tcg_base_handLimiterValue').text(Math.round(percentage) + '%');  // Update the label
	  $('.tcg_base_create_new_game_advanced_options_wrapper').removeClass('hidden'); 
	});
	
	// Click handler for closing advanced options window 
	$(document).on('click', '#tcg_base_advancedSettingsCloseButton', function() {
		$('.tcg_base_create_new_game_advanced_options_wrapper').addClass('hidden'); 
	}); 
	
	// Input handler for the hand limiter slider
	$('#tcg_base_handLimiter').css('--slider-percentage', '100%'); // default to filled state  
	$(document).on('input', '#tcg_base_handLimiter', function() {
	  let sliderValue = $(this).val();
	  let percentage = (sliderValue / 45) * 100;  // Convert the value to percentage
	  let sliderPercentage = ((sliderValue - $(this).attr("min")) / ($(this).attr("max") - $(this).attr("min"))) * 100;

	  $(this).css('--slider-percentage', sliderPercentage + '%'); // Update the slider UI
	  $('#tcg_base_handLimiterValue').text(Math.round(percentage) + '%');  // Update the label
	});
	
	// Input handler for the time limiter slider 
	$('#tcg_base_timeLimiter').css('--slider-percentage', '60%');
	$(document).on('input', '#tcg_base_timeLimiter', function() {
	  let sliderValue = $(this).val();
	  let percentage = (sliderValue / 45) * 100;  // Convert the value to percentage
	  let sliderPercentage = ((sliderValue - $(this).attr("min")) / ($(this).attr("max") - $(this).attr("min"))) * 100;
      let map = ['5 mins', '15 mins', '30 mins', '1 hr', '12 hrs', '24 hrs']; 

	  $(this).css('--slider-percentage', sliderPercentage + '%'); // Update the slider UI
	  $('#tcg_base_timeLimiterValue').text(map[sliderValue]);  // Update the label
	});
	
	// Hover handler for tooltips 
	$(document).on('mouseenter', '.tcg_base_tooltip', function(e) {
	  let tip = $(this).attr('data-tip');
	  let $tooltip = $('<div class="tcg_base_create_new_game_advanced_options_tooltip C64 absolute"></div>')
		.appendTo('.tcg_base_create_new_game_advanced_options_wrapper');

	  let divOffset = $('.tcg_base_create_new_game_advanced_options_wrapper').offset();

	  let msg = '';
	  switch(tip) {
		case 'handlimiter':
		  msg = 'Sets the range of card levels your opponent can play with, relative to your hand. 100% means no restrictions.';
		  break;
		case 'friend':
		  msg = 'Specify an address you want as the Opponent. Zero address means anyone can join your game.'; 
		  break; 
		case 'timerlimiter': 
		  msg = 'The time in which a player must make a move or risk losing all their cards. Default is 1 hours.'; 
		  break; 
	  }

	  $tooltip.text(msg).show();

	  $tooltip.css({
		top: e.pageY - divOffset.top + 10,
		left: e.pageX - divOffset.left + 10
	  });
	})
	.on('mousemove', '.tcg_base_tooltip', function(e) {
	  let divOffset = $('.tcg_base_create_new_game_advanced_options_wrapper').offset();
	  $('.tcg_base_create_new_game_advanced_options_tooltip').css({
		top: e.pageY - divOffset.top + 10,
		left: e.pageX - divOffset.left + 10
	  });
	})
	.on('mouseleave', '.tcg_base_tooltip', function() {
	  $('.tcg_base_create_new_game_advanced_options_tooltip').remove();
	});
	
	// Focus handler for friend address field 
	$('#tcg_base_friendAddress').on('focus', function() {
	  $(this).text('');
	});
	
	// Paste event
	$('#tcg_base_friendAddress').on('paste', function(e) {
	  let clipboardData = e.originalEvent.clipboardData || window.clipboardData;
	  let pastedAddress = clipboardData.getData('text');

	  // Validate the pasted address using web3
	  if(web3.utils.isAddress(pastedAddress)) {
		$(this).text(pastedAddress);
	  } else {
		error('Invalid Ethereum address');
	  }

	  // Prevent the default paste action
	  e.preventDefault();
	});

	// Click handler for reveal hand button from available games list 
	$(document).on('click', '.tcg_base_games_list_item_reveal_hand_button_wrapper', async function() {
		let gameId = $(this).data("gameid");
		let gameDetails = tcg_base_games.gameDetails[gameId]; 
		
		// Get starting hand of player1 (the creator)
		let player1Hand = await tcg_base_system.game.methods.getStartingHand(gameDetails[1], gameId).call();
		
		// Show loading cog 
		$(this).html('<div class="template-loading-inner"></div>');
		
		let clickedButton = $(this);
		
		await tcg_base_revealPlayer1Hand(player1Hand, gameId); 
		
		tcg_base_games.revealedGames.push(gameId);
		
		// Removes the button (and the loading cog since it's HTML now for the button)
		clickedButton.remove();
	});
	
	// Click handler for joingame button in the available games list 
	$(document).on('click', '.tcg_base_join_game_button', async function() {
		$(this).addClass('disabled'); 
		let gameId = $(this).attr('data-joingameid'); 
		
		if(tcg_base_player.selectedAvailableCards.length !== 5) {
			error('You need to select 5 available cards to play with! You can deposit & withdraw cards in the Deck section.'); 
			$(this).removeClass('disabled'); 
			return; 
		}
		
		let gameDetails = tcg_base_games.gameDetails[gameId];
		
		// Check for wager if set
		if (gameDetails[9] > 0) {
			let wagerWei = gameDetails[9];
			let wagerEther = web3.utils.fromWei(wagerWei, 'ether');
			let wagerInputAmountEther = Number($('#gameStartWager').text());
			let wagerInputAmountWei = web3.utils.toWei(wagerInputAmountEther.toString(), 'ether');

			if (wagerInputAmountEther > tcg_base_player.vidyaBalance) {
				error(`You don't have enough VIDYA!`);
				$(this).removeClass('disabled'); 
				return;
			}

			if (wagerInputAmountWei !== wagerWei) {
				error(`You must wager exactly ${wagerEther} VIDYA to join this game.`);
				$(this).removeClass('disabled'); 
				return;
			}
		}
		
		// Check if the game creator set a friend-only 
		/* actually shouldn't be necessary any more after we skip the listing of the game in the first place 
		let friend = await tcg_base_system.game.methods.friendGames(gameId).call();
		if(friend.toLowerCase() !== '0x0000000000000000000000000000000000000000') {
			if(friend.toLowerCase() !== accounts[0].toLowerCase()) {
				error(`This game is not open for you.`);
				$(this).removeClass('disabled');
				return; 
			}
		}
		*/
		
		// Check if game creator set a hand cap 
		let cap = await tcg_base_system.game.methods.gameSumRequired(gameId).call();
		if(cap < 50) {
			let tokenIds = tcg_base_player.selectedAvailableCards; 
			let tokenUris = await tcg_base_fetchTokenUris(tokenIds); 
			let totalLevel = 0;
			tokenUris.forEach(card => {
			  card.attributes.forEach(attr => {
				if (attr.trait_type === "Level") {
				  totalLevel += parseInt(attr.value);
				}
			  });
			});

			if(totalLevel > cap) {
				error(`Selected hand too powerful! The creator asks that your card level sum is less than or equal to ${cap}`);
				$(this).removeClass('disabled'); 
				return; 
			}
		}
		
		let cards     = tcg_base_player.selectedAvailableCards; 
		let creator   = gameDetails[1]; 
		let gameIndex = tcg_base_games.gamesNeedPlayer.findIndex(id => id == gameId);
		if (gameIndex !== -1) {
			tcg_base_joinGameId(cards, gameId, creator, gameIndex);  
		} else {
			error(`Game ID ${gameId} not found in gamesNeedPlayer array`);
		}
		
		$(this).removeClass('disabled'); 
	}); 
	
	// Click handler for games list sorting options
	$(document).on('click', '.tcg_base_available_cards_sorting_tab', function() {
		let option = $(this).data('sortingOption') || $(this).attr('data-sortingOption');
		switch(option) {
			case "gameId":
				tcg_base_games.gameDetails = sortGamesById(tcg_base_games.gameDetails);
				break;
			case "wager":
				tcg_base_games.gameDetails = sortGamesByWager(tcg_base_games.gameDetails);
				break;
			case "tradeRule":
				tcg_base_games.gameDetails = sortGamesByTradeRule(tcg_base_games.gameDetails);
				break;
			default:
				console.error(`Invalid sorting option: ${option}`);
		}

		// After sorting the games, we should reload the games list
		tcg_base_loadGamesList();
	});

	// Handles clicks on your games and available games tabs 
	$(document).on('click', '.tcg_base_available_cards_header', function() {
		$('.tcg_base_available_cards_header').removeClass('tcg_base_game_tab_selected');
		$(this).addClass('tcg_base_game_tab_selected');
		tcg_base_loadGamesList(true);
	});

	// Cancel button on a game you created 
	$(document).on('click', '.tcg_base_cancel_game_button', function() {
		let gameId = $(this).attr('data-joingameid'); 
		let gameIndex = tcg_base_games.gamesNeedPlayer.findIndex(id => id == gameId);
		if (gameIndex !== -1) {  // Only proceed if the game ID was found in the array
			tcg_base_cancelGameId(gameIndex, gameId); 
		} else {
			error(`Game ID ${gameId} not found in gamesNeedPlayer array`);
		}
	});

	// Open game button in your games tab 
	$(document).on('click', '.tcg_base_open_game_button', function() {
		tcg_base_games.winnerSelectedCards = []; // Turn this into an empty array 
		let gameId = $(this).attr('data-joingameid');
		tcg_base_openGame(gameId); 
	});
	
	// Forfeit button in games 
	$(document).on('click', '.tcg_base_forfeit_button', async function() {
		let gameId = $(this).attr('data-gameid'); 
		let otherPlayer = (accounts[0].toLowerCase() === tcg_base_games.gameDetails[gameId][1].toLowerCase()) ? tcg_base_games.gameDetails[gameId][2] : tcg_base_games.gameDetails[gameId][1];
		let cards = await tcg_base_system.game.methods.getStartingHand(otherPlayer, gameId).call(); 
		await tcg_base_system.game.methods.collectWinnings(gameId, cards).send({from: accounts[0]})
		.on('transactionHash', function(hash) {
			notify(`<div class="flex-box flex-center">Executing forfeit..</div>`); 
		})
		.on('receipt', async function(receipt) {
			await tcg_base_open_tab('play', true);
			notify(`<div class="flex-box flex-center">Forfeit successful!</div>`);
			let gameWindow = $(`#tcg_base_game_window_${gameId}`); 
			gameWindow.remove(); 
			let taskIcon = $(`.task[data=tcg_base_game_window_${gameId}]`);
			taskIcon.remove(); 
		})
		.on('error', function(error) {
			console.error(error); 
		})
	}); 
	
	/*	Transaction that approves game contract to use player's VIDYA */
	$('#tcg_base_approveVidya').on('click', async function() {
		await VIDYA.methods.approve(tcg_base_system.game_address, '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF').send({from: accounts[0]})
		.on('transactionHash', function(hash) {
			notify(`<div class="flex-box flex-center">Approving VIDYA..</div>`); 
		})
		.on('receipt', function(receipt) {
			notify(`<div class="flex-box flex-center">Vidya Approved!</div>`);
		})
		.on('error', function(error) {
			console.error(error); 
		})
	}); 
	
	// Available games tab 
	$(".available_games").on("click", function() {
		$(".tcg_base_play_games_list_item_container").hide();
		$(".available-game").show();
	});

	// Your games tab 
	$(".your_games").on("click", function() {
		$(".tcg_base_play_games_list_item_container").hide();
		$(".your-game").show();
	});
	
	// Input handler for #playbackInputId in Replay area 
	$(document).on('focus', '#playbackInputId, #tcg_base_inventory_tokenId', function() {
		$(this).text('');
	}); 
	
	$(document).on('keydown', '#playbackInputId', function(e) {
        // Allow control keys (backspace, delete, arrows)
        if (e.keyCode === 8 || e.keyCode === 46 || e.keyCode === 37 || e.keyCode === 39) {
            return;
        }

        // Allow numerical keys
        if ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
	}); 	
	
	// Click handler for "Go" in Replay area 
	$(document).on('click', '.tcg_base_playbackGo', async function() {
		$("#replayTitle").text('Loading...'); 
		let inputId = $('#playbackInputId').text(); 
		if(inputId == "0") {
			error(`Null game huh? What are you smoking?`);
			return; 
		}
		await tcg_base_system.game.methods.gamesCreated().call().then(async function(r) {
			if(parseInt(r) >= parseInt(inputId)) {
				// All good..
				await playback(inputId); 
			} else {
				error(`GameId #${inputId} doesn't exist.`); 
			}
		});
		$("#replayTitle").text('Replay');
	}); 
	
	$(document).on('click', '.tcg_base_gameCreator, .tcg_base_player_profile, .tcg_base_opponent_profile, .tcg_base_menu_profile_link', async function() {
		let $element = $(this); 
		let originalText = $(this).text(); 
		
		if($element.closest('.tcg_base_play_games_list_item').length > 0) {
			$element.text('Loading...');
		} else {
			$element.addClass('disabled'); 
		}

		let address = $(this).attr('data-address'); 
		let id      = (((1+Math.random())*0x10000)|0).toString(16).substring(1);
		let playerData = await tcg_base_system.game.methods.playerData(address).call();
		let ethBalance = await web3.eth.getBalance(address);
		let vidyaBalance = await VIDYA.methods.balanceOf(address).call();
		let totalCards = await tcg_base_system.card.methods.balanceOf(address).call(); 
		let totalCardsDeposited = await tcg_base_system.game.methods.getDepositedAvailableCards(address).call();
		let highestLevelCard = await tcg_base_system.card.methods.getHighestLevelCard(address).call(); 
		let packPoints = await tcg_base_system.pack.methods.userPoints(address).call(); 
		let totalCardsBurned = await tcg_base_system.caul.methods.totalCardsBurnedPerUser(address).call(); 
		let highestLevelBurned = await tcg_base_system.caul.methods.highestLevelBurnedPerUser(address).call();
		let weights = await tcg_base_system.caul.methods.weights(address).call(); 
		let rewardsClaimed = await tcg_base_system.caul.methods.rewardsClaimed(address).call(); 
		let lastClaimTime = await tcg_base_system.caul.methods.lastClaim(address).call();
		lastClaimTime = lastClaimTime > 0 ? new Date(lastClaimTime * 1000).toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' }) : 'N/A'; 
		let blockie = 'url('+blockies.create({seed: address.toLowerCase()}).toDataURL()+')'; 
		
		let html = `
		<div class="tcg_base_profile_wrapper flex-box C64">
			<div class="tcg_base_profile_cube_wrapper">
				<div class="tcg_base_profile_cube">
					<div class="tcg_base_profile_cube_face front" style="background: ${blockie}"></div>
					<div class="tcg_base_profile_cube_face back" style="background: ${blockie}"></div>
					<div class="tcg_base_profile_cube_face left" style="background: ${blockie}"></div>
					<div class="tcg_base_profile_cube_face right" style="background: ${blockie}"></div>
					<div class="tcg_base_profile_cube_face top" style="background: ${blockie}"></div>
					<div class="tcg_base_profile_cube_face bottom" style="background: ${blockie}"></div>
				</div>
				<div class="tcg_base_profile_address C64"><a href="https://goerli.etherscan.io/address/${address}" target="_blank">${formatAddress(address)}</a></div>
			</div>
			<div class="tcg_base_profile_details_wrapper flex-box col">

				<div class="tcg_base_profile_details_title">Wallet</div>
				<div class="tcg_base_profile_details_row flex-box space-between">
					<div class="tcg_base_profile_details_label">ETH</div>
					<div class="tcg_base_profile_details_value">${Number(web3.utils.fromWei(ethBalance)).toFixed(2)}</div>
				</div>
				<div class="tcg_base_profile_details_row flex-box space-between">
					<div class="tcg_base_profile_details_label">VIDYA</div>
					<div class="tcg_base_profile_details_value">${Number(web3.utils.fromWei(vidyaBalance)).toFixed(2)}</div>
				</div>
				<div class="tcg_base_profile_details_row flex-box space-between">
					<div class="tcg_base_profile_details_label">Cards</div>
					<div class="tcg_base_profile_details_value">${totalCards}/<span class="tcg_base_count_depositcards">${totalCardsDeposited.length}</span></div>
				</div>
				<div class="tcg_base_profile_details_row flex-box space-between">
					<div class="tcg_base_profile_details_label">Highest level card</div>
					<div class="tcg_base_profile_details_value">${highestLevelCard}</div>
				</div>				

				<div class="tcg_base_profile_details_title">Game</div>
				<div class="tcg_base_profile_details_row flex-box space-between">
					<div class="tcg_base_profile_details_label">Games won</div>
					<div class="tcg_base_profile_details_value">${playerData._wins}</div>
				</div>	
				<div class="tcg_base_profile_details_row flex-box space-between">
					<div class="tcg_base_profile_details_label">Games lost</div>
					<div class="tcg_base_profile_details_value">${playerData._losses}</div>
				</div>	
				<div class="tcg_base_profile_details_row flex-box space-between">
					<div class="tcg_base_profile_details_label">Win to loss ratio</div>
					<div class="tcg_base_profile_details_value">${playerData._losses === '0' || playerData._wins === '0' ? 'N/A' : parseFloat(playerData._wins / playerData._losses).toFixed(2)}</div>
				</div>
				

				<div class="tcg_base_profile_details_title">Cauldron</div>
				<div class="tcg_base_profile_details_row flex-box space-between">
					<div class="tcg_base_profile_details_label">Starter pack points</div>
					<div class="tcg_base_profile_details_value">${packPoints}</div>
				</div>	
				<div class="tcg_base_profile_details_row flex-box space-between">
					<div class="tcg_base_profile_details_label">Total cards brewed</div>
					<div class="tcg_base_profile_details_value">${totalCardsBurned}</div>
				</div>
				<div class="tcg_base_profile_details_row flex-box space-between">
					<div class="tcg_base_profile_details_label">Highest level brewed</div>
					<div class="tcg_base_profile_details_value">${highestLevelBurned}</div>
				</div>				
				<div class="tcg_base_profile_details_row flex-box space-between">
					<div class="tcg_base_profile_details_label">User weight</div>
					<div class="tcg_base_profile_details_value">${weights.userW}/${weights.totalW}</div>
				</div>
				<div class="tcg_base_profile_details_row flex-box space-between">
					<div class="tcg_base_profile_details_label">Rewards claimed</div>
					<div class="tcg_base_profile_details_value">${abbr(Number(web3.utils.fromWei(rewardsClaimed)), 1)} VIDYA</div>
				</div>	
				<div class="tcg_base_profile_details_row flex-box space-between">
					<div class="tcg_base_profile_details_label">Last claim</div>
					<div class="tcg_base_profile_details_value">${lastClaimTime}</div>
				</div>				
			</div>
		</div>
		`; 
		
		tcg_base_launch_modal("Player profile", id, html); 
		
		if($element.closest('.tcg_base_play_games_list_item').length > 0) {
			$element.text(originalText); 
		} else {
			$element.removeClass('disabled'); 
		}
		
		$(`.tcg_base_modal[data=${id}]`).appendTo('body'); 
	}); 
	
	
	
	
	/* IN-GAME CLICK EVENTS */
	
	// Player and Opponent profile click events 
	$(document).on("click", ".tcg_base_player_profile, .tcg_base_opponent_profile", function(event) {
		let which = $(event.target).closest(".tcg_base_player_profile, .tcg_base_opponent_profile")[0].className;
		let gameId = $(this).closest('.console').attr('data').split('_')[4];
		let addy; 
		if(which.includes('tcg_base_player_profile')) {
			addy  = tcg_base_games.gameDetails[gameId][1]; 
		}
		else if(which.includes('tcg_base_opponent_profile')) {
			addy  = tcg_base_games.gameDetails[gameId][2]; 
		}
		else {
			console.log('Error fetching player address from gameDetails object.');
			return; 
		}
		
		// Open Etherscan if everything checks out 
		// window.open(`https://goerli.etherscan.io/address/${addy}`);
	});

	/*	Click handler for .close_button in game windows 
		Note: there is a global click handler for this button too in the main.js of teamOS */
	$(document).on("click", ".tcg_base_gameplay_wrapper .close_button", function() {
		let gameWindow = $(this).closest(".tcg_base_gameplay_wrapper");
		let gameId = gameWindow.attr('id').split('_').pop();
		tcg_base_closeGame(gameId);
		gameWindow.remove();
		resetLoop(); // Check and close the loop if we can 
	});

	// Click events on the cards to fetch tokenUris of clicked cards 
	$(document).on("click", ".tcg_base_player_card", function() {  
	  $('.tcg_base_player_card').removeClass('card_selected');
	  $(this).addClass('card_selected');

	  let tokenId = $(this).attr("tokenId");

	  // Figure out the current gameId
	  let gameId = $(this).closest('.console').attr('data').split('_')[4];

	  let tokenUris = tcg_base_games.gameTokenUris[gameId];

	  // Ensure tokenUris exists before attempting to access its properties
	  if (tokenUris) {
		let player1Card = tokenUris.player1tokenUris.find(card => card.tokenId === tokenId);
		let player2Card = tokenUris.player2tokenUris.find(card => card.tokenId === tokenId);

		let cardData = player1Card || player2Card;

		// Update the selected card for this game
		tcg_base_games.gameSelectedCards[gameId] = cardData;
	  } else {
		console.error(`No tokenUris found for gameId ${gameId}`);
	  }
	});

	// Click events on board's open slots 
	$(document).on("click", ".tcg_base_card_on_board_inner.open_slot", function() {
		// Figure out the current gameId
		let gameId = $(this).closest('.console').attr('data').split('_')[4];
		
		// Check if a card is selected
		if (!tcg_base_games.gameSelectedCards[gameId]) {
			error('Please select a card first.');
			return;
		}		
		
		// Get the slot ID
		let slotId = $(this).parent().attr('data');	

		// Get the tokenId 
		let tokenId = tcg_base_games.gameSelectedCards[gameId].tokenId; 		

		// Get the card element 
		let cardElement = $(`.tcg_base_player_card[tokenId="${tokenId}"]`);

		// Trigger practice place card function & return early if the board is a playground 
		if($(this).hasClass('practice')) {
			practicePlaceCard(gameId, slotId, cardElement); 
			return; 
		}

		// Determine the current player
		let currentPlayer = tcg_base_games.gameDetails[gameId][1] === accounts[0] ? 'player1' : 'player2';
		
		// Get the player's hand
		let hand = currentPlayer === 'player1' ? tcg_base_games.gameDetails[gameId][3] : tcg_base_games.gameDetails[gameId][4];
		
		// Get the index of the selected card in the player's hand
		let indexInHand = hand.findIndex(cardId => cardId === tokenId);
		if (indexInHand === -1) {
			error('Selected card not found in player hand.');
			return;
		}

		// Check if player2 is present (not present when game just initialized and opened up for the creator)
		let player2 = tcg_base_games.gameDetails[gameId][2];
		if(player2 === '0x0000000000000000000000000000000000000000') {
			error('Please wait for a player to join first!');
			return; 
		}

		// Place card on board 
		placeCardOnBoard(indexInHand, gameId, slotId, cardElement, currentPlayer); 
	});
	
	// Finalize button in endgame screen 
	$(document).on('click', '.tcg_base_game_modal_finalizeButton', function() {
		let tradeRule = $(this).attr('data-traderule'); 
		let gameId = $(this).attr('data-gameid'); 
		let isDraw = $(this).attr('data-isdraw') === 'true'; 
		let isWinner = $(this).attr('data-iswinner') === 'true'; 
		let loserTokenIdsString = $(this).attr('data-loserTokenIds'); 
		let loserTokenIds = loserTokenIdsString.split(','); // Loser's tokenIds are needed for tradeRule All
		let player1Points = tcg_base_games.gameDetails[gameId][5];
		let player2Points = tcg_base_games.gameDetails[gameId][6];
		let pointDifference = Math.abs(player1Points - player2Points);
		
		let tokenIds = tcg_base_games.winnerSelectedCards; // cards winner has selected for claiming 

		// Handle draw (both winner and loser can finalize on draw)
		if (isDraw) {
			tcg_base_collectWinnings(gameId, []); // Pass an empty array for draw
			return;
		}
		
		// Only if winner 
		if(isWinner) {
			
			// Specific check for "Diff" tradeRule
			if (tradeRule === "Diff" && tokenIds.length !== pointDifference) {
				error(`You must select exactly ${pointDifference} cards for the "Diff" trade rule.`);
				return;
			}

			// Check the other conditions
			if ((tradeRule === "One" || tradeRule === "Diff") && tokenIds.length > 0) {
				// Proceed with the logic for "One" or "Diff" tradeRule
				tcg_base_collectWinnings(gameId, tokenIds); 
			} else if (tradeRule === "Direct" && tokenIds.length === 0) {
				// Proceed with the logic for "Direct" tradeRule
				tcg_base_collectWinnings(gameId, []); // Pass an empty array 
			} else if (tradeRule === "All" && tokenIds.length === 0) {
				// Proceed with the logic for "All" tradeRule
				tcg_base_collectWinnings(gameId, loserTokenIds); // Pass loser's tokenIds 
			} else {
				// Handle the error case or show a warning message
				error("Invalid selection. Please ensure you have selected the cards according to the trade rule.");
			}
		
		} else {
			// Not a winner 
			error(`Only the winner can finalize this game.`); 
		}
	});
	
	
	
	/* SETTINGS TAB */
	
	// Claim referral rewards 
	$(document).on("click", ".tcg_base_claimrewards_button", function() {
		console.log("claim rewards"); 
		tcg_base_claimReferralRewards();
	});
	
	// Click handler for referral link 
	$(document).on('click', '.tcg_base_referral_link', function() {
		var $this = $(this);
		var originalValue = $this.val(); // Get the value of the input field

		navigator.clipboard.writeText(originalValue).then(function() {
			$this.val('Copied!'); // Change value to 'Copied!'

			setTimeout(function() {
				$this.val(originalValue); // Revert to the original value after 2 seconds
			}, 2000);
		}).catch(function(err) {
			console.error('Failed to copy text: ', err);
		});
	});
	
	// Input handler for the main playlist volume slider 
	$(document).on('input', '#tcg_base_volumeSlider', function() {
	  let percentage = (($(this).val() - $(this).attr("min")) / ($(this).attr("max") - $(this).attr("min"))) * 100;
	  $(this).css('--slider-percentage', percentage + '%');
	  tcg_base_baseVolume = parseFloat($(this).val());
	  tcg_base_gameAudio.playlist.forEach(track => {
		track.volume = tcg_base_baseVolume;
	  });
	  
	  // Store this 
	  localStorage.setItem('tcg_base_volume', tcg_base_baseVolume);
	});

	$(document).on('click', '.tcg_base_trackNav', function() {
	  const direction = $(this).data('track');
	  
	  if (direction === 'next') {
		tcg_base_playNextTrack();
	  } else if (direction === 'previous') {
		tcg_base_playPreviousTrack();
	  }
	});
	
	// Click handler for set discordId button 
	$(document).on('click', '#tcg_base_discordIdSetButton', async function() {
		let discordId = $('#tcg_base_discordId').text();

		// Check if the ID is numerical and exactly 18 digits long
		if (/^\d{18}$/.test(discordId)) {
		  // Trigger the tx 
		  await tcg_base_system.game.methods.registerId(discordId).send({from: accounts[0]})
		  .on('transactionHash', function(hash) {
			  notify(`Registering new Discord ID`);
		  })
		  .on('receipt', function(receipt) {
			  notify(`Discord ID was set successfully!`);
			  // Disable the input and button (is disabled on settings tab load in the future too)
			  $('#tcg_base_discordId, #tcg_base_discordIdSetButton').addClass('disabled'); 
		  })
		  
		} else {
			error(`Your input ${discordId} doesn't look like a valid Discord ID.`);
		}
	}); 
	
	// Click handler for setting tokenId as inventory pfp 
	$(document).on('click', '#tcg_base_inventory_tokenIdSetButton', async function() {
		let tokenIdInput = $('#tcg_base_inventory_tokenId').text();
		let tokenId = parseInt(tokenIdInput);

		// Check if tokenId is a valid number
		if (isNaN(tokenId) || tokenId <= 0 || tokenIdInput.includes('.')) {
			error("Invalid Token ID. Please enter a valid, whole number.");
			return;
		}

		// Retrieve the owner of the token
		let owner = await Inventory.methods.ownerOf(tokenId).call();

		// Check if the current user is the owner of the token
		if (owner.toLowerCase() === accounts[0].toLowerCase()) {
			await tcg_base_system.game.methods.updatePfp(tokenId).send({from: accounts[0]})
			.on('transactionHash', function(hash) {
				notify(`Setting new pfp`);
			})
			.on('receipt', function(receipt) {
				notify(`New pfp set successfully!`);
			})
			.on('error', function(error) {
				error(`Failed to set new pfp...`);
			});
		} else {
			error("This item does not belong to you!");
		}
	});
	
	
	
	/* CAULDRON TAB */
	$(document).on('mouseenter', '.tcg_base_cauldron_claim', function() {
		$('.cauldron_main').removeClass('cauldron_calm'); 
		$('.cauldron_main').addClass('cauldron_aggro'); 
	    tcg_base_audio['cauldron_slow'].pause();
	    tcg_base_audio['cauldron_fast'].play();		
	}); 
	
	$(document).on('mouseleave', '.tcg_base_cauldron_claim', function() {
		$('.cauldron_main').removeClass('cauldron_aggro');
		$('.cauldron_main').addClass('cauldron_calm'); 
        tcg_base_audio['cauldron_fast'].pause();
        tcg_base_audio['cauldron_fast'].currentTime = 0;
        tcg_base_audio['cauldron_slow'].play();		
	}); 
	
	$(document).on('click', '.tcg_base_cauldron_claim', async function() {
		if (tcg_base_player.cauldron.tokensClaimable > 0) {
			await tcg_base_system.caul.methods.claim().send({from: accounts[0]})
			.on('transactionHash', function(hash) {
				notify(`<div class="flex-box flex-center">Sipping from Cauldron...</div>`); 
			})
			.on('receipt', async function(receipt) {
				await tcg_base_loadCauldron(); 
				let amt = Number(web3.utils.fromWei(receipt.events.Claimed.returnValues.amount)).toFixed(2); 
				cauldronSip(amt); 
				// notify(`<div class="flex-box flex-center">You received ${} VIDYA!</div>`);
				// console.log(receipt); 
			})
			.on('error', function(error) {
				error(`Something went wrong.. check the console.`); 
				console.error(error); 
			})
		} else {
			error(`You are not worthy.`); 
		}
	}); 
	
	// Initial states 
	$('.tcg_base_cauldron_stats').addClass('tcg_base_cauldron_stats_closed');
	let buttonElement = $('.tcg_base_cauldron_stats_button');
	buttonElement.addClass('tcg_base_cauldron_stats_button_left'); 	
	
	$(document).on('click', '.tcg_base_cauldron_stats_button', function() {
	  let statsElement = $('.tcg_base_cauldron_stats');
	  let buttonElement = $('.tcg_base_cauldron_stats_button'); // Moved inside the function

	  if (statsElement.hasClass('tcg_base_cauldron_stats_open')) {
		statsElement.removeClass('tcg_base_cauldron_stats_open').addClass('tcg_base_cauldron_stats_closed');
		buttonElement.removeClass('tcg_base_cauldron_stats_button_right').addClass('tcg_base_cauldron_stats_button_left');
	  } else {
		statsElement.removeClass('tcg_base_cauldron_stats_closed').addClass('tcg_base_cauldron_stats_open');
		buttonElement.removeClass('tcg_base_cauldron_stats_button_left').addClass('tcg_base_cauldron_stats_button_right');
	  }
	});
	
	
	
	/* SFX */
	
	// Main menu button 
	$(document).on('mouseenter', '.tcg_base_menu_option', function(){ tcg_base_audio['stone_button_hover'].play() }); 
	$(document).on('click', '.tcg_base_menu_option', function(){ tcg_base_audio['stone_button_press'].play() }); 
	
	// Regular button 
	$(document).on('mouseenter', '.agnosia_button_hover, .open_slot', function() { tcg_base_audio['button_hover'].play() });
	$(document).on('click', '.agnosia_button_click', function() { tcg_base_audio['button_press'].play() }); 
	
	// Stone button 
	$(document).on('mouseenter', '.agnosia_button_stone_hover', function() { tcg_base_audio['button_hover'].play() });
	$(document).on('click', '.agnosia_button_stone_click', function() { tcg_base_audio['button_press'].play() });
	
	// Card button 
	$(document).on('mouseenter', '.agnosia_button_card_hover', function() { cardFlipSound() });
	$(document).on('mouseenter', '.agnosia_button_card_hover_1', function() { tcg_base_audio['card_place_02'].play() }); // Hover effect for card list items etc. 
	$(document).on('click', '.agnosia_button_card_click_1, .tcg_base_game_modal_card_loser', function() { tcg_base_audio['card_place_01'].play() }); // Put card in place  
	$(document).on('click', '.agnosia_button_card_click_2', function() { tcg_base_audio['card_place_04'].play() }); // Take card back 

	// Select & Deselect checkmark specific 
	$(document).on('click', '.tcg_base_tokenIds_list_row_multiselect', function() {
	  if ($(this).hasClass('tcg_base_tokenIds_list_row_multiselect_selected')) {
		tcg_base_audio['card_flip_03_rev'].play();
	  } else {
		tcg_base_audio['card_flip_03'].play();
	  }
	});
	
	// Player's hand cards 
	$(document).on('mouseenter', '.agnosia_card_hover', function() { tcg_base_audio['card_flip_02'].play() });
	$(document).on('click', '.agnosia_card_click', function() {});
	
	// Ladle dunk 
	$(document).on('mouseenter', '.tcg_base_cauldron_claim', function(){ tcg_base_audio['ladle_dunk'].play() }); 

	tcg_base_finish_loading();
}); // end of document.ready 

// Initialize Agnosia contracts 
function tcg_base_init() {
	tcg_base_system.pack = new web3.eth.Contract(tcg_base_pack_abi, tcg_base_system.pack_address); 
	tcg_base_system.game = new web3.eth.Contract(tcg_base_game_abi, tcg_base_system.game_address); 
	tcg_base_system.card = new web3.eth.Contract(tcg_base_card_abi, tcg_base_system.card_address); 
	tcg_base_system.caul = new web3.eth.Contract(tcg_base_caul_abi, tcg_base_system.caul_address); 
	// Show button on desktop 
	$("#tcg_base_button_wrapper").show("scale"); 
}

/*	Functions to show & hide the loading screen */
function tcg_base_start_loading()  {
	$("#tcg_base_loading_screen").show();
}

function tcg_base_finish_loading() {
	$("#tcg_base_loading_screen").hide();
}

/*	This function launches modals 
	title title of the modal 
	id unique identifier for each modal window 
	content the HTML content for modal 
	*/
function tcg_base_launch_modal(title, id, content) {
	$(".tcg_base_modal_body").empty(); 
	$(".tcg_base_modal").removeClass("hidden"); 
	$(".tcg_base_modal").attr("data", id); 
	$(".tcg_base_modal_close_button").attr("data", id); 
	$(".tcg_base_modal_header_title").text(title.toString()); 
	$(".tcg_base_modal_body").append(content); 
}

/*	This function opens different tabs on the UI (Play, Deck, Settings, etc.) */
async function tcg_base_open_tab(option, forceEmptyGamesListContainer = false) {
    try {
        // Track open tab in a variable 
        for (let key in tcg_base_pack.openTab) {
            tcg_base_pack.openTab[key] = false; 
        }
        tcg_base_pack.openTab[option] = true; 

        // Empty all containers to start fresh 
        tcg_base_resetAllContainers(); 

        // Keep button bg and arrow icon 
        $(".tcg_base_menu_option[data=" + option + "]").addClass("tcg_base_menu_option_active"); 
        $(".tcg_base_menu_option[data=" + option + "]").find(".tcg_base_menu_arrow").removeClass("hidden"); 

        await tcg_base_load_content(option, forceEmptyGamesListContainer); 

        // Finally show the tab content 
        // $(".tcg_base_main_wrapper[data="+option+"]").removeClass("hidden")

        // Attempt to fix bug where multiple tabs remain visible  
        for (let key in tcg_base_pack.openTab) {
            if (tcg_base_pack.openTab[key]) {
                $(".tcg_base_main_wrapper[data=" + key + "]").removeClass("hidden");
                break;
            }
        }
    } catch (e) {
        console.error(e); 
    }
}

/*	This function loads different sections of the game 
	option given option as a string */
async function tcg_base_load_content(option, forceEmptyGamesListContainer = false) {
	try {
		tcg_base_start_loading(); 
		
		if(option == "deck") {
			await tcg_base_load_starterpack();
			await tcg_base_load_playerdeck();
			$(".tcg_base_approve_button, .tcg_base_ascend_button").addClass("hidden");
			(await tcg_base_isApproved() ? $(".tcg_base_ascend_button") : $(".tcg_base_approve_button")).removeClass("hidden");
		}
		
		if(option == "options") {
			let referralLink = "https://team3d.io/?referral="+accounts[0];
			$(".tcg_base_referral_link").val(referralLink);
			
			let canClaim = await tcg_base_system.pack.methods.canClaimRewards(accounts[0]).call();
			$(".tcg_base_claimrewards_button").toggleClass("hidden", !canClaim);
			$(".tcg_base_nothingtoclaim_button").toggleClass("hidden", canClaim);

			if(canClaim) {
				let earnings = await tcg_base_system.pack.methods.referalToClaim(accounts[0]).call(); // blast pls.. it's referral not referal 
				earnings = Number(web3.utils.fromWei(earnings)).toFixed(2); 
				$('#outstandingReferralRewards').html(`You have <span class="tcg_base_golden_text">${earnings}</span> available!`);
			}
			
			// Fetch discordId 
			let { _discordId } = await tcg_base_system.game.methods.playerData(accounts[0]).call();
			// Display the discordId and disable the input if it was set 
			$('#tcg_base_discordId').text(_discordId == '0' ? '' : _discordId).toggleClass('disabled', _discordId !== '0');
			// Disable the button too if discordId is set 
			$('#tcg_base_discordIdSetButton').toggleClass('disabled', _discordId !== '0'); 
			
			// Fetch inventory tokenId 
			let { _tokenId } = await tcg_base_system.game.methods.playerData(accounts[0]).call();
			$('#tcg_base_inventory_tokenId').text(_tokenId == '0' ? 'tokenId' : _tokenId); // .toggleClass('disabled', _tokenId !== '0');
			// $('#tcg_base_inventory_tokenIdSetButton').toggleClass('disabled', _tokenId !== '0');
		}
		
		if(option == "play") {
			await tcg_base_initPlaySection(forceEmptyGamesListContainer); 
		}
		
		if(option == "cauldron") {
			await tcg_base_loadCauldron(); 
		}
		
		tcg_base_finish_loading(); 
	}
	catch(e) {
		console.error(e)
	}
}

/*	This function loads the starter pack UI */
async function tcg_base_load_starterpack() {
    try {
		let player = accounts[0];
		
        // Get pack data in parallel
        const [packCost, ethBalance, pendingRequest, canOpenStarterPack] = await Promise.all([
            tcg_base_system.pack.methods.packCost().call(),
            web3.eth.getBalance(player),
            tcg_base_system.pack.methods.userHasPendingRequest(player).call(),
            tcg_base_system.pack.methods.canOpenStarterPack(player).call()
        ]);

        // Update pack data if changed
        if (tcg_base_pack.price !== packCost) tcg_base_pack.price = packCost;
        if (tcg_base_pack.ethBalance !== ethBalance) tcg_base_pack.ethBalance = ethBalance;
        if (tcg_base_pack.hasPendingRequest !== pendingRequest) tcg_base_pack.hasPendingRequest = pendingRequest;
        if (tcg_base_pack.canOpenStarterPack !== canOpenStarterPack) tcg_base_pack.canOpenStarterPack = canOpenStarterPack;

        // Update the button visibility
        updateStarterPackButtonVisibility({
            packCost: tcg_base_pack.price,
            ethBalance: tcg_base_pack.ethBalance,
            pendingRequest: tcg_base_pack.hasPendingRequest,
            canOpenStarterPack: tcg_base_pack.canOpenStarterPack,
        });

		// Call the function again in 2 seconds if Deck tab is open
		if (tcg_base_pack.openTab["deck"]) {
			tcg_base_pack.timeoutID = setTimeout(async () => {
				await tcg_base_load_starterpack(player);
			}, 2000);
		}

    } catch (e) {
        console.error(e);
    }
}

/*	This function is responsible for showing & hiding the starter pack buttons */
let openPackNotified = false; 
function updateStarterPackButtonVisibility(packData) {
	
    // Hide all buttons first
    $(".tcg_base_starterpack_button").addClass("hidden");
	
    // Determine and show the appropriate button
    const buttonToShow = determineButtonToShow(packData);
    $(buttonToShow).removeClass("hidden");
	
	// When user can open a pack let them know about it 
    if ($(buttonToShow).hasClass("tcg_base_openpack_button")) {
		if(!openPackNotified) {
			notify(`<div class="flex-box flex-center">You can open your starter pack now!</div>`);
			openPackNotified = true; 
		}
    }
}

/*	This function determines which starterpack button to show to the user */
function determineButtonToShow(packData) {
    const hasEnoughEth = web3.utils.fromWei(packData.ethBalance) > web3.utils.fromWei(packData.packCost);
    const hasPendingRequest = packData.pendingRequest;
    const hasStarterPackWaiting = packData.canOpenStarterPack;

    if (hasStarterPackWaiting && !tcg_base_pack.pendingBuy && !tcg_base_pack.pendingOpen) {
        return $(".tcg_base_openpack_button");
    } else if (hasStarterPackWaiting && tcg_base_pack.pendingOpen) {
        return $(".tcg_base_openingpack_button");
    } else if (hasPendingRequest || tcg_base_pack.pendingBuy) {
        return $(".tcg_base_pendingpack_button");
    } else if (hasEnoughEth && !hasStarterPackWaiting && !hasPendingRequest && !tcg_base_pack.pendingBuy && !tcg_base_pack.pendingOpen) {
        return $(".tcg_base_buypack_button");
    } else {
        return $(".tcg_base_notenougheth_button");
    }
}

/*	This function loads the player's deck (11 cards per each level list)
	forceLevel level number to force the UI into (if it is required to remain in the current page) */
async function tcg_base_load_playerdeck(forceLevel) {
    try {
		let player = accounts[0];
		
        // Fetch uris
        let tokenUris = await tcg_base_fetchUserCards(player);
        
        // Merge and sort cards
        let mergedCards = tcg_base_mergeAndSortCards(tokenUris);

		// Store globally 
        tcg_base_player.cards = mergedCards;

        // Draw UI with Level 1 cards or forced level's cards 
        let level = (forceLevel >= 1 && forceLevel <= 10) ? forceLevel : 1;
        tcg_base_player.currentPage = level;
        $(".tcg_base_card_list_pagenumber").text(tcg_base_player.currentPage);
        updateNavigationButtons(tcg_base_player.currentPage);

        let container = $(".tcg_base_card_list_inner");
        container.html(generateCardListHTML(mergedCards, level));
    } catch (e) {
        console.error(e);
    }
}

/*	This function sorts cards as tokenUris by their level */
function tcg_base_mergeAndSortCards(tokenUris) {
    let mergedCards = {};

    tokenUris.forEach(card => {
        let level = card.attributes.find(attr => attr.trait_type === "Level").value;
        let cardName = card.attributes.find(attr => attr.trait_type === "Name").value;

        if (!mergedCards[level]) {
            mergedCards[level] = {};
        }

        if (!mergedCards[level][cardName]) {
            mergedCards[level][cardName] = {
                count: 0,
				deposited: 0,
                cards: []
            };
        }

        mergedCards[level][cardName].count += 1;
        mergedCards[level][cardName].cards.push(card);
		if (card.deposited) {
		  mergedCards[level][cardName].deposited += 1;
		}
    });

    // Sort cards by tokenId
    for (let level in mergedCards) {
        for (let cardName in mergedCards[level]) {
            mergedCards[level][cardName].cards.sort((a, b) => a.tokenId - b.tokenId);
        }
    }
	
    return mergedCards;
}

/*	Transaction to buy a starter pack 
	referral the referral address if given */
async function tcg_base_buyStarterPack(referral) {
	try {
		await tcg_base_system.pack.methods.buyStarterPack(referral).send({
			from: accounts[0],
			value: tcg_base_pack.price
		})
		.on("transactionHash", function(hash) {
			tcg_base_pack.pendingBuy = true;
			tcg_base_load_starterpack(accounts[0]); // This figures out the right button to show 
			notify('<div>Buying starter pack</div><div class="margin-top-05rem">Waiting for <a href="https://etherscan.io/tx/'+hash+'" target="_blank">transaction</a> to confirm...</div>');
		})
		.on("receipt", function(receipt) {
			tcg_base_pack.pendingBuy = false;
			tcg_base_load_starterpack(accounts[0]); // This figures out the right button to show 
			notify('<div>Starter pack bought!</div><div class="margin-top-05rem">It will take a few minutes to print all the cards. Please wait...</div>');
		})
	}
	catch(e) {
		console.error(e)
	}
}

/*	Transaction to open a starter pack */
async function tcg_base_openStarterPack() {
	try {
		await tcg_base_system.pack.methods.openStarterPack().send({from: accounts[0]})
		.on("transactionHash", function(hash) {
			tcg_base_pack.pendingOpen = true; 
			tcg_base_load_starterpack(accounts[0]); // This figures out the right button to show 
			notify('<div>Opening starter pack</div><div class="margin-top-05rem">Waiting for <a href="https://goerli.etherscan.io/tx/'+hash+'" target="_blank">transaction</a> to confirm...</div>');
		})
		.on("receipt", async function(receipt) {
			tcg_base_pack.pendingOpen = false; 
			tcg_base_load_starterpack(accounts[0]); // This figures out the right button to show 
			notify('<div style="text-align: center">Starter pack opened!</div>');

			// Get the tokenIds from the receipt data
			let tokenIds = []; 
			let startIndex = (receipt.events[0].raw.topics.length > 3) ? 0 : 1; // Check the type of transaction based on the 0th event's topics (either vidya or nft transfer)
			for(let i = startIndex; i < Object.keys(receipt.events).length; i++) {  
				tokenIds.push(web3.utils.hexToNumberString(receipt.events[i].raw.topics[3])); 
			}
			
			// Get the tokenUris for those tokenIds 
			let tokenUris = await tcg_base_fetchTokenUris(tokenIds); 
			
			let title   = 'Starter pack opened';
			let id      = (((1+Math.random())*0x10000)|0).toString(16).substring(1); // for close button 
			let content = '';
			
			for(let i = 0; i < tokenUris.length; i++) {
				let level = parseInt(tokenUris[i].attributes.find(function(attr){return attr.trait_type === 'Level'}).value)
				let name  = tokenUris[i].attributes.find(function(attr){return attr.trait_type === 'Name'}).value
				let top   = parseInt(tokenUris[i].attributes.find(function(attr){return attr.trait_type === 'Top'}).value)
				let left  = parseInt(tokenUris[i].attributes.find(function(attr){return attr.trait_type === 'Left'}).value)
				let right = parseInt(tokenUris[i].attributes.find(function(attr){return attr.trait_type === 'Right'}).value)
				let bottom= parseInt(tokenUris[i].attributes.find(function(attr){return attr.trait_type === 'Bottom'}).value)
				
				let div = '<div style="background-image: url('+tokenUris[i].image+'); background-size: cover;" class="tcg_base_modal_card relative">\
	<div class="absolute top left C64" style="width: 30px; height: 40px; top: 4px; left: 8px; font-size: 140%;">\
		<div class="absolute" style="left: 10px; top: 0">'+top+'</div>\
		<div class="absolute" style="left: 0; top: 10px;">'+left+'</div>\
		<div class="absolute" style="right: 0; top: 10px;">'+right+'</div>\
		<div class="absolute" style="bottom: 0; left: 10px;">'+bottom+'</div>\
	</div>\
</div>';
				content = content + div;
			}
			
			content = '<div class="flex-box col flex-center full-height"><div class="C64" style="font-size: 200%; margin-bottom: 0.75rem;">Here are your cards!</div><div class="flex-box" style="flex-wrap: wrap; justify-content: center;">' + content + '</div></div>';

			// Draw these tokenIds in a popup modal 
			tcg_base_launch_modal(title, id, content);
			
			// reload all user cards too here 
			tcg_base_load_playerdeck();
			
			// Set this false so we can get new notifications later 
			openPackNotified = false;
		})
	}
	catch(e) {
		console.error(e)
	}
}

/*	This function fetches all player's cards both deposited and not deposited 
	Returns tokenUris for all of these cards */
async function tcg_base_fetchUserCards(player) {
    try {
        let userCards = await tcg_base_system.card.methods.ownerTokenArray(player).call();
        let deckInfo = await tcg_base_system.game.methods.deckInfo(accounts[0]).call();
        let deck = deckInfo.deck;
        
        // Mark user cards as not deposited
        let userCardUris = await tcg_base_fetchTokenUris(userCards);
        userCardUris.forEach(card => card.deposited = false);

        // Mark deck cards as deposited
        let deckCardUris = await tcg_base_fetchTokenUris(deck);
        deckCardUris.forEach(card => card.deposited = true);

        // Combine all cards
        let allCardUris = [...userCardUris, ...deckCardUris];
        
        return allCardUris;
    }
    catch(e) {
        console.error(e);
    }
}

// Returns tokenUris based on array of tokenIds 
async function tcg_base_fetchTokenUris(tokenIds) {
	try {
		let tokenUris = []
		for(let i = 0; i < tokenIds.length; i++) { 
			let uri   = await tcg_base_system.card.methods.tokenURI(tokenIds[i]).call()
			let json  = JSON.parse(atob(uri.slice(29)))
					    json.tokenId = tokenIds[i]
					    tokenUris.push(json)
		}
		
		return tokenUris; 
	}
	catch(e) {
		console.error(e)
	}
}

/*	This function is responsible for loading card data into the tokenIds list (on the right side)
	Triggered when player clicks on a card in Deck section */
async function tcg_base_deckview_loadTokenIdsList(cardName) {
	try {
		let loadingScreen = $("#tcg_base_card_info_top_loading"); 
		let container = $(".tcg_base_card_info_tokenIdlist_inner"); 
		loadingScreen.removeClass("hidden"); 
		container.empty(); 
		
		let tokenIds = getTokenIdsByCardName(cardName, tcg_base_player.cards);

		// Show loading cog & default card background 
		$("#tcg_base_card_info_image_loading").removeClass("hidden");
		$(".tcg_base_card_info_details_cardimage").css("background-image", "url(games/tcg_base/img/card-back.png)"); 
		
		// Hide card values during loading time 
		$(".tcg_base_card_info_details_cardimage > .tcg_base_card_values").addClass("hidden"); 
		
		// Load card side values 
		let sideValues = getCardSideValuesByCardName(cardName, tcg_base_player.cards);
		let $cardImageContainer = $(".tcg_base_card_info_details_cardimage");
		let $nameContainer = $(".tcg_base_card_name");
		let $descriptionContainer = $(".tcg_base_card_description");

		$cardImageContainer.find(".tcg_base_card_values > .card_value_top").text(sideValues.top);
		$cardImageContainer.find(".tcg_base_card_values > .card_value_left").text(sideValues.left);
		$cardImageContainer.find(".tcg_base_card_values > .card_value_right").text(sideValues.right);
		$cardImageContainer.find(".tcg_base_card_values > .card_value_bottom").text(sideValues.bottom);
		
		// Load image 
		let cardImageElement = $(".tcg_base_card_info_details_cardimage");
		let image = new Image();
		let imageUrl = getCardImageByCardName(cardName, tcg_base_player.cards);
		image.src = imageUrl; 
		image.onload = function() {
			cardImageElement.css({
				"background-image": "url(" + imageUrl + ")"
			});
			
			// Hide loading cog 
			$("#tcg_base_card_info_image_loading").addClass("hidden");
			
			// Show card values 
			$(".tcg_base_card_info_details_cardimage > .tcg_base_card_values").removeClass("hidden");
			
			// Show name & description too after image loads maybe
			$nameContainer.text(cardName); 
			$descriptionContainer.text(sideValues.description); 
		};

		for(let i = 0; i < tokenIds.length; i++) {
		  let tokenId = tokenIds[i];
		  let depositedClass = "";

		  // Loop through all cards in tcg_base_player.cards
		  for(let level in tcg_base_player.cards) {
			for(let cardName in tcg_base_player.cards[level]) {
			  let cards = tcg_base_player.cards[level][cardName].cards;
			  for(let j = 0; j < cards.length; j++) {
				// If the tokenIds match, check if the card is deposited
				if(cards[j].tokenId == tokenId) {
				  depositedClass = cards[j].deposited ? "tcg_base_count_depositcards" : "";
				  break;
				}
			  }
			  if(depositedClass) break; // Break outer loop if we found a deposited card
			}
			if(depositedClass) break; // Break outer loop if we found a deposited card
		  }

		  //let row = `<div class="flex-box space-between"><div class="tcg_base_tokenIds_list_row flex-box full-width align-center ${depositedClass}" data-tokenId=${tokenId}>tokenId #${tokenId}</div><div class="tcg_base_tokenIds_list_row_multiselect flex-box ${tcg_base_player.selectedForMultiUpload.includes(tokenId) ? 'tcg_base_tokenIds_list_row_multiselect_selected' : ''}"></div></div>`;
		  
			let row = `<div class="flex-box space-between">
			<div class="tcg_base_tokenIds_list_row agnosia_button_card_click_1 flex-box full-width align-center ${depositedClass}" data-tokenId=${tokenId}>tokenId #${tokenId}</div>
			<div class="tcg_base_tokenIds_list_row_multiselect flex-box ${
			tcg_base_player.selectedForMultiUpload.includes(tokenId) || tcg_base_player.selectedForMultiDownload.includes(tokenId) ? 'tcg_base_tokenIds_list_row_multiselect_selected' : ''
			}"></div>
			</div>`;

		  container.append(row);
		}

		loadingScreen.addClass("hidden"); 
	}
	catch(e) {
		console.error(e)
	}
}

/*	Transaction to set approval for player's cards within the ascend contract (starterpack seller) */
async function tcg_base_approveAscension() {
	try {
		await tcg_base_system.card.methods.setApprovalForAll(tcg_base_system.pack_address, true).send({from: accounts[0]})
		.on("transactionHash", function(hash) {
			// Disable approve button & cards in ascend list 
			$(".tcg_base_approve_button").addClass("disabled");
			$(".tcg_base_ascend_card").addClass("disabled"); 

			notify('<div>Approving for ascension...</div><div class="margin-top-05rem">Waiting for <a href="https://goerli.etherscan.io/tx/'+hash+'" target="_blank">transaction</a> to confirm...</div>');
		})
		.on("receipt", function(receipt) {
			// Hide approve, show ascend, enable card list 
			$(".tcg_base_approve_button").addClass("hidden");
			$(".tcg_base_ascend_button").removeClass("hidden");
			$(".tcg_base_ascend_card").removeClass("disabled"); 
			notify('<div class="flex-box flex-center">Ascension approved!</div>');	

			// We can trigger ascend function here for a neat UX 
		})
	}
	catch(e) {
		console.error(e);
	} 
}

/*	Transaction to ascend cards to next level 
	tokenIds array of tokenIds to burn in order to get 1 higher level card */
async function tcg_base_ascendToNextLevel(tokenIds) {
	try {
		await tcg_base_system.pack.methods.ascendToNextLevel(tokenIds).send({from: accounts[0]})
		.on("transactionHash", function(hash) {
			// Disable ascend button & buy starterpack button 
			$(".tcg_base_ascend_button").addClass("disabled");
			$(".tcg_base_buypack_button").addClass("disabled");
			
			// Empty all cards from the ascension list
			$(".tcg_base_ascend_card").css("background-image", "");
			$(".tcg_base_ascend_card").removeAttr("data-tokenid");
			
			notify('<div>Ascending to next level...</div><div class="margin-top-05rem">Waiting for <a href="https://goerli.etherscan.io/tx/'+hash+'" target="_blank">transaction</a> to confirm...</div>');
		})
		.on("receipt", async function(receipt) {
			$(".tcg_base_buypack_button").removeClass("disabled"); // Re-enable buy button 
			await tcg_base_open_tab("deck"); 
		})
	}
	catch(e) {
		console.error(e);
	}
}

// Returns property count in a given object 
function countProperties(obj) {
    var count = 0;
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            ++count;
    }

    return count;
}

// Returns the slot id for a card 
function getCardSlot(card) {
  let slotAttribute = card.attributes.find(attr => attr.trait_type === "Slot");
  return slotAttribute ? parseInt(slotAttribute.value) : 0;
}

/*	This function generates the HTML code for cards lists per level in the Deck section */
function generateCardListHTML(mergedCards, level) {
  let content = '';
  let cardsBySlot = {};

  // Organize cards by slot
  for (let cardName in mergedCards[level]) {
    let card = mergedCards[level][cardName].cards[0];
    let slot = getCardSlot(card);
    cardsBySlot[slot] = {
      name: cardName,
      count: mergedCards[level][cardName].count,
	  deposited: mergedCards[level][cardName].deposited
    };
  }

  // Generate HTML for each slot (1 to 11)
  for (let i = 1; i <= 11; i++) {
    if (cardsBySlot[i]) {
      let cardName = cardsBySlot[i].name;
      let ownedAmount = cardsBySlot[i].count - cardsBySlot[i].deposited;
      let depositAmount = cardsBySlot[i].deposited;

      content += `
        <div class="flex-box space-between tcg_base_deckview_carditem agnosia_button_card_click_1" data-card-name="${cardName}" data-card-slot="${i}">
          <div>${cardName}</div>
          <div class="flex-box space-between">
            <div class="tcg_base_count_ownedcards">${ownedAmount}</div> / <div class="tcg_base_count_depositcards">${depositAmount}</div>
          </div>
        </div>
      `;
    } else {
      // Empty slot
      content += `
        <div class="flex-box space-between tcg_base_deckview_emptyslot">
          <div>Unknown</div>
          <div class="flex-box space-between">
            <div>?/?</div>
          </div>
        </div>
      `;
    }
  }

  return content;
}

// Returns tokenIds by card's name 
function getTokenIdsByCardName(cardName, mergedCards) {
  let tokenIds = [];
  for (let level in mergedCards) {
    if (mergedCards[level][cardName]) {
      let cards = mergedCards[level][cardName].cards;
      for (let card of cards) {
        tokenIds.push(card.tokenId);
      }
    }
  }
  return tokenIds; 
}

// Returns card image by card's name 
function getCardImageByCardName(cardName, mergedCards) {
  let cardImage = '';

  for (let level in mergedCards) {
    if (mergedCards[level][cardName]) {
      let cards = mergedCards[level][cardName].cards;
      if (cards.length > 0) {
        cardImage = cards[0].image;
        break;
      }
    }
  }

  return cardImage;
}

// Returns card side values by card's name 
function getCardSideValuesByCardName(cardName, mergedCards) {
  let result = {top: 0, left: 0, right: 0, bottom: 0};
  for (let level in mergedCards) {
    for (let cardKey in mergedCards[level]) {
      if (cardKey === cardName) {
        let attributes = mergedCards[level][cardKey]["cards"]["0"].attributes; // all attributes 

        const getValueOrDefault = (value) => value === "10" ? 'A' : value;

        result.top = getValueOrDefault(attributes.find(attribute => attribute.trait_type === "Top")?.value || 0);
        result.left = getValueOrDefault(attributes.find(attribute => attribute.trait_type === "Left")?.value || 0);
        result.right = getValueOrDefault(attributes.find(attribute => attribute.trait_type === "Right")?.value || 0);
        result.bottom = getValueOrDefault(attributes.find(attribute => attribute.trait_type === "Bottom")?.value || 0);
		result.name = cardKey.name;
		result.description = mergedCards[level][cardKey]["cards"]["0"].description;
        return result;
      }
    }
  }
  return null;
}

// Returns card details by their tokenIds 
function getCardDetailsByTokenId(tokenId, mergedCards) {
  for (let level in mergedCards) {
    for (let cardName in mergedCards[level]) {
      let cards = mergedCards[level][cardName]["cards"];
      for (let card of cards) {
        if (card.tokenId === tokenId) {
          let cardDetails = {
            name: card.name,
            description: card.description,
            attributes: card.attributes,
			image: card.image
          };
          return cardDetails;
        }
      }
    }
  }
  return null;
}

// Updates nav buttons in Deck section for cards pager 
function updateNavigationButtons(currentLevel) {
  const leftButton = $('.tcg_base_card_list_nav[data-direction="left"]');
  const rightButton = $('.tcg_base_card_list_nav[data-direction="right"]');

  if (currentLevel <= 1) {
    leftButton.addClass('disabled');
  } else {
    leftButton.removeClass('disabled');
  }

  if (currentLevel >= 10) {
    rightButton.addClass('disabled');
  } else {
    rightButton.removeClass('disabled');
  }
}

// Turns the page in Deck section 
function turnPage() {
	let cardList = $(".tcg_base_card_list_inner");
	let newContent = generateCardListHTML(tcg_base_player.cards, tcg_base_player.currentPage)
	cardList.html(newContent);
}

/*	This function resets all containers to their default state 
	Called when closing the game */
function tcg_base_resetAllContainers() {
	// Hide tabs
	$(".tcg_base_main_wrapper").addClass("hidden");
	
	/* DECK VIEW */
	$(".tcg_base_card_description").empty()
	$(".tcg_base_card_name").empty()
	$(".tcg_base_card_info_tokenIdlist_inner").empty()
	$(".tcg_base_card_info_details_cardimage").css("background-image","")
	$(".tcg_base_card_values > .card_value_top").text("");
	$(".tcg_base_card_values > .card_value_left").text("");
	$(".tcg_base_card_values > .card_value_right").text("");
	$(".tcg_base_card_values > .card_value_bottom").text("");
	$(".tcg_base_card_stats").addClass("hidden");
	$(".tcg_base_card_wincount").text("");
	$(".tcg_base_card_playcount").text("");
	$(".tcg_base_card_brewingBonus").text(""); 
	$(".tcg_base_tokenId_mark").removeAttr("data-tokenid");
	$(".tcg_base_tokenId_mark").removeAttr("data-slotid");
	$(".tcg_base_tokenId_mark").addClass("disabled");
	$(".tcg_base_ascend_card").removeAttr("data-tokenid");
	$(".tcg_base_ascend_card").css("background-image","");
	$(".tcg_base_ascend_button").addClass("disabled");
	$(".tcg_base_tokenId_brew").removeAttr("data-tokenid"); 
	$(".tcg_base_tokenId_brew").addClass("disabled"); 
	
	// Resets Upload button and its array 
	resetMultiUpload();
	resetMultiDownload(); 
	
	// Reset the after elements with counts in them 
	$('.tcg_base_tokenId_brew, .tcg_base_tokenId_deposit, .tcg_base_tokenId_withdraw').attr('data-count', '0');

	// Close starterpack timeout 
	if (tcg_base_pack.timeoutID) {
		clearTimeout(tcg_base_pack.timeoutID);
		tcg_base_pack.timeoutID = null;
	}	

	// try resetting the loop 
	resetLoop();
	
	// Close things in Play section 
    $(".tcg_base_card_to_start_game").each(function() {
        const slot = $(this);
        slot.attr("data-tokenId", "0"); 
        slot.css("background-image", ""); 
		slot.html(''); 
    });
	
    tcg_base_player.selectedAvailableCards = [];
	// tcg_base_player.savedHand = []; 
    tcg_base_player.filledSlots = 0;
	$("#gameStartWager").text("0"); 
	$("#createNewGame").addClass("disabled"); 
	
	// Stop cauldron bubbling 
    tcg_base_audio['cauldron_slow'].pause();
    tcg_base_audio['cauldron_slow'].currentTime = 0;		
}

// Function to check if the loop should continue running (if Play tab is open)
function shouldContinueLoop() {
  return $('.tcg_base_available_cards_header').is(':visible') || tcg_base_games.openGames.size > 0;
}

// Modify the loop reset function
function resetLoop() {
  if (!shouldContinueLoop()) {
    if (tcg_base_games.gamesLoop) {
      clearInterval(tcg_base_games.gamesLoop);
      tcg_base_games.gamesLoop = null;  // Clear the reference
	  console.log("Games loop is closed."); 
    }
  }
}

/*	This function resets all running instances 
	Called from clicking .close_button inside a #tcg_base container */
function tcg_base_resetAllInstances() {
	// let hand = tcg_base_player.savedHand; // get hand 
	tcg_base_player.savedHand = JSON.parse(localStorage.getItem('savedHand')) || [];
	
	tcg_base_system.pack = null;
	tcg_base_system.card = null;
	resetProperties(tcg_base_pack);
	resetProperties(tcg_base_player);
	
	// Hack to make saved hand persist after closing tcg_base game. 
	// tcg_base_player.savedHand = hand; 
	
	$(".tcg_base_menu_option").removeClass("tcg_base_menu_option_active");
	
	// Unsubscribe from event listeners 
	unsubscribeFromGameInitialized();
	unsubscribeFromJoinedGame();
	unsubscribeFromAllCardPlacedOnBoard(); 
	unsubscribeFromGameCanceled(); 
	unsubscribeFromAllCollectWinnings(); 
	
	// Pretty sure we need to clear the main loop interval? 
	clearInterval(tcg_base_games.gamesLoop);
	
	// Fade out the music 
	// tcg_base_stopMenuTheme(); 
	tcg_base_stopPlaylist(); 
}

/**
 * Recursively sets all properties of an object to null, while keeping the object's structure intact.
 * If a property is itself an object (and not an array), the function will recurse into it to nullify its properties as well.
 * 
 * @param {Object} obj - The object whose properties are to be nullified.
 */
function resetProperties(obj) {
    for (let key in obj) {
        if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
            resetProperties(obj[key]);
        } else {
            obj[key] = null;
        }
    }
};

/*	Returns tokenIds and token levels from the ascend card slots */
function getAscendTokenIds() {
  const targets = $(".tcg_base_ascend_card");
  const tokenIds = [];
  const tokenLevels = [];

  for (let target of targets) {
    const tokenId = target.getAttribute('data-tokenid');
    if (tokenId) {
      tokenIds.push(tokenId);
      const card = getCardDetailsByTokenId(tokenId, tcg_base_player.cards);
      const level = card.attributes.find(attr => attr.trait_type === "Level").value;
      tokenLevels.push(level);
    }
  }

  return { tokenIds, tokenLevels };
}

/*	Returns a boolean 
	True if player has given approval for game contract to use their cards, false otherwise */
async function tcg_base_isApproved() {
	try {
		let result = await tcg_base_system.card.methods.isApprovedForAll(accounts[0], tcg_base_system.pack_address).call();
		return result; 
	}
	catch(e) {
		console.error(e);
	}
}

/*	Returns a boolean 
	True if player has a pending request, false otherwise */
async function tcg_base_hasPendingRequest() {
	try {
		let result = await tcg_base_system.pack.methods.userHasPendingRequest(accounts[0]).call();
		return result; 
	}
	catch(e) {
		console.error(e);
	}
}

/*	Transaction that claims referral rewards */
async function tcg_base_claimReferralRewards() {
	try {
		await tcg_base_system.pack.methods.claimRewards().send({from: accounts[0]})
		.on("transactionHash", function(hash) {
			$(".tcg_base_claimrewards_button").addClass("disabled");
			notify('<div class="flex-box flex-center">Claiming referral earnings...</div>');
		})
		.on("receipt", function(receipt) {
			let amount = decimal(web3.utils.fromWei(web3.utils.hexToNumberString(receipt.events[0].raw.data)),2);
			notify('<div class="flex-box col flex-center"><div>Referral earnings claimed!</div><div>You received '+amount+' VIDYA.</div></div>');
			$(".tcg_base_claimrewards_button").removeClass("disabled");
		})
	}
	catch(e) {
		console.error(e);
	}
}

/*	Function that handles card deposits 
	Shows 'approval needed' modal if approval is needed 
	Otherwise proceeds with depositing the cards 
	tokenId the tokenId to deposit 
	cardName the card name 
	level the card level */
async function tcg_base_handleDeposit(tokenId, cardName, level) {
	try {
		// Is the game allowed to fiddle user's cards? 
		let approved = await tcg_base_system.card.methods.isApprovedForAll(accounts[0], tcg_base_system.game_address).call();		
		if(!approved) {
			let title   = 'Approval needed';
			let id      = (((1+Math.random())*0x10000)|0).toString(16).substring(1);
			let content = '<div class="flex-box col flex-center full-width full-height C64 padding-1rem"><p class="margin-bottom-1rem">In order to proceed you need to approve your cards for transfer within our game smart contract. This is a one time transaction and will grant our game contract full access to your cards.</p><div class="tcg_base_approve_deposit_button tcg_base_green_text_black_outline agnosia_button_stone_hover agnosia_button_stone_click">Approve</div></div>'; 
			tcg_base_launch_modal(title, id, content);
		} else {
			// Deposit 
			// Array with length 1 created for consistency as the function really takes an array of tokenIds but for now I couldn't figure out the UI part. 
			let tokensToDeposit = []; 
			tokensToDeposit.push(tokenId); 
			tcg_base_transferToDeck(tokensToDeposit, cardName, level); 
		}
	}
	catch(e) {
		console.error(e); 
	}
}

/*	Transaction to set approval for game contract to use player's cards */
async function tcg_base_setApprovalForAll(data) { 
	try {
		await tcg_base_system.card.methods.setApprovalForAll(tcg_base_system.game_address, true).send({from: accounts[0]})
		.on("transactionHash", function(hash) {
			$(".tcg_base_approve_deposit_button").addClass("disabled");
			notify('<div class="flex-box flex-center">Approving cards for transfer...</div>');
		})
		.on("receipt", function(receipt) {
			notify('<div class="flex-box flex-center">Approved cards successfully!</div>');
			$(".tcg_base_approve_deposit_button").removeClass("disabled");
			closeModal(data);
		})
	}
	catch(e) {
		console.error(e); 
	}
}

// Closes the modal 
function closeModal(id) {
	$(".tcg_base_modal[data="+id+"]").addClass("hidden");
	$(".tcg_base_modal[data="+id+"] .tcg_base_modal_header_title").text("Default");
	$(".tcg_base_modal_body").empty();
}

// Closes the modal on end game screen 
function closeModalEndgame(id) {
	$(".tcg_base_modal_endgame[data="+id+"]").remove(); 
}

/*	Transaction to deposit cards to Deck (the game contract) 
	tokensToDeposit the tokenIds to deposit 
	cardName the card name 
	level the card level */
async function tcg_base_transferToDeck(tokensToDeposit, cardName, level) {
	try {
		await tcg_base_system.game.methods.transferToDeck(tokensToDeposit).send({from: accounts[0]})
		.on("transactionHash", function(hash) {
			$('.tcg_base_tokenId_brew').addClass('disabled'); 
			notify('<div class="flex-box flex-center">Uploading cards to game contract...</div>');
		})
		.on("receipt", async function(receipt) {
			let currentPage = tcg_base_player.currentPage; 
			// Reload it all 
			await tcg_base_load_playerdeck(currentPage); 
			
			// This removes green color from this tokenId  
			await tcg_base_deckview_loadTokenIdsList(cardName); 
			
			// This works for the version with 1 token deposits 
			updateCardDetails(tokensToDeposit[0]); 
			
			notify('<div class="flex-box flex-center">Cards uploaded successfully!</div>');
		})
	}
	catch(e) {
		console.error(e); 
	}
}

/*	Returns a boolean that answers 'is this card locked in any game?' */
async function canCardBeWithdrawn(tokenId) {
	try {
		let { id, owner, userIndex, currentGameIndex } = await tcg_base_system.game.methods.tokenIdToCard(tokenId).call(); 
		return currentGameIndex === "0"; 
	}
	catch(e) {
		console.error(e); 
	}
}

/*	This function handles the withdrawing of cards */
async function tcg_base_handleWithdraw(tokenId, cardName, level) {
	try {
		let tokensToWithdraw = []; 
		tokensToWithdraw.push(tokenId); 
		tcg_base_transferFromDeck(tokensToWithdraw, cardName, level); 
	}
	catch(e) {
		console.error(e); 
	}
}

/*	Transaction to transfer cards from Deck (the game contract) 
	tokensToWithdraw array of tokenIds to withdraw 
	cardName the name of the card 
	level the level of the card */
async function tcg_base_transferFromDeck(tokensToWithdraw, cardName, level) {
	try {
		await tcg_base_system.game.methods.transferFromDeck(tokensToWithdraw).send({from: accounts[0]})
		.on("transactionHash", function(hash) {
			notify('<div class="flex-box flex-center">Downloading cards from game contract...</div>');
		})
		.on("receipt", async function(receipt) {
			let currentPage = tcg_base_player.currentPage; 
			
			// Reload it all 
			await tcg_base_load_playerdeck(currentPage); 
			
			// This removes green color from this tokenId 
			await tcg_base_deckview_loadTokenIdsList(cardName); 
			
			// This works for the version with 1 token deposits <- what? 
			updateCardDetails(tokensToWithdraw[0]); 
			
			notify('<div class="flex-box flex-center">Cards downloaded successfully!</div>');
		})
	}
	catch(e) {
		console.error(e); 
	}
}

/*	This function updates the card details in the detailed view 
	Also updates the button state for mark, deposit, withdraw */
async function updateCardDetails(tokenId) {
    let cardDetails = getCardDetailsByTokenId(tokenId, tcg_base_player.cards);
    let winCount = cardDetails.attributes.find(attribute => attribute.trait_type === "Win Count").value;
    let playedCount = cardDetails.attributes.find(attribute => attribute.trait_type === "Played Count").value;
    let cardSlot = cardDetails.attributes.find(attribute => attribute.trait_type === "Slot").value;
	//let brewingBonus = await tcg_base_system.caul.methods.bonusMultiplier(tokenId).call(); 
	let { cardsPointValue } = await tcg_base_system.caul.methods.getBatchBrewValueMulti([tokenId]).call();  

    $(".tcg_base_card_wincount").text(winCount);
    $(".tcg_base_card_playcount").text(playedCount);
	$(".tcg_base_card_brewingBonus").text(cardsPointValue[0]);
    $(".tcg_base_card_stats").removeClass("hidden");
    
    // Select button
    $(".tcg_base_tokenId_mark").attr("data-tokenid", tokenId);
    $(".tcg_base_tokenId_mark").attr("data-slotid", cardSlot);
	//$(".tcg_base_tokenId_mark").removeClass("disabled");
    
    // Deposit & Withdraw buttons 
    $(".tcg_base_tokenId_deposit").attr("data-tokenid", tokenId);
    $(".tcg_base_tokenId_withdraw").attr("data-tokenid", tokenId);
	//$(".tcg_base_tokenId_deposit").removeClass("disabled"); 
	//$(".tcg_base_tokenId_withdraw").removeClass("disabled");
	
	// Brew button 
	$(".tcg_base_tokenId_brew").attr("data-tokenid", tokenId);

    let row = $(`.tcg_base_tokenIds_list_row[data-tokenId="${tokenId}"]`);
    
    // Check if the clicked item is deposited
    if (row.hasClass("tcg_base_count_depositcards")) {
        // If it is deposited, disable the "mark" and "deposit" and "brew" buttons, enable "withdraw"
        $(".tcg_base_tokenId_mark, .tcg_base_tokenId_deposit, .tcg_base_tokenId_brew").addClass("disabled");

        // Check if the card can be withdrawn
        /*if (await canCardBeWithdrawn(tokenId)) {
            $(".tcg_base_tokenId_withdraw").removeClass("disabled");
        } else {
            $(".tcg_base_tokenId_withdraw").addClass("disabled");
        }*/
		$(".tcg_base_tokenId_withdraw").toggleClass("disabled", !(await canCardBeWithdrawn(tokenId)));
    } else {
        // If it's not deposited, ensure the "mark" and "deposit" and "brew" buttons are not disabled, disable "withdraw"
        $(".tcg_base_tokenId_mark, .tcg_base_tokenId_deposit, .tcg_base_tokenId_brew").removeClass("disabled");
        $(".tcg_base_tokenId_withdraw").addClass("disabled");
    }
}

/*	This function initializes the PLAY section */
async function tcg_base_initPlaySection(forceEmptyGamesListContainer = false) {
	try {
		// let depositedCards = await tcg_base_deckOfPlayer(accounts[0]); 
		// let depositedUsableCards = await tcg_base_usableCardsForPlayer(accounts[0], depositedCards);
		
		let depositedUsableCards = await tcg_base_system.game.methods.getDepositedAvailableCards(accounts[0]).call();
		// depositedUsableCards = depositedUsableCards.filter(tokenId => tokenId !== "0"); // Filter out zero values << this was for prev. version where it returned also 0's 
		let depositedUsableTokenUris = await tcg_base_fetchTokenUris(depositedUsableCards); 
		tcg_base_player.depositedUsableTokenUris = depositedUsableTokenUris; 
		
		// Draw these cards on the UI
		tcg_base_drawAvailableCards(tcg_base_player.depositedUsableTokenUris);
		
		// Fetch gameIds needing a player right now (Future updates are handled in Events)
		await tcg_base_fetchGamesWaitingPlayer();

		// start listening for new game creations 
		if(!gameCreatedListener) { subscribeToGameInitialized(); }
		
		// start listening for joined game events 
		if(!gameJoinedListener) { subscribeToJoinedGame(); }
		
		// start listening for game cancels 
		if(!gameCanceledEventListener) { subscribeToGameCanceled(); }
		
		// Start the main loop 
		tcg_base_gamesLoop(forceEmptyGamesListContainer);
	}
	catch(e) {
		console.error(e); 
	}
}

/*	This function fetches all games currently waiting for 2nd player */
async function tcg_base_fetchGamesWaitingPlayer() {
	try {
		let newList = await tcg_base_system.game.methods.gamesNeedPlayer().call(); 
		for (let gameId of newList) {
			let gameDetails = await tcg_base_system.game.methods.getGameDetails(gameId).call();
			tcg_base_games.gameDetails[gameId] = gameDetails;
			
			// Also fetch the new custom timer 
			if(!('forfeitTime' in gameDetails)) {
				let forfeitTime = await tcg_base_system.game.methods.gameIndexToTimerRule(gameId).call();
				tcg_base_games.gameDetails[gameId]['forfeitTime'] = forfeitTime;
			}
		}

		tcg_base_games.gamesNeedPlayer = newList;
	}
	catch(e) {
		console.error(e); 
	}
}

/*	This function returns all deposited cards for player */
async function tcg_base_deckOfPlayer(player) {
	try {
		let { deck } = await tcg_base_system.game.methods.deckInfo(player).call(); 
		return deck; 
	}
	catch(e) {
		console.error(e); 
	}
}

/*	This function checks player's deck and returns only cards 
	that can be withdrawn (are not locked in any games) 
	
	Edit: no longer needed because contract returns them 
	
async function tcg_base_usableCardsForPlayer(player, deckOfPlayer) {
	try {
		let cards = []; 
		for(let i = 0; i < deckOfPlayer.length; i++) {
			let truth = await canCardBeWithdrawn(deckOfPlayer[i]);
			if(truth) {
				cards.push(deckOfPlayer[i]);
			}
		}
		
		return cards; 
	}
	catch(e) {
		console.error(e); 
	}
} */

/*	This is the main game loop that:  
	  Checks for VIDYA balance & allowance 
	  Fetches player games & updates the UI parts 
	  Loads available games into the available games list */
async function tcg_base_gamesLoop(forceEmptyGamesListContainer = false) {
		console.log('Force empty: ' + forceEmptyGamesListContainer); 
	try {
		// Check for VIDYA balance (VIDYA is accessible globally and works both on goerli and on mainnet)
		const balanceInWei = await VIDYA.methods.balanceOf(accounts[0]).call();
		const balanceInVidya = parseFloat(web3.utils.fromWei(balanceInWei)).toFixed(4);
		tcg_base_player.vidyaBalance = balanceInWei; 
		$("#vidyaBalance").text(`${balanceInVidya} VIDYA`);
		
		// Check for allowance 
		const allowanceAmount = await VIDYA.methods.allowance(accounts[0], tcg_base_system.game_address).call(); 
		$("#tcg_base_approveWager").toggleClass("hidden", allowanceAmount !== "0");
		$("#tcg_base_setWager").toggleClass("hidden", allowanceAmount === "0");

		/*	The new and hopefully better way to deliver Your Games (check line above for old) 
			Something didn't quite work as the games never showed up after pageload.. maybe the below function reacted differently? idk 
			edit: I forgot to fetch details per each gameId, duh. */
		await tcg_base_system.game.methods.getActivePlayerGames(accounts[0]).call().then(async function(result) {
			// Overwrite the global playerGames array with fresh ID's 
			tcg_base_games.playerGames = result; 
			
			for (gameId of tcg_base_games.playerGames) {
				// Fetch details for each gameId 
				let details = await tcg_base_system.game.methods.getGameDetails(gameId).call();
				tcg_base_games.gameDetails[gameId] = details;	

				// Also fetch the new custom timer 
				if(!('forfeitTime' in details)) {
					let forfeitTime = await tcg_base_system.game.methods.gameIndexToTimerRule(gameId).call();
					tcg_base_games.gameDetails[gameId]['forfeitTime'] = forfeitTime;
				}				
				
				// If the game window for this game is open, update its UI
				if (tcg_base_games.openGames.has(gameId)) {
					tcg_base_openGameUpdateUI(gameId, true); // boolean true means call is coming from gamesLoop(); 
				}
				
				// Forfeit check (adds or removes .forfeit class for the game in the list)
				await tcg_base_system.game.methods.forfeit(gameId).call().then(function(isForfeit) {
					let elem = $(`.tcg_base_play_games_list_item_container[data-gameid="${gameId}"]`).addClass('forfeit');
					isForfeit ? elem.addClass('forfeit') : elem.removeClass('forfeit'); 
				}); 
			}
		}); 

		// Load games into UI list 
		await tcg_base_loadGamesList(forceEmptyGamesListContainer);
		
		// Set the loop interval 
		if (!tcg_base_games.gamesLoop) {
			tcg_base_games.gamesLoop = setInterval(() => tcg_base_gamesLoop(), 5000);
		}
	} catch(e) {
		console.error(e); 
	}
}

/*	This function draws the available cards list on UI 
	cards the tokenUris for cards 
	Note: if no cards are present the user is shown a message about it */
function tcg_base_drawAvailableCards(cards) {
		let container = $('.tcg_base_play_available_cards_list_inner'); 
		container.html(''); 
		
		// Check if cards array is empty
		if (cards.length === 0) {
			container.append('<div class="tcg_base_no_available_cards">No cards found. You should try uploading some from the Deck! Remember you need at least 5 cards to be able to create or join games.</div>');
			return;
		}
		
        // Generate HTML for cards
        const cardHTMLs = cards.map(card => `
            <div class="tcg_base_play_available_card_info flex-box space-between flex-center">
                <div class="tcg_base_play_cardinfo_image" style="background: url(${card.image}); background-size: cover;">
					<div class="tcg_base_available_cards_card_values relative">
						<div class="card_value_top">${card.attributes.find(attribute => attribute.trait_type === "Top").value}</div>
						<div class="card_value_left">${card.attributes.find(attribute => attribute.trait_type === "Left").value}</div>
						<div class="card_value_right">${card.attributes.find(attribute => attribute.trait_type === "Right").value}</div>
						<div class="card_value_bottom">${card.attributes.find(attribute => attribute.trait_type === "Bottom").value}</div>
					</div>
				</div>
                <div class="tcg_base_play_cardinfo_details flex-box col">
					<div class="tcg_base_card_title_standout">${card.attributes.find(attribute => attribute.trait_type === "Name").value} #${card.tokenId}</div>
					<div class="tcg_base_card_details_standout">Win count: <span class="win_count">${card.attributes.find(attribute => attribute.trait_type === "Win Count").value}</span></div>
					<div class="tcg_base_card_details_standout">Played count: <span class="played_count">${card.attributes.find(attribute => attribute.trait_type === "Played Count").value}</span></div>
				</div>
                <div class="tcg_base_play_cardinfo_select agnosia_button_stone_hover agnosia_button_card_click_1" data-tokenId="${card.tokenId}">Select</div>
            </div>
        `);

        // Append all cards at once
        $('.tcg_base_play_available_cards_list_inner').append(cardHTMLs.join('')); 
}

/*	Transaction to create a new game 
	selectedAvailableCards array of tokenIds used in the new game 
	wagerInputAmount amount of VIDYA being wagered 
	selectedTradeRule the trade rule for this game */
async function initializeGame(selectedAvailableCards, wagerInputAmount, selectedTradeRule, friend, handLimit) {
	try {
		handLimit < 45 ? limitHands = true : limitHands = false; // Check if handLimit was modified by user (default is 45)
		let cards = selectedAvailableCards; 
		let wager = wagerInputAmount;
		let rule  = selectedTradeRule;  
		let timer = $('#tcg_base_timeLimiter').val();
		await tcg_base_system.game.methods.initializeGame(cards, wager, rule, friend, limitHands, handLimit, timer).send({from: accounts[0]})
		.on("transactionHash", function(hash) {
			notify('<div class="flex-box flex-center">Creating a new game...</div>');
		})
		.on("receipt", async function(receipt) {
			await tcg_base_open_tab('play'); // Unsure if force empty list is necessary here.. seems to work without it. 
			let gameId = receipt.events.GameInitialized.returnValues._gameId; // gameId from the event return 
			await tcg_base_openGame(gameId); // Open the newly created game 
		})
	}
	catch(e) {
		console.error(e); 
	}
}

/*	Function to load games list into .tcg_base_play_games_list_inner 
	emptyContainer boolean if true force .empty() on the container 
	Note: runs every 5s from tcg_base_gamesLoop(); */
async function tcg_base_loadGamesList(emptyContainer = false) {
    try {
        // Clicking on available and your games tabs triggers this flag regardless of the argument set above 
        // This ensures later on in the code we redraw all the gameIds into the list. 
        if (emptyContainer) {
            $('.tcg_base_play_games_list_inner').empty();
            tcg_base_games.gameIdsLoadedToList.availableGames.clear();
            tcg_base_games.gameIdsLoadedToList.yourGames.clear();
        }

        let isAvailableGamesTabSelected = $('.available_games').hasClass('tcg_base_game_tab_selected');

        // Determine the list of games to display based on the active tab
        // Either available to join games in Available games tab or your games in your games tab 
        let gameIdsList = isAvailableGamesTabSelected ? tcg_base_games.gamesNeedPlayer : tcg_base_games.playerGames;

        let gameTypeClass = isAvailableGamesTabSelected ? "available-game" : "your-game";

        for (const gameId of gameIdsList) {
            let gameIdExistsInEitherSet =
                tcg_base_games.gameIdsLoadedToList.availableGames.has(gameId) ||
                tcg_base_games.gameIdsLoadedToList.yourGames.has(gameId);

            // Skip drawing this on UI if found 
            if (gameIdExistsInEitherSet) {
                continue;
            }

            let gameDetail = tcg_base_games.gameDetails[gameId];
            if (!gameDetail) return;
			
			if(!('forfeitTime' in gameDetail)) {
				let forfeitTime = await tcg_base_system.game.methods.gameIndexToTimerRule(gameId).call();
				tcg_base_games.gameDetails[gameId]['forfeitTime'] = forfeitTime; // Update this globally 
				console.log(`Forfeit time fetched`); 
			}
			
			let friend = await tcg_base_system.game.methods.friendGames(gameId).call();
			// Check if the game is open for all, specifically for this player, or created by this player
			if (
				friend.toLowerCase() !== '0x0000000000000000000000000000000000000000' && 
				friend.toLowerCase() !== accounts[0].toLowerCase() && 
				gameDetail[1].toLowerCase() !== accounts[0].toLowerCase()
			) {
				continue; // Skip this game and don't display it
			}

            // If "Available Games" tab is selected and the game was created by the current user, skip this iteration
            // This means we don't show creators game in the public list 
            if (isAvailableGamesTabSelected && gameDetail[1].toLowerCase() == accounts[0].toLowerCase()) {
                continue;
            }

            let handImages = tcg_base_games.revealedHands[gameId] || [];
            let cardData = tcg_base_games.revealedHandsData[gameId] || [];

            let isRevealed = handImages.length > 0;

            let cardSlots = '';
            for (let i = 0; i < 5; i++) {
                let bgStyle;
                if (isRevealed && handImages[i]) {
                    bgStyle = `style="background: url(${handImages[i]}) center center/cover;"`;
                } else {
                    bgStyle = `style="background: url(games/tcg_base/img/card-back.png) center center/cover;"`; // Default card-back image
                }
                let cardData = tcg_base_games.revealedHandsData[gameId] ? tcg_base_games.revealedHandsData[gameId][i] : null;
                let cardValues = '';

                if (cardData) {
                    let topValue = cardData.attributes.find(attr => attr.trait_type === "Top").value;
                    let leftValue = cardData.attributes.find(attr => attr.trait_type === "Left").value;
                    let rightValue = cardData.attributes.find(attr => attr.trait_type === "Right").value;
                    let bottomValue = cardData.attributes.find(attr => attr.trait_type === "Bottom").value;

                    cardValues = `
                        <div class="card-value top">${topValue}</div>
                        <div class="card-value left">${leftValue}</div>
                        <div class="card-value right">${rightValue}</div>
                        <div class="card-value bottom">${bottomValue}</div>
                    `;
                }

                cardSlots += `
                    <div class="tcg_base_games_list_item_detail_card_slot relative" data-slotId="${i}" ${bgStyle}>
                        ${cardValues}
                    </div>`;
            }

            let revealButton = tcg_base_games.revealedGames.includes(Number(gameId)) ? '' :
                `<div class="tcg_base_games_list_item_reveal_hand_button_wrapper" data-gameId="${gameId}">
                    <div class="tcg_base_games_list_item_reveal_hand_button agnosia_button_stone_hover agnosia_button_stone_click">Reveal hand</div>
                </div>`;

            let isFinished = gameDetail[8];

            let button;
            if (gameDetail[1] === accounts[0] && gameDetail[2] === "0x0000000000000000000000000000000000000000") { // doesn't seem to trigger sometimes? 
                button = `<div class="tcg_base_cancel_game_button agnosia_button_stone_hover agnosia_button_stone_click" data-joingameid="${gameId}">Cancel</div>`;
            } else if (gameDetail[2] === "0x0000000000000000000000000000000000000000") {
                button = `<div class="tcg_base_join_game_button agnosia_button_stone_hover agnosia_button_stone_click" data-joingameid="${gameId}">Join</div>`;
            } else {
                button = `<div class="tcg_base_open_game_button agnosia_button_stone_hover agnosia_button_stone_click" data-joingameid="${gameId}">Open</div>`;
            }

            let item = `<div class="tcg_base_play_games_list_item_container ${gameTypeClass} C64 flex-box col" data-gameId="${gameId}" data-finished="${isFinished}">
				<div class="tcg_base_play_games_list_item flex-box space-between" style="border-bottom: 2px solid rgb(30, 50, 62); padding-bottom: 2px; ">
					<div class="tcg_base_games_list_item_detail">#${gameId}</div>
					<div class="tcg_base_games_list_item_detail">${["one", "diff", "direct", "all"][gameDetail[10]]}</div>
					<div class="tcg_base_games_list_item_detail">${gameDetail[9] == 0 ? 'N/A' : `${Number(web3.utils.fromWei(gameDetail[9]))} VIDYA`}</div>
				</div>
				<div class="tcg_base_play_games_list_item flex-box space-between relative">
					${cardSlots}
					${revealButton}
				</div>
				<div class="tcg_base_play_games_list_item flex-box space-between center-vertical">
					<div class="flex-box col">
						<div class="forfeit_time_label" style="font-size: 80%;">Forfeit time ${forfeitSecondsToLabel(gameDetail['forfeitTime'])}</div>
						<div class="tcg_base_gameCreator" data-address="${gameDetail[1]}">Created by ${formatAddress(gameDetail[1])}</div>
					</div>
					${button}
				</div>
			</div>`;

			// Check if the game item already exists in the DOM
			let gameItemSelector = `.tcg_base_play_games_list_item_container[data-gameId="${gameId}"]`;
			if ($(gameItemSelector).length > 0) {
				console.log(`Game #${gameId} already exists in the list.`);
			} else {
				console.log(`Adding game #${gameId} to the list.`);
				addGameOnUI(gameId, item, isAvailableGamesTabSelected);
			}

        }
    } catch (e) {
        console.error(e);
    }
}

/*	Functions to sort gameIds in the games list in various ways 
	UNTESTED */
function sortGamesById(games) {
    let gameEntries = Object.entries(games);
    gameEntries.sort((a, b) => Number(a[0]) - Number(b[0]));

    let sortedGames = {};
    gameEntries.forEach(entry => {
        sortedGames[entry[0]] = entry[1];
    });

    return sortedGames;
}

function sortGamesByWager(games) {
    let gameEntries = Object.entries(games);
    gameEntries.sort((a, b) => Number(a[1]["9"]) - Number(b[1]["9"]));

    let sortedGames = {};
    gameEntries.forEach(entry => {
        sortedGames[entry[0]] = entry[1];
    });

    return sortedGames;
}

function sortGamesByTradeRule(games) {
    let gameEntries = Object.entries(games);
    gameEntries.sort((a, b) => Number(a[1]["10"]) - Number(b[1]["10"]));

    let sortedGames = {};
    gameEntries.forEach(entry => {
        sortedGames[entry[0]] = entry[1];
    });

    return sortedGames;
}

/*	Function to add a game on UI in the games list 
	gameId the gameId being added 
	item the full html code block representing the gameId in the games list 
	isAvailableGamesTabSelected a boolean (does what it says) */
function addGameOnUI(gameId, item, isAvailableGamesTabSelected) {
    let container = $(".tcg_base_play_games_list_inner");
    container.append(item);
    // Keep track of what we just drew on the UI so we don't redraw them pointlessly 
    isAvailableGamesTabSelected ? tcg_base_games.gameIdsLoadedToList.availableGames.add(gameId) : tcg_base_games.gameIdsLoadedToList.yourGames.add(gameId);

    console.log(`AddGameOnUI(${gameId})`);
}

/*	UI cleanup function that removes gameId from the available games list 
	and untracks the gameId */
function removeGameFromUI(gameId) {
    let gameElement = $(`.tcg_base_play_games_list_item_container[data-gameid="${gameId}"]`);

    if (gameElement.length) { // Check if the element exists
        gameElement.remove();
        tcg_base_games.gameIdsLoadedToList.availableGames.delete(gameId);
        tcg_base_games.gameIdsLoadedToList.yourGames.delete(gameId);
    }
}

/*	Function to reveal player hand in the available games list 
	tokenIds the tokenIds to reveal 
	gameId the gameId these tokenIds belong to */
async function tcg_base_revealPlayer1Hand(tokenIds, gameId) {
    try {
        let tokenUris = await tcg_base_fetchTokenUris(tokenIds);
        // Store revealed images
        tcg_base_games.revealedHands[gameId] = tokenUris.map(uri => uri.image);
        tcg_base_games.revealedHandsData[gameId] = tokenUris;

        let gameItem = $(`.tcg_base_play_games_list_item_container[data-gameId="${gameId}"]`);
        tokenUris.forEach((tokenUri, i) => {
            let slotItem = gameItem.find(`.tcg_base_games_list_item_detail_card_slot[data-slotId="${i}"]`);
            let bg_image = tokenUri.image;
            let cardData = tokenUri; // The complete card data

            // Add card attributes to slot item
            let topValue = cardData.attributes.find(attr => attr.trait_type === "Top").value;
            let leftValue = cardData.attributes.find(attr => attr.trait_type === "Left").value;
            let rightValue = cardData.attributes.find(attr => attr.trait_type === "Right").value;
            let bottomValue = cardData.attributes.find(attr => attr.trait_type === "Bottom").value;

            // Create card values elements
            let topElement = `<div class="card-value top">${topValue}</div>`;
            let leftElement = `<div class="card-value left">${leftValue}</div>`;
            let rightElement = `<div class="card-value right">${rightValue}</div>`;
            let bottomElement = `<div class="card-value bottom">${bottomValue}</div>`;

            // Append card values to the slot item
            slotItem.css({
                "background": `url(${bg_image}) center center/cover`
            });
            slotItem.append(topElement);
            slotItem.append(leftElement);
            slotItem.append(rightElement);
            slotItem.append(bottomElement);
        });
    } catch (e) {
        console.error(e);
    }
}

/*	Transaction to cancel a game that is waiting for 2nd player 
	gameIndex the gameIndex player wants to cancel 
	gameId the gameId player wants to cancel */
async function tcg_base_cancelGameId(gameIndex, gameId) {
	try {
		await tcg_base_system.game.methods.cancelGameWaiting(gameIndex).send({from: accounts[0]})
		.on("transactionHash", function(hash) {
			notify('<div class="flex-box flex-center">Canceling game with id '+gameId+'...</div>');
		})
		.on("receipt", async function(receipt) {
			tcg_base_games.playerGames = tcg_base_games.playerGames.filter(id => id !== gameId); // Remove from the playerGames array 
			await tcg_base_open_tab("play", true); 
			notify('<div class="flex-box flex-center">Game with id '+gameId+' has been canceled successfully!</div>');
		})
	}
	catch(e) {
		console.error(e); 
	}
}

/*	Transaction to join a game 
	cards the array of cards player chose to join with 
	gameId the game player is joining 
	creator the creator of this game 
	gameIndex the gameId */
async function tcg_base_joinGameId(cards, gameId, creator, gameIndex) {
	try {
		await tcg_base_system.game.methods.joinGame(cards, gameIndex, creator).send({from: accounts[0]})
		.on("transactionHash", function(hash) {
			notify('<div class="flex-box flex-center">Joining game with id '+gameId+'...</div>');
		})
		.on("receipt", async function(receipt) {
			tcg_base_games.playerGames = tcg_base_games.playerGames.filter(id => id !== gameId);
			notify('<div class="flex-box flex-center">You have joined gameId '+gameId+' successfully!</div>');
			
			await tcg_base_open_tab("play"); // Force load the play tab..
			await tcg_base_openGame(gameId); // ..so that the game data exists for opening the game window 
		})
	}
	catch(e) {
		console.error(e); 
	}
}

/*	Function to open a new game window 
	gameId the game id we want to open */
async function tcg_base_openGame(gameId, isPlayback = false) { 
	try {
		let gameDetails = tcg_base_games.gameDetails[gameId];
		let wager = gameDetails[9] > 0 ? `${Number(web3.utils.fromWei(gameDetails[9]))} VIDYA` : 'N/A'; 
		let tradeRuleMap = ['One', 'Diff', 'Direct', 'All'];
		let tradeRule = tradeRuleMap[gameDetails[10]];
		
		// Get PFP's or default blockie 
		let { playerPfp, opponentPfp } = await getPfpsForPlayers(gameId, gameDetails[1], gameDetails[2]);

		// Clones the template gameWindow from index.html 
		let cloned = $("#tcg_base_game_window").clone();
		let newId = `tcg_base_game_window_${gameId}`;
		cloned.attr('id', newId);
		cloned.attr('data', newId); 
		cloned.find('.tcg_base_gameIndex').text(gameId);
		cloned.find('.tcg_base_wagerAmount').text(wager);
		cloned.find('.tcg_base_tradeRule').text(tradeRule); 
		
		// Update the profiles 
		cloned.find('.tcg_base_player_pfp').css('background', playerPfp); 
		cloned.find('.tcg_base_player_profile').attr('data-address', gameDetails[1]); 
		cloned.find('.tcg_base_opponent_pfp').css('background', opponentPfp); 
		cloned.find('.tcg_base_opponent_profile').attr('data-address', gameDetails[2]); 
		
		audio.open.play(); 
		cloned.appendTo('#desk'); 
		
		showContent(newId); // Opens the executable window 
		
		// Add gameId to taskbar icons 
		// Get taskIcon (made in showContent) and make it relative 
		// let $taskIcon = $(`.task[data=tcg_base_game_window_${gameId}]`).css('position', 'relative');
		// $taskIcon.html(`<div class="absolute C64">${gameId}</div>`); 
		
		let gameWindow = $(`#tcg_base_game_window_${gameId}`);
		
		// Make it draggable 
		makeDraggable(gameWindow); 
		
		tcg_base_games.openGames.add(gameId); // Tracks open game windows 

		if(!isPlayback) {

			// Update the game UI 
			await tcg_base_openGameUpdateUI(gameId);
			
			// Start listening for card placements 
			listenForCardPlacedOnBoard(gameId); 
		
		}

		// Remove the loading screen 
		cloned.find('#tcg_base_game_wrapper_loading_screen').remove(); 
	}
	catch(e) {
		console.error(e); 
	}
}

// Closes a game 
function tcg_base_closeGame(gameId) {
	tcg_base_games.openGames.delete(gameId); // Tracks open game windows 
	unsubscribeFromCardPlacedOnBoard(gameId); // Unsub from cardPlacedOnBoard event 
	unsubscribeFromCollectWinnings(gameId); // Unsub from end game events too 
	let $gameWindow = $(`#tcg_base_game_window_${gameId}`);
	$gameWindow.find('.samePlusNotif').remove();   
}

/*	This function updates the UI for a specific game 
	gameId the game we are targeting. It's called in main loop and some events like placing a card. */
let finalizeNotified = new Set();
async function tcg_base_openGameUpdateUI(gameId, calledFromMainLoop = false) {
    try {
        // Check if the game is in the endedGames set
        if (tcg_base_games.endedGames.has(gameId)) {
			if(!finalizeNotified.has(gameId)) {
				notify(`<div style="text-align:center;">Game #${gameId} has now ended.. loading finalize screen in 5 seconds.</div>`);
				finalizeNotified.add(gameId); 
				
				// load the end game screen after 5 seconds (we are doing this so players have time to see the final board one last time)
				setTimeout(async () => {
					await tcg_base_finishGame(gameId); 
				}, 5000);
			}
            return;
        }

		// Update gameId UI if it's still going 
        let gameWindow = $(`#tcg_base_game_window_${gameId}`);

        // If it doesn't exist do nothing 
        if (!gameWindow.length) {
            return;
        }

		// If called from gamesLoop use that, otherwise fetch fresh data <- should fix endGame screen lying problem 
		let gameDetails = calledFromMainLoop ? tcg_base_games.gameDetails[gameId] : await tcg_base_system.game.methods.getGameDetails(gameId).call();

        // Update the profiles (this is needed because when you open a game with no player 2 (after initGame it auto-opens) the player 2 blockie is a zero address blockie)
		let { playerPfp, opponentPfp } = await getPfpsForPlayers(gameId, gameDetails[1], gameDetails[2]);
        gameWindow.find('.tcg_base_player_pfp').css('background', playerPfp);
        gameWindow.find('.tcg_base_opponent_pfp').css('background', opponentPfp);
		
		// Fix opponent data-address not changing after they join your game while you have a game window open 
		let $opp = gameWindow.find('.tcg_base_opponent_profile'); 
		if ($opp.attr('data-address') !== gameDetails[2]) {
			$opp.attr('data-address', gameDetails[2]);
		}

        // Update hands 
        await tcg_base_openGameUpdateHands(gameId, gameWindow, gameDetails);

        // Update board state 
        await tcg_base_openGameUpdateBoard(gameWindow, gameDetails[0]);

        // Update player1 and player2 points  
        gameWindow.find('.tcg_base_player1_points').text(gameDetails[5]);
        gameWindow.find('.tcg_base_player2_points').text(gameDetails[6]);

        // Update turn 
        tcg_base_openGameUpdateTurn(gameWindow, gameDetails);

        // Check for game end status 
        if (gameDetails[8]) {
            // Add the gameId to the endedGames set
            tcg_base_games.endedGames.add(gameId);
			
			// Notify the user 
			if(!finalizeNotified.has(gameId)) {
				notify(`<div style="text-align:center;">Game #${gameId} has now ended.. loading finalize screen in 5 seconds.</div>`);
				finalizeNotified.add(gameId); 
				setTimeout(async () => {
					await tcg_base_finishGame(gameId);
				}, 5000);
			}
        }
		
		// Check forfeit 
		let forfeit = await tcg_base_system.game.methods.forfeit(gameId).call(); 
		if(forfeit) {
			$('.tcg_base_forfeit_button').attr('data-gameid', gameId); // add game Id to button 
			// Show forfeit button to the player whose turn is not it 
			let isPlayersTurn = $('.current_turn.tcg_base_player_pfp').length > 0;
			let isOpponentsTurn = $('.current_turn.tcg_base_opponent_pfp').length > 0;
			let isPlayersTurnAndIsTheOpponent = isPlayersTurn && accounts[0].toLowerCase() === tcg_base_games.gameDetails[gameId][2].toLowerCase();
			let isOpponentsTurnAndIsThePlayer = isOpponentsTurn && accounts[0].toLowerCase() === tcg_base_games.gameDetails[gameId][1].toLowerCase();
			isPlayersTurnAndIsTheOpponent || isOpponentsTurnAndIsThePlayer ? gameWindow.find('.tcg_base_game_forfeit_info').removeClass('hidden') : gameWindow.find('.tcg_base_game_forfeit_info').addClass('hidden');
		} else {
			gameWindow.find('.tcg_base_game_forfeit_info').addClass('hidden'); // Not forfeit, hide it in case it was visible
		}
		
		// Check if the forfeit info is hidden
		let forfeitInfoIsHidden = gameWindow.find('.tcg_base_game_forfeit_info').hasClass('hidden');

		// Show last move if timestamp is not zero and either player has a hand shorter than length 5 (made a move) && the forfeit button is hidden 
		if (gameDetails[11] !== '0' && (gameDetails[3].length < 5 || gameDetails[4].length < 5) && forfeitInfoIsHidden) {
		  // gameWindow.find('.tcg_base_lastMoveTime').html(`<span>Last move </span><span>${timeAgo(gameDetails[11])}</span>`);
			gameWindow.find('.tcg_base_lastMoveTime').html(`<span>${forfeitTimeLeft(parseInt(gameDetails[11], 10), parseInt(gameDetails['forfeitTime'], 10))}</span>`);
		} else {
		  gameWindow.find('.tcg_base_lastMoveTime').html('');
		}
    } catch (e) {
        console.error(e);
    }
}

/*	This function regularly updates the board data for gameWindow 
	gameWindow the game window element 
	boardData the new board information 
	Note: called from tcg_base_openGameUpdateUI(); which is called from tcg_base_gamesLoop(); every 5s */
async function tcg_base_openGameUpdateBoard(gameWindow, boardData) {
	try {
		// Get all the card slots in the game window
		let cardSlots = gameWindow.find('.tcg_base_card_on_board');

		// Get the current gameId from the game window's data attribute
		let gameId = gameWindow.attr('data').split('_')[4];

		// Get the player addresses for the game
		let player1 = tcg_base_games.gameDetails[gameId][1];
		let player2 = tcg_base_games.gameDetails[gameId][2];

		// Get the cards on the board
		let occupiedSlots    = boardData.filter(cardData => cardData[2] !== '0x0000000000000000000000000000000000000000');
		let occupiedCardIds  = occupiedSlots.map(cardData => cardData[0]);
		let occupiedCardURIs = await tcg_base_fetchTokenUris(occupiedCardIds);

		// Loop through each card slot
		for (let i = 0; i < cardSlots.length; i++) {
			// Get the current slot and its inner div
			let slot = $(cardSlots[i]);
			let inner = slot.find('.tcg_base_card_on_board_inner');

			// Get the corresponding card data
			let cardData = boardData[i];

			// Check if the slot is occupied by a card
			if (cardData[2] !== '0x0000000000000000000000000000000000000000') {
				// The slot is occupied, so we'll display the card
				// Get the card tokenId
				let tokenId = cardData[0];

				// Find the card in occupiedCardURIs
				let card = occupiedCardURIs.find(card => card.tokenId === tokenId);

				// If the card is found, set the background image to the card's image
				if (card) {
					// Check the owner and set the background accordingly
					if (cardData[2] === player1) {
						// inner.css('background', 'url(' + card.image + ') center center/cover, '+player1Color);
						inner.css('background', `${player1Color}, url(${card.image}) center center/cover`);
					} else if (cardData[2] === player2) {
						// inner.css('background', 'url(' + card.image + ') center center/cover, '+player2Color);
						inner.css('background', `${player2Color}, url(${card.image}) center center/cover`);
					}

					// Clear any existing card values div
					inner.find('.tcg_base_player_card_values').remove();

					// Create the card values div and append it to the inner div
					let cardValuesDiv = $('<div>').addClass('tcg_base_player_card_values');

					let cardValueTop = $('<div>').addClass('tcg_base_player_card_value_top').text(cardData[1][0]);
					cardValuesDiv.append(cardValueTop);

					let cardValueLeft = $('<div>').addClass('tcg_base_player_card_value_left').text(cardData[1][1]);
					cardValuesDiv.append(cardValueLeft);

					/*bottom and right values are swapped in the game contract vs the erc721 side, don't ask why..*/
					let cardValueRight = $('<div>').addClass('tcg_base_player_card_value_right').text(cardData[1][3]);
					cardValuesDiv.append(cardValueRight);
					
					let cardValueBottom = $('<div>').addClass('tcg_base_player_card_value_bottom').text(cardData[1][2]);
					cardValuesDiv.append(cardValueBottom);

					inner.append(cardValuesDiv);
					inner.removeClass('open_slot'); // not an open slot 
				} else {
					console.error(`No image found for tokenId ${tokenId}`);
				}
			} else {
				// The slot is empty, so we'll clear any card image that might be there
				inner.css('background-image', '');
				inner.addClass('open_slot'); // indicate it's an open slot 
			}
		}
	}
	catch(e) {
		console.error(e); 
	}
}

/*	Finishes a gameId 
	This function is responsible for drawing the finalize screen inside a gameWindow 
	These games don't have any moves left on board, but the winner hasn't claimed their prize yet */
async function tcg_base_finishGame(gameId) {
    try {
		let $gameWindow = $(`#tcg_base_game_window_${gameId}`);
		
        $gameWindow.find('.current_turn').removeClass('current_turn'); // It's no one's turn now.. 
		$gameWindow.find('.samePlusNotif').remove(); // Just in case any remain
		
		console.log(`Card placed listeners before: ${cardPlacedListeners}`);
        unsubscribeFromCardPlacedOnBoard(gameId); // Stop listening for these events
		console.log(`Card placed listeners after: ${cardPlacedListeners}`);

        let isFinalized = await tcg_base_system.game.methods.finalized(gameId).call();

        // Continue only if the game is not finalized 
        if (!isFinalized) {
            // let gameDetails = tcg_base_games.gameDetails[gameId];
            let gameDetails = await tcg_base_system.game.methods.getGameDetails(gameId).call();
            // let gameWindow = $(`#tcg_base_game_window_${gameId}`);
            let gameWrapper = $gameWindow.find('.tcg_base_game_wrapper');

            // Check if the content has already been appended
            if (tcg_base_games.contentAppended[gameId]) {
                console.log("Game results window already appended, skipping...");
                return;
            }

            // Determine the winner 
            let player1Points = gameDetails[5];
            let player2Points = gameDetails[6];
            let result;
            if (player1Points > player2Points) {
                if (accounts[0].toLowerCase() === gameDetails[1].toLowerCase()) {
                    result = "You win!";
					tcg_base_audio['you_win'].play(); 
                } else if (accounts[0].toLowerCase() === gameDetails[2].toLowerCase()) {
                    result = "You lose...";
					tcg_base_audio['you_lose'].play(); 
                } else {
                    result = "Player 1 wins!";
                }
            } else if (player2Points > player1Points) {
                if (accounts[0].toLowerCase() === gameDetails[2].toLowerCase()) {
                    result = "You win!";
					tcg_base_audio['you_win'].play(); 
                } else if (accounts[0].toLowerCase() === gameDetails[1].toLowerCase()) {
                    result = "You lose...";
					tcg_base_audio['you_lose'].play();
                } else {
                    result = "Player 2 wins!";
                }
            } else {
                if (accounts[0].toLowerCase() === gameDetails[1].toLowerCase() || accounts[0].toLowerCase() === gameDetails[2].toLowerCase()) {
                    result = "It's a draw!";
					tcg_base_audio['draw'].play();
                } else {
                    result = "Player 1 and Player 2 drew!";
                }
            }

            let player1Label = (accounts[0].toLowerCase() === gameDetails[1].toLowerCase()) ? "You" : "Opponent";
            let player2Label = (accounts[0].toLowerCase() === gameDetails[2].toLowerCase()) ? "You" : "Opponent";

            // Wager and trade rule 
            let wager = gameDetails[9] > 0 ? `<span class="tcg_base_golden_text">${Number(web3.utils.fromWei(gameDetails[9])).toFixed(2)} VIDYA</span>` : 'N/A';
            let tradeRuleMap = ['One', 'Diff', 'Direct', 'All'];
            let tradeRule = tradeRuleMap[gameDetails[10]];

            // Get Starting Hands and create the HTML for them 
            let player1StartingHand = await tcg_base_system.game.methods.getStartingHand(gameDetails[1], gameId).call();
            let player2StartingHand = await tcg_base_system.game.methods.getStartingHand(gameDetails[2], gameId).call();
            let player1StartingHandUris = await tcg_base_fetchTokenUris(player1StartingHand);
            let player2StartingHandUris = await tcg_base_fetchTokenUris(player2StartingHand);

            // Get loser tokenIds 
            let loserTokenIds = [];
            if (result.includes("You win")) {
                loserTokenIds = (player1Label === "Opponent") ? player1StartingHand : player2StartingHand;
            } else if (result.includes("You lose")) {
                loserTokenIds = (player1Label === "You") ? player1StartingHand : player2StartingHand;
            }

            let boardData = gameDetails[0];
            let player1StartingHandHTML = createHandHTML(player1StartingHandUris, player1Color, tradeRule, boardData, loserTokenIds, player1Points, player2Points, result, gameDetails[1].toLowerCase(), gameDetails[2].toLowerCase());
            let player2StartingHandHTML = createHandHTML(player2StartingHandUris, player2Color, tradeRule, boardData, loserTokenIds, player1Points, player2Points, result, gameDetails[1].toLowerCase(), gameDetails[2].toLowerCase());

            let information = generateInformationString(gameDetails, result, accounts);

            let isDraw = result === "It's a draw!";
            let isWinner = result === "You win!";
			 
			/*	Show the finalize button when: 
				The game didn't end in a draw and the current user is the winner.
				The game ended in a draw and the current user is the original game creator. */
			let showButton = (!isDraw && isWinner) || (isDraw && accounts[0].toLowerCase() === gameDetails[1].toLowerCase());
			
			let { playerPfp, opponentPfp } = await getPfpsForPlayers(gameId, gameDetails[1], gameDetails[2]);

            let content = `
	<div class="tcg_base_game_modal flex-box col">
		<div class="tcg_base_game_modal_title">Game #${gameId} has ended.</div>
		<div class="tcg_base_game_modal_result">${result}</div>
		<div class="flex-box col tcg_base_modal_content_inner">
		
			<div class="tcg_base_game_modal_player1_wrapper flex-box">
				<div class="player1_label tcg_base_green_text_black_outline">${player1Label}</div>
				<div class="tcg_base_game_modal_player_wrapper flex-box space-between align-center">
					<div class="tcg_base_player_profile tcg_base_monitor_left flex-box col flex-center" data-address="${gameDetails[1]}">
						<div class="tcg_base_player_pfp" style="background: ${playerPfp}"></div>
						<div class="tcg_base_player_points"><span class="tcg_base_player1_points">${player1Points}</span></div>
					</div>
					<div class="flex-box">${player1StartingHandHTML}</div>
				</div>
			</div>	
			
			<div class="tcg_base_game_modal_player2_wrapper flex-box">
				<div class="player2_label tcg_base_green_text_black_outline">${player2Label}</div>
				<div class="tcg_base_game_modal_opponent_wrapper flex-box space-between align-center">
					<div class="tcg_base_opponent_profile tcg_base_monitor_left flex-box col flex-center" data-address="${gameDetails[2]}">
						<div class="tcg_base_opponent_pfp" style="background: ${opponentPfp}"></div>
						<div class="tcg_base_opponent_points" style="left: 5px;"><span class="tcg_base_player2_points">${player2Points}</span></div>
					</div>
					<div class="flex-box">${player2StartingHandHTML}</div>
				</div>
			</div>	
			
			<div class="flex-box col tcg_base_game_modal_finalize_wrapper flex-box col">
				<div class="tcg_base_game_modal_label">Finalize game</div>

				<div class="flex-box col tcg_base_blue_text">
					<div class="tcg_base_game_modal_row flex-box">
						<div>Trade rule:</div>
						<div>${tradeRule}</div>
					</div>
					<div class="tcg_base_game_modal_row flex-box">
						<div>Amount wagered:</div>
						<div>${wager}</div>
					</div>
					<div class="tcg_base_game_modal_row flex-box">
						<div>Information:</div>
						<div>${information}</div>
					</div>
				</div>
				
				<div class="flex-box full-width flex-end ${showButton ? '' : 'disabled'}">
					<div class="tcg_base_game_modal_finalizeButton tcg_base_green_text_black_outline agnosia_button_stone_hover agnosia_button_stone_click" data-traderule="${tradeRule}" data-gameid="${gameId}" data-isdraw="${isDraw}" data-loserTokenIds="${loserTokenIds.join(',')}" data-iswinner="${isWinner}">Finalize</div>
				</div>

			</div>
		</div>
	</div>		
				`;

            if (!tcg_base_games.contentAppended[gameId]) {
                gameWrapper.append(content);
                tcg_base_games.contentAppended[gameId] = true;
                console.log("Finish game ran");

                // Start listening for endgame events for gameId 
                listenForCollectWinnings(gameId);
            } else {
                console.log("Game results window already appended, skipping...");
            }

        } else {
            console.log(`gameId: ${gameId} is already finalized!`);
        }
    } catch (e) {
        console.error(e);
    }
}

/*	Creates the HTML code for starting hands for the finalize screen */
function createHandHTML(tokenUris, defaultColor, tradeRule, boardData, loserTokenIds, player1Points, player2Points, result, player1Address, player2Address) {
    let handHTML = '';

    for (const tokenUri of tokenUris) {
        const { image, attributes } = tokenUri;
        const topValue = attributes.find(attr => attr.trait_type === "Top").value;
        const leftValue = attributes.find(attr => attr.trait_type === "Left").value;
        const rightValue = attributes.find(attr => attr.trait_type === "Right").value;
        const bottomValue = attributes.find(attr => attr.trait_type === "Bottom").value;
        const tokenId = tokenUri.tokenId;
		const winCount = attributes.find(attr => attr.trait_type === "Win Count").value;
		const playedCount = attributes.find(attr => attr.trait_type === "Played Count").value;
		
		// DIRECT RULE TEST 
		// Haven't tested if this below works but is meant for "direct" tradeRule to show the color of the card who owns it on the board 
		// edit: maybe I have tested it already I honestly don't know any more 
		let cardColor = defaultColor;
		
        if (tradeRule === "Direct") {
            const cardOnBoard = boardData.find(card => card[0] === tokenId);
            if (cardOnBoard) {
                const ownerOnBoard = cardOnBoard[2]; // owner-on-board
                /*if (ownerOnBoard.toLowerCase() !== accounts[0].toLowerCase()) {
                    cardColor = (defaultColor === player1Color) ? player2Color : player1Color; // Determine color for this card
                }*/
				if (ownerOnBoard.toLowerCase() === player1Address) {
				  cardColor = player1Color;
				} else if (ownerOnBoard.toLowerCase() === player2Address) {
				  cardColor = player2Color;
				}
            }
        }
		
		let isWinner = result.includes("You win");
		
		// True when tokenId is a loser and tradeRule is either One or Diff (Direct and All don't require user selection) also checks for if user is winner 
		let canClick = loserTokenIds.includes(tokenId) && (tradeRule === "One" || tradeRule === "Diff") && isWinner;

        handHTML += `
        <div class="tcg_base_game_modal_card relative ${canClick ? 'tcg_base_game_modal_card_loser' : ''}" tokenId="${tokenId}" ${canClick ? 'onclick="tcg_base_loserCardClickHandler(this)"' : ''} style="background: ${cardColor}, url(${image}) center center/cover;" data-traderule="${tradeRule}" data-player1points="${player1Points}" data-player2points="${player2Points}">
			<div class="tcg_base_game_modal_card_values">
				<div class="tcg_base_game_modal_card_value_top">${topValue}</div>
				<div class="tcg_base_game_modal_card_value_left">${leftValue}</div>
				<div class="tcg_base_game_modal_card_value_right">${rightValue}</div>
				<div class="tcg_base_game_modal_card_value_bottom">${bottomValue}</div>
			</div>
			<div class="tcg_base_game_modal_card_stats flex-box col absolute bottom left right C64">
				<div class="flex-box space-between">
					<div>Wins</div>
					<div class="tcg_base_card_wincount">${winCount}</div>
				</div>
				<div class="flex-box space-between">
					<div>Plays</div>
					<div class="tcg_base_card_playcount">${playedCount}</div>
				</div>
			</div>
        </div>
        `;
    }

    return handHTML;
}

/* Function that handles clicks on cards from the losers hand 
   Only works for tradeRules "One" and "Diff" since these are the only rules where 
   user selection is necessary. */
function tcg_base_loserCardClickHandler(element) {
    let tokenId = element.getAttribute('tokenId');
    let tradeRule = element.getAttribute('data-traderule');
    let player1Points = parseInt(element.getAttribute('data-player1points'));
    let player2Points = parseInt(element.getAttribute('data-player2points'));
	
	let $gameWindow = $(element).closest('[id^=tcg_base_game_window_]'); // Get the game window 
    
    // Initialize the array if it doesn't exist
    if (!tcg_base_games.winnerSelectedCards) {
        tcg_base_games.winnerSelectedCards = [];
    }
    
    if (tradeRule === "One") {
        // Deselect all other cards
        $gameWindow.find('.tcg_base_game_modal_card_selected').removeClass('tcg_base_game_modal_card_selected');
        // Select the clicked card
        $(element).addClass('tcg_base_game_modal_card_selected');
        
        // Set the selected card's tokenId
        tcg_base_games.winnerSelectedCards = [tokenId];
    } else if (tradeRule === "Diff") {
        let pointDifference = Math.abs(player1Points - player2Points);
        let currentlySelected = $gameWindow.find('.tcg_base_game_modal_card_selected').length;

        // If this card is already selected, we can always deselect it
        if ($(element).hasClass('tcg_base_game_modal_card_selected')) {
            $(element).removeClass('tcg_base_game_modal_card_selected');
            // Remove the tokenId from the array
            const index = tcg_base_games.winnerSelectedCards.indexOf(tokenId);
            if (index > -1) {
                tcg_base_games.winnerSelectedCards.splice(index, 1);
            }
        } else {
            // Only allow selecting up to the point difference
            if (currentlySelected < pointDifference) {
                $(element).addClass('tcg_base_game_modal_card_selected');
                // Add the tokenId to the array
                tcg_base_games.winnerSelectedCards.push(tokenId);
            } else {
                error(`You can only select ${pointDifference} cards.`);
            }
        }
    }
	
	console.log('Winner selection: '+tcg_base_games.winnerSelectedCards); 
}

/*	This function generates the information string shown on the end game screen 
	This is basically just things like how many cards you or the opponent can claim etc. */
function generateInformationString(gameDetails, result, accounts) {
    const tradeRuleMap = ['One', 'Diff', 'Direct', 'All'];
    const tradeRule = tradeRuleMap[gameDetails[10]];
    let information = "";

    if (result.includes("You win")) { // Current user is the winner
        switch(tradeRule) {
            case 'One':
                information = "You can now claim one card from the opponent's hand.";
                break;
            case 'Diff':
                const diff = Math.abs(gameDetails[5] - gameDetails[6]);
                information = diff === 1 ? 
                    "You can now claim one card from the opponent's hand." :
                    `You can now claim ${diff} cards from the opponent's hand.`;
                break;
            case 'Direct':
                /*let capturedCount = 0;
                for (let i = 0; i < 9; i++) {
                    if (gameDetails[0][i][2].toLowerCase() === accounts[0].toLowerCase()) capturedCount++;
                }
                information = capturedCount === 1 ?
                    "You have captured one card from the board." :
                    `You have captured ${capturedCount} cards from the board.`;*/
				information = "All cards captured (in your color) are now yours."; 
                break;
            case 'All':
                information = "You have won all cards from the opponent's hand.";
                break;
        }
    } else if (result.includes("You lose")) { // Current user is the loser
        switch(tradeRule) {
            case 'One':
                information = "The opponent can now select one card from your hand.";
                break;
            case 'Diff':
                const diff = Math.abs(gameDetails[5] - gameDetails[6]);
                information = diff === 1 ?
                    "The opponent can now select one card from your hand." :
                    `The opponent can now select ${diff} cards from your hand.`;
                break;
            case 'Direct':
                /*let capturedCount = 0;
                for (let i = 0; i < 9; i++) {
                    if (gameDetails[0][i][2].toLowerCase() !== accounts[0].toLowerCase()) capturedCount++;
                }
                information = capturedCount === 1 ?
                    "The opponent has captured one card from the board." :
                    `The opponent has captured ${capturedCount} cards from the board.`;*/
				information = "All cards captured (in your color) are now yours."; 
                break;
            case 'All':
                information = "The opponent has won all cards from your hand.";
                break;
        }
    } else if (result.includes("It's a draw!") && tradeRule === "Direct") { // Handle draw in Direct 
		information = "All cards captured (in your color) are now yours."; 
	} else if (result.includes("It's a draw!")) { // Handle Draw only 
		information = "The game creator can finalize a match in Draw."; 
	}

    return information;
}

/*	Transaction to place a card on board 
	indexInHand position of card from hand 
	gameIndex the gameId 
	boardPosition the position on the board 
	cardElement the actual card element being placed 
	currentPlayer who is placing the card */
async function placeCardOnBoard(indexInHand, gameIndex, boardPosition, cardElement, currentPlayer) {
	try {
		let $gameWindow = $(`#tcg_base_game_window_${gameIndex}`);
		
		// Add the 'no-pointer-events' class to the appropriate player's hand and board
		if (currentPlayer === 'player1') {
			$gameWindow.find('.tcg_base_player_cards_list .tcg_base_player_card, .tcg_base_card_on_board_inner').addClass('no-pointer-events');
		} else if (currentPlayer === 'player2') {
			$gameWindow.find('.tcg_base_opponent_cards_list .tcg_base_player_card, .tcg_base_card_on_board_inner').addClass('no-pointer-events');
		} else {
			error('Current user is not a player in this game.');
			return;
		}
		
		await tcg_base_system.game.methods.placeCardOnBoard(indexInHand, gameIndex, boardPosition).send({from: accounts[0]})
		.on("transactionHash", function(hash) {
			notify('<div class="flex-box flex-center">Placing card on board...</div>');
		})
		.on("receipt", async function(receipt) {
			notify('<div class="flex-box flex-center">Card successfully placed!</div>');
			// Remove the 'no-pointer-events' class to the appropriate player's hand and board
			if (currentPlayer === 'player1') {
				$gameWindow.find('.tcg_base_player_cards_list .tcg_base_player_card, .tcg_base_card_on_board_inner').removeClass('no-pointer-events');
			} else if (currentPlayer === 'player2') {
				$gameWindow.find('.tcg_base_opponent_cards_list .tcg_base_player_card, .tcg_base_card_on_board_inner').removeClass('no-pointer-events');
			} else {
				error('Current user is not a player in this game.');
				return;
			}
			
			// Remove card from selected 
			delete tcg_base_games.gameSelectedCards[gameIndex]; 
			
			// Run the loop immediately 
			await tcg_base_gamesLoop();
		})
		.on("error", function(error, receipt) {
			// Remove the 'no-pointer-events' class to the appropriate player's hand and board
			if (currentPlayer === 'player1') {
				$gameWindow.find('.tcg_base_player_cards_list .tcg_base_player_card, .tcg_base_card_on_board_inner').removeClass('no-pointer-events');
			} else if (currentPlayer === 'player2') {
				$gameWindow.find('.tcg_base_opponent_cards_list .tcg_base_player_card, .tcg_base_card_on_board_inner').removeClass('no-pointer-events');
			}
			// error('There was an error processing the transaction.'); < apparently doesn't work? 
		})
	}
	catch(e) {
		console.error(e); 
	}
}

// Updates Player1 and Player2 hands during a gameplay 
async function tcg_base_openGameUpdateHands(gameId, gameWindow, gameDetails) {
    try {
        // Fetch tokenUris for both players (I assume we're doing this in every update so the lengths of hands stay up to date)
        let player1tokenUris = await tcg_base_fetchTokenUris(gameDetails[3]);
        let player2tokenUris = await tcg_base_fetchTokenUris(gameDetails[4]);

        // Keep track of these globally 
        tcg_base_games.gameTokenUris[gameId] = {
            player1tokenUris,
            player2tokenUris
        };

        // Hide all cards first
        gameWindow.find('.tcg_base_player_cards_list .tcg_base_player_card').addClass('hidden');
        gameWindow.find('.tcg_base_opponent_cards_list .tcg_base_player_card').addClass('hidden');

        // Remove the card selected class 
        // But only when it's not found in the selected card variable 
        // tcg_base_games.gameSelectedCards[gameId] holds the selected card for the current player
        gameWindow.find('.tcg_base_player_cards_list .tcg_base_player_card, .tcg_base_opponent_cards_list .tcg_base_player_card').each(function() {
            let tokenId = $(this).attr('tokenid');
            // Check if the tokenId does not match the actively selected card's tokenId
            if (!tcg_base_games.gameSelectedCards[gameId] || tokenId !== tcg_base_games.gameSelectedCards[gameId].tokenId) {
                $(this).removeClass('card_selected');
            }
        });

        // Update player1's hand
        for (let i = 0; i < player1tokenUris.length; i++) {
            let cardData = player1tokenUris[i];
            let cardDiv = gameWindow.find('.tcg_base_player_cards_list .tcg_base_player_card').eq(i);
            // cardDiv.css('background', 'url(' + cardData.image + ') center center/cover, ' + player1Color + '');
			cardDiv.css('background', `${player1Color}, url(${cardData.image}) center center/cover`); 
            cardDiv.attr('tokenId', cardData.tokenId);

            // Update card values
            cardDiv.find('.tcg_base_player_card_value_top').text(cardData.attributes.find(a => a.trait_type === 'Top').value);
            cardDiv.find('.tcg_base_player_card_value_left').text(cardData.attributes.find(a => a.trait_type === 'Left').value);
            cardDiv.find('.tcg_base_player_card_value_bottom').text(cardData.attributes.find(a => a.trait_type === 'Bottom').value);
            cardDiv.find('.tcg_base_player_card_value_right').text(cardData.attributes.find(a => a.trait_type === 'Right').value);

            cardDiv.removeClass('hidden');
        }

        // If no cards in hand hide them all (the last one)
        if (player1tokenUris.length === 0) {
            gameWindow.find('.tcg_base_player_cards_list .tcg_base_player_card').addClass('hidden');
        }

        // Update player 2's hand
        for (let i = 0; i < player2tokenUris.length; i++) {
            let cardData = player2tokenUris[i];
            let cardDiv = gameWindow.find('.tcg_base_opponent_cards_list .tcg_base_player_card').eq(i);
            // cardDiv.css('background', 'url(' + cardData.image + ') center center/cover, ' + player2Color + '');
			cardDiv.css('background', `${player2Color}, url(${cardData.image}) center center/cover`); 
            cardDiv.attr('tokenId', cardData.tokenId);

            // Update card values
            cardDiv.find('.tcg_base_player_card_value_top').text(cardData.attributes.find(a => a.trait_type === 'Top').value);
            cardDiv.find('.tcg_base_player_card_value_left').text(cardData.attributes.find(a => a.trait_type === 'Left').value);
            cardDiv.find('.tcg_base_player_card_value_bottom').text(cardData.attributes.find(a => a.trait_type === 'Bottom').value);
            cardDiv.find('.tcg_base_player_card_value_right').text(cardData.attributes.find(a => a.trait_type === 'Right').value);

            cardDiv.removeClass('hidden');
        }

        // If no cards in hand hide them all (the last one)
        if (player2tokenUris.length === 0) {
            gameWindow.find('.tcg_base_opponent_cards_list .tcg_base_player_card').addClass('hidden');
        }

        // Depending on which player the connected wallet is disable pointer events on the other players hand 
        // This disables pointer events on the opponents cards so you will never get to fiddle with them.
        accounts[0] == gameDetails[1] ? gameWindow.find(".tcg_base_opponent_cards_list .tcg_base_player_card").css("pointer-events", "none") : gameWindow.find(".tcg_base_player_cards_list .tcg_base_player_card").css("pointer-events", "none");
    } catch (e) {
        console.error(e);
    }
}

// UI function responsible for showing whose turn it is 
// let lastTurnState = null;
let lastTurnStates = {};
function tcg_base_openGameUpdateTurn(gameWindow, gameDetails) {
	let gameId = gameWindow.attr('id').split('_').pop();
	
    // Determine the current turn state
    let currentTurnState = gameDetails[7];

    // If the turn has changed and it's not the first time checking
    if (lastTurnStates[gameId] !== undefined && currentTurnState !== lastTurnStates[gameId]) {
        // If the turn has changed to the current player
        if ((currentTurnState && gameDetails[2] === accounts[0]) || (!currentTurnState && gameDetails[1] === accounts[0])) {
            // Play the ping sound
            tcg_base_audio.your_turn.play();
        }
    }

    // Update whose turn it is
    if (!gameDetails[7]) {
        gameWindow.find('.tcg_base_player_pfp').addClass('current_turn');
        gameWindow.find('.tcg_base_opponent_pfp').removeClass('current_turn');
        // If the current user is player1
        if (gameDetails[1] === accounts[0]) {
            // Enable pointer events for player1's cards and disable for player2's cards
            gameWindow.find(".tcg_base_player_cards_list .tcg_base_player_card").css("pointer-events", "auto");
            gameWindow.find(".tcg_base_opponent_cards_list .tcg_base_player_card").css("pointer-events", "none");
        } else {
            // Disable pointer events for both player1's and player2's cards
            gameWindow.find(".tcg_base_player_cards_list .tcg_base_player_card, .tcg_base_opponent_cards_list .tcg_base_player_card").css("pointer-events", "none");
        }
    } else {
        gameWindow.find('.tcg_base_opponent_pfp').addClass('current_turn');
        gameWindow.find('.tcg_base_player_pfp').removeClass('current_turn');
        // If the current user is player2
        if (gameDetails[2] === accounts[0]) {
            // Enable pointer events for player2's cards and disable for player1's cards
            gameWindow.find(".tcg_base_opponent_cards_list .tcg_base_player_card").css("pointer-events", "auto");
            gameWindow.find(".tcg_base_player_cards_list .tcg_base_player_card").css("pointer-events", "none");
        } else {
            // Disable pointer events for both player1's and player2's cards
            gameWindow.find(".tcg_base_player_cards_list .tcg_base_player_card, .tcg_base_opponent_cards_list .tcg_base_player_card").css("pointer-events", "none");
        }
    }

    // Update the last turn state
    // lastTurnState = currentTurnState;
	lastTurnStates[gameId] = currentTurnState;
}

/*	Transaction to collect winnings from gameId 
	tokenIds array of tokenIds to claim */
async function tcg_base_collectWinnings(gameId, tokenIds) { 
	try {
		await tcg_base_system.game.methods.collectWinnings(gameId, tokenIds).send({from: accounts[0]})
		.on('transactionHash', function(hash) {
			notify(`<div class="flex-box flex-center">Finalizing game #${gameId}</div>`);
		})
		.on('receipt', async function(receipt) {
			await tcg_base_open_tab("play", true);
			notify(`<div class="flex-box flex-center">Game #${gameId} has been finalized successfully!</div>`);
		})
		.on('error', function(error) {
			console.error(error); 
		})
	}
	catch(e) {
		console.error(e); 
	}
}





/*	EVENT SUBSCRIPTIONS */
let MAX_TRANSACTIONS = 100;
let processedTransactions = [];

function hasProcessedTransaction(transactionHash) {
    return processedTransactions.includes(transactionHash);
}

function addTransactionToQueue(transactionHash) {
    if (processedTransactions.length >= MAX_TRANSACTIONS) {
        processedTransactions.shift();  // Remove the oldest transactionHash
    }
    processedTransactions.push(transactionHash);
}

let gameCreatedListener = null;
let gameJoinedListener = null;
let gameCanceledEventListener = null; 
let cardPlacedListeners = new Map(); 
let endGameListeners = new Map(); 
let cardCapturedListeners = new Map(); 

function subscribeToGameInitialized() {
    let subscription = tcg_base_system.game.events.GameInitialized({
            fromBlock: 'latest'
        })
        .on('data', async function(event) {
			// https://github.com/web3/web3.js/issues/4010
            if (hasProcessedTransaction(event.transactionHash)) { return; }
            addTransactionToQueue(event.transactionHash);
			
            // Get the new gameId from the event  
            let newId = event.returnValues._gameId;
			
			// Get the friend 
			let friend = event.returnValues._friend;

            // Add newly found gameId to the global variable with all its game details
            let gameDetails = await tcg_base_system.game.methods.getGameDetails(newId).call();
            tcg_base_games.gameDetails[newId] = gameDetails;

            await tcg_base_fetchGamesWaitingPlayer();
            await tcg_base_loadGamesList(true);

			// Notify friend only or globally 
            if (friend.toLowerCase() !== '0x0000000000000000000000000000000000000000' && friend.toLowerCase() === accounts[0].toLowerCase()) {
                notify(`<div class="flex-box col flex-center"><div>New friend-only game created #${newId}!</div></div>`);
				tcg_base_audio['new_match_found'].play(); 
            } else if (friend.toLowerCase() === '0x0000000000000000000000000000000000000000') {
                notify(`<div class="flex-box col flex-center"><div>New game created #${newId}!</div></div>`);
				tcg_base_audio['new_match_found'].play(); 
            }
        })
        .on('error', function(e) {
            console.error(e);
        })

    gameCreatedListener = subscription;
    console.log(`Subscribed to GameInitialized event!`);
}

function unsubscribeFromGameInitialized() {
    if (gameCreatedListener) {
        gameCreatedListener.unsubscribe();
        gameCreatedListener = null;
		console.log(`Unsubscribed from GameInitialized event..`); 
    }
}

function subscribeToJoinedGame() {
    let subscription = tcg_base_system.game.events.JoinedGame({
            fromBlock: 'latest'
        })
        .on('data', async function(event) {
			// https://github.com/web3/web3.js/issues/4010
            if (hasProcessedTransaction(event.transactionHash)) { return; }
            addTransactionToQueue(event.transactionHash);			
			
            // Get gameId 
            let gameId = event.returnValues._gameId;
			
            await tcg_base_fetchGamesWaitingPlayer();
            await tcg_base_loadGamesList(true);

            // Check if current user is the creator of this game and notify them 
            let whoseGame = event.returnValues._whoseGame;
            if (accounts[0].toLowerCase() === whoseGame.toLowerCase()) {
				// Force update UI 
				await tcg_base_openGameUpdateUI(gameId);
				
				// Replace the cancel button because it's not being updated in the loop (likely due to gameIdExistsInEitherSet)
				$('.tcg_base_cancel_game_button[data-joingameid="' + gameId + '"]').replaceWith('<div class="tcg_base_open_game_button" data-joingameid="' + gameId + '">Open</div>');
				
				// Announce it 
				notify(`<div class="flex-box col flex-center"><div>A player has joined your game #${gameId}!</div></div>`);
            }
        })
        .on('error', function(e) {
            console.error(e);
        })

    gameJoinedListener = subscription;
    console.log(`Subscribed to JoinedGame event!`);
}

function unsubscribeFromJoinedGame() {
    if (gameJoinedListener) {
        gameJoinedListener.unsubscribe();
        gameJoinedListener = null;
		console.log(`Unsubscribed from JoinedGame event..`); 
    }
}

function subscribeToGameCanceled() {
    let subscription = tcg_base_system.game.events.GameCanceled({
            fromBlock: 'latest'
        })
        .on('data', async function(event) {
			// https://github.com/web3/web3.js/issues/4010
            if (hasProcessedTransaction(event.transactionHash)) { return; }
            addTransactionToQueue(event.transactionHash);
			
            let gameIndex = event.returnValues.gameIndex;
            let gameId = tcg_base_games.gamesNeedPlayer[gameIndex];

            await tcg_base_fetchGamesWaitingPlayer();
            await tcg_base_loadGamesList(true);

            console.log(`Game #${gameId} has been canceled..`);
        })
        .on('error', function(e) {
            console.error(e);
        })

    gameCanceledEventListener = subscription;
    console.log(`Subscribed to GameCanceled event!`);
}

function unsubscribeFromGameCanceled() {
    if (gameCanceledEventListener) {
        gameCanceledEventListener.unsubscribe();
        gameCanceledEventListener = null;
		console.log(`Unsubscribed from GameCanceled event..`); 
    }
}

function listenForCardPlacedOnBoard(gameId) {
		console.log(`%c Started listening for gameId ${gameId} for cardPlacedOnBoard`, 'color: green; background: black');
    if (cardPlacedListeners.has(gameId)) return;

    let subscription = tcg_base_system.game.events.CardPlacedOnBoard({
            filter: {
                gameIndex: gameId
            },
            fromBlock: 'latest'
        },
        (error, event) => {
            if (error) {
                console.error(error);
                return;
            }
			
			// If gameId is already finished, return 
			if(tcg_base_games.gameDetails[gameId][8]) {
				console.log(`Ignoring CardPlacedOnBoard event for gameId #${gameId} because it's finished..`); 
				return; 
			}

			// console.log(`%c Card placed in gameId ${gameId}`, 'color: yellow; background: black');
			
			// https://github.com/web3/web3.js/issues/4010
            if (hasProcessedTransaction(event.transactionHash)) { return; }
            addTransactionToQueue(event.transactionHash);

            // Useful information 
            let {
                _tokenId: tokenId,
                _gameIndex: gameIndex,
                _boardPosition: boardPosition,
                same,
                plus
            } = event.returnValues;

            // For the notification 	  
            let result = checkSameAndPlus(same, plus);
            let isSame = result.isSameTriggered;
            let isPlus = result.isPlusTriggered;
            if (isSame || isPlus) {
                animateSamePlusNotif(isSame, isPlus, gameIndex);
            }
			
			cardPlaceSound(); 
			
			if(isSame) {
				tcg_base_audio['same'].play();
			}
			
			if(isPlus) {
				tcg_base_audio['plus'].play();
			}
			
			// cardFlipSound(); needs an event fired from contract 

            // Force game loop to run here so the turns get updated etc. 
            // tcg_base_gamesLoop(); 

            // Force UI update 
            tcg_base_openGameUpdateUI(gameId);
        }
    );

    cardPlacedListeners.set(gameId, subscription);
    console.log(`Subscribed to CardPlacedOnBoard event for gameId #${gameId}`);
}

function unsubscribeFromCardPlacedOnBoard(gameId) {
    let subscription = cardPlacedListeners.get(gameId);
    if (subscription) {
        subscription.unsubscribe(function(error, success) {
            if (success) {
                cardPlacedListeners.delete(gameId);
                console.log(`Successfully unsubscribed from the CardPlacedOnBoard event for game ID ${gameId}.`);
            }
        });
    }
}

function unsubscribeFromAllCardPlacedOnBoard() {
    cardPlacedListeners.forEach((subscription, gameId) => {
        subscription.unsubscribe(function(error, success) {
            if (success) {
                console.log(`Successfully unsubscribed from the CardPlacedOnBoard event for game ID ${gameId}.`);
            }
        });
    });

    // Clear the listeners map
    cardPlacedListeners.clear();
}

function listenForCollectWinnings(gameId) {
    if (endGameListeners.has(gameId)) return;

    let subscription = tcg_base_system.game.events.CollectWinnings({
            filter: {
                gameIndex: gameId
            },
            fromBlock: 'latest'
        },
        async (error, event) => {
            if (error) {
                console.error(error);
                return;
            }

			// https://github.com/web3/web3.js/issues/4010
            if (hasProcessedTransaction(event.transactionHash)) { return; }
            addTransactionToQueue(event.transactionHash);

            // Return early if it's a draw OR tradeRule is Direct 
            if (event.returnValues.draw || tcg_base_games.gameDetails[gameId][10] == "2") {
                console.log(`It's a draw OR tradeRule is Direct.. no action! (just removing gameWindow)`);
                let gameWindow = $(`#tcg_base_game_window_${gameId}`);
                gameWindow.remove();
				let taskIcon = $(`.task[data=tcg_base_game_window_${gameId}]`);
				taskIcon.remove(); 
				await tcg_base_open_tab('play', true); 
				
                return;
            }

            // Get the prize details 
            let tokenIds = event.returnValues.prize;
            let tokenUris = await tcg_base_fetchTokenUris(tokenIds);

            // Convert bet amount from Wei to a more readable format
            let betAmount = Number(web3.utils.fromWei(event.returnValues.bet)).toFixed(2);
            let betMessage = betAmount > 0 ? ` and <span class="tcg_base_golden_text">${betAmount} VIDYA</span>` : '';

            let a, m;

            // Description of cards
            a = tokenIds.length > 1 ? 'the following cards' : 'this card';

            // If the current user is the winner
            if (accounts[0].toLowerCase() === event.returnValues.winner.toLowerCase()) {
                m = `Congratulations! <br> You have won ${a}${betMessage}.`;
                console.log(m);
            }
            // If the current user is the loser
            else if (accounts[0].toLowerCase() === event.returnValues.loser.toLowerCase()) {
                m = `You have lost ${a}${betMessage}. <br> Better luck next time!`;
                console.log(m);
            }
            // If the current user is neither winner nor loser
            else {
                console.log('Current player is neither winner nor loser.');
                return;
            }

            let title = `Game #${event.returnValues.gameId} finalized!`;
            let id = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1); // for close button 
            let content = ``;

            for (let i = 0; i < tokenUris.length; i++) {
                let level = parseInt(tokenUris[i].attributes.find(function(attr) {
                    return attr.trait_type === 'Level'
                }).value);
                let name = tokenUris[i].attributes.find(function(attr) {
                    return attr.trait_type === 'Name'
                }).value;
                let top = parseInt(tokenUris[i].attributes.find(function(attr) {
                    return attr.trait_type === 'Top'
                }).value);
                let left = parseInt(tokenUris[i].attributes.find(function(attr) {
                    return attr.trait_type === 'Left'
                }).value);
                let right = parseInt(tokenUris[i].attributes.find(function(attr) {
                    return attr.trait_type === 'Right'
                }).value);
                let bottom = parseInt(tokenUris[i].attributes.find(function(attr) {
                    return attr.trait_type === 'Bottom'
                }).value);

                let div = `<div style="background-image: url(${tokenUris[i].image}); background-size: cover;" class="tcg_base_modal_card relative">
				<div class="absolute top left C64" style="width: 30px; height: 40px; top: 4px; left: 8px; font-size: 140%;">
					<div class="absolute" style="left: 10px; top: 0">${top}</div>
					<div class="absolute" style="left: 0; top: 10px;">${left}</div>
					<div class="absolute" style="right: 0; top: 10px;">${right}</div>
					<div class="absolute" style="bottom: 0; left: 10px;">${bottom}</div>
				</div>
			</div>`;

                content = content + div;
            }

            let finalContent = `<div class="flex-box col flex-center full-height">
			<div class="C64" style="font-size: 200%; margin-bottom: 0.75rem; text-align: center;">${m}</div>
			<div class="flex-box" style="flex-wrap: wrap; justify-content: center;">${content}</div>
		</div>`;

            // Get the end game window 
            let target = $(`#tcg_base_game_window_${gameId} .tcg_base_game_modal`);

            let resultHTML = `<div class="tcg_base_modal_endgame" data="${id}">
	<div class="tcg_base_modal_header_endgame flex-box space-between flex-center">
		<div class="tcg_base_modal_header_title_endgame C64 uppercase">${title.toString()}</div>
		<div class="tcg_base_modal_close_button_endgame agnosia_button_stone_hover agnosia_button_stone_click" data="${id}">Close</div>
	</div>
	<div class="tcg_base_modal_body">
		${finalContent}
	</div>
</div>`;

            $(target).append(resultHTML);
			
			// Delete finalize button 
			$('.tcg_base_game_modal_finalizeButton[data-gameid="'+gameId+'"]').remove(); 
			
			await tcg_base_open_tab('play', true); 
			
            unsubscribeFromCollectWinnings(gameId);
        });

    endGameListeners.set(gameId, subscription);
    console.log(`Subscribed to CollectWinnings event for gameId #${gameId}`);
}

function unsubscribeFromCollectWinnings(gameId) {
    let subscription = endGameListeners.get(gameId);
    if (subscription) {
        subscription.unsubscribe(function(error, success) {
            if (success) {
                endGameListeners.delete(gameId);
                console.log(`Unsubscribed from the CollectWinnings event for game ID ${gameId}.`);
            }
        });
    }
}

function unsubscribeFromAllCollectWinnings() {
    endGameListeners.forEach((subscription, gameId) => {
        subscription.unsubscribe(function(error, success) {
            if (success) {
                console.log(`Successfully unsubscribed from all CollectWinnings events.`);
            }
        });
    });

    endGameListeners.clear();
}

/* Need to actually use this somewhere + create unsub functions for it too */
function listenForCardCaptured(gameId) {
    let subscription = tcg_base_system.game.events.CardCaptured({
            fromBlock: 'latest'
        })
        .on('data', async function(event) {
			// https://github.com/web3/web3.js/issues/4010
            if (hasProcessedTransaction(event.transactionHash)) { return; }
            addTransactionToQueue(event.transactionHash);
			
			let position = event.returnValues.boardPosition; 
			// let tokenId = event.returnValues.tokenId; 
			let $card = $(`.tcg_base_card_on_board[data="${position}"]`); 
			
			$card.addClass('flip'); 
			
			setTimeout(() => {
				$card.removeClass('flip');		
			}, 600); 

        })
        .on('error', function(e) {
            console.error(e);
        })

    cardCapturedListeners.set(gameId, subscription);
    console.log(`Subscribed to CardCaptured event!`);
}





// Handle multi upload UI side 
function tcg_base_handleMultiUpload(tokenId, clickedElement) {
    let tokenIds = tcg_base_player.selectedForMultiUpload;

    // Check if the tokenId is already in the array
    let index = tokenIds.indexOf(tokenId);

    if (index === -1) {
        // If not present, push it into the array and add the selected class
        tokenIds.push(tokenId);
        $(clickedElement).addClass('tcg_base_tokenIds_list_row_multiselect_selected');
    } else {
        // If present, remove it from the array and remove the selected class
        tokenIds.splice(index, 1);
        $(clickedElement).removeClass('tcg_base_tokenIds_list_row_multiselect_selected');
    }

    // Update the Upload button text
    let uploadButtonText = "Upload";
    if (tokenIds.length > 0) {
        $(".tcg_base_tokenId_deposit").removeClass("disabled"); 
    } else {
        $(".tcg_base_tokenId_deposit").addClass("disabled");
        // Reset selectedCardType when no cards are selected
        tcg_base_player.selectedCardType = null;
    }
    if (tokenIds.length > 1) {
        // uploadButtonText += ` (${tokenIds.length})`; // change button text count in brackets 
    }
    $(".tcg_base_tokenId_deposit").text(uploadButtonText);
	
	$(".tcg_base_tokenId_deposit").attr('data-count', tokenIds.length); // add count 
	
	let upPos = ( $(".tcg_base_tokenId_deposit").outerWidth() / 2 ) - ( ['width', 'paddingLeft', 'paddingRight', 'borderLeftWidth', 'borderRightWidth'].reduce((acc, prop) => acc + parseFloat(getComputedStyle(document.querySelector('.tcg_base_tokenId_deposit'), '::after')[prop]), 0) / 2 ); 
	
	document.querySelector('.tcg_base_tokenId_deposit').style.setProperty('--after-left', upPos + 'px');	
	
	// Update the Brew button text 
	let brewButtonText = "Brew"; 
    if (tokenIds.length > 0) {
        $(".tcg_base_tokenId_brew").removeClass("disabled"); 
    } else {
        $(".tcg_base_tokenId_brew").addClass("disabled");
        // Reset selectedCardType when no cards are selected
        tcg_base_player.selectedCardType = null;
    }
    if (tokenIds.length > 1) {
        // brewButtonText += ` (${tokenIds.length})`; // change button text count in brackets 
    }
    $(".tcg_base_tokenId_brew").text(brewButtonText);
	
	$(".tcg_base_tokenId_brew").attr('data-count', tokenIds.length); // add count
	
	let brewPos = ( $(".tcg_base_tokenId_brew").outerWidth() / 2 ) - ( ['width', 'paddingLeft', 'paddingRight', 'borderLeftWidth', 'borderRightWidth'].reduce((acc, prop) => acc + parseFloat(getComputedStyle(document.querySelector('.tcg_base_tokenId_brew'), '::after')[prop]), 0) / 2 ); 
	
	document.querySelector('.tcg_base_tokenId_brew').style.setProperty('--after-left', brewPos + 'px');
}

// Handle multi download UI side
function tcg_base_handleMultiDownload(tokenId, clickedElement) {
    let tokenIds = tcg_base_player.selectedForMultiDownload;

    // Check if the tokenId is already in the array
    let index = tokenIds.indexOf(tokenId);

    if (index === -1) {
        // If not present, push it into the array and add the selected class
        tokenIds.push(tokenId);
        $(clickedElement).addClass('tcg_base_tokenIds_list_row_multiselect_selected');
    } else {
        // If present, remove it from the array and remove the selected class
        tokenIds.splice(index, 1);
        $(clickedElement).removeClass('tcg_base_tokenIds_list_row_multiselect_selected');
    }

    // Check if all selected cards have been deselected
    if (tokenIds.length === 0) {
        tcg_base_player.selectedCardType = null;  // Reset the selected type
    }

    // Update the Download button text
    let downloadButtonText = "Download";
    if (tokenIds.length > 0) {
        $(".tcg_base_tokenId_withdraw").removeClass("disabled"); 
    } else {
        $(".tcg_base_tokenId_withdraw").addClass("disabled");
    }
    if (tokenIds.length > 1) {
        // downloadButtonText += ` (${tokenIds.length})`;
    }
    $(".tcg_base_tokenId_withdraw").text(downloadButtonText);
	
	$(".tcg_base_tokenId_withdraw").attr('data-count', tokenIds.length); // add count
	
	let downPos = ( $(".tcg_base_tokenId_withdraw").outerWidth() / 2 ) - ( ['width', 'paddingLeft', 'paddingRight', 'borderLeftWidth', 'borderRightWidth'].reduce((acc, prop) => acc + parseFloat(getComputedStyle(document.querySelector('.tcg_base_tokenId_withdraw'), '::after')[prop]), 0) / 2 ); 
	
	document.querySelector('.tcg_base_tokenId_withdraw').style.setProperty('--after-left', downPos + 'px');	
}

async function tcg_base_handleDepositForMultiUpload(selectedTokenIds) {
	try {
		// Is the game allowed to fiddle user's cards? 
		let approved = await tcg_base_system.card.methods.isApprovedForAll(accounts[0], tcg_base_system.game_address).call();
		if(!approved) {
			let title   = 'Approval needed';
			let id      = (((1+Math.random())*0x10000)|0).toString(16).substring(1);
			let content = '<div class="flex-box col flex-center full-width full-height C64 padding-1rem"><p class="margin-bottom-1rem">In order to proceed you need to approve your cards for transfer within our game smart contract. This is a one time transaction and will grant our game contract full access to your cards.</p><div class="tcg_base_approve_deposit_button tcg_base_green_text_black_outline agnosia_button_stone_hover agnosia_button_stone_click">Approve</div></div>'; 
			tcg_base_launch_modal(title, id, content);
			
			return; 
		}
		
		await tcg_base_system.game.methods.transferToDeck(selectedTokenIds).send({from: accounts[0]})
		.on('transactionHash', function(hash) {
			$('.tcg_base_tokenId_brew').addClass('disabled');
			notify(`<div class="flex-box flex-center">Uploading multiple cards..</div>`);
		})
		.on('receipt', function(receipt) {
			notify(`<div class="flex-box flex-center">Multiple cards upload was successful!</div>`);
			resetMultiUpload(); 
			tcg_base_open_tab('deck');
		})
		.on('error', function(error) {
			console.error(error); 
		})
	}
	catch(e) {
		console.error(e); 
	}
}

async function tcg_base_handleWithdrawForMultiDownload(selectedTokenIds) {
	try {
		await tcg_base_system.game.methods.transferFromDeck(selectedTokenIds).send({from: accounts[0]})
		.on('transactionHash', function(hash) {
			notify(`<div class="flex-box flex-center">Downloading multiple cards..</div>`);
		})
		.on('receipt', function(receipt) {
			notify(`<div class="flex-box flex-center">Multiple cards download was successful!</div>`);
			resetMultiDownload(); 
			tcg_base_open_tab('deck');
		})
		.on('error', function(error) {
			console.error(error); 
		})
	}
	catch(e) {
		console.error(e); 
	}
}

// Resets the Upload button and multi upload tokenIds array 
function resetMultiUpload() {
	tcg_base_player.selectedForMultiUpload = []; 
	tcg_base_player.selectedCardType = null; 
	$(".tcg_base_tokenId_deposit").addClass("disabled"); 
	$(".tcg_base_tokenId_deposit").text('Upload');
	$(".tcg_base_tokenIds_list_row_multiselect").removeClass("tcg_base_tokenIds_list_row_multiselect_selected");
	
	// For Brew 
	$(".tcg_base_tokenId_brew").text('Brew');
}

// Resets the Download button and multi download tokenIds array 
function resetMultiDownload() {
	tcg_base_player.selectedForMultiDownload = []; 
	tcg_base_player.selectedCardType = null; 
	$(".tcg_base_tokenId_withdraw").addClass("disabled"); 
	$(".tcg_base_tokenId_withdraw").text('Download');
	$(".tcg_base_tokenIds_list_row_multiselect").removeClass("tcg_base_tokenIds_list_row_multiselect_selected");
}

/* How to use:  
	const same = [true, false, true, false];
	const plus = [5, 5, 3, 4];
	const result = checkSameAndPlus(same, plus);
	console.log("Same rule triggered:", result.isSameTriggered); // Outputs true
	console.log("Plus rule triggered:", result.isPlusTriggered); // Outputs true
*/
function checkSameAndPlus(same, plus) {
  // Check for the "Same" rule
  const sameCount = same.filter(value => value === true).length;
  const isSameTriggered = sameCount >= 2;

  // Check for the "Plus" rule
  const isPlusTriggered = plus.some(value => parseInt(value) > 0);

  return {
    isSameTriggered,
    isPlusTriggered
  };
}

// Could play a sound here too.. 
function animateSamePlusNotif(isSame, isPlus, gameId) {
  let $gameWindow = $(`#tcg_base_game_window_${gameId}`);
  let $board = $gameWindow.find('.tcg_base_board');

  // Clear any existing notifications
  $gameWindow.find('.samePlusNotif').remove();

  let elem; 
  if (isSame) {
    elem = $('<div class="samePlusNotif">Same!</div>');
  } else if (isPlus) {
    elem = $('<div class="samePlusNotif">Plus!</div>');
  }

  // Append the element to the board
  $board.append(elem);

  elem.on('animationend', function() {
    $(this).remove();
  });
}

// UNIX Timestap handler (might work in main.js)
function timeAgo(unixTimestamp) {
  const timeDiff = Math.floor(Date.now() / 1000) - unixTimestamp; 
  const hours = Math.floor(timeDiff / 3600);
  const minutes = Math.floor(timeDiff % 3600 / 60);

  return hours > 0 ? `${hours} hours ago` : `${minutes} minutes ago`;
}

function forfeitTimeLeft(lastMove, forfeitTimer) {
  if(lastMove && forfeitTimer) {
	  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
	  const endTime = lastMove + forfeitTimer; // When the timer runs out
	  let timeLeft = endTime - currentTime; // Time left in seconds

	  if (timeLeft <= 0) {
		return "00:00:00"; // No time left
	  }

	  const hours = String(Math.floor(timeLeft / 3600)).padStart(2, '0');
	  const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, '0');
	  const seconds = String(timeLeft % 60).padStart(2, '0');

	  return `${hours}:${minutes}:${seconds}`;
  } else {
	  return `Loading...`; 
  }
}

function forfeitSecondsToLabel(seconds) {
  const mapping = {
    300: "5 minutes",
    900: "15 minutes",
    1800: "30 minutes",
    3600: "1 hour",
    43200: "12 hours",
    86400: "24 hours"
  };

  return mapping[seconds] || "Unknown";
}

// Cauldron 
async function tcg_base_loadCauldron() {
	try {
		await tcg_base_system.caul.methods.UIHelperForUser(accounts[0]).call().then(data => Object.assign(tcg_base_player.cauldron, {
			totalWeight: data.totalWeight,
			userWeight: data.userWeight,
			rewardsClaimed: data._rewardsClaimed,
			tokensClaimable: data._tokensClaimable
		}));
		await tcg_base_system.caul.methods.UIHelperForGeneralInformation().call().then(data => Object.assign(tcg_base_player.cauldronGlobal, {
			totalBurned: data._totalBurned,
			totalClaimed: data._totalClaimed
		}));

		let totalVidya = await VIDYA.methods.balanceOf(tcg_base_system.caul_address).call(); 
		
		// UI 
		$('.tcg_base_cauldron_userWeight').text(abbr(parseFloat(tcg_base_player.cauldron.userWeight), 1)); 
		$('.tcg_base_cauldron_totalClaimed').text(abbr(parseFloat(web3.utils.fromWei(tcg_base_player.cauldron.rewardsClaimed))), 1); 
		$('.tcg_base_cauldron_tokensClaimable').text(abbr(parseFloat(web3.utils.fromWei(tcg_base_player.cauldron.tokensClaimable))), 1); 
		$('.tcg_base_cauldron_totalWeight').text(abbr(parseFloat(tcg_base_player.cauldron.totalWeight)), 1); 
		$('.tcg_base_cauldron_totalBurned').text(abbr(parseFloat(tcg_base_player.cauldronGlobal.totalBurned)), 1);
		$('.tcg_base_cauldron_totalGlobalClaimed').text(abbr(parseFloat(web3.utils.fromWei(tcg_base_player.cauldronGlobal.totalClaimed))), 1); 		
		$('.tcg_base_cauldron_totalVidyaBalance').text(abbr(parseFloat(web3.utils.fromWei(totalVidya))), 1); 
		
		// Bubbles 
		tcg_base_audio['cauldron_slow'].play();
	}
	catch(e) {
		console.error(e); 
	}
}

let playbackData = {
	startingBlock: 10197483
}

async function playback(gameId) {
    try {
        playbackData[gameId] = {};
		playbackData[gameId].cardsPlaced = []; 
		playbackData[gameId].cardOwnership = {}; 
		playbackData[gameId].points = {
			creator: 5,
			opponent: 5
		};
				
		let gameDetails = await tcg_base_system.game.methods.getGameDetails(gameId).call();
		tcg_base_games.gameDetails[gameId] = gameDetails;

        const gameInitializedPromise = tcg_base_system.game.getPastEvents('GameInitialized', {
            filter: {_gameId: gameId},
            fromBlock: playbackData.startingBlock,
            toBlock: 'latest'
        }).then(async (gameInitializedEvents) => {
            if (gameInitializedEvents.length > 0) {
                const gameInitEvent = gameInitializedEvents[0];
                let tx = await web3.eth.getTransaction(gameInitEvent.transactionHash);
                let gameData = gameInitEvent.returnValues;
                playbackData[gameId].creator = tx.from;
                playbackData[gameId].creatorHand = gameData._tokenIdOfCardsToPlay;
                playbackData[gameId].wager = gameData._wager;
                playbackData[gameId].tradeRule = gameData._tradeRule;
                playbackData[gameId].timerRule = gameData.timerRule;
                return tcg_base_fetchTokenUris(playbackData[gameId].creatorHand);
            }
        });

        const joinedGamePromise = tcg_base_system.game.getPastEvents('JoinedGame', {
            filter: {_gameId: gameId},
            fromBlock: playbackData.startingBlock,
            toBlock: 'latest'
        }).then(async (joinedGameEvents) => {
            if (joinedGameEvents.length > 0) {
                const joinedGameEvent = joinedGameEvents[0];
                let opponentData = joinedGameEvent.returnValues;
                playbackData[gameId].opponent = opponentData._whoJoined;
                playbackData[gameId].opponentHand = opponentData._tokenIdOfCardsToPlay;
                return tcg_base_fetchTokenUris(playbackData[gameId].opponentHand);
            }
        });
		
		const cardPlacedPromise = tcg_base_system.game.getPastEvents('CardPlacedOnBoard', {
			filter: {_gameIndex: gameId},
			fromBlock: playbackData.startingBlock,
			toBlock: 'latest'
		}).then(async (cardPlacedEvents) => {
			if (cardPlacedEvents.length > 0) {
				for (const event of cardPlacedEvents) {
					let data = {
						tokenId: event.returnValues._tokenId,
						boardPosition: event.returnValues._boardPosition,
						same: event.returnValues.same,
						plus: event.returnValues.plus
					}
					playbackData[gameId].cardsPlaced.push(data);
				}
			}
		});
		
		const collectWinningsPromise = tcg_base_system.game.getPastEvents('CollectWinnings', {
			filter: {_gameId: gameId},
			fromBlock: playbackData.startingBlock,
			toBlock: 'latest'
		}).then(async (collectWinningsEvents) => {
			if (collectWinningsEvents.length > 0) {
				const collectWinningsEvent = collectWinningsEvents[0].returnValues;
				playbackData[gameId].winner = collectWinningsEvent.winner; 
				playbackData[gameId].loser = collectWinningsEvent.loser; 
				playbackData[gameId].prize = collectWinningsEvent.prize;
				playbackData[gameId].bet = collectWinningsEvent.bet; 
				playbackData[gameId].draw = collectWinningsEvent.draw; 
			}
		});
		
		/* i will do this later 
        let directCardsPromise = Promise.resolve(); // Default to resolved promise
        if (playbackData[gameId].tradeRule === '2') {
            directCardsPromise = // Fetch and process directCards
        } */

        // Using Promise.all to wait for both promises to resolve
        const [creatorUris, opponentUris] = await Promise.all([gameInitializedPromise, joinedGamePromise, cardPlacedPromise, collectWinningsPromise]);

        // Set the URIs after both promises have been resolved
        if (creatorUris) {
            playbackData[gameId].creatorUris = creatorUris;
        }
        if (opponentUris) {
            playbackData[gameId].opponentUris = opponentUris;
        }
		
		creatorUris.forEach(uri => {
			playbackData[gameId].cardOwnership[uri.tokenId] = 'creator';
		});
		
		// Extra check for opponent uris to make sure they even joined 
		if(opponentUris) {
			opponentUris.forEach(uri => {
				playbackData[gameId].cardOwnership[uri.tokenId] = 'opponent';
			});

			// Open the game window 
			await tcg_base_openGame(gameId, true); 
			
			let gameWindow = $(`#tcg_base_game_window_${gameId}`);
			
			// Update player hands  
			playbackBuildHands(gameWindow, playbackData[gameId].creatorUris, playbackData[gameId].opponentUris); 
			
			// Place cards on board 
			let cardSlots = gameWindow.find('.tcg_base_card_on_board');
			playbackPlaceCards(cardSlots, playbackData[gameId].creatorUris, playbackData[gameId].opponentUris, playbackData[gameId].cardsPlaced, gameId); 
			
		} else {
			console.error(`Game #${gameId} was canceled before the opponent could join.`);
			error(`Game #${gameId} was canceled before the opponent could join.`);
		}
		
    } catch (e) {
        console.error(e);
    }
}

function playbackBuildHands(gameWindow, creatorUris, opponentUris) {
    playbackSetupCards(gameWindow, creatorUris, '.tcg_base_player_cards_list', player1Color);
    opponentUris ? playbackSetupCards(gameWindow, opponentUris, '.tcg_base_opponent_cards_list', player2Color) : console.error('Cannot build opponent hand..');
}

function playbackSetupCards(gameWindow, cardUris, cardListClass, playerColor) {
    for (let i = 0; i < cardUris.length; i++) {
        let cardData = cardUris[i];
        let cardDiv = gameWindow.find(`${cardListClass} .tcg_base_player_card`).eq(i);

        cardDiv.css('background', `${playerColor}, url(${cardData.image}) center center/cover`);
        cardDiv.attr('tokenId', cardData.tokenId);

        ['Top', 'Left', 'Bottom', 'Right'].forEach(direction => {
            cardDiv.find(`.tcg_base_player_card_value_${direction.toLowerCase()}`).text(
                cardData.attributes.find(a => a.trait_type === direction).value
            );
        });

        cardDiv.removeClass('hidden');
		cardDiv.addClass('no-pointer-events'); 
    }
}

async function playbackPlaceCards(cardSlots, creatorUris, opponentUris, cardsPlaced, gameId) {
    try {
        let allUris = creatorUris.concat(opponentUris);

        for (let i = 0; i < cardsPlaced.length; i++) {
			let card = cardsPlaced[i];
            let boardPosition = parseInt(card.boardPosition, 10);
            let slot = $(cardSlots[boardPosition]); 
            let inner = slot.find('.tcg_base_card_on_board_inner');
            let cardDetails = allUris.find(uri => uri.tokenId === card.tokenId);

            if (cardDetails) {
                let backgroundColor = creatorUris.some(uri => uri.tokenId === card.tokenId) ? player1Color : player2Color;
                // console.log(`Card ${card.tokenId} is from ${backgroundColor === player1Color ? "creator's" : "opponent's"} hand.`);
                // inner.css('background', `url(${cardDetails.image}) center center/cover, ${backgroundColor}`);
				inner.css('background', `${backgroundColor}, url(${cardDetails.image}) center center/cover`);

                let cardValuesDiv = $('<div>').addClass('tcg_base_player_card_values');
                ['Top', 'Left', 'Right', 'Bottom'].forEach(position => {
                    let attribute = cardDetails.attributes.find(attr => attr.trait_type === position);
                    let cardValueDiv = $('<div>').addClass(`tcg_base_player_card_value_${position.toLowerCase()}`).text(attribute ? attribute.value : '');
                    cardValuesDiv.append(cardValueDiv);
                });
                inner.append(cardValuesDiv);
				inner.attr('tokenid', card.tokenId);
				
				// Determine the current player based on card ownership
				let currentPlayer = playbackData[gameId].cardOwnership[card.tokenId];
				let capturingPlayerColor = currentPlayer === 'creator' ? player1Color : player2Color;
				
                // Capture logic
                let captureOccurred = checkForCapture(boardPosition, cardDetails, cardSlots, allUris, capturingPlayerColor, gameId, currentPlayer);
                if (captureOccurred) {
                    // console.log(`Card ${card.tokenId} captured adjacent cards.`);
                }
            } else {
                // console.log(`Card ${card.tokenId} does not belong to either hand.`);
            }
			
			cardPlaceSound(); 
			
			$('.tcg_base_player_cards_list .tcg_base_player_card[tokenid="' + card.tokenId + '"]').remove();
			$('.tcg_base_opponent_cards_list .tcg_base_player_card[tokenid="' + card.tokenId + '"]').remove();
			
			if(i == cardsPlaced.length - 1) {
				notify(`<div class="flex-box flex-center">Game #${gameId} was finalized.</div>`);
			}

            // Wait for 2 seconds
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
    catch(e) {
        console.error(e);
    }
}

const spots = [
    [null, null, 3, 1],  // Position 0
    [null, 0, 4, 2],     // Position 1
    [null, 1, 5, null],  // Position 2
    [0, null, 6, 4],     // Position 3
    [1, 3, 7, 5],        // Position 4
    [2, 4, 8, null],     // Position 5
    [3, null, null, 7],  // Position 6
    [4, 6, null, 8],     // Position 7
    [5, 7, null, null]   // Position 8
];

function getAdjacentPositions(position) {
    return spots[position].filter(adjacent => adjacent !== null);
}

function checkForCapture(position, cardDetails, cardSlots, allUris, capturingPlayerColor, gameId, currentPlayer, practiceMode = false) { 
	// console.log(position, cardDetails, cardSlots, allUris, capturingPlayerColor, gameId, currentPlayer, practiceMode); 
	let gameData = practiceMode ? practiceData : playbackData;

    let adjacentPositions = getAdjacentPositions(position); 
    let captureOccurred = false;
    let sameSides = [];
    let sums = {};

    // First loop to gather data for Same and Plus rule checks
    for (let adjPosition of adjacentPositions) {
        let adjSlot = $(cardSlots[adjPosition]); 
		
		if (!adjSlot || adjSlot.is(':empty')) {
			continue;
		}

        let adjCardDetails = getCardDetailsFromSlot(adjSlot, allUris);
        if (!adjCardDetails) continue;

        let direction = getDirectionFromCurrentToAdjacent(position, adjPosition);
        let oppositeDirection = { 'Top': 'Bottom', 'Bottom': 'Top', 'Left': 'Right', 'Right': 'Left' }[direction];

        let cardPower = getCardPower(cardDetails, direction); 
        let adjCardPower = getCardPower(adjCardDetails, oppositeDirection);
		
		// console.log(`cardPower: ${cardPower}; adjCardPower: ${adjCardPower}`); <- these are correct 
		// console.log(`position: ${position}; adjPosition: ${adjPosition}`); <- these are correct 

        // Store sides and positions for Same rule
        if (cardPower === adjCardPower) {
            sameSides.push(adjPosition);
        }

        // Calculate and store sums and positions for Plus rule
        let sum = cardPower + adjCardPower;
        if (!sums[sum]) sums[sum] = [];
        sums[sum].push(adjPosition);		

		// Normal capture logic
		if (cardPower > adjCardPower && gameData[gameId].cardOwnership[adjCardDetails.tokenId] !== currentPlayer) {
			captureCard(cardSlots, adjPosition, adjCardDetails, capturingPlayerColor, gameId, currentPlayer, gameData);
			captureOccurred = true;
			
			cardFlipSound(); 
		}

    }
	
    // Log sums and sides for Same and Plus rules
    // console.log(`Same Sides:`, sameSides);
    // console.log(`Sums for Plus rule:`, sums);	

    let sameTriggered = sameSides.length > 1;

    let plusTriggered = Object.values(sums).some(pair => pair.length > 1);

    // Handle captures for the "Same" rule
    if (sameTriggered) {
        sameSides.forEach(capturedPosition => {
            let capturedSlot = $(cardSlots[capturedPosition]);
            let capturedCardDetails = getCardDetailsFromSlot(capturedSlot, allUris);
            if (capturedCardDetails && gameData[gameId].cardOwnership[capturedCardDetails.tokenId] !== currentPlayer) {
                captureCard(cardSlots, capturedPosition, capturedCardDetails, capturingPlayerColor, gameId, currentPlayer, gameData);
				animateSamePlusNotif(sameTriggered, plusTriggered, gameId); 
                captureOccurred = true;
				
				tcg_base_audio['same'].play(); 
            }
        });
    }

    // Handle captures for the "Plus" rule
    /*if (plusTriggered) {
        Object.values(sums).forEach(positions => {
            positions.forEach(capturedPosition => {
                let capturedSlot = $(cardSlots[capturedPosition]);
                let capturedCardDetails = getCardDetailsFromSlot(capturedSlot, allUris);
                if (capturedCardDetails && gameData[gameId].cardOwnership[capturedCardDetails.tokenId] !== currentPlayer) {
                    captureCard(cardSlots, capturedPosition, capturedCardDetails, capturingPlayerColor, gameId, currentPlayer, gameData);
                    captureOccurred = true;
                }
            });
        });
    }*/
	
	// Handle captures for the "Plus" rule
	if (plusTriggered) {
		// Iterate over each sum value to check for successful Plus captures
		Object.entries(sums).forEach(([sum, positions]) => {
			// Check if there are multiple positions sharing the same sum (successful Plus rule)
			if (positions.length > 1) {
				// Capture cards only at positions part of the successful Plus rule
				positions.forEach(capturedPosition => {
					let capturedSlot = $(cardSlots[capturedPosition]);
					let capturedCardDetails = getCardDetailsFromSlot(capturedSlot, allUris);
					if (capturedCardDetails && gameData[gameId].cardOwnership[capturedCardDetails.tokenId] !== currentPlayer) {
						captureCard(cardSlots, capturedPosition, capturedCardDetails, capturingPlayerColor, gameId, currentPlayer, gameData);
						animateSamePlusNotif(sameTriggered, plusTriggered, gameId); 
						captureOccurred = true;
						
						tcg_base_audio['plus'].play(); 
					}
				});
			}
		});
	}	

    return captureOccurred;
}

function captureCard(cardSlots, position, cardDetails, capturingPlayerColor, gameId, currentPlayer, gameData) {
    let capturedTokenId = cardDetails.tokenId;
    let previousOwner = gameData[gameId].cardOwnership[capturedTokenId];

    // Update points if card is captured from opponent
    if (previousOwner !== currentPlayer) {
        gameData[gameId].points[currentPlayer]++;
        gameData[gameId].points[previousOwner]--;
        updatePointsUI(gameId, gameData); 
    }

    // Update the ownership in the gameData
    gameData[gameId].cardOwnership[capturedTokenId] = currentPlayer;
	
	let cardElement = $(cardSlots[position]).find('.tcg_base_card_on_board_inner');

	// Flip animate 
	$('.tcg_base_card_on_board_inner').each(function() {
		if ($(this).attr('tokenid') === capturedTokenId) {
			$(this).closest('.tcg_base_card_on_board').addClass('flip');
		}
	});

	setTimeout(() => {
		$('.tcg_base_card_on_board').removeClass('flip');
		
		// Directly change the background color of the captured card
		let newBackground = `${capturingPlayerColor}, url("${cardDetails.image}") center center / cover`; 
		cardElement.css('background', newBackground);		
	}, 600); // Match CSS animation 

}

function updatePointsUI(gameId, gameData) {
    // Update the points display in the UI
    $('.tcg_base_player1_points').text(gameData[gameId].points['creator']); 
    $('.tcg_base_player2_points').text(gameData[gameId].points['opponent']); 
}

function getCardPower(cardDetails, direction) {
    const attribute = cardDetails.attributes.find(attr => attr.trait_type === direction);
    return attribute ? parseInt(attribute.value, 10) : null;
}

function getCardDetailsFromSlot(slot, allUris) {
    // Find the 'inner' element within the slot that has the 'tokenid' attribute
    let inner = slot.find('.tcg_base_card_on_board_inner');
    let tokenId = inner.attr('tokenid');

    // If the tokenId is not found or undefined, return null
    if (!tokenId) return null;

    // Find the card details in the allUris array using the tokenId
    let cardDetails = allUris.find(uri => uri.tokenId === tokenId);
	
    return cardDetails;
}

function getDirectionFromCurrentToAdjacent(currentPosition, adjacentPosition) {
    const directionIndex = spots[currentPosition].indexOf(adjacentPosition);
    const directionMap = ['Top', 'Left', 'Bottom', 'Right'];

    const direction = directionMap[directionIndex];
    return direction;
}



/* Practice mode */
let practiceData = {};

async function practice() {
	try {
		if(tcg_base_player.selectedAvailableCards.length == 5) {
			
			// Loading practice mode 
			$('.tcg_base_main_wrapper').css('opacity', '0'); 
			$('#tcg_base_loading_screen').css('display', 'flex'); 

			let gameId = Math.floor(Math.random() * 1e4).toString();
			
			practiceData[gameId] = {};
			practiceData[gameId].cardsPlaced = []; 
			practiceData[gameId].cardOwnership = {}; 
			practiceData[gameId].points = {
				creator: 5,
				opponent: 5
			};
			
			practiceData[gameId].allUris = {}; 
			
			let opponentHand = [];
			let generatedIds = new Set();
			
			// How many templates have been added 
			let templateLength = await tcg_base_system.card.methods.templateLength().call(); 
			
			while (generatedIds.size < 5) {
				let randomTemplateId = Math.floor(Math.random() * templateLength) + 1;
				generatedIds.add(randomTemplateId);
			}

			for (let templateId of generatedIds) {
				try {
					let cardDetails = await tcg_base_system.card.methods.template(templateId).call();
					opponentHand.push(cardDetails);
				} catch (err) {
					console.error("Error fetching card details for template ID:", templateId, err);
				}
			}
			
			// Get player's URIs from their available deposited URIs 
			practiceData[gameId].creatorUris = tcg_base_player.selectedAvailableCards.map(tokenId => tcg_base_player.depositedUsableTokenUris.find(card => card.tokenId === tokenId)).filter(card => card !== undefined);
			
			// Set their ownership on board as creator / opponent 
			practiceData[gameId].creatorUris.forEach(uri => {
				practiceData[gameId].cardOwnership[uri.tokenId] = 'creator';
			});	
			
			// Restructure opponentHand for consistency (because we aren't calling tokenUri from chain)
			opponentHand = opponentHand.map(card => {
				return {
					name: card.name,
					description: card.description,
					image: card.imageURL,
					attributes: [
						{ trait_type: "Name", value: card.name },
						{ trait_type: "Level", value: card.level },
						{ trait_type: "Top", value: card.top === "10" ? "A" : card.top },
						{ trait_type: "Left", value: card.left === "10" ? "A" : card.left },
						{ trait_type: "Right", value: card.right === "10" ? "A" : card.right },
						{ trait_type: "Bottom", value: card.bottom === "10" ? "A" : card.bottom }
					],
					
					// Generate pseudo tokenId for the opponent 
					tokenId: Math.floor(Math.random() * 1e12).toString()
				};
			});
			
			practiceData[gameId].opponentUris = opponentHand; 
			
			// Set their ownership on board as creator / opponent 
			practiceData[gameId].opponentUris.forEach(uri => {
				practiceData[gameId].cardOwnership[uri.tokenId] = 'opponent';
			});	
			
			// Keep track of these globally, maybe not needed?? 
			tcg_base_games.gameTokenUris[gameId] = {
				player1tokenUris: practiceData[gameId].creatorUris,
				player2tokenUris: practiceData[gameId].opponentUris
			};
			
			// Here too 
			practiceData[gameId].allUris = practiceData[gameId].creatorUris.concat(practiceData[gameId].opponentUris);

			// Open the game window 
			let tradeRuleMap = ['One', 'Diff', 'Direct', 'All'];
			let tradeRule = tradeRuleMap[$(".tcg_base_traderule_select.selected").attr("data-traderule")];
			
			practiceData[gameId].tradeRule = tradeRule; // prob. not important for practice mode.
			
			// Clones the template gameWindow from index.html 
			let cloned = $("#tcg_base_game_window").clone();
			let newId = `tcg_base_game_window_${gameId}`;
			cloned.attr('id', newId);
			cloned.attr('data', newId); 
			cloned.find('.tcg_base_gameIndex').text(gameId);
			cloned.find('.tcg_base_wagerAmount').text('N/A');
			cloned.find('.tcg_base_tradeRule').text(tradeRule); 
			
			let { playerPfp, opponentPfp } = await getPfpsForPlayers(gameId, accounts[0], '0x0000000000000000000000000000000000000000');
			
			// Update the profiles 
			cloned.find('.tcg_base_player_pfp').css('background', playerPfp); 
			cloned.find('.tcg_base_player_profile').attr('data-address', accounts[0]);
			cloned.find('.tcg_base_opponent_pfp').css('background', 'url('+blockies.create({seed: '0x0000000000000000000000000000000000000000'.toLowerCase()}).toDataURL()+')'); 
			cloned.find('.tcg_base_opponent_profile').attr('data-address', '0x0000000000000000000000000000000000000000');
			cloned.find('.tcg_base_opponent_profile').addClass('no-pointer-events'); 
			
			audio.open.play(); 
			cloned.appendTo('#desk'); 
			
			showContent(newId); // Opens the executable window 

			let gameWindow = $(`#tcg_base_game_window_${gameId}`);
			
			// Make it draggable 
			makeDraggable(gameWindow); 
			
			tcg_base_games.openGames.add(gameId); // Tracks open game windows 
			
			gameWindow.find('.tcg_base_player1_points').text('5'); 
			gameWindow.find('.tcg_base_player2_points').text('5'); 			

			// Draw creator and opponent hands 
			// Hide all cards first
			gameWindow.find('.tcg_base_player_cards_list .tcg_base_player_card').addClass('hidden');
			gameWindow.find('.tcg_base_opponent_cards_list .tcg_base_player_card').addClass('hidden');

			// Remove the card selected class 
			// But only when it's not found in the selected card variable 
			// tcg_base_games.gameSelectedCards[gameId] holds the selected card for the current player
			gameWindow.find('.tcg_base_player_cards_list .tcg_base_player_card, .tcg_base_opponent_cards_list .tcg_base_player_card').each(function() {
				let tokenId = $(this).attr('tokenid');
				// Check if the tokenId does not match the actively selected card's tokenId
				if (!tcg_base_games.gameSelectedCards[gameId] || tokenId !== tcg_base_games.gameSelectedCards[gameId].tokenId) {
					$(this).removeClass('card_selected');
				}
			});

			// Update player1's hand
			for (let i = 0; i < practiceData[gameId].creatorUris.length; i++) {
				let cardData = practiceData[gameId].creatorUris[i];
				let cardDiv = gameWindow.find('.tcg_base_player_cards_list .tcg_base_player_card').eq(i);
				// cardDiv.css('background', 'url(' + cardData.image + ') center center/cover, ' + player1Color + '');
				cardDiv.css('background', '' + player1Color + ', url(' + cardData.image + ') center center/cover');
				cardDiv.attr('tokenId', cardData.tokenId);
				cardDiv.addClass('practice');

				// Update card values
				cardDiv.find('.tcg_base_player_card_value_top').text(cardData.attributes.find(a => a.trait_type === 'Top').value);
				cardDiv.find('.tcg_base_player_card_value_left').text(cardData.attributes.find(a => a.trait_type === 'Left').value);
				cardDiv.find('.tcg_base_player_card_value_bottom').text(cardData.attributes.find(a => a.trait_type === 'Bottom').value);
				cardDiv.find('.tcg_base_player_card_value_right').text(cardData.attributes.find(a => a.trait_type === 'Right').value);

				cardDiv.removeClass('hidden');
			}

			// If no cards in hand hide them all (the last one)
			if (practiceData[gameId].creatorUris.length === 0) {
				gameWindow.find('.tcg_base_player_cards_list .tcg_base_player_card').addClass('hidden');
			}

			// Update player 2's hand
			for (let i = 0; i < practiceData[gameId].opponentUris.length; i++) {
				let cardData = practiceData[gameId].opponentUris[i];
				let cardDiv = gameWindow.find('.tcg_base_opponent_cards_list .tcg_base_player_card').eq(i);
				// cardDiv.css('background', 'url(' + cardData.image + ') center center/cover, ' + player2Color + '');
				cardDiv.css('background', '' + player2Color + ', url(' + cardData.image + ') center center/cover');
				cardDiv.attr('tokenId', cardData.tokenId);

				// Update card values
				cardDiv.find('.tcg_base_player_card_value_top').text(cardData.attributes.find(a => a.trait_type === 'Top').value);
				cardDiv.find('.tcg_base_player_card_value_left').text(cardData.attributes.find(a => a.trait_type === 'Left').value);
				cardDiv.find('.tcg_base_player_card_value_bottom').text(cardData.attributes.find(a => a.trait_type === 'Bottom').value);
				cardDiv.find('.tcg_base_player_card_value_right').text(cardData.attributes.find(a => a.trait_type === 'Right').value);

				cardDiv.removeClass('hidden');
			}

			// If no cards in hand hide them all (the last one)
			if (practiceData[gameId].opponentUris.length === 0) {
				gameWindow.find('.tcg_base_opponent_cards_list .tcg_base_player_card').addClass('hidden');
			}

			// Disable opponent cards pointer events 
			gameWindow.find(".tcg_base_opponent_cards_list .tcg_base_player_card").css("pointer-events", "none"); 
			
			// Create empty slots 
			let cardSlots = gameWindow.find('.tcg_base_card_on_board');
			for (let i = 0; i < cardSlots.length; i++) {
				let slot = $(cardSlots[i]);
				let inner = slot.find('.tcg_base_card_on_board_inner');
				inner.css('background-image', '');
				inner.addClass('open_slot');
				inner.addClass('practice'); 
			}

			// Finish loading practice mode 
			$('.tcg_base_main_wrapper').css('opacity', '1'); 
			$('#tcg_base_loading_screen').css('display', 'none'); 	
		} else {
			error(`You must select 5 cards to play with`);
		}
	}
	catch(e) {
		console.error(e); 
	}
}

function practicePlaceCard(gameId, slotId, cardElement) {
	let gameWindow = $(`#tcg_base_game_window_${gameId}`);
	let tokenId    = $(cardElement).attr('tokenid');
	// let allUris    = practiceData[gameId].creatorUris.concat(practiceData[gameId].opponentUris);
	let allUris    = practiceData[gameId].allUris; 
	let inner      = gameWindow.find($('.tcg_base_card_on_board[data='+slotId+'] > .tcg_base_card_on_board_inner'));
	let cardSlots  = gameWindow.find('.tcg_base_card_on_board');
	
	// Remove the card from hand 
	gameWindow.find(`.tcg_base_player_cards_list .tcg_base_player_card[tokenid="${tokenId}"]`).remove();
	
	// Delete it from selected, right? 
	delete tcg_base_games.gameSelectedCards[gameId]; 
	// how to get index > practiceData[gameId].creatorUris.splice(index, 1); // remove the card from creator's hand 
	
    // Place the card on the board
    practiceData[gameId].cardsPlaced.push({
        tokenId: tokenId,
        boardPosition: slotId
    });
	
	cardPlaceSound(); 
	
	let cardDetails = allUris.find(uri => uri.tokenId === tokenId);

	if (cardDetails) {
		let backgroundColor = practiceData[gameId].creatorUris.some(uri => uri.tokenId === tokenId) ? player1Color : player2Color;
		// console.log(`Card ${tokenId} is from ${backgroundColor === player1Color ? "creator's" : "opponent's"} hand.`);
		inner.css('background', `${backgroundColor}, url(${cardDetails.image}) center center/cover`);

		let cardValuesDiv = $('<div>').addClass('tcg_base_player_card_values');
		['Top', 'Left', 'Right', 'Bottom'].forEach(position => {
			let attribute = cardDetails.attributes.find(attr => attr.trait_type === position);
			let cardValueDiv = $('<div>').addClass(`tcg_base_player_card_value_${position.toLowerCase()}`).text(attribute ? attribute.value : '');
			cardValuesDiv.append(cardValueDiv);
		});
		inner.append(cardValuesDiv);
		inner.attr('tokenid', tokenId);
		inner.removeClass('open_slot'); 
		
		// Determine the current player based on card ownership
		let currentPlayer = practiceData[gameId].cardOwnership[tokenId];
		let capturingPlayerColor = currentPlayer === 'creator' ? player1Color : player2Color;
		let boardPosition = practiceData[gameId].cardsPlaced.find(slot => slot.tokenId === tokenId)?.boardPosition;
		
		// Capture logic
		let captureOccurred = checkForCapture(boardPosition, cardDetails, cardSlots, allUris, capturingPlayerColor, gameId, currentPlayer, true);	
	}

	$('.tcg_base_player_cards_list > .tcg_base_player_card').addClass('no-pointer-events'); 

	// Bot places card 2s later 
	setTimeout(function() {
		practicePlaceCardBot(gameId, gameWindow, allUris); 
		$('.tcg_base_player_cards_list > .tcg_base_player_card').removeClass('no-pointer-events'); 
	}, 2000); 
}

function practicePlaceCardBot(gameId, gameWindow, allUris) {
	let oppUris = practiceData[gameId].opponentUris; // get opponent uris 
	let   index = Math.floor(Math.random() * oppUris.length); // random number 
	let oppCard = oppUris[index]; // choose a random card 
	let tokenId = oppCard.tokenId; // get tokenId 

	// Get all slots  
	let cardSlots = gameWindow.find('.tcg_base_card_on_board');

	// Filter to get only card slots with an open slot
	let openCardSlots = cardSlots.filter(function() {
		return $(this).find('.tcg_base_card_on_board_inner.open_slot').length > 0;
	});
	
	// Extract slot IDs from open slots
	let openSlotIds = openCardSlots.map(function() {
		return $(this).attr('data');
	}).get(); // Convert to a regular array	

	// Check open slots 
	if (openCardSlots.length === 0) {
		let msg;
		if (practiceData[gameId].points.creator > practiceData[gameId].points.opponent) {
			msg = `<div class="flex-box col flex-center"><div class="win_lose_title">You win!</div><div class="win_lose_button agnosia_button_stone_hover agnosia_button_stone_click close_button">Again</div></div>`;
			tcg_base_audio['you_win'].play(); 
		} else if (practiceData[gameId].points.creator < practiceData[gameId].points.opponent) {
			msg = `<div class="flex-box col flex-center"><div class="win_lose_title">You lose...</div><div class="win_lose_button agnosia_button_stone_hover agnosia_button_stone_click close_button">Again</div></div>`;
			tcg_base_audio['you_lose'].play(); 
		} else {
			msg = `<div class="flex-box col flex-center"><div class="win_lose_title">Draw</div><div class="win_lose_button agnosia_button_stone_hover agnosia_button_stone_click close_button">Again</div></div>`;
			tcg_base_audio['draw'].play(); 
		}
		
		// Fade out table 
		gameWindow.find('.tcg_table_bg').append(`<div class="dark_overlay"></div>`);
		
		gameWindow.append(`<div class="youwinlose">${msg}</div>`);

		return;
	}

	let rnd = Math.floor(Math.random() * openSlotIds.length);
	let chosenSlotId = openSlotIds[rnd];

	// Find the slot element with the chosen ID
	let chosenSlot = cardSlots.filter(`[data="${chosenSlotId}"]`);
	
	cardPlaceSound();
	
	// Place the card on the board
	practiceData[gameId].cardsPlaced.push({
		tokenId: tokenId,
		boardPosition: chosenSlotId
	});
	
	let slot = practiceData[gameId].cardsPlaced.find(slot => slot.tokenId === tokenId)?.boardPosition;
	let inner; 
	if (slot !== undefined) {
		inner = gameWindow.find(`.tcg_base_card_on_board[data="${slot}"] > .tcg_base_card_on_board_inner`);
	}
	
	// Remove from hand 
	practiceData[gameId].opponentUris.splice(index, 1); // remove the card from opponent's hand 
	gameWindow.find(`.tcg_base_opponent_cards_list .tcg_base_player_card[tokenid="${tokenId}"]`).remove(); // remove visual rep. of the card as well 

	// Place on board  
	// let backgroundColor = practiceData[gameId].opponentUris.some(uri => uri.tokenId === tokenId) ? player2Color : player1Color;
	let backgroundColor = practiceData[gameId].creatorUris.some(uri => uri.tokenId === tokenId) ? player1Color : player2Color;

	// console.log(`Card ${tokenId} is from ${backgroundColor === player1Color ? "creator's" : "opponent's"} hand.`);
	inner.css('background', `${backgroundColor}, url(${oppCard.image}) center center/cover`);

	let cardValuesDiv = $('<div>').addClass('tcg_base_player_card_values');
	['Top', 'Left', 'Right', 'Bottom'].forEach(position => {
		let attribute = oppCard.attributes.find(attr => attr.trait_type === position);
		let cardValueDiv = $('<div>').addClass(`tcg_base_player_card_value_${position.toLowerCase()}`).text(attribute ? attribute.value : '');
		cardValuesDiv.append(cardValueDiv);
	});
	inner.append(cardValuesDiv);
	inner.attr('tokenid', tokenId);
	inner.removeClass('open_slot'); 
	
	// Determine the current player based on card ownership
	let currentPlayer = practiceData[gameId].cardOwnership[tokenId];
	let capturingPlayerColor = currentPlayer === 'creator' ? player1Color : player2Color;
	let boardPosition = practiceData[gameId].cardsPlaced.find(slot => slot.tokenId === tokenId)?.boardPosition;

	// Capture logic
	let captureOccurred = checkForCapture(boardPosition, oppCard, cardSlots, allUris, capturingPlayerColor, gameId, currentPlayer, true);
}

// SFX 
function cardPlaceSound() {
    const randomNumber = Math.floor(Math.random() * 4) + 1;
    const sound = tcg_base_audio[`card_place_0${randomNumber}`];
    sound.play();
}
function cardFlipSound() {
    const randomNumber = Math.floor(Math.random() * 3) + 1; 
    const sound = tcg_base_audio[`card_flip_0${randomNumber}`];
    sound.play();
}

function cauldronSip(amt) {
	tcg_base_audio['ladle_sip'].play(); 
	let wrapper = document.querySelector('.cauldron_sip_wrapper');
	let textField = document.createElement('div');
	textField.classList.add('cauldron_sip_text');
	textField.innerHTML = `Sipped <span class="tcg_base_golden_text">${amt} VIDYA</span>!`;

	// Add the text field to the wrapper
	wrapper.appendChild(textField);

	// Remove the text field after animation ends (2 seconds in this case)
	setTimeout(() => {
	wrapper.removeChild(textField);
	}, 2000); // Should match the duration of the CSS animation
}

async function inventoryPfp(tokenId) {
    try {
        const tokenURI = await Inventory.methods.tokenURI(tokenId).call();
        if (tokenURI) {
            const response = await fetch(tokenURI);
            const data = await response.json();
            return data.image;
        }
    } catch (e) {
        console.error(e);
        return null;
    }
}

const fetchPfp = async (tokenId, address) => {
    if (tokenId > 0) {
        try {
            const imageUrl = await inventoryPfp(tokenId);
            return `url(${imageUrl}) no-repeat center center / cover`;
        } catch (error) {
            console.error('Error fetching PFP for tokenId:', tokenId, error);
            // Fallback to blockies in case of error
            return `url(${blockies.create({ seed: address.toLowerCase() }).toDataURL()})`;
        }
    } else {
        return `url(${blockies.create({ seed: address.toLowerCase() }).toDataURL()})`;
    }
};

async function getPfpsForPlayers(gameId, playerAddress, opponentAddress) {
    // Initialize the cache if it doesn't exist
    if (!tcg_base_games.pfpCache) {
        tcg_base_games.pfpCache = {};
    }

    // Initialize the game ID cache if it doesn't exist
    if (!tcg_base_games.pfpCache[gameId]) {
        tcg_base_games.pfpCache[gameId] = {};
    }

    // Check if PFPs for this gameId are already cached
    let cachedData = tcg_base_games.pfpCache[gameId];
    let playerCached = cachedData[playerAddress];
    let opponentCached = opponentAddress === '0x0000000000000000000000000000000000000000' ? cachedData[opponentAddress] : cachedData[opponentAddress] || cachedData['0x0000000000000000000000000000000000000000'];

    // If both player and opponent PFPs are cached, return them
    if (playerCached && opponentCached) {
        // If the opponent address has updated from zero to a real address, update the cache
        if (opponentAddress !== '0x0000000000000000000000000000000000000000' && cachedData['0x0000000000000000000000000000000000000000']) {
            cachedData[opponentAddress] = cachedData['0x0000000000000000000000000000000000000000'];
            delete cachedData['0x0000000000000000000000000000000000000000'];
        }
        return {
            playerPfp: playerCached,
            opponentPfp: cachedData[opponentAddress]
        };
    }

    // Fetch PFPs
    let [playerPfp, opponentPfp] = await Promise.all([
        playerCached ? playerCached : fetchPfp(await getPlayerTokenId(playerAddress), playerAddress),
        opponentCached ? opponentCached : fetchPfp(await getPlayerTokenId(opponentAddress), opponentAddress)
    ]);

    // Cache the PFPs for future use
    tcg_base_games.pfpCache[gameId][playerAddress] = playerPfp;
    if (opponentAddress !== '0x0000000000000000000000000000000000000000') {
        tcg_base_games.pfpCache[gameId][opponentAddress] = opponentPfp;
    }

    return { playerPfp, opponentPfp };
}

async function getPlayerTokenId(address) {
    let { _tokenId } = await tcg_base_system.game.methods.playerData(address).call();
    return _tokenId;
}

