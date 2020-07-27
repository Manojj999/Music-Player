const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');

const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration')

const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');


//music

const songs = [

  {
    name: 'Ek-Zindgi',
    displayName: 'Ek Zindgi',
    artist: 'Tanishkaa, Sachin-Jigar',
  },
  {
    name: 'Sage',
    displayName: 'Sage',
    artist: 'Ritviz',
  },
  {
    name: 'Naachne-Ka-Shaunq',
    displayName: 'Naachne Ka Shaunq',
    artist: 'Raftaar, Brodha V',
  },
  {
    name: 'Kudi-Nu-Nachne-De',
    displayName: 'Kudi Nu Nachne De',
    artist: 'Sachin-Jigar',
  },
  {
    name: 'Unstoppable',
    displayName: 'Unstoppable',
    artist: 'Ananya Birla',
  },
  {
    name: 'Sultan-KGF',
    displayName: 'Sultan-KGF',
    artist: 'Ravi Basrur',
  },
  {
    name: 'wishList',
    displayName: 'Wishlist',
    artist: 'Dino James',
  },
];





//check if Music Playing or not

let isplaying = false;

//for PLay
function playSong() {
  isplaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');

  music.play();
}

//for Pause
function pauseSong() {
  isplaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play ');
  music.pause();
}

//play or Pause

playBtn.addEventListener('click', () => (isplaying ? pauseSong() : playSong()));

//Update Song

function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;

}


//Current Song
let songIndex = 0;

//Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}


//Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}

//progressBar fun
function updateProgressBar(e) {
  if (isplaying) {
    const { duration, currentTime } = e.srcElement;


    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`

    //get End time of Song
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }


    //delay for avoid NAN
    if (durationSeconds) {
      durationElement.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // get Starting Time of Song

    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeElement.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

function setProgressBar(e) {

  const width = this.clientWidth;

  const clickX = e.offsetX;


  const { duration } = music;

  music.currentTime = (clickX / width) * duration;

}

//play first song

loadSong(songs[songIndex]);


// Event Listeners

//Previous Song EVent
prevBtn.addEventListener('click', prevSong);
//Next Song EVent
nextBtn.addEventListener('click', nextSong);
//progress EVent
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
//for next song when song is ended
music.addEventListener('ended', nextSong);