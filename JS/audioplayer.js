//Get Documents
const audioPlayerContainer = document.querySelector('.audio-player-container');
const playButton = document.querySelector('#play');
const prevButton = document.querySelector('#prev');
const nextButton = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progressBar = document.querySelector('.progress-bar');
const progressContainer = document.querySelector('#progress-container');
const title = document.querySelector('#title');
const artist = document.querySelector('#artist-name');
const audioSources = document.getElementsByClassName('audio-source');
const infoTitle = document.getElementsByClassName('info-title');
const infoArtist = document.getElementsByClassName('info-artist');
const covers = document.getElementsByClassName('cover-art');
const thumbnailContainer = document.querySelector('.thumbnail-container');
//Track Array & Index
let trackIndex = 0;

/*-------------------------------------------------------------------------------------------------------------Functions--------------------------------------*/

//Load Track To the Player
let loadTrack = () => {
  coverSource = covers[trackIndex].getAttribute('src')
  title.innerText = infoTitle[trackIndex].innerText;
  artist.innerText = infoArtist[trackIndex].innerText;

  audio.src = audioSources[trackIndex].getAttribute('href');
  thumbnailContainer.style.background = ` linear-gradient(rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.4)), url('${coverSource}') no-repeat center center/contain`;
};

loadTrack();

//Play/Pause Functions
let playTrack = () => {
  audioPlayerContainer.classList.add('playing');
  playButton.querySelector('i.fa').classList.remove('fa-play');
  playButton.querySelector('i.fa').classList.add('fa-pause');

  audio.play();
};

let pauseTrack = () => {
  audioPlayerContainer.classList.remove('playing');
  playButton.querySelector('i.fa').classList.remove('fa-pause');
  playButton.querySelector('i.fa').classList.add('fa-play');

  audio.pause();
};

//Prev/Next Functions

let prevTrack = () => {
  trackIndex--;
  if(trackIndex < 0) {
    trackIndex = (audioSources.length - 1)
  };
  loadTrack();
  playTrack();
};

let nextTrack = () => {
  trackIndex++;
  if(trackIndex > (audioSources.length - 1)) {
    trackIndex = 0
  };
  loadTrack();
  playTrack();
};

// Progress Bar Functions
let updateProgress = (e) => {
  let {
    duration,
    currentTime
  } = e.srcElement;
  const progressPercent = ((currentTime / duration) * 100);
  progressBar.style.width = `${progressPercent}%`;
};

let setProgress = (e) => {
  const width = progressContainer.clientWidth
  console.log(width);
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
};



//Clicks (Event Listeners)
playButton.addEventListener('click', () => {
  const isPlaying = audioPlayerContainer.classList.contains('playing');
  if(isPlaying) {
    pauseTrack()
  } else {
    playTrack()
  }
});

prevButton.addEventListener('click', prevTrack);
nextButton.addEventListener('click', nextTrack);

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextTrack);

progressContainer.addEventListener('click', setProgress);