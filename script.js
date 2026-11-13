/* =====================================================================
THE MIDNIGHT LIBRARY ENGINE (ULTIMATE PRO DEFINITIVE EDITION)
Linter-Safe | Armor-Plated Fallbacks | 100% Feature Complete
==================================================================== */

/* ======================================================
   📥 AUTOMATIC PWA APP INSTALLATION ENGINE (GLOBAL SCOPE)
   ====================================================== */
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    const installBtn = document.getElementById('install-app-btn');
    if (installBtn) {
        installBtn.style.display = 'inline-block';
    }
    console.log("🟢 PWA Install Prompt Ready!");
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
        .then(reg => console.log('Service Worker Registered!', reg))
        .catch(err => console.error('Service Worker Reg Failed!', err));
    });
}

document.addEventListener("DOMContentLoaded", () => {
"use strict";

/* 🛡️ Escapes user text before it goes into innerHTML / attributes (stops script injection) */
function escapeHTML(str) {
    return String(str).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));
}

/* 🛡️ localStorage that never throws (private mode / blocked storage) */
function lsGet(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
function lsSet(key, val) { try { localStorage.setItem(key, val); return true; } catch (e) { return false; } }
function lsRemove(key) { try { localStorage.removeItem(key); } catch (e) {} }

/* ======================================================
   🛡️ GLOBAL DEFENSIVE ENGINE HELPER (THE ARMOR)
   ====================================================== */
function findSafeElement(id, textFallback = null, selectorFallback = null) {
    let el = document.getElementById(id);
    if (el) return el;

    if (selectorFallback) {
        el = document.querySelector(selectorFallback);
        if (el) return el;
    }

    if (textFallback) {
        el = Array.from(document.querySelectorAll("button, .nav-link, div, span, a, input, label, p, h1, h2, h3")).find(node => {
            return node.textContent && node.textContent.toUpperCase().includes(textFallback.toUpperCase());
        });
        if (el) return el;
    }
    return null;
}

/* ======================================================
   📜 POEM ENGINE & ATMOSPHERE STATES
   ====================================================== */
let POEM_DATABASE = [];
const UPCOMING_CHAPTER = { chapterNum: "III", title: "THE COSMOS WITHIN" };

window.twMasterState = {};
const globalState = {
    activeTheme: "dark",
    isAudioPlaying: false,
    vortexActive: false,
    secretClicks: 0,
    notesVisitCount: 0,
    secretPassword: "silence",
    hasTappedMoon: false,
    hasTypedWord: false,
    rainActive: false,
    visitorName: "Wanderer",
    elevenElevenTriggered: false,
    zenActive: false
};

/* 🪪 Library pass storage keys */
const K_NAME = "midnightVisitor";
const K_ID = "midnightPassId";          // real, sequential ID (0000001, 0000002 ...)
const K_TEMP = "midnightPassIdTemp";    // offline fallback ID (replaced by a real one later)
const K_SINCE = "midnightPassSince";
let passClaim = null;
let rainRaf = null;

/* 📚 Bookshelf look: uneven heights / widths / leather colours */
const SPINE_PALETTES = [
    { a: "#5a2a14", b: "#2f140a", t: "#e6c98f" },   // tan brown
    { a: "#6b1f1f", b: "#3a0f0f", t: "#f0d9a8" },   // oxblood red
    { a: "#1f3d2e", b: "#0f2119", t: "#d9c07a" },   // forest green
    { a: "#26263a", b: "#13131f", t: "#d8c08a" },   // midnight navy
    { a: "#4b3a1d", b: "#2a1f0e", t: "#f0dca8" },   // bronze olive
    { a: "#5c3b2e", b: "#33201a", t: "#e8d3b0" },   // chestnut
    { a: "#3b1f3a", b: "#201020", t: "#e3c78e" },   // plum
    { a: "#14424a", b: "#0a2429", t: "#e0cb90" }    // deep teal
];
const SPINE_HEIGHTS = [210, 186, 232, 198, 246, 176, 222, 204, 238, 190];
const SPINE_WIDTHS = [46, 58, 40, 52, 62, 44, 56, 48, 60, 42];
const SPINE_TILTS = [-1.5, 0, 1.2, 0, -0.8, 1.6, 0, -1.2];

const quoteDatabase = [
    '"Every silence contains a poem."',
    '"The moon remembers what we choose to forget."',
    '"Ink writes the history of spirits navigating the dark."',
    '"A library is a hospital for the mind."',
    '"Words are the architecture of fleeting emotions."'
];
const moonWords = ["silence", "poetry", "creation", "memories", "love", "solitude", "eternity"];
const midnightThoughts = [
    "The moon has seen every version of you.",
    "Not every chapter deserves a sequel.",
    "Some memories glow brighter after they're gone.",
    "The hardest part of moving forward is not looking back.",
    "We bury our loudest screams in the quietest poetry."
];
const notesCombos = [
    ["The hardest goodbyes are the ones that happen quietly.", "Some people become memories before they leave.", "Happiness often arrives disguised as ordinary moments."],
    ["Words are the shadows of deep hidden emotions.", "The moon remembers everything we choose to forget.", "Ink writes the history of spirits navigating the dark."],
    ["A quiet mind hears the loudest truths.", "Echoes of yesterday build the walls of tomorrow.", "Time is a silent thief, taking only what we love."],
    ["Stars do not beg for attention, they just shine.", "Oceans hide their deepest secrets beneath calm waves.", "Mountains teach patience to those who climb them."],
    ["To feel deeply is both a curse and a blessing.", "Scars are just poetry written on the human skin.", "A single teardrop holds an entire ocean of sorrow."]
];
const starCoords = [{top: 50, left: 20}, {top: 20, left: 50}, {top: 60, left: 80}, {top: 80, left: 40}, {top: 30, left: 85}, {top: 75, left: 15}];

const audioPageTurn = findSafeElement("audio-page-turn");
const audioRain = findSafeElement("audio-rain");
const audioAmbient = findSafeElement("audio-ambient");

// =====================================================================
// 🚀 INITIALIZATION SEQUENCE
// =====================================================================
initIntroCinematic();
initFullscreenMode();
initPassport();
initTouchRipple();
initClockAndAtmosphere();
initUltimateUniverseBackground();
initDynamicShadows();
initScrollProgressBar();
initSecretKeyboardVault();
initLedger();
initBookmarksDrawer();
initTimeCapsule();
init1111Wish();
initZenMode();
initAudioSpeechEngine();
initMysticLedger();
initThoughtButton();
initSideNav();
initLibraryPass();
initTranslateEngine();

fetch('poem.json')
    .then(response => {
        if (!response.ok) throw new Error("Poem database load nahi ho paya");
        return response.json();
    })
    .then(data => {
        POEM_DATABASE = Array.isArray(data) ? data : [];
    })
    .catch(error => {
        console.error("Critical Error inside Library Fetch: ", error);
    })
    .then(() => {
        // runs whether the fetch worked or not, so navigation never stays dead
        buildLibrarySystem();
        initCosmicNavigation();
        initLibraryFeatures();
        if (lsGet("isWishmaker") === "true") applyWishmakerBranding();   // nav was rebuilt, bring the button back
    });

/* ======================================================
   🎬 CINEMATIC OPENING (video → title → passport card)
   ====================================================== */
function initIntroCinematic() {
    const intro = document.getElementById("intro-screen");
    if (!intro) return;
    const video = document.getElementById("intro-video");
    const reduceMotion = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    let revealed = false;
    let timer = null;
    let started = false;

    function reveal() {
        if (revealed) return;
        revealed = true;
        clearTimeout(timer);
        intro.classList.add("show-card");
    }

    // card appears ~5s after the film actually starts playing (or 2.5s after load as a fallback)
    function startClock() {
        if (started) return;
        started = true;
        timer = setTimeout(reveal, reduceMotion ? 400 : 5200);
    }

    if (video) {
        if (reduceMotion) { try { video.pause(); } catch (e) {} }
        video.addEventListener("playing", startClock, { once: true });
        const p = video.play && video.play();
        if (p && typeof p.catch === "function") p.catch(() => {});
    }
    setTimeout(startClock, 2500);

    // tap anywhere on the opening = skip to the card
    intro.addEventListener("click", () => { if (!revealed) reveal(); });
}

function initTouchRipple() {
    document.body.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.className = 'touch-ripple';
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 400);
    }, { passive: true });
}

function initPassport() {
    const input = findSafeElement("visitor-name", "visitor");
    const enterBtn = findSafeElement("enter-library-btn", "DIVE DEEP IN THE LIBRARY");
    const savedName = lsGet(K_NAME);
    if (savedName) {
        if (input) input.value = savedName;
        globalState.visitorName = savedName;
    }

    if (enterBtn) {
        enterBtn.addEventListener("click", () => {
            const inputName = input ? input.value.trim() : "";
            const name = (inputName || savedName || "Wanderer").slice(0, 40);

            if (name.toLowerCase() === "silence") {
                globalState.hasTypedWord = true;
                checkUltimateVault();
            }

            lsSet(K_NAME, name);
            globalState.visitorName = name;

            // 🪪 the visitor's library pass: remember first visit + claim the next simple ID
            ensurePassSince();
            getPassId();

            const greeting = findSafeElement("vault-greeting");
            if (greeting) greeting.innerHTML = `Ah, <span style="color:var(--gold);">${escapeHTML(name)}</span>... welcome to the Secret Vault.`;

            const letterTitle = findSafeElement("reader-letter-title");
            if (letterTitle) letterTitle.innerText = `A LETTER TO ${name.toUpperCase()}`;

            // 🕒 Time-Based Automatic Theme Switch
            const currentHour = new Date().getHours();
            const themeBtn = findSafeElement("theme-toggle");

            if (currentHour >= 5 && currentHour < 20) {
                document.documentElement.setAttribute("data-theme", "light");
                if (themeBtn) themeBtn.innerText = "☀️ Day";
                globalState.activeTheme = "light";
            } else {
                document.documentElement.setAttribute("data-theme", "dark");
                if (themeBtn) themeBtn.innerText = "🌙 Night";
                globalState.activeTheme = "dark";
            }

            const introScreen = findSafeElement("intro-screen");
            if (introScreen) {
                introScreen.classList.add("fade-out");
                // stop the opening film + remove the layer once it has faded (saves battery)
                setTimeout(() => {
                    const v = document.getElementById("intro-video");
                    if (v) { try { v.pause(); } catch (e) {} }
                    introScreen.style.display = "none";
                }, 1400);
            }

            // 🎶 Play Ambient Audio Smoothly on entry
            if (audioAmbient && !globalState.isAudioPlaying) {
                audioAmbient.volume = 0.4;
                audioAmbient.play().then(() => {
                    globalState.isAudioPlaying = true;
                }).catch(e => console.log("Audio play blocked by browser:", e));
            }
        });
    }
}

/* ======================================================
   📚 BOOKSHELF + PAGES BUILDER
   ====================================================== */
function resolvePage(id) {
    let d = document.getElementById(id);
    if (d) return d;
    if (id === "page-about") d = document.getElementById("author-chamber") || document.querySelector(".page-about");
    else if (id === "page-fragments") d = document.getElementById("notes-room") || document.querySelector(".page-fragments");
    else if (id === "page-archive") d = document.getElementById("ancient-shelf") || document.querySelector(".page-archive");
    return d || null;
}

function buildSpine(poem, i, pageId) {
    const p = SPINE_PALETTES[(i * 3) % SPINE_PALETTES.length];
    const h = SPINE_HEIGHTS[(i * 7 + 2) % SPINE_HEIGHTS.length];
    const w = SPINE_WIDTHS[(i * 3 + 5) % SPINE_WIDTHS.length];
    const tilt = SPINE_TILTS[(i * 5 + 3) % SPINE_TILTS.length];
    const variant = i % 3;
    const title = String(poem.title).replace(/<br\s*\/?>/gi, " ");
    const num = String(poem.chapterLabel).replace(/chapter/i, "").trim() || String(i + 1);
    return `<div class="book-spine trigger-nav sv${variant}" role="link" tabindex="0" data-target="${pageId}" aria-label="${escapeHTML(poem.chapterLabel + ": " + title)}" style="--h:${h}px;--w:${w}px;--c1:${p.a};--c2:${p.b};--tc:${p.t};--tilt:${tilt}deg;">
        <span class="spine-band"></span>
        <span class="spine-num">${escapeHTML(num)}</span>
        <span class="spine-title">${escapeHTML(title)}</span>
        <span class="spine-band"></span>
    </div>`;
}

function buildLibrarySystem() {
    const nav = document.getElementById("library-nav") || document.querySelector(".library-nav") || document.querySelector("nav");
    let bookshelf = document.getElementById("dynamic-bookshelf") || document.querySelector(".dynamic-bookshelf") || document.querySelector(".bookshelf");
    const starMap = document.getElementById("star-map") || document.querySelector(".star-map");
    const authorScripting = document.getElementById("author-scripting-status") || document.querySelector(".author-status");
    const secretPage = document.getElementById("page-secret") || document.querySelector(".page-secret");

    if (!bookshelf) {
        bookshelf = document.createElement("div");
        bookshelf.id = "dynamic-bookshelf";
        const entrancePage = document.getElementById("page1") || document.querySelector(".page");
        if (entrancePage) entrancePage.appendChild(bookshelf);
    }

    if (!Array.isArray(POEM_DATABASE) || POEM_DATABASE.length === 0) {
        POEM_DATABASE = [{
            title: "Echoes of Silence", subtitle: "The First Midnight Fragment", chapterLabel: "CHAPTER I", themeTag: "Mystic", spineLabel: "SILENCE", text: "Welcome back wanderer.\nYour library is safe.\nTap any button to begin.", dateText: "Solitude", signature: "Soham"
        }];
    }

    // every poem gets safe defaults, so one missing field can never break the page
    POEM_DATABASE = POEM_DATABASE.map((poem, i) => Object.assign({
        title: "Untitled", subtitle: "", chapterLabel: `CHAPTER ${i + 1}`, themeTag: "Verse",
        spineLabel: `VERSE ${i + 1}`, text: "", dateText: "", signature: "Soham"
    }, poem));

    let navHtml = `<button class="nav-link active-nav" data-target="page1">Library Entrance</button>`;
    let shelfHtml = "";
    let sectionsHtml = "";
    let prevPageId = "page1";

    POEM_DATABASE.forEach((poem, i) => {
        const pageId = `poem-page-${i + 1}`;
        const nextPageId = i < POEM_DATABASE.length - 1 ? `poem-page-${i + 2}` : `page-fragments`;

        navHtml += `<button class="nav-link" data-target="${pageId}">${poem.chapterLabel}</button>`;

        const cleanTitle = String(poem.title).replace(/<br\s*\/?>/gi, " ");
        const safeText = String(poem.text).replace(/\n/g, '\\n');

        sectionsHtml += `
        <section id="${pageId}" class="page direct-js-built" data-poem-index="${i}">
          <div class="top-deco">✧ ─ ❦ ─ ✧</div>

          <div class="chapter-label-top" style="font-family: 'Cinzel', serif; font-size: 13px; color: var(--gold); letter-spacing: 4px; margin-bottom: 5px;">${poem.chapterLabel}</div>

          <div class="heading-wrapper"><h2 class="page1-heading moon-glow" style="margin-top: 0;">${poem.title}</h2></div>

          <p class="poem-subtitle">${poem.subtitle}</p>
          <div class="meta-strip" style="margin: 15px 0; display:flex; justify-content:center; gap:15px; align-items:center;">
            <span class="mood-tag tag-motivation" style="background:rgba(191,164,111,0.1); padding:4px 10px; border-radius:4px; font-size:12px; border:1px solid rgba(191,164,111,0.2);">${poem.themeTag}</span>
            <span class="read-time">⏱️ 1 Min Read</span>
            <button class="bookmark-btn btn-utility" data-poem="${escapeHTML(poem.spineLabel)}" style="border: none; background: transparent; padding: 0 !important; cursor: pointer; color: var(--gold);">🔖 Bookmark</button>
          </div>
          <div class="poetry-box antique-parchment dynamic-shadow" id="card-${pageId}">
            <div class="wax-seal-wrapper"><div class="wax-seal"><div class="seal-ring"></div><span class="seal-letter">SJ</span></div></div>
            <p class="royal-poem-text typewriter-poem" data-lines="${escapeHTML(safeText)}"></p><br>
            <p class="poem-date">${poem.dateText}</p>
            <span class="poem-greatvibes sign-animate">${poem.signature}</span>
            <div class="poem-interactions" style="margin-top:20px; display:flex; justify-content:center; gap:10px; flex-wrap:wrap;">
    <button class="listen-btn btn-utility" data-poem-index="${i}">🎙️ LISTEN TO VERSE</button>
    <button class="translate-btn btn-utility" data-poem-index="${i}" aria-expanded="false">🌐 TRANSLATE</button>
</div>
<div class="lang-panel">
    <button class="lang-chip" data-lang="orig">Original</button>
    <button class="lang-chip" data-lang="hi">हिन्दी</button>
    <button class="lang-chip" data-lang="mr">मराठी</button>
    <button class="lang-chip" data-lang="ur">اردو</button>
    <button class="lang-chip" data-lang="es">Español</button>
    <button class="lang-chip" data-lang="fr">Français</button>
    <button class="lang-chip" data-lang="de">Deutsch</button>
    <button class="lang-chip" data-lang="ja">日本語</button>
    <button class="lang-chip" data-lang="ar">العربية</button>
</div>
<div class="translated-box" aria-live="polite"></div>
          </div>
          <div class="button-row" style="margin-top: 15px;">
            <button class="btn-utility download-poem-btn" data-poem-index="${i}">📸 Save As A Memory</button>
            <button class="btn-utility share-poem-btn" data-poem-title="${escapeHTML(cleanTitle)}">🔗 Share Verse</button>
          </div>
          <div class="button-row mt-20"><button class="btn-outline trigger-nav" data-target="${prevPageId}">❮ Previous</button><button class="btn-solid trigger-nav" data-target="${nextPageId}">Next ❯</button></div>
        </section>`;

        shelfHtml += buildSpine(poem, i, pageId);
        prevPageId = pageId;
    });

    navHtml += `<button class="nav-link" data-target="page-fragments">Notes Room</button><button class="nav-link" data-target="page-archive">Ancient Shelf</button><button class="nav-link" data-target="page-about">Author's Chamber</button>`;

    if (nav) nav.innerHTML = navHtml;

    if (secretPage) {
        secretPage.insertAdjacentHTML('beforebegin', sectionsHtml);
    } else {
        const containerFallback = document.querySelector('main') || document.body;
        containerFallback.insertAdjacentHTML('beforeend', sectionsHtml);
    }

    if (bookshelf) {
        bookshelf.innerHTML = shelfHtml;
        // spines are keyboard friendly: Enter / Space opens the poem
        if (!bookshelf.dataset.kbd) {
            bookshelf.dataset.kbd = "1";
            bookshelf.addEventListener("keydown", (e) => {
                const spine = e.target.closest && e.target.closest(".book-spine");
                if (spine && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    spine.click();
                }
            });
        }
    }

    // "Previous" on the Notes Room goes back to the last poem
    const fragPrev = document.getElementById("btn-frag-prev");
    if (fragPrev) fragPrev.setAttribute("data-target", `poem-page-${POEM_DATABASE.length}`);

    let svgLines = ''; let starsHtml = '';
    for (let i = 0; i < POEM_DATABASE.length; i++) {
        if (!starCoords[i]) break;
        const p1 = starCoords[i];
        starsHtml += `<div class="star-node active-star trigger-nav" data-target="poem-page-${i+1}" style="position:absolute; width:12px; height:12px; background:#bfa46f; border-radius:50%; box-shadow:0 0 10px #bfa46f; cursor:pointer; top: ${p1.top}%; left: ${p1.left}%;"></div>`;
        if (i < POEM_DATABASE.length - 1 && starCoords[i+1]) {
            const p2 = starCoords[i+1];
            svgLines += `<line x1="${p1.left}%" y1="${p1.top}%" x2="${p2.left}%" y2="${p2.top}%" stroke="rgba(191,164,111,0.4)" stroke-width="1" stroke-dasharray="4" />`;
        }
    }
    if (POEM_DATABASE.length > 0 && starMap) {
        starMap.innerHTML = `<svg width="100%" height="100%" style="position: absolute; top:0; left:0; z-index: 1;">${svgLines}</svg>${starsHtml}`;
    }
    if (authorScripting) authorScripting.innerHTML = `<span class="pulse-dot"></span><strong>Currently Scripting:</strong> Chapter ${UPCOMING_CHAPTER.chapterNum}: ${UPCOMING_CHAPTER.title}`;
}
function initTranslateEngine() {
    const cache = {};
    document.body.addEventListener("click", async (e) => {
        const tBtn = e.target.closest && e.target.closest(".translate-btn");
        if (tBtn) {
            const panel = tBtn.closest(".poetry-box").querySelector(".lang-panel");
            const open = panel.classList.toggle("open");
            tBtn.setAttribute("aria-expanded", String(open));
            return;
        }

        const chip = e.target.closest && e.target.closest(".lang-chip");
        if (!chip) return;
        const box = chip.closest(".poetry-box");
        const out = box.querySelector(".translated-box");
        const idx = box.querySelector(".translate-btn").getAttribute("data-poem-index");
        const poem = POEM_DATABASE[idx];
        const lang = chip.getAttribute("data-lang");
        if (!poem) return;

        box.querySelectorAll(".lang-chip").forEach(c => c.classList.toggle("active", c === chip));

        if (lang === "orig") { out.classList.remove("show"); out.textContent = ""; return; }

        out.dir = (lang === "ur" || lang === "ar") ? "rtl" : "ltr";
        out.classList.add("show");

        // 1) poem.json ki apni translation
        if (poem.translations && poem.translations[lang]) {
            out.textContent = poem.translations[lang];
            return;
        }

        // 2) backup: Google (sirf agar kisi poem me translation na ho)
        const key = idx + "|" + lang;
        if (cache[key]) { out.textContent = cache[key]; return; }
        out.innerHTML = `<em class="tr-loading">Translating the whispers...</em>`;
        try {
            const url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl="
                + lang + "&dt=t&q=" + encodeURIComponent(poem.text);
            const res = await fetch(url);
            if (!res.ok) throw new Error("HTTP " + res.status);
            const data = await res.json();
            cache[key] = data[0].map(seg => seg[0]).join("");
            out.textContent = cache[key];
        } catch (err) {
            console.error("Translate failed:", err);
            out.textContent = "";
            out.classList.remove("show");
            showToast("🌐 Translation failed. Check your connection.");
        }
    });
}
function initThoughtButton() {
    const thoughtBtn = findSafeElement("reveal-thought-btn", "THOUGHT");
    const thoughtDisplay = findSafeElement("midnight-thought-display");
    if (thoughtBtn && thoughtDisplay) {
        thoughtBtn.addEventListener("click", () => {
            thoughtDisplay.style.opacity = 0;
            setTimeout(() => {
                thoughtDisplay.innerText = `"${midnightThoughts[Math.floor(Math.random() * midnightThoughts.length)]}"`;
                thoughtDisplay.style.opacity = 0.8;
            }, 300);
        });
    }
}

function initDynamicShadows() {
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20; const y = (e.clientY / window.innerHeight - 0.5) * 20;
        document.documentElement.style.setProperty('--shadow-x', `${x}px`); document.documentElement.style.setProperty('--shadow-y', `${15 + y}px`);
    });
}

function initTimeCapsule() {
    const capsule = findSafeElement("time-capsule-item");
    const status = findSafeElement("capsule-status");
    if (!capsule || !status) return;
    if (new Date() >= new Date("January 1, 2027 00:00:00")) {
        status.innerHTML = `<span style="color:var(--gold);">Unlocked. "To the me who survived, thank you."</span>`;
    } else {
        status.innerText = "A letter to the future. Sealed until January 1, 2027.";
    }
}

function initScrollProgressBar() {
    window.addEventListener("scroll", () => {
        const st = window.scrollY || document.documentElement.scrollTop;
        const sh = document.documentElement.scrollHeight - window.innerHeight;
        const progress = findSafeElement("reading-progress");
        if (progress) progress.style.width = sh > 0 ? ((st / sh) * 100) + "%" : "0%";
    });
}

function checkUltimateVault() {
    const condMoon = findSafeElement("cond-moon");
    const condNotes = findSafeElement("cond-notes");
    const condWord = findSafeElement("cond-word");

    if (condMoon) {
        condMoon.innerText = globalState.hasTappedMoon ? "✅ Moon Tapped (3/3)" : `❌ Moon Tapped (${globalState.secretClicks}/3)`;
    }
    if (condNotes) {
        condNotes.innerText = globalState.notesVisitCount >= 5 ? "✅ Notes Room Visits (5/5)" : `❌ Notes Room Visits (${globalState.notesVisitCount}/5)`;
    }
    if (globalState.hasTypedWord && condWord) {
        condWord.innerText = "✅ Secret Word Typed";
    }

    if (globalState.hasTappedMoon && globalState.notesVisitCount >= 5 && globalState.hasTypedWord) {
        const hiddenContainer = findSafeElement("hidden-poem-container");
        const conditionsContainer = findSafeElement("quest-conditions");
        const secretLog = findSafeElement("ultimate-secret-log");
        if (conditionsContainer) conditionsContainer.style.display = "none";
        if (hiddenContainer) hiddenContainer.style.display = "block";
        if (secretLog && secretLog.querySelector("strong")) {
            secretLog.querySelector("strong").innerText = "🔓 Vault Log #003 (Status: Unlocked)";
        }
    }
}

/* 👁️ Opens the Mystery Vault through the real page turn (never just adds a class) */
function openVault() {
    if (typeof window.executePageFlip === "function") {
        window.executePageFlip("page-secret", "next");
    } else {
        const vault = document.getElementById("page-secret");
        const cur = document.querySelector(".page.active");
        if (vault) {
            if (cur && cur !== vault) cur.classList.remove("active");
            vault.classList.add("active");
        }
    }
}

function initSecretKeyboardVault() {
    const randomIndex = Math.floor(Math.random() * moonWords.length);
    globalState.secretPassword = moonWords[randomIndex];
    const wordDisplay = findSafeElement("secret-word");
    if (wordDisplay) wordDisplay.innerText = globalState.secretPassword;

    let inputBuffer = "";
    window.addEventListener("keydown", (e) => {
        const t = e.target;
        // typing in a text box (name, guestbook, whisper) must never trigger secrets
        if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
        if (!e.key || e.key.length !== 1 || !/[a-z]/i.test(e.key)) return;

        inputBuffer += e.key.toLowerCase();
        if (inputBuffer.length > 12) inputBuffer = inputBuffer.slice(-12);

        if (inputBuffer.endsWith("rain")) {
            toggleRain();
            inputBuffer = "";
            return;
        }
        if (inputBuffer.endsWith(globalState.secretPassword)) {
            globalState.hasTypedWord = true;
            checkUltimateVault();
            showToast("👁️ The Vault Opens...");
            openVault();
            inputBuffer = "";
        }
    });
}

/* ======================================================
   🔒 VISITOR GUESTBOOK LEDGER
   ====================================================== */
function initLedger() {
    const ledgerList = findSafeElement("ledger-list");
    const submits = document.querySelectorAll(".ledger-submit");
    const inputs = document.querySelectorAll(".ledger-input");
    let entries = [];
    try { entries = JSON.parse(lsGet('midnightLedger') || '[]'); } catch (e) { entries = []; }
    if (!Array.isArray(entries)) entries = [];

    function renderLedger() {
        if (!ledgerList) return;
        ledgerList.innerHTML = "";
        if (entries.length === 0) {
            ledgerList.innerHTML = `<p style="margin-bottom: 8px; font-style: italic; opacity:0.5;">No wandering souls have left a mark yet...</p>`;
        } else {
            entries.forEach(e => { ledgerList.innerHTML += `<p style="margin-bottom: 8px; font-style: italic;">"${escapeHTML(e.text)}" <span style="font-size:11px; opacity:0.5;">— ${escapeHTML(e.date)}</span></p>`; });
        }
    }

    renderLedger();

    submits.forEach((btn, index) => {
        const input = inputs[index];
        const handleLedgerSubmission = () => {
            if (input && input.value.trim() !== "") {
                entries.unshift({ text: input.value.trim(), date: new Date().toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' }) });
                if (entries.length > 10) entries.pop();
                lsSet('midnightLedger', JSON.stringify(entries));
                input.value = "";
                showToast("🖋️ Your silence has been recorded.");
                renderLedger();
            }
        };
        btn.addEventListener("click", handleLedgerSubmission);
        if (input) {
            input.addEventListener("keypress", (e) => { if (e.key === 'Enter') handleLedgerSubmission(); });
        }
    });
}

/* 🌧️ Rain (secret: type "rain" on the keyboard, type it again to stop) */
function toggleRain() {
    globalState.rainActive = !globalState.rainActive;
    const rCanvas = findSafeElement("rain-canvas");
    if (globalState.rainActive) {
        if (rCanvas) rCanvas.classList.add("raining");
        startRainVisuals();
        showToast("🌧️ The sky begins to weep...");
        if (audioRain) { audioRain.volume = 0.5; audioRain.play().catch(() => {}); }
    } else {
        if (rCanvas) rCanvas.classList.remove("raining");
        showToast("🌤️ The storm has passed.");
        if (audioRain) { audioRain.pause(); }
    }
}

function init1111Wish() {
    const modal = findSafeElement("wish-modal");
    const submitBtn = findSafeElement("submit-wish-btn", "WISH");
    const input = findSafeElement("wish-input");

    // Check on load if user is already a Wishmaker
    if (lsGet("isWishmaker") === "true") {
        applyWishmakerBranding();
    }

    setInterval(() => {
        const d = new Date();
        if (d.getHours() === 23 && d.getMinutes() === 11 && !globalState.elevenElevenTriggered) {
            globalState.elevenElevenTriggered = true;
            if (modal) { modal.style.display = "flex"; }
        }
        if (d.getMinutes() !== 11) globalState.elevenElevenTriggered = false;
    }, 10000);

    if (submitBtn) {
        submitBtn.addEventListener("click", () => {
            if (input && input.value.trim() !== "") {
                if (modal) modal.style.display = "none";

                // Track 3 consecutive days wish streak
                handleWishStreak();

                input.value = "";
                showToast("Keep visiting, your wish will be completed soon wanderer. ✨");
            }
        });
    }
}

function handleWishStreak() {
    const today = new Date().toDateString();
    const lastWishDate = lsGet("lastWishDate");
    let streak = parseInt(lsGet("wishStreakCount") || "0", 10) || 0;

    if (lastWishDate) {
        const lastDate = new Date(lastWishDate);
        const currentDate = new Date(today);
        const diffTime = Math.abs(currentDate - lastDate);
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            streak++;
        } else if (diffDays > 1) {
            streak = 1; // Reset if streak broken
        }
        // If diffDays === 0, same day, do nothing to streak
    } else {
        streak = 1;
    }

    lsSet("lastWishDate", today);
    lsSet("wishStreakCount", String(streak));

    // If streak reaches 3 consecutive days
    if (streak >= 3) {
        lsSet("isWishmaker", "true");
        showWishmakerSanctuary();
        applyWishmakerBranding();
    }
}

function showWishmakerSanctuary() {
    let roomModal = document.getElementById("wishmaker-room-modal");
    if (!roomModal) {
        roomModal = document.createElement("div");
        roomModal.id = "wishmaker-room-modal";
        roomModal.innerHTML = `
            <div class="feedback-modal-content antique-parchment dynamic-shadow" style="text-align: center; max-width: 520px; padding: 30px; border: 2px solid var(--gold);">
                <div class="top-deco">✧ ─ ❦ ─ ✧</div>
                <h2 class="moon-glow" style="color: var(--gold); font-family: 'Cinzel', serif; margin: 15px 0; font-size: 22px;">THE SANCTUARY OF THE WISHMAKER</h2>
                <p style="font-family: 'Cormorant Garamond', serif; font-size: 19px; line-height: 1.6; color: inherit; margin-bottom: 25px; font-style: italic;">
                    "Tune lagataar teen raaton tak is aakash ko apne dil ke armaan saumpe hain, wanderer. Aasman aur ye purani kitaabein tujhe aaj se 'The Wishmaker' ke roop mein sthapit karti hain. Yeh gupt kaksh ab sada ke liye tere naam hai."
                </p>
                <button class="btn-utility" id="enter-wishmaker-room" style="padding: 10px 25px; cursor: pointer; font-family: 'Cinzel', serif;">Enter Your Sanctuary ✨</button>
            </div>
        `;
        document.body.appendChild(roomModal);
        document.getElementById("enter-wishmaker-room").addEventListener("click", () => {
            roomModal.style.display = "none";
            showToast("✨ Swagat hai, Wishmaker!");
        });
    }
    roomModal.style.display = "flex";
}

function applyWishmakerBranding() {
    const greeting = findSafeElement("vault-greeting");
    if (greeting) {
        greeting.innerHTML = `Swagat hai <span style="color:var(--gold); font-family:'Cinzel',serif; font-weight:bold;">The Wishmaker</span> ka! Yeh aakash aur rahasya ab aapke hain.`;
    }

    const passportHeader = document.querySelector(".intro-subtitle") || document.querySelector(".poem-subtitle");
    if (passportHeader) {
        passportHeader.innerText = "✦ Authorized Access: The Wishmaker ✦";
    }

    // ✨ Permanent Flex Button for Friends & Quick Access
    const navContainer = document.querySelector(".library-nav") || document.querySelector("nav") || document.querySelector(".top-buttons") || document.querySelector("header");
    const existingFlexBtn = document.getElementById("permanent-wishmaker-btn");

    if (!existingFlexBtn && navContainer) {
        const flexBtn = document.createElement("button");
        flexBtn.id = "permanent-wishmaker-btn";
        flexBtn.className = "nav-link btn-utility";
        flexBtn.style.cssText = "color: var(--gold) !important; border: 1px solid var(--gold) !important; background: rgba(191,164,111,0.1) !important; font-family: 'Cinzel', serif; margin: 5px; cursor: pointer;";
        flexBtn.innerHTML = "✨ Wishmaker Room";

        flexBtn.addEventListener("click", (e) => {
            e.preventDefault();
            showWishmakerSanctuary();
        });

        navContainer.appendChild(flexBtn);
    }
}

function initClockAndAtmosphere() {
    const dateEl = findSafeElement("journal-date");
    if (dateEl) dateEl.innerText = `Journal Entry: ${new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}`;

    const rotatingWordEl = findSafeElement("secret-word");
    let wordIndex = moonWords.indexOf(globalState.secretPassword);
    if (rotatingWordEl) {
        setInterval(() => {
            rotatingWordEl.style.opacity = 0;
            setTimeout(() => {
                wordIndex = (wordIndex + 1) % moonWords.length;
                globalState.secretPassword = moonWords[wordIndex];
                rotatingWordEl.innerText = globalState.secretPassword;
                rotatingWordEl.style.opacity = 1;
            }, 500);
        }, 4000);
    }

    const themeBtn = findSafeElement("theme-toggle", "NIGHT");
    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            const nextTheme = globalState.activeTheme === "dark" ? "light" : "dark";
            document.documentElement.setAttribute("data-theme", nextTheme);
            themeBtn.innerText = nextTheme === "dark" ? "🌙 Night" : "☀️ Day";
            globalState.activeTheme = nextTheme;
        });
    }
}

function startRainVisuals() {
    const rCanvas = findSafeElement("rain-canvas"); if (!rCanvas) return;
    const rCtx = rCanvas.getContext("2d"); rCanvas.width = window.innerWidth; rCanvas.height = window.innerHeight;
    const drops = []; for (let i = 0; i < 100; i++) drops.push({x: Math.random() * rCanvas.width, y: Math.random() * rCanvas.height, l: Math.random() * 20 + 10, v: Math.random() * 4 + 4});
    cancelAnimationFrame(rainRaf);   // never run two rain loops at once
    function drawRain() {
        if (!globalState.rainActive) return;
        rCtx.clearRect(0, 0, rCanvas.width, rCanvas.height); rCtx.strokeStyle = "rgba(191,164,111,0.2)"; rCtx.lineWidth = 1; rCtx.beginPath();
        for (let i = 0; i < drops.length; i++) { const d = drops[i]; rCtx.moveTo(d.x, d.y); rCtx.lineTo(d.x + 1, d.y + d.l); d.y += d.v; d.x += 0.5; if (d.y > rCanvas.height) { d.y = -20; d.x = Math.random() * rCanvas.width; } }
        rCtx.stroke(); rainRaf = requestAnimationFrame(drawRain);
    }
    drawRain();
}

function initUltimateUniverseBackground() {
    const canvas = findSafeElement("universe"); if (!canvas) return; const ctx = canvas.getContext("2d", { alpha: false });
    let width = canvas.width = window.innerWidth; let height = canvas.height = window.innerHeight;
    window.addEventListener("resize", () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; });

    const backgroundStars = []; const goldenDust = [];
    const hour = new Date().getHours(); const isLateNight = hour >= 23 || hour <= 4;
    const darkThemeBgColor = isLateNight ? "#030308" : "#050507";

    for (let i = 0; i < 60; i++) backgroundStars.push({ x: Math.random() * width, y: Math.random() * height, radius: Math.random() * 1.2 + 0.3, baseAlpha: Math.random() * 0.5 + 0.2, phase: Math.random() * Math.PI });
    for (let i = 0; i < 25; i++) goldenDust.push({ x: Math.random() * width, y: Math.random() * height, radius: Math.random() * 1.5 + 0.5, vy: -Math.random() * 0.2 - 0.1, vx: (Math.random() - 0.5) * 0.1, alpha: Math.random() * 0.4 + 0.1 });

    function processRenderLoop() {
        ctx.fillStyle = globalState.activeTheme === "dark" ? darkThemeBgColor : "#f4ebd0"; ctx.fillRect(0, 0, width, height);
        for (const star of backgroundStars) {
            if (globalState.vortexActive) {
                const dx = (width / 2) - star.x; const dy = (height / 2) - star.y; star.x += dx * 0.05; star.y += dy * 0.05;
                if (Math.abs(dx) < 5 && Math.abs(dy) < 5) { star.x = Math.random() * width; star.y = Math.random() * height; }
            } else { star.phase += 0.02; }
            const a = star.baseAlpha + Math.sin(star.phase) * 0.2; ctx.beginPath(); ctx.fillStyle = globalState.activeTheme === "dark" ? `rgba(242,238,233,${Math.max(0.1, a)})` : `rgba(28, 22, 12,${Math.max(0.1, a)})`; ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2); ctx.fill();
        }
        for (const d of goldenDust) { d.y += d.vy; d.x += d.vx; if (d.y < 0) d.y = height; ctx.beginPath(); ctx.fillStyle = globalState.activeTheme === "dark" ? `rgba(191,164,111,${d.alpha})` : `rgba(74, 44, 17,${d.alpha})`; ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2); ctx.fill(); }
        requestAnimationFrame(processRenderLoop);
    }
    requestAnimationFrame(processRenderLoop);
}


function bindWaxSeals(page) {
    if (!page) return;
    initTypewriterEngine();   // seal nahi hai, seedha poem type hoga
}

/* ======================================================
   🎬 COSMIC ENGINE NAVIGATION & SMOOTH 3D TRANSITION
   ====================================================== */
function initCosmicNavigation() {
    window.executePageFlip = (id, dir, pre) => executePageFlip(id, dir, pre);   // exposed for the swipe, side menu and vault
    initSwipeTurning();

    document.addEventListener("click", (e) => {
        if (!e.target || !e.target.closest) return;
        // only real navigation controls can navigate (no more guessing from button text)
        const targetBtn = e.target.closest("[data-target], .trigger-nav, .nav-link, .star-node, #btn-explore");
        if (!targetBtn) return;

        // header buttons, fullscreen switches, the side menu, the pass card, the Wishmaker button
        // and the save-as-image button never navigate
        if (targetBtn.closest(".library-header") || targetBtn.closest("#fs-exit") || targetBtn.closest("#fs-zen")
            || targetBtn.closest("#side-nav") || targetBtn.closest("#pass-modal")
            || targetBtn.id === "permanent-wishmaker-btn" || targetBtn.classList.contains("download-poem-btn")) return;

        let targetPageId = targetBtn.getAttribute("data-target");
        if (!targetPageId && targetBtn.id === "btn-explore") targetPageId = "poem-page-1";

        if (targetPageId) {
            e.preventDefault();
            executePageFlip(targetPageId, targetBtn.classList.contains("btn-outline") ? "prev" : "auto");
        }
    });

    function executePageFlip(targetPageId, dir = "next", preAnimated = false) {
        const currentActivePage = document.querySelector(".page.active") || document.getElementById("page1");
        const destinationPage = resolvePage(targetPageId);

        if (!destinationPage) {
            console.warn("Target page not found: " + targetPageId);
            return;
        }
        if (currentActivePage === destinationPage) return;
        if (!preAnimated && window.PageTurn && window.PageTurn.isBusy()) return;   // a page is already turning

        if (dir === "auto") {
            const all = Array.from(document.querySelectorAll(".page"));
            const a = all.indexOf(currentActivePage), b = all.indexOf(destinationPage);
            dir = (a !== -1 && b !== -1 && b < a) ? "prev" : "next";
        }

        if (window.stopZenModeGlobally) window.stopZenModeGlobally();
        if (window.stopAudioSpeechGlobally) window.stopAudioSpeechGlobally();

        globalState.vortexActive = true;
        document.body.style.overflowY = 'hidden';

        if (targetPageId === "page-fragments") {
            const currentCombo = notesCombos[globalState.notesVisitCount % 5];
            const q1 = document.getElementById("combo-quote-1"); const q2 = document.getElementById("combo-quote-2"); const q3 = document.getElementById("combo-quote-3");
            if (q1) q1.innerText = currentCombo[0];
            if (q2) q2.innerText = currentCombo[1];
            if (q3) q3.innerText = currentCombo[2];
            globalState.notesVisitCount++;
            checkUltimateVault();
        }

        const turnSound = document.getElementById("page-turn-sound");
        if (!preAnimated && turnSound) { try { turnSound.currentTime = 0; turnSound.play().catch(() => {}); } catch (e) {} }

        const vaultPage = document.getElementById("page-secret");
        let swapped = false, finished = false, safetyTimer = null;

        // pages are shown / hidden ONLY through the "active" class (never inline display)
        const swapActive = () => {
            if (swapped) return;
            swapped = true;
            document.querySelectorAll(".page.active").forEach(p => { if (p !== destinationPage) p.classList.remove("active"); });
            destinationPage.classList.add("active");
        };
        const finishFlip = () => {
            if (finished) return;
            finished = true;
            clearTimeout(safetyTimer);
            document.querySelectorAll(".page").forEach(p => p.style.removeProperty("display"));   // clear any leftover inline display
            if (vaultPage && targetPageId !== "page-secret") vaultPage.classList.remove("active");
            globalState.vortexActive = false;
            document.body.style.overflowY = 'auto';
            bindWaxSeals(destinationPage);
        };

        try {
            if (preAnimated) {
                // the finger-swipe already turned the page; just update the state
                swapActive();
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                finishFlip();
            } else if (typeof window.flipPage === "function") {
                // 📖 REAL PAGE-TURN (page-flip.js). It photographs the old page first, so
                // the "active" swap can happen straight away.
                window.flipPage(currentActivePage, destinationPage, dir, finishFlip, swapActive);
                swapActive();
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                safetyTimer = setTimeout(finishFlip, 2600);   // never leave the page locked if the animation stalls
            } else {
                // safety net: if page-flip.js did not load, still change pages
                swapActive();
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                finishFlip();
            }
        } catch (err) {
            console.error("Page flip failed, switching without animation:", err);
            swapActive();
            finishFlip();
        }

        document.querySelectorAll(".nav-link").forEach(lnk => {
            const target = lnk.getAttribute("data-target");
            lnk.classList.toggle("active-nav", target === targetPageId);
        });
    }
}

/* ======================================================
   👆 HORIZONTAL SWIPE / DRAG = TURN THE PAGE (follows the finger)
   Swipe right→left = next page, left→right = previous page.
   ====================================================== */
function initSwipeTurning() {
    if (window.__swipeTurningReady) return;
    window.__swipeTurningReady = true;

    const BLOCK = 'input, textarea, select, [contenteditable], #dynamic-bookshelf, .book-spine, .star-node, .whisper-word, .modal, .feedback-modal-content, .drawer, #bookmarks-drawer, .side-nav, .side-backdrop, .pass-modal, .lang-panel, .translated-box';
    let sw = null;

    function overlayOpen() {
        const intro = document.getElementById("intro-screen");
        if (intro && !intro.classList.contains("fade-out") && getComputedStyle(intro).display !== "none") return true;
        return ["feedback-modal", "wish-modal", "wishmaker-room-modal", "bookmarks-drawer", "side-nav", "pass-modal"].some(id => {
            const el = document.getElementById(id);
            return el && (el.classList.contains("open") || (el.style.display && el.style.display !== "none"));
        });
    }
    function targetsFor(page) {
        const nb = page.querySelector(".btn-solid.trigger-nav[data-target]");
        const pb = page.querySelector(".btn-outline.trigger-nav[data-target]");
        let next = nb && nb.getAttribute("data-target");
        const prev = pb && pb.getAttribute("data-target");
        if (!next && page.id === "page1") next = "poem-page-1";
        return { next, prev };
    }
    function swallowNextClick() {
        const stop = (ev) => { ev.stopPropagation(); ev.preventDefault(); };
        document.addEventListener("click", stop, true);
        setTimeout(() => document.removeEventListener("click", stop, true), 350);
    }

    document.addEventListener("pointerdown", (e) => {
        if (!e.isPrimary || (e.pointerType === "mouse" && e.button !== 0)) return;
        if (sw || !window.PageTurn || window.PageTurn.isBusy() || globalState.vortexActive) return;
        if (!e.target.closest || e.target.closest(BLOCK) || overlayOpen()) return;
        const page = document.querySelector(".page.active");
        if (!page || page.id === "page-secret") return;
        sw = { id: e.pointerId, x: e.clientX, y: e.clientY, state: "pending", page, targets: targetsFor(page), hist: [] };
    });

    document.addEventListener("pointermove", (e) => {
        if (!sw || e.pointerId !== sw.id) return;
        const dx = e.clientX - sw.x, dy = e.clientY - sw.y;

        if (sw.state === "pending") {
            if (Math.abs(dy) > 14 && Math.abs(dy) > Math.abs(dx)) { sw = null; return; }   // normal scrolling
            if (Math.abs(dx) < 12 || Math.abs(dx) < Math.abs(dy) * 1.3) return;

            const dir = dx < 0 ? "next" : "prev";
            const targetId = dir === "next" ? sw.targets.next : sw.targets.prev;
            const dest = targetId && resolvePage(targetId);
            if (!dest || dest === sw.page) { sw = null; return; }

            if (window.stopZenModeGlobally) window.stopZenModeGlobally();
            if (window.stopAudioSpeechGlobally) window.stopAudioSpeechGlobally();
            const session = window.PageTurn.begin(sw.page, dest, dir);
            if (!session) { sw = null; return; }
            const snd = document.getElementById("page-turn-sound");
            if (snd) { try { snd.currentTime = 0; snd.play().catch(() => {}); } catch (err) {} }
            document.body.classList.add("pt-dragging");
            Object.assign(sw, { state: "drag", dir, targetId, session, startX: e.clientX, width: Math.max(260, sw.page.getBoundingClientRect().width || window.innerWidth) });
        }

        if (sw.state === "drag") {
            const d = sw.dir === "next" ? (sw.startX - e.clientX) : (e.clientX - sw.startX);
            sw.p = Math.max(0, Math.min(1, d / (sw.width * 0.85)));
            sw.hist.push({ t: e.timeStamp, p: sw.p });
            if (sw.hist.length > 6) sw.hist.shift();
            sw.session.setProgress(sw.p);
            e.preventDefault();
        }
    }, { passive: false });

    function endSwipe(e, cancelled) {
        if (!sw || (e && e.pointerId !== sw.id)) return;
        const s = sw; sw = null;
        if (s.state !== "drag") return;
        document.body.classList.remove("pt-dragging");
        swallowNextClick();

        const a = s.hist[0], b = s.hist[s.hist.length - 1];
        const vel = (a && b && b.t > a.t) ? (b.p - a.p) / (b.t - a.t) : 0;          // progress per ms
        const commit = !cancelled && (s.p > 0.35 || (vel > 0.0015 && s.p > 0.06));

        if (commit) {
            s.session.animateTo(1, () => {
                s.session.commit();
                window.executePageFlip(s.targetId, s.dir, true);
            }, 600);
        } else {
            s.session.animateTo(0, () => s.session.cancel(), 600);
        }
    }
    document.addEventListener("pointerup", (e) => endSwipe(e, false));
    document.addEventListener("pointercancel", (e) => endSwipe(e, true));
    window.addEventListener("blur", () => endSwipe(null, true));
}

/* 🤫 Whisper words: wraps matching words (text only, never inside tags) */
function applyWhispers(el, poemIndex) {
    const pData = POEM_DATABASE[poemIndex];
    if (!pData || !Array.isArray(pData.whispers) || el.dataset.whispersApplied === "true") return;
    const words = pData.whispers.filter(w => w && w.word);
    el.dataset.whispersApplied = "true";
    if (!words.length) return;

    function textNodesOf(root) {
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        const list = [];
        while (walker.nextNode()) list.push(walker.currentNode);
        return list;
    }

    words.forEach(w => {
        const safeWord = String(w.word).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const re = new RegExp(`\\b${safeWord}\\b`, "gi");
        textNodesOf(el).forEach(node => {
            if (node.parentElement && node.parentElement.closest(".whisper-word")) return;
            const txt = node.nodeValue;
            re.lastIndex = 0;
            if (!re.test(txt)) return;
            re.lastIndex = 0;
            const frag = document.createDocumentFragment();
            let last = 0, m;
            while ((m = re.exec(txt)) !== null) {
                if (m[0].length === 0) { re.lastIndex++; continue; }
                if (m.index > last) frag.appendChild(document.createTextNode(txt.slice(last, m.index)));
                const span = document.createElement("span");
                span.className = "whisper-word";
                span.dataset.original = String(w.word);
                span.dataset.hidden = String(w.hidden || w.word);
                span.textContent = m[0];
                frag.appendChild(span);
                last = m.index + m[0].length;
            }
            if (last < txt.length) frag.appendChild(document.createTextNode(txt.slice(last)));
            node.parentNode.replaceChild(frag, node);
        });
    });

    el.querySelectorAll('.whisper-word').forEach(span => {
        span.addEventListener('click', function() {
            const curr = this.textContent;
            this.style.opacity = 0;
            setTimeout(() => {
                this.textContent = (curr.toLowerCase() === this.dataset.original.toLowerCase()) ? this.dataset.hidden : this.dataset.original;
                this.style.opacity = 1;
                this.classList.toggle('whispered');
            }, 300);
        });
    });
}

function initTypewriterEngine() {
    const activePage = document.querySelector(".page.active"); if (!activePage) return;
    const poemIndex = activePage.getAttribute("data-poem-index");
    const poemEls = activePage.querySelectorAll(".typewriter-poem");

    poemEls.forEach((el, index) => {
        const text = el.getAttribute("data-lines"); if (!text) return;
        const lines = text.replace(/\\n/g, '\n').split('\n');
        const signEl = activePage.querySelector(".sign-animate");
        const poemId = activePage.id + "-" + index;

        if (!window.twMasterState[poemId]) { window.twMasterState[poemId] = { lineIndex: 0, charIndex: 0, outHtml: "", status: "unstarted" }; el.innerHTML = ""; }
        const state = window.twMasterState[poemId];

        if (state.status === "finished" || el.getAttribute("data-animated") === "true") {
            if (signEl) { signEl.classList.add("show-instantly"); }
            if (poemIndex !== null) applyWhispers(el, poemIndex);
            return;
        }
        if (state.status === "typing") return;

        state.status = "typing"; el.classList.add("is-typing");

        function typeNext() {
            if (!activePage.classList.contains("active")) { state.status = "paused"; el.classList.remove("is-typing"); return; }
            if (state.lineIndex < lines.length) {
                const currentLine = lines[state.lineIndex];
                if (currentLine === "") { state.outHtml += "<br><br>"; el.innerHTML = state.outHtml; state.lineIndex++; state.charIndex = 0; setTimeout(typeNext, 200); return; }
                if (state.charIndex === 0 && state.lineIndex === 0) {
                    const ch = currentLine.charAt(0);
                    state.outHtml += `<span class="drop-cap-antique" style="font-size:42px; font-family:'Cinzel',serif; color:var(--gold); float:left; line-height:1; margin-right:6px;">${escapeHTML(ch)}</span>`;
                    el.innerHTML = state.outHtml; state.charIndex++; setTimeout(typeNext, 40);
                } else if (state.charIndex < currentLine.length) {
                    // line 0 already shows its first letter as the drop cap, so it starts from letter 2
                    const start = state.lineIndex === 0 ? 1 : 0;
                    el.innerHTML = state.outHtml + escapeHTML(currentLine.substring(start, state.charIndex + 1)); state.charIndex++; setTimeout(typeNext, 35);
                } else { state.outHtml = el.innerHTML + "<br>"; el.innerHTML = state.outHtml; state.lineIndex++; state.charIndex = 0; setTimeout(typeNext, 400); }
            } else {
                state.status = "finished"; el.setAttribute("data-animated", "true"); el.classList.remove("is-typing");
                if (signEl) { signEl.classList.add("active-sign"); }
                if (poemIndex !== null) applyWhispers(el, poemIndex);
            }
        }
        setTimeout(typeNext, 200);
    });
}

/* 📸 Save-as-memory + 🔗 share */
document.body.addEventListener('click', async function(e) {
    const dlBtn = e.target.closest && e.target.closest('.download-poem-btn');
    if (dlBtn) {
        const pIdx = dlBtn.getAttribute('data-poem-index'); if (pIdx === null) return;
        const poem = POEM_DATABASE[pIdx]; if (!poem) return;
        try { if (document.fonts && document.fonts.ready) await document.fonts.ready; } catch (err) {}
        const canvas = document.createElement("canvas"); const ctx = canvas.getContext("2d");
        canvas.width = 1080; canvas.height = 1920;
        ctx.fillStyle = globalState.activeTheme === "dark" ? "#0b0b0f" : "#e8dcc7"; ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "#bfa46f"; ctx.lineWidth = 4; ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);
        ctx.fillStyle = "#bfa46f"; ctx.textAlign = "center"; ctx.font = "bold 60px Cinzel, serif"; ctx.fillText("THE MIDNIGHT LIBRARY", canvas.width / 2, 180);
        ctx.font = "30px sans-serif"; ctx.fillText("✦  ✦  ✦", canvas.width / 2, 240);
        const plainTitle = String(poem.title).replace(/<br\s*\/?>/gi, ' ');
        ctx.font = "bold 80px Cinzel, serif"; ctx.fillText(plainTitle, canvas.width / 2, 400);
        ctx.font = "35px Cinzel, serif"; ctx.fillStyle = globalState.activeTheme === "dark" ? "rgba(242,238,233,0.6)" : "rgba(59,34,16,0.6)"; ctx.fillText(poem.subtitle, canvas.width / 2, 460);
        ctx.fillStyle = globalState.activeTheme === "dark" ? "#f2eee9" : "#3B2210"; ctx.font = "40px 'Playfair Display', serif";
        let y = 600; const lines = String(poem.text).split('\n');
        lines.forEach(line => { if (line === "") y += 40; else { ctx.fillText(line.trim(), canvas.width / 2, y); y += 60; } });
        ctx.fillStyle = "#bfa46f"; ctx.font = "italic 60px cursive"; ctx.fillText("— Soham Madan Jadhao", canvas.width / 2, canvas.height - 200);
        const link = document.createElement("a"); link.download = `${plainTitle}-Memory.png`; link.href = canvas.toDataURL("image/png"); link.click();
        showToast("📸 Memory Saved Successfully!");
        return;
    }

    const shareBtn = e.target.closest && e.target.closest('.share-poem-btn');
    if (shareBtn) {
        const title = shareBtn.getAttribute('data-poem-title');
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${title} | The Midnight Library`,
                    text: `Take a moment and read "${title}" at The Midnight Library.`,
                    url: window.location.href
                });
                showToast("✨ Shared with the world.");
            } catch (err) { console.log("Sharing cancelled."); }
        } else {
            showToast("Sharing is not supported on this browser.");
        }
    }
});

function initBookmarksDrawer() {
    const drawer = findSafeElement("bookmarks-drawer");
    const openBtn = findSafeElement("open-bookmarks-btn");
    const closeBtn = findSafeElement("close-drawer");
    const list = findSafeElement("bookmarks-list");
    if (!drawer || !openBtn) return;

    function renderBookmarks() {
        let bookmarks = [];
        try { bookmarks = JSON.parse(lsGet('midnightBookmarks') || '[]'); } catch (e) { bookmarks = []; }
        if (list) {
            list.innerHTML = "";
            if (!Array.isArray(bookmarks) || bookmarks.length === 0) {
                list.innerHTML = `<p style="opacity: 0.5; font-style: italic;">Your soul hasn't saved any verses yet...</p>`;
            } else {
                bookmarks.forEach(bm => { list.innerHTML += `<div class="bookmark-item" style="padding:8px; border-bottom:1px solid rgba(191,164,111,0.1);">📖 ${escapeHTML(bm)}</div>`; });
            }
        }
    }
    openBtn.addEventListener("click", (e) => { e.preventDefault(); renderBookmarks(); drawer.classList.add("open"); });
    if (closeBtn) closeBtn.addEventListener("click", () => { drawer.classList.remove("open"); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") drawer.classList.remove("open"); });
}

function initLibraryFeatures() {
    const footerQuote = findSafeElement("quote-rotator");
    if (footerQuote) footerQuote.innerText = quoteDatabase[Math.floor(Math.random() * quoteDatabase.length)];

    const moonTrigger = findSafeElement("moon-phase", "🌙", ".moon-phase");
    if (moonTrigger) {
        moonTrigger.addEventListener("click", () => {
            globalState.secretClicks++;
            checkUltimateVault();
            if (globalState.secretClicks === 3) {
                globalState.hasTappedMoon = true;
                checkUltimateVault();
                showToast("🏆 Achievement Unlocked: Moonwalker");
                openVault();
                globalState.secretClicks = 0;
            }
        });
    }

    document.body.addEventListener('click', function(e) {
        const bmBtn = e.target.closest && e.target.closest('.bookmark-btn');
        if (bmBtn) {
            const poemId = bmBtn.getAttribute('data-poem');
            let bookmarks = [];
            try { bookmarks = JSON.parse(lsGet('midnightBookmarks') || '[]'); } catch (err) { bookmarks = []; }
            if (!Array.isArray(bookmarks)) bookmarks = [];
            if (!bookmarks.includes(poemId)) {
                bookmarks.push(poemId); lsSet('midnightBookmarks', JSON.stringify(bookmarks)); showToast("🔖 Verse saved to your soul.");
            } else { showToast("✨ Verse already remembered."); }
            bmBtn.innerText = "❤️ Saved";
        }
    });
}

function showToast(msg) {
    const container = findSafeElement("toast-container");
    if (!container) return;
    const toast = document.createElement("div"); toast.className = "toast"; toast.innerText = msg;
    toast.style.cssText = "background:rgba(15,15,25,0.95); color:var(--gold); border:1px solid var(--gold); padding:10px 20px; border-radius:4px; margin-top:10px; font-family:'Cinzel',serif; box-shadow:0 4px 15px rgba(0,0,0,0.5);";
    container.appendChild(toast); setTimeout(() => toast.remove(), 3500);
}

function initZenMode() {
    const zenBtn = findSafeElement("zen-mode-toggle", "ZEN MODE");
    if (!zenBtn) return;
    let zenScrollId;
    let zenCarry = 0;

    function syncFsZen(t) { const b = document.getElementById("fs-zen"); if (b) b.innerHTML = t; }

    function smoothScroll() {
        if (!globalState.zenActive) return;
        // phones can't scroll by 0.6px, so the small steps are collected and applied whole
        zenCarry += 0.6;
        const step = Math.floor(zenCarry);
        if (step >= 1) { window.scrollBy({ top: step, left: 0, behavior: 'instant' }); zenCarry -= step; }
        if (Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight) {
            stopZen(false); return;
        }
        zenScrollId = requestAnimationFrame(smoothScroll);
    }

    function startZen() {
        globalState.zenActive = true;
        zenCarry = 0;
        zenBtn.innerHTML = "🛑 Stop Zen";
        syncFsZen("🛑 Stop");
        showToast("🧘 Zen Mode Active...");
        zenScrollId = requestAnimationFrame(smoothScroll);
    }

    function stopZen(silent = false) {
        globalState.zenActive = false;
        zenBtn.innerHTML = "📜 Zen Mode";
        syncFsZen("📜 Zen");
        cancelAnimationFrame(zenScrollId);
        if (!silent) showToast("🛑 Zen Mode Paused.");
    }

    zenBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (!globalState.zenActive) { startZen(); } else { stopZen(false); }
    });

    window.stopZenModeGlobally = function() { if (globalState.zenActive) stopZen(true); };
    window.addEventListener("wheel", () => { if (globalState.zenActive) stopZen(true); }, { passive: true });
    window.addEventListener("touchstart", (e) => {
        if (globalState.zenActive && !zenBtn.contains(e.target) && !e.target.closest("#fs-zen")) { stopZen(true); showToast("🖐️ Manual interaction detected."); }
    }, { passive: true });
}

function initAudioSpeechEngine() {
    if (window.audioSpeechEngineInitialized) return;
    window.audioSpeechEngineInitialized = true;
    let activeListenBtn = null;

    document.body.addEventListener('click', function(e) {
        const btn = e.target.closest && e.target.closest('.listen-btn');
        if (!btn) return;
        if (!window.speechSynthesis) { showToast("Voice is not supported on this browser."); return; }

        const pIdx = btn.getAttribute('data-poem-index');
        if (pIdx === null) return;
        const poem = POEM_DATABASE[pIdx];
        if (!poem) return;

        if (window.speechSynthesis.speaking && activeListenBtn === btn) {
            window.speechSynthesis.cancel(); resetListenBtn(); return;
        }

        window.speechSynthesis.cancel();
        if (activeListenBtn) resetListenBtn();

        const cleanTitle = String(poem.title).replace(/<br\s*\/?>/gi, " ");
        const textToSpeak = `${poem.chapterLabel}. ${cleanTitle}. ${poem.subtitle}. ${poem.text}`;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.rate = 0.85; utterance.pitch = 0.95;

        const voices = window.speechSynthesis.getVoices();
        const premiumVoice = voices.find(v => v.lang.startsWith('en-GB') || v.lang.startsWith('en-US'));
        if (premiumVoice) utterance.voice = premiumVoice;

        utterance.onend = () => resetListenBtn();
        utterance.onerror = () => resetListenBtn();

        activeListenBtn = btn;
        activeListenBtn.innerText = "🛑 STOP VOICE";

        window.speechSynthesis.speak(utterance);
    });

    function resetListenBtn() {
        if (activeListenBtn) { activeListenBtn.innerText = "🎙️ LISTEN TO VERSE"; activeListenBtn = null; }
    }

    window.stopAudioSpeechGlobally = function() {
        if (window.speechSynthesis && window.speechSynthesis.speaking) { window.speechSynthesis.cancel(); resetListenBtn(); }
    };
}

function initMysticLedger() {
    const firebaseConfig = {
      apiKey: "AIzaSyDj32kF9AJ9d3ibw1uZLtXeSDIBUa9ctE4",
      authDomain: "creation-21s.firebaseapp.com",
      databaseURL: "https://creation-21s-default-rtdb.firebaseio.com",
      projectId: "creation-21s",
      storageBucket: "creation-21s.firebasestorage.app",
      messagingSenderId: "378812101045",
      appId: "1:378812101045:web:1480c5c267c5eae6cce9fc"
    };

    if (typeof firebase === 'undefined') { console.warn('Firebase not loaded - Mystic Ledger disabled.'); return; }
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const db = firebase.database();

    const openBtn = findSafeElement('open-feedback-btn');
    const closeBtn = findSafeElement('close-feedback-btn');
    const submitBtn = findSafeElement('submit-feedback-btn');
    const modal = findSafeElement('feedback-modal');
    const input = findSafeElement('feedback-input');
    const commentsList = findSafeElement('public-comments-list');

    function formatDate(date) {
        return date.toLocaleDateString("en-US", { month: 'short', day: 'numeric' }) + " | " + date.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' });
    }

    if (openBtn && modal) {
        openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'flex';
            loadLiveComments();
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'none';
        });
    }
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && modal && modal.style.display === "flex") modal.style.display = "none"; });

    function loadLiveComments() {
        if (!commentsList) return;
        commentsList.innerHTML = '<p style="text-align:center; opacity:0.5; font-style:italic; margin-top: 20px;">Listening to the whispers...</p>';

        const commentsRef = db.ref('mystic_ledger_comments');

        commentsRef.off('value');   // avoid stacking duplicate listeners
        commentsRef.on('value', (snapshot) => {
            commentsList.innerHTML = '';
            const data = snapshot.val();

            if (data) {
                const commentsArray = Object.values(data).reverse();
                commentsArray.forEach(comment => {
                    const div = document.createElement('div');
                    div.className = 'public-comment';
                    const header = document.createElement('div'); header.className = 'pc-header';
                    const nameEl = document.createElement('span'); nameEl.className = 'pc-name'; nameEl.textContent = comment.name;
                    const stampEl = document.createElement('span'); stampEl.className = 'pc-date'; stampEl.textContent = comment.timestamp;
                    header.append(nameEl, stampEl);
                    const textEl = document.createElement('div'); textEl.className = 'pc-text'; textEl.textContent = comment.text;
                    div.append(header, textEl);
                    commentsList.appendChild(div);
                });
            } else {
                commentsList.innerHTML = '<p style="text-align:center; opacity:0.5; font-style:italic; margin-top: 20px; font-family:\'Cormorant Garamond\', serif;">The room is silent. Be the first to speak.</p>';
            }
        }, (error) => {
            console.error("Firebase Read Error:", error);
            commentsList.innerHTML = `<p style="text-align:center; color:#e74c3c; font-style:italic; margin-top: 20px; font-family:'Cormorant Garamond', serif;">⚠️ Permission Denied. Please check Firebase Database Rules.</p>`;
        });
    }

    if (submitBtn && input) {
        submitBtn.addEventListener('click', () => {
            const feedbackText = input.value;
            if (feedbackText.trim() !== '') {
                const commentsRef = db.ref('mystic_ledger_comments');

                commentsRef.push({
                    name: String(globalState.visitorName || "Wanderer").slice(0, 40),
                    text: feedbackText.trim().slice(0, 500),
                    timestamp: formatDate(new Date())
                }).then(() => {
                    input.value = '';
                    showToast("✨ Your whisper has been added to the library.");
                }).catch((error) => {
                    console.error("Firebase Write Error: ", error);
                    showToast("🔴 Failed to add whisper (Permission Denied).");
                });
            } else {
                showToast("Please write something before sending.");
            }
        });
    }
}

/* ======================================================
   ☰ SIDE NAVIGATION DRAWER (PC + mobile)
   ====================================================== */
function initSideNav() {
    const toggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("side-nav");
    const backdrop = document.getElementById("side-backdrop");
    if (!toggle || !nav || !backdrop) return;

    let lastFocus = null;
    const isOpen = () => nav.classList.contains("open");

    function openNav() {
        if (isOpen()) return;
        lastFocus = document.activeElement;
        nav.classList.add("open");
        backdrop.classList.add("open");
        nav.setAttribute("aria-hidden", "false");
        toggle.setAttribute("aria-expanded", "true");
        setTimeout(() => { const first = nav.querySelector(".side-link"); if (first) first.focus({ preventScroll: true }); }, 60);
    }

    function closeNav(restoreFocus = true) {
        if (!isOpen()) return;
        nav.classList.remove("open");
        backdrop.classList.remove("open");
        nav.setAttribute("aria-hidden", "true");
        toggle.setAttribute("aria-expanded", "false");
        if (restoreFocus && lastFocus && lastFocus.focus) { try { lastFocus.focus({ preventScroll: true }); } catch (e) {} }
    }

    function goTo(pageId) {
        if (typeof window.executePageFlip === "function") window.executePageFlip(pageId, "auto");
        else showToast("The library is still waking up...");
    }

    function runAction(action) {
        if (action === "pass") openPass();
        else if (action === "archives") { const b = document.getElementById("open-bookmarks-btn"); if (b) b.click(); }
        else if (action === "whispers") { const b = document.getElementById("open-feedback-btn"); if (b) b.click(); }
        else if (action === "chamber") goTo("page-about");
        else if (action === "home") goTo("page1");
    }

    toggle.addEventListener("click", () => { if (isOpen()) closeNav(); else openNav(); });
    backdrop.addEventListener("click", () => closeNav());

    nav.addEventListener("click", (e) => {
        const item = e.target.closest("[data-action]");
        if (!item) return;
        const action = item.getAttribute("data-action");
        closeNav(false);
        setTimeout(() => runAction(action), 220);
    });

    // keyboard: Esc closes, Tab stays inside the drawer while it is open
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && isOpen()) closeNav();
    });
    nav.addEventListener("keydown", (e) => {
        if (e.key !== "Tab") return;
        const f = nav.querySelectorAll("button");
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
}

/* ======================================================
   🪪 LIBRARY PASS (visitor name + simple ID like 0000001)
   ====================================================== */
const fmtPassId = (n) => String(n).padStart(7, "0");

/* offline fallback: starts with 9 so it can never clash with the real counter */
function tempPassId() {
    let t = lsGet(K_TEMP);
    if (!t || !/^\d{7}$/.test(t)) {
        t = "9" + String(Date.now() % 1000000).padStart(6, "0");
        lsSet(K_TEMP, t);
    }
    return t;
}

/* Gives every new visitor the next number (0000001, 0000002 ...) and remembers it on this device. */
function getPassId() {
    const real = lsGet(K_ID);
    if (real) return Promise.resolve(real);

    if (typeof firebase === "undefined" || !firebase.apps || !firebase.apps.length) {
        return Promise.resolve(tempPassId());
    }

    if (!passClaim) {
        try {
            passClaim = firebase.database().ref("visitor_counter")
                .transaction(cur => (typeof cur === "number" ? cur : 0) + 1)
                .then(res => {
                    if (res && res.committed) {
                        const id = fmtPassId(res.snapshot.val());
                        if (!lsGet(K_ID)) lsSet(K_ID, id);
                        lsRemove(K_TEMP);
                        const idEl = document.getElementById("pass-id");
                        if (idEl) idEl.textContent = lsGet(K_ID) || id;
                        return lsGet(K_ID) || id;
                    }
                    throw new Error("Visitor counter not committed");
                })
                .catch(err => {
                    console.warn("Visitor ID fallback in use:", err);
                    passClaim = null;   // allow a retry next time
                    return null;
                });
        } catch (err) {
            console.warn("Visitor ID fallback in use:", err);
            passClaim = null;
            return Promise.resolve(tempPassId());
        }
    }

    const timeout = new Promise(resolve => setTimeout(() => resolve(null), 6000));
    return Promise.race([passClaim, timeout]).then(id => id || tempPassId());
}

function ensurePassSince() {
    let since = lsGet(K_SINCE);
    if (!since) { since = new Date().toISOString(); lsSet(K_SINCE, since); }
    return since;
}

function formatSince(iso) {
    let d = new Date(iso);
    if (isNaN(d.getTime())) d = new Date();
    return d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
}

function renderPass() {
    const nameEl = document.getElementById("pass-name");
    const idEl = document.getElementById("pass-id");
    const sinceEl = document.getElementById("pass-since");
    const name = String(globalState.visitorName || lsGet(K_NAME) || "Wanderer").slice(0, 40);

    if (nameEl) {
        nameEl.textContent = name;
        nameEl.classList.toggle("long", name.length > 14 && name.length <= 22);
        nameEl.classList.toggle("xlong", name.length > 22);
    }
    if (idEl) idEl.textContent = lsGet(K_ID) || lsGet(K_TEMP) || "•••••••";
    if (sinceEl) sinceEl.textContent = formatSince(ensurePassSince());
}

let passLastFocus = null;

function openPass() {
    const modal = document.getElementById("pass-modal");
    if (!modal) return;
    renderPass();
    passLastFocus = document.activeElement;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    const closeBtn = modal.querySelector(".pass-close");
    if (closeBtn) closeBtn.focus({ preventScroll: true });

    getPassId().then(id => {
        const idEl = document.getElementById("pass-id");
        if (idEl && id) idEl.textContent = id;
    });
}

function closePass() {
    const modal = document.getElementById("pass-modal");
    if (!modal || !modal.classList.contains("open")) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    if (passLastFocus && passLastFocus.focus) { try { passLastFocus.focus({ preventScroll: true }); } catch (e) {} }
}

function initLibraryPass() {
    const modal = document.getElementById("pass-modal");
    if (!modal) return;
    const closeBtn = document.getElementById("pass-close");
    if (closeBtn) closeBtn.addEventListener("click", closePass);
    modal.addEventListener("click", (e) => { if (e.target === modal || e.target.classList.contains("pass-wrap")) closePass(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closePass(); });
}

const installBtn = document.getElementById('install-app-btn');
if (installBtn) {
    installBtn.addEventListener('click', async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);
        deferredPrompt = null;
        installBtn.style.display = 'none';
    });
}

window.addEventListener('appinstalled', () => {
    showToast("🎉 Creation App installed successfully on your device!");
});

// 🌐 Offline Connection Alert Engine
window.addEventListener('load', () => {
    function checkNetworkStatus() {
        if (!navigator.onLine) {
            showToast("📱⚠️ NETWORK CONNECTION LOST ! Try connecting for Wondering through the Library");
        }
    }

    checkNetworkStatus();

    window.addEventListener('online', () => {
        showToast("✨ INTERNET CONNECTED ! Now you are free to Wonder");
    });

    window.addEventListener('offline', () => {
        showToast("⚠️ CONNECTION LOST ! Either connect or No more Wondering");
    });
});

/* ======================================================
   ⤢ FULLSCREEN READING MODE
   ====================================================== */
function initFullscreenMode() {
    const root = document.documentElement;
    const toggleBtn = document.getElementById("fullscreen-toggle");
    const exitBtn = document.getElementById("fs-exit");
    const zenFs = document.getElementById("fs-zen");
    if (!toggleBtn || !exitBtn) return;

    const nativeOn = () => !!(document.fullscreenElement || document.webkitFullscreenElement);
    const uiOn = () => document.body.classList.contains("fs-mode");
    let hideTimer;

    function revealExit() {
        if (!uiOn()) return;
        exitBtn.classList.add("show");
        if (zenFs) zenFs.classList.add("show");
        clearTimeout(hideTimer);
        hideTimer = setTimeout(() => {
            exitBtn.classList.remove("show");
            if (zenFs) zenFs.classList.remove("show");
        }, 2500);
    }

    function setUI(on) {
        document.body.classList.toggle("fs-mode", on);
        toggleBtn.setAttribute("aria-checked", String(on));
        if (on) revealExit();
        else { exitBtn.classList.remove("show"); if (zenFs) zenFs.classList.remove("show"); }
    }

    async function enter() {
        setUI(true);
        try {
            if (root.requestFullscreen) await root.requestFullscreen({ navigationUI: "hide" });
            else if (root.webkitRequestFullscreen) root.webkitRequestFullscreen();
        } catch (e) { /* iPhone: only the UI mode applies */ }
    }

    async function leave() {
        setUI(false);
        try {
            if (document.fullscreenElement && document.exitFullscreen) await document.exitFullscreen();
            else if (document.webkitFullscreenElement && document.webkitExitFullscreen) document.webkitExitFullscreen();
        } catch (e) {}
    }

    toggleBtn.addEventListener("click", () => (uiOn() ? leave() : enter()));
    exitBtn.addEventListener("click", leave);
    if (zenFs) zenFs.addEventListener("click", () => {
        const z = document.getElementById("zen-mode-toggle");
        if (z) z.click();
    });
    // Esc / back gesture closes native fullscreen → bring the normal UI back too
    const onFsChange = () => { if (!nativeOn() && uiOn()) setUI(false); };
    document.addEventListener("fullscreenchange", onFsChange);
    document.addEventListener("webkitfullscreenchange", onFsChange);
    window.addEventListener("keydown", (e) => { if (e.key === "Escape" && uiOn()) leave(); });

    // tap on the screen = exit switch shows for a moment
    document.addEventListener("click", revealExit, { passive: true });
}

});
