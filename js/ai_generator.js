/**
 * MOTOR DE GERAÇÃO PROCEDURAL OFFLINE (ProceduralAI)
 * Ao invés de perguntas estáticas, esta IA constrói permutações infinitas em tempo real.
 */

const ProceduralAI = {
  // Dicionários para randomização (Hacker Theme)
  dicts: {
    vars_int: ['bytes', 'pacotes', 'ping', 'threads', 'tokens', 'nodes'],
    vars_sys: ['servidor', 'firewall', 'sistema', 'root', 'banco', 'cluster'],
    strings: ['Access Denied', 'Override', 'Exploit Injetado', 'Bypass Ativo', 'Rootkits', 'Payload'],
    numeros: [404, 502, 1337, 8080, 256, 128, 64, 32],
    pequenos: [2, 3, 4, 5, 8, 10]
  },

  getRandom: function(array) {
    return array[Math.floor(Math.random() * array.length)];
  },

  // Templates Matemáticos Dinâmicos
  templates: {
    // ---- Padrões INICIANTES (Forte foco em Erro Sintático e Tipos Básicos) ----
    syntax_while: function(sys, num, str, sm, var_int) {
      return {
        code: `while ${sys} < 100\n    conectar()`,
        choices: [
          `Falta declarar a variável global ${sys}.`,
          `Loop não soma valor nativo +1 em ${sys}.`,
          `A declaração do laço estritamente requer Dois-Pontos (:) no final.`,
          `While deve ser escrito em maiúsculo (WHILE).`
        ],
        answer: 2,
        explain: `🤖 IA: [SyntaxError]. Você omitiu ':' na declaração do loop controlando os ${sys}. Em Python, todo bloco recuado necessita dos 'Dois-Pontos' superiores.`,
        category: 'iniciante'
      };
    },
    typemismatch_concat: function(sys, num, str) {
      return {
        code: `${sys}_id = ${num}\nprint("${str}: " + ${sys}_id)`,
        choices: [
          `A string deve usar crase (\`) para funcionar.`,
          `O operador de concatenação (+) falha ao encostar a String no Inteiro ${num} sem casting de tipo str().`,
          `Faltou encapsular print dentro de aspas numéricas.`,
          `O _id final fere limites léxicos do sistema nativo C.`
        ],
        answer: 1,
        explain: `🤖 IA: Exceção [TypeError]. Tentativa suicida em somar/juntar um Inteiro em uma Array Textual (String). Em Python (Typagem Forte), você devia embrulhar a variável num transformador: str(${sys}_id).`,
        category: 'iniciante'
      };
    },

    // ---- Padrões LÓGICOS (Variáveis Mútuas, Laços e Lógica Relacional) ----
    logic_range: function(sys, num, str, step) {
      const target = step * 10;
      return {
        code: `for carga in range(1, ${target}):\n    inject_payload(carga)\n# Objetivo: Injetar carga exatamente até o pico ${target}!`,
        choices: [
          `O for nativamente falhará por falta do (++) acumulador.`,
          `O loop morre no ${target - 1}. A função range() em CPython exclui rigorosamente o limite extremo. Ele precisava solicitar range(1, ${target + 1}).`,
          `Erro Crasso: Indentação violada silenciosa.`,
          `Range quebrado. O Iterador numérico precisaria de '1.0' ao invés de inteiro primitivo '1'.`
        ],
        answer: 1,
        explain: `🤖 IA: Lógica Estilhaçada Básica. Os blocos em range(start, stop) atritam na barreira e morrem logo ANTES do parâmetro numérico final. Se a injeção mirava ${target}, ela devia ditar parada final no iterável limitador superior (${target +1}).`,
        category: 'logica'
      };
    },
    boolean_or: function(sys, num, hacker) {
      return {
        code: `req = "${sys}"\nif req == 'admin' or "${hacker}":\n    acesso_root()`,
        choices: [
          `Operações com or explodem ValueError sem matriz Array [] orgânica.`,
          `Condicional falsa bypass. Parênteses são obrigatórios em todas as keywords relativas lógicas (if (req == 'x')).`,
          `Não existem strings duplas no bypass Python. O comparador cega a linha no erro iterador lógico.`,
          `Quebra de Firewall! Uma string pura "${hacker}" solta é interpretada como Truthy (Verdadeira). A porta or ignorará a variável req e autorizará o Bypass eternamente.`
        ],
        answer: 3,
        explain: `🤖 IA: Pior Brecha de Lógica. Quando você insere or "Texto", o CPython valida a segunda afirmação como True absoluta (pois ela não é vazia). Você deveria ter checado de fato: or req == "${hacker}".`,
        category: 'logica'
      };
    },

    // ---- Padrões MASSIVAS (Pointer Mutability, Shadow Array e Reference) ----
    mutability_array: function(var_array, val1, val2) {
      return {
        code: `buffer = [${val1}]\n${var_array} = buffer\n${var_array} += [${val2}]\nprint(buffer)`,
        choices: [
          `O sistema jorra a Array original pura imaculada [${val1}]. Variáveis clonadas por '=' não afetam as fontes orgânicas em C.`,
          `Dará TypeError de Array concatenação não aritmética isolada nula strings iteradas floats nativas list boolean string local array.`,
          `Exception. Variável não globalizada varrendo escopo falho corrompido iterador null c bytes array list null value float byte boolean.`,
          `Binding Mutável Letal! Fazer 'Y = X' sobre Listas amarra o ponteiro de Array no mesmo endereço C Malloc originário físico. A mutação operada estendeu as correntes das DUAS caixas e o console vomitará a forma mutada [${val1}, ${val2}].`
        ],
        answer: 3,
        explain: `🤖 IA: Maldição Alias (Binding) de Array C Python. Com classes mutáveis [] dicts Arrays ou Hash Sets {}, igualar variáveis não clona os dados. Coloca dois nomes de variáveis puxando e agredindo cirurgicamente O EXATO MESMO ARQUIVO FÍSICO (Pointer). Use .copy() pra quebrar esse espelho do Mal.`,
        category: 'massiva'
      };
    },
    late_closure: function(sys) {
      return {
        code: `lista = [i for i in range(3)]\nrastreadores = [lambda: nodo for nodo in lista]\nprint([f() for f in rastreadores])`,
        choices: [
          `Ele irá printar impecavelmente o iterado [0, 1, 2] mapeando o loop nativo do ponteiro limpo na função.`,
          `Exibirá apenas Arrays e Endereços Genéricos [Object, Object, Object] abstract memory float nativos variables iterator str.`,
          `Erro arquitetural de compreensões aninhadas em função vazadas array boolean false null loop var c.`,
          `Arquitetura de Assombração Closure (Late Binding). As funções espreitam iteradores sem avaliar instante zero; invocar depois todas olharão o último registro paralisado varrendo e cuspindo a memória trágica estagnada [2, 2, 2].`
        ],
        answer: 3,
        explain: `🤖 IA: Lambdas enclausurados e atrasados nunca processam e carregam as variáveis temporárias durante um For nativo. Quando executadas em massa depois, os ponteiros assombrosos vasculham a memória suja procurando pelo 'nodo' e só encontram ele fixado esgotado em sua varredura derradeira (2).`,
        category: 'massiva'
      };
    }
  },

  // Selecionar Inteligência baseada na taxa de Acertos do jogador
  analisarTarget: function(metrics) {
    if (!metrics || metrics.total === 0) return 'iniciante';
    const acuracia = metrics.correct / metrics.total;
    
    // Se está espancando as perguntas (80% + acerto) = manda pedreira (massiva)
    if (acuracia > 0.8 && metrics.total > 2) return 'massiva';
    // Se sabe razoavelmente = média lógica
    if (acuracia > 0.45 && metrics.total > 2) return 'logica';
    // Se está sendo bombardeado, abaixa o escudo pra ensinar (iniciante)
    return 'iniciante';
  },

  gerar: function(metrics) {
    // Em caso nulo default
    const fallback = { total: 0, correct: 0 };
    const validMetrics = metrics || fallback;
    const categoriaAlvo = this.analisarTarget(validMetrics);
    
    // Filtro pelas templates disponíveis dessa categoria
    let padroesCategoria = [];
    for (let key in this.templates) {
      const tmpl = this.templates[key]('sys', 1, 2, 3, 4); // dry run
      if (tmpl.category === categoriaAlvo) {
        padroesCategoria.push(key);
      }
    }
    
    // Fallback de segurança 
    if (padroesCategoria.length === 0) padroesCategoria = Object.keys(this.templates);
    
    const chaveEscolhida = this.getRandom(padroesCategoria);
    
    // Roll variables na hora pra Injetar
    const sys = this.getRandom(this.dicts.vars_sys);
    const n = this.getRandom(this.dicts.numeros);
    const str = this.getRandom(this.dicts.strings);
    const sm = this.getRandom(this.dicts.pequenos);
    const var_int = this.getRandom(this.dicts.vars_int);

    // Constrói a Lógica Abstrata
    const resultadoBruto = this.templates[chaveEscolhida](sys, n, str, sm, var_int);
    
    return {
      id: Date.now() + Math.random(),
      code: resultadoBruto.code,
      category: '.IA.Procedural[' + categoriaAlvo.toUpperCase() + ']',
      options: resultadoBruto.choices,
      correct: resultadoBruto.answer,
      explain: resultadoBruto.explain
    };
  }
};
