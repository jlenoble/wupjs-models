import {terminal as term} from 'terminal-kit';
import {LocalStorage} from 'node-localstorage';
import {WUP_STORAGE} from './config';

term.fullscreen();

const localStorage = new LocalStorage(WUP_STORAGE);

function terminate () {
  setTimeout(() => {
    term.processExit();
  });
}

function read () {
  const len = localStorage.length;

  if (len) {
    term.bold.cyan('Reading all items\n\n');
  } else {
    term.bold.cyan('Empty storage\n');
    return terminate();
  }

  for (let i = 0; i < len; i++) {
    const key = localStorage.key(i);
    console.log(localStorage.getItem(key));
  }

  return terminate();
}

read();
