import {terminal} from 'terminal-kit';
import {LocalStorage} from 'node-localstorage';
import uuidv5 from 'uuid/v5';
import {WUP_NAMESPACE, WUP_STORAGE} from './config';

export class UI {
  constructor () {
    Object.defineProperties(this, {
      storage: {
        value: new LocalStorage(WUP_STORAGE),
      },

      term: {
        value: terminal,
      },
    });
  }

  exit (code) {
    setTimeout(() => {
      this.term.processExit(code);
    });
  }

  create () {
    this.term.fullscreen();

    this.term.bold.cyan('Type anything on the keyboard...\n');
    this.term.moveTo(1, 5);
    this.term.saveCursor();
    this.term.moveTo(1, 3);
    this.term('>');
    this.term.moveTo(3, 3);

    const create = () => {
      return this.term.inputField({cancelable: true}).promise.then(input => {
        if (!input) {
          this.term.restoreCursor();
          return this.exit();
        }

        const uuid = uuidv5(new Date().toISOString(), WUP_NAMESPACE);

        this.term.restoreCursor();
        console.log(input);
        this.term.saveCursor();

        this.term.moveTo(3, 3);
        this.term.eraseLineAfter();

        this.storage.setItem(uuid, input);

        return create();
      }, err => {
        if (err) {
          console.log(err.message);
        }
        this.exit();
      }).catch(err => {
        if (err) {
          console.log(err.message);
        }
        this.exit();
      });
    };

    return create();
  }

  read () {
    this.term.fullscreen();

    const len = this.storage.length;

    if (len) {
      this.term.bold.cyan('Reading all items\n\n');
    } else {
      this.term.bold.cyan('Empty storage\n');
      return;
    }

    for (let i = 0; i < len; i++) {
      const key = this.storage.key(i);
      console.log(this.storage.getItem(key));
    }

    this.exit();
  }

  update () {
    const read = () => {
      const items = {};
      const len = this.storage.length;

      for (let i = 0; i < len; i++) {
        const key = this.storage.key(i);
        items[key] = this.storage.getItem(key);
      }

      return items;
    };

    const map = read();
    const keys = Object.keys(map);
    const items = Object.values(map);
    let selectedIndex = 0;
    let selectedText = '';

    const selectItem = () => {
      this.term.fullscreen();

      if (!keys.length) {
        this.term.bold.cyan('Nothing to update\n');
        return this.exit();
      } else {
        this.term.bold.cyan('Select an item to update\n');
      }

      return this.term.singleColumnMenu(items, {
        selectedIndex,
        exitOnUnexpectedKey: true,
      }).promise.then(response => {
        if (response.selectedIndex === undefined) {
          return this.exit();
        }

        selectedIndex = response.selectedIndex;
        selectedText = response.selectedText;

        return updateItem();
      }, err => {
        if (err) {
          console.log(err.message);
        }
        this.exit();
      }).catch(err => {
        if (err) {
          console.log(err.message);
        }
        this.exit();
      });
    };

    const updateItem = () => {
      this.term.fullscreen();
      this.term.bold.cyan('Editing\n');

      this.term.moveTo(1, 3);
      this.term('>');
      this.term.moveTo(3, 3);

      return this.term.inputField({
        cancelable: true,
        default: selectedText,
      }).promise.then(input => {
        if (!input) {
          return this.exit();
        }

        const key = keys[selectedIndex];
        this.storage.setItem(key, input);
        items[selectedIndex] = input;

        return selectItem();
      }, err => {
        if (err) {
          console.log(err.message);
        }
        this.exit();
      }).catch(err => {
        if (err) {
          console.log(err.message);
        }
        this.exit();
      });
    };

    selectItem();
  }

  delete () {
    const read = () => {
      const items = {};
      const len = this.storage.length;

      for (let i = 0; i < len; i++) {
        const key = this.storage.key(i);
        items[key] = this.storage.getItem(key);
      }

      return items;
    };

    const map = read();
    const keys = Object.keys(map);
    const items = Object.values(map);
    let selectedIndex = 0;

    const deleteItem = () => {
      this.term.fullscreen();

      if (!keys.length) {
        this.term.bold.cyan('Nothing left to delete\n');
        return terminate();
      } else {
        this.term.bold.cyan('Select an item to delete\n');
      }

      return this.term.singleColumnMenu(items, {
        selectedIndex,
        exitOnUnexpectedKey: true,
      }).promise.then(response => {
        if (response.selectedIndex === undefined) {
          return this.exit();
        }

        selectedIndex = response.selectedIndex;

        const key = keys[selectedIndex];
        this.storage.removeItem(key);

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
        this.exit();
      }).catch(err => {
        if (err) {
          console.log(err.message);
        }
        this.exit();
      });
    };

    deleteItem();
  }
}

const ui = new UI();
ui.delete();
