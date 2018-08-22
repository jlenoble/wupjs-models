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

    const uuid = uuidv5('ideas', WUP_NAMESPACE);
    let items = JSON.parse(this.storage.getItem(uuid));

    if (!items) {
      items = [];
      this.storage.setItem(uuid, JSON.stringify(items));
    }

    Object.defineProperties(this, {
      items: {
        value: items,
      },
    });
  }

  async menu () {
    this.term.fullscreen();
    this.term.saveCursor();
    return this._menu();
  }

  async _menu () {
    const items = ['Create', 'Read', 'Update', 'Delete', 'Exit'];

    const options = {
      y: 1, // the menu will be on the top of the terminal
      style: this.term.inverse,
      selectedStyle: this.term.dim.blue.bgGreen,
    };

    try {
      const response = await this.term.singleLineMenu(items, options).promise;

      switch (response.selectedText) {
      case 'Create':
        return this.create();

      case 'Read':
        return this.read();

      case 'Update':
        return this.update();

      case 'Delete':
        return this.delete();

      case 'Exit': default:
        return this.exit('Exiting...');
      }
    } catch (error) {
      this.exit(error);
    }
  }

  async exit (error) {
    this.term.restoreCursor();

    if (error instanceof Error) {
      this.term.nextLine().red(error);
    } else {
      this.term.nextLine().cyan('Exiting...').eraseLineAfter();
    }

    this.term.processExit();
  }

  async create () {
    try {
      // Creation header
      this.term.fullscreen();

      this.term.bold.cyan('Type anything on the keyboard\n');
      this.term.bold.green('Press ESC to return to menu\n');
      this.term.moveTo(1, 6);
      this.term.saveCursor();
      this.term.moveTo(1, 4);
      this.term('>');
      this.term.moveTo(3, 4);

      // Creation loop
      return this._create();
    } catch (error) {
      this.exit(error);
    }
  }

  async _create () {
    try {
      const input = await this.term.inputField({cancelable: true}).promise;

      if (!input) {
        return this.menu();
      }

      const uuid = uuidv5(new Date().toISOString(), WUP_NAMESPACE);

      this.term.restoreCursor();
      console.log(input);
      this.term.saveCursor();

      this.term.moveTo(3, 4);
      this.term.eraseLineAfter();

      this.storage.setItem(uuid, input);
      this.items.push(uuid);
      this.storage.setItem(uuidv5('ideas', WUP_NAMESPACE),
        JSON.stringify(this.items));

      return this._create();
    } catch (error) {
      this.exit(error);
    }
  }

  async read () {
    this.term.nextLine();

    const len = this.items.length;

    if (len) {
      this.term.bold.cyan('Reading all items\n\n');
    } else {
      this.term.bold.cyan('Empty storage\n');
      return this._menu();
    }

    for (let i = 0; i < len; i++) {
      const key = this.items[i];
      console.log(this.storage.getItem(key));
    }

    this.term.saveCursor();

    return this._menu();
  }

  async _read () {
    const len = this.items.length;
    const map = {};

    for (let i = 0; i < len; i++) {
      const key = this.items[i];
      map[key] = this.storage.getItem(key);
    }

    return map;
  }

  async update () {
    const map = await this._read();
    const keys = Object.keys(map);
    const items = Object.values(map);
    let selectedIndex = 0;

    return this._select(keys, items, selectedIndex);
  }

  async _update (keys, items, selectedIndex, selectedText) {
    try {
      this.term.fullscreen();
      this.term.bold.cyan('Editing\n');

      this.term.moveTo(1, 3);
      this.term('>');
      this.term.moveTo(3, 3);

      const input = await this.term.inputField({
        cancelable: true,
        default: selectedText,
      }).promise;

      if (!input) {
        return this.menu();
      }

      const key = keys[selectedIndex];
      this.storage.setItem(key, input);
      items[selectedIndex] = input; // eslint-disable-line no-param-reassign

      return this._select(keys, items, selectedIndex);
    } catch (error) {
      this.exit(error);
    }
  }

  async delete () {
    const map = await this._read();
    const keys = Object.keys(map);
    const items = Object.values(map);
    let selectedIndex = 0;

    return this._delete(keys, items, selectedIndex);
  }

  async _delete (keys, items, selectedIndex) {
    try {
      this.term.fullscreen();

      if (!keys.length) {
        this.term.bold.cyan('\nNothing left to delete');
        this.term.saveCursor();
        return this._menu();
      } else {
        this.term.bold.cyan('Select an item to delete\n');
        this.term.bold.green('Press ESC to return to menu\n');
      }

      const response = await this.term.singleColumnMenu(items, {
        selectedIndex,
        exitOnUnexpectedKey: true,
      }).promise;

      if (response.selectedIndex === undefined) {
        return this.menu();
      }

      let _selectedIndex = response.selectedIndex;

      const key = keys[_selectedIndex];
      this.storage.removeItem(key);

      keys.splice(_selectedIndex, 1);
      items.splice(_selectedIndex, 1);
      this.items.splice(_selectedIndex, 1);
      this.storage.setItem(uuidv5('ideas', WUP_NAMESPACE),
        JSON.stringify(this.items));

      if (_selectedIndex >= keys.length) {
        _selectedIndex = keys.length - 1;
      }

      return this._delete(keys, items, _selectedIndex);
    } catch (error) {
      this.exit(error);
    }
  }

  async _select (keys, items, selectedIndex) {
    try {
      this.term.fullscreen();

      if (!keys.length) {
        this.term.bold.cyan('\nNothing to update');
        return this._menu();
      } else {
        this.term.bold.cyan('Select an item to update and press ENTER\n');
        this.term.bold.green('Press ESC to return to menu\n');
      }

      const response = await this.term.singleColumnMenu(items, {
        selectedIndex,
        exitOnUnexpectedKey: true,
      }).promise;

      if (response.selectedIndex === undefined) {
        return this.menu();
      }

      return this._update(keys, items, response.selectedIndex,
        response.selectedText);
    } catch (error) {
      this.exit(error);
    }
  }
}

const ui = new UI();
ui.menu();
