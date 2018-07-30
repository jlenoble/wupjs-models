import Item from './item';

export default class UI {
  constructor ({itemId = uid} = {}) {
    Object.defineProperties(this, {
      itemId: {
        value: itemId,
        enumerable: true,
      },

      items: {
        value: new Map(),
        enumerable: true,
      },
    });
  }

  newItem (title) {
    const itemId = this.itemId();
    const item = new Item(title);

    this.items.set(itemId, item);
    item.itemId = itemId;

    return item;
  }

  updateItem (itemId, title) {
    this.getItem(itemId).title = title;
  }

  destroyItem (itemId) {
    this.items.delete(itemId);
  }

  getItem (itemId) {
    return this.items.get(itemId);
  }
}

let n = 0;

export function uid () {
  return ++n;
}
