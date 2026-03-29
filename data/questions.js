const QUESTIONS_DATA = {
  iniciante: [
    {
      "code": "nome = 'CyberAdmin'\nidade = 22\nprint(nome + idade)",
      "choices": [
        "Variável idade não declarada globalmente.",
        "O operador '+' não soma (TypeError) Inteiro com String sem Cast Explícito.",
        "O nome 'CyberAdmin' estoura o limite de Buffer (Overflow).",
        "A função print() exige parênteses duplos em strings."
      ],
      "answer": 1,
      "explain": "🤖 IA: Exceção [TypeError]. Ao contrário de JS, Python possui Tipagem Forte. O operador '+' concatenar String com String, mas falha ao engolir Inteiros. Você deve aplicar `str(idade)`."
    },
    {
      "code": "while True\n    scan_ports()",
      "choices": [
        "O laço infinito trava o compilador, precisa de um Break.",
        "A indentação dentro do While está usando TABs em vez de espaços.",
        "A sintaxe carece rigorosamente de DOIS:PONTOS (:) ao final da declaração.",
        "True precisa ser escrito com letras minúsculas em CPython."
      ],
      "answer": 2,
      "explain": "🤖 IA: Falha de Sistema [SyntaxError]. Estruturas de controle (if, for, while, def, class) em Python dependem do fechamento da linha declarativa com dois-pontos `:` antes de iniciar um bloco indentado."
    },
    {
      "code": "def invadir():\nprint(\"Firewall derrubado!\")",
      "choices": [
        "A função não tem argumentos (vazia).",
        "Erro Crítico de Indentação (IndentationError) pós-cláusula.",
        "Faltou aspas simples; as aspas duplas são inválidas no print.",
        "O interpretador exige a palavra-chave 'function' em vez de 'def'."
      ],
      "answer": 1,
      "explain": "🤖 IA: [IndentationError]. Python não utiliza chaves `{ }` para englobar comandos. Toda instrução interna pertence à função SE E SOMENTE SE estiver recuada (geralmente 4 espaços)."
    },
    {
      "code": "pontuacao = input(\"Insira os XP: \")\nif pontuacao > 5000:\n    print(\"Hacker Elite\")",
      "choices": [
        "A string do print precisa ser armazenada antes.",
        "A função input() retorna 'String', tornando a comparação matemática ilegal.",
        "Não existe a porta 'input' na biblioteca padrão.",
        "Variáveis sem 'var' ou 'let' travam o comparador estrito."
      ],
      "answer": 1,
      "explain": "🤖 IA: Alarme de Tipagem! A função `input()` nativa varre STDIN e entrega TEXTO ('str'). Comparar texto diretamente contra o número 5000 lança `TypeError`. Você precisa aplicar um cast: `int(input(...))`."
    },
    {
      "code": "servidores = ['Alpha', 'Beta', 'Gama']\nprint(servidores[3])",
      "choices": [
        "A lista tem aspas misturadas no terminal de compilação.",
        "Arrays em Python baseiam-se em índice 1.",
        "A sintaxe para obter arrays é servidores(3).",
        "Índice fora das dimensões do Array (IndexError)."
      ],
      "answer": 3,
      "explain": "🤖 IA: Vazamento de Memória Abortado [IndexError]. Arrays começam contando do zero (0=Alpha, 1=Beta, 2=Gama). Tentar varrer a casa [3] é acessar o abismo do disco."
    },
    {
      "code": "for i in range(5):\nprint(\"Ping \", i)",
      "choices": [
        "Falta um vírgula após 'range(5)'.",
        "O Python não conhece a função 'range' na versão 3.",
        "Bloco de repetição desprovido de recuo (IndentationError).",
        "O 'for' em Python exige uso de 'let i = 0'."
      ],
      "answer": 2,
      "explain": "🤖 IA: Violação de Espaçamento Mínimo. Assim como funções `def`, o comando que está sob um loop `for ...:` precisa nascer um TAB à direita."
    },
    {
      "code": "arquivo = \"payload.exe'\nrun(arquivo)",
      "choices": [
        "String inválida: Incoerência de aspas Duplas e Simples nas bordas.",
        "Arquivos .exe só funcionam via módulo 'os.system()'.",
        "Palavras em minúsculo falham em identificadores globais.",
        "As variáveis precisam predefinir tamanho em bytes."
      ],
      "answer": 0,
      "explain": "🤖 IA: Falha Léxica Crassa (SyntaxError). Você abriu a string com aspas duplas (\") e a fechou com aspas simples ('). O interpretador não entende o fechamento do bloco (EOL)."
    },
    {
      "code": "If is_admin == True:\n    drop_database()",
      "choices": [
        "Drop de database nunca funciona offline.",
        "Operação maliciosa barrada pelo interpretador.",
        "O nome da variável deve usar CamelCase estrito.",
        "Palavras-chave como 'if' e booleanos são Case-Sensitive ('if' minúsculo)."
      ],
      "answer": 3,
      "explain": "🤖 IA: [NameError/Syntax]. 'If' com 'I' maiúsculo é visto como uma variável maluca qualquer, e não uma condição de sistema. As Keywords de controle de fluxo são totalmente minúsculas."
    },
    {
      "code": "pi = 3.14\npi = 3,14\nprint(pi)",
      "choices": [
        "Ele vai imprimir 3.14 flutuante estático.",
        "Vírgula redefine a variável como uma Tupla Numérica `(3, 14)` e não Decimal.",
        "Erro Fatal: Constantes não podem sofrer override em tempo real.",
        "A linha quebra na conversão de string."
      ],
      "answer": 1,
      "explain": "🤖 IA: Estranheza Matemática (Type Mismatch). No ecossistema internacional computacional, separador decimal é PONTO (3.14). Ao digitar VÍRGULA, o Python o tratou como uma coleção de múltiplos valores genérica: uma Tupla!"
    },
    {
      "code": "dano_arma = 1500\nif dano_arma = 1500:\n    print(\"One Shot!\")",
      "choices": [
        "O operador `=` designa um valor (Atribuição, SyntaxError), e não faz a comparação Lógica (==).",
        "A string \"One Shot!\" quebra o escopo global do condicional.",
        "If só aceita valores booleanos literais (True/False).",
        "Comparadores numéricos só funcionam com bibliotecas math."
      ],
      "answer": 0,
      "explain": "🤖 IA: Erro de Identidade Binária. Usa-se `=` para definir o peso na caixa da memória. Para interrogar a memória matemática *(ele é idêntico a?)* exigimos o uso militar do sinal eqüitativo duplo: `==`."
    }
  ],
  logica: [
    {
      "code": "for frame in range(1, 10):\n    renderizar(frame)\n# Exige exatamente 10 frames!",
      "choices": [
        "O range() do Python é exclusivo na ponta; loop morrerá no frame 9.",
        "A renderização pulará ímpares.",
        "Loop infinito! O ponteiro jamais alcançará 10 no compilador lógico.",
        "Faltou encapsular o passo: range(1, 10, 2)."
      ],
      "answer": 0,
      "explain": "🤖 IA: Lógica Estilhaçada. Funções de `range(start, stop)` param ANTES de tocar a parede. Se instruiu range(1, 10), o loop cessará suas operações dolorosamente no número 9."
    },
    {
      "code": "acesso = \"Hacker\"\nif acesso == 'Admin' or 'Hacker':\n    sistema.liberar()",
      "choices": [
        "Strings vazias destroem o verificador OR.",
        "Uma string não vazia ('Hacker') é Truthy. A condição OR cega SEMPRE autorizará a entrada.",
        "O comando exige parênteses: (acesso == 'Admin' or 'Hacker').",
        "Comparação incompatível entre tipos Boolean e Strings."
      ],
      "answer": 1,
      "explain": "🤖 IA: Brecha de Segurança Crítica. Na lógica booleana, você perguntou: `(acesso é 'Admin')` OU `('Hacker' possui texto?)`. O lado direito sempre retorna True. O correto exigiria: `... or acesso == 'Hacker'`."
    },
    {
      "code": "bateria = 100\nif bateria > 50:\n    status = 'Saudável'\nelse if bateria < 20:\n    status = 'Critico!'",
      "choices": [
        "O CPython não entende strings com aspas simples sob escopos complexos.",
        "Você não está cobrindo a lacuna entre 21 e 50.",
        "O interpretador Pythonic não usa 'else if'. Usa-se obrigatoriamente 'elif'.",
        "A variável 'status' não está tipada estaticamente para String!"
      ],
      "answer": 2,
      "explain": "🤖 IA: Falha Estrutural [SyntaxError]. O cérebro em blocos do C, Java e JS entendem 'else if', mas a serpente Python é agressiva por economia de keystrokes: o comando legal aninhado contra-condicional chama-se unicamente `elif`."
    },
    {
      "code": "def processar_pacotes(lista):\n    quadrados = []\n    for n in lista:\n    quadrados.append(n ** 2)\n    return quadrados",
      "choices": [
        "Operador matemático (**) não é de potência.",
        "Colchetes das Arrays causam stack limit.",
        "Falta o comando 'extend()', o append só adiciona strings.",
        "O loop e o bloco de código de adição falham miseravelmente pela falta de Indentação aninhada dentro do 'for'."
      ],
      "answer": 3,
      "explain": "🤖 IA: Camadas de Endereçamento Destruídas [IndentationError]. Tudo atrelado ao loop 'for' precisa de espaço extra relativo ao loop da função principal. Cuidado com o espaço de blocos no design."
    },
    {
      "code": "bits = 8\nwhile bits < 100:\n    enviar_pacote(bits)",
      "choices": [
        "Loop infinito letal; o ponteiro numérico (bits) jamais recebe incremento (+1)!",
        "100 não é uma potência legal de 2 (base binária).",
        "O interpretador proibe variáveis matemáticas sob escopo de loop While.",
        "Excede o limite máximo de iteração restrita do hardware nativo."
      ],
      "answer": 0,
      "explain": "🤖 IA: Congelamento de Núcleos [Infinite Loop]. Você aciona a máquina mas nunca instrui as engrenagens `bits` a avançarem `bits += X` para encontrarem a saída `< 100`. A máquina fritará a rede global."
    },
    {
      "code": "import socket\nimport requests\n\ndef obter_ip():\n    return '192.168.0.1'",
      "choices": [
        "Socket é depreciado do CPython atual.",
        "Obter IPv4 sem SSL lança exceção grave.",
        "Aviso Lógico (Warning): Módulos brutos consumindo memória preciosa e sequer instanciados / não utilizados dentro da arquitetura do script.",
        "Falta retorno dinâmico na thread assíncrona."
      ],
      "answer": 2,
      "explain": "🤖 IA: Lentidão Estrutural (Linters detectam: F401 imported but unused). Você requisita pacotes gigantes pelo sistema ('socket', 'requests') alocando RAM pesada, e seu código ignora solenemente que eles existem."
    },
    {
      "code": "palavra = \"CYBER\"\nmetade = palavra[1:4]\nprint(metade)",
      "choices": [
        "Retorna 'YYY', pois há loop malicioso de repetição.",
        "Fatia retorna 'YBE'; lembre-se: Índices começam em 0 e Slice em Python detém o ponteiro de encerramento do bloco anterior.",
        "Causará KeyError, palavra não é Dicionário de endereçamento.",
        "Fatia retorna 'CYB', por erro de string char array."
      ],
      "answer": 1,
      "explain": "🤖 IA: Dedutibilidade dos Slices Embutidos: O índice [0] é 'C', o índice [1] começa no 'Y'. Ele varre os índices 1, 2 e 3 mas SEMPRE esbarra fechando sua extração antes mesmo de encostar na casa de index 4."
    },
    {
      "code": "caminho_arquivo = \"C:\novos\tarefas.txt\"\nprint(caminho_arquivo)",
      "choices": [
        "Sistemas baseados em Unix falharão no terminal de caminhos absolutos locais.",
        "O interpretador consome `\n` como Nova Linha e `\t` como TAB, desintegrando o endereço.",
        "Não existe a letra drive 'C' virtual validada no compilador.",
        "Path limit excede contagem de chars de byte único."
      ],
      "answer": 1,
      "explain": "🤖 IA: Quebra Lógica de String Escapada. A contrabarra (\\) num texto significa fuga técnica pra injetar comandos invisíveis. O \\n vira [Enter] e \\t um [TAB] horizontal imenso. Adicione `r` no prefixo: `r\"C:\novos...\"` (Raw String) para neutralizar os mísseis!"
    },
    {
      "code": "saldo = \"450.00\"\nif type(saldo) is int:\n    print('Aprovado')",
      "choices": [
        "O type() tem um limite de bytes no parâmetro lógico.",
        "Causará vazamento, pois a classe decimal de 450 é double em C.",
        "O texto \"450.00\" está imerso em The Matrix Strings. Ele nunca vai cair no `is int` pois não é tipagem inteira, e ponto não serve.",
        "Erro sintático: is obrigatoriamente deve ser ==."
      ],
      "answer": 2,
      "explain": "🤖 IA: O motor heurístico acusa: O número possui Aspas (class: str). Pior, mesmo que decodificado com `float(saldo)`, ele jamais passaria no `is int`. O bloco if sempre permanecerá esquecido."
    },
    {
      "code": "chaves = [1, 2, 3]\ndecriptores = [4, 5]\nmaster = chaves.append(decriptores)\nprint(master)",
      "choices": [
        "O interpretador imprime None, pois o `append` modifica os dados in-place e retorna silêncio espectral Vazio.",
        "A impressão resulta de Arrays em colusão [1, 2, 3, 4, 5].",
        "A junção matemática entretece matrizes tridimensionais, quebrando o hardware gráfico.",
        "Erro Lógico, Append não aceita colchetes genéricos como parâmetro atômico."
      ],
      "answer": 0,
      "explain": "🤖 IA: Armadilha Mutável Pythonica Clássica! Funções em coleções puras (como list.append() ou list.sort()) aplicam cirurgia na raiz do bloco e retornam `None`. A variável 'master' foi instanciada contendo uma alma vazia literal."
    }
  ],
  massiva: [
    {
      "code": "def interceptar(alvo, rastreio=[]):\n    rastreio.append(alvo)\n    return rastreio\n\nprint(interceptar('A'))\nprint(interceptar('B'))",
      "choices": [
        "A saída do segundo esquadrão de print jorra um erro Recursivo de Buffer.",
        "O terminal printa: ['A'] e ['B'] ordenadamente em matriz independente limpa.",
        "A lista Default na declaração da função persiste no compilador C. O segundo print retornará ['A', 'B'] num vazamento de estados brutal.",
        "Arrays via parâmetro requerem o uso intenso do cast 'list(alvo)'."
      ],
      "answer": 2,
      "explain": "🤖 IA: Defeito Primordial: Valores Mutáveis Padrão (Default Mutable Arguments). Os escopos list `[]` não cravam uma array nova em cada execução! Eles são mapeados em disco no carregamento único do script e todas as chamadas sofrem assédio cumulativo no mesmo buraco de memória."
    },
    {
      "code": "import copy\nkeys = [[1, 2], [3, 4]]\nfake_keys = copy.copy(keys)\nfake_keys[0][0] = 99\nprint(keys[0][0])",
      "choices": [
        "O valor exibido é 1. O copy isolou a ameaça do endereço local.",
        "Erro de Compilação: Módulo de matriz não importa shallow copies.",
        "O terminal ecoará 99. Shallow Copy vaza as referências aninhadas! Ele copiou uma casca fantasma, mas suas correntes profundas continuam amarradas à fonte.",
        "Python barra atalhos matemáticos sobrepostas com Index Limit."
      ],
      "answer": 2,
      "explain": "🤖 IA: Homicídio Criptográfico (Shallow Copy Shadow Leak). Ferramenta `copy()` copia a estrutura por cima, não o intestino profundo. Listas que injetam listas são varridas pelo mesmo ponteiro amaldiçoado de C. Apenas o salvaguarda `deepcopy()` destrói a amarra dos endereçamentos independentes."
    },
    {
      "code": "nodos_rede = [x for x in range(5)]\nfunc = [lambda: nodo for nodo in nodos_rede]\nprint([f() for f in func])",
      "choices": [
        "Resultará no output exato: [0, 1, 2, 3, 4].",
        "A variável Nodo no Lambda Late Binding aprisiona a maldição do último estado em vez do iterador. A saída real jorra lixo genérico: [4, 4, 4, 4, 4].",
        "Retorna referências brutais abstratas: [<function <lambda> at 0x...>, ...]",
        "Laço de descompressão list comprehesion corrompe CPU com Timeout."
      ],
      "answer": 1,
      "explain": "🤖 IA: Arquitetura Avançada 'Late Binding Closures'. Quando lambdas ou defs vivem num for intróprio apontando para o pivô da iteração (nodo), ninguém varre os cálculos. Na engrenagem da avaliação Tardia (posterior) quando invocadas as lambdas olham a memória exausta e só acham ela fixada no 4."
    },
    {
      "code": "senha = [10, 20, 30]\nhash = senha\nhash += [40]\nprint(senha)",
      "choices": [
        "Variável senha expurgo isolado: Imprime [10, 20, 30].",
        "A variável sofre uma sombra de Mutação (In-Place Binding). A manipulação estendida '+=', alterou o próprio endereço físico matriz que ambas variáveis parasitam. O array senha jorrará [10, 20, 30, 40].",
        "TypeError severo list operando via '=' global.",
        "Símbolo indevido. O correto em hashes é 'add()'."
      ],
      "answer": 1,
      "explain": "🤖 IA: A falácia do += vs =. Em tipos Mutáveis (Lists) em Python, a reatribuição `hash += [40]` na verdade aciona uma chamada ao kernel nativo `__iadd__` que estende as raízes das variáveis já clonadas. `hash = hash + [40]` criaria uma ilha nova, salvando a velha original das chamas."
    },
    {
      "code": "(x, y, z) = \"CMD\"\nprint(x, y, z)",
      "choices": [
        "Destruição Lógica! CPython não desembala chaves de Strings.",
        "O terminal vai cuspir cada String inteira: CMD CMD CMD.",
        "Erro Assíncrono da tupla não definida globalmente no bytecode.",
        "Ele funciona violentamente perfeito: Mapeará o texto espalhando em bytes exatos 'C', 'M', 'D' descompactando os chars iteráveis das tripas da var."
      ],
      "answer": 3,
      "explain": "🤖 IA: Magia Arcana do CPython [Sequence Unpacking]. Strings em Python tratam todos seus corpos como iteráveis vivos. Se mapear lados esquerdo de coletores como tuplas iguais aos buracos da string direita, o motor nativo tritura em arrays limpas alocadas sem for loops extras!"
    },
    {
      "code": "def process_data(d={0: 0}):\n    d[0] += 1\n    return d[0]\n\nfor _ in range(3): process_data()",
      "choices": [
        "Sobe um TypeError por conta de Default em Tipo de Dado dict().",
        "Ele vai jorrar retorno numérico estático: 1 três vezes puras iteradas.",
        "O contador sofrerá engajamento acumulativo: 1, depois 2, depois 3, pois d={0:0} só é instanciado na memória no Parsing da Biblioteca em nível de escopo central.",
        "Erro Sintático. O lambda não está descompactando as instâncias list comprehension iteráveis."
      ],
      "answer": 2,
      "explain": "🤖 IA: Desmoronamento Mutável Revisitado! Todos e quaisquer Dicionários `{}` ou Arrays `[]` plantados na cabeça do argumento (def func(d={})) viram Constantes Globais debaixo do capô da linguagem C compilada. NUNCA DEIXE defaults complexos. Use `def x(d=None)` e mapeie DENTRO."
    },
    {
      "code": "banco_dados = [\"User1\", \"User2\"]\nwith open('backdoor.log', 'w') as f:\n    f.write(banco_dados)",
      "choices": [
        "A execução do Write em CPython apenas aceita matrizes brutais binárias 'WB'.",
        "Python fará cast implícito magicamente (str(banco_dados)) salvando os colchetes com sucesso na trilha textual.",
        "Comando write() apenas suporta objetos de raiz textual String, ele abortará com o terminal gritando TypeError com urgência sistêmica.",
        "A porta .log não possui privilégios sys_admin. Falhará subitamente silenciada."
      ],
      "answer": 2,
      "explain": "🤖 IA: [TypeError Arquitetural]. Listas não se convertem automaticamente por pura boa vontade de salvar seu log. A menos que apliques cast como `.write(str(banco_dados))` ou a iterás, sua missão abortará deixando os arquivos vazios corrompidos no sistema."
    },
    {
      "code": "senhas_vazadas = { 'joao': 1234, 'maria': 5678, 'joao': 9999 }\nprint(senhas_vazadas['joao'])",
      "choices": [
        "O motor Hash do Python colapsa gerando chaves repetidas em falha Dicionário Key Error.",
        "O dicionário salva matriz multidimensional. Irá imprimir [1234, 9999] em uma lista Array encapsulada.",
        "Lógica Overriding Nativa. O dicionário substitui a antiga key calado, exibindo cruelmente a porta sobrescrita: 9999 ao vivo.",
        "A saída retornada será a matriz original nativa de leitura 1234 estritamente cega."
      ],
      "answer": 2,
      "explain": "🤖 IA: Sobrescrita de Hashing Silenciosa. CPython nunca reclama de chaves duplicadas no parseo de JSON e Dicts, as chaves subsequentes apunhalam as antigas esmagando e assumindo impiedosamente os reinos dos slots de memória local de quem tiver o mesmo prefixo."
    },
    {
      "code": "x = [1, 2, 3]\ny = x\nx += [4]\nprint(y)",
      "choices": [
        "Imprime [1, 2, 3]. Operadores em Listas clonam instâncias.",
        "Impreme [1, 2, 3, 4]. Ambas as variáveis atracaram o ponteiro no mesmo objeto nativo do disco alocador (Alias Mutability Binding).",
        "Levanta Exceção. A atribuição X e Y desfigura o array na raiz.",
        "Gera corrupção por erro referencial list."
      ],
      "answer": 1,
      "explain": "🤖 IA: Você achou que estava salvando um Backup ao fazer Y = X? Apenas colocou duas moscas de nome distinto olhando pro exato mesmo copo físico! A destruição mutável (+= 4) operado em quem for varre os espólios afetando os dois simultaneamente. Use `.copy()` no futuro pra proteção."
    },
    {
      "code": "try:\n    val = 10 / 0\nexcept AssertionError:\n    print('Apanhado')\nfinally:\n    print('Fim')",
      "choices": [
        "A saída imprime apenas 'Fim'. Catch nativo bloqueia erros nulos.",
        "O output será 'Apanhado' 'Fim', ignorado falhas assíncronas binárias.",
        "O interpretador imprime em tela esfaqueada 'Apanhado' e jorra falha silenciada.",
        "ZeroDivisionError foi atirado! Ele passa varando pelo except AssertionError despreparado. A rotina morre queimada imprimindo 'Fim', e então encerra sua trilha despejando a Exception na cara do Dev por negligência!"
      ],
      "answer": 3,
      "explain": "🤖 IA: Estratégia Falha no Tratamento de Exceções. Dividir por 0 não gera o pacato `AssertionError`, mas sim uma facada vital nomeada `ZeroDivisionError`. Como o Catch escudo falhou em interceptar o calão letal, o finally sangra e depois entrega a alma abortando o seu processo."
    }
  ]
};