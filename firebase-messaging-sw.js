// firebase-messaging-sw.js

importScripts("https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/11.0.1/firebase-messaging.js"
);

// Firebase yapılandırması
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

const messaging = firebase.messaging();

// Token alma işlemi
async function getMessagingToken() {
  try {
    const token = await messaging.getToken({
      vapidKey:
        "BDSadeR-Bs79QxLhkA1G1DOXzm9yENQ04Rb-vUKeqnr2dg3rbqY6rxlCLLnAXMoCEn3PysTPH9Q8gxnIsOFJGPY",
    });
    console.log("FCM Token:", token);
  } catch (error) {
    console.error("Token alma hatası:", error);
  }
}

// Token al
getMessagingToken();

// Arka planda gelen mesajları alma
messaging.onBackgroundMessage((payload) => {
  console.log("Arka planda mesaj alındı:", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "assets/images/404.ico", // İsteğe bağlı: bildirim simgesi
  };

  // Bildirimi göster
  self.registration.showNotification(notificationTitle, notificationOptions);
});
