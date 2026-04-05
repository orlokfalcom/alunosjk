// Offline Logic for Python Detective - 100% Client-Side
let pyodide = null;
let userData = JSON.parse(localStorage.getItem('userData') || '{}');
let globalPerformance = JSON.parse(localStorage.getItem('globalPerformance') || '{}');
let gameStartTime = 0;
let currentDifficulty = 'facil'; // Default difficulty

// Smooth scroll to features section
function scrollToFeatures() {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
        featuresSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Initialize Pyodide
async function initPyodide() {
    try {
        pyodide = await loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/"
        });
        console.log('Pyodide loaded successfully');

        // Create test user if no users exist
        if (Object.keys(userData).length === 0) {
            createTestUser();
            console.log('Usuário de teste criado automaticamente');
        }
    } catch (e) {
        console.error("Erro ao carregar sistema:", e);
    } finally {
        // Remove Splash Screen with a smooth fade
        const splash = document.getElementById('splashScreen');
        if (splash) {
            splash.style.transition = 'opacity 0.5s ease, filter 0.5s ease';
            splash.style.opacity = '0';
            splash.style.filter = 'blur(20px)';
            setTimeout(() => splash.remove(), 500);
        }
    }
}

// Bug Templates (expanded)
const bugTemplates = {
    logica: [
        {
            code: `def calculate_average(numbers):
    total = 0
    for num in numbers:
        total += num
    return total / len(numbers)

result = calculate_average([])
print(result)`,
            bug: "Divisão por zero se lista vazia",
            options: ["Sintaxe incorreta", "Divisão por zero", "Variável não definida", "Loop infinito"],
            correct: 1
        },
        {
            code: `def is_even(num):
    return num % 2 == 0

print(is_even(3))`,
            bug: "Lógica correta, mas teste com ímpar",
            options: ["Retorna True incorretamente", "Erro de sintaxe", "Função não definida", "Correto"],
            correct: 3
        }
    ],
    sintaxe: [
        {
            code: `def greet(name)
    print("Hello, " + name)

greet("World")`,
            bug: "Falta dois pontos após def",
            options: ["Indentação errada", "Falta dois pontos", "Aspas incorretas", "Print sem parênteses"],
            correct: 1
        },
        {
            code: `if x = 5:
    print("Yes")`,
            bug: "Usa = em vez de == em if",
            options: ["Sintaxe de if errada", "Variável x não definida", "Print incorreto", "Correto"],
            correct: 0
        }
    ],
    facil: [
        {
            code: `def is_even(num):
    return num % 2 == 0

print(is_even(2))`,
            bug: "Nenhum; código correto",
            options: ["Lógica correta", "Erro de sintaxe", "Divisão por zero", "Variável indefinida"],
            correct: 0
        },
        {
            code: `def sum_numbers(a, b):
    return a + b

print(sum_numbers(1, 2))`,
            bug: "Nenhum; código correto",
            options: ["Lógica correta", "Indentação incorreta", "Nome de função errado", "Faltam parênteses"],
            correct: 0
        }
    ],
    medio: [
        {
            code: `def calculate_average(numbers):
    total = 0
    for num in numbers:
        total += num
    return total / len(numbers)

result = calculate_average([2, 3, 5])
print(result)`,
            bug: "Nenhum, mas lógica de média aplicada",
            options: ["Cálculo correto", "Divisão por zero", "Erro de tipo", "Loop infinito"],
            correct: 0
        },
        {
            code: `x = 10
if x > 5:
    print("Maior")
else:
    print("Menor")`,
            bug: "Sintaxe correta; condição lógica", 
            options: ["Lógica correta", "Indentação incorreta", "If sem dois pontos", "Else fora de lugar"],
            correct: 0
        }
    ],
    dificil: [
        {
            code: `def find_max(values):
    max_val = values[0]
    for v in values:
        if v > max_val:
            max_val = v
    return max_val

print(find_max([]))`,
            bug: "Acessa índice 0 em lista vazia",
            options: ["IndexError", "TypeError", "SyntaxError", "NameError"],
            correct: 0
        },
        {
            code: `def append_item(lst, item):
    lst.append(item)

my_list = None
append_item(my_list, 5)`,
            bug: "NoneType não tem método append",
            options: ["AttributeError", "TypeError", "NameError", "IndexError"],
            correct: 0
        }
    ],
    inferno: [
        {
            code: `def recursive_sum(n):
    if n == 0:
        return 0
    return n + recursive_sum(n-1)

print(recursive_sum(1000))`,
            bug: "Stack overflow (recursão profunda)",
            options: ["RecursionError", "MemoryError", "TypeError", "IndentationError"],
            correct: 0
        },
        {
            code: `def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n-1)

print(factorial(-1))`,
            bug: "Recursão infinita para valores negativos",
            options: ["RecursionError", "ValueError", "ZeroDivisionError", "OverflowError"],
            correct: 0
        }
    ]
};

// Generate Bug (client-side)
function generateBug(mode) {
    // ---- INTERCEPTAÇÃO DA NOVA IA PROCEDURAL (MODO AUTO) ----
    if (mode === 'ia') {
        const user = getCurrentUser();
        let perfMatrix = { total: 0, correct: 0 };
        
        if (user && user.performance) {
            Object.values(user.performance).forEach(p => {
                perfMatrix.total += p.total; 
                perfMatrix.correct += p.correct;
            });
        }
        
        // Verifica se a engine ProceduralAI está no cache do navegador (via index.html)
        if (typeof ProceduralAI !== 'undefined') {
            return ProceduralAI.gerar(perfMatrix);
        }
    }
    
    // ---- LÓGICA ESTÁTICA ANTIGA (HARDCODED) PARA MODOS ESPECÍFICOS ----
    let categoryMap = {
        'facil': 'iniciante',
        'medio': 'logica',
        'dificil': 'massiva',
        'inferno': 'massiva'
    };
    
    let targetCategory = categoryMap[mode] || 'iniciante';
    
    // Use QUESTIONS_DATA Se importado, senao fallback para o legado
    let templates = (typeof QUESTIONS_DATA !== 'undefined' && QUESTIONS_DATA[targetCategory]) 
                    ? QUESTIONS_DATA[targetCategory] 
                    : (bugTemplates[mode] || bugTemplates.facil);
                    
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    // Handle both old and new data structures
    return {
        id: Date.now(),
        code: template.code,
        category: mode,
        options: template.choices || template.options,
        correct: template.answer !== undefined ? template.answer : template.correct,
        explain: template.explain || template.bug || "O código apresenta uma falha técnica."
    };
}

function setDifficulty(difficulty) {
    currentDifficulty = difficulty;
    const label = document.getElementById('currentDifficultyLabel');
    if (label) {
        label.textContent = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
    }

    // Update button active styling
    ['ia', 'facil', 'medio', 'dificil', 'inferno'].forEach((level) => {
        const btn = document.getElementById(`btn-dificuldade-${level}`);
        if (btn) {
            btn.classList.remove('active', 'border-white');
            if (level === difficulty) btn.classList.add('active', 'border-white');
        }
    });
}

// User Management (enhanced with metrics)
function loginUser(username, password) {
    if (userData[username] && userData[username].password === password) {
        localStorage.setItem('currentUser', username);
        return userData[username];
    }
    return null;
}

function registerUser(username, password, name) {
    if (userData[username]) return { error: "Usuário já existe" };
    userData[username] = {
        name,
        password,
        xp: 0,
        level: 1,
        coins: 0,
        performance: {},
        streak: 0,
        bestStreak: 0,
        totalBugsFound: 0,
        totalCorrect: 0,
        totalWrong: 0,
        averageTime: 0,
        achievements: [],
        inventory: { hints: 0, skips: 0 },
        createdAt: new Date().toISOString()
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    return userData[username];
}

// Create Test User for Development
function createTestUser() {
    const testUsername = 'teste';
    const testPassword = 'offline';
    const testName = 'Usuário de Teste';

    // Always create/overwrite test user with sample data
    userData[testUsername] = {
        name: testName,
        password: testPassword,
        xp: 250, // Level 3
        level: 3,
        coins: 25,
        performance: {
            logica: { correct: 8, total: 10 },
            sintaxe: { correct: 7, total: 9 }
        },
        streak: 3,
        bestStreak: 5,
        totalBugsFound: 19,
        totalCorrect: 15,
        totalWrong: 4,
        averageTime: 12.5,
        achievements: ['first_10', 'streak_5'],
        inventory: { hints: 2, skips: 1 }, // Comeca com alguns itens de teste
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days ago
    };

    localStorage.setItem('userData', JSON.stringify(userData));
    console.log('Usuário de teste criado/atualizado:', testUsername);
    return userData[testUsername];
}

// Reset Test Data (for development)
function resetTestData() {
    localStorage.removeItem('userData');
    localStorage.removeItem('globalPerformance');
    localStorage.removeItem('currentUser');
    userData = {};
    globalPerformance = {};
    console.log('Dados de teste resetados');
    location.reload();
}

function getCurrentUser() {
    const username = localStorage.getItem('currentUser');
    const user = username ? userData[username] : null;

    // Safety merge para adicionar o inventory em perfis antigos (Patch Retrocompatibilidade)
    if (user && !user.inventory) {
        user.inventory = { hints: 0, skips: 0 };
        localStorage.setItem('userData', JSON.stringify(userData));
    }

    return user;
}

function saveScore(mode, baseScore, timeTaken = 0) {
    const user = getCurrentUser();
    if (!user) return null;

    // Escalonamento por dificuldade
    let difficultyMultiplier = 1;
    if (mode === 'medio' || mode === 'logica') difficultyMultiplier = 2;
    if (mode === 'dificil' || mode === 'massiva' || mode === 'inferno') difficultyMultiplier = 3;
    
    let score = baseScore * difficultyMultiplier;

    // Speed run bonus
    let speedBonus = timeTaken > 0 && timeTaken < 6 ? 5 : 0;
    
    // Combo multiplier (Máx 100% de bônus, 5% por acerto)
    let comboMultiplier = Math.min(1.0, user.streak * 0.05); 
    
    let totalScore = score + speedBonus;
    let finalXP = Math.floor(totalScore + (totalScore * comboMultiplier));
    let coinsEarned = Math.floor(finalXP / 5);

    user.xp += finalXP;
    user.level = Math.floor(user.xp / 100) + 1;
    user.coins += coinsEarned;
    user.totalBugsFound += 1;
    user.totalCorrect += 1;

    // Update streak
    user.streak += 1;
    if (user.streak > user.bestStreak) user.bestStreak = user.streak;

    // Update average time
    if (user.averageTime === 0) {
        user.averageTime = timeTaken;
    } else {
        user.averageTime = (user.averageTime + timeTaken) / 2;
    }

    // Performance by category
    if (!user.performance[mode]) user.performance[mode] = { correct: 0, total: 0 };
    user.performance[mode].correct += 1;
    user.performance[mode].total += 1;

    // Check achievements
    checkAchievements(user);

    localStorage.setItem('userData', JSON.stringify(userData));
    
    return { earnedXP: finalXP, earnedCoins: coinsEarned, comboBonus: (comboMultiplier*100).toFixed(0), speedBonus };
}

function wrongAnswer(mode) {
    const user = getCurrentUser();
    if (!user) return;

    user.streak = 0;
    user.totalWrong += 1;

    if (!user.performance[mode]) user.performance[mode] = { correct: 0, total: 0 };
    user.performance[mode].total += 1;

    localStorage.setItem('userData', JSON.stringify(userData));
}

function checkAchievements(user) {
    const newAchievements = [];

    if (user.totalCorrect >= 10 && !user.achievements.includes('first_10')) {
        newAchievements.push('first_10');
    }
    if (user.streak >= 5 && !user.achievements.includes('streak_5')) {
        newAchievements.push('streak_5');
    }
    if (user.level >= 5 && !user.achievements.includes('level_5')) {
        newAchievements.push('level_5');
    }

    user.achievements.push(...newAchievements);
    return newAchievements;
}

// Run Python Code in Sandbox
async function runPythonCode(code) {
    if (!pyodide) await initPyodide();
    try {
        const result = await pyodide.runPythonAsync(code);
        return { success: true, output: result };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Start Offline Game (enhanced login)
function startOfflineGame() {
    const user = getCurrentUser();
    if (!user) {
        showLoginModal();
    } else {
        showDashboard();
    }
}

// Show Login Modal
// Show Login Modal (improved layout)
function showLoginModal() {
    const modalHTML = `
        <div class="modal fade show" id="loginModal" style="display: block; background: rgba(0,0,0,0.8);" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content bg-dark text-white border-primary">
                    <div class="modal-header border-secondary">
                        <h5 class="modal-title text-primary">🐛 Python Detective</h5>
                        <button type="button" class="btn-close btn-close-white" onclick="hideModal()"></button>
                    </div>
                    <div class="modal-body">
                        <p class="text-center mb-4">Entre com seu perfil</p>

                        <form onsubmit="handleLogin(event)">
                            <div class="mb-3">
                                <label for="username" class="form-label text-light">Nome de Usuário</label>
                                <input type="text" id="username" class="form-control bg-secondary text-white border-primary" required placeholder="Digite seu nome">
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label text-light">Senha (opcional)</label>
                                <input type="password" id="password" class="form-control bg-secondary text-white border-primary" placeholder="Deixe vazio para offline">
                            </div>
                            <button type="submit" class="btn btn-primary w-100 mb-3">Entrar</button>
                        </form>

                        <div class="text-center">
                            <button class="btn btn-success w-100" onclick="showRegistrationModal()">Cadastrar Novo Perfil</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add modal to body without replacing everything
    if (!document.getElementById('loginModal')) {
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
}

// Show Registration Modal
function showRegistrationModal() {
    const modalHTML = `
        <div class="modal fade show" id="registrationModal" style="display: block; background: rgba(0,0,0,0.8);" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content bg-dark text-white border-success">
                    <div class="modal-header border-secondary">
                        <h5 class="modal-title text-success">🐛 Cadastrar Novo Perfil</h5>
                        <button type="button" class="btn-close btn-close-white" onclick="hideModal()"></button>
                    </div>
                    <div class="modal-body">
                        <p class="text-center mb-4">Crie seu perfil para começar</p>

                        <form onsubmit="handleRegistration(event)">
                            <div class="mb-3">
                                <label for="regUsername" class="form-label text-light">Nome de Usuário</label>
                                <input type="text" id="regUsername" class="form-control bg-secondary text-white border-success" required placeholder="Digite seu nome">
                            </div>
                            <div class="mb-3">
                                <label for="regPassword" class="form-label text-light">Senha (opcional)</label>
                                <input type="password" id="regPassword" class="form-control bg-secondary text-white border-success" placeholder="Deixe vazio para offline">
                            </div>
                            <div class="mb-3">
                                <label for="regName" class="form-label text-light">Nome Completo</label>
                                <input type="text" id="regName" class="form-control bg-secondary text-white border-success" placeholder="Seu nome completo">
                            </div>
                            <button type="submit" class="btn btn-success w-100 mb-3">Cadastrar e Entrar</button>
                        </form>

                        <div class="text-center">
                            <button class="btn btn-outline-light w-100" onclick="showLoginModal()">Voltar ao Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    hideModal(); // Hide any existing modal
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Handle Registration Form
function handleRegistration(event) {
    event.preventDefault();
    const username = document.getElementById('regUsername').value.trim();
    const password = document.getElementById('regPassword').value || 'offline';
    const name = document.getElementById('regName').value.trim() || username;

    if (!username) {
        alert('Digite um nome de usuário!');
        return;
    }

    const result = registerUser(username, password, name);
    if (result && result.error) {
        alert(result.error);
    } else {
        localStorage.setItem('currentUser', username);
        hideModal();
        showDashboard();
    }
}

// Handle Login Form
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value || 'offline';

    if (!username) {
        alert('Digite um nome de usuário!');
        return;
    }

    // Try to login
    const user = loginUser(username, password);
    if (user) {
        hideModal();
        showDashboard();
    } else {
        // User doesn't exist or wrong password
        alert(`Usuário "${username}" não encontrado ou senha incorreta.`);
    }
}

// Hide Modal
function hideModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => modal.remove());
}

// Show User Selection (modal)
function showUserSelection() {
    const users = Object.keys(userData);
    if (users.length === 0) {
        alert('Nenhum perfil encontrado.');
        return;
    }

    const modalHTML = `
        <div class="modal fade show" id="userSelectionModal" style="display: block; background: rgba(0,0,0,0.8);" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content bg-dark text-white border-primary">
                    <div class="modal-header border-secondary">
                        <h5 class="modal-title text-primary">🐛 Selecionar Perfil</h5>
                        <button type="button" class="btn-close btn-close-white" onclick="hideModal()"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            ${users.map(u => `
                                <div class="d-flex justify-content-between align-items-center mb-3 p-3 bg-secondary rounded">
                                    <div>
                                        <strong class="text-light">${u}</strong> 
                                        <br><small class="text-muted">Level ${userData[u].level} | XP ${userData[u].xp} | Sequência ${userData[u].streak}</small>
                                    </div>
                                    <button class="btn btn-primary" onclick="selectUser('${u}')">Selecionar</button>
                                </div>
                            `).join('')}
                        </div>
                        <div class="text-center">
                            <button class="btn btn-success w-100 mb-2" onclick="showRegistrationModal()">Cadastrar Novo Perfil</button>
                            <button class="btn btn-outline-light w-100" onclick="showLoginModal()">Voltar ao Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    hideModal(); // Hide any existing modal
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Select Existing User
// Select Existing User
function selectUser(username) {
    const user = loginUser(username, 'offline');
    if (user) {
        hideModal();
        showDashboard();
    } else {
        alert('Erro ao selecionar usuário.');
    }
}

// Show Dashboard (SPA approach with Premium Components)
function showDashboard() {
    const user = getCurrentUser();
    const dashboardHTML = `
        <div class="container py-4 page-transition">
            <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5 gap-3">
                <div>
                    <h1 class="text-gradient-primary mb-0">AGENT: ${user.name.toUpperCase()}</h1>
                    <p class="text-muted small mb-0">SISTEMA DE SEGURANÇA NACIONAL - NIVEL ${user.level}</p>
                </div>
                <div class="d-flex gap-2">
                    <button class="btn-cyber" onclick="showUserSelection()">
                        <i class="fas fa-user-secret"></i> ALTERAR AGENTE
                    </button>
                    <button class="btn-cyber danger" onclick="logout()">
                        <i class="fas fa-power-off"></i>
                    </button>
                </div>
            </div>

            <!-- XP & Level HUD -->
            <div class="premium-glass p-4 mb-4 d-flex flex-column flex-md-row align-items-center justify-content-between gap-4">
                <div class="d-flex align-items-center gap-4">
                    <div class="level-badge" style="width: 80px; height: 80px; background: var(--bg-surface); border: 2px solid var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: var(--font-heading); font-size: 2rem; color: var(--primary); box-shadow: 0 0 20px var(--primary-glow);">
                        ${user.level}
                    </div>
                    <div>
                        <h4 class="mb-1">PROGRESSO DE REPUTAÇÃO</h4>
                        <div class="d-flex align-items-center gap-3">
                            <div class="progress" style="width: 250px; height: 8px;">
                                <div class="progress-bar" style="width: ${user.xp % 100}%"></div>
                            </div>
                            <span class="text-primary fw-bold">${user.xp % 100}/100 XP</span>
                        </div>
                    </div>
                </div>
                <div class="d-flex gap-3">
                    <div class="hud-pill"><i class="fas fa-coins text-warning"></i> ${user.coins} CRÉDITOS</div>
                    <div class="hud-pill"><i class="fas fa-fire text-danger"></i> STREAK: ${user.streak}</div>
                </div>
            </div>

            <div class="row g-4 mb-5">
                <div class="col-md-3">
                    <div class="premium-glass card-stats h-100">
                        <div class="value text-primary glow-primary">${user.totalCorrect}</div>
                        <div class="label">BUGS ELIMINADOS</div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="premium-glass card-stats h-100">
                        <div class="value text-danger glow-secondary">${user.totalWrong}</div>
                        <div class="label">FALHAS DE SISTEMA</div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="premium-glass card-stats h-100">
                        <div class="value text-success glow-primary">${user.bestStreak}</div>
                        <div class="label">MAIOR SEQUÊNCIA</div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="premium-glass card-stats h-100">
                        <div class="value text-warning glow-primary">${user.averageTime.toFixed(1)}s</div>
                        <div class="label">TEMPO DE REAÇÃO</div>
                    </div>
                </div>
            </div>

            <div class="row g-4 mb-5">
                <div class="col-lg-8">
                    <div class="premium-glass p-0 overflow-hidden h-100">
                        <div class="p-4 border-bottom border-light border-opacity-10 bg-surface">
                            <h5 class="mb-0 text-gradient-primary"><i class="fas fa-terminal me-2"></i> SELECIONAR MISSÃO OPERACIONAL</h5>
                        </div>
                        <div class="p-4">
                            <div class="d-flex flex-wrap gap-3 justify-content-center">
                                <label class="difficulty-option">
                                    <input type="radio" name="difficulty" value="ia" onchange="setDifficulty('ia')" ${currentDifficulty === 'ia' ? 'checked' : ''} hidden>
                                    <div class="btn-cyber ${currentDifficulty === 'ia' ? 'primary' : ''}"><i class="fas fa-brain"></i> IA PROCEDURAL</div>
                                </label>
                                <label class="difficulty-option">
                                    <input type="radio" name="difficulty" value="facil" onchange="setDifficulty('facil')" ${currentDifficulty === 'facil' ? 'checked' : ''} hidden>
                                    <div class="btn-cyber ${currentDifficulty === 'facil' ? 'primary' : ''}">INICIANTE</div>
                                </label>
                                <label class="difficulty-option">
                                    <input type="radio" name="difficulty" value="medio" onchange="setDifficulty('medio')" ${currentDifficulty === 'medio' ? 'checked' : ''} hidden>
                                    <div class="btn-cyber ${currentDifficulty === 'medio' ? 'primary' : ''}">EXECUTOR LÓGICO</div>
                                </label>
                                <label class="difficulty-option">
                                    <input type="radio" name="difficulty" value="dificil" onchange="setDifficulty('dificil')" ${currentDifficulty === 'dificil' ? 'checked' : ''} hidden>
                                    <div class="btn-cyber ${currentDifficulty === 'dificil' ? 'primary' : ''}">DETETIVE ELITE</div>
                                </label>
                                <label class="difficulty-option">
                                    <input type="radio" name="difficulty" value="inferno" onchange="setDifficulty('inferno')" ${currentDifficulty === 'inferno' ? 'checked' : ''} hidden>
                                    <div class="btn-cyber ${currentDifficulty === 'inferno' ? 'primary' : ''} text-danger">MODO INFERNO</div>
                                </label>
                            </div>
                            
                            <div class="text-center mt-5">
                                <button class="btn-cyber primary px-5 py-3 fs-5" onclick="loadGameInterface()">
                                    <i class="fas fa-play-circle fs-4"></i> INICIAR OPERAÇÃO
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="premium-glass p-0 h-100">
                        <div class="p-4 border-bottom border-light border-opacity-10 bg-surface">
                            <h5 class="mb-0 text-success"><i class="fas fa-medal me-2"></i> ARQUIVO DE CONQUISTAS</h5>
                        </div>
                        <div class="p-4 d-flex flex-wrap gap-2">
                             ${user.achievements.length > 0 ? 
                                user.achievements.map(achievement => `
                                    <div class="hud-pill" title="Conquista Desbloqueada">
                                        <i class="fas fa-check-circle text-success"></i> ${achievement.replace('_', ' ').toUpperCase()}
                                    </div>
                                `).join('') :
                                '<div class="text-center w-100 py-5 opacity-30"><i class="fas fa-lock fs-1 d-block mb-3"></i><p>SEM REGISTROS</p></div>'
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div class="text-center">
                <button class="btn-cyber" style="border-color: var(--warning); color: var(--warning);" onclick="showStore()">
                    <i class="fas fa-shopping-cart"></i> CYBER MARKET (BLACK MARKET)
                </button>
            </div>
        </div>
    `;

    const mainElement = document.querySelector('main') || document.body;
    mainElement.innerHTML = dashboardHTML;
}

function logout() {
    localStorage.removeItem('currentUser');
    location.reload();
}

// Load Game Interface (SPA approach with Prism.js)
function loadGameInterface() {
    const user = getCurrentUser();
    const bug = generateBug(currentDifficulty);
    window.currentBug = bug; 
    window.answered = false;
    gameStartTime = Date.now();

    const gameHTML = `
        <div class="container py-4 page-transition">
            <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5 gap-3">
                <div class="d-flex align-items-center gap-3">
                    <button class="btn-cyber" onclick="showDashboard()">
                        <i class="fas fa-arrow-left"></i>
                    </button>
                    <h2 class="text-gradient-primary mb-0">MISSÃO OPERACIONAL</h2>
                </div>
                <div class="d-flex gap-2">
                    <div class="hud-pill"><i class="fas fa-layer-group text-primary"></i> NIVEL ${user.level}</div>
                    <div class="hud-pill"><i class="fas fa-fire text-danger"></i> STREAK: ${user.streak}</div>
                </div>
            </div>

            <div class="premium-glass p-0 overflow-hidden mb-4">
                <div class="p-3 border-bottom border-light border-opacity-10 bg-surface d-flex justify-content-between align-items-center">
                    <span class="text-muted small"><i class="fas fa-bug me-2"></i> ANALISE O MALWARE ABAIXO:</span>
                    <span class="badge-cyber warning">${currentDifficulty.toUpperCase()}</span>
                </div>
                <div class="p-0">
                    <pre class="line-numbers"><code class="language-python">${bug.code}</code></pre>
                </div>
            </div>

            <div class="row g-3 mb-5" id="optionsContainer">
                ${bug.options.map((opt, i) => `
                    <div class="col-md-6">
                        <button class="btn-cyber w-100 py-3 text-start px-4 op-btn" 
                                onclick="checkAnswer(${i}, ${bug.correct}, this)">
                            <span class="badge-cyber me-3" style="min-width: 30px; text-align: center;">${String.fromCharCode(65 + i)}</span> 
                            ${opt}
                        </button>
                    </div>
                `).join('')}
            </div>

            <div id="feedbackContainer" class="mb-4"></div>
            
            <div class="d-flex justify-content-center gap-4 flex-wrap">
                <button class="btn-cyber" id="hintBtn" onclick="useHint(this)" ${user.inventory.hints > 0 ? '' : 'disabled'}>
                    <i class="fas fa-lightbulb text-warning"></i> INJETAR DICA (${user.inventory.hints})
                </button>
                <button class="btn-cyber" id="skipBtn" onclick="useSkip(this)" ${user.inventory.skips > 0 ? '' : 'disabled'}>
                    <i class="fas fa-forward text-info"></i> BYPASS MISSÃO (${user.inventory.skips})
                </button>
            </div>
        </div>
    `;

    const mainElement = document.querySelector('main') || document.body;
    mainElement.innerHTML = gameHTML;
    
    // Trigger Prism.js Highlighting
    if (window.Prism) {
        window.Prism.highlightAll();
    }
}

// Function to handle answer checking with animations
function checkAnswer(selectedIndex, correctIndex, buttonElement) {
    if (window.answered) return;
    window.answered = true;

    const isCorrect = selectedIndex === correctIndex;
    const feedbackContainer = document.getElementById('feedbackContainer');
    const timeTaken = (Date.now() - gameStartTime) / 1000;

    // Apply animations to buttons
    const buttons = document.querySelectorAll('.op-btn');
    buttons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === correctIndex) {
            btn.classList.add('ans-correct');
            btn.style.borderColor = 'var(--success)';
        } else if (idx === selectedIndex && !isCorrect) {
            btn.classList.add('ans-wrong');
            btn.style.borderColor = 'var(--danger)';
        }
    });

    if (isCorrect) {
        const results = saveScore(currentDifficulty, 10, timeTaken);
        feedbackContainer.innerHTML = `
            <div class="premium-glass p-4 border-success page-transition" style="background: hsla(var(--neon-green), 0.1);">
                <div class="d-flex align-items-center gap-3 mb-3">
                    <i class="fas fa-check-circle text-success fs-2"></i>
                    <h4 class="mb-0 text-success">MALWARE ELIMINADO COM SUCESSO!</h4>
                </div>
                <p class="text-light-50">${window.currentBug.explain}</p>
                <div class="d-flex gap-3 mt-3">
                    <div class="hud-pill">+${results.earnedXP} XP</div>
                    <div class="hud-pill">+${results.earnedCoins} CRÉDITOS</div>
                </div>
                <button class="btn-cyber primary mt-4 w-100" onclick="loadGameInterface()">PRÓXIMA MISSÃO</button>
            </div>
        `;
    } else {
        wrongAnswer(currentDifficulty);
        feedbackContainer.innerHTML = `
            <div class="premium-glass p-4 border-danger page-transition" style="background: hsla(0, 100%, 50%, 0.1);">
                <div class="d-flex align-items-center gap-3 mb-3">
                    <i class="fas fa-times-circle text-danger fs-2"></i>
                    <h4 class="mb-0 text-danger">FALHA NA INTERCEPTAÇÃO!</h4>
                </div>
                <p class="text-light-50">O sistema de defesa detectou sua tentativa. A sequência foi resetada.</p>
                <p class="small text-muted">${window.currentBug.explain}</p>
                <div class="d-flex gap-3 mt-2">
                    <button class="btn-cyber primary mt-3" onclick="loadGameInterface()">TENTAR NOVAMENTE</button>
                    <button class="btn-cyber mt-3" onclick="showDashboard()">VOLTAR AO QG</button>
                </div>
            </div>
        `;
    }
}

// Item functions
function useHint(btn) {
    const user = getCurrentUser();
    if (!user || user.inventory.hints <= 0) return;
    
    const bug = window.currentBug;
    const buttons = document.querySelectorAll('.op-btn');
    let incorrectIndexes = [];
    
    for (let i = 0; i < bug.options.length; i++) {
        if (i !== bug.correct) incorrectIndexes.push(i);
    }
    
    incorrectIndexes.sort(() => 0.5 - Math.random());
    const toDisable = incorrectIndexes.slice(0, 2);
    
    toDisable.forEach(idx => {
        buttons[idx].disabled = true;
        buttons[idx].style.opacity = '0.3';
        buttons[idx].innerHTML = `<span class="badge-cyber me-3">#</span> [SISTEMA OCULTADO]`;
    });
    
    user.inventory.hints -= 1;
    localStorage.setItem('userData', JSON.stringify(userData));
    
    btn.disabled = true;
    btn.innerHTML = `<i class="fas fa-lightbulb text-warning"></i> DICA APLICADA (${user.inventory.hints})`;
}

function useSkip(btn) {
    const user = getCurrentUser();
    if (!user || user.inventory.skips <= 0) return;
    
    user.inventory.skips -= 1;
    localStorage.setItem('userData', JSON.stringify(userData));
    
    btn.disabled = true;
    btn.innerHTML = `<i class="fas fa-forward text-info"></i> BYPASS ATIVO (${user.inventory.skips})`;
    
    setTimeout(() => loadGameInterface(), 500);
}

// ====== CYBER MARKET (STORE) ======
function showStore() {
    const user = getCurrentUser();
    if (!user) return;
    
    if (!user.inventory) user.inventory = { hints: 0, skips: 0 };

    const storeHTML = `
        <div class="container py-4 page-transition">
            <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5 gap-3">
                <div class="d-flex align-items-center gap-3">
                    <button class="btn-cyber" onclick="showDashboard()">
                        <i class="fas fa-arrow-left"></i>
                    </button>
                    <h2 class="text-gradient-primary mb-0">BLACK MARKET</h2>
                </div>
                <div class="hud-pill fs-5"><i class="fas fa-coins text-warning"></i> SALDO: <span id="storeBalance">${user.coins}</span> CRÉDITOS</div>
            </div>

            <div class="row g-4 justify-content-center">
                <div class="col-md-5">
                    <div class="premium-glass p-0 h-100 feature-card">
                        <div class="p-4 text-center">
                            <div class="icon-box mx-auto" style="color: var(--warning)">
                                <i class="fas fa-lightbulb fs-1"></i>
                            </div>
                            <h3 class="mb-3">MÓDULO DECODER</h3>
                            <p class="text-muted small mb-4">Elimina duas rotas falsas durante a investigação de malware.</p>
                            
                            <div class="bg-surface p-3 rounded mb-4 d-flex justify-content-between align-items-center">
                                <span class="text-dim">PREÇO</span>
                                <span class="text-warning fw-bold fs-4">15 <i class="fas fa-coins"></i></span>
                            </div>
                            
                            <button class="btn-cyber primary w-100 py-3" onclick="buyItem('hints', 15, this)">
                                <i class="fas fa-shopping-cart"></i> ADQUIRIR MÓDULO
                            </button>
                            <p class="mt-3 text-dim small">EM ESTOQUE: <span id="inv-hints">${user.inventory.hints}</span></p>
                        </div>
                    </div>
                </div>

                <div class="col-md-5">
                    <div class="premium-glass p-0 h-100 feature-card">
                        <div class="p-4 text-center">
                            <div class="icon-box mx-auto" style="color: var(--primary)">
                                <i class="fas fa-forward fs-1"></i>
                            </div>
                            <h3 class="mb-3">PROTOCOLO BYPASS</h3>
                            <p class="text-muted small mb-4">Salta uma missão suspeita sem comprometer sua sequência operacional.</p>
                            
                            <div class="bg-surface p-3 rounded mb-4 d-flex justify-content-between align-items-center">
                                <span class="text-dim">PREÇO</span>
                                <span class="text-primary fw-bold fs-4">30 <i class="fas fa-coins"></i></span>
                            </div>
                            
                            <button class="btn-cyber primary w-100 py-3" onclick="buyItem('skips', 30, this)">
                                <i class="fas fa-shopping-cart"></i> ADQUIRIR PROTOCOLO
                            </button>
                            <p class="mt-3 text-dim small">EM ESTOQUE: <span id="inv-skips">${user.inventory.skips}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    const mainElement = document.querySelector('main') || document.body;
    mainElement.innerHTML = storeHTML;
}

function buyItem(itemType, cost, btn) {
    const user = getCurrentUser();
    if (!user) return;
    
    if (user.coins >= cost) {
        user.coins -= cost;
        user.inventory[itemType] += 1;
        localStorage.setItem('userData', JSON.stringify(userData));
        
        document.getElementById('storeBalance').innerText = user.coins;
        document.getElementById(`inv-${itemType}`).innerText = user.inventory[itemType];
        
        const originalContent = btn.innerHTML;
        btn.innerHTML = '✔ ADQUIRIDO';
        btn.style.background = 'var(--success)';
        btn.style.color = 'var(--bg-base)';
        setTimeout(() => {
            btn.innerHTML = originalContent;
            btn.style.background = '';
            btn.style.color = '';
        }, 1000);
    } else {
        alert("CRÉDITOS INSUFICIENTES PARA ESTA OPERAÇÃO.");
    }
}

// Initialize System
window.addEventListener('load', () => {
    createTestUser();
    initPyodide();
});
