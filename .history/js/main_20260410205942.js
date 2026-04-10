(function() {
    var userLang = navigator.language || navigator.userLanguage;
    userLang = userLang.substring(0, 2).toLowerCase(); 
    var cookieExists = document.cookie.indexOf('googtrans=') !== -1;
    if (userLang !== 'fr' && !cookieExists) {
        document.cookie = 'googtrans=/fr/' + userLang + '; path=/';
        document.cookie = 'googtrans=/fr/' + userLang + '; domain=.' + window.location.hostname + '; path=/';
        window.location.reload();
    }
})();
window.googleTranslateElementInit = function() {
    new google.translate.TranslateElement({
        pageLanguage: 'fr',
        autoDisplay: false
    }, 'google_translate_element');
};
document.addEventListener('DOMContentLoaded', function() {
    updateCounter();
});
function updateCounter() {
    const counterElement = document.getElementById('totalLogbooksCounter');
    if (counterElement) {
        const total = parseInt(localStorage.getItem('sgt_total_logbooks')) || 0;
        counterElement.innerText = total;
    }
}