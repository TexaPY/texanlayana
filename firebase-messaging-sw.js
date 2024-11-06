importScripts(
  "https://www.gstatic.com/firebasejs/11.0.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/11.0.1/firebase-messaging-compat.js"
);

// Firebase'i başlat
firebase.initializeApp({
  apiKey: "AIzaSyD3JwJRG1_xbyNYkXs_kJBb5pc4XzlH9jQ",
  authDomain: "ezgigi-5f883.firebaseapp.com",
  databaseURL: "https://ezgigi-5f883-default-rtdb.firebaseio.com",
  projectId: "ezgigi-5f883",
  storageBucket: "ezgigi-5f883.firebasestorage.app",
  messagingSenderId: "148964707524",
  appId: "1:148964707524:web:13ed9dada8116221978d91",
  measurementId: "G-G4YB4MMWBP",
});

// Firebase Messaging örneğini al
const messaging = firebase.messaging();

// VAPID anahtarınızı buraya ekleyin
messaging.usePublicVapidKey("BDSadeR-Bs79QxLhkA1G1DOXzm9yENQ04Rb-vUKeqnr2dg3rbqY6rxlCLLnAXMoCEn3PysTPH9Q8gxnIsOFJGPY");

// Arka planda mesaj alındığında
messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message", payload);

  // Bildirim başlığı ve içeriğini ayarla (Varsayılan değerler belirledik)
  const notificationTitle = payload.notification?.title || "Bugüne Özel Şarkını dinledin mi?";
  const notificationBody = payload.notification?.body || "Opa'nın Gigi için seçtiği günün şarkısını dinledin mi?";

  // Ek verileri al (data)
  const extraData = payload.data || {}; // Eğer data varsa, işleme al
  const additionalInfo = extraData.info || ""; // Data içinde ek bilgi varsa

  // Bildirim seçeneklerini oluştur
  const notificationOptions = {
    body: `${notificationBody} ${additionalInfo}`, // Body'e ek bilgi ekleme
    icon: "/assets/images/apos.ico", // İkonu buraya ekleyin
    data: extraData, // Ek veriyi burada da saklayabilirsiniz
    tag: 'gigii', // Bildirim için benzersiz bir etiket ekleyin (isteğe bağlı)
    vibrate: [200, 100, 200], // Bildirimde titreşim efekti (isteğe bağlı)
  };

  // Bildirimi göster
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Bildirim tıklama olayını işleyin
self.addEventListener('notificationclick', function(event) {
  const notification = event.notification;
  const action = event.action;

  // Eğer bildirim tıklandıysa, kullanıcıyı belirli bir URL'ye yönlendirin
  if (event.action === 'open_site') {
    const url = notification.data.url || "https://texa.anlayana.com/gigi";  // Varsayılan URL
    clients.openWindow(url); // Yönlendirme yap
  }

  // Bildirimi kapat
  notification.close();
});
