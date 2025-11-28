// BLOQUEAR SCRIPT DE CADASTRO QUANDO ESTÁ EM MODO DE EDIÇÃO
if (window.location.search.includes("id=")) {
  console.warn("Modo edição detectado → bloqueando script de cadastro");
  window.IS_EDIT_MODE = true;
} else {
  window.IS_EDIT_MODE = false;
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.IS_EDIT_MODE) return;
  const form = document.getElementById("curriculoForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Tratativa de usuário logado
    const idUsuario = parseInt(localStorage.getItem("idUsuario"));
    if (!idUsuario) {
      alert("Usuário não autenticado. Faça login novamente.");
      window.location.href = "login.html";
      return;
    } 

    // ======== Contato e Resumo  ========
    const contato = {
      nome: document.getElementById("nome_contato").value,
      email: document.getElementById("email_contato").value,
      telefone: document.getElementById("telefone_contato").value,
      tituloProfissional: document.getElementById("titulo_profissional_contato")
        .value,
      linkLinkedin: document.getElementById("link_linkedin_contato").value.trim(),
      linkPortifolio: document.getElementById("link_potfolio_contato").value.trim(),
    };

    const resumo = {
      descricao: document.getElementById("descricao_resumo").value,
    }; 

    // ======== Experiências  ========
    const experiencias = [];
   
    document
      .querySelectorAll("#experiencia-lista .item-experiencia")
      .forEach((bloco) => {
        // Buscar inputs DENTRO do bloco
        const empresa = bloco.querySelector('[name="empresa"]')?.value.trim();
        const cargo = bloco.querySelector('[name="cargo"]')?.value.trim();
        const dataInicio = bloco
          .querySelector('[name="dataInicio"]')
          ?.value.trim();
        const dataFim = bloco.querySelector('[name="dataFim"]')?.value.trim();
        const descricao = bloco
          .querySelector('[name="descricao"]')
          ?.value.trim();

        if (empresa && cargo && dataInicio && dataFim && descricao) {
          experiencias.push({
            empresa,
            cargo, 
            dataInicio: formatarData(dataInicio),
            dataFim: formatarData(dataFim),
            descricao,
          });
        }
      }); // ======== Formações ========

    const formacoes = [];

    document
      .querySelectorAll("#formacao-lista .item-formacao")
      .forEach((bloco) => {
        // Buscar inputs DENTRO do bloco
        const instituicao = bloco
          .querySelector('[name="instituicao"]')
          ?.value.trim();
        const curso = bloco.querySelector('[name="curso"]')?.value.trim();
        const dataInicio = bloco
          .querySelector('[name="dataInicio"]')
          ?.value.trim(); // Ano de Início
        const dataFim = bloco.querySelector('[name="dataFim"]')?.value.trim(); // Ano de Fim

        if (instituicao && curso && dataInicio && dataFim) {
          formacoes.push({
            instituicao,
            curso, // A formatação da data para o backend é mantida
            dataInicio: `${dataInicio}-01-01`,
            dataFim: `${dataFim}-12-31`,
          });
        }
      }); // ======== Habilidades ========

    const habilidades = [];
    // Mudar seletor de volta para 'nome', que é o padrão correto
    document
      .querySelectorAll("#habilidades-lista input[name='nome']")
      .forEach((input) => {
        if (input.value.trim() !== "") {
          habilidades.push({ nome: input.value });
        }
      }); // ======== Idiomas ========

    const idiomas = [];
    // Mudar seletor de volta para 'nome', que é o padrão correto
    document
      .querySelectorAll("#idiomas-lista input[name='nome']")
      .forEach((input) => {
        if (input.value.trim() !== "") {
          idiomas.push({ nome: input.value });
        }
      }); // ======== Monta o DTO completo ========

    const curriculoDTO = {
      idUsuario: idUsuario,
      contato,
      resumo,
      experiencias,
      formacoes,
      habilidades,
      idiomas,
    };

    console.log("JSON enviado:", curriculoDTO);

    // ... (restante da chamada fetch)

    try {
      const resposta = await fetch("/curriculo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(curriculoDTO),
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

function createText(texto, fontSize = "0.9rem") {
  const p = document.createElement("p");
  p.textContent = texto;
  p.style.fontSize = fontSize;
  p.style.margin = "0";
  return p;
}

function createSection(titulo, texto) {
  const section = document.createElement("div");
  section.style.marginBottom = "25px";

  const h = document.createElement("h2");
  h.textContent = titulo;
  h.style.fontSize = "1.3rem";
  h.style.marginBottom = "10px";

  const p = document.createElement("p");
  p.textContent = texto;

  section.append(h, p);
  return section;
}

function createSectionContainer(titulo) {
  const section = document.createElement("div");
  section.style.marginBottom = "25px";

  const h = document.createElement("h2");
  h.textContent = titulo;
  h.style.fontSize = "1.3rem";
  h.style.marginBottom = "10px";

  section.appendChild(h);
  return section;
}

function montarDTO() {
  const idUsuario = parseInt(localStorage.getItem("idUsuario"));

  // ==========================
  // CONTATO
  // ==========================
  const contato = {
    nome: document.getElementById("nome_contato").value,
    email: document.getElementById("email_contato").value,
    telefone: document.getElementById("telefone_contato").value,
    tituloProfissional: document.getElementById("titulo_profissional_contato")
      .value,
    linkLinkedin: document.getElementById("link_linkedin_contato").value,
    linkPortifolio: document.getElementById("link_potfolio_contato").value,
  };

  // ==========================
  // RESUMO
  // ==========================
  const resumo = {
    descricao: document.getElementById("descricao_resumo").value,
  };

  // ==========================
  // EXPERIENCIAS PROFISSIONAIS
  // ==========================
  const experiencias = [];
  let experienciaCount = 0; // DEBUG
  document
    .querySelectorAll("#experiencia-lista .item-experiencia")
    .forEach((bloco) => {
      const empresa = bloco.querySelector('[name="empresa"]')?.value.trim();
      const cargo = bloco.querySelector('[name="cargo"]')?.value.trim();
      const dataInicio = bloco
        .querySelector('[name="dataInicio"]')
        ?.value.trim();
      const dataFim = bloco.querySelector('[name="dataFim"]')?.value.trim();
      const descricao = bloco.querySelector('[name="descricao"]')?.value.trim();

      // LOG de DEBUG: Verifica se a linha foi encontrada e se todos os campos estão preenchidos
      console.log(
        `DEBUG: Experiência Linha ${++experienciaCount}: Empresa=[${empresa}], Cargo=[${cargo}], DataInicio=[${dataInicio}], Descricao=[${descricao}]`
      );

      if (empresa && cargo && dataInicio && dataFim && descricao) {
        experiencias.push({
          empresa,
          cargo,
          dataInicio,
          dataFim,
          descricao,
        });
      } else {
        // LOG de DEBUG: Motivo da linha não ter sido adicionada
        console.log(
          `DEBUG: Experiência Linha ${experienciaCount} IGNORADA: Faltando um ou mais campos obrigatórios.`
        );
      }
    });
  // LOG de DEBUG: Total de experiências coletadas
  console.log(`DEBUG: Total de EXPERIÊNCIAS coletadas: ${experiencias.length}`);

  // ==========================
  // FORMAÇÃO ACADÊMICA
  // ==========================
  const formacoes = [];
  let formacaoCount = 0; // DEBUG
  document
    .querySelectorAll("#formacao-lista .item-formacao")
    .forEach((bloco) => {
      const instituicao = bloco
        .querySelector('[name="instituicao"]')
        ?.value.trim();
      const curso = bloco.querySelector('[name="curso"]')?.value.trim();
      const dataInicio = bloco
        .querySelector('[name="dataInicio"]')
        ?.value.trim();
      const dataFim = bloco.querySelector('[name="dataFim"]')?.value.trim();

      // LOG de DEBUG: Verifica se a linha foi encontrada e se todos os campos estão preenchidos
      console.log(
        `DEBUG: Formação Linha ${++formacaoCount}: Instituição=[${instituicao}], Curso=[${curso}], DataInicio=[${dataInicio}]`
      );

      if (instituicao && curso && dataInicio && dataFim) {
        formacoes.push({
          instituicao,
          curso,

          dataInicio: dataInicio,
          dataFim: dataFim,
        });
      } else {
        // LOG de DEBUG: Motivo da linha não ter sido adicionada
        console.log(
          `DEBUG: Formação Linha ${formacaoCount} IGNORADA: Faltando um ou mais campos obrigatórios.`
        );
      }
    });
  // LOG de DEBUG: Total de formações coletadas
  console.log(`DEBUG: Total de FORMAÇÕES coletadas: ${formacoes.length}`);

  // ==========================
  // HABILIDADES
  // ==========================
  const habilidades = [];
  document
    .querySelectorAll("#habilidades-lista input[name='nome']")
    .forEach((input) => {
      if (input.value.trim() !== "") {
        habilidades.push({ nome: input.value });
      }
    });

  // ==========================
  // IDIOMAS
  // ==========================
  const idiomas = [];
  document
    .querySelectorAll("#idiomas-lista input[name='nome']")
    .forEach((input) => {
      if (input.value.trim() !== "") {
        idiomas.push({ nome: input.value });
      }
    });

  // ==========================
  // RETORNO FINAL
  // ==========================
  return {
    idUsuario,
    contato,
    resumo,
    experiencias,
    formacoes,
    habilidades,
    idiomas,
  };
}

function renderCurriculoPreview(curriculo) {
  console.log("Renderizando preview do currículo...");

  // ... (Logs de Debug) ...

  const preview = document.getElementById("preview-curriculo");
  preview.innerHTML = "";

  // Adiciona a classe principal para estilização do container
  const container = document.createElement("div");
  container.classList.add("curriculo-ats");
  container.style.fontFamily = "Inter, sans-serif";
  container.style.lineHeight = "1.6";
  // REMOVENDO ESTILOS INLINE AQUI para deixar o CSS externo controlar
  container.style.padding = "0"; // Deixa o CSS externo controlar o padding/margem
  container.style.maxWidth = "none";
  container.style.margin = "0 auto";
  container.style.background = "none";
  container.style.borderRadius = "none";
  container.style.boxShadow = "none";

  // -----------------------------
  // CABEÇALHO
  // -----------------------------
  const header = document.createElement("div");
  header.classList.add("header-ats"); // Classe para estilização do cabeçalho
  header.style.textAlign = "center";
  header.style.marginBottom = "30px";

  const nome = document.createElement("h1");
  nome.textContent = curriculo.nome || "Seu Nome";
  // REMOVENDO ESTILOS INLINE (deixar o CSS externo controlar)
  nome.style.fontSize = "2.2rem";
  nome.style.marginBottom = "5px";

  const titulo = document.createElement("p");
  titulo.textContent = curriculo.titulo || "";
  // REMOVENDO ESTILOS INLINE
  titulo.style.fontSize = "1.1rem";
  titulo.style.color = "#555";

  const contato = document.createElement("div");
  contato.classList.add("contact-info-ats"); // Classe para o bloco de contato
  // REMOVENDO ESTILOS INLINE (deixar o CSS externo controlar)
  contato.style.marginTop = "10px";
  contato.style.fontSize = "0.9rem";
  contato.style.display = "flex";
  contato.style.justifyContent = "center";
  contato.style.gap = "15px";
  contato.style.flexWrap = "wrap";

  // Função auxiliar modificada para adicionar classe de contato
  function createTextAts(texto) {
    const p = document.createElement("p");
    p.textContent = texto;
    p.classList.add("contact-item-ats");
    p.style.margin = "0";
    return p;
  }

  if (curriculo.email) contato.append(createTextAts(curriculo.email));
  if (curriculo.telefone) contato.append(createTextAts(curriculo.telefone));
  if (curriculo.linkedin) contato.append(createTextAts(curriculo.linkedin));
  if (curriculo.portfolio) contato.append(createTextAts(curriculo.portfolio));

  header.append(nome, titulo, contato);
  container.appendChild(header);

  // -----------------------------
  // SEÇÃO - RESUMO
  // -----------------------------
  if (curriculo.resumo && curriculo.resumo.descricao) {
    // Função auxiliar modificada para adicionar classes ATS
    function createSectionAts(titulo, texto) {
      const section = document.createElement("div");
      section.classList.add("section-block-ats");
      section.style.marginBottom = "25px";

      const h = document.createElement("h2");
      h.textContent = titulo;
      h.classList.add("section-title-ats"); // Classe para o título da seção

      const p = document.createElement("p");
      p.textContent = texto;
      p.classList.add("section-content-ats"); // Classe para o conteúdo

      section.append(h, p);
      return section;
    }

    container.appendChild(
      createSectionAts("Resumo Profissional", curriculo.resumo.descricao)
    );
  }

  // -----------------------------
  // SEÇÃO - EXPERIÊNCIAS
  // -----------------------------
  if (curriculo.experiencias && curriculo.experiencias.length > 0) {
    const sec = createSectionContainer("Experiência Profissional");
    sec.classList.add("section-block-ats");
    sec.querySelector("h2").classList.add("section-title-ats");

    curriculo.experiencias.forEach((exp) => {
      const box = document.createElement("div");
      box.classList.add("experience-box-ats"); // Classe para o bloco de experiência
      box.style.marginBottom = "15px";

      const titulo = document.createElement("h3");
      titulo.textContent = `${exp.cargo || ""} - ${exp.empresa || ""}`;
      titulo.classList.add("experience-title-ats"); // Classe para Título/Empresa

      const data = document.createElement("p");
      const dataFimTexto =
        exp.dataFim && exp.dataFim.trim() !== "" ? exp.dataFim : "Atual";
      data.textContent = `${exp.dataInicio || ""} - ${dataFimTexto}`;
      data.classList.add("experience-date-ats"); // Classe para as datas

      const desc = document.createElement("p");
      desc.textContent = exp.descricao || "";
      desc.classList.add("experience-description-ats"); // Classe para a descrição

      box.append(titulo, data, desc);
      sec.appendChild(box);
    });

    container.appendChild(sec);
  }

  // -----------------------------
  // SEÇÃO - FORMAÇÃO
  // -----------------------------
  if (curriculo.formacoes && curriculo.formacoes.length > 0) {
    const sec = createSectionContainer("Formação Acadêmica");
    sec.classList.add("section-block-ats");
    sec.querySelector("h2").classList.add("section-title-ats");

    curriculo.formacoes.forEach((f) => {
      const box = document.createElement("div");
      box.classList.add("education-box-ats"); // Classe para o bloco de formação
      box.style.marginBottom = "15px";

      const curso = document.createElement("h3");
      curso.textContent = `${f.curso || ""} - ${f.instituicao || ""}`;
      curso.classList.add("education-title-ats"); // Classe para Curso/Instituição

      const periodo = document.createElement("p");
      const dataInicioTexto = f.dataInicio || "";
      const dataFimTexto = f.dataFim || "";

      periodo.textContent = `${dataInicioTexto} - ${dataFimTexto}`;
      periodo.classList.add("education-date-ats"); // Classe para o período

      box.append(curso, periodo);
      sec.appendChild(box);
    });

    container.appendChild(sec);
  }

  // -----------------------------
  // SEÇÃO - HABILIDADES
  // -----------------------------
  if (curriculo.habilidades && curriculo.habilidades.length > 0) {
    const sec = createSectionContainer("Habilidades");
    sec.classList.add("section-block-ats");
    sec.querySelector("h2").classList.add("section-title-ats");

    const skillContainer = document.createElement("div");
    skillContainer.classList.add("skills-container-ats");
    skillContainer.style.display = "flex";
    skillContainer.style.flexWrap = "wrap";
    skillContainer.style.gap = "8px";

    curriculo.habilidades.forEach((h) => {
      const tag = document.createElement("span");
      tag.textContent = h.nome;
      tag.classList.add("skill-tag-ats");
      skillContainer.appendChild(tag);
    });

    sec.appendChild(skillContainer);
    container.appendChild(sec);
  }

  // -----------------------------
  // SEÇÃO - IDIOMAS
  // -----------------------------
  if (curriculo.idiomas && curriculo.idiomas.length > 0) {
    const sec = createSectionContainer("Idiomas");
    sec.classList.add("section-block-ats");
    sec.querySelector("h2").classList.add("section-title-ats");

    const idiomasContainer = document.createElement("div");
    idiomasContainer.classList.add("languages-container-ats");

    curriculo.idiomas.forEach((i) => {
      const p = createTextAts("• " + i.nome);
      p.classList.add("language-item-ats");
      sec.appendChild(p);
    });

    container.appendChild(sec);
  }

  // Render no preview
  preview.appendChild(container);
}