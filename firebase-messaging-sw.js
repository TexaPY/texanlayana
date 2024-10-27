importScripts(
  "https://www.gstatic.com/firebasejs/11.0.1/firebase-messaging.js"
);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Arka planda mesaj alındı: ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
