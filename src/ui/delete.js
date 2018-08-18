import {terminal as term} from 'terminal-kit';
import {LocalStorage} from 'node-localstorage';
import {WUP_STORAGE} from './config';

const localStorage = new LocalStorage(WUP_STORAGE);

function terminate () {
  setTimeout(() => {
    term.processExit();
  });
}

function read () {
  const items = {};
  const len = localStorage.length;

  for (let i = 0; i < len; i++) {
    const key = localStorage.key(i);
    items[key] = localStorage.getItem(key);
  }

  return items;
}

const map = read();
const keys = Object.keys(map);
const items = Object.values(map);
let selectedIndex = 0;

function deleteItem () {
  term.fullscreen();

  if (!keys.length) {
    term.bold.cyan('Nothing left to delete\n');
    return terminate();
  } else {
    term.bold.cyan('Select an item to delete\n');
  }

  return term.singleColumnMenu(items, {
    selectedIndex,
    exitOnUnexpectedKey: true,
  }).promise.then(response => {
    if (response.selectedIndex === undefined) {
      return terminate();
    }

    selectedIndex = response.selectedIndex;

    const key = keys[selectedIndex];
    localStorage.removeItem(key);

    keys.splice(selectedIndex, 1);
    items.splice(selectedIndex, 1);

    if (selectedIndex >= keys.length) {
      selectedIndex = keys.length - 1;
    }

    return deleteItem();
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

deleteItem();
