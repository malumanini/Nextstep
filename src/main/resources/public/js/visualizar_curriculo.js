document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    alert("Erro: ID não informado.");
    return;
  }

  try {
    const resp = await fetch(`http://localhost:4567/curriculo/id/${id}`);
    const curriculo = await resp.json();

    console.log("CURRÍCULO PARA VISUALIZAÇÃO:", curriculo);

    renderCurriculo(curriculo);

    // PDF
    document.getElementById("btnPDF").addEventListener("click", () => {
      gerarPDF(curriculo.contato?.nome || "curriculo");
    });
  } catch (error) {
    console.error(error);
    alert("Não foi possível carregar o currículo.");
  }
});

// ------------------ RENDERIZAÇÃO ------------------

function renderCurriculo(c) {
  const container = document.getElementById("curriculo-container");
  container.innerHTML = "";

  // === HEADER (INFO PESSOAL) ===
  const header = document.createElement("div");
  header.classList.add("header-ats");

  const nome = document.createElement("h1");
  // ATS prefere títulos simples e diretos
  nome.textContent = c.contato?.nome || "";

  const titulo = document.createElement("h2"); // Mudança de p para h2 (Hierarquia clara)
  titulo.textContent = c.contato?.tituloProfissional || "";
  titulo.classList.add("job-title-ats");

  const contato = document.createElement("div");
  contato.classList.add("contact-info-ats");

  const contatoItems = [
    c.contato?.email,
    c.contato?.telefone,
    c.contato?.linkLinkedin,
    c.contato?.linkPortifolio,
  ];

  contatoItems.forEach((item) => {
    if (item) {
      const p = document.createElement("p");
      p.textContent = item;
      contato.appendChild(p);
    }
  });

  header.append(nome, titulo, contato);
  container.appendChild(header);

  // RESUMO
  if (c.resumo?.descricao) {
    // Mantenha a descrição, mas garanta que não contenha bullet points/símbolos complexos aqui
    container.appendChild(section("Resumo Profissional", c.resumo.descricao));
  }

  // === EXPERIÊNCIAS (CRUCIAL PARA ATS: Usar Listas) ===
  if (c.experiencias?.length > 0) {
    const sec = createSectionContainer("Experiência Profissional");

    c.experiencias.forEach((exp) => {
      const box = document.createElement("div");
      box.classList.add("experience-block-ats");

      // Título de seção claro e formatado
      box.innerHTML = `
                <h3>${exp.cargo} – ${exp.empresa}</h3>
                <p class="dates-ats">${exp.dataInicio} – ${
        exp.dataFim || "Atual"
      }</p>
            `;

      // Converter a descrição em lista (Assumindo que o texto já venha formatado com quebras de linha ou pontos)
      const tasksList = document.createElement("ul");
      tasksList.classList.add("task-list-ats");

      // Simulação de conversão de texto simples para itens de lista (Idealmente, isso viria do backend)
      const descriptions = exp.descricao.split("\n");
      descriptions.forEach((desc) => {
        if (desc.trim()) {
          const li = document.createElement("li");
          li.textContent = desc.replace(/^-/g, "").trim(); // Limpa hifens se houver
          tasksList.appendChild(li);
        }
      });

      box.appendChild(tasksList);
      sec.appendChild(box);
    });

    container.appendChild(sec);
  }

  // FORMAÇÕES (Manter simples)
  if (c.formacoes?.length > 0) {
    const sec = createSectionContainer("Formação Acadêmica");

    c.formacoes.forEach((f) => {
      const box = document.createElement("div");
      box.classList.add("education-block-ats");
      box.innerHTML = `
                <h3>${f.curso} – ${f.instituicao}</h3>
                <p class="dates-ats">${f.dataInicio} – ${f.dataFim}</p>
            `;

      sec.appendChild(box);
    });

    container.appendChild(sec);
  }

  // === HABILIDADES (CRUCIAL PARA ATS: Usar Lista Simples) ===
  if (c.habilidades?.length > 0) {
    const sec = createSectionContainer("Habilidades");

    const skillList = document.createElement("ul");
    skillList.classList.add("skills-list-ats"); // Usar lista para ATS

    c.habilidades.forEach((h) => {
      const li = document.createElement("li");
      li.textContent = h.nome;
      skillList.appendChild(li);
    });

    sec.appendChild(skillList);
    container.appendChild(sec);
  }

  // IDIOMAS (Manter simples)
  if (c.idiomas?.length > 0) {
    const sec = createSectionContainer("Idiomas");

    const languageList = document.createElement("ul");
    languageList.classList.add("language-list-ats");

    c.idiomas.forEach((i) => {
      const li = document.createElement("li");
      li.textContent = i.nome;
      languageList.appendChild(li);
    });

    sec.appendChild(languageList);
    container.appendChild(sec);
  }
}

// Helpers de layout (Manter estas funções auxiliares)
function section(titulo, texto) {
  // ... (manter como está)
  const div = document.createElement("div");
  div.classList.add("section-block-ats", "summary-ats"); // Adiciona classe específica para resumo

  div.innerHTML = `
        <h2>${titulo}</h2>
        <p>${texto}</p>
    `;

  return div;
}

function createSectionContainer(titulo) {
  // ... (manter como está)
  const div = document.createElement("div");
  div.classList.add("section-block-ats");

  div.innerHTML = `<h2>${titulo}</h2>`;

  return div;
}

// ------------------ PDF ------------------

function gerarPDF(nomeArquivo) {
  const element = document.getElementById("curriculo-container");

  const opt = {
    margin: 0.5,
    filename: `${nomeArquivo}.pdf`,
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  };

  html2pdf().set(opt).from(element).save();
}
