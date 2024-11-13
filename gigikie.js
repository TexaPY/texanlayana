// Service Worker kaydetme
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
    .then(function(registration) {
        console.log('Service Worker başarıyla kaydedildi: ', registration);
    })
    .catch(function(error) {
        console.log('Service Worker kaydedilemedi: ', error);
    });
}

// Kullanıcıdan bildirim izni al
function askForNotificationPermission() {
    if (Notification.permission === "granted") {
        startNotificationCheck(); // İzin verildiyse bildirim başlat
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function(permission) {
            if (permission === "granted") {
                console.log("Bildirim izni verildi.");
                startNotificationCheck(); // İzin verilirse bildirim başlat
            }
        });
    }
}

// Çerezi kontrol et ve bildirim başlat
function checkAndSendDailyNotification() {
    let lastMessageDate = getCookie("lastMessageDate");
    let currentDate = new Date();

    // Eğer bugüne ait mesaj atılmadıysa ve saat 01:00 ise
    if (lastMessageDate !== currentDate.toLocaleDateString() && currentDate.getHours() === 1 && currentDate.getMinutes() === 0) {
        sendNotification();
        setCookie("lastMessageDate", currentDate.toLocaleDateString(), 1);  // Son mesaj tarihini cookie'ye kaydet
    }
}

// Çerez ayarlama fonksiyonu
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));  // 1 gün sonra
    let expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Çerezden değer alma fonksiyonu
function getCookie(name) {
    let nameEq = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEq) === 0) return c.substring(nameEq.length, c.length);
    }
    return "";
}

// Bildirim gönderme fonksiyonu
function sendNotification() {
    if (Notification.permission === "granted") {
        let notification = new Notification("Günlük Şarkı Yenilendi", {
            body: "Sana özel seçtiğim şarkıyı hâlâ dinlemedin mi?",
            icon: "https://texa.anlayana.com/assets/images/keeddi.png",  // Bildirimin simgesi
        });

        // Bildirime tıklanıldığında yönlendirme yap
        notification.onclick = function() {
            window.open("https://texa.anlayana.com/gigi");  // Yönlendirilecek URL
        };
    }
}

// Saat başı kontrol eden bir zamanlayıcı
function startNotificationCheck() {
    setInterval(function() {
        checkAndSendDailyNotification();
    }, 60 * 1000);  // Her dakika kontrol et
}

// Sayfa yüklendiğinde izin iste ve bildirimleri kontrol et
askForNotificationPermission();
