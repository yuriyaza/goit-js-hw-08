import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE = 'videoplayer-current-time';

const player = new Player('vimeo-player');
let currentTimeStamp = 0;

restoreVideoPosition();
player.on('timeupdate', throttle(saveVideoPosition, 1000));

function saveVideoPosition() {
  player
    .getCurrentTime()
    .then(seconds => (currentTimeStamp = seconds))
    .catch(() => console.log(error));
  localStorage.setItem(STORAGE, currentTimeStamp);
}

function restoreVideoPosition() {
  currentTimeStamp = localStorage.getItem(STORAGE);
  if (currentTimeStamp) {
    player
      .setCurrentTime(currentTimeStamp)
      .then(() => {})
      .catch(() => console.log(error));
  }
}
