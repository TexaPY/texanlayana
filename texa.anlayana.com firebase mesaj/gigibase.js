// Firebase SDK'sını içe aktar
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import {
  getMessaging,
  getToken,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-messaging.js";

// Firebase yapılandırması
const firebaseConfig = {

};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Firestore veritabanına erişim

// Token'ı Firestore'a kaydetme fonksiyonu
async function saveTokenToFirestore(token) {
  try {
    const tokensCollectionRef = collection(db, "tokens");
    const tokenDocs = await getDocs(tokensCollectionRef);

    // Mevcut belge sayısını al
    const tokenCount = tokenDocs.size;

    // Yeni belge adını oluştur
    const newTokenDocName = `token${tokenCount + 1}`;

    // Yeni token'ı Firestore'a kaydet
    await setDoc(doc(db, "tokens", newTokenDocName), { token: token });
    console.log("Token Firestore'a başarıyla kaydedildi:", newTokenDocName);
  } catch (error) {
    console.error("Token kaydedilirken hata oluştu:", error);
  }
}

// Kullanıcıdan bildirim izni alma ve token alma
async function requestNotificationPermission() {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("İzin verildi.");
      const messaging = getMessaging(app);
      // VAPID anahtarınızı buraya ekleyin
      const token = await getToken(messaging, {
        vapidKey:
          "               ",
      });
      console.log("Token: ", token);
      await saveTokenToFirestore(token); // Token'ı Firestore'a kaydet
    } else {
      console.error("İzin verilmedi.");
    }
  } catch (error) {
    console.error("Bildirim izni istenirken hata oluştu:", error);
  }
}

// Ana JavaScript dosyanızda (örneğin main.js)
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);
      // Servis çalışanı kaydedildikten sonra bildirim izni isteyin
      registration.pushManager.getSubscription().then((subscription) => {
        if (!subscription) {
          // Abonelik yoksa izni iste
          requestNotificationPermission();
        }
      });
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}
