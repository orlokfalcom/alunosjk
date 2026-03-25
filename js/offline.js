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
    const templates = bugTemplates[mode] || bugTemplates.facil;
    const template = templates[Math.floor(Math.random() * templates.length)];
    return {
        id: Date.now(),
        code: template.code,
        category: mode,
        options: template.options,
        correct: template.correct
    };
}

function setDifficulty(difficulty) {
    currentDifficulty = difficulty;
    const label = document.getElementById('currentDifficultyLabel');
    if (label) {
        label.textContent = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
    }

    // Update button active styling
    ['facil', 'medio', 'dificil', 'inferno'].forEach((level) => {
        const btn = document.getElementById(`btn-dificuldade-${level}`);
        if (btn) {
            btn.classList.remove('active');
            if (level === difficulty) btn.classList.add('active');
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
    return username ? userData[username] : null;
}

function saveScore(mode, score, timeTaken = 0) {
    const user = getCurrentUser();
    if (!user) return;

    user.xp += score;
    user.level = Math.floor(user.xp / 100) + 1;
    user.coins += Math.floor(score / 10);
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
    return user;
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
                    <button class="btn btn-outline-success btn-sm" id="btn-dificuldade-facil" onclick="setDifficulty('facil')">Fácil</button>
                    <button class="btn btn-outline-warning btn-sm" id="btn-dificuldade-medio" onclick="setDifficulty('medio')">Médio</button>
                    <button class="btn btn-outline-danger btn-sm" id="btn-dificuldade-dificil" onclick="setDifficulty('dificil')">Difícil</button>
                    <button class="btn btn-outline-dark btn-sm" id="btn-dificuldade-inferno" onclick="setDifficulty('inferno')">Inferno</button>
                </div>
                <p class="mt-2 mb-0">Dificuldade atual: <strong id="currentDifficultyLabel">Fácil</strong></p>
            </div>

            <div class="text-center">
                <button class="btn btn-primary btn-lg me-3" onclick="loadGameInterface()">🎮 Iniciar Jogo</button>
                <button class="btn btn-outline-primary btn-lg" onclick="showRanking()">🏅 Ver Ranking</button>
            </div>
        </div>
    `;

    // Replace main content instead of entire body
    const mainElement = document.querySelector('main') || document.body;
    mainElement.innerHTML = dashboardHTML;
    setDifficulty(currentDifficulty);
}

// Load Game Interface (SPA approach)
function loadGameInterface() {
    const user = getCurrentUser();
    const bug = generateBug(currentDifficulty);
    gameStartTime = Date.now(); // Start timer

    const gameHTML = `
        <div class="container py-5">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h2 class="cyber-title mb-4">🐛 Python Detective - Jogo Offline (${currentDifficulty.charAt(0).toUpperCase() + currentDifficulty.slice(1)})</h2>
                <div class="text-end">
                    <div class="mb-2">
                        <span class="badge badge-primary me-2">XP: ${user.xp}</span>
                        <span class="badge badge-success me-2">Level: ${user.level}</span>
                        <span class="badge badge-warning">Coins: ${user.coins}</span>
                    </div>
                    <button class="btn btn-outline-primary" onclick="showDashboard()">Dashboard</button>
                </div>
            </div>

            <div class="card mb-4">
                <div class="card-header bg-dark text-primary">
                    <h5 class="mb-0">🔍 Encontre o Bug no Código:</h5>
                </div>
                <div class="card-body p-0">
                    <div class="code-display">
                        <pre class="mb-0">${bug.code}</pre>
                    </div>
                </div>
            </div>

            <div class="row g-3 mb-4">
                ${bug.options.map((opt, i) => `
                    <div class="col-md-6">
                        <button class="btn btn-outline-primary w-100 py-4 fw-bold" onclick="checkAnswer(${i}, ${bug.correct})">
                            ${opt}
                        </button>
                    </div>
                `).join('')}
            </div>

            <div class="text-center">
                <button class="btn btn-secondary me-2" onclick="loadGameInterface()">🔄 Pular Bug</button>
                <button class="btn btn-outline-danger" onclick="showDashboard()">🏠 Voltar ao Dashboard</button>
            </div>
        </div>
    `;

    // Replace main content
    const mainElement = document.querySelector('main') || document.body;
    mainElement.innerHTML = gameHTML;
}

// Check Answer (with timing)
function checkAnswer(selected, correct) {
    const endTime = Date.now();
    const timeTaken = (endTime - gameStartTime) / 1000; // seconds

    if (selected === correct) {
        saveScore(currentDifficulty, 10, timeTaken);
        alert(`Correto! +10 XP\nTempo: ${timeTaken.toFixed(1)}s`);
    } else {
        wrongAnswer(currentDifficulty);
        alert('Errado! Sequência zerada.');
    }
    loadGameInterface(); // Next bug
}

// Initialize Pyodide when page loads
window.addEventListener('load', () => {
    // Always ensure test user exists with correct data
    createTestUser();
    
    initPyodide();
});