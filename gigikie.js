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
        icon: "assets/images/404.ico",  // Bildirimin simgesi, bir URL ile değiştirin
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
