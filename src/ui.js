import Item from './item';

export default class UI {
  constructor ({itemId} = {}) {
    Object.defineProperties(this, {
      itemId: {
        value: itemId || uid,
        enumerable: true,
      },

      items: {
        value: new Map(),
        enumerable: true,
      },
    });
  }

  newItem (title) {
    const uid = this.itemId();
    const item = new Item(title);

    this.items.set(uid, item);
    item.uid = uid;

    return uid;
  }

  updateItem (uid, title) {
    this.getItem(uid).title = title;
  }

  destroyItem (uid) {
    this.items.delete(uid);
  }

  getItem (uid) {
    return this.items.get(uid);
  }
}

let n = 0;

export function uid () {
  return ++n;
}
