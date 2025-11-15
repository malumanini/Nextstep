document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("curriculoForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const idUsuario = parseInt(localStorage.getItem("idUsuario"));
    if (!idUsuario) {
      alert("Usuário não autenticado. Faça login novamente.");
      window.location.href = "login.html";
      return;
    }

    // ======== Contato ========
    const contato = {
      nome: document.getElementById("nome_contato").value,
      email: document.getElementById("email_contato").value,
      telefone: document.getElementById("telefone_contato").value,
      tituloProfissional: document.getElementById("titulo_profissional_contato").value,
      linkLinkedin: document.getElementById("link_linkedin_contato").value,
      linkPortifolio: document.getElementById("link_potfolio_contato").value
    };

    // ======== Resumo ========
    const resumo = {
      descricao: document.getElementById("descricao_resumo").value
    };


    const experiencias = [];
    
    // --- 1. Coleta a primeira (estática) experiência (usando IDs) ---
    const staticEmpresa = document.getElementById("empresa_experiencia")?.value.trim();
    const staticCargo = document.getElementById("cargo_experiencia")?.value.trim();
    const staticDataInicio = document.getElementById("dataInicio_experiencia")?.value.trim();
    const staticDataFim = document.getElementById("data_termino_experiencia")?.value.trim();
    const staticDescricao = document.getElementById("descricao_experiencia")?.value.trim();

    if (staticEmpresa && staticCargo && staticDataInicio && staticDataFim && staticDescricao) {
        experiencias.push({
            empresa: staticEmpresa,
            cargo: staticCargo,
            dataInicio: formatarData(staticDataInicio),
            dataFim: formatarData(staticDataFim),
            descricao: staticDescricao
        });
    }

    // --- 2. Coleta as experiências dinâmicas (por bloco 'experiencia-bloco') ---
    document.querySelectorAll("#experiencia-lista .experiencia-bloco").forEach((bloco) => {
        // Os campos dinâmicos usam notação de array e nomes de campo adaptados (ex: inicio[], responsabilidades[])
        const empresa = bloco.querySelector('[name="empresa[]"]')?.value.trim();
        const cargo = bloco.querySelector('[name="cargo[]"]')?.value.trim();
        const dataInicio = bloco.querySelector('[name="inicio[]"]')?.value.trim(); 
        const dataFim = bloco.querySelector('[name="fim[]"]')?.value.trim();        
        const descricao = bloco.querySelector('[name="responsabilidades[]"]')?.value.trim(); 

        if (empresa && cargo && dataInicio && dataFim && descricao) {
            experiencias.push({
                empresa,
                cargo,
                dataInicio: formatarData(dataInicio),
                dataFim: formatarData(dataFim),
                descricao
            });
        }
    });


    const formacoes = [];

    // --- 1. Coleta a primeira (estática) formação (usando IDs) ---
    const staticInstituicaoFormacao = document.getElementById("instituicao_formacao")?.value.trim();
    const staticCursoFormacao = document.getElementById("curso_formacao")?.value.trim();
    const staticDataInicioFormacao = document.getElementById("data_inicio_formacao")?.value.trim();
    const staticDataFimFormacao = document.getElementById("dataFim_formacao")?.value.trim();
    
    if (staticInstituicaoFormacao && staticCursoFormacao && staticDataInicioFormacao && staticDataFimFormacao) {
        formacoes.push({
            instituicao: staticInstituicaoFormacao,
            curso: staticCursoFormacao,
            dataInicio: `${staticDataInicioFormacao}-01-01`,
            dataFim: `${staticDataFimFormacao}-12-31`
        });
    }

    // --- 2. Coleta as formações dinâmicas (por bloco 'formacao-bloco') ---
    document.querySelectorAll("#formacao-lista .formacao-bloco").forEach((bloco) => {
        // Os campos dinâmicos usam notação de array e nomes de campo adaptados (ex: ano[])
        const instituicao = bloco.querySelector('[name="instituicao[]"]')?.value.trim();
        const curso = bloco.querySelector('[name="curso[]"]')?.value.trim();
        const ano = bloco.querySelector('[name="ano[]"]')?.value.trim(); // O campo 'ano[]' representa o dataInicio/dataFim
        
        if (instituicao && curso && ano) {
            formacoes.push({
                instituicao,
                curso,
                dataInicio: `${ano}-01-01`,
                dataFim: `${ano}-12-31`
            });
        }
    });

    
    const habilidades = [];
    document.querySelectorAll("#habilidades-lista input[name='nome'], #habilidades-lista input[name='habilidade[]']").forEach((input) => {
      if (input.value.trim() !== "") {
        habilidades.push({ nome: input.value });
      }
    });

  
    const idiomas = [];
    document.querySelectorAll("#idiomas-lista input[name='nome'], #idiomas-lista input[name='idioma[]']").forEach((input) => {
      if (input.value.trim() !== "") {
        idiomas.push({ nome: input.value });
      }
    });

    // ======== Monta o DTO completo ========
    const curriculoDTO = {
      idUsuario: idUsuario,
      contato,
      resumo,
      experiencias,
      formacoes,
      habilidades,
      idiomas
    };

    console.log("JSON enviado:", curriculoDTO);

    try {
      const resposta = await fetch("/curriculo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(curriculoDTO)
      });

      if (resposta.ok) {
        alert("Currículo salvo com sucesso!");
        form.reset();
      } else {
        const erro = await resposta.text();
        console.error("Erro do servidor:", erro);
        alert("Erro ao salvar o currículo. Tente novamente.");
      }
    } catch (err) {
      console.error("Erro de conexão:", err);
      alert("Não foi possível enviar o currículo. Verifique sua conexão.");
    }
  });
});

// ============ Funções auxiliares (Mantidas) ============
function formatarData(mesAno) {
  // Exemplo: "03/2023" → "2023-03-01"
  if (!mesAno || !mesAno.includes("/")) return null;
  const [mes, ano] = mesAno.split("/");
  return `${ano}-${mes}-01`;
}

