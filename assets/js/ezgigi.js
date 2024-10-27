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

/*
FİREBASE
*/
// Firebase konfigürasyonunu ekle
const firebaseConfig = {
  apiKey: "AIzaSyCfbStb3I1qZYqYKHrP_2wcGvOwUi4GrRs",
  vapidKey:
    "BFPLccnzTZS0qa-fwxWwVZSMBJ5wrEkKWdDsbqGmbS-PQ-WTY9fASJ5KQrvQwj9YB1Hx5KlScpY_pk78paKoY8M",
  authDomain: "gigi-67cd0.firebaseapp.com",
  databaseURL: "https://gigi-67cd0-default-rtdb.firebaseio.com",
  projectId: "gigi-67cd0",
  storageBucket: "gigi-67cd0.appspot.com",
  messagingSenderId: "813483059670",
  appId: "1:813483059670:web:7c03147ba03344098b1c77",
  measurementId: "G-55Y887Q50X",
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

$(gigi.html).ready(function () {
  // Bildirim izni iste
  Notification.requestPermission()
    .then((permission) => {
      if (permission === "granted") {
        console.log("Bildirim izni verildi");
        // Firebase'e token kaydetme veya başka işlemler
        database.ref("users/" + userId + "/notifications").set(true);
      } else {
        console.error("Bildirim izni verilmedi");
      }
    })
    .catch((error) => {
      console.error("Bildirim izni isteğinde hata oluştu:", error);
    });
});

// Şarkı güncellendiğinde Firebase'i güncelle
function updateSong(newSong) {
  database.ref("songs/current").set(newSong);
}

// Firebase'den değişiklikleri dinle ve bildirim gönder
database.ref("songs/current").on("value", (snapshot) => {
  const newSong = snapshot.val();
  if (newSong) {
    // Bildirim gönderme işlemi (FCM veya başka bir hizmet kullanarak)
    const messaging = firebase.messaging();
    messaging
      .requestPermission()
      .then(() => {
        const token = messaging.getToken();
        // Token'ı kullanarak bildirim gönder
        // ...
      })
      .catch((err) => {
        console.log("An error occurred while requesting permission:", err);
      });
  }
});
