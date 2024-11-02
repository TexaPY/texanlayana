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
messaging.usePublicVapidKey("BDSadeR-Bs79QxLhkA1G1DOXzm9yENQ04Rb-vUKeqnr2dg3rbqY6rxlCLLnAXMoCEn3PysTPH9Q8gxnIsOFJGPY"); // VAPID anahtarınızı buraya ekleyin

// Arka planda mesaj alındığında
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  // Bildirim başlığı ve içeriğini ayarla
  const notificationTitle = payload.notification?.title || "Bugüne Özel Şarkını dinledin mi?";
  const notificationBody = payload.notification?.body || "Opa'nın Gigi için seçtiği günün şarkısını dinledin mi?";

  // Ek verileri al (data)
  const extraData = payload.data; // Burada gelen data ek veriler

  // Eğer extraData içinde belirli bir bilgi varsa, bildirim body'ni ona göre güncelle
  const additionalInfo = extraData?.info || ""; // Ek veriyi burada kullanıyoruz

  // Bildirim opsiyonları
  const notificationOptions = {
    body: `${notificationBody} ${additionalInfo}`, // Body'e ek bilgi ekleme
    icon: "/assets/images/apos.ico", // İkon yolunu buraya ekleyin
  };

  // Bildirimi göster
  self.registration.showNotification(notificationTitle, notificationOptions);
});
