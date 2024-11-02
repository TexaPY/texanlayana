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

// Arka planda mesaj alındığında
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  // Günlük bildirim için içerik ayarları
  const notificationTitle = "Bugüne Özel Şarkını dinledin mi?";
  const notificationBody = payload.notification?.body || "Opa'nın Gigi için seçtiği günün şarkısını dinledin mi?";
  const notificationOptions = {
    body: notificationBody,
  };

  // Bildirimi göster
  self.registration.showNotification(notificationTitle, notificationOptions);
});
