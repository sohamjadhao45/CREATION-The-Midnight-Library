/* =====================================================================
   THE MIDNIGHT LIBRARY ENGINE (ULTIMATE PRO EDITION)
   Linter-Safe | Interactive Click Wax Seal | Dynamic JSON Fetching | Memory Downloader
   ===================================================================== */

const twStates = new WeakMap();

document.addEventListener("DOMContentLoaded", () => {
    "use strict";
    // 🟢 PWA SERVICE WORKER REGISTRATION (Offline Mode)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js')
                .then(reg => console.log('Service Worker Active: True Offline Mode ON ✈️'))
                .catch(err => console.error('Service Worker Failed:', err));
        });
    }

    // 🟢 PUSH NOTIFICATION PERMISSION ALARM
    function askNotificationPermission() {
        if ("Notification" in window && Notification.permission !== "granted" && Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    console.log("Notifications Granted! 🌌");
                }
            });
        }
    }
   
    let POEM_DATABASE = []; 
    const UPCOMING_CHAPTER = { chapterNum: "IV", title: "THE UNSEEN REALM" };

    const globalState = { activeTheme: "dark", isAudioPlaying: false, vortexActive: false, secretClicks: 0, notesVisitCount: 0, secretPassword: "", hasTappedMoon: false, hasTypedWord: false, rainActive: false, visitorName: "Wanderer", elevenElevenTriggered: false, zenModeActive: false };

    const midnightThoughts = ["The moon has seen every version of you.", "Not every chapter deserves a sequel.", "Some memories glow brighter after they're gone.", "The hardest part of moving forward is not looking back.", "We bury our loudest screams in the quietest poetry."];
    const moonWords = ["silence", "poetry", "creation", "memories", "love", "solitude", "eternity"];
    
    const starCoords = [
        {top: 50, left: 20}, {top: 20, left: 50}, {top: 60, left: 80}, 
        {top: 80, left: 40}, {top: 30, left: 85}, {top: 75, left: 15},
        {top: 40, left: 10}, {top: 15, left: 75}, {top: 85, left: 80}, {top: 55, left: 50}
    ];

    const audioPageTurn = document.getElementById("audio-page-turn");
    const audioRain = document.getElementById("audio-rain");
    const audioAmbient = document.getElementById("audio-ambient");

    // DATA FETCHING
    async function loadLibraryData() {
        try {
            const response = await fetch('poems.json'); 
            if (!response.ok) throw new Error("Network response was not ok");
            POEM_DATABASE = await response.json(); 
            buildLibrarySystem(); 
            initLibraryFilters(); // 🟢 Naya search filter chalu kiya
            initLedger(); 
        } catch (error) {
            console.error("Error loading the Midnight Library Archives:", error);
            const bookshelf = document.getElementById("dynamic-bookshelf");
            if (bookshelf) bookshelf.innerHTML = "<p style='color: var(--gold);'>The archives are currently silent... (Check JSON file)</p>";
        }
    }

    // Initialize core features
    initTimeGreeting();
    initClockAndAtmosphere(); 
    initUltimateUniverseBackground(); 
    initCosmicNavigation(); 
    initDirectHeaderButtons(); 
    initScrollProgressBar(); 
    initDynamicShadows(); 
    initTimeCapsule(); 
    initPassport(); 
    initTouchRipple(); 
    init1111Wish(); 
    initFeedbackModal();

    loadLibraryData();

    // App Install PWA Script
    let deferredPrompt;
    const installBtn = document.getElementById('installAppBtn');
    if (installBtn) {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            installBtn.style.display = 'inline-block';
        });
        installBtn.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                if (outcome === 'accepted') console.log('App install ho gaya!');
                deferredPrompt = null;
                installBtn.style.display = 'none';
            }
        });
    }

    // 🟢 SMART WEATHER & TIME GREETING ENGINE
    const WEATHER_API_KEY = "YAHAN_APNI_OPENWEATHER_API_KEY_PASTE_KARO"; // 👈 Apni Key yahan daalna

    async function initTimeGreeting() {
        const greetingEl = document.getElementById("time-greeting");
        if (!greetingEl) return;

        const hour = new Date().getHours();
        let timeGreeting = "Welcome, Wanderer";
        
        if (hour >= 5 && hour < 12) timeGreeting = "Good Morning";
        else if (hour >= 12 && hour < 17) timeGreeting = "Good Afternoon";
        else if (hour >= 17 && hour < 21) timeGreeting = "Good Evening";
        else timeGreeting = "The night is quiet";

        // Location aur Weather nikalne ka logic
        if (navigator.geolocation && WEATHER_API_KEY !== "YAHAN_APNI_OPENWEATHER_API_KEY_PASTE_KARO") {
            navigator.geolocation.getCurrentPosition(async (position) => {
                try {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
                    const data = await res.json();
                    
                    const weatherCondition = data.weather[0].main.toLowerCase();
                    const temp = Math.round(data.main.temp);
                    
                    let weatherGreeting = `It's a beautiful day`;
                    if (weatherCondition.includes("rain") || weatherCondition.includes("drizzle")) {
                        weatherGreeting = `It's raining softly (${temp}°C)`;
                        if(!globalState.rainActive) toggleRain(); 
                    } else if (weatherCondition.includes("cloud")) {
                        weatherGreeting = `The sky is cloudy (${temp}°C)`;
                    } else if (weatherCondition.includes("clear")) {
                        weatherGreeting = `The stars are clear (${temp}°C)`;
                    }

                    greetingEl.innerText = `${timeGreeting}, Wanderer. ${weatherGreeting}, perfect for reading.`;
                } catch (err) {
                    console.log("Weather fetch failed, using fallback time greeting.");
                    greetingEl.innerText = `${timeGreeting === "The night is quiet" ? timeGreeting + ", perfect for reading." : timeGreeting + ", Wanderer."}`;
                }
            }, () => {
                greetingEl.innerText = `${timeGreeting === "The night is quiet" ? timeGreeting + ", perfect for reading." : timeGreeting + ", Wanderer."}`;
            });
        } else {
            greetingEl.innerText = `${timeGreeting === "The night is quiet" ? timeGreeting + ", perfect for reading." : timeGreeting + ", Wanderer."}`;
        }
    }

    function initTouchRipple() {
        document.body.addEventListener('click', (e) => {
            if(e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('.btn-icon') || e.target.closest('.nav-link')) return;
            const ripple = document.createElement('div');
            ripple.className = 'touch-ripple';
            ripple.style.left = e.clientX + 'px';
            ripple.style.top = e.clientY + 'px';
            document.body.appendChild(ripple);
            setTimeout(() => ripple.remove(), 800);
        });
    }

    function initPassport() {
        const input = document.getElementById("visitor-name");
        const enterBtn = document.getElementById("enter-library-btn");
        const savedName = localStorage.getItem("midnightVisitor");
        if(savedName && input) input.value = savedName;

        if(enterBtn) {
            enterBtn.addEventListener("click", () => {
                let name = input ? input.value.trim() : "";
                if(!name) name = "Wanderer";
                localStorage.setItem("midnightVisitor", name);
                globalState.visitorName = name;
                
                askNotificationPermission(); 
                
                const greeting = document.getElementById("vault-greeting");
                if(greeting) greeting.innerHTML = `Ah, <span style="color:var(--gold);">${name}</span>... welcome to the Secret Vault.`;

                const letterTitle = document.getElementById("reader-letter-title");
                if(letterTitle) letterTitle.innerText = `A LETTER TO ${name.toUpperCase()}`;

                document.getElementById("intro-screen").classList.add("fade-out");
                
                if(audioAmbient && !globalState.isAudioPlaying) {
                    audioAmbient.volume = 0.2;
                    audioAmbient.play().catch(e => console.log("Audio play blocked"));
                    globalState.isAudioPlaying = true;
                }
            });
        }
    }

    function initDirectHeaderButtons() {
        document.getElementById('moon-phase')?.addEventListener('click', () => {
            globalState.secretClicks++;
            if (globalState.secretClicks === 1) showToast("🌙 Moon tapped 1/3...");
            if (globalState.secretClicks === 2) showToast("🌙 Moon tapped 2/3...");
            if (globalState.secretClicks >= 3) {
                globalState.hasTappedMoon = true;
                showToast("👁️ The Vault Opens...");
                const trigger = document.getElementById('secret-vault-trigger');
                if(trigger) trigger.click(); 
                checkUltimateVault();
            }
        });

        document.getElementById('open-fav-btn')?.addEventListener('click', () => {
            document.getElementById('favourites-drawer')?.classList.add('open');
        });
        document.getElementById('close-fav-drawer')?.addEventListener('click', () => {
            document.getElementById('favourites-drawer')?.classList.remove('open');
        });

        document.getElementById('open-bookmarks-btn')?.addEventListener('click', () => {
            document.getElementById('bookmarks-drawer')?.classList.add('open');
        });
        document.getElementById('close-drawer')?.addEventListener('click', () => {
            document.getElementById('bookmarks-drawer')?.classList.remove('open');
        });

        document.getElementById('reading-mode-toggle')?.addEventListener('click', () => {
            document.body.classList.toggle('reading-mode');
            const exitBtn = document.getElementById('exit-focus-btn');
            if(document.body.classList.contains('reading-mode')) {
                if(exitBtn) exitBtn.style.display = 'block';
                showToast("📖 Focus Mode activated.");
            } else {
                if(exitBtn) exitBtn.style.display = 'none';
                showToast("📖 Focus Mode disabled.");
            }
        });
        document.getElementById('exit-focus-btn')?.addEventListener('click', () => {
            document.body.classList.remove('reading-mode');
            document.getElementById('exit-focus-btn').style.display = 'none';
        });

        document.getElementById('theme-toggle')?.addEventListener('click', (e) => {
            const html = document.documentElement;
            if(globalState.activeTheme === "dark") { 
                html.setAttribute('data-theme', 'light'); 
                globalState.activeTheme = "light"; 
                e.target.innerText = "☀️ Day"; 
            } else { 
                html.setAttribute('data-theme', 'dark'); 
                globalState.activeTheme = "dark"; 
                e.target.innerText = "🌙 Night"; 
            }
        });

        document.getElementById('rain-toggle')?.addEventListener('click', toggleRain);
    }

    function buildLibrarySystem() {
        const nav = document.getElementById("library-nav"); 
        const bookshelf = document.getElementById("dynamic-bookshelf"); 
        const starMap = document.getElementById("star-map"); 
        const authorScripting = document.getElementById("author-scripting-status"); 
        const secretPage = document.getElementById("page-secret");
        
        if(!nav || !bookshelf || !secretPage) return;

        nav.innerHTML = `<button class="nav-link active-nav trigger-nav" data-target="page1">Library Entrance</button>`; 
        bookshelf.innerHTML = ""; 
        let prevPageId = "page1";

        POEM_DATABASE.forEach((poem, i) => {
            const pageId = `poem-page-${i + 1}`; 
            const nextPageId = i < POEM_DATABASE.length - 1 ? `poem-page-${i + 2}` : `page-fragments`;
            
            nav.innerHTML += `<button class="nav-link trigger-nav" data-target="${pageId}">${poem.chapterLabel}</button>`;
            
            const cleanTitle = poem.title.replace('<br>', ' '); 
            const safeText = poem.text.replace(/\n/g, '\\n');

            const sectionHtml = `
            <section id="${pageId}" class="page" data-poem-index="${i}">
              <div class="top-deco">✧ ─ ❦ ─ ✧</div>
              <span class="chapter-badge">${poem.chapterLabel}</span>
              <div class="heading-wrapper"><h2 class="page1-heading moon-glow">${poem.title}</h2></div>
              <p class="poem-subtitle">${poem.subtitle}</p>
              <div class="meta-strip" style="margin: 15px 0;">
                <span class="mood-tag tag-motivation">${poem.themeTag}</span>
                <span class="read-time">⏱️ 1 Min Read</span>
                <button class="bookmark-btn btn-utility" data-poem="${poem.spineLabel}" style="border: none; background: transparent; padding: 0 !important; cursor: pointer; color: var(--gold);">🔖 Bookmark</button>
              </div>
              <div class="poetry-box antique-parchment dynamic-shadow" id="card-${pageId}">
                <div class="wax-seal-wrapper seal-clickable" data-target-text="text-${pageId}">
                    <div class="wax-seal" title="Click to break seal">
                        <div class="seal-ring"></div>
                        <span class="seal-letter">SJ</span>
                    </div>
                </div>
                
                <div class="poem-text-container" id="text-${pageId}" style="opacity: 0; pointer-events: none; transition: opacity 1.5s ease;">
                    <p class="royal-poem-text typewriter-poem" data-lines="${safeText}"></p><br>
                    <p class="poem-date">${poem.dateText}</p>
                    <span class="poem-greatvibes sign-animate">${poem.signature}</span>
                    <div class="poem-interactions mt-20">
                        <button class="resonate-btn" data-poem="${cleanTitle}">⭐ RESONATED WITH ME</button>
                        <button class="listen-btn">🎙️ LISTEN TO THE POEM</button>
                    </div>
                    
                    <div class="visitor-journal mt-20" style="max-width: 100%; border-top: 1px dashed rgba(191,164,111,0.3); padding-top: 15px;">
                       <input type="text" placeholder="Write something memorable..." class="journal-input ledger-input inline-poem-feedback" style="z-index: 10; position: relative;">
                       <button class="journal-submit ledger-submit" style="z-index: 10; position: relative;">🖋️</button>
                    </div>
                </div>
              </div>

              <div class="button-row" style="margin-top: 15px;">
                <button class="btn-utility download-poem-btn" data-target="card-${pageId}">📸 Save As A Memory</button>
                <button class="btn-utility share-poem-btn" data-poem-title="${cleanTitle}">🔗 Share Verse</button>
              </div>
              <div class="button-row mt-20"><button class="btn-outline trigger-nav" data-target="${prevPageId}">❮ Previous</button><button class="btn-solid trigger-nav" data-target="${nextPageId}">Next ❯</button></div>
            </section>`;
            secretPage.insertAdjacentHTML('beforebegin', sectionHtml);
            bookshelf.innerHTML += `<div class="book-spine ${i % 2 !== 0 ? 'spine-gold' : ''} trigger-nav" data-target="${pageId}"><div class="spine-text">${poem.spineLabel}</div></div>`;
            prevPageId = pageId;
        });

        nav.innerHTML += `<button class="nav-link trigger-nav" data-target="page-fragments">Notes Room</button><button class="nav-link trigger-nav" data-target="page-archive">Ancient Shelf</button><button class="nav-link trigger-nav" data-target="page-about">Author's Chamber</button>`;
        
        const btnExplore = document.getElementById("btn-explore");
        if(btnExplore) btnExplore.setAttribute("data-target", "poem-page-1"); 
        
        const btnFragPrev = document.getElementById("btn-frag-prev");
        if(btnFragPrev) btnFragPrev.setAttribute("data-target", `poem-page-${POEM_DATABASE.length}`);
        
        bookshelf.innerHTML += `<div class="book-spine spine-locked interactive-locked" title="Some stories are still being lived."><div class="spine-text">${UPCOMING_CHAPTER.title}</div><div class="spine-subtext" style="position: absolute; bottom: 10px; width: 100%; text-align: center; font-size: 8px; color: rgba(255,255,255,0.4);">UNAVAILABLE</div></div>`;

        if(starMap) {
            let svgLines = ''; let starsHtml = '';
            for (let i = 0; i < POEM_DATABASE.length; i++) {
                let p1 = starCoords[i % starCoords.length]; 
                starsHtml += `<div class="star-node active-star trigger-nav" data-target="poem-page-${i+1}" title="${POEM_DATABASE[i].dateText} - ${POEM_DATABASE[i].title.replace('<br>',' ')}" style="top: ${p1.top}%; left: ${p1.left}%;"></div>`;
                if (i < POEM_DATABASE.length - 1) { 
                    let p2 = starCoords[(i+1) % starCoords.length]; 
                    svgLines += `<line x1="${p1.left}%" y1="${p1.top}%" x2="${p2.left}%" y2="${p2.top}%" stroke="rgba(191,164,111,0.4)" stroke-width="1" stroke-dasharray="4" />`; 
                }
            }
            if (POEM_DATABASE.length > 0) {
                let lastStar = starCoords[(POEM_DATABASE.length - 1) % starCoords.length]; 
                let lockedStar = starCoords[POEM_DATABASE.length % starCoords.length];
                svgLines += `<line x1="${lastStar.left}%" y1="${lastStar.top}%" x2="${lockedStar.left}%" y2="${lockedStar.top}%" stroke="rgba(191,164,111,0.1)" stroke-width="1" stroke-dasharray="4" />`;
                starsHtml += `<div class="star-node pulse-star interactive-locked" title="Awaiting Completion..." style="top: ${lockedStar.top}%; left: ${lockedStar.left}%;"></div>`;
            }
            starMap.innerHTML = `<svg width="100%" height="100%" style="position: absolute; top:0; left:0; z-index: 1;">${svgLines}</svg>${starsHtml}`;
        }
        if(authorScripting) authorScripting.innerHTML = `<span class="pulse-dot"></span><strong>Currently Scripting:</strong> Chapter ${UPCOMING_CHAPTER.chapterNum}: ${UPCOMING_CHAPTER.title}`;
    }

    const thoughtBtn = document.getElementById("reveal-thought-btn");
    const thoughtDisplay = document.getElementById("midnight-thought-display");
    if(thoughtBtn && thoughtDisplay) {
        thoughtBtn.addEventListener("click", () => {
            thoughtDisplay.style.opacity = 0;
            setTimeout(() => { thoughtDisplay.innerText = `"${midnightThoughts[Math.floor(Math.random() * midnightThoughts.length)]}"`; thoughtDisplay.style.opacity = 0.8; }, 300);
        });
    }

    function initDynamicShadows() {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20; 
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            document.documentElement.style.setProperty('--shadow-x', `${x}px`); 
            document.documentElement.style.setProperty('--shadow-y', `${15 + y}px`);
        });
    }

    function initTimeCapsule() {
        const capsule = document.getElementById("time-capsule-item"); 
        const status = document.getElementById("capsule-status");
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
            const progress = document.getElementById("reading-progress");
            if(progress) progress.style.width = sh > 0 ? ((st / sh) * 100) + "%" : "0%"; 
        }); 
    }

    function checkUltimateVault() {
        const condMoon = document.getElementById("cond-moon"); 
        const condNotes = document.getElementById("cond-notes"); 
        const condWord = document.getElementById("cond-word"); 
        if(!condMoon) return;

        condMoon.innerText = globalState.hasTappedMoon ? "✅ Moon Tapped (3/3)" : `❌ Moon Tapped (${globalState.secretClicks}/3)`;
        condNotes.innerText = globalState.notesVisitCount >= 5 ? "✅ Notes Room Visits (5/5)" : `❌ Notes Room Visits (${globalState.notesVisitCount}/5)`;
        if(globalState.hasTypedWord || globalState.hasTappedMoon) condWord.innerText = "✅ Secret Code Unlocked";

        if(globalState.hasTappedMoon && globalState.notesVisitCount >= 5) {
            document.getElementById("quest-conditions").style.display = "none"; 
            document.getElementById("hidden-poem-container").style.display = "block"; 
            document.getElementById("ultimate-secret-log").querySelector("strong").innerText = "🔓 Vault Log #003 (Status: Unlocked)";
        }
    }

    // 🟢 GLOBAL LIVE LEDGER ENGINE (Firebase Integration)
    const firebaseConfig = {
      apiKey: "AIzaSyCSdODyXvhIEWsfkQEdjawRGY4yU3FviDs",
      authDomain: "creation-3c255.firebaseapp.com",
      databaseURL: "https://creation-3c255-default-rtdb.firebaseio.com/", 
      projectId: "creation-3c255",
      storageBucket: "creation-3c255.firebasestorage.app",
      messagingSenderId: "451624734305",
      appId: "1:451624734305:web:0b742be3d9a0059209a420"
    };

    let database = null;
    if (typeof firebase !== 'undefined') {
        firebase.initializeApp(firebaseConfig);
        database = firebase.database();
    }

    function initLedger() {
        const ledgerList = document.getElementById("ledger-list"); 
        if(!ledgerList) return;

        if (database) {
            database.ref('ledger_entries').limitToLast(15).on('value', (snapshot) => {
                ledgerList.innerHTML = "";
                const data = snapshot.val();
                if (!data) {
                    ledgerList.innerHTML = `<p style="margin-bottom: 8px; font-style: italic; opacity:0.5;">No wandering souls have left a mark yet...</p>`;
                    return;
                }
                const entriesArray = Object.values(data).reverse();
                entriesArray.forEach(e => { 
                    ledgerList.innerHTML += `<p style="margin-bottom: 8px; font-style: italic;">"${e.text}" <span style="font-size:11px; opacity:0.5;">— ${e.date}</span></p>`; 
                });
            });
        } else {
            let entries = JSON.parse(localStorage.getItem('midnightLedger') || '[]');
            ledgerList.innerHTML = "";
            if(entries.length === 0) { 
                ledgerList.innerHTML = `<p style="margin-bottom: 8px; font-style: italic; opacity:0.5;">No database connected yet...</p>`; 
            } else { 
                entries.forEach(e => { 
                    ledgerList.innerHTML += `<p style="margin-bottom: 8px; font-style: italic;">"${e.text}" <span style="font-size:11px; opacity:0.5;">— ${e.date}</span></p>`; 
                }); 
            }
        }

        if(!window.ledgerBound) {
            document.body.addEventListener('click', (e) => {
                if(e.target.classList.contains('ledger-submit')) {
                    const parentDiv = e.target.closest('.visitor-journal');
                    const input = parentDiv.querySelector('.ledger-input');
                    if(input && input.value.trim() !== "") {
                        const newEntry = {
                            text: input.value.trim(),
                            date: new Date().toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })
                        };

                        if (database) {
                            database.ref('ledger_entries').push(newEntry);
                        } else {
                            let entries = JSON.parse(localStorage.getItem('midnightLedger') || '[]');
                            entries.unshift(newEntry);
                            if(entries.length > 10) entries.pop(); 
                            localStorage.setItem('midnightLedger', JSON.stringify(entries));
                            e.target.classList.add('local-refresh'); 
                        }
                        
                        input.value = ""; 
                        showToast("🖋️ Your silence has been recorded globally."); 
                        if(!database) location.reload(); 
                    }
                }
            });
            window.ledgerBound = true;
        }
    }

    function toggleRain() {
        globalState.rainActive = !globalState.rainActive; 
        const rCanvas = document.getElementById("rain-canvas");
        if(!rCanvas) return;

        if(globalState.rainActive) { 
            rCanvas.classList.add("raining"); 
            startRainVisuals(); 
            showToast("🌧️ The sky begins to weep..."); 
            if(audioRain) { audioRain.volume = 0.5; audioRain.play(); }
        } else { 
            rCanvas.classList.remove("raining"); 
            showToast("🌤️ The storm has passed."); 
            if(audioRain) { audioRain.pause(); }
        }
    }

    function init1111Wish() {
        const modal = document.getElementById("wish-modal");
        const submitBtn = document.getElementById("submit-wish-btn");
        const input = document.getElementById("wish-input");
        
        setInterval(() => {
            const now = new Date();
            if (now.getHours() === 23 && now.getMinutes() === 11 && !globalState.elevenElevenTriggered) {
                globalState.elevenElevenTriggered = true;
                if(modal) modal.style.display = 'flex';
                showToast("✨ The universe is listening...");
            }
        }, 30000); 

        if(submitBtn && modal && input) {
            submitBtn.addEventListener('click', () => {
                if(input.value.trim() !== '') {
                    modal.style.display = 'none';
                    showToast("🌠 Your wish has been cast into the cosmos.");
                } else {
                    showToast("Whisper something first.");
                }
            });
        }
    }

    function initClockAndAtmosphere() {
        const dateSpan = document.getElementById('journal-date');
        if(!dateSpan) return;
        
        const updateDate = () => {
            const now = new Date();
            dateSpan.innerText = `Journal Entry: ${now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
        };
        
        updateDate(); 
        setInterval(updateDate, 60000); 
    }

    function executeMemoryDownload(element) {
        if (typeof html2canvas === 'undefined') {
            showToast("⏳ Loading camera, please click again...");
            return;
        }
        html2canvas(element, {
            useCORS: true,
            allowTaint: true,
            backgroundColor: "#151515", 
            scale: window.devicePixelRatio || 2 
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = `Midnight_Library_Memory_${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            showToast("✨ Memory Card saved to storage!");
        }).catch(err => {
            console.error("Download failed:", err);
            showToast("❌ Technical error saving image.");
        });
    }

    function initCosmicNavigation() {
        document.body.addEventListener('click', (e) => {
            
            if(e.target.classList.contains('download-poem-btn')) {
                const targetId = e.target.getAttribute('data-target');
                const targetCard = document.getElementById(targetId);
                if(targetCard) {
                    showToast("📸 Capturing high-quality memory...");
                    if (typeof html2canvas === 'undefined') {
                        const script = document.createElement('script');
                        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
                        script.onload = () => executeMemoryDownload(targetCard);
                        document.head.appendChild(script);
                    } else {
                        executeMemoryDownload(targetCard);
                    }
                }
                return;
            }

            const sealWrapper = e.target.closest('.seal-clickable');
            if (sealWrapper && !sealWrapper.classList.contains('broken')) {
                sealWrapper.classList.add('broken');
                
                const targetTextId = sealWrapper.getAttribute('data-target-text');
                const textContainer = document.getElementById(targetTextId);
                
                if (textContainer) {
                    textContainer.style.opacity = '1';
                    textContainer.style.pointerEvents = 'auto';
                    
                    const typewriterEl = textContainer.querySelector('.typewriter-poem');
                    if (typewriterEl) {
                        setTimeout(() => initTypewriterEngine(typewriterEl), 600); 
                    }
                }
                return; 
            }

            const navTrigger = e.target.closest('.trigger-nav');
            if(navTrigger) {
                if(audioPageTurn) {
                    audioPageTurn.currentTime = 0;
                    audioPageTurn.play().catch(()=>{});
                }
                const target = navTrigger.getAttribute('data-target');
                document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
                
                const newPage = document.getElementById(target);
                if(newPage) {
                    newPage.classList.add('active');
                    
                    const pageSealWrapper = newPage.querySelector('.seal-clickable');
                    if (!pageSealWrapper || pageSealWrapper.classList.contains('broken')) {
                        const typewriters = newPage.querySelectorAll('.typewriter-poem');
                        typewriters.forEach(el => {
                            setTimeout(() => initTypewriterEngine(el), 100);
                        });
                    }
                }
                
                document.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active-nav'));
                const newActiveNav = document.querySelector(`.nav-link[data-target="${target}"]`);
                if(newActiveNav) newActiveNav.classList.add('active-nav');
                
                if(target === "page-fragments") {
                    globalState.notesVisitCount++;
                    checkUltimateVault();
                }
                return; 
            }
            
            if(e.target.classList.contains('resonate-btn')) {
                const poemTitle = e.target.getAttribute('data-poem'); 
                let currentFavs = JSON.parse(localStorage.getItem('midnight_favourites') || '[]');
                if (poemTitle && !currentFavs.includes(poemTitle)) {
                    currentFavs.push(poemTitle);
                    localStorage.setItem('midnight_favourites', JSON.stringify(currentFavs));
                    if (typeof updateSavedPanels === 'function') updateSavedPanels(); 
                }
                showToast(`❤️ "${poemTitle}" added to your saved echoes.`);
            }

            if(e.target.classList.contains('bookmark-btn')) {
                const poemTitle = e.target.getAttribute('data-poem') || e.target.getAttribute('data-poem-title');
                let currentBookmarks = JSON.parse(localStorage.getItem('midnight_bookmarks') || '[]');
                if (poemTitle && !currentBookmarks.includes(poemTitle)) {
                    currentBookmarks.push(poemTitle);
                    localStorage.setItem('midnight_bookmarks', JSON.stringify(currentBookmarks));
                    if (typeof updateSavedPanels === 'function') updateSavedPanels();
                }
                showToast(`🔖 Bookmark placed.`);
            }
           
            if(e.target.classList.contains('share-poem-btn')) {
                const title = e.target.getAttribute('data-poem-title');
                if (navigator.share) {
                    navigator.share({ title: title, url: window.location.href });
                } else { 
                    navigator.clipboard.writeText(window.location.href); 
                    showToast("🔗 Link copied to clipboard!"); 
                }
            }

            // 🎧 AUDIO NARRATOR ENGINE
            if(e.target.classList.contains('listen-btn') || e.target.closest('.listen-btn')) {
                const btn = e.target.closest('.listen-btn') || e.target;
                
                if (window.speechSynthesis.speaking) {
                    window.speechSynthesis.cancel();
                    btn.innerHTML = "🎙️ LISTEN TO THE POEM";
                    showToast("🛑 Narration stopped.");
                    return;
                }

                const poemBox = btn.closest('.poem-text-container');
                if (!poemBox) return;
                
                const poemTextElement = poemBox.querySelector('.typewriter-poem');
                if (!poemTextElement) return;

                let textToRead = poemTextElement.innerText; 

                if ('speechSynthesis' in window) {
                    let utterance = new SpeechSynthesisUtterance(textToRead);
                    utterance.rate = 0.85; 
                    utterance.pitch = 0.9; 
                    
                    let voices = window.speechSynthesis.getVoices();
                    let calmVoice = voices.find(v => v.lang.includes('en-GB') || v.name.includes('UK') || v.name.includes('Google US English'));
                    if(calmVoice) utterance.voice = calmVoice;

                    window.speechSynthesis.speak(utterance);
                    
                    btn.innerHTML = "🛑 STOP LISTENING";
                    showToast("🎙️ The narrator begins reading...");

                    utterance.onend = function() {
                        btn.innerHTML = "🎙️ LISTEN TO THE POEM";
                    };
                } else {
                    showToast("⚠️ Your device doesn't support audio narration.");
                }
            }
        });
    }

    function initTypewriterEngine(el) {
        if (!twStates.has(el)) {
            twStates.set(el, { lineIndex: 0, charIndex: 0, outHtml: "", status: "unstarted" });
            el.innerHTML = "";
        }
        let state = twStates.get(el);

        const text = el.getAttribute("data-lines");
        if (!text) return;
        const lines = text.split('\\n');
        const signEl = el.closest('.poem-text-container')?.querySelector(".sign-animate");

        if (state.status === "finished") { 
            if(signEl) { signEl.classList.add("active-sign"); }
            return; 
        }
        if (state.status === "typing") return; 

        state.status = "typing"; 
        el.classList.add("is-typing"); 

        function typeWriter() {
            if (!el.closest('.page').classList.contains("active")) { 
                state.status = "paused"; 
                el.classList.remove("is-typing"); 
                return; 
            }
            if (state.lineIndex < lines.length) {
                let currentLine = lines[state.lineIndex];
                if (currentLine === "") {
                    state.outHtml += "<br><br>"; 
                    el.innerHTML = state.outHtml; 
                    state.lineIndex++; 
                    state.charIndex = 0;
                    setTimeout(typeWriter, 200); return;
                }
                if (state.charIndex === 0 && state.lineIndex === 0) {
                    let char = currentLine.charAt(0); 
                    state.outHtml += `<span class="drop-cap-antique">${char}</span>`; 
                    el.innerHTML = state.outHtml; 
                    state.charIndex++;
                    setTimeout(typeWriter, 40);
                } else if (state.charIndex < currentLine.length) {
                    let isFirstChar = (state.charIndex === 0 && state.lineIndex === 0);
                    el.innerHTML = state.outHtml + currentLine.substring(isFirstChar ? 1 : 0, state.charIndex + 1); 
                    state.charIndex++;
                    setTimeout(typeWriter, 35); 
                } else {
                    state.outHtml = el.innerHTML + "<br>"; 
                    el.innerHTML = state.outHtml; 
                    state.lineIndex++; 
                    state.charIndex = 0;
                    setTimeout(typeWriter, 400); 
                }
            } else { 
                state.status = "finished"; 
                el.classList.remove("is-typing"); 
                if(signEl) { signEl.classList.add("active-sign"); } 
            }
        }
        typeWriter();
    }

    let drops = [];
    function startRainVisuals() {
        const canvas = document.getElementById("rain-canvas");
        if(!canvas) return;
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        if(drops.length === 0) {
            for(let i=0; i<100; i++){
                drops.push({ x: Math.random()*canvas.width, y: Math.random()*canvas.height, l: Math.random()*1 + 10, v: Math.random()*2 + 10 });
            }
        }

        function drawRain() {
            if(!globalState.rainActive) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = 'rgba(174,194,224,0.5)';
            ctx.lineWidth = 1;
            ctx.lineCap = 'round';
            for(let i=0; i<drops.length; i++) {
                let d = drops[i];
                ctx.beginPath();
                ctx.moveTo(d.x, d.y);
                ctx.lineTo(d.x, d.y + d.l);
                ctx.stroke();
                d.y += d.v;
                if(d.y > canvas.height){ d.y = 0; d.x = Math.random() * canvas.width; }
            }
            requestAnimationFrame(drawRain);
        }
        drawRain();
    }

    function initUltimateUniverseBackground() {
        const canvas = document.getElementById("universe");
        if(!canvas) return;
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const stars = [];
        for (let i = 0; i < 150; i++) stars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random() * 1.5, opacity: Math.random() });

        function drawUniverse() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < stars.length; i++) {
                const s = stars[i];
                ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
                ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
                s.opacity += (Math.random() - 0.5) * 0.05;
                if(s.opacity < 0) s.opacity = 0; if(s.opacity > 1) s.opacity = 1;
            }
            requestAnimationFrame(drawUniverse);
        }
        drawUniverse();
    }

    function showToast(msg) {
        const t = document.createElement('div');
        t.className = 'toast'; 
        t.innerText = msg;
        const container = document.getElementById('toast-container');
        if(container) { container.appendChild(t); setTimeout(() => t.remove(), 3000); }
    }

    function initFeedbackModal() {
        const openBtn = document.getElementById('open-feedback-btn');
        const closeBtn = document.getElementById('close-feedback-btn');
        const submitBtn = document.getElementById('submit-feedback-btn');
        const modal = document.getElementById('feedback-modal');
        const input = document.getElementById('feedback-input');

        if(openBtn && modal) openBtn.addEventListener('click', () => modal.style.display = 'flex');
        if(closeBtn && modal) closeBtn.addEventListener('click', () => modal.style.display = 'none');
        if(submitBtn && modal && input) {
            submitBtn.addEventListener('click', () => {
                if(input.value.trim() !== '') { alert("Your words have been left in the library. Thank you."); modal.style.display = 'none'; input.value = ''; }
                else alert("Please write something before sending.");
            });
        }
    }

    function initLibraryFilters() {
        const searchInput = document.getElementById('library-search');
        const moodBtns = document.querySelectorAll('.mood-btn');
        const noResultsMsg = document.getElementById('no-results-msg');
        
        function filterLibrary() {
            const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
            const activeMoodBtn = document.querySelector('.mood-btn.active-mood');
            const activeMood = activeMoodBtn ? activeMoodBtn.getAttribute('data-mood') : "all";
            
            const spines = document.querySelectorAll('#dynamic-bookshelf .book-spine:not(.spine-locked)');
            const lockedSpine = document.querySelector('.spine-locked'); 
            
            let visibleCount = 0; 
            
            spines.forEach((spine, index) => {
                const poemData = POEM_DATABASE[index];
                if(!poemData) return;
                
                const matchesSearch = poemData.title.toLowerCase().includes(searchTerm) || 
                                      poemData.text.toLowerCase().includes(searchTerm) ||
                                      poemData.subtitle.toLowerCase().includes(searchTerm) ||
                                      poemData.themeTag.toLowerCase().includes(searchTerm);
                                      
                const matchesMood = activeMood === "all" || poemData.themeTag.includes(activeMood);
                
                if(matchesSearch && matchesMood) {
                    spine.style.display = "flex"; 
                    visibleCount++;
                } else {
                    spine.style.display = "none"; 
                }
            });

            if(lockedSpine) {
                if(searchTerm !== "" || activeMood !== "all") {
                    lockedSpine.style.display = "none"; 
                } else {
                    lockedSpine.style.display = "flex"; 
                }
            }

            if(visibleCount === 0 && noResultsMsg) {
                noResultsMsg.style.display = "block"; 
            } else if(noResultsMsg) {
                noResultsMsg.style.display = "none";
            }
        }

        if(searchInput) searchInput.addEventListener('input', filterLibrary);

        moodBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                moodBtns.forEach(b => b.classList.remove('active-mood'));
                e.target.classList.add('active-mood');
                filterLibrary();
            });
        });
    }

    function updateSavedPanels() {
        let favs = JSON.parse(localStorage.getItem('midnight_favourites') || '[]');
        let bookmarks = JSON.parse(localStorage.getItem('midnight_bookmarks') || '[]');

        const favContainer = document.getElementById('favourites-list'); 
        const archContainer = document.getElementById('bookmarks-list'); 

        if (favContainer) {
            if (favs.length === 0) {
                favContainer.innerHTML = `<p style="font-style:italic; opacity:0.6; text-align:center; padding: 20px 0;">No verses have resonated with you yet...</p>`;
            } else {
                favContainer.innerHTML = favs.map(title => 
                    `<div class="saved-item-row" data-poem-title="${title}" style="padding: 12px 15px; border-bottom: 1px dashed rgba(191,164,111,0.2); cursor: pointer; display: flex; align-items: center; transition: background 0.3s;">
                        <span style="color: var(--gold); font-family: 'Cinzel', serif; font-size: 14px; width: 100%;">❤️ ${title}</span>
                    </div>`
                ).join('');
            }
        }

        if (archContainer) {
            if (bookmarks.length === 0) {
                archContainer.innerHTML = `<p style="font-style:italic; opacity:0.6; text-align:center; padding: 20px 0;">Your soul hasn't saved any verses yet..</p>`;
            } else {
                archContainer.innerHTML = bookmarks.map(title => 
                    `<div class="saved-item-row" data-poem-title="${title}" style="padding: 12px 15px; border-bottom: 1px dashed rgba(191,164,111,0.2); cursor: pointer; display: flex; align-items: center; transition: background 0.3s;">
                        <span style="color: var(--gold); font-family: 'Cinzel', serif; font-size: 14px; width: 100%;">🔖 ${title}</span>
                    </div>`
                ).join('');
            }
        }

        document.querySelectorAll('.saved-item-row').forEach(item => {
            item.addEventListener('click', (e) => {
                const targetTitle = item.getAttribute('data-poem-title');
                
                if (typeof POEM_DATABASE !== 'undefined') {
                    const poemIndex = POEM_DATABASE.findIndex(p => p.title === targetTitle || p.spineLabel === targetTitle);
                    
                    if (poemIndex !== -1) {
                        document.getElementById('favourites-drawer')?.classList.remove('open');
                        document.getElementById('bookmarks-drawer')?.classList.remove('open');
                        
                        const targetPageId = `poem-page-${poemIndex + 1}`;
                        const navButton = document.querySelector(`.trigger-nav[data-target="${targetPageId}"]`);
                        
                        if(navButton) {
                            navButton.click(); 
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            showToast(`📖 Opening: ${targetTitle}`);
                        } else {
                            window.location.href = `?poem=${encodeURIComponent(targetTitle)}`;
                        }
                    }
                }
            });
        });
    }

    updateSavedPanels();                                 
});
