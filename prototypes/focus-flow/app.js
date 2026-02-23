// Focus Flow - AI-Powered Deep Work Assistant
// Professional prototype with simulated AI behavior

class FocusFlow {
    constructor() {
        this.state = {
            isActive: false,
            duration: 50, // minutes
            remaining: 50 * 60, // seconds
            task: '',
            blocked: 0,
            deferred: 0,
            urgent: 0,
            activities: []
        };
        
        this.timer = null;
        this.aiSimulator = null;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.setupDurationButtons();
    }
    
    bindEvents() {
        const startBtn = document.getElementById('startBtn');
        const endBtn = document.getElementById('endBtn');
        const taskInput = document.getElementById('task');
        
        startBtn.addEventListener('click', () => this.startSession());
        endBtn.addEventListener('click', () => this.endSession());
        
        // Store task input
        taskInput.addEventListener('input', (e) => {
            this.state.task = e.target.value;
        });
    }
    
    setupDurationButtons() {
        const buttons = document.querySelectorAll('.duration-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Remove active from all
                buttons.forEach(b => b.classList.remove('active'));
                // Add active to clicked
                e.target.classList.add('active');
                
                // Set duration
                const text = e.target.textContent.trim();
                if (text.includes('25')) {
                    this.state.duration = 25;
                } else if (text.includes('50')) {
                    this.state.duration = 50;
                } else if (text.includes('90')) {
                    this.state.duration = 90;
                } else if (text.includes('Custom')) {
                    const custom = prompt('Enter duration in minutes:', '60');
                    if (custom) {
                        this.state.duration = parseInt(custom);
                    }
                }
            });
        });
    }
    
    startSession() {
        const taskInput = document.getElementById('task');
        const task = taskInput.value.trim() || 'Deep Work Session';
        
        this.state.task = task;
        this.state.remaining = this.state.duration * 60;
        this.state.blocked = 0;
        this.state.deferred = 0;
        this.state.urgent = 0;
        this.state.activities = [];
        this.state.isActive = true;
        
        // Update UI
        document.getElementById('focusTask').textContent = task;
        document.getElementById('timerValue').textContent = this.formatTime(this.state.remaining);
        document.getElementById('blockedCount').textContent = '0';
        document.getElementById('deferredCount').textContent = '0';
        document.getElementById('urgentCount').textContent = '0';
        document.getElementById('activityList').innerHTML = '';
        
        // Show overlay
        const overlay = document.getElementById('focusOverlay');
        overlay.classList.add('active');
        
        // Start timer
        this.startTimer();
        
        // Start AI simulation
        this.startAISimulation();
    }
    
    endSession() {
        this.state.isActive = false;
        
        // Stop timer
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        
        // Stop AI simulation
        if (this.aiSimulator) {
            clearTimeout(this.aiSimulator);
            this.aiSimulator = null;
        }
        
        // Hide overlay
        const overlay = document.getElementById('focusOverlay');
        overlay.classList.remove('active');
        
        // Show completion message
        const elapsed = this.state.duration * 60 - this.state.remaining;
        const elapsedMin = Math.floor(elapsed / 60);
        
        alert(`Session complete! 🎉\n\nYou focused for ${elapsedMin} minutes.\nAI blocked ${this.state.blocked} interruptions.\n\nGreat work!`);
    }
    
    startTimer() {
        const timerCircle = document.getElementById('timerCircle');
        const circumference = 2 * Math.PI * 120; // radius = 120
        
        this.timer = setInterval(() => {
            if (this.state.remaining <= 0) {
                this.endSession();
                return;
            }
            
            this.state.remaining--;
            
            // Update timer display
            document.getElementById('timerValue').textContent = this.formatTime(this.state.remaining);
            
            // Update progress ring
            const progress = this.state.remaining / (this.state.duration * 60);
            const offset = circumference * (1 - progress);
            timerCircle.style.strokeDashoffset = offset;
        }, 1000);
    }
    
    startAISimulation() {
        if (!this.state.isActive) return;
        
        // Simulate AI handling interruptions every 10-30 seconds
        const delay = Math.random() * 20000 + 10000; // 10-30 seconds
        
        this.aiSimulator = setTimeout(() => {
            this.simulateInterruption();
            this.startAISimulation(); // Schedule next
        }, delay);
    }
    
    simulateInterruption() {
        const interruptions = [
            {
                type: 'blocked',
                icon: '🚫',
                sender: 'colleague@company.com',
                message: 'Quick question about the meeting',
                action: 'Auto-replied: "In focus mode, will respond at 2:30 PM"'
            },
            {
                type: 'blocked',
                icon: '📧',
                sender: 'newsletter@service.com',
                message: 'Weekly digest is ready',
                action: 'Filtered to Later folder'
            },
            {
                type: 'deferred',
                icon: '💬',
                sender: 'Slack: #general',
                message: 'Team discussing lunch plans',
                action: 'Deferred until break time'
            },
            {
                type: 'blocked',
                icon: '📱',
                sender: 'friend',
                message: 'Hey, you free tonight?',
                action: 'Auto-replied: "In deep work, will ping you later!"'
            },
            {
                type: 'urgent',
                icon: '🔴',
                sender: 'boss@company.com',
                message: 'Need your input on urgent client issue',
                action: 'Flagged as urgent - notification sent'
            },
            {
                type: 'deferred',
                icon: '🔔',
                sender: 'Calendar',
                message: 'Meeting in 1 hour',
                action: 'Reminder deferred to 15 min before'
            },
            {
                type: 'blocked',
                icon: '🎮',
                sender: 'App Store',
                message: 'Game update available',
                action: 'Blocked - scheduled for later'
            }
        ];
        
        const interruption = interruptions[Math.floor(Math.random() * interruptions.length)];
        
        // Update counters
        if (interruption.type === 'blocked') {
            this.state.blocked++;
            document.getElementById('blockedCount').textContent = this.state.blocked;
        } else if (interruption.type === 'deferred') {
            this.state.deferred++;
            document.getElementById('deferredCount').textContent = this.state.deferred;
        } else if (interruption.type === 'urgent') {
            this.state.urgent++;
            document.getElementById('urgentCount').textContent = this.state.urgent;
        }
        
        // Add to activity list
        this.addActivity(interruption);
    }
    
    addActivity(interruption) {
        const activityList = document.getElementById('activityList');
        
        const item = document.createElement('div');
        item.className = 'activity-item';
        item.innerHTML = `
            <div class="activity-icon">${interruption.icon}</div>
            <div class="activity-content">
                <div class="activity-sender">${interruption.sender}</div>
                <div class="activity-message">${interruption.message}</div>
                <div class="activity-action">→ ${interruption.action}</div>
            </div>
        `;
        
        // Insert at top
        activityList.insertBefore(item, activityList.firstChild);
        
        // Keep max 10 items
        while (activityList.children.length > 10) {
            activityList.removeChild(activityList.lastChild);
        }
        
        // Store in state
        this.state.activities.unshift(interruption);
        if (this.state.activities.length > 10) {
            this.state.activities.pop();
        }
    }
    
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    new FocusFlow();
});

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Escape to exit focus mode
    if (e.key === 'Escape') {
        const overlay = document.getElementById('focusOverlay');
        if (overlay.classList.contains('active')) {
            document.getElementById('endBtn').click();
        }
    }
    
    // Cmd/Ctrl + Enter to start session
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        const overlay = document.getElementById('focusOverlay');
        if (!overlay.classList.contains('active')) {
            document.getElementById('startBtn').click();
        }
    }
});
