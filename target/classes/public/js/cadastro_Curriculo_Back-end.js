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

    // ======== Experiências ========
    const experiencias = [];
    document.querySelectorAll("#experiencia-lista .linha-form").forEach((linha) => {
      const empresa = linha.querySelector('[name="empresa"]')?.value.trim();
      const cargo = linha.querySelector('[name="cargo"]')?.value.trim();
      const dataInicio = linha.querySelector('[name="dataInicio"]')?.value.trim();
      const dataFim = linha.querySelector('[name="dataFim"]')?.value.trim();
      const descricao = linha.querySelector('[name="descricao"]')?.value.trim();

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


   // ======== Formações ========
    const formacoes = [];
    document.querySelectorAll("#formacao-lista .linha-form").forEach((linha) => {
      const instituicao = linha.querySelector('[name="instituicao"]')?.value.trim();
      const curso = linha.querySelector('[name="curso"]')?.value.trim();
      const dataInicio = linha.querySelector('[name="dataInicio"]')?.value.trim();
      const dataFim = linha.querySelector('[name="dataFim"]')?.value.trim();

      if (instituicao && curso && dataInicio && dataFim) {
        formacoes.push({
          instituicao,
          curso,
          dataInicio: `${dataInicio}-01-01`,
          dataFim: `${dataFim}-12-31`
        });
      }
    });

    // ======== Habilidades ========
    const habilidades = [];
    document.querySelectorAll("#habilidades-lista input[name='nome']").forEach((input) => {
      if (input.value.trim() !== "") {
        habilidades.push({ nome: input.value });
      }
    });

    // ======== Idiomas ========
    const idiomas = [];
    document.querySelectorAll("#idiomas-lista input[name='nome']").forEach((input) => {
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

// ============ Funções auxiliares ============
function formatarData(mesAno) {
  // Exemplo: "03/2023" → "2023-03-01"
  if (!mesAno || !mesAno.includes("/")) return null;
  const [mes, ano] = mesAno.split("/");
  return `${ano}-${mes}-01`;
}