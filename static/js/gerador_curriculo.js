document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality (igual ao dashboard)
    initMobileMenu();

        // Máscara para telefone 
        document.getElementById('telefone').addEventListener('input', function(e) {
            let v = e.target.value.replace(/\D/g, '');
            if (v.length > 11) v = v.slice(0, 11);
            let r = '';
            if (v.length > 1) r += '(' + v.slice(0, 2) + ') ';
            if (v.length > 7) r += v.slice(2, 7) + '-' + v.slice(7);
            else if (v.length > 2) r += v.slice(2);
            e.target.value = r.trim();
        });

        // Funções para adicionar campos dinâmicos
        function adicionarExperiencia() {
            const lista = document.getElementById('experiencia-lista');
            const bloco = document.createElement('div');
            bloco.innerHTML = `
                <div class="linha-form">
                    <div class="campo">
                        <label>Empresa</label>
                        <input type="text" name="empresa[]" placeholder="Nome da empresa" required>
                    </div>
                    <div class="campo">
                        <label>Cargo</label>
                        <input type="text" name="cargo[]" placeholder="Seu cargo" required>
                    </div>
                    <button class="remover" type="button" onclick="this.parentElement.parentElement.remove()">🗑️</button>
                </div>
                <div class="linha-form">
                    <div class="campo">
                        <label>Data de Início</label>
                        <input type="text" name="inicio[]" placeholder="MM/AAAA" required pattern="^(0[1-9]|1[0-2])\/\\d{4}$">
                    </div>
                    <div class="campo">
                        <label>Data de Término</label>
                        <input type="text" name="fim[]" placeholder="MM/AAAA ou 'Atual'" required>
                    </div>
                </div>
                <div class="campo">
                    <label>Responsabilidades e Conquistas</label>
                    <textarea name="responsabilidades[]" placeholder="Descreva suas principais atividades..." required></textarea>
                </div>
            `;
            lista.appendChild(bloco);
        }

        function adicionarFormacao() {
            const lista = document.getElementById('formacao-lista');
            const bloco = document.createElement('div');
            bloco.innerHTML = `
                <div class="linha-form">
                    <div class="campo">
                        <label>Instituição</label>
                        <input type="text" name="instituicao[]" placeholder="Nome da instituição" required>
                    </div>
                    <div class="campo">
                        <label>Curso</label>
                        <input type="text" name="curso[]" placeholder="Nome do curso" required>
                    </div>
                    <button class="remover" type="button" onclick="this.parentElement.parentElement.remove()">🗑️</button>
                </div>
                <div class="linha-form">
                    <div class="campo">
                        <label>Ano de Conclusão</label>
                        <input type="text" name="ano[]" placeholder="AAAA" required pattern="^\\d{4}$">
                    </div>
                </div>
            `;
            lista.appendChild(bloco);
        }

        function adicionarHabilidade() {
            const lista = document.getElementById('habilidades-lista');
            const bloco = document.createElement('div');
            bloco.innerHTML = `
                <div class="linha-form">
                    <div class="campo" style="flex:2;">
                        <input type="text" name="habilidade[]" placeholder="Ex: JavaScript" required>
                    </div>
                    <button class="remover" type="button" onclick="this.parentElement.parentElement.remove()">🗑️</button>
                </div>
            `;
            lista.appendChild(bloco);
        }

        function adicionarIdioma() {
            const lista = document.getElementById('idiomas-lista');
            const bloco = document.createElement('div');
            bloco.innerHTML = `
                <div class="linha-form">
                    <div class="campo" style="flex:2;">
                        <input type="text" name="idioma[]" placeholder="Ex: Inglês (Fluente)" required>
                    </div>
                    <button class="remover" type="button" onclick="this.parentElement.parentElement.remove()">🗑️</button>
                </div>
            `;
            lista.appendChild(bloco);
        }

    // Mobile menu functionality (igual ao dashboard)
    function initMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const sidebar = document.querySelector('.sidebar');

        if (mobileMenuToggle && sidebar) {
            mobileMenuToggle.addEventListener('click', function() {
                sidebar.classList.toggle('open');
                mobileMenuToggle.classList.toggle('active');
            });

            // Fechar menu ao clicar em um link
            const sidebarLinks = document.querySelectorAll('.sidebar-link');
            sidebarLinks.forEach(link => {
                link.addEventListener('click', function() {
                    sidebar.classList.remove('open');
                    mobileMenuToggle.classList.remove('active');
                });
            });

            // Fechar menu ao clicar fora
            document.addEventListener('click', function(e) {
                if (!sidebar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                    sidebar.classList.remove('open');
                    mobileMenuToggle.classList.remove('active');
                }
            });
        }
    }
});