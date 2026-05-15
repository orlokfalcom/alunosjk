/**
 * SISTEMA DE GAMIFICAÇÃO ONYX v3
 * Gerencia XP, Níveis, Streaks e Persistência Local
 */

const Gamification = {
    state: {
        xp: 0,
        level: 1,
        streak: 0,
        maxStreak: 0,
        totalCorrect: 0,
        history: []
    },

    init() {
        this.load();
        this.updateUI();
    },

    load() {
        const saved = localStorage.getItem('onyx_gamma_v3');
        if (saved) {
            this.state = JSON.parse(saved);
        }
    },

    save() {
        localStorage.setItem('onyx_gamma_v3', JSON.stringify(this.state));
    },

    addXP(amount) {
        const multiplier = 1 + (Math.floor(this.state.streak / 5) * 0.2); // +20% a cada 5 acertos
        const finalAmount = Math.round(amount * multiplier);
        
        this.state.xp += finalAmount;
        this.state.totalCorrect++;
        
        if (this.state.xp >= 1000) {
            this.levelUp();
        }
        
        this.updateUI();
        this.save();
        return finalAmount;
    },

    levelUp() {
        this.state.level++;
        this.state.xp -= 1000;
        
        // Mostrar overlay de Level Up
        const overlay = document.getElementById('levelUpOverlay');
        const badge = document.getElementById('newLevelBadge');
        if (overlay && badge) {
            badge.innerText = `NÍVEL ${this.state.level}`;
            overlay.style.display = 'flex';
        }
    },

    addStreak() {
        this.state.streak++;
        if (this.state.streak > this.state.maxStreak) {
            this.state.maxStreak = this.state.streak;
        }
        this.updateUI();
    },

    resetStreak() {
        this.state.streak = 0;
        this.updateUI();
    },

    updateUI() {
        const xpBar = document.getElementById('xpBar');
        const userXP = document.getElementById('userXP');
        const userLevel = document.getElementById('userLevel');
        const streakCount = document.getElementById('streakCount');

        if (xpBar) xpBar.style.width = `${(this.state.xp / 1000) * 100}%`;
        if (userXP) userXP.innerText = this.state.xp;
        if (userLevel) userLevel.innerText = this.state.level;
        if (streakCount) streakCount.innerText = this.state.streak;
    }
};

function closeLevelUp() {
    const overlay = document.getElementById('levelUpOverlay');
    if (overlay) overlay.style.display = 'none';
}

// Inicializar ao carregar
window.addEventListener('DOMContentLoaded', () => Gamification.init());
