#!/usr/bin/env node
/**
 * Data Science & Education Search Engine (Node.js Edition)
 * Motor de Busca integrado para pesquisas em Ciência de Dados e Educação
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const readline = require('readline');

// ============================================================
// CONFIGURAÇÕES
// ============================================================
const CONFIG = {
    cacheEnabled: true,
    cacheTtl: 3600, // 1 hora
    maxResultsPerSource: 20,
    requestTimeout: 10000, // 10 segundos
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
};

// ============================================================
// SISTEMA DE CACHE LOCAL (JSON)
// ============================================================
const CACHE_FILE = path.join(__dirname, 'search_cache.json');
let cache = {};

function loadCache() {
    try {
        if (fs.existsSync(CACHE_FILE)) {
            const data = fs.readFileSync(CACHE_FILE, 'utf8');
            cache = JSON.parse(data);
            // Limpar itens expirados
            const now = Date.now() / 1000;
            for (const key in cache) {
                if (now - cache[key].timestamp > CONFIG.cacheTtl) {
                    delete cache[key];
                }
            }
        }
    } catch (e) {
        cache = {};
    }
}

function saveCache() {
    try {
        fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf8');
    } catch (e) {}
}

function cacheGet(key) {
    if (!CONFIG.cacheEnabled) return null;
    const item = cache[key];
    if (item) {
        const now = Date.now() / 1000;
        if (now - item.timestamp < CONFIG.cacheTtl) {
            return item.data;
        } else {
            delete cache[key];
            saveCache();
        }
    }
    return null;
}

function cacheSet(key, data) {
    if (!CONFIG.cacheEnabled) return;
    cache[key] = {
        data,
        timestamp: Date.now() / 1000
    };
    saveCache();
}

// ============================================================
// AUXILIARES DE REQUISIÇÃO E PARSING
// ============================================================
function request(url, options = {}) {
    return new Promise((resolve, reject) => {
        const urlObj = new URL(url);
        const headers = {
            'User-Agent': CONFIG.userAgent,
            ...(options.headers || {})
        };
        const client = urlObj.protocol === 'https:' ? https : http;
        
        const req = client.get(url, { headers, timeout: CONFIG.requestTimeout }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                resolve({
                    status: res.statusCode,
                    headers: res.headers,
                    text: () => Promise.resolve(data),
                    json: () => Promise.resolve(JSON.parse(data))
                });
            });
        });
        
        req.on('error', err => reject(err));
        req.on('timeout', () => {
            req.destroy();
            reject(new Error('Request timeout'));
        });
    });
}

function decodeHtmlEntities(str) {
    if (!str) return '';
    return str
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#x27;/g, "'")
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

// ============================================================
// FONTES DE BUSCA (MOTORES)
// ============================================================

class DuckDuckGoSearch {
    async search(query) {
        const cacheKey = `ddg:${query.toLowerCase().trim()}`;
        const cached = cacheGet(cacheKey);
        if (cached) return cached;

        const results = [];
        try {
            const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
            const resp = await request(url);
            const html = await resp.text();
            
            const resultBlocks = html.split('<div class="links_main');
            for (let i = 1; i < resultBlocks.length; i++) {
                if (results.length >= CONFIG.maxResultsPerSource) break;
                const block = resultBlocks[i];
                
                const aMatch = block.match(/<a class="result__a"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/);
                const snippetMatch = block.match(/<a class="result__snippet"[^>]*>([\s\S]*?)<\/a>/);
                
                if (aMatch) {
                    let rUrl = aMatch[1];
                    let title = aMatch[2].replace(/<[^>]+>/g, '').trim();
                    let snippet = snippetMatch ? snippetMatch[1].replace(/<[^>]+>/g, '').trim() : '';
                    
                    title = decodeHtmlEntities(title);
                    snippet = decodeHtmlEntities(snippet);
                    
                    if (rUrl.includes('uddg=')) {
                        try {
                            const u = new URL('https://ddg.com' + rUrl);
                            const uddg = u.searchParams.get('uddg');
                            if (uddg) rUrl = uddg;
                        } catch (e) {}
                    }
                    
                    if (rUrl && title) {
                        results.push({
                            title,
                            url: rUrl,
                            snippet,
                            source: 'DuckDuckGo',
                            relevance_score: 0.0,
                            content_type: '',
                            timestamp: Date.now() / 1000
                        });
                    }
                }
            }
            
            cacheSet(cacheKey, results);
        } catch (e) {
            console.error(`[DuckDuckGo] Erro: ${e.message}`);
        }
        return results;
    }
}

class DataScienceAPISearch {
    async search(query) {
        const apis = {
            arxiv: `http://export.arxiv.org/api/query?search_query=all:${encodeURIComponent(query)}&start=0&max_results=${CONFIG.maxResultsPerSource}`,
            crossref: `https://api.crossref.org/works?query=${encodeURIComponent(query)}&rows=${CONFIG.maxResultsPerSource}`,
            openalex: `https://api.openalex.org/works?search=${encodeURIComponent(query)}&per_page=${CONFIG.maxResultsPerSource}`
        };

        const results = [];

        const searchAPI = async (name, url) => {
            const cacheKey = `${name}:${query.toLowerCase().trim()}`;
            const cached = cacheGet(cacheKey);
            if (cached) return cached;

            const apiResults = [];
            try {
                const resp = await request(url);
                
                if (resp.status === 200) {
                    if (name === 'arxiv') {
                        const xml = await resp.text();
                        const entries = xml.split('<entry>');
                        for (let i = 1; i < entries.length; i++) {
                            const entry = entries[i].split('</entry>')[0];
                            const titleMatch = entry.match(/<title>([\s\S]*?)<\/title>/);
                            const summaryMatch = entry.match(/<summary>([\s\S]*?)<\/summary>/);
                            const idMatch = entry.match(/<id>([\s\S]*?)<\/id>/);
                            
                            if (titleMatch && idMatch) {
                                const title = decodeHtmlEntities(titleMatch[1].replace(/<[^>]+>/g, ''));
                                const snippet = summaryMatch ? decodeHtmlEntities(summaryMatch[1].replace(/<[^>]+>/g, '')).substring(0, 300) : '';
                                const rUrl = idMatch[1].trim();
                                apiResults.push({
                                    title,
                                    url: rUrl,
                                    snippet,
                                    source: `arXiv (${name})`,
                                    relevance_score: 0.0,
                                    content_type: 'paper',
                                    timestamp: Date.now() / 1000
                                });
                            }
                        }
                    } else if (name === 'crossref') {
                        const data = await resp.json();
                        const items = data.message?.items || [];
                        for (const item of items) {
                            const title = item.title?.[0] || '';
                            const rUrl = item.URL || '';
                            const abstract = item.abstract || '';
                            if (title && rUrl) {
                                apiResults.push({
                                    title: decodeHtmlEntities(title),
                                    url: rUrl,
                                    snippet: decodeHtmlEntities(abstract.replace(/<[^>]+>/g, '')).substring(0, 300),
                                    source: `CrossRef (${name})`,
                                    relevance_score: 0.0,
                                    content_type: 'paper',
                                    timestamp: Date.now() / 1000
                                });
                            }
                        }
                    } else if (name === 'openalex') {
                        const data = await resp.json();
                        const items = data.results || [];
                        for (const item of items) {
                            const title = item.title || '';
                            const rUrl = item.id || '';
                            const abstract = item.abstract_inverted_index || {};
                            const abstractText = Object.keys(abstract).join(' ').substring(0, 300);
                            if (title && rUrl) {
                                apiResults.push({
                                    title: decodeHtmlEntities(title),
                                    url: rUrl,
                                    snippet: decodeHtmlEntities(abstractText),
                                    source: `OpenAlex (${name})`,
                                    relevance_score: 0.0,
                                    content_type: 'paper',
                                    timestamp: Date.now() / 1000
                                });
                            }
                        }
                    }
                }
                
                cacheSet(cacheKey, apiResults);
            } catch (e) {
                console.error(`[${name}] Erro: ${e.message}`);
            }
            return apiResults;
        };

        const promises = Object.entries(apis).map(([name, url]) => searchAPI(name, url));
        const apiResponses = await Promise.all(promises);
        for (const res of apiResponses) {
            results.push(...res);
        }
        return results;
    }
}

class EducationalPlatformSearch {
    constructor() {
        this.platforms = ['Coursera', 'edX', 'Kaggle', 'DataCamp', 'Fast.ai'];
    }

    async search(query) {
        // Usamos busca inteligente via DuckDuckGo com site filter para máxima estabilidade e imunidade a bloqueios
        const results = [];
        
        const searchPlatform = async (platformName) => {
            const cacheKey = `${platformName.toLowerCase()}:${query.toLowerCase().trim()}`;
            const cached = cacheGet(cacheKey);
            if (cached) return cached;

            const platformResults = [];
            try {
                const siteQuery = `site:${platformName.toLowerCase()}.org ${query}`;
                const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(siteQuery)}`;
                const resp = await request(url);
                const html = await resp.text();
                
                const resultBlocks = html.split('<div class="links_main');
                for (let i = 1; i < resultBlocks.length; i++) {
                    if (platformResults.length >= 5) break; // limite leve por plataforma
                    const block = resultBlocks[i];
                    
                    const aMatch = block.match(/<a class="result__a"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/);
                    const snippetMatch = block.match(/<a class="result__snippet"[^>]*>([\s\S]*?)<\/a>/);
                    
                    if (aMatch) {
                        let rUrl = aMatch[1];
                        let title = aMatch[2].replace(/<[^>]+>/g, '').trim();
                        let snippet = snippetMatch ? snippetMatch[1].replace(/<[^>]+>/g, '').trim() : '';
                        
                        title = decodeHtmlEntities(title);
                        snippet = decodeHtmlEntities(snippet);
                        
                        if (rUrl.includes('uddg=')) {
                            try {
                                const u = new URL('https://ddg.com' + rUrl);
                                const uddg = u.searchParams.get('uddg');
                                if (uddg) rUrl = uddg;
                            } catch (e) {}
                        }
                        
                        if (rUrl && title) {
                            platformResults.push({
                                title,
                                url: rUrl,
                                snippet,
                                source: platformName,
                                relevance_score: 0.0,
                                content_type: 'course',
                                timestamp: Date.now() / 1000
                            });
                        }
                    }
                }
                cacheSet(cacheKey, platformResults);
            } catch (e) {
                console.error(`[${platformName}] Erro: ${e.message}`);
            }
            return platformResults;
        };

        const promises = this.platforms.map(p => searchPlatform(p));
        const platformResponses = await Promise.all(promises);
        for (const res of platformResponses) {
            results.push(...res);
        }
        return results;
    }
}

class GitHubCodeSearch {
    constructor() {
        this.sources = [
            { name: 'GitHub', domain: 'github.com' },
            { name: 'Google Dataset', domain: 'datasetsearch.research.google.com' },
            { name: 'PapersWithCode', domain: 'paperswithcode.com' }
        ];
    }

    async search(query) {
        const results = [];

        const searchSource = async (source) => {
            const cacheKey = `${source.name.toLowerCase()}:${query.toLowerCase().trim()}`;
            const cached = cacheGet(cacheKey);
            if (cached) return cached;

            const sourceResults = [];
            try {
                const siteQuery = `site:${source.domain} ${query}`;
                const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(siteQuery)}`;
                const resp = await request(url);
                const html = await resp.text();
                
                const resultBlocks = html.split('<div class="links_main');
                for (let i = 1; i < resultBlocks.length; i++) {
                    if (sourceResults.length >= 5) break;
                    const block = resultBlocks[i];
                    
                    const aMatch = block.match(/<a class="result__a"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/);
                    const snippetMatch = block.match(/<a class="result__snippet"[^>]*>([\s\S]*?)<\/a>/);
                    
                    if (aMatch) {
                        let rUrl = aMatch[1];
                        let title = aMatch[2].replace(/<[^>]+>/g, '').trim();
                        let snippet = snippetMatch ? snippetMatch[1].replace(/<[^>]+>/g, '').trim() : '';
                        
                        title = decodeHtmlEntities(title);
                        snippet = decodeHtmlEntities(snippet);
                        
                        if (rUrl.includes('uddg=')) {
                            try {
                                const u = new URL('https://ddg.com' + rUrl);
                                const uddg = u.searchParams.get('uddg');
                                if (uddg) rUrl = uddg;
                            } catch (e) {}
                        }
                        
                        if (rUrl && title) {
                            sourceResults.push({
                                title,
                                url: rUrl,
                                snippet,
                                source: source.name,
                                relevance_score: 0.0,
                                content_type: source.name === 'GitHub' ? 'repository' : 'dataset',
                                timestamp: Date.now() / 1000
                            });
                        }
                    }
                }
                cacheSet(cacheKey, sourceResults);
            } catch (e) {
                console.error(`[${source.name}] Erro: ${e.message}`);
            }
            return sourceResults;
        };

        const promises = this.sources.map(s => searchSource(s));
        const sourceResponses = await Promise.all(promises);
        for (const res of sourceResponses) {
            results.push(...res);
        }
        return results;
    }
}

// ============================================================
// MOTOR DE BUSCA PRINCIPAL
// ============================================================

class DataScienceSearchEngine {
    constructor() {
        this.engines = [
            new DuckDuckGoSearch(),
            new DataScienceAPISearch(),
            new EducationalPlatformSearch(),
            new GitHubCodeSearch()
        ];
    }

    expandQuery(query) {
        // Expandir contextos
        const expanded = [
            query,
            `${query} data science`,
            `${query} machine learning`,
            `${query} statistics data analysis`,
            `${query} course tutorial`,
            `${query} learning`,
            `${query} lecture workshop`
        ];

        // Identificar tópicos automaticamente
        const queryLower = query.toLowerCase();
        let detectedContentType = '';
        if (/(course|class|tutorial|lecture)/i.test(queryLower)) detectedContentType = 'course';
        else if (/(paper|article|publication|research)/i.test(queryLower)) detectedContentType = 'paper';
        else if (/(dataset|data|csv|json)/i.test(queryLower)) detectedContentType = 'dataset';
        else if (/(code|github|repository|implementation)/i.test(queryLower)) detectedContentType = 'code';

        return {
            rawQuery: query,
            expandedQueries: expanded,
            contentType: detectedContentType
        };
    }

    rankResults(results, sq) {
        const queryWords = new Set(sq.rawQuery.toLowerCase().split(/\s+/));
        
        for (const result of results) {
            let score = 0.0;
            const titleLower = result.title.toLowerCase();
            const snippetLower = result.snippet.toLowerCase();
            
            // 1. Keywords match
            for (const word of queryWords) {
                if (titleLower.includes(word)) score += 3.0;
                if (snippetLower.includes(word)) score += 1.5;
            }
            
            // 2. Edu source bonus
            const eduSources = new Set(['arXiv', 'CrossRef', 'OpenAlex', 'Coursera', 'edX', 'DataCamp', 'Kaggle']);
            if (eduSources.has(result.source)) score += 2.0;
            
            // 3. Content type matching bonus
            if (result.content_type && result.content_type === sq.contentType) score += 2.5;
            
            // 4. URL length penalty
            if (result.url.length > 150) score -= 0.5;
            
            // 5. Trusted domains bonus
            const trustedDomains = [
                '.edu', 'github.com', 'kaggle.com', 'arxiv.org',
                'coursera.org', 'edx.org', 'datacamp.com', 'kdnuggets.com',
                'towardsdatascience.com', 'analyticsvidhya.com'
            ];
            for (const domain of trustedDomains) {
                if (result.url.toLowerCase().includes(domain)) {
                    score += 1.0;
                    break;
                }
            }
            
            result.relevance_score = score;
        }

        // Ordenar decrescente
        return results.sort((a, b) => b.relevance_score - a.relevance_score);
    }

    async search(rawQuery, topK = 20) {
        const sq = this.expandQuery(rawQuery);
        const allResults = [];
        
        console.log(`\n============================================================`);
        console.log(`🔍 BUSCANDO: '${rawQuery}'`);
        console.log(`   Consultas expandidas: ${sq.expandedQueries.length} variações`);
        console.log(`   Fontes: ${this.engines.length} motores de busca`);
        console.log(`============================================================\n`);

        // Executa busca em paralelo em todos os motores
        const searchPromises = [];
        for (const expandedQ of sq.expandedQueries.slice(0, 3)) { // Limitamos a 3 expansões para melhor performance
            for (const engine of this.engines) {
                searchPromises.push(engine.search(expandedQ));
            }
        }

        const responses = await Promise.all(searchPromises);
        for (const res of responses) {
            allResults.push(...res);
        }

        // Remover duplicatas por URL
        const seenUrls = new Set();
        const uniqueResults = [];
        for (const r of allResults) {
            if (r.url && !seenUrls.has(r.url)) {
                seenUrls.add(r.url);
                uniqueResults.push(r);
            }
        }

        console.log(`\n📊 Total de resultados únicos: ${uniqueResults.length}`);

        // Rank
        const ranked = this.rankResults(uniqueResults, sq);
        return ranked.slice(0, topK);
    }
}

// ============================================================
// CLASSIFICADOR NLP LEVE
// ============================================================
class QueryClassifier {
    static classify(query) {
        const q = query.toLowerCase();
        
        const isDataScience = /(data science|machine learning|deep learning|statistics|neural network|data mining|big data|data analysis|python|pandas|numpy|scikit-learn|tensorflow|pytorch|regression|classification|clustering)/i.test(q);
        const isEducation = /(course|class|tutorial|lecture|lesson|learn|study|teach|education|training|workshop|bootcamp|certification|degree|assignment|exam)/i.test(q);
        
        let domain = 'general';
        if (isDataScience) domain = 'data_science';
        else if (isEducation) domain = 'education';

        const contentTypes = [];
        if (/(video|youtube|watch|screencast)/i.test(q)) contentTypes.push('video');
        if (/(book|textbook|pdf|ebook)/i.test(q)) contentTypes.push('book');
        if (/(paper|article|publication|journal)/i.test(q)) contentTypes.push('paper');
        if (/(dataset|data|csv|json)/i.test(q)) contentTypes.push('dataset');
        if (/(code|implementation|github|library)/i.test(q)) contentTypes.push('code');

        return { domain, contentTypes };
    }
}

// ============================================================
// INTERFACE DE USUÁRIO (CLI / INTERATIVA)
// ============================================================

function formatResults(results, query) {
    const classification = QueryClassifier.classify(query);
    console.log(`\n======================================================================`);
    console.log(`📚 RESULTADOS PARA: '${query}'`);
    console.log(`   Domínio: ${classification.domain}`);
    console.log(`   Tipos de conteúdo detectados: ${classification.contentTypes.join(', ') || 'todos'}`);
    console.log(`======================================================================\n`);
    
    if (results.length === 0) {
        console.log("   Nenhum resultado encontrado.");
        return;
    }

    results.forEach((res, i) => {
        console.log(`${(i + 1).toString().padStart(2)}.. [${res.relevance_score.toFixed(1)}] ${res.title}`);
        console.log(`     📍 ${res.url}`);
        console.log(`     📝 ${res.snippet.substring(0, 150)}${res.snippet.length > 150 ? '...' : ''}`);
        console.log(`     🔗 Fonte: ${res.source} | Tipo: ${res.content_type || 'geral'}`);
        console.log();
    });
}

function interactiveSearch() {
    const engine = new DataScienceSearchEngine();
    
    console.log(`
+-----------------------------------------------+
|   🧠 MOTOR DE BUSCA - CIÊNCIA DE DADOS        |
|   & EDUCAÇÃO (NODE.JS EDITION)                |
|                                               |
|   Fontes:                                     |
|   • DuckDuckGo                                |
|   • arXiv / CrossRef / OpenAlex (acadêmico)   |
|   • Coursera / edX / Kaggle / DataCamp        |
|   • GitHub / PapersWithCode / Google Dataset  |
+-----------------------------------------------+
    `);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const askQuery = () => {
        rl.question('\n🔎 Digite sua busca (ou \'sair\', \'exit\', \'quit\'): ', async (query) => {
            const q = query.trim();
            if (q.toLowerCase() === 'sair' || q.toLowerCase() === 'exit' || q.toLowerCase() === 'quit' || q.toLowerCase() === 'q') {
                console.log('\n👋 Até mais!');
                rl.close();
                process.exit(0);
            }
            if (!q) {
                askQuery();
                return;
            }
            
            const startTime = Date.now();
            const results = await engine.search(q);
            const elapsed = (Date.now() - startTime) / 1000;
            
            console.log(`\n⏱️  Tempo total: ${elapsed.toFixed(2)} segundos`);
            formatResults(results, q);
            
            if (results.length > 0) {
                console.log(`   ✅ ${results.length} resultados exibidos de fontes acadêmicas, educacionais e técnicas.\n`);
            }
            askQuery();
        });
    };
    
    askQuery();
}

// ============================================================
// API HTTP SERVER COM CORS
// ============================================================

function runApiServer(port = 5000) {
    const server = http.createServer(async (req, res) => {
        // CORS Headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
        
        if (req.method === 'OPTIONS') {
            res.writeHead(200);
            res.end();
            return;
        }
        
        const urlObj = new URL(req.url, `http://${req.headers.host}`);
        if (urlObj.pathname === '/search') {
            const query = urlObj.searchParams.get('q');
            if (query) {
                try {
                    const engine = new DataScienceSearchEngine();
                    const results = await engine.search(query);
                    
                    const output = results.map(r => ({
                        title: r.title,
                        url: r.url,
                        snippet: r.snippet,
                        source: r.source,
                        score: r.relevance_score,
                        type: r.content_type
                    }));
                    
                    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                    res.end(JSON.stringify(output));
                } catch (e) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: e.message }));
                }
            } else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: "Parâmetro 'q' é obrigatório" }));
            }
            return;
        }
        
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Endpoint não encontrado" }));
    });
    
    server.listen(port, 'localhost', () => {
        console.log(`🚀 Servidor do Motor de Busca rodando em http://localhost:${port}`);
        console.log("   Pressione Ctrl+C para encerrar.");
    });
}

// ============================================================
// ENTRADA PRINCIPAL E ARGUMENTOS CLI
// ============================================================

async function main() {
    loadCache();
    
    const args = process.argv.slice(2);
    
    let query = '';
    let top = 20;
    let isJson = false;
    let isServer = false;
    let isInteractive = false;
    let port = 5000;
    
    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--top' && args[i+1]) {
            top = parseInt(args[i+1]);
            i++;
        } else if (args[i] === '--port' && args[i+1]) {
            port = parseInt(args[i+1]);
            i++;
        } else if (args[i] === '--server') {
            isServer = true;
        } else if (args[i] === '--json') {
            isJson = true;
        } else if (args[i] === '--interactive' || args[i] === '-i') {
            isInteractive = true;
        } else if (!args[i].startsWith('--')) {
            query += (query ? ' ' : '') + args[i];
        }
    }
    
    if (args.length === 0 || (isServer && !query)) {
        runApiServer(port);
        return;
    }
    
    if (isInteractive || (!query && !isServer)) {
        interactiveSearch();
        return;
    }
    
    const engine = new DataScienceSearchEngine();
    const results = await engine.search(query, top);
    
    if (isJson) {
        const output = {
            query,
            total_results: results.length,
            results: results.map(r => ({
                title: r.title,
                url: r.url,
                snippet: r.snippet,
                source: r.source,
                score: r.relevance_score,
                type: r.content_type
            }))
        };
        console.log(JSON.stringify(output, null, 2));
    } else {
        formatResults(results, query);
    }
}

main();
