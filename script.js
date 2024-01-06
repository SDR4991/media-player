const music = document.querySelector('audio');
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const playBtn = document.getElementById('play');

let isPlaying = false;
let songIndex = 0;

//songs array

const songs = [
    {
        name:'jacinto-1',
        displayName:'Electric Chill Machine',
        artist:'Jacinto Design',
    },
    {
        name:'jacinto-2',
        displayName:'Seven Nation Army(Remix)',
        artist:'Jacinto Design',
    },
    {
        name:'jacinto-3',
        displayName:'Goodnight,Disco Queen',
        artist:'Jacinto Design',
    },
    {
        name:'metric-1',
        displayName:'Front Row (Remix)',
        artist:'Metric / Jacinto Design',
    },
]

function playSong(){
    music.play();
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','Pause');
    isPlaying=true;
}

function pauseSong(){
    music.pause();
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','Play');
    isPlaying=false;
}

playBtn.addEventListener('click', ()=>(isPlaying ? pauseSong() : playSong()));

function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

loadSong(songs[songIndex]);

function nextSong(){
    songIndex++;
    if(songIndex > songs.length - 1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
}

function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
}

prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);