// BLOQUEAR SCRIPT DE EDIÇÃO QUANDO ESTÁ EM MODO DE CRIAÇÃO
if (!window.location.search.includes("id=")) {
  console.warn("Modo criação detectado → bloqueando script de edição");
  window.IS_EDIT_MODE = false;
} else {
  window.IS_EDIT_MODE = true;
}

document.addEventListener("DOMContentLoaded", async () => {
    if (!window.IS_EDIT_MODE) return;
    // ------------------------- PEGAR ID DA URL -------------------------
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        // alert("ID do currículo não informado!");
        return;
    }

    // ------------------------- BUSCAR CURRÍCULO -------------------------
    try {
        const resp = await fetch(`http://localhost:4567/curriculo/id/${id}`);
        const curriculo = await resp.json();

        console.log("RESPOSTA BRUTA DO SERVIDOR:", resp);
        console.log("CURRÍCULO RECEBIDO:", curriculo);
        console.log("TIPO:", typeof curriculo);


        preencherFormulario(curriculo);

    } catch (e) {
        console.error(e);
        alert("Erro ao carregar o currículo do servidor.");
    }


    // ------------------------- SUBMIT DO FORM -------------------------
    const form = document.getElementById("curriculoForm");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const dto = montarDTO();

        try {
            const resp = await fetch(`http://localhost:4567/curriculo/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dto)
            });

            const json = await resp.json();

            if (resp.ok) {
                alert("Currículo atualizado com sucesso!");
            } else {
                alert("Erro ao atualizar currículo: " + json.mensagem);
            }

        } catch (e) {
            console.error(e);
            alert("Erro de comunicação com o servidor.");
        }
    });
});

// ======================================================================
// FUNÇÃO: Montar DTO (usada para criar e editar)
// ======================================================================

function montarDTO() {

    const dto = {
        contato: {
            id: document.getElementById("id_contato").value || -1,
            nome: document.getElementById("nome_contato").value,
            tituloProfissional: document.getElementById("titulo_profissional_contato").value,
            email: document.getElementById("email_contato").value,
            telefone: document.getElementById("telefone_contato").value,
            linkLinkedin: document.getElementById("link_linkedin_contato").value,
            linkPortifolio: document.getElementById("link_potfolio_contato").value
        },
        resumo: {
            id: document.getElementById("id_resumo").value || -1,
            descricao: document.getElementById("descricao_resumo").value
        },
        experiencias: [],
        formacoes: [],
        habilidades: [],
        idiomas: []
    };

    // EXPERIÊNCIAS
    document.querySelectorAll("#experiencia-lista .item-experiencia").forEach(div => {
        dto.experiencias.push({
            id: div.querySelector("input[name='id']").value || -1,
            empresa: div.querySelector("input[name='empresa']").value,
            cargo: div.querySelector("input[name='cargo']").value,
            dataInicio: div.querySelector("input[name='dataInicio']").value,
            dataFim: div.querySelector("input[name='dataFim']").value,
            descricao: div.querySelector("textarea[name='descricao']").value
        });
    });

    // FORMAÇÃO
    document.querySelectorAll("#formacao-lista .item-formacao").forEach(div => {
        dto.formacoes.push({
            id: div.querySelector("input[name='id']").value || -1,
            instituicao: div.querySelector("input[name='instituicao']").value,
            curso: div.querySelector("input[name='curso']").value,
            dataInicio: div.querySelector("input[name='dataInicio']").value,
            dataFim: div.querySelector("input[name='dataFim']").value
        });
    });

    // HABILIDADES
    document.querySelectorAll("#habilidades-lista .linha-form").forEach(linha => {
        dto.habilidades.push({
            id: linha.querySelector("input[name='id']").value || -1,
            nome: linha.querySelector("input[name='nome']").value
        });
    });

    // IDIOMAS
    document.querySelectorAll("#idiomas-lista .linha-form").forEach(linha => {
        dto.idiomas.push({
            id: linha.querySelector("input[name='id']").value || -1,
            nome: linha.querySelector("input[name='nome']").value
        });
    });

    return dto;
}


// ========================================================================
// ------------------------- FUNÇÃO: Preencher Form ------------------------
// ========================================================================

async function preencherFormulario(curriculo) {
    // Contato
    if (curriculo.contato) {
        document.getElementById("id_contato").value = curriculo.contato.id || "";
        document.getElementById("nome_contato").value = curriculo.contato.nome || "";
        document.getElementById("titulo_profissional_contato").value = curriculo.contato.tituloProfissional || "";
        document.getElementById("email_contato").value = curriculo.contato.email || "";
        document.getElementById("telefone_contato").value = curriculo.contato.telefone || "";
        document.getElementById("link_linkedin_contato").value = curriculo.contato.linkLinkedin || "";
        document.getElementById("link_potfolio_contato").value = curriculo.contato.linkPortifolio || "";
    }

    // Resumo Profissional
    if (curriculo.resumo) {
        document.getElementById("id_resumo").value = curriculo.resumo.id || "";
        document.getElementById("descricao_resumo").value = curriculo.resumo.descricao || "";
    }

    // Experiências
    const listaExp = document.getElementById("experiencia-lista");
    listaExp.innerHTML = "";

    (curriculo.experiencias || []).forEach(exp => {
        const div = document.createElement("div");
        div.classList.add("item-experiencia");

        div.innerHTML = `
            <input type="hidden" name="id" value="${exp.id || ""}">
            <div class="linha-form">
                <div class="campo">
                    <label>Empresa</label>
                    <input type="text" name="empresa" value="${exp.empresa || ""}">
                </div>
                <div class="campo">
                    <label>Cargo</label>
                    <input type="text" name="cargo" value="${exp.cargo || ""}">
                </div>
            </div>

            <div class="linha-form">
                <div class="campo">
                    <label>Data de Início</label>
                    <input type="text" name="dataInicio" value="${exp.dataInicio || ""}">
                </div>
                <div class="campo">
                    <label>Data de Término</label>
                    <input type="text" name="dataFim" value="${exp.dataFim || ""}">
                </div>
            </div>

            <div class="campo">
                <label>Descrição</label>
                <textarea name="descricao">${exp.descricao || ""}</textarea>
            </div>
        `;

        listaExp.appendChild(div);
    });

    // Formação
    const listaFormacao = document.getElementById("formacao-lista");
    listaFormacao.innerHTML = "";

    (curriculo.formacoes || []).forEach(f => {
        const div = document.createElement("div");
        div.classList.add("item-formacao");

        div.innerHTML = `
            <input type="hidden" name="id" value="${f.id || ""}">
            <div class="linha-form">
                <div class="campo">
                    <label>Instituição</label>
                    <input type="text" name="instituicao" value="${f.instituicao || ""}">
                </div>
                <div class="campo">
                    <label>Curso</label>
                    <input type="text" name="curso" value="${f.curso || ""}">
                </div>
            </div>

            <div class="linha-form">
                <div class="campo">
                    <label>Início</label>
                    <input type="text" name="dataInicio" value="${f.dataInicio || ""}">
                </div>
                <div class="campo">
                    <label>Fim</label>
                    <input type="text" name="dataFim" value="${f.dataFim || ""}">
                </div>
            </div>
        `;

        listaFormacao.appendChild(div);
    });

    // Habilidades
    const listaHab = document.getElementById("habilidades-lista");
    listaHab.innerHTML = "";

    (curriculo.habilidades || []).forEach(h => {
        const linha = document.createElement("div");
        linha.classList.add("linha-form");

        linha.innerHTML = `
            <input type="hidden" name="id" value="${h.id || ""}">
            <div class="campo" style="flex:2;">
                <input type="text" name="nome" value="${h.nome || ""}">
            </div>
        `;

        listaHab.appendChild(linha);
    });

    // Idiomas
    const listaIdiomas = document.getElementById("idiomas-lista");
    listaIdiomas.innerHTML = "";

    (curriculo.idiomas || []).forEach(i => {
        const linha = document.createElement("div");
        linha.classList.add("linha-form");

        linha.innerHTML = `
            <input type="hidden" name="id" value="${i.id || ""}">
            <div class="campo" style="flex:2;">
                <input type="text" name="nome" value="${i.nome || ""}">
            </div>
        `;

        listaIdiomas.appendChild(linha);
    });
}