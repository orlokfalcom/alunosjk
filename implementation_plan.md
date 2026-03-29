# Motor de Geração Procedural de Questões (IA Local)

O usuário solicitou que a IA "gere" novas questões a partir do desempenho. Como o objetivo do jogo é ser **100% Offline e leve** (sem requerer internet para chamar a API do ChatGPT/Gemini), a solução realística é construir um **Motor de Geração Procedural (Procedural Generation Engine)** no JavaScript.

## 🧠 Como a IA Procedural vai funcionar?

Ao invés de lermos perguntas estáticas fixas, a IA terá dezenas de **"Modelos Lógicos"** (Templates).
Quando o sistema pedir uma questão, a IA analisará o perfil do jogador (ex: *"Ele tem errado muitas perguntas de Laços For/While"*). Ela então:
1. Puxa o "Molde" de Array/Loop.
2. Injeta variáveis sorteadas de um dicionário Hacker (ex: `['root', 'admin', 'guest']` ou `[1024, 2048, 4096]`).
3. Monta uma questão matematicamente e logicamente nova, e cria na hora respostas dinâmicas embaralhadas.
4. Gera uma explicação customizada alertando o erro com os números precisados do sorteio.

Dessa forma, o jogo ganha **questões infinitas sem pesar o arquivo** ou repetir exatamente os mesmos textos.

## User Review Required

> [!WARNING]  
> Você prefere que eu construa essa **(A) Inteligência Procedural Offline** (que gera infinitas permutações matemáticas e de sintaxe na hora pelo navegador) ou você imaginava **(B) Ligar a uma API do ChatGPT/Gemini** via Internet (o que exigiria que o aluno tivesse acesso à rede o tempo todo para jogar)?  
> Responda "A" para manter o sistema puramente Offline e infinito, ou "B" se quiser integrar chaves complexas da internet!

## ⚙️ Proposed Changes

### [NEW] `js/ai_generator.js`
- Um novo script que centraliza a lógica do Cérebro da Inteligência.
- Implementação da classe `ProceduralAI` com os métodos:
  - `analisarDesempenho(userData)`: Lê os dados salvos do jogador e decide qual "pilar" da linguagem Python ele precisa treinar (Tipagem, Loop, Condicional).
  - `gerarQuestao(pilar)`: Fabrica um problema novo selecionando verbos de hacking e regras do Python (ex: `while bytes < ${limite}`).

### [MODIFY] `js/offline.js`
- Atualizar a função mestre `generateBug(mode)`. Em vez de sortear do arquivo bruto estático `questions.js`, ele passará a chamar a rotina: `window.currentBug = ProceduralAI.fabricarDesafio();`

### [MODIFY] `index.html`
- Chamar o arquivo script modular `<script src="./js/ai_generator.js"></script>` no cabeçalho.

## Verification Plan
1. Inserir a Célula IA no sistema.
2. Logar o desempenho visual de um usuário e observar a IA gerando variáveis novas.
3. Testar a interface gráfica para validar que os códigos dinâmicos estão quebrando linha bem no terminal Pyodide.
