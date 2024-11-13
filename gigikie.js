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

// Kullanıcıdan bildirim izni al
function askForNotificationPermission() {
    if (Notification.permission === "granted") {
        return;  // İzin zaten verilmişse, bir şey yapma
    }
    if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function(permission) {
            if (permission === "granted") {
                console.log("Bildirim izni verildi.");
            }
        });
    }
}

// Bildirim gönderme fonksiyonu
function sendNotification() {
    const notification = new Notification("Günlük mesajınız", {
        body: "Herkese merhaba!",
        icon: "https://example.com/icon.png",  // Bildirimin simgesi, bir URL ile değiştirin
    });
}

// 10 saniyede bir bildirim gönderme
function startNotificationInterval() {
    setInterval(function() {
        sendNotification();
    }, 10000);  // 10 saniye
}

// Ana kontrol fonksiyonu
function checkAndStartNotifications() {
    let lastMessageDate = getCookie("lastMessageDate");
    let currentDate = new Date();

    // Eğer bugüne ait mesaj atılmadıysa, başlat
    if (lastMessageDate !== currentDate.toLocaleDateString()) {
        startNotificationInterval();
        setCookie("lastMessageDate", currentDate.toLocaleDateString(), 1);  // Son mesaj tarihini cookie'ye kaydet
    }
}

// Sayfa yüklendiğinde kontrol et ve izin iste
askForNotificationPermission();
checkAndStartNotifications();
