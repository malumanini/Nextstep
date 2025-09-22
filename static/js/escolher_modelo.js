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

});
