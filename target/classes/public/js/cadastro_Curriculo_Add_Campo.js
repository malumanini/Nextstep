// ========================================
// == Campo de Experiência Profissional  ==
// ========================================

function adicionarExperiencia() {
    const lista = document.getElementById("experiencia-lista");

    const novaExperiencia = document.createElement("div");

    novaExperiencia.classList.add("item-experiencia"); 

    novaExperiencia.innerHTML = `
        <div class="linha-form">
            <div class="campo">
                <label>Empresa</label>
                <input type="text" name="empresa" placeholder="Nome da empresa" required> 
            </div>
            <div class="campo">
                <label>Cargo</label>
                <input type="text" name="cargo" placeholder="Seu cargo" required> 
            </div>
        </div>
        <div class="linha-form">
            <div class="campo">
                <label>Data de Início</label>
                <input type="text" name="dataInicio" placeholder="MM/AAAA" required pattern="^(0[1-9]|1[0-2])\\/\\d{4}$"> 
            </div>
            <div class="campo">
                <label>Data de Término</label>
                <input type="text" name="dataFim" placeholder="MM/AAAA ou 'Atual'" required> 
            </div>
        </div>
        <div class="campo">
            <label>Responsabilidades e Conquistas</label>
            <textarea name="descricao" placeholder="Descreva suas principais atividades..." required></textarea> 
        </div>
        <div class="botoes-experiencia">
            <button type="button" class="remover-experiencia">Remover</button>
        </div>
        <hr>
    `;

    lista.appendChild(novaExperiencia);

    novaExperiencia.querySelector(".remover-experiencia").addEventListener("click", () => {
        novaExperiencia.remove();
    });
}

document.getElementById("adicionar-experiencia").addEventListener("click", (e) => {
    e.preventDefault();
    adicionarExperiencia();
});

// ==================================
// == Campo de Formação Acadêmica  ==
// ==================================

function adicionarFormacao() {
    const lista = document.getElementById("formacao-lista");

    const novaFormacao = document.createElement("div");
    // CORREÇÃO 7: Usar a classe correta para o bloco principal (como no HTML)
    novaFormacao.classList.add("item-formacao"); 

    novaFormacao.innerHTML = `
        <div class="linha-form">
            <div class="campo">
                <label>Instituição</label>
                <input type="text" name="instituicao" placeholder="Nome da instituição" required>
            </div>
            <div class="campo">
                <label>Curso</label>
                <input type="text" name="curso" placeholder="Nome do curso" required>
            </div>
        </div>
        <div class="linha-form">
            <div class="campo">
                <label>Data Inicio</label>
                <input type="text" name="dataInicio" placeholder="AAAA" required pattern="^\\d{4}$">
            </div>
             <div class="campo">
                <label>Data Fim</label>
                <input type="text" name="dataFim" placeholder="AAAA" required pattern="^\\d{4}$">
            </div>
        </div>
        <div class="botoes-formacao">
            <button type="button" class="remover-formacao">Remover</button>
        </div>
        <hr>
    `;

    lista.appendChild(novaFormacao);

    novaFormacao.querySelector(".remover-formacao").addEventListener("click", () => {
        novaFormacao.remove();
    });
}

document.getElementById("adicionar-formacao").addEventListener("click", (e) => {
    e.preventDefault();
    adicionarFormacao();
});


// ==========================
// == Campo de Habilidade  ==
// ==========================

function adicionarHabilidade() {
    const lista = document.getElementById("habilidades-lista");

    const novaHabilidade = document.createElement("div");
    // Não precisa de correção de classe, pois é uma lista plana.
    novaHabilidade.classList.add("linha-form"); 

    novaHabilidade.innerHTML = `
        <div class="linha-form">
            <div class="campo" style="flex:2;">
                <input type="text" name="nome" placeholder="Ex: JavaScript" required>
            </div>
            <div class="botoes-habilidade">
                <button type="button" class="remover-habilidade">Remover</button>
            </div>
        </div>
        <hr>
    `;

    lista.appendChild(novaHabilidade);

    novaHabilidade.querySelector(".remover-habilidade").addEventListener("click", () => {
        novaHabilidade.remove();
    });
}

document.getElementById("adicionar-habilidade").addEventListener("click", (e) => {
    e.preventDefault();
    adicionarHabilidade();
});


// =======================
// == Campo de Idioma  ==
// =======================

function adicionarIdioma() {
    const lista = document.getElementById("idiomas-lista");

    const novoIdioma = document.createElement("div");
    // Não precisa de correção de classe, pois é uma lista plana.
    novoIdioma.classList.add("linha-form"); 

    novoIdioma.innerHTML = `
        <div class="linha-form">
            <div class="campo" style="flex:2;">
                <input type="text" name="nome" placeholder="Ex: Inglês (Fluente)" required>
            </div>
            <div class="botoes-idioma">
                <button type="button" class="remover-idioma">Remover</button>
            </div>
        </div>
        <hr>
    `;

    lista.appendChild(novoIdioma);

    novoIdioma.querySelector(".remover-idioma").addEventListener("click", () => {
        novoIdioma.remove();
    });
}

document.getElementById("adicionar-idioma").addEventListener("click", (e) => {
    e.preventDefault();
    adicionarIdioma();
});