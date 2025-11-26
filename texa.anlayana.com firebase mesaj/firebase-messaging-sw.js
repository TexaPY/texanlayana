importScripts(
  "https://www.gstatic.com/firebasejs/11.0.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/11.0.1/firebase-messaging-compat.js"
);

// Firebase yapılandırma
const firebaseConfig = {

};

// Firebase'i başlat
firebase.initializeApp(firebaseConfig);

// Mesajlaşma servisini başlat
const messaging = firebase.messaging();

// Bildirim üzerine tıklama işleyicisi
messaging.onBackgroundMessage(function(payload) {
  console.log('Background Message received. ', payload);
  console.log('Bildirim içeriği:', payload.notification);
});
