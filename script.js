/* =====================================================================
   THE MIDNIGHT LIBRARY ENGINE (ULTIMATE PRO DEFINITIVE EDITION)
   Linter-Safe | Armor-Plated Fallbacks | 100% Feature Complete
   ===================================================================== */

/* =====================================================================
   💥 EMERGENY MOBILE DEBUGGER (Sabse Upar Paste Karein)
   ===================================================================== */
// 1. Script load hote hi check karne ke liye (Cache Test)
alert("🔄 System Check: script.js tumhaare phone mein load ho gayi hai!");

// 2. Normal code crash pakadne ke liye
window.onerror = function(message, source, lineno, colno, error) {
    alert("🔴 CRITICAL CODE ERROR!\n\nMessage: " + message + "\nLine: " + lineno);
    return false;
};

// 3. Network/Fetch/Promises fail pakadne ke liye
window.onunhandledrejection = function(event) {
    alert("🔴 NETWORK/FETCH ERROR!\n\nReason: " + event.reason);
};


document.addEventListener("DOMContentLoaded", () => {
    "use strict";

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

    // Protected Audio Elements
    const audioPageTurn = findSafeElement("audio-page-turn");
    const audioRain = findSafeElement("audio-rain");
    const audioAmbient = findSafeElement("audio-ambient");

    // =====================================================================
    // 🚀 INITIALIZATION SEQUENCE
    // =====================================================================
    initPassport();                  
    initTouchRipple();
    initClockAndAtmosphere();
    initUltimateUniverseBackground();
    initDynamicShadows();
    initScrollProgressBar(); 
    initSecretKeyboardVault(); 
    initLedger();
    initBookmarksDrawer(); 
    initFavouritesDrawer(); 
    initTimeCapsule(); 
    init1111Wish();
    initZenMode();
    initAudioSpeechEngine(); 

    // Fetch dynamic database from poem.json
    fetch('poem.json')
        .then(response => {
            if (!response.ok) throw new Error("Poem database load nahi ho paya");
            return response.json();
        })
        .then(data => {
            POEM_DATABASE = data; 
            buildLibrarySystem(); 
            initCosmicNavigation(); 
            initLibraryFeatures(); 
        })
        .catch(error => {
            alert("🔴 JSON LOAD ERROR: " + error.message + "\nYaani poem.json file nahi mil rahi!");
            console.error("Critical Error inside Library Fetch: ", error);
        });

    function initTouchRipple() {
        document.body.addEventListener('click', (e) => {
            const ripple = document.createElement('div');
            ripple.className = 'touch-ripple';
            ripple.style.left = e.clientX + 'px';
            ripple.style.top = e.clientY + 'px';
            document.body.appendChild(ripple);
            setTimeout(() => ripple.remove(), 800);
        });
    }

    function initPassport() {
        const input = findSafeElement("visitor-name", "visitor");
        const enterBtn = findSafeElement("enter-library-btn", "OPEN THE GATES");
        const savedName = localStorage.getItem("midnightVisitor");
        if(savedName && input) input.value = savedName;

        if(enterBtn) {
            enterBtn.addEventListener("click", () => {
                let name = input ? input.value.trim() : "";
                if(!name) name = "Wanderer";
                
                // Secret logic matching your exact word condition
                if(name.toLowerCase() === "silence") {
                    globalState.hasTypedWord = true;
                    checkUltimateVault();
                }

                localStorage.setItem("midnightVisitor", name);
                globalState.visitorName = name;
                
                const greeting = findSafeElement("vault-greeting");
                if(greeting) greeting.innerHTML = `Ah, <span style="color:var(--gold);">${name}</span>... welcome to the Secret Vault.`;

                const letterTitle = findSafeElement("reader-letter-title");
                if(letterTitle) letterTitle.innerText = `A LETTER TO ${name.toUpperCase()}`;

                const introScreen = findSafeElement("intro-screen");
                if(introScreen) introScreen.classList.add("fade-out");
                
                if(audioAmbient && !globalState.isAudioPlaying) {
                    audioAmbient.volume = 0.2;
                    audioAmbient.play().catch(e => console.log("Audio play blocked by browser."));
                    globalState.isAudioPlaying = true;
                }
            });
        }
    }

    /* =====================================================================
       🛡️ UNIVERSAL GOD-MODE ENGINE: BUILD SYSTEM
       ===================================================================== */
    function buildLibrarySystem() {
        const nav = document.getElementById("library-nav") || document.querySelector(".library-nav") || document.querySelector("nav"); 
        let bookshelf = document.getElementById("dynamic-bookshelf") || document.querySelector(".dynamic-bookshelf") || document.querySelector(".bookshelf"); 
        const starMap = document.getElementById("star-map") || document.querySelector(".star-map"); 
        const authorScripting = document.getElementById("author-scripting-status") || document.querySelector(".author-status"); 
        let secretPage = document.getElementById("page-secret") || document.querySelector(".page-secret");

        // CRITICAL FIX: Agar HTML mein horizontal bookshelf nahi mili, toh khud generate karo
        if (!bookshelf) {
            console.warn("Bookshelf container missing in HTML! Creating a universal fallback drawer...");
            bookshelf = document.createElement("div");
            bookshelf.id = "dynamic-bookshelf";
            const entrancePage = document.getElementById("page1") || document.querySelector(".page");
            if (entrancePage) entrancePage.appendChild(bookshelf);
        }

        if (bookshelf) {
            bookshelf.innerHTML = ""; 
            bookshelf.style.cssText = "display: flex !important; overflow-x: auto !important; -webkit-overflow-scrolling: touch; scroll-behavior: smooth; white-space: nowrap !important; padding: 15px !important; gap: 20px !important; width: 100% !important; min-height: 200px !important; z-index: 9999;";
        }

        if (nav) nav.innerHTML = `<button class="nav-link active-nav" data-target="page1">Library Entrance</button>`; 
        let prevPageId = "page1";

        if (!POEM_DATABASE || POEM_DATABASE.length === 0) {
            POEM_DATABASE = [{
                title: "Echoes of Silence", subtitle: "The First Midnight Fragment", chapterLabel: "CHAPTER I", themeTag: "Mystic", spineLabel: "SILENCE", text: "Welcome back wanderer.\nYour library is safe.\nTap any button to begin.", dateText: "Solitude", signature: "Soham"
            }];
        }

        POEM_DATABASE.forEach((poem, i) => {
            const pageId = `poem-page-${i + 1}`; 
            const nextPageId = i < POEM_DATABASE.length - 1 ? `poem-page-${i + 2}` : `page-fragments`;
            
            if (nav) nav.innerHTML += `<button class="nav-link" data-target="${pageId}">${poem.chapterLabel}</button>`;
            
            const cleanTitle = poem.title.replace('<br>', ' '); 
            const safeText = poem.text.replace(/\n/g, '\\n');

            const sectionHtml = `
            <section id="${pageId}" class="page direct-js-built" data-poem-index="${i}" style="display:none;">
              <div class="top-deco">✧ ─ ❦ ─ ✧</div>
              <span class="chapter-badge">${poem.chapterLabel}</span>
              <div class="heading-wrapper"><h2 class="page1-heading moon-glow">${poem.title}</h2></div>
              <p class="poem-subtitle">${poem.subtitle}</p>
              <div class="meta-strip" style="margin: 15px 0; display:flex; justify-content:center; gap:15px; align-items:center;">
                <span class="mood-tag tag-motivation" style="background:rgba(191,164,111,0.1); padding:4px 10px; border-radius:4px; font-size:12px; border:1px solid rgba(191,164,111,0.2);">${poem.themeTag}</span>
                <span class="read-time">⏱️ 1 Min Read</span>
                <button class="bookmark-btn btn-utility" data-poem="${poem.spineLabel}" style="border: none; background: transparent; padding: 0 !important; cursor: pointer; color: var(--gold);">🔖 Bookmark</button>
              </div>
              <div class="poetry-box antique-parchment dynamic-shadow" id="card-${pageId}">
                <div class="wax-seal-wrapper"><div class="wax-seal"><div class="seal-ring"></div><span class="seal-letter">SJ</span></div></div>
                <p class="royal-poem-text typewriter-poem" data-lines="${safeText}"></p><br>
                <p class="poem-date">${poem.dateText}</p>
                <span class="poem-greatvibes sign-animate">${poem.signature}</span>
                <div class="poem-interactions" style="margin-top:20px; display:flex; justify-content:center; gap:10px;">
                    <button class="resonate-btn btn-utility" data-poem="${cleanTitle}">⭐ RESONATED WITH ME</button>
                    <button class="listen-btn btn-utility" data-poem-index="${i}">🎙️ LISTEN TO VERSE</button>
                </div>
              </div>
              <div class="button-row" style="margin-top: 15px;">
                <button class="btn-utility download-poem-btn" data-target="card-${pageId}" data-poem-index="${i}">📸 Save As A Memory</button>
                <button class="btn-utility share-poem-btn" data-poem-title="${cleanTitle}">🔗 Share Verse</button>
              </div>
              <div class="button-row mt-20"><button class="btn-outline trigger-nav" data-target="${prevPageId}">❮ Previous</button><button class="btn-solid trigger-nav" data-target="${nextPageId}">Next ❯</button></div>
            </section>`;
            
            if (secretPage) {
                secretPage.insertAdjacentHTML('beforebegin', sectionHtml);
            } else {
                const containerFallback = document.querySelector('main') || document.body;
                containerFallback.insertAdjacentHTML('beforeend', sectionHtml);
            }
            
            if (bookshelf) {
                bookshelf.innerHTML += `
                    <div class="book-spine trigger-nav" data-target="${pageId}" style="display:inline-block !important; min-width:150px !important; height:180px !important; background:linear-gradient(45deg, #1a1a24, #2c2c3b) !important; border:1px solid #bfa46f !important; border-radius:8px !important; padding:15px !important; margin-right:15px !important; cursor:pointer !important; flex-shrink:0 !important; text-align:center !important; white-space:normal !important;">
                        <span style="font-size:10px; color:#bfa46f; display:block; margin-bottom:10px;">${poem.chapterLabel}</span>
                        <strong style="font-size:13px; display:block; color:#f2eee9; font-family:'Cinzel', serif; line-height:1.3;">${cleanTitle}</strong>
                        <span style="font-size:9px; position:absolute; bottom:15px; left:0; width:100%; color:rgba(255,255,255,0.4); text-align:center;">${poem.spineLabel}</span>
                    </div>`;
            }
            prevPageId = pageId;
        });

        if (nav) nav.innerHTML += `<button class="nav-link" data-target="page-fragments">Notes Room</button><button class="nav-link" data-target="page-archive">Ancient Shelf</button><button class="nav-link" data-target="page-about">Author's Chamber</button>`;
        
        if (bookshelf) {
            bookshelf.innerHTML += `
                <div class="book-spine spine-locked" style="display:inline-block !important; min-width:150px !important; height:180px !important; background:rgba(255,255,255,0.02) !important; border:1px dashed rgba(191,164,111,0.3) !important; border-radius:8px !important; padding:15px !important; flex-shrink:0 !important; text-align:center !important; opacity:0.5;">
                    <span style="font-size:10px; display:block; margin-bottom:10px;">CHAPTER III</span>
                    <strong style="font-size:12px; display:block; color:gray;">THE COSMOS WITHIN</strong>
                    <span style="font-size:9px; position: absolute; bottom: 15px; width: 100%; left:0; text-align: center; color: rgba(255,255,255,0.3);">COMING SOON</span>
                </div>`;
        }

        let svgLines = ''; let starsHtml = '';
        for (let i = 0; i < POEM_DATABASE.length; i++) {
            if(!starCoords[i]) break; 
            let p1 = starCoords[i]; starsHtml += `<div class="star-node active-star trigger-nav" data-target="poem-page-${i+1}" style="position:absolute; width:12px; height:12px; background:#bfa46f; border-radius:50%; box-shadow:0 0 10px #bfa46f; cursor:pointer; top: ${p1.top}%; left: ${p1.left}%;"></div>`;
            if (i < POEM_DATABASE.length - 1 && starCoords[i+1]) { let p2 = starCoords[i+1]; svgLines += `<line x1="${p1.left}%" y1="${p1.top}%" x2="${p2.left}%" y2="${p2.top}%" stroke="rgba(191,164,111,0.4)" stroke-width="1" stroke-dasharray="4" />`; }
        }
        if (POEM_DATABASE.length > 0 && starMap) {
            starMap.innerHTML = `<svg width="100%" height="100%" style="position: absolute; top:0; left:0; z-index: 1;">${svgLines}</svg>${starsHtml}`;
        }
        if (authorScripting) authorScripting.innerHTML = `<span class="pulse-dot"></span><strong>Currently Scripting:</strong> Chapter III: THE COSMOS WITHIN`;
    }

    // Floating Midnight Thought Button Logic (Preserved)
    const thoughtBtn = findSafeElement("reveal-thought-btn", "THOUGHT");
    const thoughtDisplay = findSafeElement("midnight-thought-display");
    if(thoughtBtn && thoughtDisplay) {
        thoughtBtn.addEventListener("click", () => {
            thoughtDisplay.style.opacity = 0;
            setTimeout(() => { 
                thoughtDisplay.innerText = `"${midnightThoughts[Math.floor(Math.random() * midnightThoughts.length)]}"`; 
                thoughtDisplay.style.opacity = 0.8; 
            }, 300);
        });
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
        if(!capsule || !status) return;
        if (new Date() >= new Date("January 1, 2027 00:00:00")) { 
            status.innerHTML = `<span style="color:var(--gold);">Unlocked. "To the me who survived, thank you."</span>`; 
        } else { 
            status.innerText = "A letter to the future. Sealed until January 1, 2027."; 
        }
    }

    function initScrollProgressBar() { 
        window.addEventListener("scroll", () => { 
            let st = window.scrollY || document.documentElement.scrollTop; 
            let sh = document.documentElement.scrollHeight - window.innerHeight; 
            const progress = findSafeElement("reading-progress");
            if(progress) progress.style.width = sh > 0 ? ((st / sh) * 100) + "%" : "0%"; 
        }); 
    }

    function checkUltimateVault() {
        const condMoon = findSafeElement("cond-moon"); 
        const condNotes = findSafeElement("cond-notes"); 
        const condWord = findSafeElement("cond-word"); 
        
        if(condMoon) {
            condMoon.innerText = globalState.hasTappedMoon ? "✅ Moon Tapped (3/3)" : `❌ Moon Tapped (${globalState.secretClicks}/3)`;
        }
        if(condNotes) {
            condNotes.innerText = globalState.notesVisitCount >= 5 ? "✅ Notes Room Visits (5/5)" : `❌ Notes Room Visits (${globalState.notesVisitCount}/5)`;
        }
        if(globalState.hasTypedWord && condWord) {
            condWord.innerText = "✅ Secret Word Typed";
        }

        if(globalState.hasTappedMoon && globalState.notesVisitCount >= 5 && globalState.hasTypedWord) {
            const hiddenContainer = findSafeElement("hidden-poem-container");
            const conditionsContainer = findSafeElement("quest-conditions");
            const secretLog = findSafeElement("ultimate-secret-log");
            if(conditionsContainer) conditionsContainer.style.display = "none"; 
            if(hiddenContainer) hiddenContainer.style.display = "block"; 
            if(secretLog && secretLog.querySelector("strong")) {
                secretLog.querySelector("strong").innerText = "🔓 Vault Log #003 (Status: Unlocked)";
            }
        }
    }

    function initSecretKeyboardVault() {
        const randomIndex = Math.floor(Math.random() * moonWords.length);
        globalState.secretPassword = moonWords[randomIndex];
        const wordDisplay = findSafeElement("secret-word");
        if(wordDisplay) wordDisplay.innerText = globalState.secretPassword;

        let inputBuffer = "";
        window.addEventListener("keydown", (e) => {
            if (e.key.length === 1 && e.key.match(/[a-z]/i)) inputBuffer += e.key.toLowerCase();
            if (inputBuffer.endsWith("rain") && !globalState.rainActive) toggleRain();
            if (inputBuffer.length > globalState.secretPassword.length) inputBuffer = inputBuffer.substring(inputBuffer.length - globalState.secretPassword.length);
            if (inputBuffer === globalState.secretPassword) {
                globalState.hasTypedWord = true; 
                checkUltimateVault(); 
                showToast("👁️ The Vault Opens...");
                const vaultBtn = document.querySelector(".trigger-nav[data-target='page-secret']");
                if (vaultBtn) { vaultBtn.click(); } else { const secPage = findSafeElement('page-secret'); if(secPage) secPage.classList.add('active'); }
                inputBuffer = ""; 
            }
        });
    }

    function initLedger() {
        const ledgerList = findSafeElement("ledger-list"); 
        const submits = document.querySelectorAll(".ledger-submit"); 
        const inputs = document.querySelectorAll(".ledger-input");
        let entries = JSON.parse(localStorage.getItem('midnightLedger') || '[]');
        
        function renderLedger() {
            if(!ledgerList) return; ledgerList.innerHTML = "";
            if(entries.length === 0) { 
                ledgerList.innerHTML = `<p style="margin-bottom: 8px; font-style: italic; opacity:0.5;">No wandering souls have left a mark yet...</p>`; 
            } else { 
                entries.forEach(e => { ledgerList.innerHTML += `<p style="margin-bottom: 8px; font-style: italic;">"${e.text}" <span style="font-size:11px; opacity:0.5;">— ${e.date}</span></p>`; }); 
            }
        }
        
        renderLedger();
        
        submits.forEach((btn, index) => {
            const input = inputs[index];
            const handleLedgerSubmission = () => {
                if(input && input.value.trim() !== "") {
                    entries.unshift({ text: input.value.trim(), date: new Date().toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' }) });
                    if(entries.length > 10) entries.pop(); 
                    localStorage.setItem('midnightLedger', JSON.stringify(entries)); 
                    input.value = ""; 
                    showToast("🖋️ Your silence has been recorded."); 
                    renderLedger();
                }
            };
            btn.addEventListener("click", handleLedgerSubmission);
            if(input) {
                input.addEventListener("keypress", (e) => { if(e.key === 'Enter') handleLedgerSubmission(); });
            }
        });
    }

    function toggleRain() {
        globalState.rainActive = !globalState.rainActive; 
        const rCanvas = findSafeElement("rain-canvas");
        const rainToggleBtn = findSafeElement("rain-toggle");
        if(globalState.rainActive) { 
            if(rCanvas) rCanvas.classList.add("raining"); 
            if(rainToggleBtn) rainToggleBtn.innerHTML = "🌧️ Stop Rain";
            startRainVisuals(); 
            showToast("🌧️ The sky begins to weep..."); 
            if(audioRain) { audioRain.volume = 0.5; audioRain.play().catch(()=>{}); }
        } else { 
            if(rCanvas) rCanvas.classList.remove("raining"); 
            if(rainToggleBtn) rainToggleBtn.innerHTML = "🌧️ Rain";
            showToast("🌤️ The storm has passed."); 
            if(audioRain) { audioRain.pause(); }
        }
    }

    function init1111Wish() {
        const modal = findSafeElement("wish-modal");
        const submitBtn = findSafeElement("submit-wish-btn", "WISH");
        const input = findSafeElement("wish-input");

        setInterval(() => {
            const d = new Date();
            if (d.getHours() === 23 && d.getMinutes() === 11 && !globalState.elevenElevenTriggered) {
                globalState.elevenElevenTriggered = true;
                if(modal) { modal.style.display = "flex"; }
            }
            if (d.getMinutes() !== 11) globalState.elevenElevenTriggered = false; 
        }, 10000);

        if(submitBtn) {
            submitBtn.addEventListener("click", () => {
                if(input && input.value.trim() !== "") {
                    if(modal) modal.style.display = "none";
                    showToast("Keep visiting, your wish will be completed soon wanderer. ✨");
                }
            });
        }
    }

    function initClockAndAtmosphere() {
        const dateEl = findSafeElement("journal-date"); 
        if(dateEl) dateEl.innerText = `Journal Entry: ${new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}`;
        
        const rotatingWordEl = findSafeElement("secret-word"); 
        let wordIndex = moonWords.indexOf(globalState.secretPassword);
        if(rotatingWordEl) { 
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
        if(themeBtn) { themeBtn.addEventListener("click", () => { const nextTheme = globalState.activeTheme === "dark" ? "light" : "dark"; document.documentElement.setAttribute("data-theme", nextTheme); themeBtn.innerText = nextTheme === "dark" ? "🌙 Night" : "☀️ Day"; globalState.activeTheme = nextTheme; }); }
        
        const rainToggleBtn = findSafeElement("rain-toggle", "RAIN"); 
        if(rainToggleBtn) rainToggleBtn.addEventListener("click", toggleRain);
        
        const focusBtn = findSafeElement("reading-mode-toggle", "FOCUS"); 
        const exitFocusBtn = findSafeElement("exit-focus-btn", "NORMAL");
        function toggleFocus() { document.body.classList.toggle("reading-mode"); if(focusBtn) focusBtn.innerText = document.body.classList.contains("reading-mode") ? "👁️ Normal" : "📖 Focus"; }
        if(focusBtn) focusBtn.addEventListener("click", toggleFocus); 
        if(exitFocusBtn) exitFocusBtn.addEventListener("click", toggleFocus);
    }

    function startRainVisuals() {
        const rCanvas = findSafeElement("rain-canvas"); if(!rCanvas) return;
        const rCtx = rCanvas.getContext("2d"); rCanvas.width = window.innerWidth; rCanvas.height = window.innerHeight;
        const drops = []; for(let i=0; i<100; i++) drops.push({x: Math.random()*rCanvas.width, y: Math.random()*rCanvas.height, l: Math.random()*20+10, v: Math.random()*4+4});
        function drawRain() {
            if(!globalState.rainActive) return; rCtx.clearRect(0,0,rCanvas.width,rCanvas.height); rCtx.strokeStyle = "rgba(191,164,111,0.2)"; rCtx.lineWidth = 1; rCtx.beginPath();
            for(let i=0; i<drops.length; i++) { let d = drops[i]; rCtx.moveTo(d.x, d.y); rCtx.lineTo(d.x+1, d.y+d.l); d.y += d.v; d.x += 0.5; if(d.y > rCanvas.height) { d.y = -20; d.x = Math.random()*rCanvas.width; } }
            rCtx.stroke(); requestAnimationFrame(drawRain);
        }
        drawRain();
    }

    function initUltimateUniverseBackground() {
        const canvas = findSafeElement("universe"); if(!canvas) return; const ctx = canvas.getContext("2d", { alpha: false }); 
        let width = canvas.width = window.innerWidth; let height = canvas.height = window.innerHeight;
        window.addEventListener("resize", () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; });

        const backgroundStars = []; const goldenDust = [];
        const hour = new Date().getHours(); const isLateNight = hour >= 23 || hour <= 4;
        const darkThemeBgColor = isLateNight ? "#030308" : "#050507"; 
        
        for(let i = 0; i < 60; i++) backgroundStars.push({ x: Math.random() * width, y: Math.random() * height, radius: Math.random() * 1.2 + 0.3, baseAlpha: Math.random() * 0.5 + 0.2, phase: Math.random() * Math.PI });
        for(let i = 0; i < 25; i++) goldenDust.push({ x: Math.random() * width, y: Math.random() * height, radius: Math.random() * 1.5 + 0.5, vy: -Math.random() * 0.2 - 0.1, vx: (Math.random() - 0.5) * 0.1, alpha: Math.random() * 0.4 + 0.1 });

        function processRenderLoop() {
            ctx.fillStyle = globalState.activeTheme === "dark" ? darkThemeBgColor : "#f4ebd0"; ctx.fillRect(0, 0, width, height);
            for(let star of backgroundStars) {
                if (globalState.vortexActive) { const dx = (width/2) - star.x; const dy = (height/2) - star.y; star.x += dx * 0.05; star.y += dy * 0.05; if(Math.abs(dx) < 5 && Math.abs(dy) < 5) { star.x = Math.random() * width; star.y = Math.random() * height; }
                } else { star.phase += 0.02; }
                let a = star.baseAlpha + Math.sin(star.phase) * 0.2; ctx.beginPath(); ctx.fillStyle = globalState.activeTheme === "dark" ? `rgba(242,238,233,${Math.max(0.1, a)})` : `rgba(28, 22, 12,${Math.max(0.1, a)})`; ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2); ctx.fill();
            }
            for(let d of goldenDust) { d.y += d.vy; d.x += d.vx; if(d.y < 0) d.y = height; ctx.beginPath(); ctx.fillStyle = globalState.activeTheme === "dark" ? `rgba(191,164,111,${d.alpha})` : `rgba(74, 44, 17,${d.alpha})`; ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2); ctx.fill(); }
            requestAnimationFrame(processRenderLoop);
        }
        requestAnimationFrame(processRenderLoop);
    }

    function bindWaxSeals(page) {
        if (!page) return;
        const sealWrap = page.querySelector(".wax-seal-wrapper:not(.broken)");
        if (!sealWrap) { initTypewriterEngine(); return; }
        
        if (sealWrap.dataset.isBroken === "true") {
            sealWrap.classList.add("broken"); initTypewriterEngine(); return;
        }

        const sealBtn = sealWrap.querySelector(".wax-seal");
        showToast("👆 Break the wax seal to view verse...");

        if(sealBtn) {
            sealBtn.addEventListener('click', () => {
                sealWrap.dataset.isBroken = "true";
                sealWrap.classList.add("broken");
                showToast("🔓 The seal is broken.");
                setTimeout(initTypewriterEngine, 800);
            });
        }
    }

    /* =====================================================================
       🛡️ UNIVERSAL GOD-MODE ENGINE: COSMIC NAVIGATION
       ===================================================================== */
    function initCosmicNavigation() {
        document.addEventListener("click", (e) => {
            let targetBtn = e.target.closest("[data-target]") || e.target.closest(".trigger-nav") || e.target.closest(".nav-link") || e.target.closest(".star-node") || e.target.closest("button");
            if (!targetBtn) return;

            let targetPageId = targetBtn.getAttribute("data-target");
            let btnText = targetBtn.textContent.toUpperCase();

            // HARDCODED TEXT FALLBACKS
            if (!targetPageId) {
                if (targetBtn.id === "btn-explore" || btnText.includes("EXPLORE") || btnText.includes("CHAPTER")) {
                    targetPageId = "poem-page-1";
                } else if (btnText.includes("AUTHOR") || btnText.includes("CHAMBER") || targetBtn.id === "btn-about" || btnText.includes("ABOUT")) {
                    targetPageId = "page-about";
                } else if (btnText.includes("NOTES") || btnText.includes("ROOM") || btnText.includes("FRAGMENT")) {
                    targetPageId = "page-fragments";
                } else if (btnText.includes("ANCIENT") || btnText.includes("SHELF") || btnText.includes("ARCHIVE")) {
                    targetPageId = "page-archive";
                } else if (btnText.includes("ENTRANCE") || btnText.includes("LIBRARY")) {
                    targetPageId = "page1";
                }
            }

            if (targetPageId) {
                e.preventDefault();
                if (audioPageTurn) { audioPageTurn.currentTime = 0; audioPageTurn.play().catch(() => {}); }
                executePageFlip(targetPageId);
            }
        });

        function executePageFlip(targetPageId) {
            let currentActivePage = document.querySelector(".page.active") || document.querySelector(".page[style*='display: block']") || document.getElementById("page1");
            let destinationPage = document.getElementById(targetPageId);
            
            if (!destinationPage) {
                if (targetPageId === "page-about") destinationPage = document.getElementById("author-chamber") || document.querySelector(".page-about") || document.querySelector("[id*='about']");
                if (targetPageId === "page-fragments") destinationPage = document.getElementById("notes-room") || document.querySelector(".page-fragments") || document.querySelector("[id*='fragment']");
                if (targetPageId === "page-archive") destinationPage = document.getElementById("ancient-shelf") || document.querySelector(".page-archive") || document.querySelector("[id*='archive']");
            }

            if (!destinationPage) {
                console.error("Target page not found: " + targetPageId + ". Resetting to entrance.");
                destinationPage = document.getElementById("page1") || document.querySelector(".page");
            }

            if (!destinationPage || currentActivePage === destinationPage) return;
            
            if (window.stopZenModeGlobally) window.stopZenModeGlobally();
            if (window.stopAudioSpeechGlobally) window.stopAudioSpeechGlobally();
            
            globalState.vortexActive = true; 
            document.body.style.overflowY = 'hidden'; 
            
            if (targetPageId === "page-fragments") {
                const currentCombo = notesCombos[globalState.notesVisitCount % 5];
                const q1 = document.getElementById("combo-quote-1"); const q2 = document.getElementById("combo-quote-2"); const q3 = document.getElementById("combo-quote-3");
                if(q1) q1.innerText = currentCombo[0]; if(q2) q2.innerText = currentCombo[1]; if(q3) q3.innerText = currentCombo[2];
                globalState.notesVisitCount++; 
                if(typeof checkUltimateVault === "function") checkUltimateVault();
            }
            
            try {
                if (currentActivePage) {
                    currentActivePage.classList.remove("active");
                    currentActivePage.style.display = "none"; 
                    currentActivePage.classList.add("vortex-out");
                    
                    setTimeout(() => {
                        currentActivePage.classList.remove("vortex-out"); 
                        destinationPage.style.display = "block"; 
                        destinationPage.classList.add("vortex-in"); 
                        destinationPage.classList.add("active");
                        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                        
                        setTimeout(() => {
                            destinationPage.classList.remove("vortex-in"); 
                            globalState.vortexActive = false; 
                            document.body.style.overflowY = 'auto'; 
                            if(typeof bindWaxSeals === "function") bindWaxSeals(destinationPage);
                        }, 50); 
                    }, 400); 
                } else {
                    document.querySelectorAll(".page").forEach(page => {
    page.style.display = "none";
    page.classList.remove("active");
});
                   destinationPage.style.display = "block";
                    destinationPage.classList.add("active");
                    if(typeof initTypewriterEngine === "function") initTypewriterEngine();
                }
            } catch(e) {
                if(currentActivePage) currentActivePage.style.display = "none";
                destinationPage.style.display = "block";
                destinationPage.classList.add("active");
                globalState.vortexActive = false;
                document.body.style.overflowY = 'auto';
            }
            
            document.querySelectorAll(".nav-link").forEach(lnk => { 
                let target = lnk.getAttribute("data-target");
                lnk.classList.toggle("active-nav", target === targetPageId); 
            });
        }
    }

    function applyWhispers(el, poemIndex) {
        const pData = POEM_DATABASE[poemIndex];
        if(!pData || !pData.whispers || el.dataset.whispersApplied === "true") return;
        let html = el.innerHTML;
        pData.whispers.forEach(w => { const regex = new RegExp(`\\b${w.word}\\b`, 'gi'); html = html.replace(regex, `<span class="whisper-word" style="border-bottom:1px dotted var(--gold); color:#bfa46f; cursor:pointer;" data-original="${w.word}" data-hidden="${w.hidden}">${w.word}</span>`); });
        el.innerHTML = html; el.dataset.whispersApplied = "true";

        el.querySelectorAll('.whisper-word').forEach(span => {
            span.addEventListener('click', function() {
                let curr = this.innerText; this.style.opacity = 0;
                setTimeout(() => { 
                    this.innerText = (curr.toLowerCase() === this.dataset.original.toLowerCase()) ? this.dataset.hidden : this.dataset.original; 
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
            let state = window.twMasterState[poemId];
            
            if (state.status === "finished" || el.getAttribute("data-animated") === "true") { 
                if(signEl) { signEl.classList.add("show-instantly"); }
                if(poemIndex !== null) applyWhispers(el, poemIndex); return; 
            }
            if (state.status === "typing") return; 

            state.status = "typing"; el.classList.add("is-typing");

            function typeNext() {
                if (!activePage.classList.contains("active")) { state.status = "paused"; el.classList.remove("is-typing"); return; }
                if (state.lineIndex < lines.length) {
                    let currentLine = lines[state.lineIndex];
                    if (currentLine === "") { state.outHtml += "<br><br>"; el.innerHTML = state.outHtml; state.lineIndex++; state.charIndex = 0; setTimeout(typeNext, 200); return; }
                    if (state.charIndex === 0 && state.lineIndex === 0) {
                        let char = currentLine.charAt(0); state.outHtml += `<span class="drop-cap-antique" style="font-size:42px; font-family:'Cinzel',serif; color:var(--gold); float:left; line-height:1; margin-right:6px;">${char}</span>`; el.innerHTML = state.outHtml; state.charIndex++; setTimeout(typeNext, 40);
                    } else if (state.charIndex < currentLine.length) {
                        let isFirstChar = (state.charIndex === 0 && state.lineIndex === 0);
                        el.innerHTML = state.outHtml + currentLine.substring(isFirstChar ? 1 : 0, state.charIndex + 1); state.charIndex++; setTimeout(typeNext, 35); 
                    } else { state.outHtml = el.innerHTML + "<br>"; el.innerHTML = state.outHtml; state.lineIndex++; state.charIndex = 0; setTimeout(typeNext, 400); }
                } else { 
                    state.status = "finished"; el.setAttribute("data-animated", "true"); el.classList.remove("is-typing"); 
                    if(signEl) { signEl.classList.add("active-sign"); } 
                    if(poemIndex !== null) applyWhispers(el, poemIndex);
                }
            }
            setTimeout(typeNext, 200);
        });
    }

    document.body.addEventListener('click', async function(e) {
        if(e.target && e.target.classList.contains('download-poem-btn')) {
            const pIdx = e.target.getAttribute('data-poem-index'); if(pIdx === null) return;
            const poem = POEM_DATABASE[pIdx]; const canvas = document.createElement("canvas"); const ctx = canvas.getContext("2d");
            canvas.width = 1080; canvas.height = 1920;
            ctx.fillStyle = globalState.activeTheme === "dark" ? "#0b0b0f" : "#e8dcc7"; ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = "#bfa46f"; ctx.lineWidth = 4; ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);
            ctx.fillStyle = "#bfa46f"; ctx.textAlign = "center"; ctx.font = "bold 60px Cinzel, serif"; ctx.fillText("THE MIDNIGHT LIBRARY", canvas.width / 2, 180);
            ctx.font = "30px sans-serif"; ctx.fillText("✦  ✦  ✦", canvas.width / 2, 240);
            ctx.font = "bold 80px Cinzel, serif"; ctx.fillText(poem.title.replace('<br>', ' '), canvas.width / 2, 400);
            ctx.font = "35px Cinzel, serif"; ctx.fillStyle = globalState.activeTheme === "dark" ? "rgba(242,238,233,0.6)" : "rgba(59,34,16,0.6)"; ctx.fillText(poem.subtitle, canvas.width / 2, 460);
            ctx.fillStyle = globalState.activeTheme === "dark" ? "#f2eee9" : "#3B2210"; ctx.font = "40px 'Playfair Display', serif";
            let y = 600; const lines = poem.text.split('\n');
            lines.forEach(line => { if(line === "") y += 40; else { ctx.fillText(line.trim(), canvas.width / 2, y); y += 60; } });
            ctx.fillStyle = "#bfa46f"; ctx.font = "italic 60px cursive"; ctx.fillText("— Soham Madan Jadhao", canvas.width / 2, canvas.height - 200);
            const link = document.createElement("a"); link.download = `${poem.title.replace('<br>','')}-Memory.png`; link.href = canvas.toDataURL("image/png"); link.click();
            showToast("📸 Memory Saved Successfully!");
        }

        if(e.target && e.target.classList.contains('share-poem-btn')) {
            const title = e.target.getAttribute('data-poem-title');
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
        if(!drawer || !openBtn) return;
        
        function renderBookmarks() {
            let bookmarks = JSON.parse(localStorage.getItem('midnightBookmarks') || '[]'); 
            if(list) {
                list.innerHTML = "";
                if (bookmarks.length === 0) { 
                    list.innerHTML = `<p style="opacity: 0.5; font-style: italic;">Your soul hasn't saved any verses yet...</p>`; 
                } else { 
                    bookmarks.forEach(bm => { list.innerHTML += `<div class="bookmark-item" style="padding:8px; border-bottom:1px solid rgba(191,164,111,0.1);">📖 ${bm}</div>`; }); 
                }
            }
        }
        openBtn.addEventListener("click", (e) => { e.preventDefault(); renderBookmarks(); drawer.classList.add("open"); }); 
        if(closeBtn) closeBtn.addEventListener("click", () => { drawer.classList.remove("open"); });
    }

    function initFavouritesDrawer() {
        const drawer = findSafeElement("favourites-drawer");
        const openBtn = findSafeElement("open-fav-btn");
        const closeBtn = findSafeElement("close-fav-drawer"); 
        const list = findSafeElement("favourites-list");
        if(!drawer || !openBtn) return;

        function renderFavs() {
            let favs = JSON.parse(localStorage.getItem('midnightFavs') || '[]'); 
            if(list) {
                list.innerHTML = "";
                if (favs.length === 0) { 
                    list.innerHTML = `<p style="opacity: 0.5; font-style: italic; padding:10px;">No verses have resonated with you yet...</p>`; 
                } else { 
                    favs.forEach(fv => { list.innerHTML += `<div class="bookmark-item" style="padding:8px; border-bottom:1px solid rgba(191,164,111,0.1);">❤️ ${fv}</div>`; }); 
                }
            }
        }

        openBtn.addEventListener("click", (e) => {
            e.preventDefault();
            renderFavs(); 
            drawer.classList.add("open"); 
        }); 

        if (closeBtn) closeBtn.addEventListener("click", () => { drawer.classList.remove("open"); });
    }

    function initLibraryFeatures() {
        const footerQuote = findSafeElement("quote-rotator"); 
        if(footerQuote) footerQuote.innerText = quoteDatabase[Math.floor(Math.random() * quoteDatabase.length)];
        
        const moonTrigger = findSafeElement("moon-phase", "🌙", ".moon-phase");
        if(moonTrigger) {
            moonTrigger.addEventListener("click", () => {
                globalState.secretClicks++; 
                checkUltimateVault();
                if(globalState.secretClicks === 3) { 
                    globalState.hasTappedMoon = true; 
                    checkUltimateVault();
                    showToast("🏆 Achievement Unlocked: Moonwalker");
                    
                    const vaultBtn = document.querySelector(".trigger-nav[data-target='page-secret']");
                    if (vaultBtn) { vaultBtn.click(); } else { const secPage = findSafeElement('page-secret'); if(secPage) secPage.classList.add('active'); }
                    globalState.secretClicks = 0;
                }
            });
        }
        
        document.body.addEventListener('click', function(e) {
            if(e.target && e.target.classList.contains('bookmark-btn')) {
                const poemId = e.target.getAttribute('data-poem'); let bookmarks = JSON.parse(localStorage.getItem('midnightBookmarks') || '[]');
                if (!bookmarks.includes(poemId)) { 
                    bookmarks.push(poemId); localStorage.setItem('midnightBookmarks', JSON.stringify(bookmarks)); showToast("🔖 Verse saved to your soul."); 
                } else { showToast("✨ Verse already remembered."); }
                e.target.innerText = "❤️ Saved";
            }

            if(e.target && e.target.classList.contains('resonate-btn')) {
                const poemTitle = e.target.getAttribute('data-poem'); let favs = JSON.parse(localStorage.getItem('midnightFavs') || '[]');
                if (!favs.includes(poemTitle)) { 
                    favs.push(poemTitle); localStorage.setItem('midnightFavs', JSON.stringify(favs)); 
                    showToast("❤️ Added to your Favourites."); 
                } else { showToast("✨ Already in your Favourites."); }
            }
        });
    }

    function showToast(msg) {
        const container = findSafeElement("toast-container"); 
        if(!container) return;
        const toast = document.createElement("div"); toast.className = "toast"; toast.innerText = msg; 
        toast.style.cssText = "background:rgba(15,15,25,0.95); color:var(--gold); border:1px solid var(--gold); padding:10px 20px; border-radius:4px; margin-top:10px; font-family:'Cinzel',serif; box-shadow:0 4px 15px rgba(0,0,0,0.5);";
        container.appendChild(toast); setTimeout(() => toast.remove(), 3500);
    }

    function initZenMode() {
        let zenBtn = findSafeElement("zen-mode-toggle", "ZEN MODE");
        if (!zenBtn) return;
        let zenScrollId; 

        function smoothScroll() {
            if (!globalState.zenActive) return;
            window.scrollBy(0, 0.6); 
            if (Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight) {
                stopZen(false); return;
            }
            zenScrollId = requestAnimationFrame(smoothScroll);
        }

        function startZen() {
            globalState.zenActive = true;
            zenBtn.innerHTML = "🛑 Stop Zen";
            showToast("🧘 Zen Mode Active...");
            zenScrollId = requestAnimationFrame(smoothScroll);
        }

        function stopZen(silent = false) {
            globalState.zenActive = false;
            zenBtn.innerHTML = "📜 Zen Mode";
            cancelAnimationFrame(zenScrollId);
            if (!silent) showToast("🛑 Zen Mode Paused.");
        }

        zenBtn.addEventListener("click", (e) => {
            e.preventDefault();
            if (!globalState.zenActive) { startZen(); } else { stopZen(false); }
        });

        window.stopZenModeGlobally = function() { if (globalState.zenActive) stopZen(true); };
        window.addEventListener("wheel", () => { if (globalState.zenActive) stopZen(true); });
        window.addEventListener("touchstart", (e) => {
            if (globalState.zenActive && !zenBtn.contains(e.target)) { stopZen(true); showToast("🖐️ Manual interaction detected."); }
        }, { passive: true });
    }

    function initAudioSpeechEngine() {
        if (window.audioSpeechEngineInitialized) return;
        window.audioSpeechEngineInitialized = true;
        let activeListenBtn = null;

        document.body.addEventListener('click', function(e) {
            if (e.target && e.target.classList.contains('listen-btn')) {
                const pIdx = e.target.getAttribute('data-poem-index');
                if (pIdx === null) return;
                const poem = POEM_DATABASE[pIdx];

                if (window.speechSynthesis.speaking && activeListenBtn === e.target) {
                    window.speechSynthesis.cancel(); resetListenBtn(); return;
                }

                window.speechSynthesis.cancel();
                if (activeListenBtn) resetListenBtn();

                const cleanTitle = poem.title.replace(/<br\s*\/?>/gi, " ");
                const textToSpeak = `${poem.chapterLabel}. ${cleanTitle}. ${poem.subtitle}. ${poem.text}`;
                const utterance = new SpeechSynthesisUtterance(textToSpeak);
                utterance.rate = 0.85; utterance.pitch = 0.95; 

                const voices = window.speechSynthesis.getVoices();
                const premiumVoice = voices.find(v => v.lang.startsWith('en-GB') || v.lang.startsWith('en-US'));
                if (premiumVoice) utterance.voice = premiumVoice;

                utterance.onend = () => resetListenBtn();
                utterance.onerror = () => resetListenBtn();

                activeListenBtn = e.target;
                activeListenBtn.innerText = "🛑 STOP VOICE";

                window.speechSynthesis.speak(utterance);
            }
        });

        function resetListenBtn() {
            if (activeListenBtn) { activeListenBtn.innerText = "🎙️ LISTEN TO VERSE"; activeListenBtn = null; }
        }

        window.stopAudioSpeechGlobally = function() {
            if (window.speechSynthesis.speaking) { window.speechSynthesis.cancel(); resetListenBtn(); }
        };
    }
});
