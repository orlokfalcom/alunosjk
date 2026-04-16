/**
 * MOTOR DE GERAÇÃO PROCEDURAL OFFLINE v2 (ProceduralAI)
 * - 15 templates across 3 difficulty tiers (iniciante / logica / massiva)
 * - Anti-repeat: tracks last 5 shown templates, never repeats
 * - Category weights: focus category gets 3x weight vs others
 * - Difficulty adapts based on rolling accuracy window (last 10 answers)
 */

const ProceduralAI = {

  // ── Dictionaries ──────────────────────────────────────────────────
  dicts: {
    vars_int:  ['bytes', 'pacotes', 'ping', 'threads', 'tokens', 'nodes', 'frames', 'bits'],
    vars_sys:  ['servidor', 'firewall', 'sistema', 'root', 'banco', 'cluster', 'proxy', 'daemon'],
    strings:   ['Access Denied', 'Override', 'Exploit Injetado', 'Bypass Ativo', 'Rootkits', 'Payload', 'Malware', 'Cipher'],
    numeros:   [404, 502, 1337, 8080, 256, 128, 64, 32, 200, 403, 500],
    pequenos:  [2, 3, 4, 5, 6, 8],
    ops:       ['+', '-', '*'],
    verbs:     ['conectar', 'injetar', 'processar', 'validar', 'encriptar', 'compilar']
  },

  // Anti-repeat state
  _recentKeys: [],
  _maxRecent: 5,

  getRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
  },

  shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  },

  // Ensures exactly 4 unique options with the correct answer included
  buildOptions(correct, fakes) {
    const pool = [String(correct), ...fakes.map(String)];
    const unique = [...new Set(pool)];
    // Pad if needed
    while (unique.length < 4) unique.push(String(correct + unique.length * 7));
    const selected = this.shuffle(unique).slice(0, 4);
    // Guarantee correct is in
    if (!selected.includes(String(correct))) selected[0] = String(correct);
    return { options: this.shuffle(selected), answerIndex: this.shuffle(selected).indexOf(String(correct)) };
  },

  // ── Templates ─────────────────────────────────────────────────────
  templates: {

    // ════════ INICIANTE ════════

    syntax_colon: function(sys, num, str, sm, verb) {
      return {
        code: `while ${sys} < 100\n    ${verb}()`,
        choices: [
          `Falta declarar ${sys} como variável global.`,
          `Loop não incrementa ${sys} automaticamente.`,
          `Falta dois-pontos (:) no final da linha do while.`,
          `'while' deve ser escrito em maiúsculo.`
        ],
        answer: 2,
        explain: `🤖 [SyntaxError] Todo bloco em Python exige ':' ao final da linha de controle. 'while ${sys} < 100:' seria o correto.`,
        category: 'iniciante'
      };
    },

    type_concat: function(sys, num, str, sm, verb) {
      return {
        code: `port = ${num}\nprint("Porta ativa: " + port)`,
        choices: [
          `print() aceita qualquer tipo sem conversão.`,
          `TypeError: não se pode concatenar str + int sem str(). Correto: str(port).`,
          `Aspas duplas são inválidas neste contexto.`,
          `port deve ser declarado como string desde o início.`
        ],
        answer: 1,
        explain: `🤖 [TypeError] Python tem tipagem forte. 'str + int' lança TypeError. A solução é envolver o inteiro: str(port) ou usar f-string: f"Porta ativa: {port}".`,
        category: 'iniciante'
      };
    },

    indent_error: function(sys, num, str, sm, verb) {
      return {
        code: `def ${verb}_sistema():\nprint("${str}")`,
        choices: [
          `A função está correta — print pode ficar fora.`,
          `def precisa de dois-pontos duplos (::).`,
          `IndentationError: o corpo da função deve ser recuado com 4 espaços.`,
          `print() não pode ser usado dentro de funções.`
        ],
        answer: 2,
        explain: `🤖 [IndentationError] Em Python, o corpo de funções, loops e condicionais DEVE ser indentado. Sem o recuo, o interpretador rejeita o código.`,
        category: 'iniciante'
      };
    },

    undefined_var: function(sys, num, str, sm, verb) {
      return {
        code: `if status == "ativo":\n    ${verb}(${sys})\nstatus = "ativo"`,
        choices: [
          `Python lê todo o arquivo antes de executar, então funciona.`,
          `NameError: 'status' é referenciada antes de ser definida.`,
          `O if precisa de parênteses: if (status == "ativo").`,
          `${verb}() precisa ser importada antes do uso.`
        ],
        answer: 1,
        explain: `🤖 [NameError] Python é interpretado de cima pra baixo. Referenciar 'status' antes de atribuí-la lança NameError. Declare a variável antes do if.`,
        category: 'iniciante'
      };
    },

    // ════════ LÓGICA ════════

    range_off: function(sys, num, str, sm, verb) {
      const target = sm * 10;
      return {
        code: `for carga in range(1, ${target}):\n    ${verb}(carga)\n# Meta: processar até o pico ${target}`,
        choices: [
          `range() inclui ambos os limites — funciona perfeitamente.`,
          `O loop para em ${target - 1}. range(stop) exclui o limite superior. Use range(1, ${target + 1}).`,
          `Falta o passo: range(1, ${target}, 1) para funcionar.`,
          `range() não aceita dois argumentos.`
        ],
        answer: 1,
        explain: `🤖 [Off-by-one] range(start, stop) vai até stop-1. Para incluir ${target}, use range(1, ${target + 1}).`,
        category: 'logica'
      };
    },

    truthy_string: function(sys, num, str, sm, verb) {
      return {
        code: `req = "${sys}"\nif req == 'admin' or "${str}":\n    acesso_root()`,
        choices: [
          `or precisa de parênteses extras para funcionar.`,
          `req não pode ser comparada a strings literais.`,
          `'${str}', sendo uma string não-vazia, é sempre Truthy — a condição nunca falha.`,
          `acesso_root() precisa receber req como argumento.`
        ],
        answer: 2,
        explain: `🤖 [Logic Bug] Strings não-vazias são Truthy em Python. 'or "${str}"' torna a condição SEMPRE verdadeira. Use: or req == "${str}".`,
        category: 'logica'
      };
    },

    none_is: function(sys, num, str, sm, verb) {
      return {
        code: `resultado = None\nif resultado == None:\n    ${verb}("${str}")`,
        choices: [
          `== None funciona perfeitamente neste caso.`,
          `None deve ser importado do módulo builtins.`,
          `Comparar com '== None' viola PEP8. Use 'is None' para singletons.`,
          `None não pode ser usado em condicionais diretamente.`
        ],
        answer: 2,
        explain: `🤖 [PEP8 / Best Practice] Para singletons (None, True, False), use 'is' e não '=='. Objetos com __eq__ customizado podem enganar o '=='.`,
        category: 'logica'
      };
    },

    index_bounds: function(sys, num, str, sm, verb) {
      const size = sm + 2;
      const items = Array.from({length: size}, (_, i) => (i + 1) * 10).join(', ');
      return {
        code: `dados = [${items}]\nprint(dados[${size}])`,
        choices: [
          `Python retorna None para índices fora do limite.`,
          `IndexError: índice ${size} está fora do alcance. Válidos: 0 a ${size - 1}.`,
          `Precisa converter dados para tuple antes de acessar.`,
          `int() é necessário para índices numéricos literais.`
        ],
        answer: 1,
        explain: `🤖 [IndexError] Lista com ${size} elementos → índices válidos: 0 a ${size - 1}. Acesso a [${size}] ultrapassa o limite.`,
        category: 'logica'
      };
    },

    dict_missing_key: function(sys, num, str, sm, verb) {
      const key = str.toLowerCase().replace(/ /g, '_');
      return {
        code: `config = {"host": "${sys}", "port": ${num}}\nprint(config["${key}"])`,
        choices: [
          `Dicionários retornam None para chaves inexistentes.`,
          `KeyError: '${key}' não existe. Use config.get('${key}') para acesso seguro.`,
          `Colchetes duplos [[]] são necessários para strings.`,
          `dict precisa ser convertido com dict() antes do acesso.`
        ],
        answer: 1,
        explain: `🤖 [KeyError] A chave '${key}' não existe em config. config.get('${key}', default) retorna um fallback em vez de estourar.`,
        category: 'logica'
      };
    },

    mutable_default: function(sys, num, str, sm, verb) {
      return {
        code: `def adicionar_log(msg, logs=[]):\n    logs.append(msg)\n    return logs\n\nprint(adicionar_log("${str}"))`,
        choices: [
          `Funciona perfeitamente — lista vazia é um padrão seguro.`,
          `Erro: append() não existe para listas Python.`,
          `Bug sutil: listas mutáveis como default são criadas UMA vez — acumulam entre chamadas.`,
          `def não aceita valores default para parâmetros.`
        ],
        answer: 2,
        explain: `🤖 [Mutable Default Arg] Listas como default são compartilhadas entre chamadas. Sempre use None: def f(logs=None): logs = logs or [].`,
        category: 'logica'
      };
    },

    // ════════ MASSIVA ════════

    alias_mutation: function(sys, num, str, sm, verb) {
      return {
        code: `buffer = [${num}]\n${sys} = buffer\n${sys} += [${num + 1}]\nprint(buffer)`,
        choices: [
          `Imprime [${num}] — cópia isolada não afeta o original.`,
          `TypeError: listas não suportam +=.`,
          `NameError: ${sys} não foi declarado.`,
          `Imprime [${num}, ${num + 1}] — '= lista' cria alias, não cópia. Ambas apontam para o mesmo objeto.`
        ],
        answer: 3,
        explain: `🤖 [Alias/Binding] 'y = x' em listas NÃO clona — compartilha a referência. Mutações em ${sys} afetam buffer. Use buffer.copy() ou list(buffer) para isolar.`,
        category: 'massiva'
      };
    },

    late_closure: function(sys, num, str, sm, verb) {
      return {
        code: `fns = [lambda: x for x in range(3)]\nprint([f() for f in fns])`,
        choices: [
          `Imprime [0, 1, 2] — cada lambda captura seu x no momento da criação.`,
          `Imprime [Object, Object, Object] — lambdas retornam referências.`,
          `SyntaxError: lambda não pode ser usado em list comprehension.`,
          `Imprime [2, 2, 2] — Late Binding: todas as lambdas leem 'x' no momento da chamada, que já é 2.`
        ],
        answer: 3,
        explain: `🤖 [Late Binding Closure] Lambdas capturam a variável 'x', não o valor. Quando chamadas, x já é 2. Solução: lambda x=x: x para capturar o valor imediatamente.`,
        category: 'massiva'
      };
    },

    generator_exhausted: function(sys, num, str, sm, verb) {
      return {
        code: `gen = (x * ${sm} for x in range(${sm + 2}))\nlist(gen)\nprint(list(gen))`,
        choices: [
          `Imprime a lista completa — geradores reiniciam automaticamente.`,
          `Imprime [] — generators são exauridos após uma iteração completa.`,
          `TypeError: generator não pode ser convertido duas vezes.`,
          `Imprime None — list() em generator retorna None.`
        ],
        answer: 1,
        explain: `🤖 [Generator Exhaustion] Generators são consumidos ao serem iterados. Após list(gen), o gerador está vazio — list(gen) retorna []. Use list() uma única vez ou recrie o generator.`,
        category: 'massiva'
      };
    },

    shallow_copy: function(sys, num, str, sm, verb) {
      return {
        code: `import copy\norig = [[${num}, ${num+1}], [${num+2}]]\nclone = copy.copy(orig)\nclone[0].append(${num+3})\nprint(orig[0])`,
        choices: [
          `Imprime [${num}, ${num+1}] — copy.copy() isola completamente os dados.`,
          `Imprime [${num}, ${num+1}, ${num+3}] — copy.copy() é shallow: copia a lista mas não os objetos internos.`,
          `NameError: copy não está disponível neste escopo.`,
          `Imprime [] — cópias não compartilham referências.`
        ],
        answer: 1,
        explain: `🤖 [Shallow Copy] copy.copy() copia a estrutura, mas os objetos aninhados ainda são compartilhados. Para isolamento total use copy.deepcopy().`,
        category: 'massiva'
      };
    },

    walrus_scope: function(sys, num, str, sm, verb) {
      return {
        code: `dados = [${num}, ${num*2}, ${num*3}]\nif total := sum(dados):\n    print(f"Total: {total}")\nprint(total)`,
        choices: [
          `SyntaxError — ':=' não é válido em Python.`,
          `NameError — 'total' não existe fora do if.`,
          `Funciona corretamente. ':=' (walrus) define 'total' no escopo do bloco que o contém.`,
          `Imprime None pois total fica preso no escopo do if.`
        ],
        answer: 2,
        explain: `🤖 [Walrus Operator] ':=' (operador morsa) atribui E retorna o valor. A variável 'total' fica disponível no escopo externo — não só dentro do if. Código válido desde Python 3.8.`,
        category: 'massiva'
      };
    }
  },

  // ── Cached category list (built once) ────────────────────────────
  _categoryMap: null,
  _buildCategoryMap() {
    if (this._categoryMap) return;
    this._categoryMap = {};
    for (const key in this.templates) {
      const tmpl = this.templates[key]('sys', 1, 'str', 3, 'ver');
      const cat = tmpl.category;
      if (!this._categoryMap[cat]) this._categoryMap[cat] = [];
      this._categoryMap[cat].push(key);
    }
  },

  // ── AI Target Selection ───────────────────────────────────────────
  // Rolling accuracy based on last 10 questions in current session
  analisarTarget(metrics) {
    if (!metrics || metrics.total === 0) return 'iniciante';
    const acuracia = metrics.correct / metrics.total;
    const volume   = metrics.total;

    if (volume < 3)              return 'iniciante';          // warm-up
    if (acuracia >= 0.80)        return 'massiva';            // crushing it
    if (acuracia >= 0.50)        return 'logica';             // solid
    if (acuracia < 0.30 && volume >= 5) return 'iniciante';  // struggling — ease off
    return 'logica';
  },

  // ── Main Generation Function ──────────────────────────────────────
  gerar(metrics, focusCategory = null) {
    this._buildCategoryMap();

    const fallback = { total: 0, correct: 0 };
    const m = metrics || fallback;
    const targetCat = focusCategory || this.analisarTarget(m);

    // Weighted pool: focus category gets 3× weight
    let pool = [];
    for (const cat in this._categoryMap) {
      const weight = cat === targetCat ? 3 : 1;
      for (let i = 0; i < weight; i++) {
        pool.push(...this._categoryMap[cat]);
      }
    }

    // Remove recently shown templates (anti-repeat)
    const eligible = pool.filter(k => !this._recentKeys.includes(k));
    const finalPool = eligible.length > 0 ? eligible : pool; // reset if all exhausted

    const chosen = this.getRandom(finalPool);

    // Track anti-repeat
    this._recentKeys.push(chosen);
    if (this._recentKeys.length > this._maxRecent) this._recentKeys.shift();

    // Roll variables
    const sys    = this.getRandom(this.dicts.vars_sys);
    const n      = this.getRandom(this.dicts.numeros);
    const str    = this.getRandom(this.dicts.strings);
    const sm     = this.getRandom(this.dicts.pequenos);
    const verb   = this.getRandom(this.dicts.verbs);

    const raw = this.templates[chosen](sys, n, str, sm, verb);

    // Determine actual category (may differ from target due to weighted pool)
    const actualCat = raw.category;

    return {
      id:       Date.now() + Math.random(),
      code:     raw.code,
      category: `.IA.Procedural[${actualCat.toUpperCase()}]`,
      options:  raw.choices,
      correct:  raw.answer,
      explain:  raw.explain,
      template: chosen,           // for debugging
      aiTarget: targetCat
    };
  }
};
