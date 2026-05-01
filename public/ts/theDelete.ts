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

        if (res.ok) {
            hideDeleteConfirmation();
            window.location.reload();
        } else {
            alert('Delete failed. Please try again.');
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