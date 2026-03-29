# Resumo da Atualização: O Novo "Motor Neural" Offline

A semente da revolução silenciosa foi plantada no seu sistema. Em vez de depender exclusivamente do arquivo estático de perguntas (`data/questions.js`) ou quebrar a promessa do aplicativo sendo offline ligando-o à Internet, nós trouxemos a inteligência para dentro do navegador.

## 🧬 Conheça o ProceduralAI (`ai_generator.js`)

Criei um Gerador Procedural que mora localmente no cache do Python Detective. Ele opera lendo os dados de performance do usuário (`user.performance.correct` vs `total`).

### 1. Geração Mutável Infinita
Em vez de programar *"if acesso > 3000"*, criei modelos abstratos (Templates Matemáticos). Quando você clica em "Auto IA" para jogar, o motor pega um Molde Lógico e sorteia jargões do nosso novo Dicionário Hacker Interno (`dicts.vars_sys`, `dicts.strings`):
- Numa rodada a variável será chamada de **"bytes"** estourando no limite **"256"**.
- Na próxima, a exata mesma questão terá a cara de um **"firewall"** e o código falhará no limitador **"8080"**.

Isso gera variáveis numéricas e nomes literais aleatórios virtualmente infinitos sem pesar o tamanho do código em 1 Megabyte sequer!

### 2. Dificuldade Responsiva
O algoritmo analisa o seu sangue: 
*   **Acertando Múltiplas na Sequência?** O `analisarTarget()` vai jogar o balanço para puxar Moldes Massivos (*Late Binding, Mutability, Array Pointers*).
*   **Apanhando e zerando a Sequência (Streak)?** Ele sentirá e puxará Moldes Iniciantes (*SyntaxError, Missing Colon, Concatenação de Strings*) pra te levantar e ensinar sem machucar sua progressão.

> [!TIP]
> **Ação Recomendada:** Selecione o Modo **Auto (IA Responsiva)** no Menu e observe como a Categoria da Questão agora exibirá um badge como `.IA.Procedural[LOGICA]`. Isso significa que aquela pergunta nasceu naquele milissegundo apenas para você.
