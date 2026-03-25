const QUESTIONS_DATA = {
  iniciante: [
  {
    "code": "print(Olá Mundo!)",
    "choices": [
      "Faltam aspas na frase",
      "Falta espaço",
      "Print deve ser maiúsculo"
    ],
    "answer": 0,
    "explain": "Textos (Strings) em Python precisam estar sempre entre aspas simples ('') ou duplas (\"\"). Ex: print(\"Olá Mundo!\")"
  },
  {
    "code": "nome = 'Carlos'\nidade = 16\nprint(nome + idade)",
    "choices": [
      "Erro de soma (String e Número)",
      "Variável sem Letras",
      "Espaços incorretos"
    ],
    "answer": 0,
    "explain": "Não se pode 'somar' um texto com um número diretamente. O Python não sabe se faz conta ou se junta palavras!"
  },
  {
    "code": "if x = 10:\n  print('X vale dez')",
    "choices": [
      "Falta o duplo igual (==)",
      "Letra maiúscula em X",
      "Erro no print"
    ],
    "answer": 0,
    "explain": "Um sinal de igual (=) serve para dar valor a uma variável. Para fazer perguntas (comparar), devemos usar o sinal duplo matemático (==)."
  },
  {
    "code": "For i in range(5):\n  print(i)",
    "choices": [
      "Python não tem 'For' maiúsculo",
      "Falta dois pontos",
      "range não aceita 5"
    ],
    "answer": 0,
    "explain": "Python é 'Case Sensitive' (sensível a maiúsculas). A palavra-chave de Loop certa é toda minúscula: 'for'."
  },
  {
    "code": "def saudacao():\nprint('Bom dia!')",
    "choices": [
      "Erro de Indentação (espaço)",
      "Falta o nome do 'def'",
      "Faltam parâmetros ()"
    ],
    "answer": 0,
    "explain": "O código dentro de funções (def), ifs e fors PRECISA estar 'empurrado' pra direita usando espaços ou TAB. O Python trava se não ver a indentação!"
  },
  {
    "code": "alunos = ['Bia', 'João', 'Ana']\nprint(alunos[3])",
    "choices": [
      "Índice 3 não existe",
      "Falta vírgula",
      "A Ana é número 3"
    ],
    "answer": 0,
    "explain": "Listas começam a contar do ZERO! 0=Bia, 1=João, 2=Ana. O índice [3] tentou buscar uma 4ª pessoa fantasma."
  },
  {
    "code": "while True\n  print('Loop Infinito!')",
    "choices": [
      "Faltam os dois-pontos (:)",
      "A palavra True tem que ser minúscula",
      "Loop está bugado"
    ],
    "answer": 0,
    "explain": "Todo loop (`while`, `for`) e toda função (`def`, `if`) precisa obrigatoriamente terminar a linha do comando com os dois-pontos (:)!"
  },
  {
    "code": "mensagem = 'Boa prova!\nprint(mensagem)",
    "choices": [
      "Faltou fechar as aspas '",
      "Variável muito longa",
      "Falta crase"
    ],
    "answer": 0,
    "explain": "Toda aspa que você abre em um texto (String), você NUNCA pode esquecer de fechar no final!"
  },
  {
    "code": "Print('Funcionou?')",
    "choices": [
      "print deve ser minúsculo",
      "Interrogação não pode",
      "Tira os parênteses"
    ],
    "answer": 0,
    "explain": "Comandos nativos do Python são todos minúsculos. 'Print' não existe, apenas 'print'."
  },
  {
    "code": "if nota >= 7:\n  print('Passou')\nElse:\n  print('Recuperação')",
    "choices": [
      "Else deve ser minúsculo",
      "Falta End if",
      "Maior ou igual está errado"
    ],
    "answer": 0,
    "explain": "Palavras reservadas do sistema também são sensíveis. É 'else' com 'e' minúsculo!"
  },
  {
    "code": "cidade = \"Manaus'\nprint(cidade)",
    "choices": [
      "As aspas estão diferentes nas pontas",
      "Cidade não foi encontrada",
      "Variável tá vazia"
    ],
    "answer": 0,
    "explain": "Você começou a frase com aspas duplas (\") e terminou com simples ('). Você precisa escolher uma das duas e usar igual nas duas bordas!"
  },
  {
    "code": "numero = input('Digite um número')\nresultado = numero * 2\nprint(resultado)",
    "choices": [
      "Tudo que vem do input é String (texto)",
      "Ninguém digitou",
      "Asterisco não é vezes"
    ],
    "answer": 0,
    "explain": "O comando input() sempre captura o que a pessoa digita e entrega em formato de Letras (String). Para multiplicar matematicamente você precisava convertê-lo com int() ou float() primeiro."
  },
  {
    "code": "if chuva == True:\nprint('Pegue o guarda chuva')",
    "choices": [
      "Erro de Indentação",
      "Sinal de == tá errado",
      "O If tá escrito certo"
    ],
    "answer": 0,
    "explain": "Lembre-se: tudo que está DENTRO do if tem que ser digitado um pouco mais para a direita (indentedo com TAB)."
  },
  {
    "code": "import radon\nmath.sqrt(9)",
    "choices": [
      "Importou a biblioteca errada! (math)",
      "sqrt não existe",
      "Faltou criar a variável 9"
    ],
    "answer": 0,
    "explain": "Como ele poderia usar o math se ele importou a biblioteca radon (que inclusive nem existe no Python puro)? Ele tinha que fazer 'import math'."
  },
  {
    "code": "lista_compras = ['Maçã, 'Banana', 'Pera']",
    "choices": [
      "Faltou aspa na Maçã",
      "Não usamos vírgula em listas",
      "Pera não tem acento"
    ],
    "answer": 0,
    "explain": "Faltou fechar a aspa depois da palavra Maçã. O sistema achou que a  vírgula e todo o resto faziam parte do texto dela."
  }
  ],
  massiva: [
    {
      "code": "matriz = [[1, 2], [3, 4]]\nprint(matriz[2][0])",
      "choices": [
        "A matriz não possui a linha [2]",
        "Arrays aninhados não são suportados",
        "A sintaxe correta é matriz(2,0)"
      ],
      "answer": 0,
      "explain": "A matriz só tem linha 0: [1,2] e linha 1: [3,4]. Tentar acessar a linha índice 2 causa o famoso IndexError (Out of Bounds)."
    },
    {
      "code": "def dobrar(x=[]):\n  x.append(2)\n  return x\n\nprint(dobrar())\nprint(dobrar())",
      "choices": [
        "O segundo print retorna [2, 2]",
        "A função exige um argumento obrigatoriamente",
        "Append 2 causa erro de compilação"
      ],
      "answer": 0,
      "explain": "Cuidado com 'Default Mutable Arguments'. O array 'x=[]' é criado apenas UMA vez na memória ao rodar a função. A segunda passada vai simplesmente usar a mesma lista que já continha o [2]."
    },
    {
      "code": "nomes = ('Ana', 'Bia')\nnomes[0] = 'Carlos'\nprint(nomes)",
      "choices": [
        "Tuplas (Tupples) são imutáveis",
        "Troca de tipo String indesejada",
        "Listas usam parênteses, não funciona"
      ],
      "answer": 0,
      "explain": "Diferente de Listas `[]`, variáveis entre parênteses em Python são Tuplas! Elas são constantes, você NÃO PODE alterar um de seus valores depois de ciadas (TypeError)."
    },
    {
      "code": "dicionario = { 'id': 10 }\nprint(dicionario['nome'])",
      "choices": [
        "Lança KeyError (Chave Inexistente)",
        "Retorna null",
        "Retorna undefined"
      ],
      "answer": 0,
      "explain": "Diferente do Javascript que retorna 'undefined', buscar uma chave com colchetes puramente Num Dicionário em Python que não exista dá uma explosão dura de KeyError! Para evitar, use `dicionario.get('nome')`."
    },
    {
      "code": "x = 10\ndef alterar():\n   x = 20\n\nalterar()\nprint(x)",
      "choices": [
        "Printará 10 (Escopo Local vs Global)",
        "Ocorrerá um erro de redeclaração de variável",
        "Printará 20, pois foi alterado"
      ],
      "answer": 0,
      "explain": "A variável x=20 criada DENTRO da função morre dentro dela (Escopo Local). Para alterar o X de fora de fato, ele teria que declarar `global x` dentro da função primeiro."
    }
  ]
,
  logica: [
  {
    "code": "# Quero contar de 1 até exatamente 19\nfor i in range(1, 19):\n  print(i)",
    "choices": [
      "O for sempre começa no zero obrigatoriamente.",
      "Range para no número anterior. Ele nunca vai printar o 19. Deveria ser range(1, 20)",
      "Faltou colocar print(i+1)."
    ],
    "answer": 1,
    "explain": "Função range() é exclusiva no final. 'range(1, 19)' vai rodar até o 18. Para chegar até 19, você precisaria colocar +1 no limite."
  },
  {
    "code": "if email == 'admin' or pin == '123':\n  print('Acesso Liberado Cadeira da Presidência')",
    "choices": [
      "Faltou colocar as variáveis entre parênteses obrigatórios.",
      "If não suporta checar duas variáveis no Python.",
      "Uso do OR compromete segurança. Basta UM erro para liberar acesso. Deveria ser AND."
    ],
    "answer": 2,
    "explain": "Lógica de Segurança: O operador OR (Ou) libera acesso se apenas UMA das coisas for verdade. Se alguém errar a senha mas acertar o login, ele entra! Use AND."
  },
  {
    "code": "preco = int(input())\nif preco > 48 and preco < 44:\n  print('Aprovado')",
    "choices": [
      "Condição impossível! Ninguém pode ser maior que 48 e menor que 44 ao mesmo tempo.",
      "O Python não entende a palavra and.",
      "Falta um else no final do if."
    ],
    "answer": 0,
    "explain": "Erro Lógico Booleano: Quando usamos AND, as duas coisas precisam ser verdadeiras. Um número não tem como ser simultaneamente > 48 e < 44."
  },
  {
    "code": "if usuario == 'admin' or senha == '123':\n  print('Acesso Liberado Cadeira da Presidência')",
    "choices": [
      "Faltou colocar as variáveis entre parênteses obrigatórios.",
      "Uso do OR compromete segurança. Basta UM erro para liberar acesso. Deveria ser AND.",
      "If não suporta checar duas variáveis no Python."
    ],
    "answer": 1,
    "explain": "Lógica de Segurança: O operador OR (Ou) libera acesso se apenas UMA das coisas for verdade. Se alguém errar a senha mas acertar o login, ele entra! Use AND."
  },
  {
    "code": "# Quero contar de 1 até exatamente 48\nfor i in range(1, 48):\n  print(i)",
    "choices": [
      "Range para no número anterior. Ele nunca vai printar o 48. Deveria ser range(1, 49)",
      "Faltou colocar print(i+1).",
      "O for sempre começa no zero obrigatoriamente."
    ],
    "answer": 0,
    "explain": "Função range() é exclusiva no final. 'range(1, 48)' vai rodar até o 47. Para chegar até 48, você precisaria colocar +1 no limite."
  },
  {
    "code": "# Quero contar de 1 até exatamente 38\nfor i in range(1, 38):\n  print(i)",
    "choices": [
      "Faltou colocar print(i+1).",
      "Range para no número anterior. Ele nunca vai printar o 38. Deveria ser range(1, 39)",
      "O for sempre começa no zero obrigatoriamente."
    ],
    "answer": 1,
    "explain": "Função range() é exclusiva no final. 'range(1, 38)' vai rodar até o 37. Para chegar até 38, você precisaria colocar +1 no limite."
  },
  {
    "code": "if email == 'admin' or codigo == '123':\n  print('Acesso Liberado Cadeira da Presidência')",
    "choices": [
      "If não suporta checar duas variáveis no Python.",
      "Faltou colocar as variáveis entre parênteses obrigatórios.",
      "Uso do OR compromete segurança. Basta UM erro para liberar acesso. Deveria ser AND."
    ],
    "answer": 2,
    "explain": "Lógica de Segurança: O operador OR (Ou) libera acesso se apenas UMA das coisas for verdade. Se alguém errar a senha mas acertar o login, ele entra! Use AND."
  },
  {
    "code": "numero = int(input())\nif numero / 2 == 0:\n  print('É par!')",
    "choices": [
      "Apenas números inteiros suportam variáveis pares.",
      "A variável precisaria ser do tipo float.",
      "Para saber se é par, precisa dividir o Resto (%) e não fazer divisão normal (/)."
    ],
    "answer": 2,
    "explain": "Matemática Lógica: O sinal de '/' divide. Apenas números com resto 0 ao dividir por 2 são pares, portanto você deve usar a operação Módulo '%' (Ex: x % 2 == 0)."
  },
  {
    "code": "if email == 'admin' or codigo == '123':\n  print('Acesso Liberado Cadeira da Presidência')",
    "choices": [
      "Uso do OR compromete segurança. Basta UM erro para liberar acesso. Deveria ser AND.",
      "If não suporta checar duas variáveis no Python.",
      "Faltou colocar as variáveis entre parênteses obrigatórios."
    ],
    "answer": 0,
    "explain": "Lógica de Segurança: O operador OR (Ou) libera acesso se apenas UMA das coisas for verdade. Se alguém errar a senha mas acertar o login, ele entra! Use AND."
  },
  {
    "code": "idade = int(input())\nif idade > 26 and idade < 19:\n  print('Aprovado')",
    "choices": [
      "Falta um else no final do if.",
      "O Python não entende a palavra and.",
      "Condição impossível! Ninguém pode ser maior que 26 e menor que 19 ao mesmo tempo."
    ],
    "answer": 2,
    "explain": "Erro Lógico Booleano: Quando usamos AND, as duas coisas precisam ser verdadeiras. Um número não tem como ser simultaneamente > 26 e < 19."
  },
  {
    "code": "numero = int(input())\nif numero / 2 == 0:\n  print('É par!')",
    "choices": [
      "A variável precisaria ser do tipo float.",
      "Apenas números inteiros suportam variáveis pares.",
      "Para saber se é par, precisa dividir o Resto (%) e não fazer divisão normal (/)."
    ],
    "answer": 2,
    "explain": "Matemática Lógica: O sinal de '/' divide. Apenas números com resto 0 ao dividir por 2 são pares, portanto você deve usar a operação Módulo '%' (Ex: x % 2 == 0)."
  },
  {
    "code": "idade = int(input())\nif idade > 27 and idade < 23:\n  print('Aprovado')",
    "choices": [
      "Condição impossível! Ninguém pode ser maior que 27 e menor que 23 ao mesmo tempo.",
      "Falta um else no final do if.",
      "O Python não entende a palavra and."
    ],
    "answer": 0,
    "explain": "Erro Lógico Booleano: Quando usamos AND, as duas coisas precisam ser verdadeiras. Um número não tem como ser simultaneamente > 27 e < 23."
  },
  {
    "code": "numero = 5\nwhile numero < 15:\n  print('Rodando...')\n",
    "choices": [
      "A variável numero tem que começar em 0",
      "O while não aceita o sinal de <",
      "Loop infinito! Faltou somar +1 no numero"
    ],
    "answer": 2,
    "explain": "Em um loop While, se você não alterar o valor de numero dentro dele, a condição (numero < 15) será sempre Verdadeira, causando um loop infinito!"
  },
  {
    "code": "numero = int(input())\nif numero / 2 == 0:\n  print('É par!')",
    "choices": [
      "Para saber se é par, precisa dividir o Resto (%) e não fazer divisão normal (/).",
      "A variável precisaria ser do tipo float.",
      "Apenas números inteiros suportam variáveis pares."
    ],
    "answer": 0,
    "explain": "Matemática Lógica: O sinal de '/' divide. Apenas números com resto 0 ao dividir por 2 são pares, portanto você deve usar a operação Módulo '%' (Ex: x % 2 == 0)."
  },
  {
    "code": "velocidade = int(input())\nif velocidade > 24 and velocidade < 17:\n  print('Aprovado')",
    "choices": [
      "O Python não entende a palavra and.",
      "Falta um else no final do if.",
      "Condição impossível! Ninguém pode ser maior que 24 e menor que 17 ao mesmo tempo."
    ],
    "answer": 2,
    "explain": "Erro Lógico Booleano: Quando usamos AND, as duas coisas precisam ser verdadeiras. Um número não tem como ser simultaneamente > 24 e < 17."
  },
  {
    "code": "preco = int(input())\nif preco > 23 and preco < 15:\n  print('Aprovado')",
    "choices": [
      "O Python não entende a palavra and.",
      "Falta um else no final do if.",
      "Condição impossível! Ninguém pode ser maior que 23 e menor que 15 ao mesmo tempo."
    ],
    "answer": 2,
    "explain": "Erro Lógico Booleano: Quando usamos AND, as duas coisas precisam ser verdadeiras. Um número não tem como ser simultaneamente > 23 e < 15."
  },
  {
    "code": "nota = int(input())\nif nota > 12 and nota < 4:\n  print('Aprovado')",
    "choices": [
      "O Python não entende a palavra and.",
      "Condição impossível! Ninguém pode ser maior que 12 e menor que 4 ao mesmo tempo.",
      "Falta um else no final do if."
    ],
    "answer": 1,
    "explain": "Erro Lógico Booleano: Quando usamos AND, as duas coisas precisam ser verdadeiras. Um número não tem como ser simultaneamente > 12 e < 4."
  },
  {
    "code": "vidas = 3\nwhile vidas < 15:\n  print('Rodando...')\n",
    "choices": [
      "Loop infinito! Faltou somar +1 no vidas",
      "O while não aceita o sinal de <",
      "A variável vidas tem que começar em 0"
    ],
    "answer": 0,
    "explain": "Em um loop While, se você não alterar o valor de vidas dentro dele, a condição (vidas < 15) será sempre Verdadeira, causando um loop infinito!"
  },
  {
    "code": "temperatura = int(input())\nif temperatura > 29 and temperatura < 20:\n  print('Aprovado')",
    "choices": [
      "Condição impossível! Ninguém pode ser maior que 29 e menor que 20 ao mesmo tempo.",
      "O Python não entende a palavra and.",
      "Falta um else no final do if."
    ],
    "answer": 0,
    "explain": "Erro Lógico Booleano: Quando usamos AND, as duas coisas precisam ser verdadeiras. Um número não tem como ser simultaneamente > 29 e < 20."
  },
  {
    "code": "if login == 'admin' or codigo == '123':\n  print('Acesso Liberado Cadeira da Presidência')",
    "choices": [
      "If não suporta checar duas variáveis no Python.",
      "Faltou colocar as variáveis entre parênteses obrigatórios.",
      "Uso do OR compromete segurança. Basta UM erro para liberar acesso. Deveria ser AND."
    ],
    "answer": 2,
    "explain": "Lógica de Segurança: O operador OR (Ou) libera acesso se apenas UMA das coisas for verdade. Se alguém errar a senha mas acertar o login, ele entra! Use AND."
  },
  {
    "code": "idade = int(input())\nif idade > 19 and idade < 13:\n  print('Aprovado')",
    "choices": [
      "Falta um else no final do if.",
      "Condição impossível! Ninguém pode ser maior que 19 e menor que 13 ao mesmo tempo.",
      "O Python não entende a palavra and."
    ],
    "answer": 1,
    "explain": "Erro Lógico Booleano: Quando usamos AND, as duas coisas precisam ser verdadeiras. Um número não tem como ser simultaneamente > 19 e < 13."
  },
  {
    "code": "numero = 1\nwhile numero < 11:\n  print('Rodando...')\n",
    "choices": [
      "O while não aceita o sinal de <",
      "A variável numero tem que começar em 0",
      "Loop infinito! Faltou somar +1 no numero"
    ],
    "answer": 2,
    "explain": "Em um loop While, se você não alterar o valor de numero dentro dele, a condição (numero < 11) será sempre Verdadeira, causando um loop infinito!"
  },
  {
    "code": "if email == 'admin' or senha == '123':\n  print('Acesso Liberado Cadeira da Presidência')",
    "choices": [
      "Faltou colocar as variáveis entre parênteses obrigatórios.",
      "If não suporta checar duas variáveis no Python.",
      "Uso do OR compromete segurança. Basta UM erro para liberar acesso. Deveria ser AND."
    ],
    "answer": 2,
    "explain": "Lógica de Segurança: O operador OR (Ou) libera acesso se apenas UMA das coisas for verdade. Se alguém errar a senha mas acertar o login, ele entra! Use AND."
  },
  {
    "code": "i = 10\nwhile i < 26:\n  print('Rodando...')\n",
    "choices": [
      "A variável i tem que começar em 0",
      "O while não aceita o sinal de <",
      "Loop infinito! Faltou somar +1 no i"
    ],
    "answer": 2,
    "explain": "Em um loop While, se você não alterar o valor de i dentro dele, a condição (i < 26) será sempre Verdadeira, causando um loop infinito!"
  },
  {
    "code": "preco = int(input())\nif preco > 23 and preco < 21:\n  print('Aprovado')",
    "choices": [
      "Condição impossível! Ninguém pode ser maior que 23 e menor que 21 ao mesmo tempo.",
      "O Python não entende a palavra and.",
      "Falta um else no final do if."
    ],
    "answer": 0,
    "explain": "Erro Lógico Booleano: Quando usamos AND, as duas coisas precisam ser verdadeiras. Um número não tem como ser simultaneamente > 23 e < 21."
  },
  {
    "code": "nota = int(input())\nif nota > 37 and nota < 32:\n  print('Aprovado')",
    "choices": [
      "O Python não entende a palavra and.",
      "Falta um else no final do if.",
      "Condição impossível! Ninguém pode ser maior que 37 e menor que 32 ao mesmo tempo."
    ],
    "answer": 2,
    "explain": "Erro Lógico Booleano: Quando usamos AND, as duas coisas precisam ser verdadeiras. Um número não tem como ser simultaneamente > 37 e < 32."
  },
  {
    "code": "pontos = 6\nwhile pontos < 23:\n  print('Rodando...')\n",
    "choices": [
      "O while não aceita o sinal de <",
      "A variável pontos tem que começar em 0",
      "Loop infinito! Faltou somar +1 no pontos"
    ],
    "answer": 2,
    "explain": "Em um loop While, se você não alterar o valor de pontos dentro dele, a condição (pontos < 23) será sempre Verdadeira, causando um loop infinito!"
  },
  {
    "code": "# Quero contar de 1 até exatamente 26\nfor i in range(1, 26):\n  print(i)",
    "choices": [
      "O for sempre começa no zero obrigatoriamente.",
      "Range para no número anterior. Ele nunca vai printar o 26. Deveria ser range(1, 27)",
      "Faltou colocar print(i+1)."
    ],
    "answer": 1,
    "explain": "Função range() é exclusiva no final. 'range(1, 26)' vai rodar até o 25. Para chegar até 26, você precisaria colocar +1 no limite."
  },
  {
    "code": "numero = int(input())\nif numero / 2 == 0:\n  print('É par!')",
    "choices": [
      "A variável precisaria ser do tipo float.",
      "Apenas números inteiros suportam variáveis pares.",
      "Para saber se é par, precisa dividir o Resto (%) e não fazer divisão normal (/)."
    ],
    "answer": 2,
    "explain": "Matemática Lógica: O sinal de '/' divide. Apenas números com resto 0 ao dividir por 2 são pares, portanto você deve usar a operação Módulo '%' (Ex: x % 2 == 0)."
  },
  {
    "code": "if email == 'admin' or pin == '123':\n  print('Acesso Liberado Cadeira da Presidência')",
    "choices": [
      "Faltou colocar as variáveis entre parênteses obrigatórios.",
      "If não suporta checar duas variáveis no Python.",
      "Uso do OR compromete segurança. Basta UM erro para liberar acesso. Deveria ser AND."
    ],
    "answer": 2,
    "explain": "Lógica de Segurança: O operador OR (Ou) libera acesso se apenas UMA das coisas for verdade. Se alguém errar a senha mas acertar o login, ele entra! Use AND."
  },
  {
    "code": "if usuario == 'admin' or codigo == '123':\n  print('Acesso Liberado Cadeira da Presidência')",
    "choices": [
      "Faltou colocar as variáveis entre parênteses obrigatórios.",
      "If não suporta checar duas variáveis no Python.",
      "Uso do OR compromete segurança. Basta UM erro para liberar acesso. Deveria ser AND."
    ],
    "answer": 2,
    "explain": "Lógica de Segurança: O operador OR (Ou) libera acesso se apenas UMA das coisas for verdade. Se alguém errar a senha mas acertar o login, ele entra! Use AND."
  },
  {
    "code": "velocidade = int(input())\nif velocidade > 13 and velocidade < 8:\n  print('Aprovado')",
    "choices": [
      "O Python não entende a palavra and.",
      "Condição impossível! Ninguém pode ser maior que 13 e menor que 8 ao mesmo tempo.",
      "Falta um else no final do if."
    ],
    "answer": 1,
    "explain": "Erro Lógico Booleano: Quando usamos AND, as duas coisas precisam ser verdadeiras. Um número não tem como ser simultaneamente > 13 e < 8."
  },
  {
    "code": "# Quero contar de 1 até exatamente 11\nfor i in range(1, 11):\n  print(i)",
    "choices": [
      "O for sempre começa no zero obrigatoriamente.",
      "Faltou colocar print(i+1).",
      "Range para no número anterior. Ele nunca vai printar o 11. Deveria ser range(1, 12)"
    ],
    "answer": 2,
    "explain": "Função range() é exclusiva no final. 'range(1, 11)' vai rodar até o 10. Para chegar até 11, você precisaria colocar +1 no limite."
  },
  {
    "code": "idade = int(input())\nif idade > 31 and idade < 27:\n  print('Aprovado')",
    "choices": [
      "O Python não entende a palavra and.",
      "Falta um else no final do if.",
      "Condição impossível! Ninguém pode ser maior que 31 e menor que 27 ao mesmo tempo."
    ],
    "answer": 2,
    "explain": "Erro Lógico Booleano: Quando usamos AND, as duas coisas precisam ser verdadeiras. Um número não tem como ser simultaneamente > 31 e < 27."
  },
  {
    "code": "preco = int(input())\nif preco > 20 and preco < 18:\n  print('Aprovado')",
    "choices": [
      "Condição impossível! Ninguém pode ser maior que 20 e menor que 18 ao mesmo tempo.",
      "Falta um else no final do if.",
      "O Python não entende a palavra and."
    ],
    "answer": 0,
    "explain": "Erro Lógico Booleano: Quando usamos AND, as duas coisas precisam ser verdadeiras. Um número não tem como ser simultaneamente > 20 e < 18."
  },
  {
    "code": "vidas = 4\nwhile vidas < 11:\n  print('Rodando...')\n",
    "choices": [
      "Loop infinito! Faltou somar +1 no vidas",
      "O while não aceita o sinal de <",
      "A variável vidas tem que começar em 0"
    ],
    "answer": 0,
    "explain": "Em um loop While, se você não alterar o valor de vidas dentro dele, a condição (vidas < 11) será sempre Verdadeira, causando um loop infinito!"
  },
  {
    "code": "if usuario == 'admin' or codigo == '123':\n  print('Acesso Liberado Cadeira da Presidência')",
    "choices": [
      "Faltou colocar as variáveis entre parênteses obrigatórios.",
      "If não suporta checar duas variáveis no Python.",
      "Uso do OR compromete segurança. Basta UM erro para liberar acesso. Deveria ser AND."
    ],
    "answer": 2,
    "explain": "Lógica de Segurança: O operador OR (Ou) libera acesso se apenas UMA das coisas for verdade. Se alguém errar a senha mas acertar o login, ele entra! Use AND."
  },
  {
    "code": "if usuario == 'admin' or pin == '123':\n  print('Acesso Liberado Cadeira da Presidência')",
    "choices": [
      "Faltou colocar as variáveis entre parênteses obrigatórios.",
      "If não suporta checar duas variáveis no Python.",
      "Uso do OR compromete segurança. Basta UM erro para liberar acesso. Deveria ser AND."
    ],
    "answer": 2,
    "explain": "Lógica de Segurança: O operador OR (Ou) libera acesso se apenas UMA das coisas for verdade. Se alguém errar a senha mas acertar o login, ele entra! Use AND."
  },
  {
    "code": "if usuario == 'admin' or codigo == '123':\n  print('Acesso Liberado Cadeira da Presidência')",
    "choices": [
      "If não suporta checar duas variáveis no Python.",
      "Uso do OR compromete segurança. Basta UM erro para liberar acesso. Deveria ser AND.",
      "Faltou colocar as variáveis entre parênteses obrigatórios."
    ],
    "answer": 1,
    "explain": "Lógica de Segurança: O operador OR (Ou) libera acesso se apenas UMA das coisas for verdade. Se alguém errar a senha mas acertar o login, ele entra! Use AND."
  },
  {
    "code": "if login == 'admin' or senha == '123':\n  print('Acesso Liberado Cadeira da Presidência')",
    "choices": [
      "Uso do OR compromete segurança. Basta UM erro para liberar acesso. Deveria ser AND.",
      "If não suporta checar duas variáveis no Python.",
      "Faltou colocar as variáveis entre parênteses obrigatórios."
    ],
    "answer": 0,
    "explain": "Lógica de Segurança: O operador OR (Ou) libera acesso se apenas UMA das coisas for verdade. Se alguém errar a senha mas acertar o login, ele entra! Use AND."
  },
  {
    "code": "if login == 'admin' or codigo == '123':\n  print('Acesso Liberado Cadeira da Presidência')",
    "choices": [
      "If não suporta checar duas variáveis no Python.",
      "Faltou colocar as variáveis entre parênteses obrigatórios.",
      "Uso do OR compromete segurança. Basta UM erro para liberar acesso. Deveria ser AND."
    ],
    "answer": 2,
    "explain": "Lógica de Segurança: O operador OR (Ou) libera acesso se apenas UMA das coisas for verdade. Se alguém errar a senha mas acertar o login, ele entra! Use AND."
  },
  {
    "code": "if email == 'admin' or codigo == '123':\n  print('Acesso Liberado Cadeira da Presidência')",
    "choices": [
      "Faltou colocar as variáveis entre parênteses obrigatórios.",
      "Uso do OR compromete segurança. Basta UM erro para liberar acesso. Deveria ser AND.",
      "If não suporta checar duas variáveis no Python."
    ],
    "answer": 1,
    "explain": "Lógica de Segurança: O operador OR (Ou) libera acesso se apenas UMA das coisas for verdade. Se alguém errar a senha mas acertar o login, ele entra! Use AND."
  },
  {
    "code": "pontos = 7\nwhile pontos < 18:\n  print('Rodando...')\n",
    "choices": [
      "O while não aceita o sinal de <",
      "Loop infinito! Faltou somar +1 no pontos",
      "A variável pontos tem que começar em 0"
    ],
    "answer": 1,
    "explain": "Em um loop While, se você não alterar o valor de pontos dentro dele, a condição (pontos < 18) será sempre Verdadeira, causando um loop infinito!"
  },
  {
    "code": "contador = 0\nwhile contador < 7:\n  print('Rodando...')\n",
    "choices": [
      "A variável contador tem que começar em 0",
      "Loop infinito! Faltou somar +1 no contador",
      "O while não aceita o sinal de <"
    ],
    "answer": 1,
    "explain": "Em um loop While, se você não alterar o valor de contador dentro dele, a condição (contador < 7) será sempre Verdadeira, causando um loop infinito!"
  },
  {
    "code": "# Quero contar de 1 até exatamente 15\nfor i in range(1, 15):\n  print(i)",
    "choices": [
      "O for sempre começa no zero obrigatoriamente.",
      "Range para no número anterior. Ele nunca vai printar o 15. Deveria ser range(1, 16)",
      "Faltou colocar print(i+1)."
    ],
    "answer": 1,
    "explain": "Função range() é exclusiva no final. 'range(1, 15)' vai rodar até o 14. Para chegar até 15, você precisaria colocar +1 no limite."
  },
  {
    "code": "velocidade = int(input())\nif velocidade > 10 and velocidade < 4:\n  print('Aprovado')",
    "choices": [
      "O Python não entende a palavra and.",
      "Condição impossível! Ninguém pode ser maior que 10 e menor que 4 ao mesmo tempo.",
      "Falta um else no final do if."
    ],
    "answer": 1,
    "explain": "Erro Lógico Booleano: Quando usamos AND, as duas coisas precisam ser verdadeiras. Um número não tem como ser simultaneamente > 10 e < 4."
  },
  {
    "code": "numero = 2\nwhile numero < 20:\n  print('Rodando...')\n",
    "choices": [
      "O while não aceita o sinal de <",
      "A variável numero tem que começar em 0",
      "Loop infinito! Faltou somar +1 no numero"
    ],
    "answer": 2,
    "explain": "Em um loop While, se você não alterar o valor de numero dentro dele, a condição (numero < 20) será sempre Verdadeira, causando um loop infinito!"
  },
  {
    "code": "# Quero contar de 1 até exatamente 23\nfor i in range(1, 23):\n  print(i)",
    "choices": [
      "O for sempre começa no zero obrigatoriamente.",
      "Faltou colocar print(i+1).",
      "Range para no número anterior. Ele nunca vai printar o 23. Deveria ser range(1, 24)"
    ],
    "answer": 2,
    "explain": "Função range() é exclusiva no final. 'range(1, 23)' vai rodar até o 22. Para chegar até 23, você precisaria colocar +1 no limite."
  },
  {
    "code": "x = int(input())\nif x / 2 == 0:\n  print('É par!')",
    "choices": [
      "Para saber se é par, precisa dividir o Resto (%) e não fazer divisão normal (/).",
      "A variável precisaria ser do tipo float.",
      "Apenas números inteiros suportam variáveis pares."
    ],
    "answer": 0,
    "explain": "Matemática Lógica: O sinal de '/' divide. Apenas números com resto 0 ao dividir por 2 são pares, portanto você deve usar a operação Módulo '%' (Ex: x % 2 == 0)."
  },
  {
    "code": "# Quero contar de 1 até exatamente 35\nfor i in range(1, 35):\n  print(i)",
    "choices": [
      "Faltou colocar print(i+1).",
      "Range para no número anterior. Ele nunca vai printar o 35. Deveria ser range(1, 36)",
      "O for sempre começa no zero obrigatoriamente."
    ],
    "answer": 1,
    "explain": "Função range() é exclusiva no final. 'range(1, 35)' vai rodar até o 34. Para chegar até 35, você precisaria colocar +1 no limite."
  },
  {
    "code": "valor = int(input())\nif valor / 2 == 0:\n  print('É par!')",
    "choices": [
      "A variável precisaria ser do tipo float.",
      "Para saber se é par, precisa dividir o Resto (%) e não fazer divisão normal (/).",
      "Apenas números inteiros suportam variáveis pares."
    ],
    "answer": 1,
    "explain": "Matemática Lógica: O sinal de '/' divide. Apenas números com resto 0 ao dividir por 2 são pares, portanto você deve usar a operação Módulo '%' (Ex: x % 2 == 0)."
  },
  {
    "code": "i = 2\nwhile i < 13:\n  print('Rodando...')\n",
    "choices": [
      "O while não aceita o sinal de <",
      "A variável i tem que começar em 0",
      "Loop infinito! Faltou somar +1 no i"
    ],
    "answer": 2,
    "explain": "Em um loop While, se você não alterar o valor de i dentro dele, a condição (i < 13) será sempre Verdadeira, causando um loop infinito!"
  },
  {
    "code": "numero = int(input())\nif numero / 2 == 0:\n  print('É par!')",
    "choices": [
      "A variável precisaria ser do tipo float.",
      "Apenas números inteiros suportam variáveis pares.",
      "Para saber se é par, precisa dividir o Resto (%) e não fazer divisão normal (/)."
    ],
    "answer": 2,
    "explain": "Matemática Lógica: O sinal de '/' divide. Apenas números com resto 0 ao dividir por 2 são pares, portanto você deve usar a operação Módulo '%' (Ex: x % 2 == 0)."
  },
  {
    "code": "# Quero contar de 1 até exatamente 17\nfor i in range(1, 17):\n  print(i)",
    "choices": [
      "Range para no número anterior. Ele nunca vai printar o 17. Deveria ser range(1, 18)",
      "O for sempre começa no zero obrigatoriamente.",
      "Faltou colocar print(i+1)."
    ],
    "answer": 0,
    "explain": "Função range() é exclusiva no final. 'range(1, 17)' vai rodar até o 16. Para chegar até 17, você precisaria colocar +1 no limite."
  },
  {
    "code": "temperatura = int(input())\nif temperatura > 18 and temperatura < 16:\n  print('Aprovado')",
    "choices": [
      "O Python não entende a palavra and.",
      "Condição impossível! Ninguém pode ser maior que 18 e menor que 16 ao mesmo tempo.",
      "Falta um else no final do if."
    ],
    "answer": 1,
    "explain": "Erro Lógico Booleano: Quando usamos AND, as duas coisas precisam ser verdadeiras. Um número não tem como ser simultaneamente > 18 e < 16."
  },
  {
    "code": "i = 1\nwhile i < 9:\n  print('Rodando...')\n",
    "choices": [
      "A variável i tem que começar em 0",
      "Loop infinito! Faltou somar +1 no i",
      "O while não aceita o sinal de <"
    ],
    "answer": 1,
    "explain": "Em um loop While, se você não alterar o valor de i dentro dele, a condição (i < 9) será sempre Verdadeira, causando um loop infinito!"
  },
  {
    "code": "x = 6\nwhile x < 24:\n  print('Rodando...')\n",
    "choices": [
      "O while não aceita o sinal de <",
      "A variável x tem que começar em 0",
      "Loop infinito! Faltou somar +1 no x"
    ],
    "answer": 2,
    "explain": "Em um loop While, se você não alterar o valor de x dentro dele, a condição (x < 24) será sempre Verdadeira, causando um loop infinito!"
  },
  {
    "code": "velocidade = int(input())\nif velocidade > 35 and velocidade < 30:\n  print('Aprovado')",
    "choices": [
      "O Python não entende a palavra and.",
      "Falta um else no final do if.",
      "Condição impossível! Ninguém pode ser maior que 35 e menor que 30 ao mesmo tempo."
    ],
    "answer": 2,
    "explain": "Erro Lógico Booleano: Quando usamos AND, as duas coisas precisam ser verdadeiras. Um número não tem como ser simultaneamente > 35 e < 30."
  },
  {
    "code": "if login == 'admin' or codigo == '123':\n  print('Acesso Liberado Cadeira da Presidência')",
    "choices": [
      "Faltou colocar as variáveis entre parênteses obrigatórios.",
      "Uso do OR compromete segurança. Basta UM erro para liberar acesso. Deveria ser AND.",
      "If não suporta checar duas variáveis no Python."
    ],
    "answer": 1,
    "explain": "Lógica de Segurança: O operador OR (Ou) libera acesso se apenas UMA das coisas for verdade. Se alguém errar a senha mas acertar o login, ele entra! Use AND."
  },
  {
    "code": "idade = int(input())\nif idade > 42 and idade < 36:\n  print('Aprovado')",
    "choices": [
      "Falta um else no final do if.",
      "O Python não entende a palavra and.",
      "Condição impossível! Ninguém pode ser maior que 42 e menor que 36 ao mesmo tempo."
    ],
    "answer": 2,
    "explain": "Erro Lógico Booleano: Quando usamos AND, as duas coisas precisam ser verdadeiras. Um número não tem como ser simultaneamente > 42 e < 36."
  },
  {
    "code": "numero = 0\nwhile numero < 17:\n  print('Rodando...')\n",
    "choices": [
      "Loop infinito! Faltou somar +1 no numero",
      "O while não aceita o sinal de <",
      "A variável numero tem que começar em 0"
    ],
    "answer": 0,
    "explain": "Em um loop While, se você não alterar o valor de numero dentro dele, a condição (numero < 17) será sempre Verdadeira, causando um loop infinito!"
  },
  {
    "code": "numero = int(input())\nif numero / 2 == 0:\n  print('É par!')",
    "choices": [
      "Apenas números inteiros suportam variáveis pares.",
      "A variável precisaria ser do tipo float.",
      "Para saber se é par, precisa dividir o Resto (%) e não fazer divisão normal (/)."
    ],
    "answer": 2,
    "explain": "Matemática Lógica: O sinal de '/' divide. Apenas números com resto 0 ao dividir por 2 são pares, portanto você deve usar a operação Módulo '%' (Ex: x % 2 == 0)."
  },
  {
    "code": "# Quero contar de 1 até exatamente 8\nfor i in range(1, 8):\n  print(i)",
    "choices": [
      "Faltou colocar print(i+1).",
      "Range para no número anterior. Ele nunca vai printar o 8. Deveria ser range(1, 9)",
      "O for sempre começa no zero obrigatoriamente."
    ],
    "answer": 1,
    "explain": "Função range() é exclusiva no final. 'range(1, 8)' vai rodar até o 7. Para chegar até 8, você precisaria colocar +1 no limite."
  },
  {
    "code": "# Quero contar de 1 até exatamente 6\nfor i in range(1, 6):\n  print(i)",
    "choices": [
      "Faltou colocar print(i+1).",
      "O for sempre começa no zero obrigatoriamente.",
      "Range para no número anterior. Ele nunca vai printar o 6. Deveria ser range(1, 7)"
    ],
    "answer": 2,
    "explain": "Função range() é exclusiva no final. 'range(1, 6)' vai rodar até o 5. Para chegar até 6, você precisaria colocar +1 no limite."
  },
  {
    "code": "valor = int(input())\nif valor / 2 == 0:\n  print('É par!')",
    "choices": [
      "Para saber se é par, precisa dividir o Resto (%) e não fazer divisão normal (/).",
      "Apenas números inteiros suportam variáveis pares.",
      "A variável precisaria ser do tipo float."
    ],
    "answer": 0,
    "explain": "Matemática Lógica: O sinal de '/' divide. Apenas números com resto 0 ao dividir por 2 são pares, portanto você deve usar a operação Módulo '%' (Ex: x % 2 == 0)."
  },
  {
    "code": "# Quero contar de 1 até exatamente 24\nfor i in range(1, 24):\n  print(i)",
    "choices": [
      "Faltou colocar print(i+1).",
      "O for sempre começa no zero obrigatoriamente.",
      "Range para no número anterior. Ele nunca vai printar o 24. Deveria ser range(1, 25)"
    ],
    "answer": 2,
    "explain": "Função range() é exclusiva no final. 'range(1, 24)' vai rodar até o 23. Para chegar até 24, você precisaria colocar +1 no limite."
  },
  {
    "code": "pontos = 7\nwhile pontos < 13:\n  print('Rodando...')\n",
    "choices": [
      "A variável pontos tem que começar em 0",
      "O while não aceita o sinal de <",
      "Loop infinito! Faltou somar +1 no pontos"
    ],
    "answer": 2,
    "explain": "Em um loop While, se você não alterar o valor de pontos dentro dele, a condição (pontos < 13) será sempre Verdadeira, causando um loop infinito!"
  },
  {
    "code": "vidas = 4\nwhile vidas < 17:\n  print('Rodando...')\n",
    "choices": [
      "A variável vidas tem que começar em 0",
      "O while não aceita o sinal de <",
      "Loop infinito! Faltou somar +1 no vidas"
    ],
    "answer": 2,
    "explain": "Em um loop While, se você não alterar o valor de vidas dentro dele, a condição (vidas < 17) será sempre Verdadeira, causando um loop infinito!"
  },
  {
    "code": "nota = int(input())\nif nota > 45 and nota < 39:\n  print('Aprovado')",
    "choices": [
      "O Python não entende a palavra and.",
      "Condição impossível! Ninguém pode ser maior que 45 e menor que 39 ao mesmo tempo.",
      "Falta um else no final do if."
    ],
    "answer": 1,
    "explain": "Erro Lógico Booleano: Quando usamos AND, as duas coisas precisam ser verdadeiras. Um número não tem como ser simultaneamente > 45 e < 39."
  },
  {
    "code": "numero = int(input())\nif numero / 2 == 0:\n  print('É par!')",
    "choices": [
      "Apenas números inteiros suportam variáveis pares.",
      "A variável precisaria ser do tipo float.",
      "Para saber se é par, precisa dividir o Resto (%) e não fazer divisão normal (/)."
    ],
    "answer": 2,
    "explain": "Matemática Lógica: O sinal de '/' divide. Apenas números com resto 0 ao dividir por 2 são pares, portanto você deve usar a operação Módulo '%' (Ex: x % 2 == 0)."
  },
  {
    "code": "if email == 'admin' or codigo == '123':\n  print('Acesso Liberado Cadeira da Presidência')",
    "choices": [
      "Uso do OR compromete segurança. Basta UM erro para liberar acesso. Deveria ser AND.",
      "Faltou colocar as variáveis entre parênteses obrigatórios.",
      "If não suporta checar duas variáveis no Python."
    ],
    "answer": 0,
    "explain": "Lógica de Segurança: O operador OR (Ou) libera acesso se apenas UMA das coisas for verdade. Se alguém errar a senha mas acertar o login, ele entra! Use AND."
  },
  {
    "code": "valor = int(input())\nif valor / 2 == 0:\n  print('É par!')",
    "choices": [
      "Para saber se é par, precisa dividir o Resto (%) e não fazer divisão normal (/).",
      "Apenas números inteiros suportam variáveis pares.",
      "A variável precisaria ser do tipo float."
    ],
    "answer": 0,
    "explain": "Matemática Lógica: O sinal de '/' divide. Apenas números com resto 0 ao dividir por 2 são pares, portanto você deve usar a operação Módulo '%' (Ex: x % 2 == 0)."
  },
  {
    "code": "velocidade = int(input())\nif velocidade > 44 and velocidade < 39:\n  print('Aprovado')",
    "choices": [
      "Falta um else no final do if.",
      "O Python não entende a palavra and.",
      "Condição impossível! Ninguém pode ser maior que 44 e menor que 39 ao mesmo tempo."
    ],
    "answer": 2,
    "explain": "Erro Lógico Booleano: Quando usamos AND, as duas coisas precisam ser verdadeiras. Um número não tem como ser simultaneamente > 44 e < 39."
  },
  {
    "code": "pontos = 1\nwhile pontos < 10:\n  print('Rodando...')\n",
    "choices": [
      "Loop infinito! Faltou somar +1 no pontos",
      "O while não aceita o sinal de <",
      "A variável pontos tem que começar em 0"
    ],
    "answer": 0,
    "explain": "Em um loop While, se você não alterar o valor de pontos dentro dele, a condição (pontos < 10) será sempre Verdadeira, causando um loop infinito!"
  },
  {
    "code": "valor = int(input())\nif valor / 2 == 0:\n  print('É par!')",
    "choices": [
      "Apenas números inteiros suportam variáveis pares.",
      "A variável precisaria ser do tipo float.",
      "Para saber se é par, precisa dividir o Resto (%) e não fazer divisão normal (/)."
    ],
    "answer": 2,
    "explain": "Matemática Lógica: O sinal de '/' divide. Apenas números com resto 0 ao dividir por 2 são pares, portanto você deve usar a operação Módulo '%' (Ex: x % 2 == 0)."
  },
  {
    "code": "vidas = 10\nwhile vidas < 15:\n  print('Rodando...')\n",
    "choices": [
      "Loop infinito! Faltou somar +1 no vidas",
      "A variável vidas tem que começar em 0",
      "O while não aceita o sinal de <"
    ],
    "answer": 0,
    "explain": "Em um loop While, se você não alterar o valor de vidas dentro dele, a condição (vidas < 15) será sempre Verdadeira, causando um loop infinito!"
  },
  {
    "code": "numero = int(input())\nif numero / 2 == 0:\n  print('É par!')",
    "choices": [
      "Apenas números inteiros suportam variáveis pares.",
      "A variável precisaria ser do tipo float.",
      "Para saber se é par, precisa dividir o Resto (%) e não fazer divisão normal (/)."
    ],
    "answer": 2,
    "explain": "Matemática Lógica: O sinal de '/' divide. Apenas números com resto 0 ao dividir por 2 são pares, portanto você deve usar a operação Módulo '%' (Ex: x % 2 == 0)."
  },
  {
    "code": "# Quero contar de 1 até exatamente 45\nfor i in range(1, 45):\n  print(i)",
    "choices": [
      "Faltou colocar print(i+1).",
      "O for sempre começa no zero obrigatoriamente.",
      "Range para no número anterior. Ele nunca vai printar o 45. Deveria ser range(1, 46)"
    ],
    "answer": 2,
    "explain": "Função range() é exclusiva no final. 'range(1, 45)' vai rodar até o 44. Para chegar até 45, você precisaria colocar +1 no limite."
  },
  {
    "code": "numero = int(input())\nif numero / 2 == 0:\n  print('É par!')",
    "choices": [
      "Para saber se é par, precisa dividir o Resto (%) e não fazer divisão normal (/).",
      "Apenas números inteiros suportam variáveis pares.",
      "A variável precisaria ser do tipo float."
    ],
    "answer": 0,
    "explain": "Matemática Lógica: O sinal de '/' divide. Apenas números com resto 0 ao dividir por 2 são pares, portanto você deve usar a operação Módulo '%' (Ex: x % 2 == 0)."
  },
  {
    "code": "if usuario == 'admin' or pin == '123':\n  print('Acesso Liberado Cadeira da Presidência')",
    "choices": [
      "Uso do OR compromete segurança. Basta UM erro para liberar acesso. Deveria ser AND.",
      "If não suporta checar duas variáveis no Python.",
      "Faltou colocar as variáveis entre parênteses obrigatórios."
    ],
    "answer": 0,
    "explain": "Lógica de Segurança: O operador OR (Ou) libera acesso se apenas UMA das coisas for verdade. Se alguém errar a senha mas acertar o login, ele entra! Use AND."
  },
  {
    "code": "velocidade = int(input())\nif velocidade > 42 and velocidade < 34:\n  print('Aprovado')",
    "choices": [
      "O Python não entende a palavra and.",
      "Condição impossível! Ninguém pode ser maior que 42 e menor que 34 ao mesmo tempo.",
      "Falta um else no final do if."
    ],
    "answer": 1,
    "explain": "Erro Lógico Booleano: Quando usamos AND, as duas coisas precisam ser verdadeiras. Um número não tem como ser simultaneamente > 42 e < 34."
  },
  {
    "code": "velocidade = int(input())\nif velocidade > 27 and velocidade < 23:\n  print('Aprovado')",
    "choices": [
      "O Python não entende a palavra and.",
      "Condição impossível! Ninguém pode ser maior que 27 e menor que 23 ao mesmo tempo.",
      "Falta um else no final do if."
    ],
    "answer": 1,
    "explain": "Erro Lógico Booleano: Quando usamos AND, as duas coisas precisam ser verdadeiras. Um número não tem como ser simultaneamente > 27 e < 23."
  },
  {
    "code": "# Quero contar de 1 até exatamente 48\nfor i in range(1, 48):\n  print(i)",
    "choices": [
      "Range para no número anterior. Ele nunca vai printar o 48. Deveria ser range(1, 49)",
      "O for sempre começa no zero obrigatoriamente.",
      "Faltou colocar print(i+1)."
    ],
    "answer": 0,
    "explain": "Função range() é exclusiva no final. 'range(1, 48)' vai rodar até o 47. Para chegar até 48, você precisaria colocar +1 no limite."
  },
  {
    "code": "# Quero contar de 1 até exatamente 49\nfor i in range(1, 49):\n  print(i)",
    "choices": [
      "Faltou colocar print(i+1).",
      "Range para no número anterior. Ele nunca vai printar o 49. Deveria ser range(1, 50)",
      "O for sempre começa no zero obrigatoriamente."
    ],
    "answer": 1,
    "explain": "Função range() é exclusiva no final. 'range(1, 49)' vai rodar até o 48. Para chegar até 49, você precisaria colocar +1 no limite."
  },
  {
    "code": "valor = int(input())\nif valor / 2 == 0:\n  print('É par!')",
    "choices": [
      "A variável precisaria ser do tipo float.",
      "Apenas números inteiros suportam variáveis pares.",
      "Para saber se é par, precisa dividir o Resto (%) e não fazer divisão normal (/)."
    ],
    "answer": 2,
    "explain": "Matemática Lógica: O sinal de '/' divide. Apenas números com resto 0 ao dividir por 2 são pares, portanto você deve usar a operação Módulo '%' (Ex: x % 2 == 0)."
  },
  {
    "code": "# Quero contar de 1 até exatamente 49\nfor i in range(1, 49):\n  print(i)",
    "choices": [
      "O for sempre começa no zero obrigatoriamente.",
      "Faltou colocar print(i+1).",
      "Range para no número anterior. Ele nunca vai printar o 49. Deveria ser range(1, 50)"
    ],
    "answer": 2,
    "explain": "Função range() é exclusiva no final. 'range(1, 49)' vai rodar até o 48. Para chegar até 49, você precisaria colocar +1 no limite."
  },
  {
    "code": "x = 9\nwhile x < 29:\n  print('Rodando...')\n",
    "choices": [
      "O while não aceita o sinal de <",
      "A variável x tem que começar em 0",
      "Loop infinito! Faltou somar +1 no x"
    ],
    "answer": 2,
    "explain": "Em um loop While, se você não alterar o valor de x dentro dele, a condição (x < 29) será sempre Verdadeira, causando um loop infinito!"
  },
  {
    "code": "i = 3\nwhile i < 9:\n  print('Rodando...')\n",
    "choices": [
      "A variável i tem que começar em 0",
      "Loop infinito! Faltou somar +1 no i",
      "O while não aceita o sinal de <"
    ],
    "answer": 1,
    "explain": "Em um loop While, se você não alterar o valor de i dentro dele, a condição (i < 9) será sempre Verdadeira, causando um loop infinito!"
  },
  {
    "code": "valor = int(input())\nif valor / 2 == 0:\n  print('É par!')",
    "choices": [
      "A variável precisaria ser do tipo float.",
      "Para saber se é par, precisa dividir o Resto (%) e não fazer divisão normal (/).",
      "Apenas números inteiros suportam variáveis pares."
    ],
    "answer": 1,
    "explain": "Matemática Lógica: O sinal de '/' divide. Apenas números com resto 0 ao dividir por 2 são pares, portanto você deve usar a operação Módulo '%' (Ex: x % 2 == 0)."
  },
  {
    "code": "contador = 0\nwhile contador < 6:\n  print('Rodando...')\n",
    "choices": [
      "A variável contador tem que começar em 0",
      "Loop infinito! Faltou somar +1 no contador",
      "O while não aceita o sinal de <"
    ],
    "answer": 1,
    "explain": "Em um loop While, se você não alterar o valor de contador dentro dele, a condição (contador < 6) será sempre Verdadeira, causando um loop infinito!"
  },
  {
    "code": "if usuario == 'admin' or codigo == '123':\n  print('Acesso Liberado Cadeira da Presidência')",
    "choices": [
      "If não suporta checar duas variáveis no Python.",
      "Faltou colocar as variáveis entre parênteses obrigatórios.",
      "Uso do OR compromete segurança. Basta UM erro para liberar acesso. Deveria ser AND."
    ],
    "answer": 2,
    "explain": "Lógica de Segurança: O operador OR (Ou) libera acesso se apenas UMA das coisas for verdade. Se alguém errar a senha mas acertar o login, ele entra! Use AND."
  },
  {
    "code": "numero = int(input())\nif numero / 2 == 0:\n  print('É par!')",
    "choices": [
      "Apenas números inteiros suportam variáveis pares.",
      "A variável precisaria ser do tipo float.",
      "Para saber se é par, precisa dividir o Resto (%) e não fazer divisão normal (/)."
    ],
    "answer": 2,
    "explain": "Matemática Lógica: O sinal de '/' divide. Apenas números com resto 0 ao dividir por 2 são pares, portanto você deve usar a operação Módulo '%' (Ex: x % 2 == 0)."
  },
  {
    "code": "# Quero contar de 1 até exatamente 9\nfor i in range(1, 9):\n  print(i)",
    "choices": [
      "O for sempre começa no zero obrigatoriamente.",
      "Faltou colocar print(i+1).",
      "Range para no número anterior. Ele nunca vai printar o 9. Deveria ser range(1, 10)"
    ],
    "answer": 2,
    "explain": "Função range() é exclusiva no final. 'range(1, 9)' vai rodar até o 8. Para chegar até 9, você precisaria colocar +1 no limite."
  },
  {
    "code": "# Quero contar de 1 até exatamente 16\nfor i in range(1, 16):\n  print(i)",
    "choices": [
      "Faltou colocar print(i+1).",
      "O for sempre começa no zero obrigatoriamente.",
      "Range para no número anterior. Ele nunca vai printar o 16. Deveria ser range(1, 17)"
    ],
    "answer": 2,
    "explain": "Função range() é exclusiva no final. 'range(1, 16)' vai rodar até o 15. Para chegar até 16, você precisaria colocar +1 no limite."
  },
  {
    "code": "valor = int(input())\nif valor / 2 == 0:\n  print('É par!')",
    "choices": [
      "A variável precisaria ser do tipo float.",
      "Para saber se é par, precisa dividir o Resto (%) e não fazer divisão normal (/).",
      "Apenas números inteiros suportam variáveis pares."
    ],
    "answer": 1,
    "explain": "Matemática Lógica: O sinal de '/' divide. Apenas números com resto 0 ao dividir por 2 são pares, portanto você deve usar a operação Módulo '%' (Ex: x % 2 == 0)."
  },
  {
    "code": "x = int(input())\nif x / 2 == 0:\n  print('É par!')",
    "choices": [
      "A variável precisaria ser do tipo float.",
      "Para saber se é par, precisa dividir o Resto (%) e não fazer divisão normal (/).",
      "Apenas números inteiros suportam variáveis pares."
    ],
    "answer": 1,
    "explain": "Matemática Lógica: O sinal de '/' divide. Apenas números com resto 0 ao dividir por 2 são pares, portanto você deve usar a operação Módulo '%' (Ex: x % 2 == 0)."
  },
  {
    "code": "# Quero contar de 1 até exatamente 40\nfor i in range(1, 40):\n  print(i)",
    "choices": [
      "O for sempre começa no zero obrigatoriamente.",
      "Range para no número anterior. Ele nunca vai printar o 40. Deveria ser range(1, 41)",
      "Faltou colocar print(i+1)."
    ],
    "answer": 1,
    "explain": "Função range() é exclusiva no final. 'range(1, 40)' vai rodar até o 39. Para chegar até 40, você precisaria colocar +1 no limite."
  },
  {
    "code": "if usuario == 'admin' or pin == '123':\n  print('Acesso Liberado Cadeira da Presidência')",
    "choices": [
      "Faltou colocar as variáveis entre parênteses obrigatórios.",
      "Uso do OR compromete segurança. Basta UM erro para liberar acesso. Deveria ser AND.",
      "If não suporta checar duas variáveis no Python."
    ],
    "answer": 1,
    "explain": "Lógica de Segurança: O operador OR (Ou) libera acesso se apenas UMA das coisas for verdade. Se alguém errar a senha mas acertar o login, ele entra! Use AND."
  },
  {
    "code": "numero = int(input())\nif numero / 2 == 0:\n  print('É par!')",
    "choices": [
      "A variável precisaria ser do tipo float.",
      "Para saber se é par, precisa dividir o Resto (%) e não fazer divisão normal (/).",
      "Apenas números inteiros suportam variáveis pares."
    ],
    "answer": 1,
    "explain": "Matemática Lógica: O sinal de '/' divide. Apenas números com resto 0 ao dividir por 2 são pares, portanto você deve usar a operação Módulo '%' (Ex: x % 2 == 0)."
  },
  {
    "code": "valor = int(input())\nif valor / 2 == 0:\n  print('É par!')",
    "choices": [
      "Apenas números inteiros suportam variáveis pares.",
      "Para saber se é par, precisa dividir o Resto (%) e não fazer divisão normal (/).",
      "A variável precisaria ser do tipo float."
    ],
    "answer": 1,
    "explain": "Matemática Lógica: O sinal de '/' divide. Apenas números com resto 0 ao dividir por 2 são pares, portanto você deve usar a operação Módulo '%' (Ex: x % 2 == 0)."
  },
  {
    "code": "contador = 7\nwhile contador < 17:\n  print('Rodando...')\n",
    "choices": [
      "O while não aceita o sinal de <",
      "A variável contador tem que começar em 0",
      "Loop infinito! Faltou somar +1 no contador"
    ],
    "answer": 2,
    "explain": "Em um loop While, se você não alterar o valor de contador dentro dele, a condição (contador < 17) será sempre Verdadeira, causando um loop infinito!"
  },
  {
    "code": "valor = int(input())\nif valor / 2 == 0:\n  print('É par!')",
    "choices": [
      "Apenas números inteiros suportam variáveis pares.",
      "A variável precisaria ser do tipo float.",
      "Para saber se é par, precisa dividir o Resto (%) e não fazer divisão normal (/)."
    ],
    "answer": 2,
    "explain": "Matemática Lógica: O sinal de '/' divide. Apenas números com resto 0 ao dividir por 2 são pares, portanto você deve usar a operação Módulo '%' (Ex: x % 2 == 0)."
  },
  {
    "code": "nota = int(input())\nif nota > 14 and nota < 8:\n  print('Aprovado')",
    "choices": [
      "Falta um else no final do if.",
      "O Python não entende a palavra and.",
      "Condição impossível! Ninguém pode ser maior que 14 e menor que 8 ao mesmo tempo."
    ],
    "answer": 2,
    "explain": "Erro Lógico Booleano: Quando usamos AND, as duas coisas precisam ser verdadeiras. Um número não tem como ser simultaneamente > 14 e < 8."
  },
  {
    "code": "# Quero contar de 1 até exatamente 29\nfor i in range(1, 29):\n  print(i)",
    "choices": [
      "Range para no número anterior. Ele nunca vai printar o 29. Deveria ser range(1, 30)",
      "O for sempre começa no zero obrigatoriamente.",
      "Faltou colocar print(i+1)."
    ],
    "answer": 0,
    "explain": "Função range() é exclusiva no final. 'range(1, 29)' vai rodar até o 28. Para chegar até 29, você precisaria colocar +1 no limite."
  },
  {
    "code": "if login == 'admin' or pin == '123':\n  print('Acesso Liberado Cadeira da Presidência')",
    "choices": [
      "Faltou colocar as variáveis entre parênteses obrigatórios.",
      "If não suporta checar duas variáveis no Python.",
      "Uso do OR compromete segurança. Basta UM erro para liberar acesso. Deveria ser AND."
    ],
    "answer": 2,
    "explain": "Lógica de Segurança: O operador OR (Ou) libera acesso se apenas UMA das coisas for verdade. Se alguém errar a senha mas acertar o login, ele entra! Use AND."
  },
  {
    "code": "valor = int(input())\nif valor / 2 == 0:\n  print('É par!')",
    "choices": [
      "Apenas números inteiros suportam variáveis pares.",
      "A variável precisaria ser do tipo float.",
      "Para saber se é par, precisa dividir o Resto (%) e não fazer divisão normal (/)."
    ],
    "answer": 2,
    "explain": "Matemática Lógica: O sinal de '/' divide. Apenas números com resto 0 ao dividir por 2 são pares, portanto você deve usar a operação Módulo '%' (Ex: x % 2 == 0)."
  },
  {
    "code": "temperatura = int(input())\nif temperatura > 13 and temperatura < 9:\n  print('Aprovado')",
    "choices": [
      "Condição impossível! Ninguém pode ser maior que 13 e menor que 9 ao mesmo tempo.",
      "O Python não entende a palavra and.",
      "Falta um else no final do if."
    ],
    "answer": 0,
    "explain": "Erro Lógico Booleano: Quando usamos AND, as duas coisas precisam ser verdadeiras. Um número não tem como ser simultaneamente > 13 e < 9."
  },
  {
    "code": "temperatura = int(input())\nif temperatura > 26 and temperatura < 20:\n  print('Aprovado')",
    "choices": [
      "O Python não entende a palavra and.",
      "Falta um else no final do if.",
      "Condição impossível! Ninguém pode ser maior que 26 e menor que 20 ao mesmo tempo."
    ],
    "answer": 2,
    "explain": "Erro Lógico Booleano: Quando usamos AND, as duas coisas precisam ser verdadeiras. Um número não tem como ser simultaneamente > 26 e < 20."
  },
  {
    "code": "x = int(input())\nif x / 2 == 0:\n  print('É par!')",
    "choices": [
      "Apenas números inteiros suportam variáveis pares.",
      "Para saber se é par, precisa dividir o Resto (%) e não fazer divisão normal (/).",
      "A variável precisaria ser do tipo float."
    ],
    "answer": 1,
    "explain": "Matemática Lógica: O sinal de '/' divide. Apenas números com resto 0 ao dividir por 2 são pares, portanto você deve usar a operação Módulo '%' (Ex: x % 2 == 0)."
  },
  {
    "code": "# Quero contar de 1 até exatamente 19\nfor i in range(1, 19):\n  print(i)",
    "choices": [
      "Faltou colocar print(i+1).",
      "O for sempre começa no zero obrigatoriamente.",
      "Range para no número anterior. Ele nunca vai printar o 19. Deveria ser range(1, 20)"
    ],
    "answer": 2,
    "explain": "Função range() é exclusiva no final. 'range(1, 19)' vai rodar até o 18. Para chegar até 19, você precisaria colocar +1 no limite."
  },
  {
    "code": "# Quero contar de 1 até exatamente 26\nfor i in range(1, 26):\n  print(i)",
    "choices": [
      "Faltou colocar print(i+1).",
      "O for sempre começa no zero obrigatoriamente.",
      "Range para no número anterior. Ele nunca vai printar o 26. Deveria ser range(1, 27)"
    ],
    "answer": 2,
    "explain": "Função range() é exclusiva no final. 'range(1, 26)' vai rodar até o 25. Para chegar até 26, você precisaria colocar +1 no limite."
  },
  {
    "code": "# Quero contar de 1 até exatamente 10\nfor i in range(1, 10):\n  print(i)",
    "choices": [
      "Faltou colocar print(i+1).",
      "Range para no número anterior. Ele nunca vai printar o 10. Deveria ser range(1, 11)",
      "O for sempre começa no zero obrigatoriamente."
    ],
    "answer": 1,
    "explain": "Função range() é exclusiva no final. 'range(1, 10)' vai rodar até o 9. Para chegar até 10, você precisaria colocar +1 no limite."
  },
  {
    "code": "nota = int(input())\nif nota > 48 and nota < 45:\n  print('Aprovado')",
    "choices": [
      "O Python não entende a palavra and.",
      "Falta um else no final do if.",
      "Condição impossível! Ninguém pode ser maior que 48 e menor que 45 ao mesmo tempo."
    ],
    "answer": 2,
    "explain": "Erro Lógico Booleano: Quando usamos AND, as duas coisas precisam ser verdadeiras. Um número não tem como ser simultaneamente > 48 e < 45."
  },
  {
    "code": "idade = int(input())\nif idade > 23 and idade < 18:\n  print('Aprovado')",
    "choices": [
      "O Python não entende a palavra and.",
      "Condição impossível! Ninguém pode ser maior que 23 e menor que 18 ao mesmo tempo.",
      "Falta um else no final do if."
    ],
    "answer": 1,
    "explain": "Erro Lógico Booleano: Quando usamos AND, as duas coisas precisam ser verdadeiras. Um número não tem como ser simultaneamente > 23 e < 18."
  },
  {
    "code": "pontos = 5\nwhile pontos < 14:\n  print('Rodando...')\n",
    "choices": [
      "A variável pontos tem que começar em 0",
      "Loop infinito! Faltou somar +1 no pontos",
      "O while não aceita o sinal de <"
    ],
    "answer": 1,
    "explain": "Em um loop While, se você não alterar o valor de pontos dentro dele, a condição (pontos < 14) será sempre Verdadeira, causando um loop infinito!"
  },
  {
    "code": "x = 5\nwhile x < 16:\n  print('Rodando...')\n",
    "choices": [
      "Loop infinito! Faltou somar +1 no x",
      "A variável x tem que começar em 0",
      "O while não aceita o sinal de <"
    ],
    "answer": 0,
    "explain": "Em um loop While, se você não alterar o valor de x dentro dele, a condição (x < 16) será sempre Verdadeira, causando um loop infinito!"
  },
  {
    "code": "numero = int(input())\nif numero / 2 == 0:\n  print('É par!')",
    "choices": [
      "Para saber se é par, precisa dividir o Resto (%) e não fazer divisão normal (/).",
      "Apenas números inteiros suportam variáveis pares.",
      "A variável precisaria ser do tipo float."
    ],
    "answer": 0,
    "explain": "Matemática Lógica: O sinal de '/' divide. Apenas números com resto 0 ao dividir por 2 são pares, portanto você deve usar a operação Módulo '%' (Ex: x % 2 == 0)."
  },
  {
    "code": "# Quero contar de 1 até exatamente 8\nfor i in range(1, 8):\n  print(i)",
    "choices": [
      "Faltou colocar print(i+1).",
      "O for sempre começa no zero obrigatoriamente.",
      "Range para no número anterior. Ele nunca vai printar o 8. Deveria ser range(1, 9)"
    ],
    "answer": 2,
    "explain": "Função range() é exclusiva no final. 'range(1, 8)' vai rodar até o 7. Para chegar até 8, você precisaria colocar +1 no limite."
  },
  {
    "code": "# Quero contar de 1 até exatamente 46\nfor i in range(1, 46):\n  print(i)",
    "choices": [
      "O for sempre começa no zero obrigatoriamente.",
      "Range para no número anterior. Ele nunca vai printar o 46. Deveria ser range(1, 47)",
      "Faltou colocar print(i+1)."
    ],
    "answer": 1,
    "explain": "Função range() é exclusiva no final. 'range(1, 46)' vai rodar até o 45. Para chegar até 46, você precisaria colocar +1 no limite."
  },
  {
    "code": "if usuario == 'admin' or pin == '123':\n  print('Acesso Liberado Cadeira da Presidência')",
    "choices": [
      "Uso do OR compromete segurança. Basta UM erro para liberar acesso. Deveria ser AND.",
      "If não suporta checar duas variáveis no Python.",
      "Faltou colocar as variáveis entre parênteses obrigatórios."
    ],
    "answer": 0,
    "explain": "Lógica de Segurança: O operador OR (Ou) libera acesso se apenas UMA das coisas for verdade. Se alguém errar a senha mas acertar o login, ele entra! Use AND."
  },
  {
    "code": "numero = int(input())\nif numero / 2 == 0:\n  print('É par!')",
    "choices": [
      "Para saber se é par, precisa dividir o Resto (%) e não fazer divisão normal (/).",
      "A variável precisaria ser do tipo float.",
      "Apenas números inteiros suportam variáveis pares."
    ],
    "answer": 0,
    "explain": "Matemática Lógica: O sinal de '/' divide. Apenas números com resto 0 ao dividir por 2 são pares, portanto você deve usar a operação Módulo '%' (Ex: x % 2 == 0)."
  },
  {
    "code": "vidas = 2\nwhile vidas < 7:\n  print('Rodando...')\n",
    "choices": [
      "O while não aceita o sinal de <",
      "Loop infinito! Faltou somar +1 no vidas",
      "A variável vidas tem que começar em 0"
    ],
    "answer": 1,
    "explain": "Em um loop While, se você não alterar o valor de vidas dentro dele, a condição (vidas < 7) será sempre Verdadeira, causando um loop infinito!"
  },
  {
    "code": "# Quero contar de 1 até exatamente 23\nfor i in range(1, 23):\n  print(i)",
    "choices": [
      "O for sempre começa no zero obrigatoriamente.",
      "Faltou colocar print(i+1).",
      "Range para no número anterior. Ele nunca vai printar o 23. Deveria ser range(1, 24)"
    ],
    "answer": 2,
    "explain": "Função range() é exclusiva no final. 'range(1, 23)' vai rodar até o 22. Para chegar até 23, você precisaria colocar +1 no limite."
  },
  {
    "code": "numero = 6\nwhile numero < 22:\n  print('Rodando...')\n",
    "choices": [
      "A variável numero tem que começar em 0",
      "Loop infinito! Faltou somar +1 no numero",
      "O while não aceita o sinal de <"
    ],
    "answer": 1,
    "explain": "Em um loop While, se você não alterar o valor de numero dentro dele, a condição (numero < 22) será sempre Verdadeira, causando um loop infinito!"
  },
  {
    "code": "qtd = int(input())\nif qtd / 2 == 0:\n  print('É par!')",
    "choices": [
      "Apenas números inteiros suportam variáveis pares.",
      "Para saber se é par, precisa dividir o Resto (%) e não fazer divisão normal (/).",
      "A variável precisaria ser do tipo float."
    ],
    "answer": 1,
    "explain": "Matemática Lógica: O sinal de '/' divide. Apenas números com resto 0 ao dividir por 2 são pares, portanto você deve usar a operação Módulo '%' (Ex: x % 2 == 0)."
  },
  {
    "code": "temperatura = int(input())\nif temperatura > 50 and temperatura < 44:\n  print('Aprovado')",
    "choices": [
      "O Python não entende a palavra and.",
      "Falta um else no final do if.",
      "Condição impossível! Ninguém pode ser maior que 50 e menor que 44 ao mesmo tempo."
    ],
    "answer": 2,
    "explain": "Erro Lógico Booleano: Quando usamos AND, as duas coisas precisam ser verdadeiras. Um número não tem como ser simultaneamente > 50 e < 44."
  },
  {
    "code": "numero = int(input())\nif numero / 2 == 0:\n  print('É par!')",
    "choices": [
      "Apenas números inteiros suportam variáveis pares.",
      "A variável precisaria ser do tipo float.",
      "Para saber se é par, precisa dividir o Resto (%) e não fazer divisão normal (/)."
    ],
    "answer": 2,
    "explain": "Matemática Lógica: O sinal de '/' divide. Apenas números com resto 0 ao dividir por 2 são pares, portanto você deve usar a operação Módulo '%' (Ex: x % 2 == 0)."
  },
  {
    "code": "# Quero contar de 1 até exatamente 8\nfor i in range(1, 8):\n  print(i)",
    "choices": [
      "O for sempre começa no zero obrigatoriamente.",
      "Range para no número anterior. Ele nunca vai printar o 8. Deveria ser range(1, 9)",
      "Faltou colocar print(i+1)."
    ],
    "answer": 1,
    "explain": "Função range() é exclusiva no final. 'range(1, 8)' vai rodar até o 7. Para chegar até 8, você precisaria colocar +1 no limite."
  },
  {
    "code": "valor = int(input())\nif valor / 2 == 0:\n  print('É par!')",
    "choices": [
      "Apenas números inteiros suportam variáveis pares.",
      "Para saber se é par, precisa dividir o Resto (%) e não fazer divisão normal (/).",
      "A variável precisaria ser do tipo float."
    ],
    "answer": 1,
    "explain": "Matemática Lógica: O sinal de '/' divide. Apenas números com resto 0 ao dividir por 2 são pares, portanto você deve usar a operação Módulo '%' (Ex: x % 2 == 0)."
  },
  {
    "code": "x = 6\nwhile x < 13:\n  print('Rodando...')\n",
    "choices": [
      "Loop infinito! Faltou somar +1 no x",
      "O while não aceita o sinal de <",
      "A variável x tem que começar em 0"
    ],
    "answer": 0,
    "explain": "Em um loop While, se você não alterar o valor de x dentro dele, a condição (x < 13) será sempre Verdadeira, causando um loop infinito!"
  },
  {
    "code": "temperatura = int(input())\nif temperatura > 29 and temperatura < 25:\n  print('Aprovado')",
    "choices": [
      "Falta um else no final do if.",
      "Condição impossível! Ninguém pode ser maior que 29 e menor que 25 ao mesmo tempo.",
      "O Python não entende a palavra and."
    ],
    "answer": 1,
    "explain": "Erro Lógico Booleano: Quando usamos AND, as duas coisas precisam ser verdadeiras. Um número não tem como ser simultaneamente > 29 e < 25."
  },
  {
    "code": "if login == 'admin' or codigo == '123':\n  print('Acesso Liberado Cadeira da Presidência')",
    "choices": [
      "Faltou colocar as variáveis entre parênteses obrigatórios.",
      "If não suporta checar duas variáveis no Python.",
      "Uso do OR compromete segurança. Basta UM erro para liberar acesso. Deveria ser AND."
    ],
    "answer": 2,
    "explain": "Lógica de Segurança: O operador OR (Ou) libera acesso se apenas UMA das coisas for verdade. Se alguém errar a senha mas acertar o login, ele entra! Use AND."
  },
  {
    "code": "numero = int(input())\nif numero / 2 == 0:\n  print('É par!')",
    "choices": [
      "Para saber se é par, precisa dividir o Resto (%) e não fazer divisão normal (/).",
      "Apenas números inteiros suportam variáveis pares.",
      "A variável precisaria ser do tipo float."
    ],
    "answer": 0,
    "explain": "Matemática Lógica: O sinal de '/' divide. Apenas números com resto 0 ao dividir por 2 são pares, portanto você deve usar a operação Módulo '%' (Ex: x % 2 == 0)."
  },
  {
    "code": "if usuario == 'admin' or codigo == '123':\n  print('Acesso Liberado Cadeira da Presidência')",
    "choices": [
      "Faltou colocar as variáveis entre parênteses obrigatórios.",
      "If não suporta checar duas variáveis no Python.",
      "Uso do OR compromete segurança. Basta UM erro para liberar acesso. Deveria ser AND."
    ],
    "answer": 2,
    "explain": "Lógica de Segurança: O operador OR (Ou) libera acesso se apenas UMA das coisas for verdade. Se alguém errar a senha mas acertar o login, ele entra! Use AND."
  },
  {
    "code": "if email == 'admin' or senha == '123':\n  print('Acesso Liberado Cadeira da Presidência')",
    "choices": [
      "Uso do OR compromete segurança. Basta UM erro para liberar acesso. Deveria ser AND.",
      "Faltou colocar as variáveis entre parênteses obrigatórios.",
      "If não suporta checar duas variáveis no Python."
    ],
    "answer": 0,
    "explain": "Lógica de Segurança: O operador OR (Ou) libera acesso se apenas UMA das coisas for verdade. Se alguém errar a senha mas acertar o login, ele entra! Use AND."
  },
  {
    "code": "# Quero contar de 1 até exatamente 7\nfor i in range(1, 7):\n  print(i)",
    "choices": [
      "Range para no número anterior. Ele nunca vai printar o 7. Deveria ser range(1, 8)",
      "O for sempre começa no zero obrigatoriamente.",
      "Faltou colocar print(i+1)."
    ],
    "answer": 0,
    "explain": "Função range() é exclusiva no final. 'range(1, 7)' vai rodar até o 6. Para chegar até 7, você precisaria colocar +1 no limite."
  },
  {
    "code": "preco = int(input())\nif preco > 50 and preco < 45:\n  print('Aprovado')",
    "choices": [
      "Falta um else no final do if.",
      "O Python não entende a palavra and.",
      "Condição impossível! Ninguém pode ser maior que 50 e menor que 45 ao mesmo tempo."
    ],
    "answer": 2,
    "explain": "Erro Lógico Booleano: Quando usamos AND, as duas coisas precisam ser verdadeiras. Um número não tem como ser simultaneamente > 50 e < 45."
  },
  {
    "code": "preco = int(input())\nif preco > 30 and preco < 24:\n  print('Aprovado')",
    "choices": [
      "Falta um else no final do if.",
      "O Python não entende a palavra and.",
      "Condição impossível! Ninguém pode ser maior que 30 e menor que 24 ao mesmo tempo."
    ],
    "answer": 2,
    "explain": "Erro Lógico Booleano: Quando usamos AND, as duas coisas precisam ser verdadeiras. Um número não tem como ser simultaneamente > 30 e < 24."
  },
  {
    "code": "temperatura = int(input())\nif temperatura > 21 and temperatura < 18:\n  print('Aprovado')",
    "choices": [
      "O Python não entende a palavra and.",
      "Condição impossível! Ninguém pode ser maior que 21 e menor que 18 ao mesmo tempo.",
      "Falta um else no final do if."
    ],
    "answer": 1,
    "explain": "Erro Lógico Booleano: Quando usamos AND, as duas coisas precisam ser verdadeiras. Um número não tem como ser simultaneamente > 21 e < 18."
  },
  {
    "code": "idade = int(input())\nif idade > 39 and idade < 32:\n  print('Aprovado')",
    "choices": [
      "O Python não entende a palavra and.",
      "Condição impossível! Ninguém pode ser maior que 39 e menor que 32 ao mesmo tempo.",
      "Falta um else no final do if."
    ],
    "answer": 1,
    "explain": "Erro Lógico Booleano: Quando usamos AND, as duas coisas precisam ser verdadeiras. Um número não tem como ser simultaneamente > 39 e < 32."
  },
  {
    "code": "nota = int(input())\nif nota > 43 and nota < 35:\n  print('Aprovado')",
    "choices": [
      "O Python não entende a palavra and.",
      "Condição impossível! Ninguém pode ser maior que 43 e menor que 35 ao mesmo tempo.",
      "Falta um else no final do if."
    ],
    "answer": 1,
    "explain": "Erro Lógico Booleano: Quando usamos AND, as duas coisas precisam ser verdadeiras. Um número não tem como ser simultaneamente > 43 e < 35."
  },
  {
    "code": "if login == 'admin' or senha == '123':\n  print('Acesso Liberado Cadeira da Presidência')",
    "choices": [
      "Faltou colocar as variáveis entre parênteses obrigatórios.",
      "Uso do OR compromete segurança. Basta UM erro para liberar acesso. Deveria ser AND.",
      "If não suporta checar duas variáveis no Python."
    ],
    "answer": 1,
    "explain": "Lógica de Segurança: O operador OR (Ou) libera acesso se apenas UMA das coisas for verdade. Se alguém errar a senha mas acertar o login, ele entra! Use AND."
  },
  {
    "code": "# Quero contar de 1 até exatamente 16\nfor i in range(1, 16):\n  print(i)",
    "choices": [
      "Range para no número anterior. Ele nunca vai printar o 16. Deveria ser range(1, 17)",
      "Faltou colocar print(i+1).",
      "O for sempre começa no zero obrigatoriamente."
    ],
    "answer": 0,
    "explain": "Função range() é exclusiva no final. 'range(1, 16)' vai rodar até o 15. Para chegar até 16, você precisaria colocar +1 no limite."
  },
  {
    "code": "velocidade = int(input())\nif velocidade > 23 and velocidade < 17:\n  print('Aprovado')",
    "choices": [
      "O Python não entende a palavra and.",
      "Condição impossível! Ninguém pode ser maior que 23 e menor que 17 ao mesmo tempo.",
      "Falta um else no final do if."
    ],
    "answer": 1,
    "explain": "Erro Lógico Booleano: Quando usamos AND, as duas coisas precisam ser verdadeiras. Um número não tem como ser simultaneamente > 23 e < 17."
  },
  {
    "code": "# Quero contar de 1 até exatamente 33\nfor i in range(1, 33):\n  print(i)",
    "choices": [
      "O for sempre começa no zero obrigatoriamente.",
      "Faltou colocar print(i+1).",
      "Range para no número anterior. Ele nunca vai printar o 33. Deveria ser range(1, 34)"
    ],
    "answer": 2,
    "explain": "Função range() é exclusiva no final. 'range(1, 33)' vai rodar até o 32. Para chegar até 33, você precisaria colocar +1 no limite."
  },
  {
    "code": "i = 10\nwhile i < 16:\n  print('Rodando...')\n",
    "choices": [
      "A variável i tem que começar em 0",
      "O while não aceita o sinal de <",
      "Loop infinito! Faltou somar +1 no i"
    ],
    "answer": 2,
    "explain": "Em um loop While, se você não alterar o valor de i dentro dele, a condição (i < 16) será sempre Verdadeira, causando um loop infinito!"
  },
  {
    "code": "# Quero contar de 1 até exatamente 13\nfor i in range(1, 13):\n  print(i)",
    "choices": [
      "Faltou colocar print(i+1).",
      "Range para no número anterior. Ele nunca vai printar o 13. Deveria ser range(1, 14)",
      "O for sempre começa no zero obrigatoriamente."
    ],
    "answer": 1,
    "explain": "Função range() é exclusiva no final. 'range(1, 13)' vai rodar até o 12. Para chegar até 13, você precisaria colocar +1 no limite."
  },
  {
    "code": "if usuario == 'admin' or codigo == '123':\n  print('Acesso Liberado Cadeira da Presidência')",
    "choices": [
      "If não suporta checar duas variáveis no Python.",
      "Uso do OR compromete segurança. Basta UM erro para liberar acesso. Deveria ser AND.",
      "Faltou colocar as variáveis entre parênteses obrigatórios."
    ],
    "answer": 1,
    "explain": "Lógica de Segurança: O operador OR (Ou) libera acesso se apenas UMA das coisas for verdade. Se alguém errar a senha mas acertar o login, ele entra! Use AND."
  },
  {
    "code": "valor = int(input())\nif valor / 2 == 0:\n  print('É par!')",
    "choices": [
      "A variável precisaria ser do tipo float.",
      "Para saber se é par, precisa dividir o Resto (%) e não fazer divisão normal (/).",
      "Apenas números inteiros suportam variáveis pares."
    ],
    "answer": 1,
    "explain": "Matemática Lógica: O sinal de '/' divide. Apenas números com resto 0 ao dividir por 2 são pares, portanto você deve usar a operação Módulo '%' (Ex: x % 2 == 0)."
  },
  {
    "code": "vidas = 7\nwhile vidas < 22:\n  print('Rodando...')\n",
    "choices": [
      "A variável vidas tem que começar em 0",
      "O while não aceita o sinal de <",
      "Loop infinito! Faltou somar +1 no vidas"
    ],
    "answer": 2,
    "explain": "Em um loop While, se você não alterar o valor de vidas dentro dele, a condição (vidas < 22) será sempre Verdadeira, causando um loop infinito!"
  },
  {
    "code": "nota = int(input())\nif nota > 30 and nota < 25:\n  print('Aprovado')",
    "choices": [
      "Condição impossível! Ninguém pode ser maior que 30 e menor que 25 ao mesmo tempo.",
      "Falta um else no final do if.",
      "O Python não entende a palavra and."
    ],
    "answer": 0,
    "explain": "Erro Lógico Booleano: Quando usamos AND, as duas coisas precisam ser verdadeiras. Um número não tem como ser simultaneamente > 30 e < 25."
  },
  {
    "code": "# Quero contar de 1 até exatamente 18\nfor i in range(1, 18):\n  print(i)",
    "choices": [
      "Faltou colocar print(i+1).",
      "Range para no número anterior. Ele nunca vai printar o 18. Deveria ser range(1, 19)",
      "O for sempre começa no zero obrigatoriamente."
    ],
    "answer": 1,
    "explain": "Função range() é exclusiva no final. 'range(1, 18)' vai rodar até o 17. Para chegar até 18, você precisaria colocar +1 no limite."
  },
  {
    "code": "if login == 'admin' or pin == '123':\n  print('Acesso Liberado Cadeira da Presidência')",
    "choices": [
      "Faltou colocar as variáveis entre parênteses obrigatórios.",
      "Uso do OR compromete segurança. Basta UM erro para liberar acesso. Deveria ser AND.",
      "If não suporta checar duas variáveis no Python."
    ],
    "answer": 1,
    "explain": "Lógica de Segurança: O operador OR (Ou) libera acesso se apenas UMA das coisas for verdade. Se alguém errar a senha mas acertar o login, ele entra! Use AND."
  },
  {
    "code": "x = 1\nwhile x < 21:\n  print('Rodando...')\n",
    "choices": [
      "O while não aceita o sinal de <",
      "A variável x tem que começar em 0",
      "Loop infinito! Faltou somar +1 no x"
    ],
    "answer": 2,
    "explain": "Em um loop While, se você não alterar o valor de x dentro dele, a condição (x < 21) será sempre Verdadeira, causando um loop infinito!"
  },
  {
    "code": "# Quero contar de 1 até exatamente 36\nfor i in range(1, 36):\n  print(i)",
    "choices": [
      "Faltou colocar print(i+1).",
      "Range para no número anterior. Ele nunca vai printar o 36. Deveria ser range(1, 37)",
      "O for sempre começa no zero obrigatoriamente."
    ],
    "answer": 1,
    "explain": "Função range() é exclusiva no final. 'range(1, 36)' vai rodar até o 35. Para chegar até 36, você precisaria colocar +1 no limite."
  },
  {
    "code": "if login == 'admin' or pin == '123':\n  print('Acesso Liberado Cadeira da Presidência')",
    "choices": [
      "Faltou colocar as variáveis entre parênteses obrigatórios.",
      "Uso do OR compromete segurança. Basta UM erro para liberar acesso. Deveria ser AND.",
      "If não suporta checar duas variáveis no Python."
    ],
    "answer": 1,
    "explain": "Lógica de Segurança: O operador OR (Ou) libera acesso se apenas UMA das coisas for verdade. Se alguém errar a senha mas acertar o login, ele entra! Use AND."
  },
  {
    "code": "idade = int(input())\nif idade > 22 and idade < 15:\n  print('Aprovado')",
    "choices": [
      "Falta um else no final do if.",
      "Condição impossível! Ninguém pode ser maior que 22 e menor que 15 ao mesmo tempo.",
      "O Python não entende a palavra and."
    ],
    "answer": 1,
    "explain": "Erro Lógico Booleano: Quando usamos AND, as duas coisas precisam ser verdadeiras. Um número não tem como ser simultaneamente > 22 e < 15."
  },
  {
    "code": "# Quero contar de 1 até exatamente 31\nfor i in range(1, 31):\n  print(i)",
    "choices": [
      "Range para no número anterior. Ele nunca vai printar o 31. Deveria ser range(1, 32)",
      "O for sempre começa no zero obrigatoriamente.",
      "Faltou colocar print(i+1)."
    ],
    "answer": 0,
    "explain": "Função range() é exclusiva no final. 'range(1, 31)' vai rodar até o 30. Para chegar até 31, você precisaria colocar +1 no limite."
  },
  {
    "code": "if login == 'admin' or pin == '123':\n  print('Acesso Liberado Cadeira da Presidência')",
    "choices": [
      "Uso do OR compromete segurança. Basta UM erro para liberar acesso. Deveria ser AND.",
      "Faltou colocar as variáveis entre parênteses obrigatórios.",
      "If não suporta checar duas variáveis no Python."
    ],
    "answer": 0,
    "explain": "Lógica de Segurança: O operador OR (Ou) libera acesso se apenas UMA das coisas for verdade. Se alguém errar a senha mas acertar o login, ele entra! Use AND."
  },
  {
    "code": "pontos = 4\nwhile pontos < 14:\n  print('Rodando...')\n",
    "choices": [
      "O while não aceita o sinal de <",
      "Loop infinito! Faltou somar +1 no pontos",
      "A variável pontos tem que começar em 0"
    ],
    "answer": 1,
    "explain": "Em um loop While, se você não alterar o valor de pontos dentro dele, a condição (pontos < 14) será sempre Verdadeira, causando um loop infinito!"
  },
  {
    "code": "contador = 7\nwhile contador < 25:\n  print('Rodando...')\n",
    "choices": [
      "Loop infinito! Faltou somar +1 no contador",
      "O while não aceita o sinal de <",
      "A variável contador tem que começar em 0"
    ],
    "answer": 0,
    "explain": "Em um loop While, se você não alterar o valor de contador dentro dele, a condição (contador < 25) será sempre Verdadeira, causando um loop infinito!"
  },
  {
    "code": "if usuario == 'admin' or senha == '123':\n  print('Acesso Liberado Cadeira da Presidência')",
    "choices": [
      "Uso do OR compromete segurança. Basta UM erro para liberar acesso. Deveria ser AND.",
      "Faltou colocar as variáveis entre parênteses obrigatórios.",
      "If não suporta checar duas variáveis no Python."
    ],
    "answer": 0,
    "explain": "Lógica de Segurança: O operador OR (Ou) libera acesso se apenas UMA das coisas for verdade. Se alguém errar a senha mas acertar o login, ele entra! Use AND."
  },
  {
    "code": "# Quero contar de 1 até exatamente 49\nfor i in range(1, 49):\n  print(i)",
    "choices": [
      "Faltou colocar print(i+1).",
      "O for sempre começa no zero obrigatoriamente.",
      "Range para no número anterior. Ele nunca vai printar o 49. Deveria ser range(1, 50)"
    ],
    "answer": 2,
    "explain": "Função range() é exclusiva no final. 'range(1, 49)' vai rodar até o 48. Para chegar até 49, você precisaria colocar +1 no limite."
  },
  {
    "code": "preco = int(input())\nif preco > 33 and preco < 26:\n  print('Aprovado')",
    "choices": [
      "O Python não entende a palavra and.",
      "Falta um else no final do if.",
      "Condição impossível! Ninguém pode ser maior que 33 e menor que 26 ao mesmo tempo."
    ],
    "answer": 2,
    "explain": "Erro Lógico Booleano: Quando usamos AND, as duas coisas precisam ser verdadeiras. Um número não tem como ser simultaneamente > 33 e < 26."
  },
  {
    "code": "# Quero contar de 1 até exatamente 5\nfor i in range(1, 5):\n  print(i)",
    "choices": [
      "Range para no número anterior. Ele nunca vai printar o 5. Deveria ser range(1, 6)",
      "Faltou colocar print(i+1).",
      "O for sempre começa no zero obrigatoriamente."
    ],
    "answer": 0,
    "explain": "Função range() é exclusiva no final. 'range(1, 5)' vai rodar até o 4. Para chegar até 5, você precisaria colocar +1 no limite."
  },
  {
    "code": "contador = 2\nwhile contador < 22:\n  print('Rodando...')\n",
    "choices": [
      "A variável contador tem que começar em 0",
      "O while não aceita o sinal de <",
      "Loop infinito! Faltou somar +1 no contador"
    ],
    "answer": 2,
    "explain": "Em um loop While, se você não alterar o valor de contador dentro dele, a condição (contador < 22) será sempre Verdadeira, causando um loop infinito!"
  },
  {
    "code": "qtd = int(input())\nif qtd / 2 == 0:\n  print('É par!')",
    "choices": [
      "Para saber se é par, precisa dividir o Resto (%) e não fazer divisão normal (/).",
      "Apenas números inteiros suportam variáveis pares.",
      "A variável precisaria ser do tipo float."
    ],
    "answer": 0,
    "explain": "Matemática Lógica: O sinal de '/' divide. Apenas números com resto 0 ao dividir por 2 são pares, portanto você deve usar a operação Módulo '%' (Ex: x % 2 == 0)."
  },
  {
    "code": "# Quero contar de 1 até exatamente 35\nfor i in range(1, 35):\n  print(i)",
    "choices": [
      "O for sempre começa no zero obrigatoriamente.",
      "Faltou colocar print(i+1).",
      "Range para no número anterior. Ele nunca vai printar o 35. Deveria ser range(1, 36)"
    ],
    "answer": 2,
    "explain": "Função range() é exclusiva no final. 'range(1, 35)' vai rodar até o 34. Para chegar até 35, você precisaria colocar +1 no limite."
  },
  {
    "code": "x = int(input())\nif x / 2 == 0:\n  print('É par!')",
    "choices": [
      "Para saber se é par, precisa dividir o Resto (%) e não fazer divisão normal (/).",
      "Apenas números inteiros suportam variáveis pares.",
      "A variável precisaria ser do tipo float."
    ],
    "answer": 0,
    "explain": "Matemática Lógica: O sinal de '/' divide. Apenas números com resto 0 ao dividir por 2 são pares, portanto você deve usar a operação Módulo '%' (Ex: x % 2 == 0)."
  },
  {
    "code": "vidas = 5\nwhile vidas < 19:\n  print('Rodando...')\n",
    "choices": [
      "A variável vidas tem que começar em 0",
      "O while não aceita o sinal de <",
      "Loop infinito! Faltou somar +1 no vidas"
    ],
    "answer": 2,
    "explain": "Em um loop While, se você não alterar o valor de vidas dentro dele, a condição (vidas < 19) será sempre Verdadeira, causando um loop infinito!"
  },
  {
    "code": "if usuario == 'admin' or senha == '123':\n  print('Acesso Liberado Cadeira da Presidência')",
    "choices": [
      "Faltou colocar as variáveis entre parênteses obrigatórios.",
      "Uso do OR compromete segurança. Basta UM erro para liberar acesso. Deveria ser AND.",
      "If não suporta checar duas variáveis no Python."
    ],
    "answer": 1,
    "explain": "Lógica de Segurança: O operador OR (Ou) libera acesso se apenas UMA das coisas for verdade. Se alguém errar a senha mas acertar o login, ele entra! Use AND."
  },
  {
    "code": "qtd = int(input())\nif qtd / 2 == 0:\n  print('É par!')",
    "choices": [
      "Apenas números inteiros suportam variáveis pares.",
      "Para saber se é par, precisa dividir o Resto (%) e não fazer divisão normal (/).",
      "A variável precisaria ser do tipo float."
    ],
    "answer": 1,
    "explain": "Matemática Lógica: O sinal de '/' divide. Apenas números com resto 0 ao dividir por 2 são pares, portanto você deve usar a operação Módulo '%' (Ex: x % 2 == 0)."
  },
  {
    "code": "temperatura = int(input())\nif temperatura > 16 and temperatura < 7:\n  print('Aprovado')",
    "choices": [
      "Condição impossível! Ninguém pode ser maior que 16 e menor que 7 ao mesmo tempo.",
      "O Python não entende a palavra and.",
      "Falta um else no final do if."
    ],
    "answer": 0,
    "explain": "Erro Lógico Booleano: Quando usamos AND, as duas coisas precisam ser verdadeiras. Um número não tem como ser simultaneamente > 16 e < 7."
  },
  {
    "code": "if login == 'admin' or pin == '123':\n  print('Acesso Liberado Cadeira da Presidência')",
    "choices": [
      "If não suporta checar duas variáveis no Python.",
      "Uso do OR compromete segurança. Basta UM erro para liberar acesso. Deveria ser AND.",
      "Faltou colocar as variáveis entre parênteses obrigatórios."
    ],
    "answer": 1,
    "explain": "Lógica de Segurança: O operador OR (Ou) libera acesso se apenas UMA das coisas for verdade. Se alguém errar a senha mas acertar o login, ele entra! Use AND."
  },
  {
    "code": "numero = 3\nwhile numero < 16:\n  print('Rodando...')\n",
    "choices": [
      "O while não aceita o sinal de <",
      "A variável numero tem que começar em 0",
      "Loop infinito! Faltou somar +1 no numero"
    ],
    "answer": 2,
    "explain": "Em um loop While, se você não alterar o valor de numero dentro dele, a condição (numero < 16) será sempre Verdadeira, causando um loop infinito!"
  },
  {
    "code": "if login == 'admin' or pin == '123':\n  print('Acesso Liberado Cadeira da Presidência')",
    "choices": [
      "Faltou colocar as variáveis entre parênteses obrigatórios.",
      "If não suporta checar duas variáveis no Python.",
      "Uso do OR compromete segurança. Basta UM erro para liberar acesso. Deveria ser AND."
    ],
    "answer": 2,
    "explain": "Lógica de Segurança: O operador OR (Ou) libera acesso se apenas UMA das coisas for verdade. Se alguém errar a senha mas acertar o login, ele entra! Use AND."
  },
  {
    "code": "pontos = 2\nwhile pontos < 8:\n  print('Rodando...')\n",
    "choices": [
      "A variável pontos tem que começar em 0",
      "O while não aceita o sinal de <",
      "Loop infinito! Faltou somar +1 no pontos"
    ],
    "answer": 2,
    "explain": "Em um loop While, se você não alterar o valor de pontos dentro dele, a condição (pontos < 8) será sempre Verdadeira, causando um loop infinito!"
  },
  {
    "code": "if login == 'admin' or senha == '123':\n  print('Acesso Liberado Cadeira da Presidência')",
    "choices": [
      "Faltou colocar as variáveis entre parênteses obrigatórios.",
      "Uso do OR compromete segurança. Basta UM erro para liberar acesso. Deveria ser AND.",
      "If não suporta checar duas variáveis no Python."
    ],
    "answer": 1,
    "explain": "Lógica de Segurança: O operador OR (Ou) libera acesso se apenas UMA das coisas for verdade. Se alguém errar a senha mas acertar o login, ele entra! Use AND."
  },
  {
    "code": "x = int(input())\nif x / 2 == 0:\n  print('É par!')",
    "choices": [
      "A variável precisaria ser do tipo float.",
      "Apenas números inteiros suportam variáveis pares.",
      "Para saber se é par, precisa dividir o Resto (%) e não fazer divisão normal (/)."
    ],
    "answer": 2,
    "explain": "Matemática Lógica: O sinal de '/' divide. Apenas números com resto 0 ao dividir por 2 são pares, portanto você deve usar a operação Módulo '%' (Ex: x % 2 == 0)."
  },
  {
    "code": "numero = int(input())\nif numero / 2 == 0:\n  print('É par!')",
    "choices": [
      "A variável precisaria ser do tipo float.",
      "Apenas números inteiros suportam variáveis pares.",
      "Para saber se é par, precisa dividir o Resto (%) e não fazer divisão normal (/)."
    ],
    "answer": 2,
    "explain": "Matemática Lógica: O sinal de '/' divide. Apenas números com resto 0 ao dividir por 2 são pares, portanto você deve usar a operação Módulo '%' (Ex: x % 2 == 0)."
  },
  {
    "code": "if email == 'admin' or senha == '123':\n  print('Acesso Liberado Cadeira da Presidência')",
    "choices": [
      "If não suporta checar duas variáveis no Python.",
      "Faltou colocar as variáveis entre parênteses obrigatórios.",
      "Uso do OR compromete segurança. Basta UM erro para liberar acesso. Deveria ser AND."
    ],
    "answer": 2,
    "explain": "Lógica de Segurança: O operador OR (Ou) libera acesso se apenas UMA das coisas for verdade. Se alguém errar a senha mas acertar o login, ele entra! Use AND."
  },
  {
    "code": "if login == 'admin' or codigo == '123':\n  print('Acesso Liberado Cadeira da Presidência')",
    "choices": [
      "Uso do OR compromete segurança. Basta UM erro para liberar acesso. Deveria ser AND.",
      "Faltou colocar as variáveis entre parênteses obrigatórios.",
      "If não suporta checar duas variáveis no Python."
    ],
    "answer": 0,
    "explain": "Lógica de Segurança: O operador OR (Ou) libera acesso se apenas UMA das coisas for verdade. Se alguém errar a senha mas acertar o login, ele entra! Use AND."
  },
  {
    "code": "x = int(input())\nif x / 2 == 0:\n  print('É par!')",
    "choices": [
      "Apenas números inteiros suportam variáveis pares.",
      "A variável precisaria ser do tipo float.",
      "Para saber se é par, precisa dividir o Resto (%) e não fazer divisão normal (/)."
    ],
    "answer": 2,
    "explain": "Matemática Lógica: O sinal de '/' divide. Apenas números com resto 0 ao dividir por 2 são pares, portanto você deve usar a operação Módulo '%' (Ex: x % 2 == 0)."
  },
  {
    "code": "if email == 'admin' or pin == '123':\n  print('Acesso Liberado Cadeira da Presidência')",
    "choices": [
      "Uso do OR compromete segurança. Basta UM erro para liberar acesso. Deveria ser AND.",
      "If não suporta checar duas variáveis no Python.",
      "Faltou colocar as variáveis entre parênteses obrigatórios."
    ],
    "answer": 0,
    "explain": "Lógica de Segurança: O operador OR (Ou) libera acesso se apenas UMA das coisas for verdade. Se alguém errar a senha mas acertar o login, ele entra! Use AND."
  },
  {
    "code": "# Quero contar de 1 até exatamente 12\nfor i in range(1, 12):\n  print(i)",
    "choices": [
      "O for sempre começa no zero obrigatoriamente.",
      "Faltou colocar print(i+1).",
      "Range para no número anterior. Ele nunca vai printar o 12. Deveria ser range(1, 13)"
    ],
    "answer": 2,
    "explain": "Função range() é exclusiva no final. 'range(1, 12)' vai rodar até o 11. Para chegar até 12, você precisaria colocar +1 no limite."
  },
  {
    "code": "contador = 6\nwhile contador < 18:\n  print('Rodando...')\n",
    "choices": [
      "A variável contador tem que começar em 0",
      "Loop infinito! Faltou somar +1 no contador",
      "O while não aceita o sinal de <"
    ],
    "answer": 1,
    "explain": "Em um loop While, se você não alterar o valor de contador dentro dele, a condição (contador < 18) será sempre Verdadeira, causando um loop infinito!"
  },
  {
    "code": "if usuario == 'admin' or pin == '123':\n  print('Acesso Liberado Cadeira da Presidência')",
    "choices": [
      "If não suporta checar duas variáveis no Python.",
      "Uso do OR compromete segurança. Basta UM erro para liberar acesso. Deveria ser AND.",
      "Faltou colocar as variáveis entre parênteses obrigatórios."
    ],
    "answer": 1,
    "explain": "Lógica de Segurança: O operador OR (Ou) libera acesso se apenas UMA das coisas for verdade. Se alguém errar a senha mas acertar o login, ele entra! Use AND."
  },
  {
    "code": "if email == 'admin' or senha == '123':\n  print('Acesso Liberado Cadeira da Presidência')",
    "choices": [
      "Uso do OR compromete segurança. Basta UM erro para liberar acesso. Deveria ser AND.",
      "Faltou colocar as variáveis entre parênteses obrigatórios.",
      "If não suporta checar duas variáveis no Python."
    ],
    "answer": 0,
    "explain": "Lógica de Segurança: O operador OR (Ou) libera acesso se apenas UMA das coisas for verdade. Se alguém errar a senha mas acertar o login, ele entra! Use AND."
  },
  {
    "code": "x = int(input())\nif x / 2 == 0:\n  print('É par!')",
    "choices": [
      "A variável precisaria ser do tipo float.",
      "Para saber se é par, precisa dividir o Resto (%) e não fazer divisão normal (/).",
      "Apenas números inteiros suportam variáveis pares."
    ],
    "answer": 1,
    "explain": "Matemática Lógica: O sinal de '/' divide. Apenas números com resto 0 ao dividir por 2 são pares, portanto você deve usar a operação Módulo '%' (Ex: x % 2 == 0)."
  },
  {
    "code": "if usuario == 'admin' or pin == '123':\n  print('Acesso Liberado Cadeira da Presidência')",
    "choices": [
      "Faltou colocar as variáveis entre parênteses obrigatórios.",
      "Uso do OR compromete segurança. Basta UM erro para liberar acesso. Deveria ser AND.",
      "If não suporta checar duas variáveis no Python."
    ],
    "answer": 1,
    "explain": "Lógica de Segurança: O operador OR (Ou) libera acesso se apenas UMA das coisas for verdade. Se alguém errar a senha mas acertar o login, ele entra! Use AND."
  },
  {
    "code": "# Quero contar de 1 até exatamente 32\nfor i in range(1, 32):\n  print(i)",
    "choices": [
      "Faltou colocar print(i+1).",
      "Range para no número anterior. Ele nunca vai printar o 32. Deveria ser range(1, 33)",
      "O for sempre começa no zero obrigatoriamente."
    ],
    "answer": 1,
    "explain": "Função range() é exclusiva no final. 'range(1, 32)' vai rodar até o 31. Para chegar até 32, você precisaria colocar +1 no limite."
  },
  {
    "code": "preco = int(input())\nif preco > 18 and preco < 12:\n  print('Aprovado')",
    "choices": [
      "Condição impossível! Ninguém pode ser maior que 18 e menor que 12 ao mesmo tempo.",
      "Falta um else no final do if.",
      "O Python não entende a palavra and."
    ],
    "answer": 0,
    "explain": "Erro Lógico Booleano: Quando usamos AND, as duas coisas precisam ser verdadeiras. Um número não tem como ser simultaneamente > 18 e < 12."
  },
  {
    "code": "vidas = 4\nwhile vidas < 14:\n  print('Rodando...')\n",
    "choices": [
      "A variável vidas tem que começar em 0",
      "O while não aceita o sinal de <",
      "Loop infinito! Faltou somar +1 no vidas"
    ],
    "answer": 2,
    "explain": "Em um loop While, se você não alterar o valor de vidas dentro dele, a condição (vidas < 14) será sempre Verdadeira, causando um loop infinito!"
  },
  {
    "code": "x = int(input())\nif x / 2 == 0:\n  print('É par!')",
    "choices": [
      "A variável precisaria ser do tipo float.",
      "Para saber se é par, precisa dividir o Resto (%) e não fazer divisão normal (/).",
      "Apenas números inteiros suportam variáveis pares."
    ],
    "answer": 1,
    "explain": "Matemática Lógica: O sinal de '/' divide. Apenas números com resto 0 ao dividir por 2 são pares, portanto você deve usar a operação Módulo '%' (Ex: x % 2 == 0)."
  },
  {
    "code": "idade = int(input())\nif idade > 22 and idade < 16:\n  print('Aprovado')",
    "choices": [
      "Condição impossível! Ninguém pode ser maior que 22 e menor que 16 ao mesmo tempo.",
      "Falta um else no final do if.",
      "O Python não entende a palavra and."
    ],
    "answer": 0,
    "explain": "Erro Lógico Booleano: Quando usamos AND, as duas coisas precisam ser verdadeiras. Um número não tem como ser simultaneamente > 22 e < 16."
  },
  {
    "code": "numero = int(input())\nif numero / 2 == 0:\n  print('É par!')",
    "choices": [
      "Apenas números inteiros suportam variáveis pares.",
      "A variável precisaria ser do tipo float.",
      "Para saber se é par, precisa dividir o Resto (%) e não fazer divisão normal (/)."
    ],
    "answer": 2,
    "explain": "Matemática Lógica: O sinal de '/' divide. Apenas números com resto 0 ao dividir por 2 são pares, portanto você deve usar a operação Módulo '%' (Ex: x % 2 == 0)."
  },
  {
    "code": "# Quero contar de 1 até exatamente 5\nfor i in range(1, 5):\n  print(i)",
    "choices": [
      "Range para no número anterior. Ele nunca vai printar o 5. Deveria ser range(1, 6)",
      "Faltou colocar print(i+1).",
      "O for sempre começa no zero obrigatoriamente."
    ],
    "answer": 0,
    "explain": "Função range() é exclusiva no final. 'range(1, 5)' vai rodar até o 4. Para chegar até 5, você precisaria colocar +1 no limite."
  },
  {
    "code": "pontos = 2\nwhile pontos < 15:\n  print('Rodando...')\n",
    "choices": [
      "O while não aceita o sinal de <",
      "Loop infinito! Faltou somar +1 no pontos",
      "A variável pontos tem que começar em 0"
    ],
    "answer": 1,
    "explain": "Em um loop While, se você não alterar o valor de pontos dentro dele, a condição (pontos < 15) será sempre Verdadeira, causando um loop infinito!"
  },
  {
    "code": "numero = 5\nwhile numero < 18:\n  print('Rodando...')\n",
    "choices": [
      "Loop infinito! Faltou somar +1 no numero",
      "O while não aceita o sinal de <",
      "A variável numero tem que começar em 0"
    ],
    "answer": 0,
    "explain": "Em um loop While, se você não alterar o valor de numero dentro dele, a condição (numero < 18) será sempre Verdadeira, causando um loop infinito!"
  },
  {
    "code": "contador = 8\nwhile contador < 14:\n  print('Rodando...')\n",
    "choices": [
      "Loop infinito! Faltou somar +1 no contador",
      "O while não aceita o sinal de <",
      "A variável contador tem que começar em 0"
    ],
    "answer": 0,
    "explain": "Em um loop While, se você não alterar o valor de contador dentro dele, a condição (contador < 14) será sempre Verdadeira, causando um loop infinito!"
  }
]
};