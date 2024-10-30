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
  const response = await fetch("./assets/db/songs.json");
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
    ).innerHTML = `<iframe style='border-radius:12px' src='https://open.spotify.com/embed/track/${selectedSong}?utm_source=generator&theme=0' width='50%' height='120' frameBorder='0' allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture' loading='eager'></iframe>`;
  } else {
    const songs = await fetchSongs();
    const savedSong = songs.find((song) => song === previousSong);
    if (savedSong) {
      document.getElementById(
        "spotifyEmbed"
      ).innerHTML = `<iframe style='border-radius:12px' src='https://open.spotify.com/embed/track/${savedSong}?utm_source=generator&theme=0' width='50%' height='120' frameBorder='0' allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture' loading='eager'></iframe>`;
    }
  }
}

window.addEventListener("load", updateSongOfTheDay);
