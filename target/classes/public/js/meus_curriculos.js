document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality (igual ao dashboard)
    initMobileMenu();

    // Currículo Actions
    const curriculoCards = document.querySelectorAll('.curriculo-card');

    // Responsive adjustments
    function handleResponsiveChanges() {
        const screenWidth = window.innerWidth;
        
        if (screenWidth <= 768) {
            // Mobile adjustments
            document.body.classList.add('mobile-view');
        } else {
            // Desktop adjustments
            document.body.classList.remove('mobile-view');
        }
    }

    // Listen for resize events
    window.addEventListener('resize', handleResponsiveChanges);
    
    // Initial call
    handleResponsiveChanges();
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
