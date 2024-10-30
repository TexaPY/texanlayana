import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD3JwJRG1_xbyNYkXs_kJBb5pc4XzlH9jQ",
  authDomain: "ezgigi-5f883.firebaseapp.com",
  projectId: "ezgigi-5f883",
  storageBucket: "ezgigi-5f883.firebasestorage.app",
  messagingSenderId: "148964707524",
  appId: "1:148964707524:web:13ed9dada8116221978d91",
  measurementId: "G-G4YB4MMWBP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Kullanıcının izni alındıktan sonra token’ı al ve Firebase’e kaydet
const messaging = firebase.messaging();
messaging
  .getToken({
    vapidKey:
      "BDSadeR-Bs79QxLhkA1G1DOXzm9yENQ04Rb-vUKeqnr2dg3rbqY6rxlCLLnAXMoCEn3PysTPH9Q8gxnIsOFJGPY",
  })
  .then((currentToken) => {
    if (currentToken) {
      // Token’ı Firestore’da sakla
      firebase
        .firestore()
        .collection("tokens")
        .doc(currentToken)
        .set({ token: currentToken });
      console.log("Bildirim izni verildi.");
    } else {
      console.log("Bildirim izni verilmedi.");
    }
  })
  .catch((err) => {
    console.log("Token alma hatası:", err);
  });
