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
let selectedText = '';

function selectItem () {
  term.fullscreen();

  if (!keys.length) {
    term.bold.cyan('Nothing to update\n');
    return terminate();
  } else {
    term.bold.cyan('Select an item to update\n');
  }

  return term.singleColumnMenu(items, {
    selectedIndex,
    exitOnUnexpectedKey: true,
  }).promise.then(response => {
    if (response.selectedIndex === undefined) {
      return terminate();
    }

    selectedIndex = response.selectedIndex;
    selectedText = response.selectedText;

    return updateItem();
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

function updateItem () {
  term.fullscreen();
  term.bold.cyan('Editing\n');

  term.moveTo(1, 3);
  term('>');
  term.moveTo(3, 3);

  return term.inputField({
    cancelable: true,
    default: selectedText,
  }).promise.then(input => {
    if (!input) {
      return terminate();
    }

    const key = keys[selectedIndex];
    localStorage.setItem(key, input);
    items[selectedIndex] = input;

    return selectItem();
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

selectItem();
