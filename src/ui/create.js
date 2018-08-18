import {terminal as term} from 'terminal-kit';
import {LocalStorage} from 'node-localstorage';
import uuidv5 from 'uuid/v5';
import {WUP_NAMESPACE, WUP_STORAGE} from './config';

term.fullscreen();

const localStorage = new LocalStorage(WUP_STORAGE);

function terminate () {
  setTimeout(() => {
    term.restoreCursor();
    term.processExit();
  });
}

term.bold.cyan('Type anything on the keyboard...\n');
term.moveTo(1, 5);
term.saveCursor();
term.moveTo(1, 3);
term('>');
term.moveTo(3, 3);

function create () {
  return term.inputField({cancelable: true}).promise.then(input => {
    if (!input) {
      return terminate();
    }

    const uuid = uuidv5(new Date().toISOString(), WUP_NAMESPACE);

    term.restoreCursor();
    console.log(input);
    term.saveCursor();

    term.moveTo(3, 3);
    term.eraseLineAfter();

    localStorage.setItem(uuid, input);

    return create();
  }, err => {
    if (err) {
      console.log(err.message);
    }
    terminate();
  }).catch(err => {
    if (err) {
      console.log(err.message);
    }
    terminate();
  });
}

create();
