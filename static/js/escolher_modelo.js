// JavaScript para a página de Escolha de Modelo de Currículo

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const templateCards = document.querySelectorAll('.template-card');
    const categoriaSelect = document.getElementById('categoria');
    const corSelect = document.getElementById('cor');
    const corPrincipalInput = document.getElementById('cor-principal');
    const colorPresets = document.querySelectorAll('.color-preset');
    const fonteSelect = document.getElementById('fonte');
    const gerarCurriculoBtn = document.getElementById('gerar-curriculo');
    
    let selectedTemplate = null;
    let selectedColor = '#013D52';
    let selectedFont = 'Arial';

    // Filtros de categoria e cor
    function applyFilters() {
        const categoria = categoriaSelect.value;
        const cor = corSelect.value;
        
        templateCards.forEach(card => {
            const cardCategoria = card.dataset.categoria;
            const cardCor = card.dataset.cor;
            
            let showCard = true;
            
            if (categoria !== 'todos' && cardCategoria !== categoria) {
                showCard = false;
            }
            
            if (cor !== 'todos' && cardCor !== cor) {
                showCard = false;
            }
            
            card.style.display = showCard ? 'block' : 'none';
        });
    }
    
    // Seleção de template
    function selectTemplate(card) {
        // Remove seleção anterior
        templateCards.forEach(c => c.classList.remove('selected'));
        
        // Adiciona seleção atual
        card.classList.add('selected');
        selectedTemplate = card;
        
        // Atualiza botão
        const btn = card.querySelector('.template-select-btn');
        btn.innerHTML = '<i class="fas fa-check"></i> Selecionado';
        btn.classList.add('selected');
        
        // Remove seleção dos outros botões
        document.querySelectorAll('.template-select-btn').forEach(b => {
            if (b !== btn) {
                b.innerHTML = '<i class="fas fa-check"></i> Selecionar';
                b.classList.remove('selected');
            }
        });
    }

    // Personalização de cor
    function updateColorPresets() {
        colorPresets.forEach(preset => {
            preset.classList.remove('active');
            if (preset.dataset.color === selectedColor) {
                preset.classList.add('active');
            }
        });
    }

    // Event listeners
    categoriaSelect.addEventListener('change', applyFilters);
    corSelect.addEventListener('change', applyFilters);

    templateCards.forEach(card => {
        card.addEventListener('click', function() {
            selectTemplate(this);
        });
        
        // Previne seleção dupla ao clicar no botão
        const btn = card.querySelector('.template-select-btn');
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            selectTemplate(card);
        });
    });

    // Personalização de cor
    corPrincipalInput.addEventListener('change', function() {
        selectedColor = this.value;
        updateColorPresets();
    });

    colorPresets.forEach(preset => {
        preset.addEventListener('click', function() {
            selectedColor = this.dataset.color;
            corPrincipalInput.value = selectedColor;
            updateColorPresets();
        });
    });

    // Personalização de fonte
    fonteSelect.addEventListener('change', function() {
        selectedFont = this.value;
    });

     // Geração do currículo
     gerarCurriculoBtn.addEventListener('click', function() {
        if (!selectedTemplate) {
            alert('Por favor, selecione um modelo de currículo primeiro!');
            return;
        }

        // Simula loading
        this.classList.add('loading');
        this.innerHTML = '<i class="fas fa-spinner"></i> Gerando Currículo...';
        this.disabled = true;

        // Simula processamento
        setTimeout(() => {
            // Aqui você pode redirecionar para a página de geração ou fazer a lógica de geração
            const templateName = selectedTemplate.querySelector('.template-name').textContent;
            const personalizacao = {
                template: templateName,
                cor: selectedColor,
                fonte: selectedFont
            };

            // Salva as preferências no localStorage
            localStorage.setItem('curriculoPersonalizacao', JSON.stringify(personalizacao));
            
            // Redireciona para a página de geração
            window.location.href = 'gerador_curriculo.html';
        }, 2000);
    });

    // Carrega personalizações salvas
    function loadSavedPreferences() {
        const saved = localStorage.getItem('curriculoPersonalizacao');
        if (saved) {
            const prefs = JSON.parse(saved);
            selectedColor = prefs.cor || '#013D52';
            selectedFont = prefs.fonte || 'Arial';
            
            corPrincipalInput.value = selectedColor;
            fonteSelect.value = selectedFont;
            updateColorPresets();
        }
    }

    // Inicialização
    loadSavedPreferences();
    applyFilters();

    // Animação de entrada dos cards
    templateCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Efeito de hover nos cards
    templateCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = 'translateY(-5px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });

    // Validação antes de gerar
    function validateSelection() {
        if (!selectedTemplate) {
            gerarCurriculoBtn.style.opacity = '0.5';
            gerarCurriculoBtn.style.cursor = 'not-allowed';
        } else {
            gerarCurriculoBtn.style.opacity = '1';
            gerarCurriculoBtn.style.cursor = 'pointer';
        }
    }

    // Atualiza validação quando template é selecionado
    templateCards.forEach(card => {
        card.addEventListener('click', validateSelection);
    });

    // Inicializa validação
    validateSelection();


});
