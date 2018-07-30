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
    const itemId = this.itemId();
    const item = new Item(title);

    this.items.set(itemId, item);
    item.itemId = itemId;

    return itemId;
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
