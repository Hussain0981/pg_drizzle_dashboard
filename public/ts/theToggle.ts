/* ── Reusable Toggle ── */

// Toggle SVG HTML
function getToggleSVG(status: boolean): string {
  return status
    ? `<svg width="36" height="20" viewBox="0 0 36 20" fill="none">
         <rect width="36" height="20" rx="10" fill="#10b981"/>
         <circle cx="26" cy="10" r="7" fill="white"/>
       </svg>`
    : `<svg width="36" height="20" viewBox="0 0 36 20" fill="none">
         <rect width="36" height="20" rx="10" fill="#cbd5e1"/>
         <circle cx="10" cy="10" r="7" fill="white"/>
       </svg>`;
}

// UI update karo
function renderToggle(
  iconEl: HTMLElement,
  buttonEl: HTMLElement,
  status: boolean
): void {
  buttonEl.title = status ? 'Active' : 'Inactive';
  iconEl.innerHTML = getToggleSVG(status);
}

// API Response Type
interface ToggleResponse {
  success: boolean;
  message?: string;
  data?: unknown;
}

// Main reusable function
async function toggleItem(
  id: string | number,
  currentStatus: boolean,
  prefix: 'main' | 'sub' | 'nav',
  url: string
): Promise<void> {
  const icon = document.getElementById(`toggle-icon-${prefix}-${id}`);
  const button = document.getElementById(`toggle-btn-${prefix}-${id}`);

  if (!icon || !button) return;

  const newStatus: boolean = !currentStatus;
  renderToggle(icon, button, newStatus); // Optimistic UI

  try {
    const res = await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    const data: ToggleResponse = await res.json();

    if (res.ok) {
      await (window as Window & { refreshSidebar?: () => Promise<void> }).refreshSidebar?.();
    }

    if (!data.success) {
      renderToggle(icon, button, currentStatus); // Revert
      return;
    }

    // Next click ke liye status update karo
    button.setAttribute(
      'onclick',
      `toggleItem('${id}', ${newStatus}, '${prefix}', '${url}')`
    );

  } catch (error: unknown) {
    renderToggle(icon, button, currentStatus); // Revert
    console.error('Toggle error:', error);
    alert('Something went wrong');
  }
}