document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    // Form values
    const email = document.getElementById('email').value;
    const fullname = document.getElementById('fullname').value;
    const password = document.getElementById('password').value; 
    // Validation
    let isValid = true;

    // Clear error messages
    document.getElementById('email-error').textContent = '';
    document.getElementById('name-error').textContent = '';
    document.getElementById('password-error').textContent = '';

   
    if (email.trim() === '') {
        document.getElementById('email-error').textContent = 'Email is required.';
        isValid = false;

    } else if (!validateEmail(email)) {
        document.getElementById('email-error').textContent = 'Please enter a valid email.';
        isValid = false;
    }

   
    if (fullname.trim() === '') {
        document.getElementById('name-error').textContent = 'Full Name is required.';
        isValid = false;

    } else if (!validateName(fullname)) {
        document.getElementById('name-error').textContent = 'Full Name can only contain letters and spaces.';
        isValid = false;
    }

    
    if (password.trim() === '') {
        document.getElementById('password-error').textContent = 'Password is required.';
        isValid = false;
        
    } else if (password.length < 8) {
        document.getElementById('password-error').textContent = 'Password must be at least 8 characters.';
        isValid = false;
    }

    // show success message
    if (isValid) {
        localStorage.setItem("username", fullname);
        document
          .getElementById("login-form")
          
        window.location.href = "/dashboard.html";

    }
}); 

//email validation function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
} 

//full Name validation function
function validateName(fullname) {
    const re = /^[a-zA-Z\s]+$/;
    return re.test(fullname);
}

//toggle password visibility function
function togglePassword() {
    const passwordField = document.getElementById('password');
    const toggleButton = document.querySelector('.toggle-password i');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';

    passwordField.setAttribute('type', type);

    toggleButton.classList.toggle('fa-eye');
    toggleButton.classList.toggle('fa-eye-slash');
}

