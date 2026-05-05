let _deleteType: string | null = null;
let _deleteId: number | null = null;

function showDeleteConfirmation(type: string, id: number): void {
    _deleteType = type;
    _deleteId = id;
    const model = document.getElementById('deleteModal');
    if (model) {
        model.classList.remove('hidden');
    }
}

// Cancel button
function hideDeleteConfirmation(): void {
    _deleteType = null;
    _deleteId = null;
    const model = document.getElementById('deleteModal');
    if (model) {
        model.classList.add('hidden');
    }
}

// Confirm button — actual delete call
async function proceedDelete(): Promise<void> {
    if (!_deleteType || !_deleteId) return;

    try {
        const res: Response = await fetch(`/api/v1/${_deleteType}/${_deleteId}`, {
            method: 'DELETE',
        });

        const data = await res.json().catch(() => ({
        success: false,
        message: 'Server error — invalid response',
    }));

        if (res.ok) {
            hideDeleteConfirmation();
            window.location.reload();
            await (window as Window & { refreshSidebar?: () => Promise<void> }).refreshSidebar?.();

        } else {
            alert(data.message)
        }
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err.message);
        } else {
            console.error(err);
        }
        alert('Something went wrong.');
    }
}