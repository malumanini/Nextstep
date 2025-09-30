document.addEventListener('DOMContentLoaded', function() {
    const darkBtn = document.getElementById('darkmode-botao');
    // Aplica o modo salvo ao carregar a página
    if (localStorage.getItem('darkmode') === 'enabled') {
        document.body.classList.add('darkmode');
    }
    if (darkBtn) {
        darkBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const isDark = document.body.classList.toggle('darkmode');
            localStorage.setItem('darkmode', isDark ? 'enabled' : 'disabled');
        });
    }
});