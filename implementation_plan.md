# Planejamento: Expansão Massiva (A.I Offline + Cyber Market) 🧠🛒

Para abranger tanto o seu pedido da **Inteligência Artificial que se adapta offline**, quanto o pedido do **aprimoramento de ganhos e da criação da Loja Online (Cyber Market)**, unifiquei os recursos em um único plano de ação arquitetural grandioso:

## 1. Motor Heurístico "IA Analista" (Offline AI)
- **Dificuldade Adaptativa ("Auto IA")**: Nova opção no seletor de dificuldades que calibra as questões oferecidas conforme as métricas do usuário (ex: Sobe de Fácil para Médio após precisão >80%).
- **Análise Dinâmica de Desempenho**: O painel de feedback da resposta não dirá apenas "Certo/Errado", mas fornecerá comentários sintéticos. Respondendo em menos de 5 segundos de forma correta, a IA elogiará sua precisão cirúrgica. Errando de forma veloz, dirá que você foi precipitado.

## 2. Nova Economia In-Game e Multiplicadores
- Ganhos antes fixos em +10 XP vão escalar de acordo com o Nível de Dificuldade (Iniciante=10, Lógica=20, Massiva=30).
- **Speed Run Bonus (Agilidade)**: Resolver código rapidamente (<6s) vai conceder `+5 XP` de bônus.
- **Combo Multiplier**: Cada acerto em sua Sequência/Streak atual fornecerá `+5%` cumulativo e infinito de ganho absoluto nas moedas de cada rodada.

## 3. Cyber Market (A Loja Clandestina de Detetives)
Uma interface exclusiva onde as **Moedas** valem de verdade e impulsionam o seu jogo através de um sistema de Inventário (`inventory: { hints: 0, skips: 0 }`).
- **Módulo Decodificador (Dica / 50-50)** - `Preço: 15 Moedas`
  - *No Jogo*: Ao ativado, retira 2 das opções incorretas de cara para facilitar acertos em níveis complexos.
- **Bypass Root (Pular Bug)** - `Preço: 30 Moedas`
  - *No Jogo*: O botão pula para a próxima Questão instantaneamente, salvando quem não quer perder um valioso "Streak of 20" em uma questão `Inferno`.

## Impactos no Sistema (`js/offline.js`) [MODIFY]
1. `saveScore()` passará a incorporar as complexas matemáticas de ganhos em % da `IA`.
2. A injeção da Nova Tela de Dashboard incluirá o banner `"🛒 Cyber Market"`.
3. Para garantir que sistemas desatualizados de localStorage não crashem com `inventory` faltando, injetaremos um "safe merge" ao resgatar `user` (preenchendo a chave retroativamente).
4. O `loadGameInterface` terá injetado 2 botões de Inventário consumíveis durante as partidas, visíveis desde que o saldo no inventário seja > 0.

## User Review Required

> [!WARNING]
> Esse update gigante modificará todo o conceito do jogo, transformando de um quiz offline em um genuíno App de Aprendizado Gamificado, com Economia Completa e IA Causal! As pontuações se tornarão maiores sob as novas regras dinâmicas e exigirão rebalanceamento mínimo nos cálculos de Nível.

Está pronto para a construção dupla deste super sistema (A.I + Sistema de Loja offline)? Autoriza a injeção do código?
