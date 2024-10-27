// firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/11.0.1/firebase-messaging.js"
);

// Firebase'i başlat
firebase.initializeApp({
  apiKey: "AIzaSyCfbStb3I1qZYqYKHrP_2wcGvOwUi4GrRs",
  authDomain: "gigi-67cd0.firebaseapp.com",
  databaseURL: "https://gigi-67cd0-default-rtdb.firebaseio.com",
  projectId: "gigi-67cd0",
  storageBucket: "gigi-67cd0.appspot.com",
  messagingSenderId: "813483059670",
  appId: "1:813483059670:web:7c03147ba03344098b1c77",
  measurementId: "G-55Y887Q50X",
});

// Messaging nesnesini oluştur
const messaging = firebase.messaging();

// Arka planda mesaj alındığında yapılacak işlemler
messaging.onBackgroundMessage((payload) => {
  console.log("Arka planda mesaj alındı:", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  // Bildirim göster
  self.registration.showNotification(notificationTitle, notificationOptions);
});
