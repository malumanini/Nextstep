// Conta Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize form handlers
    initFormHandlers();
});

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (mobileMenuToggle && sidebar) {
        mobileMenuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('open');
            
            // Animate hamburger icon
            const lines = mobileMenuToggle.querySelectorAll('.hamburger-line');
            lines.forEach((line, index) => {
                if (sidebar.classList.contains('open')) {
                    if (index === 0) line.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) line.style.opacity = '0';
                    if (index === 2) line.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    line.style.transform = 'none';
                    line.style.opacity = '1';
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!sidebar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                sidebar.classList.remove('open');
                const lines = mobileMenuToggle.querySelectorAll('.hamburger-line');
                lines.forEach(line => {
                    line.style.transform = 'none';
                    line.style.opacity = '1';
                });
            }
        });
        
        // Close menu when clicking on links
        const sidebarLinks = document.querySelectorAll('.sidebar-link');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', function() {
                sidebar.classList.remove('open');
                const lines = mobileMenuToggle.querySelectorAll('.hamburger-line');
                lines.forEach(line => {
                    line.style.transform = 'none';
                    line.style.opacity = '1';
                });
            });
        });
    }
}

// Form Handlers
function initFormHandlers() {
    // Profile form
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleProfileUpdate();
        });
    }
    
    // Security form
    const securityForm = document.getElementById('security-form');
    if (securityForm) {
        securityForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handlePasswordChange();
        });
    }
    
    // Real-time validation
    initFormValidation();
}

// Profile Update Handler
function handleProfileUpdate() {
    const form = document.getElementById('profile-form');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Show loading state
    form.classList.add('loading');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Salvando...';
    
    // Simulate API call
    setTimeout(() => {
        form.classList.remove('loading');
        submitBtn.innerHTML = '<i class="fas fa-save"></i> Salvar Alterações';
        
        showMessage('Informações pessoais atualizadas com sucesso!', 'success');
    }, 1500);
}

// Password Change Handler
function handlePasswordChange() {
    const form = document.getElementById('security-form');
    const submitBtn = form.querySelector('button[type="submit"]');
    const newPassword = document.getElementById('nova-senha').value;
    const confirmPassword = document.getElementById('confirmar-senha').value;
    
    // Validate passwords
    if (newPassword !== confirmPassword) {
        showMessage('As senhas não coincidem. Tente novamente.', 'error');
        return;
    }
    
    if (newPassword.length < 6) {
        showMessage('A nova senha deve ter pelo menos 6 caracteres.', 'error');
        return;
    }
    
    // Show loading state
    form.classList.add('loading');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Alterando...';
    
    // Simulate API call
    setTimeout(() => {
        form.classList.remove('loading');
        submitBtn.innerHTML = '<i class="fas fa-key"></i> Alterar Senha';
        
        // Clear form
        form.reset();
        
        showMessage('Senha alterada com sucesso!', 'success');
    }, 1500);
}

// Form Validation
function initFormValidation() {
    // Email validation
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const email = this.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email && !emailRegex.test(email)) {
                this.style.borderColor = '#e74c3c';
            } else {
                this.style.borderColor = '#27ae60';
            }
        });
    }
    
    // Phone validation
    const phoneInput = document.getElementById('telefone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length >= 11) {
                value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 7) {
                value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
            } else if (value.length >= 3) {
                value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
            }
            this.value = value;
        });
    }
    
    // Password confirmation
    const newPassword = document.getElementById('nova-senha');
    const confirmPassword = document.getElementById('confirmar-senha');
    
    if (newPassword && confirmPassword) {
        confirmPassword.addEventListener('input', function() {
            if (this.value && this.value !== newPassword.value) {
                this.style.borderColor = '#e74c3c';
            } else {
                this.style.borderColor = '#27ae60';
            }
        });
    }
}

// Utility Functions
function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.display = 'block';
    
    // Insert at the top of the main content
    const mainContent = document.querySelector('.main-content');
    const pageHeader = document.querySelector('.page-header');
    mainContent.insertBefore(messageDiv, pageHeader.nextSibling);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(-10px)';
        setTimeout(() => messageDiv.remove(), 300);
    }, 5000);
}
