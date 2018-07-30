import Item from './item';
import Selection from './selection';

export default class UI {
  constructor ({itemId = uid, selectionId = uid} = {}) {
    Object.defineProperties(this, {
      itemId: {
        value: itemId,
      },

      selectionId: {
        value: selectionId,
      },

      items: {
        value: new Map(),
      },

      selections: {
        value: new Map(),
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

  getItems (itemIds = []) {
    return itemIds.map(itemId => this.getItem(itemId));
  }

  newSelection ({title, itemIds} = {}) {
    const itemId = this.itemId();
    const selectionId = this.selectionId();
    const selection = new Selection({title, items: this.getItems(itemIds)});

    this.items.set(itemId, selection);
    this.selections.set(selectionId, selection);
    selection.itemId = itemId;
    selection.selectionId = selectionId;

    return selection;
  }

  updateSelection (selectionId, {title, itemIds} = {}) {
    const selection = this.getSelection(selectionId);

    if (title) {
      this.updateItem(selection.itemId, title);
    }

    if (itemIds) {
      selection.items = this.getItems(itemIds);
    }
  }

  addItemToSelection (selectionId, itemId) {
    this.getSelection(selectionId).add(this.getItem(itemId));
  }

  addItemsToSelection (selectionId, itemIds) {
    this.getSelection(selectionId).add(...this.getItems(itemIds));
  }

  removeItemFromSelection (selectionId, itemId) {
    this.getSelection(selectionId).remove(this.getItem(itemId));
  }

  removeItemsFromSelection (selectionId, itemIds) {
    this.getSelection(selectionId).remove(...this.getItems(itemIds));
  }

  destroySelection (selectionId) {
    this.destroyItem(this.getSelection(selectionId).itemId);
  }

  getSelection (selectionId) {
    return this.selections.get(selectionId);
  }
}

let n = 0;

export function uid () {
  return ++n;
}
