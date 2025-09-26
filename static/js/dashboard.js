// Dashboard JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard functionality
    initMobileMenu();
    initCardAnimations();
    initButtonInteractions();
    initResponsiveFeatures();
});

// Mobile menu functionality
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

// Card animations and interactions
function initCardAnimations() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        });
        
        // Add click animation
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Button interactions and animations
function initButtonInteractions() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // Add ripple effect on click
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Add CSS for ripple animation
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    });
    
    // Specific button actions
    const editBtn = document.querySelector('.btn-primary');
    const downloadBtns = document.querySelectorAll('.btn-secondary');
    const suggestionsBtn = document.querySelector('.btn-outline');
    
    // Button interactions removed to improve performance
}

// Responsive features
function initResponsiveFeatures() {
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResponsiveChanges, 250);
    });
    
    // Initial responsive setup
    handleResponsiveChanges();
}

function handleResponsiveChanges() {
    const cards = document.querySelectorAll('.card');
    
    if (window.innerWidth <= 768) {
        // Mobile optimizations
        cards.forEach(card => {
            card.style.marginBottom = '15px';
        });
    } else {
        // Desktop optimizations
        cards.forEach(card => {
            card.style.marginBottom = '0';
        });
    }
}

// Notification system removed for better performance

// Sidebar navigation interactions
function initSidebarNavigation() {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
        });
    });
}

// Initialize sidebar navigation
initSidebarNavigation();

// Smooth scrolling for any anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading states for buttons
function addLoadingState(button, text = 'Carregando...') {
    const originalText = button.textContent;
    button.textContent = text;
    button.disabled = true;
    button.style.opacity = '0.7';
    
    return function removeLoadingState() {
        button.textContent = originalText;
        button.disabled = false;
        button.style.opacity = '1';
    };
}


// Export functions for potential use in other scripts
window.DashboardUtils = {
    addLoadingState,
    handleResponsiveChanges
};
