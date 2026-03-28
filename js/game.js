let questions=[]
let current=0
let score=0
let combo=0;
let extraHints=0;
let tutStep=1;
let gameTimer = null;
let timeLeft = 0;

let modeName = "";

async function startGame(mode){
    modeName = mode;
    current = 0;
    score = 0;
    combo = 0;
    
    document.getElementById("levelSelect").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");
    document.getElementById("game").classList.add("animate-up");
    
    // Fetch adaptive bugs
    const student = JSON.parse(localStorage.getItem("student"));
    const res = await fetch(`/api/bugs?mode=${mode}&count=${mode === 'timed' ? 50 : 10}&student_id=${student.id}`);
    const data = await res.json();
    questions = data.bugs;
    
    if (mode === 'timed') {
        startTimer(60); // 60 seconds for timed challenge
    }
    
    loadQuestion()
}

function startTimer(seconds) {
    timeLeft = seconds;
    if (gameTimer) clearInterval(gameTimer);
    
    gameTimer = setInterval(() => {
        timeLeft--;
        updateTimerUI();
        if (timeLeft <= 0) {
            clearInterval(gameTimer);
            finishGame();
        }
    }, 1000);
}

function updateTimerUI() {
    const timerElem = document.getElementById("gameTimer");
    if (timerElem) {
        timerElem.innerText = `TEMPO RESTANTE: ${timeLeft}s`;
        if (timeLeft <= 10) {
            timerElem.style.color = "var(--danger)";
            timerElem.classList.add("glitch");
        }
    }
}

function loadQuestion(){
    if(current >= questions.length){
        finishGame()
        return
    }
    
    let q = questions[current]
    // Embaralha as opções
    let options = [...q.choices]
    options.sort(() => Math.random() - 0.5)

    // Determina dificuldade baseada na categoria
    let difficultyClass = 'difficulty-iniciante';
    if (q.category === 'massiva') difficultyClass = 'difficulty-massiva';
    else if (q.category === 'logica') difficultyClass = 'difficulty-logica';

    // Syntax highlighting básico
    let highlightedCode = q.code
        .replace(/\b(def|if|else|for|while|return|import|from|class|try|except|with)\b/g, '<span class="syntax-keyword">$1</span>')
        .replace(/(["'`])(.*?)\1/g, '<span class="syntax-string">$&</span>')
        .replace(/#(.*)$/gm, '<span class="syntax-comment">#$1</span>')
        .replace(/\b\d+\b/g, '<span class="syntax-number">$&</span>')
        .replace(/\b(print|len|range|int|str|float)\b/g, '<span class="syntax-function">$1</span>');

    let html=`
    <div class="question-container glass" style="max-width: 900px; margin: 0 auto; border-color: var(--primary-glow);">
        <div class="question-header">
            <div>
                <span class="badge" style="background: var(--primary-glow); color: var(--primary); margin-right: 1rem;">PROTOCOLO #00${current + 1}</span>
                <span class="question-difficulty ${difficultyClass}">DIFICULDADE: ${q.category.toUpperCase()}</span>
                <span style="font-family: var(--font-heading); font-size: 0.8rem; color: var(--text-low); margin-left: 1rem;">${modeName.toUpperCase()} MISSION</span>
                <span id="gameTimer" style="margin-left: 1.5rem; font-family: var(--font-heading); font-size: 0.9rem; color: var(--primary);"></span>
            </div>
            <div style="display: flex; gap: 0.8rem;">
                <button class="btn btn-outline" id="hintBtn" style="font-size: 0.7rem; padding: 0.3rem 0.8rem;" onclick="showHint()">${t('btn_hint')}</button>
                <button class="btn btn-primary" id="extraHintBtn" style="font-size: 0.7rem; padding: 0.3rem 0.8rem; background: var(--secondary); border-color: var(--secondary);" onclick="useExtraHint()">DICA EXTRA</button>
            </div>
        </div>
        
        <p style="margin-bottom: 1.5rem; font-size: 1rem; color: var(--text-high); font-weight: 600;">${q.description}</p>
        
        <div class="question-code">
            <pre><code>${highlightedCode}</code></pre>
        </div>

        <div id="hintBox" class="glass hidden" style="margin: 1.5rem 0; border-color: var(--warning); padding: 1rem; background: rgba(255, 184, 0, 0.05);">
            <div style="display: flex; align-items: center; gap: 0.8rem; margin-bottom: 0.5rem;">
                <span style="font-size: 1.2rem;">💡</span>
                <strong style="color: var(--warning); font-family: var(--font-heading); font-size: 0.75rem;">DESCRIPTOGRAFANDO DICA:</strong>
            </div>
            <p id="hintText" style="font-size: 0.85rem; color: var(--text-med); font-style: italic;"></p>
        </div>

        <div class="question-options">
    `

    options.forEach((c, index)=>{
        html+=`<button class="choice-btn" onclick="check('${c.replace(/'/g, "\\'")}')">
            <span>${String.fromCharCode(65 + index)}</span>
            <span>${c}</span>
        </button>`
    })

    html += `</div></div>`
    document.getElementById("game").innerHTML=html
}

async function check(userChoiceText){
    let q = questions[current]
    let correctAnswerText = q.correct_choice
    let feedback = document.getElementById("feedback")
    feedback.classList.remove("hidden")
    
    if(userChoiceText === correctAnswerText){
        score+=10
        combo++;
        feedback.innerHTML = `✔ ACESSO AUTORIZADO! <span class="badge" style="background: var(--primary); color: #000; margin-left: 1rem;">COMBO x${combo}</span>`
        feedback.className = "feedback-success animate-up"

        // Report result to server
        const student = JSON.parse(localStorage.getItem("student"));
        await fetch('/api/report_bug_result', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ student_id: student.id, category: q.category, was_correct: true })
        });

        setTimeout(() => {
            feedback.classList.add("hidden")
            current++
            loadQuestion()
        }, 1000);
    } else {
        combo = 0;
        feedback.innerHTML = `❌ VIOLAÇÃO DETECTADA: ${q.explain} <br><small style="opacity: 0.7; font-family: var(--font-mono);">Reiniciando sequência em <span id="timerText">5</span>s...</small>`
        feedback.className = "feedback-error animate-up"
        
        // Report failure
        const student = JSON.parse(localStorage.getItem("student"));
        await fetch('/api/report_bug_result', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ student_id: student.id, category: q.category, was_correct: false })
        });

        let timeLeft = 5
        let timer = setInterval(() => {
            timeLeft--
            document.getElementById("timerText").innerText = timeLeft
            if(timeLeft <= 0){
                clearInterval(timer)
                feedback.classList.add("hidden")
                current++
                loadQuestion()
            }
        }, 1000)
    }
}

async function finishGame(){
    const student = JSON.parse(localStorage.getItem("student"));
    
    // Get AI feedback
    let aiMsg = "Performance dentro dos parâmetros esperados.";
    try {
        const aiRes = await fetch('/api/generate_ai');
        const aiData = await aiRes.json();
        aiMsg = aiData.bug.ai_comment;
    } catch(e) {}

    let html = `
    <div class="glass animate-up" style="max-width: 600px; margin: 0 auto; text-align: center; border-color: var(--primary);">
        <h2 style="color: var(--primary); margin-bottom: 2rem;">MISSÃO CONCLUÍDA</h2>
        <div style="font-size: 3rem; font-family: var(--font-heading); margin-bottom: 1rem;">${score}</div>
        <p class="text-low" style="margin-bottom: 2rem;">PONTOS DE OPERAÇÃO COLETADOS</p>
        
        <div class="glass" style="margin-bottom: 2rem; border-color: var(--secondary-glow); padding: 1.5rem;">
            <div style="color: var(--secondary); font-family: var(--font-heading); font-size: 0.75rem; margin-bottom: 0.5rem; text-align: left;">🤖 ANALISTA IA:</div>
            <p style="font-size: 0.9rem; font-style: italic; color: var(--text-med); text-align: left; line-height: 1.6;">"${aiMsg}"</p>
        </div>

        <div id="rewardStats" style="margin-bottom: 2rem; font-size: 0.8rem; color: var(--primary);"></div>

        <button class="btn btn-primary" onclick="location.reload()" style="width: 100%;">VOLTAR AO TERMINAL</button>
    </div>
    `
    document.getElementById("game").innerHTML = html;

    if (gameTimer) clearInterval(gameTimer);
    
    let res = await saveScore(score, combo)
    
    // Check for achievements
    try {
        const achRes = await fetch(`/api/check_achievements/${student.id}`, { method: 'POST' });
        const achData = await achRes.json();
        if (achData.newly_unlocked.length > 0) {
            alert(`🏆 NOVAS CONQUISTAS DESBLOQUEADAS:\n${achData.newly_unlocked.join('\n')}`);
        }
    } catch(e) {}

    if (res && res.stats) {
        updateProfileDisplay(res.stats);
        let msg = "";
        if (res.multiplier > 1.0) msg += `💎 MULTIPLICADOR IA: ${res.multiplier}x (Tópico Crítico!)`;
        if (res.combo_bonus > 0) msg += `<br>🔥 BÔNUS DE COMBO: +${res.combo_bonus}%!`;
        document.getElementById("rewardStats").innerHTML = msg;
    }
    showRanking()
}

async function loadAchievements() {
    const student = JSON.parse(localStorage.getItem("student"));
    if (!student) return;
    
    try {
        const res = await fetch(`/api/achievements/${student.id}`);
        const data = await res.json();
        const list = document.getElementById("achievementList");
        const container = document.getElementById("achievements");
        
        if (data.achievements.length > 0) {
            container.classList.remove("hidden");
            list.innerHTML = data.achievements.map(a => `
                <div class="glass" style="padding: 1rem; text-align: center; border-color: var(--accent);">
                    <div style="font-size: 2rem; margin-bottom: 0.5rem;">${a.icon}</div>
                    <div style="font-weight: 700; font-size: 0.75rem; color: var(--text-high);">${a.name}</div>
                    <div style="font-size: 0.6rem; color: var(--text-low); margin-top: 0.3rem;">${a.description}</div>
                </div>
            `).join('');
        }
    } catch(e) {}
}

function updateProfileDisplay(stats) {
    if (!stats) return;
    document.getElementById("pLevel").innerText = stats.level;
    document.getElementById("pCoins").innerText = stats.coins;
    
    // Calc XP %
    let baseXP = (stats.level - 1) ** 2 * 100;
    let nextXP = stats.level ** 2 * 100;
    let progress = ((stats.xp - baseXP) / (nextXP - baseXP)) * 100;
    document.getElementById("pXP").style.width = progress + "%";
}

async function useExtraHint() {
    const student = JSON.parse(localStorage.getItem("student"));
    if (extraHints > 0) {
        extraHints--;
        showHint(true);
        updateHintButton();
        return;
    }

    // Try to find hint package in inventory
    try {
        const res = await fetch(`/api/inventory/${student.id}`);
        const data = await res.json();
        const hintItem = data.inventory.find(i => i.type === 'HINT');
        
        if (hintItem && hintItem.quantity > 0) {
            if (confirm(`Usar um 'Pacote de Dicas' (Resta: ${hintItem.quantity})?`)) {
                await fetch('/api/inventory/use', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ student_id: student.id, item_id: hintItem.id })
                });
                extraHints = parseInt(hintItem.value) - 1;
                showHint(true);
                updateHintButton();
            }
        } else {
            alert("Você não tem dicas extras. Visite a Cyber Market!");
        }
    } catch(e) {}
}

function updateHintButton() {
    const btn = document.getElementById("extraHintBtn");
    if (btn) btn.innerText = extraHints > 0 ? `DICA EXTRA (${extraHints})` : `DICA EXTRA (0)`;
}

function showHint(isExtra = false) {
    let q = questions[current];
    if (q && q.hint) {
        document.getElementById("hintText").innerText = q.hint;
        document.getElementById("hintBox").classList.remove("hidden");
        document.getElementById("hintBox").classList.add("animate-up");
        if (!isExtra) {
            document.getElementById("hintBtn").disabled = true;
            document.getElementById("hintBtn").style.opacity = "0.3";
        }
    }
}

function t(key) {
    return (typeof translations !== 'undefined' && translations[currentLang] && translations[currentLang][key]) 
           ? translations[currentLang][key] 
           : key;
}
