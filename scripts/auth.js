// Toggle between Login/Signup forms
function toggleForm() {
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    loginForm.classList.toggle("hidden");
    signupForm.classList.toggle("hidden");
}

// Mock Login Function
function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    
    // Simulate API call (replace with actual backend later)
    if (email && password) {
        alert("Login successful! Redirecting...");
        window.location.href = "/dashboard.html";
    } else {
        alert("Please fill all fields!");
    }
}

// Mock Signup Function
function signup() {
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    
    if (name && email && password) {
        alert("Account created! Please login.");
        toggleForm(); // Switch back to login
    } else {
        alert("Please fill all fields!");
    }
}