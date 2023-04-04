import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE = 'videoplayer-current-time';
const player = new Player('vimeo-player');

restoreVideoPosition();
player.on('timeupdate', throttle(saveVideoPosition, 1000));

function saveVideoPosition(e) {
  localStorage.setItem(STORAGE, e.seconds);
}

function restoreVideoPosition() {
  const currentTimeStamp = localStorage.getItem(STORAGE);
  if (currentTimeStamp) {
    player.setCurrentTime(currentTimeStamp);
  }
}
