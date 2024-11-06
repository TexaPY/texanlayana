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

  // Bildirim göndermiyoruz, sadece log atıyoruz
  console.log('Bildirim içeriği:', payload.notification);
});

// Bildirime tıklama işleyicisi
self.addEventListener('notificationclick', function(event) {
  console.log('Notification click received:', event.notification.data);

  // Bildirim tıklama olayını logluyoruz
  const url = event.notification.data.url;
  console.log('Bildirim tıklandığında yönlendirilecek URL:', url);
  event.notification.close(); // Bildirimi kapat

  // Yönlendirmeyi yapmıyoruz, sadece log atıyoruz
  console.log('Yönlendirme yapılmayacak');
});
