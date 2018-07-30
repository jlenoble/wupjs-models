import Item from './item';
import Selection from './selection';

export default class UI {
  constructor ({itemId = uid, selectionId = uid} = {}) {
    Object.defineProperties(this, {
      itemId: {
        value: itemId,
        enumerable: true,
      },

      selectionId: {
        value: selectionId,
        enumerable: true,
      },

      items: {
        value: new Map(),
        enumerable: true,
      },

      selections: {
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
    const {selectionId} = this.items.get(itemId);
    this.items.delete(itemId);

    if (selectionId) {
      this.selections.delete(selectionId);
    }
  }

  getItem (itemId) {
    return this.items.get(itemId);
  }

  newSelection ({title, items} = {}) {
    const itemId = this.itemId();
    const selectionId = this.selectionId();
    const selection = new Selection({title, items});

    this.items.set(itemId, selection);
    this.selections.set(selectionId, selection);
    selection.itemId = itemId;
    selection.selectionId = selectionId;

    return selection;
  }

  updateSelection (selectionId, {title, items} = {}) {
    if (title) {
      const {itemId} = this.selections.get(selectionId);
      this.updateItem(itemId, title);
    }

    if (items) {
      this.getSelection(selectionId).items = items;
    }
  }

  destroySelection (selectionId) {
    this.destroyItem(this.selections.get(selectionId).itemId);
  }

  getSelection (selectionId) {
    return this.selections.get(selectionId);
  }
}

let n = 0;

export function uid () {
  return ++n;
}
