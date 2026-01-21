/**
 * Authentication Module
 * Handles user login, validation, and session management
 */

// Get form elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const rememberCheckbox = document.getElementById('remember');

// Initialize auth module
document.addEventListener('DOMContentLoaded', function() {
    console.log('Auth module loaded');
    checkExistingSession();
    setupFormListeners();
});

/**
 * Setup form event listeners
 */
function setupFormListeners() {
    loginForm.addEventListener('submit', handleLogin);
    emailInput.addEventListener('blur', validateEmail);
    passwordInput.addEventListener('blur', validatePassword);
}

/**
 * Handle form submission
 */
function handleLogin(event) {
    event.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    // Validate inputs
    if (!validateEmail(null, email)) {
        showError('Please enter a valid email address');
        return;
    }
    
    if (!validatePassword(null, password)) {
        showError('Password must be at least 6 characters');
        return;
    }
    
    // Simulate authentication
    performLogin(email, password);
}

/**
 * Validate email format
 */
function validateEmail(event, emailValue = null) {
    const email = emailValue || emailInput.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        showFieldError(emailInput, 'Invalid email format');
        return false;
    }
    
    clearFieldError(emailInput);
    return true;
}

/**
 * Validate password
 */
function validatePassword(event, passwordValue = null) {
    const password = passwordValue || passwordInput.value;
    
    if (password.length < 6) {
        showFieldError(passwordInput, 'Password must be at least 6 characters');
        return false;
    }
    
    clearFieldError(passwordInput);
    return true;
}

/**
 * Perform login authentication
 */
function performLogin(email, password) {
    // Show loading state
    const submitBtn = loginForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Logging in...';
    submitBtn.disabled = true;
    
    // Simulate API call with delay
    setTimeout(() => {
        // Demo: Accept any valid email/password combo
        const user = {
            email: email,
            loginTime: new Date().toISOString(),
            remember: rememberCheckbox.checked
        };
        
        // Store session
        if (rememberCheckbox.checked) {
            localStorage.setItem('user', JSON.stringify(user));
            console.log('User session saved to localStorage');
        } else {
            sessionStorage.setItem('user', JSON.stringify(user));
            console.log('User session saved to sessionStorage');
        }
        
        // Show success message
        showSuccess('Login successful! Welcome, ' + email);
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Redirect after delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }, 1500);
}

/**
 * Check for existing session
 */
function checkExistingSession() {
    const user = localStorage.getItem('user') || sessionStorage.getItem('user');
    
    if (user) {
        const userData = JSON.parse(user);
        console.log('Existing session found for:', userData.email);
        // Auto-fill email if session exists
        emailInput.value = userData.email;
    }
}

/**
 * Show error message
 */
function showError(message) {
    alert('Error: ' + message);
    console.error('Login error:', message);
}

/**
 * Show success message
 */
function showSuccess(message) {
    console.log('Success:', message);
    alert(message);
}

/**
 * Show field-level error
 */
function showFieldError(field, message) {
    field.style.borderColor = '#e74c3c';
    const error = document.createElement('div');
    error.className = 'field-error';
    error.textContent = message;
    error.style.color = '#e74c3c';
    error.style.fontSize = '0.875rem';
    error.style.marginTop = '0.25rem';
    
    const existingError = field.parentElement.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    field.parentElement.appendChild(error);
}

/**
 * Clear field-level error
 */
function clearFieldError(field) {
    field.style.borderColor = '';
    const error = field.parentElement.querySelector('.field-error');
    if (error) {
        error.remove();
    }
}

/**
 * Logout function
 */
function logout() {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    console.log('User logged out');
    window.location.href = 'login.html';
}

// Export functions for use in other modules
window.auth = {
    logout: logout,
    performLogin: performLogin,
    validateEmail: validateEmail,
    validatePassword: validatePassword
};
