// BACKEND EM JAVASCRIPT
// Node.js 18+ (fetch já incluso)

import "dotenv/config";
import http from "http";

// CHAVE LIDA DA VARIÁVEL DE AMBIENTE.
const API_KEY = process.env.GEMINI_API_KEY;

// Verificação de segurança: se a chave não for lida, o servidor não deve iniciar
if (!API_KEY) {
  console.error(
    "ERRO FATAL: Variável de ambiente GEMINI_API_KEY não está definida. Verifique seu arquivo .env e o comando 'npm start'."
  );
  process.exit(1);
}

const server = http.createServer(async (req, res) => {
  // habilita CORS para permitir requisições do front
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // pré-flight do navegador
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // =========================================================================
  // ROTA 1: /aprimorar (Reescrever Resumo)
  // =========================================================================
  if (req.method === "POST" && req.url === "/aprimorar") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      let dados;
      try {
        dados = JSON.parse(body);
      } catch (e) {
        console.error("ERRO: Corpo da requisição inválido (não é JSON).", body);
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({
            sucesso: false,
            texto: "Corpo da requisição JSON inválido.",
          })
        );
      }

      // Converte Arrays/Objetos para String JSON para uso no Prompt e Log
      const experienciasString = JSON.stringify(dados.experiencias || []);
      const formacaoString = JSON.stringify(dados.formacao || []);

      console.log("\n--- DADOS RECEBIDOS DO FRONTEND (APRIMORAR) ---");
      console.log(
        `RESUMO: ${
          dados.resumo ? dados.resumo.substring(0, 50) + "..." : "Vazio"
        }`
      );
      console.log(`EXP: ${experienciasString.substring(0, 50) + "..."}`);
      console.log("------------------------------------");

      try {
        const { resumo, habilidades, idiomas } = dados;

        const prompt = `
Você é um assistente especializado em melhorar textos de currículos para sistemas ATS.

Regras obrigatórias:
- NÃO invente novas informações.
- NÃO adicione habilidades, experiências ou idiomas inexistentes.
- Reescreva SOMENTE usando o que foi fornecido.
- Mantenha entre 3 e 5 linhas.
- Se algo estiver vazio, ignore.
- Pode reorganizar, condensar e deixar o texto mais claro.
- Nunca deduzir cargos, senioridade, datas ou duração.

Conteúdo enviado:

Resumo: ${resumo}
Experiências: ${experienciasString}
Habilidades: ${habilidades}
Formação: ${formacaoString}
Idiomas: ${idiomas}

Agora gere o resumo otimizado:
                `;

        // CHAMADA CORRIGIDA PARA gemini-2.5-flash
        const geminiResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [{ text: prompt }],
                },
              ],
            }),
          }
        );

        if (!geminiResponse.ok) {
          const errorBody = await geminiResponse.text();
          console.error(
            "ERRO da API do Gemini (HTTP Status):",
            geminiResponse.status
          );
          console.error("CORPO DO ERRO:", errorBody);

          res.writeHead(500, { "Content-Type": "application/json" });
          return res.end(
            JSON.stringify({
              sucesso: false,
              texto: "Erro na API do Gemini. Verifique a chave ou restrições.",
            })
          );
        }

        const resultado = await geminiResponse.json();

        // --- LOG DE DEBUG 3: RESPOSTA COMPLETA DA API ---
        console.log("--- RESPOSTA COMPLETA DO GEMINI (APRIMORAR) ---");
        console.log(JSON.stringify(resultado, null, 2));
        console.log("------------------------------------");
        // ----------------------------------------------------

        const texto =
          resultado?.candidates?.[0]?.content?.parts?.[0]?.text ||
          "Não foi possível gerar o texto.";

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ sucesso: true, texto }));
      } catch (erro) {
        console.error("ERRO INTERNO:", erro);

        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ sucesso: false, erro: "Erro interno no servidor." })
        );
      }
    });

    return;
  }

  // =========================================================================
  // ROTA 2: /avaliar-ats (Score ATS)
  // =========================================================================
  if (req.method === "POST" && req.url === "/avaliar-ats") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      let dados;
      try {
        dados = JSON.parse(body);
      } catch (e) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ sucesso: false, erro: "Corpo JSON inválido." })
        );
      }
      
      const experienciasString = JSON.stringify(dados.experiencias || []);
      const formacaoString = JSON.stringify(dados.formacao || []);

      console.log("\n--- INICIANDO AVALIAÇÃO ATS ---");

      try {
        const { resumo, habilidades, idiomas } = dados;

        const promptAvaliacao = `
Você é um Sistema de Rastreamento de Candidatos (ATS) rigoroso. Sua tarefa é avaliar o currículo fornecido e atribuir um Score de Compatibilidade de 0 a 100%.

REGRAS OBRIGATÓRIAS DE AVALIAÇÃO:
1.  O Score deve ser baseado estritamente na presença de: verbos de ação, palavras-chave técnicas, formato de lista, clareza e detalhe nas experiências/formação.
2.  NÃO deduza informações. Se a seção estiver vazia ou genérica, penalize o score.
3.  Retorne a resposta EXCLUSIVAMENTE em formato JSON.
4.  A lista de dicas deve ter 5 itens.

CONTEÚDO DO CURRÍCULO:
Resumo: ${resumo}
Experiências: ${experienciasString}
Formação: ${formacaoString}
Habilidades: ${habilidades}
Idiomas: ${idiomas}

TAREFA: Gere a saída JSON com o Score final e uma lista de 5 dicas de melhoria.

FORMATO DE SAÍDA OBRIGATÓRIO:
{
  "score": [Número de 0 a 100],
  "dicas": [
    "Dica 1: Usar verbos de ação na descrição das experiências.",
    "Dica 2: Adicionar métricas de resultado, se possível.",
    "Dica 3: Formatar a seção de Habilidades como lista de competências-chave.",
    "Dica 4: Verificar se o resumo é específico para o cargo desejado.",
    "Dica 5: Incluir mais detalhes na seção de Formação, se aplicável."
  ]
}
        `;
        
        // Chamada para o Gemini
        const geminiResponse = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ role: "user", parts: [{ text: promptAvaliacao }] }],
                })
            }
        );

        if (!geminiResponse.ok) {
            const errorBody = await geminiResponse.text();
            console.error("ERRO da API do Gemini (Status Avaliação):", geminiResponse.status, errorBody);
            throw new Error("Falha na API do Gemini. Verifique as credenciais.");
        }

        const resultado = await geminiResponse.json();
        let textoJSON = resultado?.candidates?.[0]?.content?.parts?.[0]?.text;

        // Limpeza simples para garantir que o JSON seja parseado (remove blocos de código)
        textoJSON = textoJSON.replace(/```json/g, '').replace(/```/g, '').trim();
        
        const dadosIA = JSON.parse(textoJSON);

        // Retorna o score e as dicas para o frontend
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({
            sucesso: true,
            score: dadosIA.score,
            dicas: dadosIA.dicas
        }));

      } catch (erro) {
          console.error("ERRO na avaliação ATS:", erro);
          res.writeHead(500, { "Content-Type": "application/json" });
          return res.end(
            JSON.stringify({ sucesso: false, texto: "Erro interno na avaliação." })
          );
      }
    });
    return;
  }
  
  // rota inválida
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ erro: "Endpoint não encontrado." }));
});

// roda servidor na porta 7000
server.listen(7000, () => {
  console.log("Servidor ATS rodando em http://localhost:7000");
});