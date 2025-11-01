// Main application JavaScript
class SmartAttendanceSystem {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        this.initializeSidebar();
        this.loadUserData();
        this.initializeEventListeners();
        this.checkNotifications();
    }

    initializeSidebar() {
        const sidebarToggle = document.getElementById('sidebarToggle');
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');

        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                sidebar.classList.toggle('active');
                mainContent.classList.toggle('sidebar-active');
            });
        }
    }

    loadUserData() {
        // Load user data from session/local storage or API
        const userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
        this.currentUser = userData;
        
        this.updateUIWithUserData();
    }

    updateUIWithUserData() {
        // Update UI elements with user data
        const userNameElement = document.getElementById('userName');
        const userRoleElement = document.getElementById('userRole');
        const studentNameElement = document.getElementById('studentName');

        if (userNameElement && this.currentUser.name) {
            userNameElement.textContent = this.currentUser.name;
        }

        if (userRoleElement && this.currentUser.role) {
            userRoleElement.textContent = this.currentUser.role;
        }

        if (studentNameElement && this.currentUser.name) {
            studentNameElement.textContent = this.currentUser.name;
        }
    }

    initializeEventListeners() {
        // Logout functionality
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }

        // Notification bell
        const notificationBell = document.querySelector('.notification-bell');
        if (notificationBell) {
            notificationBell.addEventListener('click', () => this.showNotifications());
        }

        // Update current date
        this.updateCurrentDate();
    }

    updateCurrentDate() {
        const dateElements = document.querySelectorAll('#currentDate');
        const now = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = now.toLocaleDateString('en-US', options);

        dateElements.forEach(element => {
            element.textContent = formattedDate;
        });
    }

    async checkNotifications() {
        try {
            // Simulate API call to check notifications
            const response = await this.apiCall('/api/notifications/count');
            if (response && response.count > 0) {
                this.updateNotificationCount(response.count);
            }
        } catch (error) {
            console.error('Error checking notifications:', error);
        }
    }

    updateNotificationCount(count) {
        const notificationCount = document.querySelector('.notification-count');
        if (notificationCount) {
            notificationCount.textContent = count;
            notificationCount.style.display = 'flex';
        }
    }

    showNotifications() {
        // Implement notification panel
        console.log('Show notifications panel');
    }

    logout() {
        // Clear user data and redirect to login
        localStorage.removeItem('currentUser');
        sessionStorage.clear();
        window.location.href = 'index.html';
    }

    async apiCall(endpoint, options = {}) {
        // Generic API call function
        try {
            const response = await fetch(endpoint, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.currentUser?.token}`
                },
                ...options
            });

            if (!response.ok) {
                throw new Error(`API call failed: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API call error:', error);
            throw error;
        }
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new SmartAttendanceSystem();
});

// Utility functions
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function showToast(message, type = 'info') {
    // Implement toast notification
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 10000;
        border-left: 4px solid var(--${type}-color);
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Global functions for button actions
function viewAttendance() {
    window.location.href = 'attendance.html';
}

function payFees() {
    window.location.href = 'fees.html';
}

function viewNotices() {
    window.location.href = 'notices.html';
}

function downloadMaterial() {
    window.location.href = 'study-material.html';
}

function markAttendanceQuick() {
    window.location.href = 'mark-attendance.html';
}

function sendNotice() {
    window.location.href = 'send-notice.html';
}

