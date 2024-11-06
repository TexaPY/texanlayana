importScripts(
  "https://www.gstatic.com/firebasejs/11.0.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/11.0.1/firebase-messaging-compat.js"
);

// Firebase yapılandırma
const firebaseConfig = {
  apiKey: "AIzaSyD3JwJRG1_xbyNYkXs_kJBb5pc4XzlH9jQ",
  authDomain: "ezgigi-5f883.firebaseapp.com",
  databaseURL: "https://ezgigi-5f883-default-rtdb.firebaseio.com",
  projectId: "ezgigi-5f883",
  storageBucket: "ezgigi-5f883.firebasestorage.app",
  messagingSenderId: "148964707524",
  appId: "1:148964707524:web:13ed9dada8116221978d91",
  measurementId: "G-G4YB4MMWBP",
};

// Firebase'i başlat
firebase.initializeApp(firebaseConfig);

// Mesajlaşma servisini başlat
const messaging = firebase.messaging();

// Bildirim geldiğinde ne yapılacağını belirleyin
onBackgroundMessage(messaging, function(payload) {
  console.log('Background Message received. ', payload);

  // Bildirim için başlık ve içerik
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'assets/images/404.ico', // Bildirim için simge
    badge: 'assets/images/404.ico',  // Bildirimde gösterilecek rozet
    image: 'assets/images/apogigi.png',  // Bildirimdeki görsel URL'si
    data: {
      url: payload.data.url  // Tıklanabilir URL
    }
  };

  // Bildirimi kullanıcıya göster
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Kullanıcı bildirimine tıkladığında ne olacağını belirleyin
self.addEventListener('notificationclick', function(event) {
  const notificationData = event.notification.data;

  // Bildirime tıklanınca belirli bir URL'ye yönlendirme yap
  event.notification.close();
  event.waitUntil(
    clients.openWindow(notificationData.url)  // URL'yi aç
  );
});
