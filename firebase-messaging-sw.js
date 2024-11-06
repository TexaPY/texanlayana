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

// Bildirim üzerine tıklama işleyicisi
messaging.onBackgroundMessage(function(payload) {
  console.log('Background Message received. ', payload);
  console.log('Bildirim içeriği:', payload.notification);
});
