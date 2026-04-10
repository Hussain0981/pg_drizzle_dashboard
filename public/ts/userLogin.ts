
const loginForm = document.querySelector('form') as HTMLFormElement;
const submitBtn = loginForm.querySelector('button[type="submit"]') as HTMLButtonElement;

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 1. Extract Data
    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData.entries());

    // 2. UI Feedback: Loading State
    const originalBtnText = submitBtn.innerText;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
            <svg class="animate-spin h-5 w-5 mr-3 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Signing in...
        `;

    try {
        // 3. API Call
        const response = await fetch('/api/v1/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
            // Redirect on success
            window.location.href = '/dashboard';
        } else {
            // Show error (you can replace this with a nice toast notification)
            alert(result.message || 'Login failed. Please check your credentials.');
        }
    } catch (error) {
        console.error('Login Error:', error);
        alert('A network error occurred. Please try again.');
    } finally {
        // 4. Reset Button State
        submitBtn.disabled = false;
        submitBtn.innerText = originalBtnText;
    }
});