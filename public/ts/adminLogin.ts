(() => {
  // ── DOM Elements ──────────────────────────────────────────
  const errorMsg     = document.getElementById('error-msg')     as HTMLParagraphElement;
  const successMsg   = document.getElementById('success-msg')   as HTMLParagraphElement;
  const emailInput   = document.getElementById('email')         as HTMLInputElement;
  const passwordInput= document.getElementById('password')      as HTMLInputElement;
  const submitBtn    = document.getElementById('login-button')  as HTMLButtonElement;
  const form         = document.getElementById('loginForm')     as HTMLFormElement;

  // ── Null Guard ────────────────────────────────────────────
  if (!errorMsg || !successMsg || !form || !emailInput || !passwordInput || !submitBtn) {
    console.error('Missing DOM elements');
    throw new Error('Required DOM elements not found — check your HTML IDs');
  }

  // ── Types ─────────────────────────────────────────────────
  interface ApiResponse {
    success:  boolean;
    message:  string;
    redirect?: string;   
    data?:    unknown;
  }

  // ── Original Button Text ──────────────────────────────────
  const originalButtonText = submitBtn.textContent ?? 'Sign In';

  // ── Helpers ───────────────────────────────────────────────
  const showError = (msg: string): void => {
    errorMsg.textContent = msg;
    errorMsg.classList.remove('hidden');
    successMsg.classList.add('hidden');

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

  const setLoading = (loading: boolean): void => {
    submitBtn.disabled    = loading;
    submitBtn.textContent = loading ? 'Please wait...' : originalButtonText;
  };

  // ── API Call ──────────────────────────────────────────────
  const apiCall = async (url: string, body: object): Promise<ApiResponse> => {
    const res = await fetch(url, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(body),
      credentials: 'same-origin',
    });

    const data: ApiResponse = await res.json().catch(() => ({
      success: false,
      message: 'Server error — invalid response',
    }));

    if (!res.ok) {
      throw new Error(data.message || `HTTP ${res.status}: ${res.statusText}`);
    }

    if (!data.success) {
      throw new Error(data.message || 'Login failed');
    }

    return data;
  };

  // ── Login Submit ──────────────────────────────────────────
  form.addEventListener('submit', async (e: SubmitEvent) => {
    e.preventDefault();
    e.stopPropagation();

    clearMessages();

    const payload = {
      email:    emailInput.value.trim(),
      password: passwordInput.value,
    };

    // ── Validation ────────────────────────────────────────
    if (!payload.email || !payload.password) {
      showError('Please fill in all fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(payload.email)) {
      showError('Please enter a valid email address');
      return;
    }

    // ── API Call ──────────────────────────────────────────
    setLoading(true);

    try {
      const data = await apiCall('/api/v1/admin/super-admin-login', payload);
      showSuccess(data.message || 'Login successful! Redirecting...');

      setTimeout(() => {
        window.location.href = data.redirect ?? '/dashboard';
      }, 1000);

    } catch (error) {
      console.error('Login error:', error);
      showError(error instanceof Error ? error.message : 'Login failed. Try again.');
      
      setLoading(false);
    }
  });
})();