document.addEventListener('DOMContentLoaded', function() {
    // Admin Dashboard Functionality
    
    // Animate stats numbers on load
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const finalValue = stat.textContent;
            const isCurrency = finalValue.includes('R$');
            const isPercentage = finalValue.includes('%');
            
            let numericValue;
            if (isCurrency) {
                numericValue = parseFloat(finalValue.replace(/[R$\s,]/g, ''));
            } else if (isPercentage) {
                numericValue = parseFloat(finalValue.replace('%', ''));
            } else {
                numericValue = parseInt(finalValue.replace(/,/g, ''));
            }
            
            let currentValue = 0;
            const increment = numericValue / 50;
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= numericValue) {
                    currentValue = numericValue;
                    clearInterval(timer);
                }
                
                let displayValue;
                if (isCurrency) {
                    displayValue = `R$ ${Math.floor(currentValue).toLocaleString()}`;
                } else if (isPercentage) {
                    displayValue = `${Math.floor(currentValue)}%`;
                } else {
                    displayValue = Math.floor(currentValue).toLocaleString();
                }
                
                stat.textContent = displayValue;
            }, 30);
        });
    }

    // Initialize stats animation
    setTimeout(animateStats, 500);

    // Action buttons functionality
    const actionButtons = document.querySelectorAll('.action-card .btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const actionCard = this.closest('.action-card');
            const actionTitle = actionCard.querySelector('h3').textContent;
            
            // Show loading state
            const originalText = this.textContent;
            this.textContent = 'Carregando...';
            this.disabled = true;
            
            // Simulate action
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
                
                // Show success message
                showNotification(`${actionTitle} iniciado com sucesso!`, 'success');
            }, 1500);
        });
    });

    // System status monitoring
    function updateSystemStatus() {
        const statusIndicators = document.querySelectorAll('.status-indicator');
        
        statusIndicators.forEach(indicator => {
            const isOnline = Math.random() > 0.1; // 90% chance of being online
            
            if (isOnline) {
                indicator.className = 'status-indicator online';
                indicator.innerHTML = '<i class="fas fa-circle"></i> Online';
            } else {
                indicator.className = 'status-indicator offline';
                indicator.innerHTML = '<i class="fas fa-circle"></i> Offline';
            }
        });
    }

    // Update system status every 30 seconds
    setInterval(updateSystemStatus, 30000);

    // Real-time activity simulation
    function addRandomActivity() {
        const activities = [
            {
                icon: 'fas fa-user-plus',
                title: 'Novo usuário cadastrado',
                description: 'Um novo usuário se cadastrou no sistema',
                time: 'Agora mesmo'
            },
            {
                icon: 'fas fa-file-alt',
                title: 'Currículo gerado',
                description: 'Um novo currículo foi gerado',
                time: 'Agora mesmo'
            },
            {
                icon: 'fas fa-crown',
                title: 'Assinatura Premium',
                description: 'Um usuário assinou o plano Premium',
                time: 'Agora mesmo'
            },
            {
                icon: 'fas fa-download',
                title: 'Download realizado',
                description: 'Um usuário baixou seu currículo',
                time: 'Agora mesmo'
            }
        ];
        
        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        const activityList = document.querySelector('.activity-list');
        
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <div class="activity-icon">
                <i class="${randomActivity.icon}"></i>
            </div>
            <div class="activity-content">
                <h4>${randomActivity.title}</h4>
                <p>${randomActivity.description}</p>
                <span class="activity-time">${randomActivity.time}</span>
            </div>
        `;
        
        // Add to top of list
        activityList.insertBefore(activityItem, activityList.firstChild);
        
        // Remove old activities if more than 10
        const activitiesList = activityList.querySelectorAll('.activity-item');
        if (activitiesList.length > 10) {
            activitiesList[activitiesList.length - 1].remove();
        }
        
        // Add animation
        activityItem.style.opacity = '0';
        activityItem.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            activityItem.style.transition = 'all 0.3s ease';
            activityItem.style.opacity = '1';
            activityItem.style.transform = 'translateX(0)';
        }, 100);
    }

    // Add random activity every 2-5 minutes
    function scheduleRandomActivity() {
        const delay = Math.random() * 180000 + 120000; // 2-5 minutes
        setTimeout(() => {
            addRandomActivity();
            scheduleRandomActivity();
        }, delay);
    }

    // Start random activity simulation
    scheduleRandomActivity();

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.admin-notification');
        existingNotifications.forEach(notification => notification.remove());
        
        const notification = document.createElement('div');
        notification.className = `admin-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
            color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
            border: 1px solid ${type === 'success' ? '#c3e6cb' : type === 'error' ? '#f5c6cb' : '#bee5eb'};
            border-radius: 8px;
            padding: 15px 20px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 10px;
            max-width: 400px;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });
    }

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
            flex: 1;
        }
        
        .notification-close {
            background: none;
            border: none;
            cursor: pointer;
            padding: 5px;
            border-radius: 4px;
            transition: background-color 0.2s;
        }
        
        .notification-close:hover {
            background: rgba(0,0,0,0.1);
        }
    `;
    document.head.appendChild(style);

    // Initialize dashboard
    console.log('Painel Administrativo NextStep carregado com sucesso!');
});
