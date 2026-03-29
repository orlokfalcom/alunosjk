const QUESTIONS_DATA = {
  iniciante: [
    {
      "code": "nome = 'CyberAdmin'\nidade = 22\nprint(nome + idade)",
      "choices": [
        "Variável idade não declarada globalmente.",
        "O operador '+' não soma (TypeError) Inteiro com String.",
        "O nome 'CyberAdmin' estoura o escopo.",
        "A função print() exige parênteses duplos."
      ],
      "answer": 1,
      "explain": "🤖 IA: Exceção [TypeError]. Em Python a tipagem é estritamente forte. O '+' tenta somar dois números ou concatenar duas strings, mas colapsa com tipos mistos. Você deve aplicar `str(idade)`."
    },
    {
      "code": "while True\n    scan_ports()",
      "choices": [
        "Falta o uso de um Break interno.",
        "A indentação dentro do While usa TABs errados.",
        "A declaração do loop requer dois-pontos (:) no final.",
        "True precisa ser escrito com letras minúsculas."
      ],
      "answer": 2,
      "explain": "🤖 IA: Falha de Sistema [SyntaxError]. Estruturas de bloco no compilador CPython (if, for, while, def, class) dependem eternamente dos dois-pontos `:` no fim da declaração superior."
    },
    {
      "code": "def invadir():\nprint(\"Firewall derrubado!\")",
      "choices": [
        "A função não tem argumentos (vazia).",
        "Erro Crítico de Indentação (IndentationError).",
        "Deveria usar 'function' em vez de 'def'.",
        "Faltou aspas simples."
      ],
      "answer": 1,
      "explain": "🤖 IA: [IndentationError]. Python odeia chaves `{ }`. A hierarquia lógica de dentro/fora baseia-se exclusivamente no recuo lateral (indentação). O `print` precisa de TABs contínuos à sua esquerda."
    },
    {
      "code": "acesso = input(\"Senha: \")\nif acesso > 5000:\n    print(\"Elite\")",
      "choices": [
        "input() retorna String. A comparação matemática é ilegal.",
        "Falta a porta STDIO do input.",
        "Variáveis sem 'let' travam o if.",
        "Falta declarar o cast booleano."
      ],
      "answer": 0,
      "explain": "🤖 IA: Alarme de Tipagem! A entrada `input()` retorna puro texto (str). Comparar a palavra '5001' contra o INT 5000 lança Type Mismatch Error. Precisa de `int(input())`."
    },
    {
      "code": "servidores = ['Alpha', 'Beta', 'Gama']\nprint(servidores[3])",
      "choices": [
        "A sintaxe para obter arrays é parênteses (3).",
        "Índice fora dos limites do Array (IndexError).",
        "A lista tem aspas misturadas.",
        "Arrays em Python baseiam-se em índice 1."
      ],
      "answer": 1,
      "explain": "🤖 IA: Vazamento Abortado [IndexError]. Listas começam do Zero (0=Alpha, 1=Beta, 2=Gama). Tentar puxar a casa [3] é acessar o abismo do disco não alocado."
    },
    {
      "code": "for i in range(5):\nprint(\"Ping \", i)",
      "choices": [
        "Falta uma vírgula após range(5).",
        "O for em Python exige let i = 0.",
        "Bloco de repetição sem recuo interno (Indentation).",
        "Range não é aceito no Python 3."
      ],
      "answer": 2,
      "explain": "🤖 IA: Violação de Espaçamento. Comandos operados pelo loop 'for' precisam recuar à direita logo após a declaração com `:`."
    },
    {
      "code": "arquivo = \"payload.exe'\nrun(arquivo)",
      "choices": [
        "Incoerência fatal entre aspas duplas (\") e simples (').",
        "Falta declarar tamanho da string.",
        "Arquivos .exe só rodam no CMD nativo.",
        "Variável em minúsculo falha."
      ],
      "answer": 0,
      "explain": "🤖 IA: Syntax Error Léxico. Strings precisam abrir e fechar com o exato mesmo tipo de aspas. O motor se perdeu tentando achar a dupla da esquerda."
    },
    {
      "code": "If root == True:\n    purge_logs()",
      "choices": [
        "Palavras-chave como if são Case-Sensitive (if minúsculo).",
        "Root é palavra protegida do sistema.",
        "O == exige === no Python estrito.",
        "Uso malicioso da chamada purge barrado."
      ],
      "answer": 0,
      "explain": "🤖 IA: [SyntaxError]. 'If' com E maiúsculo é processado como uma variável qualquer do usuário que nunca existiu. As Keywords de linguagem são cegas a variações de estilo: é sempre `if`."
    },
    {
      "code": "dano = 500\nif dano = 500:\n    print(dano)",
      "choices": [
        "dano não foi globalizado.",
        "If só aceita literais True/False puros.",
        "Falta parênteses em if(dano).",
        "O operador '=' Atribui. Para Comparar exige-se '=='."
      ],
      "answer": 3,
      "explain": "🤖 IA: Erro de Identidade. Usa-se o único `=` para injetar valores na memória RAM. Para validar logicamente uma equivalência usamos obrigatoriamente `==`."
    },
    {
      "code": "versao = 3.9\nprint('A versão Python é: ' versao)",
      "choices": [
        "O print precisa de template literal ($versao).",
        "Falta a vírgula para separar a string da variável.",
        "Print não suporta leitura contígua com floats (Módulo Overflow).",
        "Não existe comando print com ponto decimal."
      ],
      "answer": 1,
      "explain": "🤖 IA: [SyntaxError]. Para exibir variáveis juntas de texto na função `print`, você deve usar vírgula `, ` (que injeta espaço mágico via separador) ou concatenar com `str()`."
    },
    {
      "code": "idade = '25'\nnova = idade + 1\nprint(nova)",
      "choices": [
        "Nova variável precisa de const / let.",
        "O texto não carrega mais a formatação local.",
        "String não faz operação aritmética de soma (TypeError).",
        "Idade não foi castada pra float de antemão."
      ],
      "answer": 2,
      "explain": "🤖 IA: Exceção Lógica (TypeError). '25', entre aspas, não é um algarismo, são dois caracteres lexicais de texto. Soma falha contra números orgânicos (1)."
    },
    {
      "code": "sistemas = ['Linux', 'Windows']\nsistemas.add('MacOS')",
      "choices": [
        "A matriz não possui licença BSD para Mac.",
        "Arrays em Python não usam add(), mas sim append().",
        "Add() só recebe tuplas puramente literais.",
        "A string 'MacOS' precisava ser aspas duplas."
      ],
      "answer": 1,
      "explain": "🤖 IA: [AttributeError]. O comando `add()` serve para estruturas iteráveis exóticas como o `set`. Para as vulgares listas ordenadas `[ ]` o martelo de expansão local se chama `.append(valor)`."
    },
    {
      "code": "print(mensagem)\nmensagem = 'Olá Mundo'",
      "choices": [
        "Ordem de Execução Invertida (NameError: not defined).",
        "As palavras em português estouram a codificação ASCII antiga.",
        "Mensagem não está usando aspas inglesas nativas ''.",
        "O print tenta puxar os logs da API do Windows primeiro."
      ],
      "answer": 0,
      "explain": "🤖 IA: Exceção Fatal de Inerência de Linha [NameError]. Python lê roteiros como nós: metodicamente de cima para baixo. Ninguém pode imprimir ou processar um fantasma. A variável precisa ser declarada antes do seu uso."
    },
    {
      "code": "status = true\nif status:\n   print('Ok')",
      "choices": [
        "Print 'Ok' exige crase.",
        "Variável boolean precisa ser escrita com letra Maiúscula: True.",
        "Falta if(status == True)",
        "Erro de cast no if, precisa de (bool)status."
      ],
      "answer": 1,
      "explain": "🤖 IA: [NameError]. Em Node JS/C/Java o boolean é `true`. Na elegância do Python ele assumiu Maiúsculas na fundação da arquitetura: `True`, e `False`. Padrões importam!"
    },
    {
      "code": "for n in range(0, 10, -1):\n    print(n)",
      "choices": [
        "Loop quebra por colapso do range com 0 inicial.",
        "N não pode ser negativo lógico.",
        "A direção oposta sem start/stop coerente varrerá None.",
        "Loop nativamente vazio, porque o alvo positivo jamais encontra passos negativos."
      ],
      "answer": 3,
      "explain": "🤖 IA: Bug Analítico Frio. Você mandou o range começar no Zero, andar PARA TRÁS (-1), mas tentar chegar no futuro positivo (10). Ele avaliou impossibilidade tática e rodou Zero Vezes com sucesso."
    },
    {
      "code": "var_logica = 10 > 5 > 2\nprint(var_logica)",
      "choices": [
        "O console vomita False por encadeamento proibido em iteradores numéricos.",
        "Funciona normalmente por atalho Lógico imprimindo True.",
        "Dará Error Léxico: não se enfileira condicionais puros.",
        "O output resultará na string '10 > 5 > 2'."
      ],
      "answer": 1,
      "explain": "🤖 IA: O Python é genial. Uma expressão matemática como `a < b < c` é validada pelo core sem colapsar ou demandar lixo pesado de sintaxe tipo `a < b AND b < c`. É legibilidade mágica."
    },
    {
      "code": "print('Saindo do Sistema'')",
      "choices": [
        "Print não suporta 'Saindo'.",
        "O escape (') extra no fechamento devora a função corrompendo o Parsing de sintaxe.",
        "Aspas duplas seriam obrigatórias para strings muito grandes.",
        "Sistema bloqueou escape character \0 em buffer."
      ],
      "answer": 1,
      "explain": "🤖 IA: [SyntaxError Crítico - EOL]. Aquele terceiro caractere de aspa solto no final destruiu o delimitador da memória literária, causando amnésia no compilador."
    },
    {
      "code": "email = admin@empresa.com\nprint(email)",
      "choices": [
        "A variável não carrega tipificação @ válida globalmente.",
        "Print exige format() no caso de domínios corporativos fechados.",
        "O interpretador tenta engolir e processar os textos (admin, empresa) como matrizes brutais. Faltou encapsular com Aspas.",
        "A empresa.com não está importada dentro dos pacotes sistêmicos locais."
      ],
      "answer": 2,
      "explain": "🤖 IA: Violação Semântica Grave [NameError / SyntaxError]. Textos são sagrados e devem ser blindados por Aspas. Sem elas, o compilador julga as linhas como se fossem comandos matemáticos mortais."
    },
    {
      "code": "pontos = 10\npontos = pontos + 15",
      "choices": [
        "A soma afeta a matriz recursiva.",
        "Código quebra pois você não pode atribuir ela a ela mesma.",
        "Precisa de ponto e vírgula no final da linha imperiosamente no Python estrito.",
        "Código funcional in-place e aceito validamente, alterando X Lógico para 25."
      ],
      "answer": 3,
      "explain": "🤖 IA: Análise de Padrões Puros. Sim, diferentemente dos piores terrores do sistema, às vezes o código funciona liso e brutal como planejado. Renomear uma variável referenciando os blocos de leitura dela própria é o pão da computação em Loop."
    },
    {
      "code": "print(\"Hacking...\" * 3)",
      "choices": [
        "Gera erro de TypeMismatch, string não cruza operações matemáticas nulas.",
        "Imprimirá os números textualmente em ASCII 3x.",
        "Aplica repetição limpa string imprimindo: 'Hacking...Hacking...Hacking...'.",
        "Colapsa o print em array [Hacking..., 3]"
      ],
      "answer": 2,
      "explain": "🤖 IA: Sobrecarga Pura (Overloading Operator). Ao contrário do universo inteiro de TIs, Python abraça o Caos: Multiplicar strings simplesmente duplica seus dados repetitivamente criando arrays em fita textual de tamanho proporcional no heap da RAM."
    }
  ],
  logica: [
    {
      "code": "for frame in range(1, 10):\n    renderizar(frame)\n# Exige renderizar até o 10º!",
      "choices": [
        "O range() é exclusivo no stop final; o loop vai estancar e morrer friamente no 9.",
        "Ele pulará ímpares.",
        "Retorna erro Infinito iterando 0 a 10.",
        "A contagem começa em 1,5 por arredondamento Float limpo."
      ],
      "answer": 0,
      "explain": "🤖 IA: Lógica Estilhaçada Básica. Funções de `range(start, stop)` atritam na barreira e morrem logo ANTES do parâmetro stop. Para forçar a ingestão do número, avance: `range(1, 11)`."
    },
    {
      "code": "acesso = \"Hacker\"\nif acesso == 'Admin' or 'Hacker':\n    sistema.liberar()",
      "choices": [
        "A variável limpa os registros não stringados em OR (ValueError vazado do buffer).",
        "Strings cegas não vazias ('Hacker') são resolvidas como Truthy no bypass orgânico OR, rasgando o Firewall SEMPRE abrindo True.",
        "Parênteses limitam o BYPASS: exigindo (acesso == 'Admin' or 'Hacker').",
        "Comparação incompatível de bytes."
      ],
      "answer": 1,
      "explain": "🤖 IA: Pior Brecha de Cibersegurança que Existe. O CPython pergunta: `(Se A == B)` OU Se `(\"Hacker\")`. A string avulsa retorna boolean de sucesso nativamente. A lógica do firewall sempre derreterá retornando True sem checar o resto."
    },
    {
      "code": "for bit in [1, 2, 3]:\n    break\nelse:\n    print(\"Sucesso\")",
      "choices": [
        "A claúsula Except absorve o Error Else em loop raso.",
        "A cláusula nativa Else atrelada ao for NÃO é excutada se a matriz sofreu abortamento do buffer via break ativo.",
        "Terminal cuspirá 'Sucesso' devido à estrutura lógica normal em escopo C.",
        "O Else do Python não aninha Loops, ele retorna Exception fatal de compilação em byte."
      ],
      "answer": 1,
      "explain": "🤖 IA: Estranheza Arcana de Sintaxe [For...Else]. Sim, else funciona após o término de um bloco inteiro do for/while desde que a iteração chegue ao fim natural. Se houver `break`, a morte da repetição salta o expurgo silenciosamente cancelando o Else inteiro."
    },
    {
      "code": "def validar():\n    quadrados = []\n    for n in [1]:\n    quadrados.append(2)\n    return quadrados",
      "choices": [
        "O loop e a adição lógica estão com espaçamento (Indent) corrompido debaixo do laço For.",
        "Operações de array com append geram corrupções booleanas no compilador C em arrays vazios orgânicos.",
        "Return está varrendo memória vazada fora do encerramento principal.",
        "O lambda não fechou blocos numéricos."
      ],
      "answer": 0,
      "explain": "🤖 IA: Indentation Error Brutal. No interpretador estrito, se você cria um `for:` as instruções imediatas subjugadas a ele precisam morar lateralmente para frente por padrão universal de recuo (TAB)."
    },
    {
      "code": "senhas = \"Alpha,Beta,Gama\"\narray = senhas.split()\nprint(len(array))",
      "choices": [
        "O motor retorna None, varrendo o Null.",
        "Ele desmembra vírgulas organicamente gerando Array [Alpha, Beta, Gama] e cuspirá número matriz 3 ao vivo.",
        "A string original sofre split nos delimitadores vírgulas cega retornando um float.",
        "O compilador exibe 1 na tela. Spliting sem argumento nativo procura espaços brancos, isolando a maldita string densed inteira como peça única na nova coleção."
      ],
      "answer": 3,
      "explain": "🤖 IA: Cegueira de Argumentos em String. A ferramenta nativa `.split()` secciona com base em blocos invisíveis de espaço literal (` `). Como tua string carece de vazios, o output injeta a porra da tripa inteira no índice único [0]. Faltou `split(',')`."
    },
    {
      "code": "bits = 8\nwhile bits < 100:\n    enviar_pacote(bits)",
      "choices": [
        "100 não se alinha à fita métrica de memórias RAM locais em blocos de byte par.",
        "Erro de corrupção sintática via escopo nativo While em C.",
        "Exceso atômico gerando Deadlock do núcleo por bloqueio das conexões orgânicas.",
        "Loop infinito puro. O ponteiro lógico dos iteradores (bits) morre travado congelando o Kernel porque jamais acumula avanço temporal explícito!"
      ],
      "answer": 3,
      "explain": "🤖 IA: Kernel Panic Crítico (Loop Infinito da Morte). A variável `bits = 8` nunca sai de 8 e jamais se atreverá a bater os brutais números limitantes menores (< 100) acionados na matriz temporal de avaliação sem código explícito `bits += 1` no núcleo do loop."
    },
    {
      "code": "x = \"150\"\noutput = x * 2\nprint(output)",
      "choices": [
        "A saída cuspirá '150150' no buffer.",
        "Erro TypeMismatch. O terminal afunda falhando com Strings sendo operadas na tabuada algorítmica da linguagem.",
        "Exibe 300.",
        "Despeja [150, 150] encapsulado iterativamente."
      ],
      "answer": 0,
      "explain": "🤖 IA: Sobrecarga Lógica do Operador *. A String aspas duplas de '150' opera debaixo do chapéu da multiplicação clonando iteradores do Byte Object submetido, não números orgânicos. Fritas a matemática sem os Castings estritos de Input (`int()`)."
    },
    {
      "code": "palavra = \"CYBER\"\nmetade = palavra[1:4]\nprint(metade)",
      "choices": [
        "Retorna Criptografia YYY cega nas casas decifradas.",
        "Mapeia o buffer gerando fatia orgânica 'CYB' da Array iterável do string.",
        "O Slice Lógico em array iteradores retorna rigorosamente 'YBE' com exclusão dura limpa no Index final (Stop point).",
        "Retorna Exception na ramificação Key Error iteradora Lenta."
      ],
      "answer": 2,
      "explain": "🤖 IA: Slicings não são Mágica, são Matemática Direcional Fria. Os índices limpos nascem Zero. Index [1] = Y. Os fatiadores operam limitando [Start:Stop]. O index Final (4) NUNCA joga seu byte literais. Pega as casas [1], [2] e [3]."
    },
    {
      "code": "caminho = \"C:\novos\testes\"\nrun(caminho)",
      "choices": [
        "Falha do path Unix por diretórios invertidos slash/backslash.",
        "A string orgânica cega converte acidentalmente sequencias de backslash Escapa (\\n) para Quebras Novas Linhas virtuais e (\\t) pra TABs longos dilacerando o caminho limpo formatado em Windows local.",
        "Strings cegas rejeitam aspas num diretório virtual local.",
        "Limites físicos do path byte strings excedem limitações lógicas absolutas C/C++."
      ],
      "answer": 1,
      "explain": "🤖 IA: As sequencias nativas de bypass (`\\\\`) controlam o universo em C-Level do parser. Use `r\"C:\novos\"` (Raw Strings) para amordaçar os comandos mágicos de inserção fantasma em endereçamentos complexos corrompidos do Desktop."
    },
    {
      "code": "saldo = \"450\"\nif type(saldo) is int:\n    print('Ok')",
      "choices": [
        "O bloco is obrigatoriamente colapsa por Syntax Error; if demanda a balança algorítmica ==.",
        "O type() impõe limite iterativo ao casting de objetos pesados orgânicos.",
        "O bloco desabilita a balança de byte strings e imprime 'Ok' orgulhoso da fita literal matemática em buffer.",
        "Bypass Fantasma Abortado. A String aspas Duplas ('450') nunca descerá seu corpo para Classe 'int' pura. O If jamais deságua sua condição interna sem os conversores."
      ],
      "answer": 3,
      "explain": "🤖 IA: Engano Lógico da Categoria Orgânica. Números guardados dentro do manto invisível Textual (`str`) falham na prova do polígrafo estrito Tipológico `type()`. É um teste letal contra classes. Ele morre mudo. O If se retira com honra."
    },
    {
      "code": "lista = [1,2]\nlista.append( [3,4] )\nprint(lista[2])",
      "choices": [
        "Terminal despeja a Array matriz [1, 2, 3, 4] após a infusão interna orgânica lisa.",
        "Ele indexa na casa 2 inteiramente a matriz [3, 4] blindada num saco único injetado na raiz mestre sub-matriz Lógica abstrata.",
        "O número atômico iterador gerará o Index Limit Crash Lançando Exception em string cega na array.",
        "Saída nula pois os colchetes são devorados organicamente devolvendo vazamentos de ponteiros brutos na array estendida list object nativa da lib do python."
      ],
      "answer": 1,
      "explain": "🤖 IA: Ensacamento Matriz-Dimensional. Método mágico `append()` não desembala as caixas para guardá-las nas estantes do objeto mestre isoladas. Ele atirou a Array pesada de colchetes fechados bruta e seca pra dentro virando Sub-Array `[1, 2, [3, 4]]`. Use `extend()` pra magia atômica fluir limpa."
    },
    {
      "code": "usuario = {'nome': 'neo'}\nif usuario.get('idade') > 18:\n    print('Aprovado')",
      "choices": [
        "Retorna silenciosamente None ao invólucro do buffer if não lançando exceção atômica KeyError destrutiva em runtime C++.",
        "A condição > estoura TypeError pois None comparado logicamente iterado com números Int destravam conflito de operadores binários fatais lógicos.",
        "Ele pula as chaves blindadas e executa False bypass bypass false organic.",
        "If resolve a variável em String vazias abortando as chaves nulas magicamente em falses contínuas do dict object do python."
      ],
      "answer": 1,
      "explain": "🤖 IA: Escudo Anti-Falha Falido [TypeError] orgulhoso! `dict.get('chave')` entrega silenciosamente nulo genérico orgânico `None` em Python fugindo das mortais `KeyError`. Entretanto, a maldição cai no prato do IF lógico: tentar perguntar `Se None > 18` cospe erro na balança por cruzar tipagens impossíveis."
    },
    {
      "code": "keys = {'a': 1, 'b': 2, 'a': 3}\nprint(keys['a'])",
      "choices": [
        "Sistemas Hashmap proíbem brutalmente chaves repetidas em Parsing com dict exception mortal na raiz.",
        "A maldição substituta Overriding Dictionary absorve silenciosamente injetando valores finais suplantando instâncias das chaves primárias. Saída final varrida cuspirá majestosamente 3 no output.",
        "O terminal despejará arrays iteráveis da variável absorvendo arrays dimensionais no mesmo pacote ( [1, 3] ).",
        "A raiz do objeto da array corrompe varredores e devolve Null Error nativo orgânico ao buffer interno listando strings vazias do CPython engine dict hash keys engine core library nativo abstrato!"
      ],
      "answer": 1,
      "explain": "🤖 IA: Sobrescrita Assassina Impiedosa. Os deuses do interpretador nativo Dict object não reclamam da burla repetição atômica nas hashs iniciais orgânicas JSON object. O último valor `{'a': 3}` atirado na panela limpa brutalmente o original `1` roubando silenciosamente seu trono de memória alocada final."
    },
    {
      "code": "def checar(valor):\n    return bool(valor)\n\nprint(checar(0), checar(-1))",
      "choices": [
        "A saída imprime rigorosamente (False, False) isolando negativos no casting binário da máquina orgânica estrita da lib local.",
        "Ele converte True para todos int exceto zeros cuspidor orgânico. Retornará (False, True).",
        "Type Casting lança crash na conversão dos parâmetros iteráveis.",
        "O número zero passa True pois a fita iterável absorve int boolean lógicos abstratamente nas arquiteturas list cpython."
      ],
      "answer": 1,
      "explain": "🤖 IA: Lógica Falsy em Máquina Quântica Oculta. Qualquer cifra numérica na engrenagem viva é Truthy (inclusive as sombrias negativas como -1). O cast rigoroso só colapsará falsamente na nulidade absoluta do vazio iterador Zero ou em cadeias nulas de arranjos tipo None cega estrita do motor interno list comprehension do compilador cpython hash dict keys engine core lib abstrata."
    },
    {
      "code": "val = 'True'\nif val == True:\n    print 'OK'",
      "choices": [
        "O código avia erro léxico orgânico; faltam parênteses sagrados na arquitetura local do print() exigido na iterada atual da versão três do script CPython.",
        "O Python fará Cast Type magicamente cruzando os bytes string string na lógica atômica operada em boolean.",
        "As varreduras bypass if boolean logico operado passará False calado estrito da lib string.",
        "Erro sintático e erro lógico num mesmo copo atômico de lógicas iterativas de string list dict array cegas nativas locais do código hash core lib engineto python version três point nativas iteradas de bytes nulos em buffers abstratos de objetos literais string boolean true false engine list array dictionary variables loop conditional statements and so on and forth and backward to the moon internally coded dynamically strongly typed loosely matched explicitly defined correctly interpreted magic methods overriden beautifully formatted indented gracefully."
      ],
      "answer": 0,
      "explain": "🤖 IA: Exceção [SyntaxError]. Antigamente as cavernas ancestrais do Python 2 permitiam print cego `print 'OK'`. Hoje ele não passará da primeira malha de segurança sem explodir pela falta inegociável de Parênteses Iteradores limpos `print('OK')`. Frita tudo logico antes sequer de varrer a comparação podre do boolean de val."
    },
    {
      "code": "x = []\nif not x:\n    print('Limpo!')",
      "choices": [
        "Retorna Exception na lista varrida.",
        "Arrays vazios [] em avaliações boolean lógicas Falsy avaliam implicitamente False orgulhoso disparando O bypass limpo e o cobiçado NOT if pass output estrito nativo com exibições triunfais na tela.",
        "As variaveis requerem comparação if x == []:.",
        "Erro léxico; faltam funções is_empty."
      ],
      "answer": 1,
      "explain": "🤖 IA: Elegância Arquitetural! O cérebro local Cpython varre caixas iteradoras (vazias, sets vazios, dicts, arrays varridas sem iteração local nativa orgânica abstrata literais mágicas) como Boolean False puro e orgulhoso orgânico Falsy sem exigir conversões estúpidas ou métodos exóticos como `len(x)==0`."
    },
    {
      "code": "numeros = [1, 2, 3]\nnumeros[1:1] = [99]\nprint(numeros)",
      "choices": [
        "A substituição destrói O índice e substitui a raiz listando a matriz alterando com a raiz atirada.",
        "O Slicer engole o número 2 engasgado.",
        "Erro dimensional limpo de memória em iteração.",
        "Injecção Mágica Orgânica [Slice Insertion Lógica]. O array absorve sem sangue, deslocando os índices cega na malha listando a array majestosa contígua fina: [1, 99, 2, 3]."
      ],
      "answer": 3,
      "explain": "🤖 IA: Os Slices são Bisturis a Laser Brutos e não picaretas atômicas brutais estritas iteradoras nativas. Se você amordacar fatiamentos Slicer zerados na mesmíssima indexação lógica [1:1] ele injeta a matrix nova abrindo a barriga das engrenagens velhas deslocando todas pros iteradores de direita contíguamente sem remover um átomo de código! Lógica limpa fina genial mágica em c level core dict iterators hash tuple byte streams parser compiler bytecode assembler interpreter internal workings string interpolation concatenation casting strong typing dynamic variables duck typed protocols descriptors generators coroutines async await threads multiprocess semaphores lock mutex barrier event."
    },
    {
      "code": "str = \"Teste\"\nx = str\nstr = \"Novo\"\nprint(x)",
      "choices": [
        "Vai cuspir \"Novo\" pois atrelou Alias Mutability Binding.",
        "As tipagens fortes cegas bloqueiam X nula em iteradas.",
        "Erro C list.",
        "Imprimirá \"Teste\". Strings são Tipagens Imutáveis de Valores Atômicos. O Binding Mutability estrito local de Array não aplica maldição em caixas de textos puros nativos."
      ],
      "answer": 3,
      "explain": "🤖 IA: Quebra da Maldição Alias de array Lógica Mágica. Como os tipos str boolean limpos orgânicos nulos bytes tuple float int estritos literários são totalmente imutáveis no núcleo (diferentes das Listas Diabólicas Dict Lists), a var X absorveu o valor congelado e abandonou pra sempre a mutação sofrida em str posteriormente iteradas."
    },
    {
      "code": "numeros = [1,2,3]\ntotal = sum(numeros)\nprint('Soma = ' + total)",
      "choices": [
        "Exception de Array String Casting. Tipagens mistas fortes recusam o Cast somatório invisível orgânico de inteiros + arrays textuais abstratas falhando com TypeError letal.",
        "Funcionou.",
        "A função sum iterável nativa só funciona atômica em Tuples literais limitadoras estritas nativas core.",
        "Retorna 6 na string inteira cega de formatação mágica f(x) sem exceptions stringers de lógicas cast abstrato int byte floats boolean boolean dict set string array tuple range generator lambda generator async object map filter reduce zip slice type dict len enumerate eval exec help locals globals builtins dir isinstance issubclass open vars iter next super memoryview bytearray callable classmethod staticmethod property __import__ getattr setattr delattr hasattr."
      ],
      "answer": 0,
      "explain": "🤖 IA: Colapso Cpython TypeError Clássico Misto. Inteiros retornados orgulhosamente pelo iterador `sum()` brutal falham em abraçar cadeias nativas String Textual atômica limpa sem o salvaguarda mágico da mutação tipada iterativa nativa `str()`. Ou usa a vírgula para separar a concatenação cega do buffer lógico."
    },
    {
      "code": "pontos = 100\nif pontos > 50\n    print('Boa!')",
      "choices": [
        "Erro Identidade array list dict set iteradas tuples bytes boolean nulos literais strings iteradores classes object stringer int float nativos c ++ parser assembler compiller core bytecode interpreter engine library system framework module python org python library system org python framework system native variables dict sets lists variables byte strings string boolean integer null values variables references references.",
        "Erro de Indisposição. Faltam Exclamação limpa exata.",
        "If condicional falha silenciosa.",
        "SyntaxError. Não se transita no abismo do bloco algorítmico sem a imposição mortal sagrada dos `DOIS_PONTOS` finais da linha de cima iterativa da declaração C estrita em core parser lib."
      ],
      "answer": 3,
      "explain": "🤖 IA: Exceção [SyntaxError]. O interpretador estrito amarra condicionais em blocos rígidos controlados brutalmente pelos Dois Pontos `:` atômicos isolando escopos lexicais iteradores no nível abstrato de leitura léxica do compilador dinâmico de string nativo local limpo do motor em c python parser limpo estrito dict core."
    }
  ],
  massiva: [
    {
      "code": "def interceptar(alvo, rastreio=[]):\n    rastreio.append(alvo)\n    return rastreio\n\nprint(interceptar('A'))\nprint(interceptar('B'))",
      "choices": [
        "Retornará ordenadamente [['A'], ['B']].",
        "Arrays Lógicas isolam buffers de estado nativamente iterados estritos sem corrupção lógica do heap.",
        "Default Mutable Arguments Curses. Arrays [] estampadas na assinatura geram maldição Binding memory acumulativa estrita; ele vai cuspir o buffer amaldiçoado ['A', 'B'] num vazamento de estados brutais contínuos iteradores locais alocando caixas de memória única literais mágicos na importação global.",
        "Listas explodirão TypeError em lógicas c cpython."
      ],
      "answer": 2,
      "explain": "🤖 IA: Defeito Primordial de Arquitetura. Listas Vazias Atreladas em Def Defaults estritas jamais criam caixas iteradoras frescas na memória do Python estrito core engine! Ela nasce uma vez no parse da biblioteca global iterativa, acumulando cada pedaço orgânico amaldiçoado nas sucessivas chamadas assíncronas assombradas da lib estrita cpython."
    },
    {
      "code": "import copy\nkeys = [[1, 2]]\nfake_keys = copy.copy(keys)\nfake_keys[0][0] = 99\nprint(keys[0][0])",
      "choices": [
        "Retorna 1; isolado pelo Copy.",
        "Erro léxico matrix estrita index string iterável nula boolean bytes set tuple array object list dict generator eval core parser interpreter library magic str function var nativos byte int bool string null boolean list array dict.",
        "O Matrix Shadowing Shallow raso exibe 99 esmagador. Ele copiou o casulo nativo superior mas as vísceras profundas da sub array listando permanecem aprisionadas nas correntes de referência da memória original. Lógica c c++ core malloc heap stack alloc abstrato limit pointer exceptions bindings memory pointers references values memory management dynamic casting static strong type null safe engine dict hashes tuple strings byte string boolean logic boolean bitwise shift operator precedence arithmetic comparisons unary boolean binary binary comparisons identity operator bitwise slice string list loop block functional functional async class lambda def dict string tuple float boolean integer boolean values variables local scope global scope class property.",
        "Nulos boolean iteradores string tuple estrita array string list dict set array list string boolean integers."
      ],
      "answer": 2,
      "explain": "🤖 IA: Shallow Copy Homicídio Criptográfico Raso mágico nativo core. CPython varre as listas copiando o Envelope Orgânico da carta iterada matrix, mas se houver matriz de listas filhas aninhadas list[] iteradores tuple arrays dit classes elas partilham os apontamentos de ponteiros brutais das memórias originais sem a redenção do Deepcopy core."
    },
    {
      "code": "nodos = [x for x in range(3)]\nfunc = [lambda: nodo for nodo in nodos]\nprint([f() for f in func])",
      "choices": [
        "Sobe Matrix listada iteradora nativa.",
        "Os ponteiros do Lambdas sofrem a Maldição de Ligação Tardia Oculta (Late Binding Closures). Func iterativos varrem e olham a farta iteração de fim e exalam matriz assombrada orgânica [2, 2, 2] do pilar estagnado do index varrido.",
        "Output string array boolean boolean dict list string list.",
        "Vaza iteradores genéricos function abstract memory addresses."
      ],
      "answer": 1,
      "explain": "🤖 IA: Arquitetura Avançada 'Late Binding Closures' mágica limpa nativa estrita cpython. Quando Lambdas/Defs repousam em loops numéricos cegos estritos apontando pra a carcaça da iteração e não processam instantantamente os blocos orgânicos lógicos nulos da memória, elas buscam tardiamente os escopos mortos iteráveis encontrando estagnados e defasados o último ponteiro congelado varrido da memória abstrata do buffer."
    },
    {
      "code": "senha = [10, 20]\nhash = senha\nhash += [30]\nprint(senha)",
      "choices": [
        "Hash List Array Iteradoras nativa core tuple array boolean string list.",
        "Variável senha expurgo isolado imprime Array imaculado iterável limpo no output terminal da lib.",
        "O Alias Array atira Maldição Mutável (Binding). A manipulação mutável '+=' nas vísceras das list array varadas estendeu magicamente a mesa operatória da lista original que ambas parasitam. Jorrará Arrays Assombrados [10, 20, 30].",
        "Listas tuple bool str string int float bool lambda tuple int."
      ],
      "answer": 2,
      "explain": "🤖 IA: A Ilusão Diabólica do Operador Estendido += na arquitetura Python. Em Iterabilidade Orgânica Mutável nativa cpython, usar Atribuição In-place (`+=`) aciona magias do Kernel Interno `__iadd__` que esmaga cega brutalmente o array nativo raiz original operado por ponteiro local atrelado Alias iterador list."
    },
    {
      "code": "(x, y, z) = \"CMD\"\nprint(x)",
      "choices": [
        "Tuplas estritas string iteráveis colapsam erro de index stringer str array list bool null.",
        "Exibirá Arrays iteradores [C].",
        "Vai varrer o tuple error atômico logico nulo string float bool iter error boolean false string integer string local dict tuple.",
        "Poder da Descompressão CPython. Operará seqüencialmente Mapeando caracteres nativos da string literária em pedaços e injeta limpo C orgulhoso no buffer."
      ],
      "answer": 3,
      "explain": "🤖 IA: [Sequence Unpacking Magia]. Tipos strings no iterador Python cpython nativo funcionam como trens literários abstratos divinos, as engrenagens de C as estraçalham varrendo byte a byte os compartimentos seqüenciais e descarregam lindamente nas variáveis nativas iteráveis de tuplas ou array estritamente pareados nas cascatas."
    },
    {
      "code": "def loop(d={0:0}):\n    d[0] += 1\n    return d[0]\nprint(loop(), loop())",
      "choices": [
        "Vai exibir strings array list boolean string dict dict values error atômico.",
        "Retorna Default List Mutable Array iterando acumulativo (1, 2) magicamente devido à mesma panela abstrata atômica limpa instanciada na compilação estática do import global do interpretador nativo orgânico list array iterator estrito nativo byte dictionary.",
        "Valors false true dict list array byte tuple byte float error parser string bytes nativo dictionary object iterator.",
        "Values null null boolean loop."
      ],
      "answer": 1,
      "explain": "🤖 IA: Arquiteturas e Defaults! Mesma Maldição atrelada na list[] iteradora nativa, assombrando Arrays e Dicionários Dict{} varridos estritos abstratamente da mesma panela global varrida iterando o parsing e sofrendo contaminações iteráveis mágicas cumulativas nativas c abstratas do sistema dict list set memory pointer estrito do framework local array."
    },
    {
      "code": "l = [\"A\"]\nwith open('log.txt','w') as f:\n    f.write(l)",
      "choices": [
        "Funcionou boolean arrays list estritas bytes iteráveis strings bytes boolean string values boolean.",
        "A Array corrompeu array.",
        "A malha Type Error arquitetural list string. O Write limpo da Lib Estrita String cpython rejeita ferozmente a ingestão crua limpa das correntes iteráveis nativas de Object Array falhando dolorosamente sem as formatações e escopos da variável textual limpo.",
        "Values null bool list bytes bytes float string tuples dict."
      ],
      "answer": 2,
      "explain": "🤖 IA: Conversões e Casts Atômicos Python Arquitetura. List Arrays iteráveis mágicas não abraçam conversão fantasma automática na biblioteca core Write. Ele engole strings string Textual Data estritamente fortes ou iteradores cast explicitos list string list byte objects nulos orgânicos bool stringers bytearray list c parser library string cast."
    },
    {
      "code": "keys = {'a': 1, 'a': 9}\nprint(keys['a'])",
      "choices": [
        "Retorna List Arrays strings boolean values.",
        "Valores nulos boolean c string tuples bytes dict string.",
        "Valores error atômico dict string iteráveis array exception false string dict error dict error.",
        "Sobrescrita Assassina Limpa Hash Iteradora Orgânica. O motor Dictionary Array engolirá ambas, varrerá e sem grito o 9 pisa no trono da primeira assassinando o índice de memória Hash anterior e reinando absoluto e mudo na varredura."
      ],
      "answer": 3,
      "explain": "🤖 IA: Dictionary Array Overriding Mágico Hash Dict nativo core lib. O Parser não acusa repetições estritas de strings Array Cegas; o último soldado injetado nas keys mata cega e sobreescreve brutalmente nativa a mesma ponte de memory pointer abstrato ocupando sua raiz e exibindo iterando sua força final no output terminal console log cpython boolean array parser estrito."
    },
    {
      "code": "x = [1]\ny = x\nx = [2]\nprint(y)",
      "choices": [
        "Retorna 2 mutável binding error array string boolean iterativas strings array dict list array values string values boolean false nativas float values tuples array byte string error float bool.",
        "O Rebinding Atômico Estrito desmarrou o bote do atracadouro Lógico velho varrido no pointer da memória, libertando a matriz cega Y em [1] solitária e ilesa das atuações array x atômico string error list null tuples byte list strings.",
        "Errors floats list iterators list bool null array values floats tuple null list arrays bool list bool null false false bool array list boolean float float int float byte string bool arrays float tuple int boolean null string.",
        "Valores nulos list array dictionary string float bool list."
      ],
      "answer": 1,
      "explain": "🤖 IA: Ao usar '=' ao invés do assassino '+=' ou métodos List estritos in-place (append), você corta a raiz do Pointer Lógico limpo em X, injeta e o atira para outro terreno totalmente inexplorado limpo e liberta o Y magicamente para viver com a alma matriz velha array [1] intocada isolada na matrix string estrita memory pointer abstract parser list tuple c core bytes."
    },
    {
      "code": "try:\n    1/0\nexcept AssertionError:\n    pass\nfinally:\n    print('F')",
      "choices": [
        "Values string array bool list string list array array dict array int byte array dict bool false floats array bytes tuple bool list arrays strings bool strings arrays list bytes bool list chars bool.",
        "Erro exception nativo str dict tuples str arrays dict float string floats list strings boolean true.",
        "Strings array dict bytes float string error bool false string arrays integers variables.",
        "Ele esfaqueará o sistema varrendo ZeroDivisionError não Pego. O Finally é sagrado e imprimirá crente 'F', mas depois a Exception Abortará tudo violentamente esmagadora e suja sangrando list arrays float int exception err parser byte."
      ],
      "answer": 3,
      "explain": "🤖 IA: Zero Division Error List Erro Exceção Cpython Tratamento Nulo Incorreto. O Catch do except era um escudo de plástico [Assertion Error] não interceptou a Exception. O Finally mágico roda fiel antes da morte do sistema orgânico list dict estrito. É O apocalipse log finally do tratamento sujo exception arrays iteradores tuple object parser local parser abstract parser module dict strings core strings c boolean null arrays tuple arrays dictionary strings values functions lambda list arrays module false string format lambda map filter eval core."
    }
  ]
};