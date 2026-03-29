# Aprimoramento do Banco de Dados Escolar/Hacking

O usuário solicitou o aprimoramento das questões do jogo. Após investigar o arquivo `data/questions.js` (que atualmente possui 2200 linhas), identifiquei que ele sofre de **"Inchaço por Repetição"**: a categoria "lógica" está cheia de perguntas geradas por robô mudando apenas um número (ex: *Quero contar até 19*, *Quero contar até 35*...). Isso torna o jogo monótono e destrói o engajamento.

## User Review Required

> [!WARNING]  
> Eu vou sobreescrever totalmente o arquivo de banco de dados (`data/questions.js`). Vou deletar as 2200 linhas de questões repetitivas e construir um Banco Analítico Menor, porém infinitamente mais inteligente e focado no tema *Detective*.  
> **Você autoriza essa limpeza drástica e a injeção do novo currículo?**

## 📚 Proposed Changes

### [Component 1] Formatação do Array de Questões
- **Padronização:** Toda questão terá exatamente **4 alternativas**. O código antigo tinha apenas 3 opções em várias questões, o que não preenchia perfeitamente os 4 botões (A, B, C, D) desenhados na UI.
- **Dificuldade Crescente Real:** 
   - `Iniciante:` Erros de sintaxe (`IndentationError`, falha de aspas, `=` ao invés de `==`).
   - `Lógica (Médio):` Erros de laços, tratamento de strings, manipulação básica de lista.
   - `Massiva (Difícil):` Erros conceituais violentos que caem em entrevistas de emprego (ex: *Default Mutable Arguments*, *Late Binding Closures*, *Scope Leak*, falhas de cópia rasa de matrizes).

### [Component 2] O Contexto "Narrativo"
- Os comentários das explicações da IA ganharão um tom mais profissional e cibernético. Ao invés de *"Falta aspas na maçã"*, a explicação será: *"Anomalia de Sintaxe: O interpretador encontrou um EOF inesperado. Todas as declarações de String exigem fechamento de aspas."*

### [Component 3] Reescrita (Target Files)

#### [MODIFY] `data/questions.js`
- Redução de 2200 linhas repetitivas para um JSON limpo, estruturado, e contendo cerca de 45 a 50 questões únicas e artesanais, divididas perfeitamente nos 3 tiers de dificuldade (Iniciante, Lógica, Massiva) exigidas pelo `offline.js`.

## Verification Plan
1. Injetar o novo código e recarregar a aplicação.
2. Iniciar um jogo no modo Auto IA ou Lógica.
3. Conferir se 4 opções são renderizadas na tela invés de 3, garantindo que a matriz visual fique perfeitamente simétrica.
