// Cookie ayarlama fonksiyonu
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));  // 1 gün sonra
    let expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Cookie'den değer alma fonksiyonu
function getCookie(name) {
    let nameEq = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEq) === 0) return c.substring(nameEq.length, c.length);
    }
    return "";
}

// Mesaj gönderme fonksiyonu
function sendMessage() {
    alert("Günlük mesajınız: Herkese merhaba!");
}

// Her sayfa yüklendiğinde kontrol etme
window.onload = function() {
    let lastMessageDate = getCookie("lastMessageDate");
    let currentDate = new Date();

    // Eğer bugüne ait mesaj atılmadıysa, her 10 saniyede bir mesaj gönder
    if (lastMessageDate !== currentDate.toLocaleDateString()) {
        setInterval(function() {
            sendMessage();
        }, 10000);  // 10 saniye
        setCookie("lastMessageDate", currentDate.toLocaleDateString(), 1);  // Son mesaj tarihini cookie'ye kaydet
    }
};
