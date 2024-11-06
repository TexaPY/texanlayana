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

// Bildirim üzerine tıklama işleyicisi
messaging.onBackgroundMessage(function(payload) {
  console.log('Background Message received. ', payload);

  const notificationTitle = 'Bugüne Özel Şarkını dinledin mi?';
  const notificationOptions = {
    body: "Opa'nın Gigi için seçtiği günün şarkısını dinledin mi?",
    icon: 'assets/images/apos.ico',
    data: {
      url: 'https://texa.anlayana.com/gigi', // Bildirime tıklandığında yönlendirilecek URL
    },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Bildirime tıklama işleyicisi
self.addEventListener('notificationclick', function(event) {
  console.log('Notification click received:', event.notification.data);

  // Bildirime tıklanınca URL'yi aç
  const url = event.notification.data.url;
  event.notification.close(); // Bildirimi kapat

  // Yönlendirmeyi yap
  event.waitUntil(
    clients.openWindow(url)
  );
});
