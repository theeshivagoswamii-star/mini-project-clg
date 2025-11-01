// Authentication functionality
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

async function handleLogin(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const loginData = {
        username: formData.get('username'),
        password: formData.get('password'),
        role: formData.get('role')
    };

    // Show loading state
    const submitBtn = event.target.querySelector('.btn-login');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    submitBtn.disabled = true;

    try {
        // Simulate API call
        const user = await authenticateUser(loginData);
        
        if (user) {
            // Store user data
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            // Redirect based on role
            redirectToDashboard(user.role);
        } else {
            showToast('Invalid credentials. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Login error:', error);
        showToast('Login failed. Please try again.', 'error');
    } finally {
        // Reset button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

async function authenticateUser(loginData) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo authentication - Replace with actual API call
    const demoUsers = {
        'student123': { id: 1, name: 'Shiva Giri', role: 'student', token: 'demo-token-student' },
        'teacher123': { id: 2, name: 'Asutosh Rao', role: 'teacher', token: 'demo-token-teacher' },
        'director123': { id: 3, name: 'Samiksha Singh', role: 'director', token: 'demo-token-director' }
    };

    const user = demoUsers[loginData.username];
    
    if (user && loginData.password === 'pass123' && user.role === loginData.role) {
        return user;
    }
    
    return null;
}

function redirectToDashboard(role) {
    const dashboards = {
        'student': 'student-dashboard.html',
        'teacher': 'teacher-dashboard.html',
        'director': 'director-dashboard.html'
    };
    
    window.location.href = dashboards[role] || 'dashboard.html';
}
