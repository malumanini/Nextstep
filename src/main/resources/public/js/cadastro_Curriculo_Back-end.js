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
    document.querySelectorAll("#experiencia-lista .linha-form").forEach((linha, i) => {
      const empresa = linha.querySelector('[name="empresa"]');
      const cargo = linha.querySelector('[name="cargo"]');
      const dataInicio = linha.querySelector('[name="data_inicio"]');
      const dataFim = linha.querySelector('[name="data_fim"]');
      const descricao = linha.querySelector('[name="descricao"]');

      if (empresa && cargo && dataInicio && dataFim && descricao) {
        experiencias.push({
          empresa: empresa.value,
          cargo: cargo.value,
          dataInicio: formatarData(dataInicio.value),
          dataFim: formatarData(dataFim.value),
          descricao: descricao.value
        });
      }
    });

    // ======== Formações ========
    const formacoes = [];
    document.querySelectorAll("#formacao-lista .linha-form").forEach((linha) => {
      const instituicao = linha.querySelector('[name="instituicao"]');
      const curso = linha.querySelector('[name="curso"]');
      const dataInicio = linha.querySelector('[name="data_inicio"]');
      const dataFim = linha.querySelector('[name="data_fim"]');

      if (instituicao && curso && dataInicio && dataFim) {
        formacoes.push({
          instituicao: instituicao.value,
          curso: curso.value,
          dataInicio: `${dataInicio.value}-01-01`,
          dataFim: `${dataFim.value}-12-31`
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
      id_usuario: idUsuario,
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