// JavaScript para a página de Planos sem Sidebar

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const planoGratuitoBtn = document.getElementById('plano-gratuito');
    const planoPremiumBtn = document.getElementById('plano-premium');
    const ctaPremiumBtn = document.getElementById('cta-premium');
    const ctaGratuitoBtn = document.getElementById('cta-gratuito');
    const faqItems = document.querySelectorAll('.faq-item');

    // Redirecionamento para login/cadastro
    function redirectToAuth(planType) {
        // Salva o tipo de plano no localStorage
        localStorage.setItem('selectedPlan', planType);
        
        // Redireciona para a página de login
        window.location.href = 'login.html';
    }

    // Event listeners para botões de plano
    planoGratuitoBtn.addEventListener('click', function() {
        redirectToAuth('gratuito');
    });

    planoPremiumBtn.addEventListener('click', function() {
        redirectToAuth('premium');
    });

    ctaPremiumBtn.addEventListener('click', function() {
        redirectToAuth('premium');
    });

    ctaGratuitoBtn.addEventListener('click', function() {
        redirectToAuth('gratuito');
    });

    // FAQ Accordion
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Fecha outros itens
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle do item atual
            item.classList.toggle('active');
        });
    });

    // Animação de entrada dos elementos
    function animateOnScroll() {
        const elements = document.querySelectorAll('.plan-card, .benefit-card, .testimonial-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Inicializa animações
    function initAnimations() {
        const elements = document.querySelectorAll('.plan-card, .benefit-card, .testimonial-card');
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        // Anima elementos visíveis
        setTimeout(animateOnScroll, 100);
    }

    // Scroll listener para animações
    window.addEventListener('scroll', animateOnScroll);
    
    // Inicializa animações
    initAnimations();

    // Efeito de hover nos cards
    const planCards = document.querySelectorAll('.plan-card');
    planCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0)';
            } else {
                this.style.transform = 'scale(1.05)';
            }
        });
    });

    // Contador animado para estatísticas
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        }
        
        updateCounter();
    }

    // Anima contadores quando visíveis
    function animateCounters() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const text = stat.textContent;
            const target = parseInt(text.replace(/[^\d]/g, ''));
            
            if (target && !stat.classList.contains('animated')) {
                stat.classList.add('animated');
                animateCounter(stat, target);
            }
        });
    }

    // Observer para animar contadores
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
            }
        });
    });

    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        observer.observe(heroSection);
    }

    // Efeito de parallax suave
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.benefit-icon, .author-avatar');
        
        parallaxElements.forEach(element => {
            const speed = 0.3;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);

    // Sistema de notificações
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Estilos da notificação
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : '#3498db'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Anima entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove após 3 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Adiciona efeito de brilho nos botões premium
    const premiumButtons = document.querySelectorAll('.btn-premium');
    premiumButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #0a8ba0 0%, #00d4f0 100%)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(135deg, #097992 0%, #00bdde 100%)';
        });
    });

    // Smooth scroll para links internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Adiciona indicador de scroll progress
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        let progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: linear-gradient(90deg, #097992, #00bdde);
                z-index: 10000;
                transition: width 0.1s ease;
            `;
            document.body.appendChild(progressBar);
        }
        
        progressBar.style.width = scrollPercent + '%';
    }

    window.addEventListener('scroll', updateScrollProgress);

    // Efeito de digitação no título principal
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Inicializa efeito de digitação no título principal
    const mainTitle = document.querySelector('.hero-title');
    if (mainTitle) {
        const originalText = mainTitle.textContent;
        setTimeout(() => {
            typeWriter(mainTitle, originalText, 80);
        }, 500);
    }

    // Adiciona classe de scroll ao header
    function updateHeaderOnScroll() {
        const header = document.querySelector('.planos-header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(1, 61, 82, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#013D52';
            header.style.backdropFilter = 'none';
        }
    }

    window.addEventListener('scroll', updateHeaderOnScroll);

    console.log('Página de planos carregada com sucesso!');
});
