// Dashboard JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard functionality
    initSidebarToggle();
    initCardAnimations();
    initButtonInteractions();
    initResponsiveFeatures();
});

// Sidebar toggle for mobile
function initSidebarToggle() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    // Create mobile menu button
    const menuButton = document.createElement('button');
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    menuButton.className = 'mobile-menu-btn';
    menuButton.style.cssText = `
        display: none;
        position: fixed;
        top: 15px;
        left: 15px;
        z-index: 1001;
        background: #02465e;
        color: white;
        border: none;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1.2rem;
    `;
    
    document.body.appendChild(menuButton);
    
    // Toggle sidebar on mobile
    menuButton.addEventListener('click', function() {
        sidebar.classList.toggle('open');
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !menuButton.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        }
    });
    
    // Show/hide menu button based on screen size
    function handleResize() {
        if (window.innerWidth <= 768) {
            menuButton.style.display = 'block';
        } else {
            menuButton.style.display = 'none';
            sidebar.classList.remove('open');
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
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
    
    if (editBtn) {
        editBtn.addEventListener('click', function() {
            showNotification('Redirecionando para edição...', 'info');
        });
    }
    
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const format = this.textContent.includes('PDF') ? 'PDF' : 'DOCX';
            showNotification(`Baixando currículo em ${format}...`, 'success');
        });
    });
    
    if (suggestionsBtn) {
        suggestionsBtn.addEventListener('click', function() {
            showNotification('Carregando sugestões...', 'info');
        });
    }
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
    const sidebar = document.querySelector('.sidebar');
    
    if (window.innerWidth <= 768) {
        // Mobile optimizations
        cards.forEach(card => {
            card.style.marginBottom = '15px';
        });
        
        // Adjust sidebar for mobile
        if (sidebar) {
            sidebar.style.position = 'fixed';
            sidebar.style.top = '60px';
            sidebar.style.left = '0';
            sidebar.style.width = '100%';
            sidebar.style.maxWidth = '300px';
        }
    } else {
        // Desktop optimizations
        cards.forEach(card => {
            card.style.marginBottom = '0';
        });
        
        if (sidebar) {
            sidebar.style.position = 'fixed';
            sidebar.style.top = '60px';
            sidebar.style.left = '0';
            sidebar.style.width = '250px';
            sidebar.style.maxWidth = 'none';
        }
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1002;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Sidebar navigation interactions
function initSidebarNavigation() {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Show notification
            const linkText = this.querySelector('span').textContent;
            showNotification(`Navegando para: ${linkText}`, 'info');
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
    showNotification,
    addLoadingState,
    handleResponsiveChanges
};
