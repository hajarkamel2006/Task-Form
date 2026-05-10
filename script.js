 
function updateStatus(id, isValid) {
    const item = document.getElementById(id);
    const icon = item.querySelector('i');
    if (isValid) {
        item.classList.add('valid');
        icon.className = 'fas fa-circle-check';
    } else {
        item.classList.remove('valid');
        icon.className = 'fas fa-circle-xmark';
    }
}

 
document.getElementById('firstName').addEventListener('input', function() {
    const v = this.value;
    updateStatus('fn-cap', /^[A-Z]/.test(v));
    updateStatus('fn-letters', /^[A-Za-z]+$/.test(v) && v !== "");
    updateStatus('fn-space', !/\s/.test(v) && v !== "");
    updateStatus('fn-length', v.length > 2);
});

 
document.getElementById('phone').addEventListener('input', function() {
    const v = this.value;
    updateStatus('ph-start', /^01[0125]/.test(v));
    updateStatus('ph-length', v.length === 11);
});

 
document.getElementById('email').addEventListener('input', function() {
    const v = this.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    updateStatus('em-valid', emailRegex.test(v));
});

 
const passInput = document.getElementById('password');
const confirmInput = document.getElementById('confirmPassword');

passInput.addEventListener('input', function() {
    updateStatus('pw-num', /\d/.test(this.value));
    updateStatus('pw-len', this.value.length >= 8);
});

confirmInput.addEventListener('input', function() {
    updateStatus('cp-match', this.value === passInput.value && this.value !== "");
});
 
const quotes = [
    "Work hard in silence, let success be your noise.",
    "Your limit is only your imagination.",
    "Focus on being productive instead of busy.",
    "Success doesn't just find you. You have to go out and get it."
];

function getNewQuote() {
    const randomIdx = Math.floor(Math.random() * quotes.length);
    document.getElementById('quoteBox').innerText = `"${quotes[randomIdx]}"`;
}

function copyToClipboard() {
    const text = document.getElementById('quoteBox').innerText;
    navigator.clipboard.writeText(text);
    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Quote Copied!', showConfirmButton: false, timer: 1500 });
}
 
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const allIncomplete = document.querySelectorAll('.rules-list li:not(.valid)').length;
    
    if (allIncomplete === 0) {
        Swal.fire('Great!', 'Form submitted successfully', 'success');
    } else {
        Swal.fire('Wait!', 'Please satisfy all conditions first', 'warning');
    }
});