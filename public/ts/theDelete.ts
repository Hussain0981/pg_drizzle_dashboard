async function deleteMenuItem(type: string, id: string) {
    try {
        console.log(typeof id, id)
        const res = await fetch(`/api/v1/${type}/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();

        if (data.success) {
            const row = document.getElementById(`row-${id}`);
            if (row) {
                row.style.transition = 'opacity 0.3s';
                row.style.opacity = '0';
                setTimeout(() => row.remove(), 300);
            } else {
                location.reload();
            }
        } else {
            alert(data.message || 'Delete failed');

        }
    } catch (error) {
        console.log(error)
    }
}