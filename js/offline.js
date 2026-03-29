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
    pyodide = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/"
    });
    console.log('Pyodide loaded successfully');

    // Create test user if no users exist
    if (Object.keys(userData).length === 0) {
        createTestUser();
        console.log('Usuário de teste criado automaticamente');
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
    let categoryMap = {
        'facil': 'iniciante',
        'medio': 'logica',
        'dificil': 'massiva',
        'inferno': 'massiva'
    };
    
    let targetCategory = categoryMap[mode] || 'iniciante';
    
    // Auto AI Logic (Ajusta dificuldade com base na performance)
    if (mode === 'ia') {
        const user = getCurrentUser();
        let accuracy = 0;
        let diffChoice = 'iniciante';
        
        if (user && user.performance) {
            let total = 0, correct = 0;
            Object.values(user.performance).forEach(p => {
                total += p.total; correct += p.correct;
            });
            accuracy = total > 0 ? (correct / total) : 0;
            
            if (accuracy > 0.8 && total > 5) diffChoice = 'massiva';
            else if (accuracy > 0.5 && total > 3) diffChoice = 'logica';
            else diffChoice = 'iniciante';
        }
        targetCategory = diffChoice;
    }
    
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

// Show Dashboard (SPA approach)
function showDashboard() {
    const user = getCurrentUser();
    const dashboardHTML = `
        <div class="container py-5">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h2 class="cyber-title mb-4">🐛 Python Detective - Dashboard</h2>
                <button class="btn btn-outline-primary" onclick="showLoginModal()">Trocar Usuário</button>
            </div>

            <div class="row mb-4">
                <div class="col-md-3 mb-3">
                    <div class="card stats-card text-center h-100">
                        <div class="card-body d-flex flex-column justify-content-center">
                            <h4 class="display-4 mb-2 text-primary">${user.level}</h4>
                            <p class="mb-0 text-light">NÍVEL</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 mb-3">
                    <div class="card stats-card text-center h-100">
                        <div class="card-body d-flex flex-column justify-content-center">
                            <h4 class="display-4 mb-2 text-success">${user.xp}</h4>
                            <p class="mb-0 text-light">XP TOTAL</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 mb-3">
                    <div class="card stats-card text-center h-100">
                        <div class="card-body d-flex flex-column justify-content-center">
                            <h4 class="display-4 mb-2 text-warning">${user.coins}</h4>
                            <p class="mb-0 text-light">MOEDAS</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 mb-3">
                    <div class="card stats-card text-center h-100">
                        <div class="card-body d-flex flex-column justify-content-center">
                            <h4 class="display-4 mb-2 text-info">${user.streak}</h4>
                            <p class="mb-0 text-light">SEQUÊNCIA</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mb-4">
                <div class="col-md-6 mb-3">
                    <div class="card h-100">
                        <div class="card-header bg-dark text-primary">
                            <h5 class="mb-0">📊 Estatísticas Gerais</h5>
                        </div>
                        <div class="card-body">
                            <div class="row text-center">
                                <div class="col-6">
                                    <h6 class="text-success display-6">${user.totalCorrect}</h6>
                                    <small class="text-muted">Corretos</small>
                                </div>
                                <div class="col-6">
                                    <h6 class="text-danger display-6">${user.totalWrong}</h6>
                                    <small class="text-muted">Errados</small>
                                </div>
                            </div>
                            <hr class="my-3 border-secondary">
                            <div class="row text-center">
                                <div class="col-6">
                                    <h6 class="text-primary display-6">${user.bestStreak}</h6>
                                    <small class="text-muted">Melhor Seq.</small>
                                </div>
                                <div class="col-6">
                                    <h6 class="text-info display-6">${user.averageTime.toFixed(1)}s</h6>
                                    <small class="text-muted">Tempo Médio</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 mb-3">
                    <div class="card h-100">
                        <div class="card-header bg-dark text-success">
                            <h5 class="mb-0">🏆 Conquistas</h5>
                        </div>
                        <div class="card-body">
                            ${user.achievements.length > 0 ? 
                                user.achievements.map(achievement => `
                                    <span class="badge badge-primary me-2 mb-2">${achievement}</span>
                                `).join('') :
                                '<p class="text-muted mb-0">Nenhuma conquista ainda</p>'
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div class="mb-4 text-center">
                <h5>Selecione a dificuldade</h5>
                <div class="d-flex justify-content-center flex-wrap gap-2 mt-2">
                    <button class="btn btn-outline-info btn-sm fw-bold border-2" id="btn-dificuldade-ia" onclick="setDifficulty('ia')"><i class="fas fa-brain"></i> Auto IA</button>
                    <button class="btn btn-outline-success btn-sm" id="btn-dificuldade-facil" onclick="setDifficulty('facil')">Fácil</button>
                    <button class="btn btn-outline-warning btn-sm" id="btn-dificuldade-medio" onclick="setDifficulty('medio')">Médio</button>
                    <button class="btn btn-outline-danger btn-sm" id="btn-dificuldade-dificil" onclick="setDifficulty('dificil')">Difícil</button>
                    <button class="btn btn-outline-dark btn-sm text-secondary" id="btn-dificuldade-inferno" onclick="setDifficulty('inferno')">Inferno</button>
                </div>
                <p class="mt-2 mb-0">Dificuldade atual: <strong id="currentDifficultyLabel" class="text-primary">Fácil</strong></p>
            </div>

            <div class="d-flex justify-content-center flex-wrap gap-3">
                <button class="btn btn-primary btn-lg px-4 pulse" onclick="loadGameInterface()">🎮 Iniciar Jogo</button>
                <button class="btn btn-warning btn-lg text-dark fw-bold px-4" onclick="showStore()">🛒 Cyber Market</button>
            </div>
        </div>
    `;

    // Replace main content instead of entire body
    const mainElement = document.querySelector('main') || document.body;
    mainElement.innerHTML = dashboardHTML;
    setDifficulty(currentDifficulty);
}

// Function for basic syntax highlight of python code
function highlightPython(code) {
    if(!code) return "";
    return code
        .replace(/</g, "&lt;").replace(/>/g, "&gt;") // sanitize HTML
        .replace(/\b(def|if|else|elif|for|while|return|import|from|class|try|except|with|and|or|not)\b/g, '<span class="text-danger fw-bold">$1</span>')
        .replace(/(["'`])(.*?)\1/g, '<span class="text-success">$&</span>')
        .replace(/#(.*)$/gm, '<span class="text-secondary">#$1</span>')
        .replace(/\b\d+\b/g, '<span class="text-info">$&</span>')
        .replace(/\b(print|len|range|int|str|float|list|dict|set|input)\b/g, '<span class="text-warning">$1</span>');
}

// Load Game Interface (SPA approach)
function loadGameInterface() {
    const user = getCurrentUser();
    const bug = generateBug(currentDifficulty);
    window.currentBug = bug; // Store for checkAnswer
    gameStartTime = Date.now(); // Start timer

    const gameHTML = `
        <div class="container py-4 py-md-5">
            <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
                <h2 class="cyber-title mb-0 fs-3 d-flex align-items-center">
                    <span class="badge bg-primary me-2">🐛</span> Python Detective
                </h2>
                <div class="d-flex gx-2 align-items-center flex-wrap justify-content-center">
                    <div class="hud-panel p-2 me-2 d-flex gap-2">
                        <span class="hud-pill"><i class="fas fa-star text-warning me-1"></i> XP: ${user.xp}</span>
                        <span class="hud-pill"><i class="fas fa-layer-group text-success me-1"></i> Lv: ${user.level}</span>
                        <span class="hud-pill"><i class="fas fa-fire text-danger me-1"></i> Seq: ${user.streak}</span>
                    </div>
                    <button class="btn btn-outline-danger btn-sm" onclick="showDashboard()"><i class="fas fa-home"></i> Sair</button>
                </div>
            </div>

            <div class="card mb-4 border-primary shadow-lg" style="background-color: var(--glass-bg);">
                <div class="card-header bg-dark border-primary d-flex justify-content-between align-items-center">
                    <h5 class="mb-0 text-primary"><i class="fas fa-search me-2"></i> Analise o Código Abaixo:</h5>
                    <span class="badge bg-secondary border border-secondary">${currentDifficulty.toUpperCase()}</span>
                </div>
                <div class="card-body p-0 position-relative">
                    <div class="code-display bg-dark p-3 p-md-4 rounded-bottom" style="font-family: 'Fira Code', monospace; font-size: 1.1rem; overflow-x: auto; border: 1px inset rgba(21,163,255,0.2);">
                        <pre class="mb-0 text-light"><code>${highlightPython(bug.code)}</code></pre>
                    </div>
                </div>
            </div>

            <div class="row g-3 mb-4" id="optionsContainer">
                ${bug.options.map((opt, i) => `
                    <div class="col-12 col-md-6">
                        <button class="btn btn-outline-info w-100 py-3 fw-bold text-start px-4 position-relative overflow-hidden option-btn" 
                                onclick="checkAnswer(${i}, ${bug.correct})" 
                                style="transition: all 0.2s; border-radius: 8px; border-width: 2px;">
                            <span class="badge bg-dark text-info border border-info me-2 fs-6">${String.fromCharCode(65 + i)}</span> 
                            ${opt}
                        </button>
                    </div>
                `).join('')}
            </div>

            <div id="feedbackContainer" class="d-none"></div>
            
            <div class="text-center mt-4 d-flex justify-content-center gap-4 flex-wrap">
                <button class="btn btn-outline-info btn-sm position-relative px-3 py-2" onclick="useHint()" ${user.inventory.hints > 0 ? '' : 'disabled'}>
                    <i class="fas fa-lightbulb"></i> Módulo Dica 
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info text-dark">${user.inventory.hints}</span>
                </button>
                <button class="btn btn-outline-danger btn-sm position-relative px-3 py-2" onclick="useSkip()" ${user.inventory.skips > 0 ? '' : 'disabled'}>
                    <i class="fas fa-forward"></i> Bypass Root 
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">${user.inventory.skips}</span>
                </button>
            </div>
        </div>
    `;

    // Replace main content
    const mainElement = document.querySelector('main') || document.body;
    mainElement.innerHTML = gameHTML;
}

// Item functions
function useHint() {
    const user = getCurrentUser();
    if (!user || user.inventory.hints <= 0) return;
    
    // Find incorrect options
    const bug = window.currentBug;
    const buttons = document.querySelectorAll('.option-btn');
    let incorrectIndexes = [];
    
    for (let i = 0; i < bug.options.length; i++) {
        if (i !== bug.correct) incorrectIndexes.push(i);
    }
    
    // Remove 2 incorrect options
    incorrectIndexes.sort(() => 0.5 - Math.random());
    const toDisable = incorrectIndexes.slice(0, 2);
    
    toDisable.forEach(idx => {
        buttons[idx].disabled = true;
        buttons[idx].classList.add('opacity-50');
        buttons[idx].innerHTML = '<i class="fas fa-ban text-danger"></i> Dica: Ocultado';
    });
    
    // Deduct
    user.inventory.hints -= 1;
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // Disable hint button to prevent double-use
    event.currentTarget.disabled = true;
    event.currentTarget.querySelector('.badge').innerText = user.inventory.hints;
}

function useSkip() {
    const user = getCurrentUser();
    if (!user || user.inventory.skips <= 0) return;
    
    user.inventory.skips -= 1;
    localStorage.setItem('userData', JSON.stringify(userData));
    
    alert("Bypass Ativado! Saltando nível de segurança sem penalidades.");
    loadGameInterface();
}

// Check Answer (with timing and visual feedback)
function checkAnswer(selected, correct) {
    const endTime = Date.now();
    const timeTaken = (endTime - gameStartTime) / 1000;
    const isCorrect = (selected === correct);
    const bug = window.currentBug;
    
    // Disable buttons
    const buttons = document.querySelectorAll('#optionsContainer button');
    buttons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === correct) {
            btn.classList.remove('btn-outline-info', 'opacity-50');
            btn.classList.add('btn-success', 'text-white', 'border-success');
            // ensure text is visible in case it was disabled by hint
            if (btn.innerHTML.includes('Ocultado')) btn.innerHTML = bug.options[idx]; 
        } else if (idx === selected && !isCorrect) {
            btn.classList.remove('btn-outline-info');
            btn.classList.add('btn-danger', 'text-white', 'border-danger');
        }
    });

    // Process logic
    let titleStr = '';
    let xpStr = '';
    let alertClass = '';
    let aiComment = '';

    if (isCorrect) {
        let results = saveScore(currentDifficulty, 10, timeTaken);
        titleStr = '🎉 SUCESSO! BUG ENCONTRADO!';
        xpStr = `+${results.earnedXP} XP | +${results.earnedCoins} Criptos`;
        alertClass = 'alert-success border-success';
        
        if (results.speedBonus > 0) {
            aiComment = "🤖 IA: Reflexos impressionantes! Identificação feita em tempo recorde (<6s). Ganho de Agilidade aplicado.";
        } else if (timeTaken > 30) {
            aiComment = "🤖 IA: Análise de longo prazo, porém precisa. Continue treinando para agilizar sua dedução heurística.";
        } else {
            aiComment = `🤖 IA: Diagnóstico analítico perfeito. Combo está rendendo bônus de +${results.comboBonus}% em ganhos base!`;
        }
        
    } else {
        wrongAnswer(currentDifficulty);
        titleStr = '❌ FALHA! DIAGNÓSTICO INCORRETO!';
        xpStr = 'Sequência Zerada';
        alertClass = 'alert-danger border-danger';
        
        if (timeTaken < 4) {
             aiComment = "🤖 IA: Impulsividade crítica detectada. Você enviou a resposta sem ler o código propriamente. Mantenha o foco!";
        } else {
             aiComment = "🤖 IA: Raciocínio Incorreto. O código possui nuances lógicas que lhe escaparam. Leia minha explicação de sistema abaixo.";
        }
    }

    const feedbackHTML = `
        <div class="alert ${alertClass} mt-4 shadow-lg p-3 p-md-4" role="alert" style="background-color: var(--glass-bg); backdrop-filter: blur(10px);">
            <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
                <h4 class="alert-heading fw-bold mb-2 mb-md-0 text-white">${titleStr}</h4>
                <span class="badge bg-dark border border-light fs-6 text-white">${xpStr}</span>
            </div>
            
            <div class="mb-3 p-2 bg-dark rounded border border-warning">
                <p class="mb-0 text-warning" style="font-family: var(--font-heading); font-size: 0.9rem;">${aiComment}</p>
            </div>
            
            <div class="p-3 mb-4 rounded" style="background: rgba(0,0,0,0.6); border-left: 4px solid var(--primary);">
                <p class="mb-0 text-light lh-lg"><i class="fas fa-info-circle me-2 text-primary"></i> <strong class="text-primary">LÓGICA DO SISTEMA:</strong> ${bug.explain}</p>
            </div>
            <div class="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3">
                <small class="text-light opacity-75"><i class="fas fa-clock"></i> Tempo de Resolução: ${timeTaken.toFixed(1)}s</small>
                <button class="btn btn-primary fw-bold px-4 py-2 pulse w-100 w-sm-auto" onclick="loadGameInterface()">PRÓXIMO CASO <i class="fas fa-arrow-right ms-2"></i></button>
            </div>
        </div>
    `;

    const feedbackContainer = document.getElementById('feedbackContainer');
    feedbackContainer.innerHTML = feedbackHTML;
    feedbackContainer.classList.remove('d-none');
    feedbackContainer.classList.add('fade-in');
    
    // Auto scroll to feedback
    setTimeout(() => {
        feedbackContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

// ====== CYBER MARKET (STORE) ======
function showStore() {
    const user = getCurrentUser();
    if (!user) return;
    
    // Safety check just in case
    if (!user.inventory) user.inventory = { hints: 0, skips: 0 };

    const storeHTML = `
        <div class="container py-4 py-md-5 fade-in">
            <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
                <h2 class="cyber-title mb-0 d-flex align-items-center">
                    <span class="badge bg-warning text-dark me-2">🛒</span> Cyber Market
                </h2>
                <div class="d-flex align-items-center gap-2">
                    <div class="hud-panel p-2 mb-0">
                        <span class="hud-pill fs-6"><i class="fas fa-coins text-warning me-1"></i> Saldo: <span id="storeBalance" class="text-white">${user.coins}</span></span>
                    </div>
                    <button class="btn btn-outline-danger" onclick="showDashboard()"><i class="fas fa-arrow-left"></i> Voltar</button>
                </div>
            </div>

            <div class="row g-4">
                <div class="col-md-6">
                    <div class="card h-100 border-info shadow-lg" style="background-color: var(--glass-bg);">
                        <div class="card-body text-center p-4">
                            <i class="fas fa-lightbulb text-info mb-3" style="font-size: 3rem; text-shadow: 0 0 15px rgba(23,162,184,0.5);"></i>
                            <h4 class="text-white">Módulo Decodificador (50/50)</h4>
                            <p class="text-muted mb-4">Use durante a investigação para eliminar 2 opções incorretas instantaneamente.</p>
                            <div class="d-flex justify-content-between align-items-center bg-dark p-3 rounded mb-3 border border-secondary">
                                <span class="text-light">Em Estoque: <strong class="fs-5 text-info" id="inv-hints">${user.inventory.hints}</strong></span>
                                <span class="badge bg-warning text-dark fs-6 px-3 py-2">15 Moedas</span>
                            </div>
                            <button class="btn btn-info w-100 fw-bold border-2" onclick="buyItem('hints', 15, event)">COMPRAR (-15 <i class="fas fa-coins text-dark ms-1"></i>)</button>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-6">
                    <div class="card h-100 border-danger shadow-lg" style="background-color: var(--glass-bg);">
                        <div class="card-body text-center p-4">
                            <i class="fas fa-forward text-danger mb-3" style="font-size: 3rem; text-shadow: 0 0 15px rgba(220,53,69,0.5);"></i>
                            <h4 class="text-white">Bypass Root (Pular Bug)</h4>
                            <p class="text-muted mb-4">Pule um bug suspeito de ser armadilha sem perder a sua cobiçada Sequência (Streak).</p>
                            <div class="d-flex justify-content-between align-items-center bg-dark p-3 rounded mb-3 border border-secondary">
                                <span class="text-light">Em Estoque: <strong class="fs-5 text-danger" id="inv-skips">${user.inventory.skips}</strong></span>
                                <span class="badge bg-warning text-dark fs-6 px-3 py-2">30 Moedas</span>
                            </div>
                            <button class="btn btn-danger w-100 fw-bold border-2" onclick="buyItem('skips', 30, event)">COMPRAR (-30 <i class="fas fa-coins text-dark ms-1"></i>)</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    const mainElement = document.querySelector('main') || document.body;
    mainElement.innerHTML = storeHTML;
}

function buyItem(itemType, cost, event) {
    const user = getCurrentUser();
    if (!user) return;
    
    if (user.coins >= cost) {
        user.coins -= cost;
        user.inventory[itemType] += 1;
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Update UI
        document.getElementById('storeBalance').innerText = user.coins;
        document.getElementById(`inv-${itemType}`).innerText = user.inventory[itemType];
        
        // Brief visual effect
        const btn = event.currentTarget;
        const originalText = btn.innerHTML;
        btn.innerHTML = '✔ COMPRADO!';
        btn.classList.add('bg-success', 'border-success', 'text-white');
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.remove('bg-success', 'border-success', 'text-white');
        }, 1000);
    } else {
        alert("Moedas insuficientes! Volte ao terminal e encontre mais bugs.");
    }
}

// Initialize Pyodide when page loads
window.addEventListener('load', () => {
    // Always ensure test user exists with correct data
    createTestUser();
    
    initPyodide();
});