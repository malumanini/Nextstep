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

});
