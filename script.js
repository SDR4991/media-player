const music = document.querySelector('audio');
const image = document.querySelector('img');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
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

function nextSong(){
    songIndex++;
    if(songIndex > songs.length - 1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

loadSong(songs[songIndex]);

function updateProgressBar(e){
    if(isPlaying){
        // Total Duration
        const {duration ,currentTime} = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`
        }
        if(durationSeconds){
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`
        }
        // Current Time
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if(currentSeconds < 10){
            currentSeconds = `0${currentSeconds}`
        }
        currentTimeEl.textContent= `${currentMinutes}:${currentSeconds}`
    }
}

function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} =music;
    music.currentTime=(clickX/width) * duration;
}

prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('ended',nextSong);
music.addEventListener('timeupdate',updateProgressBar);
progressContainer.addEventListener('click',setProgressBar);