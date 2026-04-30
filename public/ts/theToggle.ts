/* ── Reusable Toggle ── */

// Toggle SVG HTML
function getToggleSVG(status) {
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
function renderToggle(iconEl, buttonEl, status) {
  buttonEl.title = status ? 'Active' : 'Inactive';
  iconEl.innerHTML = getToggleSVG(status);
}

// Main reusable function
// prefix  = 'main' | 'sub' | 'nav' — har page ka alag prefix
// url     = '/api/v1/main-menu/123/toggle'
async function toggleItem(id, currentStatus, prefix, url) {
  const icon   = document.getElementById(`toggle-icon-${prefix}-${id}`);
  const button = document.getElementById(`toggle-btn-${prefix}-${id}`);
  if (!icon || !button) return;

  const newStatus = !currentStatus;
  renderToggle(icon, button, newStatus); // optimistic UI

  try {
    const res  = await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    const data = await res.json();

    if (!data.success) {
      renderToggle(icon, button, currentStatus); // revert
      return;
    }

    // Next click ke liye status update karo
    button.setAttribute(
      'onclick',
      `toggleItem('${id}', ${newStatus}, '${prefix}', '${url}')`
    );

  } catch {
    renderToggle(icon, button, currentStatus); // revert
    alert('Something went wrong');
  }
}