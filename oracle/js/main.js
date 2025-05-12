const oracle_btn = document.querySelector("#oracle3d_button");
const oracle_bg = document.querySelector("#oracle_bg");
const oracle_seer = document.querySelector("#oracle_seer");
const oracle_close_btn = document.querySelector("#oracle3d .close_button");
const oracle_deck_button = document.querySelector("#oracle_deck_button");
const oracle_drew = document.querySelector("#oracle_drew");

oracle_btn.onclick = initOracle;
oracle_bg.onclick = loadSeer;
oracle_close_btn.onclick = resetOracle;
oracle_deck_button.onclick = drawCards;

function initOracle() {
	const greeceTime = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Athens" }));
	const hour = greeceTime.getHours();
	const isDay = hour >= 6 && hour < 20;
	const img = isDay ? 'day.png' : 'night.png';
	oracle_bg.style.backgroundImage = `url('oracle/img/${img}')`;

	// Ensure only the bg is visible initially
	oracle_bg.classList.remove('hidden');
	oracle_seer.classList.add('hidden');
	oracle_drew.classList.add('hidden');
}

function resetOracle() {
	oracle_bg.classList.remove('hidden');
	oracle_seer.classList.add('hidden');
	oracle_drew.classList.add('hidden');

	oracle_bg.style.transition = 'none';
	oracle_bg.style.transform = 'scale(1)';
	oracle_bg.style.opacity = '1';
}

function loadSeer() {
	oracle_seer.style.backgroundImage = `url('oracle/img/deck.png')`;

	oracle_bg.classList.remove('hidden');
	oracle_seer.classList.add('hidden');
	oracle_drew.classList.add('hidden');

	oracle_bg.style.transition = 'none';
	oracle_bg.style.transform = 'scale(1)';
	oracle_bg.style.opacity = '1';

	void oracle_bg.offsetHeight;

	oracle_bg.style.transition = 'transform 300ms ease, opacity 300ms ease';
	oracle_bg.style.transform = 'scale(2)';
	oracle_bg.style.opacity = '0';

	setTimeout(() => {
		oracle_bg.classList.add('hidden');
		oracle_seer.classList.remove('hidden');
		oracle_bg.style.transition = '';
	}, 300);
}

function drawCards() {
	oracle_drew.style.backgroundImage = `url('oracle/img/draw.png')`;
	drawAndRead(); 
	console.log("Cards");
	oracle_bg.classList.add('hidden');
	oracle_seer.classList.add('hidden');
	oracle_drew.classList.remove('hidden');
}



/* Cards */
const TAROT_API="https://oracle.aitarot.workers.dev/reading";
const deckPromise=fetch("oracle/js/tarot_deck.json").then(r=>r.json());
const readingEl=document.getElementById("oracle_reading_content");
const cardsEl=document.getElementById("oracle_cards");

function lockUI(lock){}

async function drawDeck(){
  const deck=await deckPromise;
  const pool=[...deck];
  const drawn=[];
  for(let i=0;i<3;i++){
    const idx=Math.floor(Math.random()*pool.length);
    const card=pool.splice(idx,1)[0];
    const orientation=Math.random()>0.5?"upright":"reversed";
    drawn.push({
      name:card.name,
      orientation,
      meaning:card[orientation],
      image:`oracle/img/cards/${card.name}.jpg`
    });
  }
  return drawn;
}

function renderBack(card,i){
  const wrap=document.createElement("div");
  wrap.className="card-wrapper fade-up";
  wrap.style.animationDelay=`${i*120}ms`;
  const inner=document.createElement("div");
  inner.className="card";
  const back=document.createElement("img");
  back.src="oracle/img/cards/A_tarotback.jpg";
  back.className="back";
  const front=document.createElement("img");
  front.src=card.image;
  front.className="front";
  front.style.transform = card.orientation==="reversed"
    ? "rotateY(180deg) rotate(180deg)"
    : "rotateY(180deg)";
  inner.append(back,front);
  wrap.append(inner);
  cardsEl.append(wrap);
}

async function flipCards(){
  const inners=[...document.querySelectorAll(".card")];
  for(let i=0;i<inners.length;i++){
    await new Promise(r=>setTimeout(r,350));
    inners[i].classList.add("flip");
  }
}

async function fetchReading(drawn){
console.log("Drawn cards:", drawn)
  const res=await fetch(TAROT_API,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(drawn)
  });
  const data=await res.json();
  return data.reading;
}

async function drawAndRead() {
  cardsEl.innerHTML = "";
  readingEl.textContent = "Consulting the gods…";

  const drawn = await drawDeck();
  drawn.forEach(renderBack);
  await new Promise(r => setTimeout(r, 600 + drawn.length * 120));
  await flipCards();

  try {
    const raw = await fetchReading(drawn);
    const parsed = parseReadingToTabs(raw);

    const cardEls = [...document.querySelectorAll(".card-wrapper")];
    const order = ["past", "present", "future"];

	let activeWrap = null;

	cardEls.forEach((wrap, i) => {
	  const label = order[i];

	  wrap.onclick = () => {
		readingEl.textContent = parsed[label];

		if (activeWrap) activeWrap.classList.remove("active");
		wrap.classList.add("active");
		activeWrap = wrap;
	  };
	});

    readingEl.textContent = "Click a card to reveal its fate.";
  } catch (e) {
    console.error(e);
    readingEl.textContent = "The ether remained silent.";
  }
}

function parseReadingToTabs(text) {
  const past = text.match(/past:\s*(.+?)\s*(?=present:|$)/is)?.[1]?.trim() || "";
  const present = text.match(/present:\s*(.+?)\s*(?=future:|$)/is)?.[1]?.trim() || "";
  const future = text.match(/future:\s*(.+)/is)?.[1]?.trim() || "";

  return { past, present, future };
}