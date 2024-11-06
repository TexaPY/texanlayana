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

  // Bildirim başlığı ve içeriğini ayarla
  const notificationTitle = payload.notification?.title || "Bugüne Özel Şarkını dinledin mi?";
  const notificationBody = payload.notification?.body || "Opa'nın Gigi için seçtiği günün şarkısını dinledin mi?";

  // Bildirim seçeneklerini oluştur
  const notificationOptions = {
    body: notificationBody,
    icon: "/assets/images/apos.ico",
    tag: 'gigii',
    vibrate: [200, 100, 200],
    actions: [
      {
        action: 'open_site', // Buton aksiyonunun adı
        title: 'Beni Oraya Yönlendir' // Buton üzerindeki metin
      }
    ]
  };

  // Bildirimi göster
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Bildirim tıklama olayını işleyin
self.addEventListener('notificationclick', function(event) {
  event.preventDefault();  // Bildirim tıklama işlemi başlamadan önce varsayılan işlemi engelle

  const notification = event.notification;
  const action = event.action;

  // Bildirimi kapat
  notification.close();

  // Eğer 'open_site' aksiyonu tıklandıysa, kullanıcıyı sabit URL'ye yönlendir
  if (action === 'open_site') {
    // Sabit URL'yi aç
    event.waitUntil(
      clients.openWindow('https://texa.anlayana.com/gigi')
    );
  }
});
