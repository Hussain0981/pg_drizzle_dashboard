(() => {

    // ── DOM Elements ──────────────────────────────────────────
    const errorMsg = document.getElementById('error-msg') as HTMLParagraphElement;
    const successMsg = document.getElementById('success-msg') as HTMLParagraphElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const submitBtn = document.getElementById('login-button') as HTMLButtonElement;
    const form = document.getElementById('loginForm') as HTMLFormElement;

    // ── Null Guard ────────────────────────────────────────────
    if (!errorMsg || !successMsg || !form || !emailInput || !passwordInput || !submitBtn) {
        console.error('Missing DOM elements:', { errorMsg, successMsg, form, emailInput, passwordInput, submitBtn });
        throw new Error('Required DOM elements not found — check your HTML IDs');
    }

    interface ApiResponse {
        success: boolean;
        message: string;
        data?: unknown;
        token?: string;
    }

    // ── Store original button text ────────────────────────────
    const originalButtonText = submitBtn.textContent || 'Sign In';

    // ── Helpers ───────────────────────────────────────────────
    const showError = (msg: string): void => {
        errorMsg.textContent = msg;
        errorMsg.classList.remove('hidden');
        successMsg.classList.add('hidden');

        // Auto hide after 5 seconds
        setTimeout(() => {
            errorMsg.classList.add('hidden');
        }, 5000);
    };

    const showSuccess = (msg: string): void => {
        successMsg.textContent = msg;
        successMsg.classList.remove('hidden');
        errorMsg.classList.add('hidden');
    };

    const clearMessages = (): void => {
        errorMsg.classList.add('hidden');
        successMsg.classList.add('hidden');
    };

    const setLoading = (btn: HTMLButtonElement, loading: boolean): void => {
        btn.disabled = loading;
        btn.textContent = loading ? 'Please wait...' : originalButtonText;
    };

    const apiCall = async (url: string, body: object): Promise<ApiResponse> => {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        console.log(res)

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({ message: 'Server error' }));
            throw new Error(errorData.message || `HTTP ${res.status}: ${res.statusText}`);
        }

        const data: ApiResponse = await res.json();
        return data;
    };

    // ── Login ─────────────────────────────────────────────────
    form.addEventListener('submit', async (e: SubmitEvent) => {
        e.preventDefault(); 
        e.stopPropagation();

        clearMessages();

        const payload = {
            email: emailInput.value.trim(),
            password: passwordInput.value,
        };

        // validation before setLoading so button doesn't get stuck
        if (!payload.email || !payload.password) {
            showError('Please fill in all fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(payload.email)) {
            showError('Please enter a valid email address');
            return;
        }

        setLoading(submitBtn, true);

        try {
            console.log('Sending login request...'); // Debug

            const data = await apiCall('/api/v1/admin/super-admin-login', payload);

            // save to local storage
            if (data.data) {
                localStorage.setItem('user', JSON.stringify(data.data));
            }
            if (data.token) {
                localStorage.setItem('token', data.token);
            }

            showSuccess(data.message || 'Login successful! Redirecting...');

            setTimeout(() => {
                window.location.href = '/dashboard'; 
            }, 1500);

        } catch (error) {
            console.error('Login error:', error);
            showError(error instanceof Error ? error.message : 'Login failed. Try again.');
            setLoading(submitBtn, false); 
        } finally {
            setTimeout(() => {
                setLoading(submitBtn, false);
            }, 1500);
        }
    });
})();