const firebaseConfig = {
  apiKey: "AIzaSyCfbStb3I1qZYqYKHrP_2wcGvOwUi4GrRs",
  authDomain: "gigi-67cd0.firebaseapp.com",
  databaseURL: "https://gigi-67cd0-default-rtdb.firebaseio.com",
  projectId: "gigi-67cd0",
  storageBucket: "gigi-67cd0.appspot.com",
  messagingSenderId: "813483059670",
  appId: "1:813483059670:web:7c03147ba03344098b1c77",
  measurementId: "G-55Y887Q50X",
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const messaging = getMessaging(app);

async function requestNotificationPermission() {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Bildirim izni verildi.");
      const currentToken = await getToken(messaging, {
        vapidKey:
          "BFPLccnzTZS0qa-fwxWwVZSMBJ5wrEkKWdDsbqGmbS-PQ-WTY9fASJ5KQrvQwj9YB1Hx5KlScpY_pk78paKoY8M",
      });
      if (currentToken) {
        console.log("Token:", currentToken);
        await saveTokenToFirestore(currentToken);
      } else {
        console.log("Kayıt token'ı mevcut değil.");
      }
    } else {
      console.log("Bildirim izni reddedildi.");
    }
  } catch (error) {
    console.error("Bildirim izni alınırken hata:", error);
  }
}

async function saveTokenToFirestore(token) {
  const userId = "31"; // Tüm kullanıcılar için sabit bir ID
  const tokenRef = doc(firestore, "tokens", userId);

  // Belgeyi al
  const docSnap = await getDoc(tokenRef);

  if (docSnap.exists()) {
    // Belge zaten var, token'ı dizinin sonuna ekle
    await updateDoc(tokenRef, {
      tokens: arrayUnion(token), // Yeni token'ı diziye ekle
      timestamp: Date.now(),
    });
  } else {
    // Belge yok, yeni belge oluştur ve token'ı ekle
    await setDoc(tokenRef, {
      tokens: [token], // Yeni token ile dizi oluştur
      timestamp: Date.now(),
    });
  }
}

async function getTokensFromFirestore() {
  const tokensSnapshot = await getDocs(collection(firestore, "tokens"));
  return tokensSnapshot;
}

async function sendNotificationToAllUsers(song) {
  const message = {
    notification: {
      title: "Günün Şarkısı",
      body: song.title,
      icon: "assets/images/apos.ico",
    },
    data: {
      songId: song.id, // İsteğe bağlı: şarkı ile ilgili ek veriler
    },
  };

  const tokensQuery = await getTokensFromFirestore();
  const tokens = tokensQuery.docs.flatMap((doc) => doc.data().tokens); // Her belgedeki token'ları al

  // Bildirim gönderimi için FCM API'sını kullanın
  const response = await fetch("https://fcm.googleapis.com/fcm/send", {
    method: "POST",
    headers: {
      Authorization:
        "BFPLccnzTZS0qa-fwxWwVZSMBJ5wrEkKWdDsbqGmbS-PQ-WTY9fASJ5KQrvQwj9YB1Hx5KlScpY_pk78paKoY8M", // Sunucu anahtarınızı buraya ekleyin
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      registration_ids: tokens,
      ...message,
    }),
  });

  const result = await response.json();
  console.log("Notification sent:", result);
}

function scheduleDailySongNotification() {
  const now = new Date();
  const nextMidnight = new Date();
  nextMidnight.setHours(24, 0, 0, 0); // Gelecek gece yarısı

  const timeToNextMidnight = nextMidnight - now;

  setTimeout(async () => {
    const dailySong = await getDailySong(); // Günlük şarkıyı alın
    await sendNotificationToAllUsers(dailySong); // Bildirim gönder
    scheduleDailySongNotification(); // Tekrar zamanlayıcıyı ayarlayın
  }, timeToNextMidnight);
}

// Sayfa yüklendiğinde izin isteme fonksiyonunu çağır
window.onload = requestNotificationPermission;

//Ezgigi
function animateTitle(text) {
  let textToAnimate = text;
  let currentPosition = 0;
  let directionForward = true;

  function updateTitle() {
    if (currentPosition === textToAnimate.length) {
      directionForward = false;
    } else if (currentPosition === 0) {
      directionForward = true;
    }

    let displayedText = directionForward
      ? textToAnimate.slice(0, currentPosition + 1)
      : textToAnimate.slice(0, currentPosition - 1);

    document.title = displayedText;

    currentPosition = directionForward
      ? currentPosition + 1
      : currentPosition - 1;

    setTimeout(updateTitle, 222);
  }

  updateTitle();
}

/* LOADER */
window.addEventListener("load", function () {
  var loading = document.getElementById("loading-animation");
  if (loading) {
    loading.style.display = "none"; // Sayfa yüklendiğinde gizle
  }
});

/*
==========================

	Song of The Day

==========================
*/

async function fetchSongs() {
  const response = await fetch("./assets/songs.json");
  const data = await response.json();
  return data;
}

function selectRandomSong(songs, previousSong) {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * songs.length);
  } while (songs[randomIndex].song === previousSong);

  return songs[randomIndex];
}

async function updateSongOfTheDay() {
  let previousSong = localStorage.getItem("previousSong");
  const now = new Date();
  const currentDay = now.getDate();
  const savedDay = localStorage.getItem("day");

  if (!savedDay || parseInt(savedDay) !== currentDay) {
    localStorage.setItem("day", currentDay);
    localStorage.setItem("changeSong", "true");
    console.log(
      "%c Song Of The Day ",
      "background: purple; color: white; font-size: 15px; font-weight: bold;",
      "Day:" +
        localStorage.getItem("day") +
        "\nchangeSong: " +
        localStorage.getItem("changeSong")
    );
  }

  const changeSong = localStorage.getItem("changeSong");
  if (changeSong === "true") {
    const songs = await fetchSongs();
    const selectedSong = selectRandomSong(songs, previousSong);
    localStorage.setItem("previousSong", selectedSong);
    localStorage.setItem("changeSong", "false");
    console.log(
      "%c Song Of The Day ",
      "background: purple; color: white; font-size: 15px; font-weight: bold;",
      "Day:" +
        localStorage.getItem("day") +
        "\nchangeSong: " +
        localStorage.getItem("changeSong")
    );
    document.getElementById(
      "spotifyEmbed"
    ).innerHTML = `<iframe style='border-radius:12px' src='https://open.spotify.com/embed/track/${selectedSong}?utm_source=generator&theme=0' width='50%' height='120' frameBorder='0' allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture' loading='lazy'></iframe>`;
  } else {
    const songs = await fetchSongs();
    const savedSong = songs.find((song) => song === previousSong);
    if (savedSong) {
      document.getElementById(
        "spotifyEmbed"
      ).innerHTML = `<iframe style='border-radius:12px' src='https://open.spotify.com/embed/track/${savedSong}?utm_source=generator&theme=0' width='50%' height='120' frameBorder='0' allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture' loading='lazy'></iframe>`;
    }
  }
}

window.addEventListener("load", updateSongOfTheDay);
