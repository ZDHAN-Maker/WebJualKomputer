let saldoTersimpan = 0;

function simpanSaldo() {
    const saldoInput = document.getElementById('saldoValue');
    saldoTersimpan = parseInt(saldoInput.value) || 0;

    // Update tooltip
    const balanceIcon = document.getElementById('balanceIcon');
    balanceIcon.title = `Saldo tersimpan: Rp ${saldoTersimpan.toLocaleString()}`;

    // Tutup popup
    document.getElementById('balancePopup').style.display = 'none';

    // Tampilkan notifikasi di tengah layar berbentuk lingkaran
    showToast("Saldo\ntersimpan!");
}


function showToast(message) {
    let toast = document.createElement("div");
    toast.textContent = message;
    toast.style.position = "fixed";
    toast.style.top = "50%";
    toast.style.left = "50%";
    toast.style.transform = "translate(-50%, -50%)";
    toast.style.background = "#28a745";
    toast.style.color = "#fff";
    toast.style.width = "150px";
    toast.style.height = "150px";
    toast.style.display = "flex";
    toast.style.alignItems = "center";
    toast.style.justifyContent = "center";
    toast.style.fontSize = "16px";
    toast.style.borderRadius = "50%";
    toast.style.boxShadow = "0 0 15px rgba(0,0,0,0.3)";
    toast.style.zIndex = 9999;
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.5s ease";

    document.body.appendChild(toast);

    // Fade in
    setTimeout(() => { toast.style.opacity = "1"; }, 100);

    // Auto remove after 2.5 seconds
    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 500);
    }, 2500);
}

document.addEventListener('DOMContentLoaded', () => {
    const balanceIcon = document.getElementById('balanceIcon');
    const balancePopup = document.getElementById('balancePopup');
    const closeBalance = document.getElementById('closeBalance');

    balanceIcon.addEventListener('click', () => {
        balancePopup.style.display = 'block';
    });

    closeBalance.addEventListener('click', () => {
        balancePopup.style.display = 'none';
    });
});

function tambahSaldo() {
    const saldoInput = document.getElementById('saldoValue');
    let current = parseInt(saldoInput.value) || 0;
    saldoInput.value = current + 10000;
}

function kurangiSaldo() {
    const saldoInput = document.getElementById('saldoValue');
    let current = parseInt(saldoInput.value) || 0;
    saldoInput.value = Math.max(current - 10000, 0);
}