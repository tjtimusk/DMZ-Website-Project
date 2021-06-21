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
const thumbnailOverlay = document.querySelector('.thumbnail-overlay');
//Track Array & Index
let trackIndex = 0;

/*-------------------------------------------------------------------------------------------------------------Functions--------------------------------------*/

//Load Track To the Player
let loadTrack = () => {
  coverSource = covers[trackIndex].getAttribute('src')
  title.innerText = infoTitle[trackIndex].innerText;
  artist.innerText = infoArtist[trackIndex].innerText;

  audio.src = audioSources[trackIndex].getAttribute('href');
  thumbnailContainer.style.background = ` linear-gradient(rgba(0, 0, 0, 0.1),
      rgba(0, 0, 0, 0.1)), url('${coverSource}') no-repeat center center/contain`;

};

loadTrack();

// Fading Thumbnail Function
let fadeThumbnail = () => {
  if(audioPlayerContainer.classList.contains('playing')) {
    thumbnailContainer.addEventListener('mouseout', () => {
      if(audioPlayerContainer.classList.contains('playing')) {
        thumbnailOverlay.style.opacity = `0`;
      }
    })
  } else {
    setTimeout((thumbnailOverlay.style.opacity = `.6`), 200);
  }
}

//Play/Pause Functions
let playTrack = () => {
  audioPlayerContainer.classList.add('playing');
  playButton.querySelector('i.fa').classList.remove('fa-play');
  playButton.querySelector('i.fa').classList.add('fa-pause');
  audio.play();
  setTimeout(fadeThumbnail(), 200);
};

let pauseTrack = () => {
  audioPlayerContainer.classList.remove('playing');
  playButton.querySelector('i.fa').classList.remove('fa-pause');
  playButton.querySelector('i.fa').classList.add('fa-play');

  audio.pause();
  setTimeout(fadeThumbnail(), 200);
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

prevButton.addEventListener('click', () => {
  prevTrack()
  if(audioPlayerContainer.classList.contains('playing')) {
    thumbnailOverlay.style.opacity = `0`;
  }
});

nextButton.addEventListener('click', () => {
  nextTrack()
  if(audioPlayerContainer.classList.contains('playing')) {
    thumbnailOverlay.style.opacity = `0`;
  }
});

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextTrack);

progressContainer.addEventListener('click', setProgress);

thumbnailContainer.addEventListener('mouseover', () => {
  thumbnailOverlay.style.opacity = `.6`;
});