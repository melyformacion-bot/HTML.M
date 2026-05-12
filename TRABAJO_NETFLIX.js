const songs = [
  {
    title: "Tití Me Preguntó",
    artist: "Bad Bunny",
    duration: "4:03",
    cover: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=300&q=80",
    video: "https://www.youtube.com/embed/Cr8K88UcO0s",
    lyrics: "Letra de demostración\nLa noche suena fuerte y la ciudad no se apaga\nBailamos entre luces, ritmo y miradas\nEsta pantalla muestra el estilo de la canción\nCon texto de ejemplo para tu proyecto."
  },
  {
    title: "Efecto",
    artist: "Bad Bunny",
    duration: "3:30",
    cover: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=300&q=80",
    video: "https://www.youtube.com/embed/NfUm9_gF9nE",
    lyrics: "Letra de demostración\nSube el volumen, baja la presión\nTodo se mueve con la misma vibración\nEl fondo respira como un club encendido\nY la música marca el camino."
  },
  {
    title: "Ojitos Lindos",
    artist: "Bad Bunny, Bomba Estéreo",
    duration: "3:18",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=300&q=80",
    video: "https://www.youtube.com/embed/10EX-_h4pYc",
    lyrics: "Letra de demostración\nUna vibra suave cruza la habitación\nColores verdes, bajos y emoción\nMiradas bonitas, playlist abierta\nLa ventana cae y la escena despierta."
  },
  {
    title: "Me Porto Bonito",
    artist: "Bad Bunny, Chencho Corleone",
    duration: "2:58",
    cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=300&q=80",
    video: "https://www.youtube.com/embed/saGYMhApaH8",
    lyrics: "Letra de demostración\nEl beat entra limpio, la pista responde\nEl panel se abre, la lista se esconde\nTodo conserva el negro y verde original\nComo una app musical."
  },
  {
    title: "Moscow Mule",
    artist: "Bad Bunny",
    duration: "4:11",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=300&q=80",
    video: "https://www.youtube.com/embed/p38WgakuYDo",
    lyrics: "Letra de demostración\nPlay en la barra, brillo en el cristal\nUn video arriba como ventana principal\nLa canción elegida cambia todo el reproductor\nY mantiene vivo el color."
  },
  {
    title: "Después de la Playa",
    artist: "Bad Bunny",
    duration: "2:51",
    cover: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&w=300&q=80",
    video: "https://www.youtube.com/embed/a5rlgE6dcBY",
    lyrics: "Letra de demostración\nPercusión, arena y luces al final\nEl diseño se siente oscuro y tropical\nPuedes cambiar esta letra por la que necesites\nSin tocar la estructura."
  },
  {
    title: "Andrea",
    artist: "Bad Bunny, Buscabulla",
    duration: "3:55",
    cover: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=300&q=80",
    video: "https://www.youtube.com/embed/44mEtjB3fKk",
    lyrics: "Letra de demostración\nUna historia tranquila sobre un fondo musical\nTexto amplio, lectura clara, panel vertical\nEl contenido baja con transición suave\nY todo queda centrado."
  },
  {
    title: "La Difícil",
    artist: "Bad Bunny",
    duration: "3:09",
    cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=300&q=80",
    video: "https://www.youtube.com/embed/fEYUoBgYKzw",
    lyrics: "Letra de demostración\nSonido urbano, sombra y neón\nLa fila activa cambia el reproductor\nLa imagen, el título y el tiempo se actualizan\nCuando haces clic."
  }
];

const playlistPanel = document.querySelector("#playlistPanel");
const toggleList = document.querySelector("#toggleList");
const closeList = document.querySelector("#closeList");
const songList = document.querySelector("#songList");
const videoWindow = document.querySelector("#videoWindow");
const closeVideo = document.querySelector("#closeVideo");
const videoTitle = document.querySelector("#videoTitle");
const videoArtist = document.querySelector("#videoArtist");
const musicVideo = document.querySelector("#musicVideo");
const duration = document.querySelector("#duration");
const lyrics = document.querySelector("#lyrics");
const footerCover = document.querySelector("#footerCover");
const footerTitle = document.querySelector("#footerTitle");
const footerArtist = document.querySelector("#footerArtist");
const footerDuration = document.querySelector("#footerDuration");


/**Boton de salir */
const salir = document.querySelector("#salir");

salir.addEventListener('click',regresar);

function regresar(){
   const url = "index.html";

setTimeout(() => {
    window.location.href = url;
},30);
}


function renderSongs() {
  songList.innerHTML = "";

  songs.forEach((song, index) => {
    const row = document.createElement("button");
    row.className = "song-row";
    row.type = "button";
    row.innerHTML = `
      <img src="${song.cover}" alt="${song.title}">
      <span>
        <span class="song-title">${song.title}</span>
        <span class="song-artist">${song.artist}</span>
      </span>
      <span class="song-artist">${song.duration}</span>
      <span>•••</span>
    `;

    row.addEventListener("click", () => selectSong(index, row));
    songList.appendChild(row);
  });
}

function selectSong(index, selectedRow) {
  const song = songs[index];

  document.querySelectorAll(".song-row").forEach((row) => row.classList.remove("active"));
  selectedRow.classList.add("active");

  videoTitle.textContent = song.title;
  videoArtist.textContent = song.artist;
  musicVideo.src = song.video;
  duration.textContent = song.duration;
  lyrics.textContent = song.lyrics;

  footerCover.src = song.cover;
  footerCover.alt = song.title;
  footerTitle.textContent = song.title;
  footerArtist.textContent = song.artist;
  footerDuration.textContent = song.duration;

  videoWindow.classList.add("is-open");
}

toggleList.addEventListener("click", () => {
  playlistPanel.classList.toggle("is-open");
});

closeList.addEventListener("click", () => {
  playlistPanel.classList.remove("is-open");
});

closeVideo.addEventListener("click", () => {
  videoWindow.classList.remove("is-open");
  musicVideo.src = musicVideo.src;
});

videoWindow.addEventListener("click", (event) => {
  if (event.target === videoWindow) {
    videoWindow.classList.remove("is-open");
    musicVideo.src = musicVideo.src;
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    videoWindow.classList.remove("is-open");
    playlistPanel.classList.remove("is-open");
  }
});

renderSongs();
