let corrCurrent=0;
let corrScore=0;
let corrQuestions=[];

async function startCorrection(){
    document.getElementById("levelSelect").classList.add("hidden");
    document.getElementById("feedback").className = "hidden";
    
    modeName = 'correcao';
    corrCurrent=0;
    corrScore=0;
    
    try {
        let res = await fetch("/api/bugs?mode=logica&count=5");
        let data = await res.json();
        corrQuestions = data.bugs;
        
        loadCorrection();
    } catch(e) {
        alert("Erro ao carregar modalidade de correção");
        document.getElementById("levelSelect").classList.remove("hidden");
    }
}

function loadCorrection(){
    let q = corrQuestions[corrCurrent];
    let html = `
        <div style="background: #1e293b; padding: 15px; border-radius: 8px; border: 1px solid #334155;">
            <p style="color: #94a3b8; font-size: 0.9em; margin-bottom: 5px;">Conserte o código abaixo. A alternativa correta original era: ${q.correct_choice}</p>
            <textarea id="codeEditor" style="width: 100%; height: 150px; background: #0f172a; color: #f8fafc; font-family: monospace; border: none; padding: 10px; border-radius: 5px;">${q.code}</textarea>
            <br>
            <button class="btn" style="background: #10b981; margin-top: 10px;" onclick="checkCorrection()">Submeter Correção</button>
        </div>
    `;
    document.getElementById("game").innerHTML = html;
}

function checkCorrection(){
    let el = document.getElementById("codeEditor");
    let userCode = el.value;
    let feedback = document.getElementById("feedback");
    
    // In a real scenario we could send this to backend to exec.
    // For now, simple validation logic
    if (userCode.trim() !== corrQuestions[corrCurrent].code.trim()) {
        corrScore += 20;
        feedback.textContent = "✔ Modificação detectada! (+20 pontos)";
        feedback.className = "feedback-success";
    } else {
        feedback.textContent = "❌ O código está idêntico. Você não alterou nada.";
        feedback.className = "feedback-error";
    }
    
    corrCurrent++;
    setTimeout(() => {
        feedback.className = "hidden";
        if(corrCurrent >= corrQuestions.length){
            finishCorrection();
        } else {
            loadCorrection();
        }
    }, 1500);
}

function finishCorrection(){
    let feedback = document.getElementById("feedback");
    feedback.textContent = "🏆 Missão concluída! Pontos de Correção: " + corrScore;
    feedback.className = "feedback-success";
    
    saveScore(corrScore);
    showRanking();
    
    document.getElementById("game").innerHTML = "";
    document.getElementById("levelSelect").classList.remove("hidden");
}
