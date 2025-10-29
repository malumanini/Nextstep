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