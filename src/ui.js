import Item from './item';
import Selection from './selection';

class RefMap {
  constructor ({itemMap, itemsProp, addProp, removeProp} = {}) {
    const _map = new Map();
    const _refs = !itemMap && new Map();

    if (_refs) {
      _refs.deleteRefs = key => {
        const referands = _refs.get(key);

        if (referands) {
          const item = _map.get(key);

          Array.from(referands).forEach(([referand, removeProps]) => {
            Array.from(removeProps).forEach(removeProp => {
              referand[removeProp](item);
            });
          });

          _refs.delete(key);
        }
      };
    }

    Object.defineProperties(this, {
      get: {
        value: key => _map.get(key),
      },

      set: {
        value: itemMap ? (key, value) => {
          _map.set(key, value);
          itemMap.addRefs(value, value[itemsProp], removeProp);
        } : (key, value) => {
          _map.set(key, value);
        },
      },

      add: {
        value: itemMap ? (itemId, ...items) => {
          const item = this.get(itemId);
          item[addProp](...items);
          itemMap.addRefs(item, items, removeProp);
        } : (itemId, ...items) => {
          this.get(itemId)[addProp](...items);
        },
      },

      remove: {
        value: itemMap ? (itemId, ...items) => {
          this.get(itemId)[removeProp](...items);
          itemMap.removeRefs(items);
        } : (itemId, ...items) => {
          this.get(itemId)[removeProp](...items);
        },
      },

      delete: {
        value: _refs ? key => {
          _refs.deleteRefs(key);
          _map.delete(key);
        } : key => {
          _map.delete(key);
        },
      },

      addRefs: {
        value: (referand, items, removeProp) => {
          items.forEach(({itemId}) => {
            if (!_refs.has(itemId)) {
              _refs.set(itemId, new Map());
            }

            const referands = _refs.get(itemId);

            if (!referands.has(referand)) {
              referands.set(referand, new Set());
            }

            referands.get(referand).add(removeProp);
          });
        },
      },

      removeRefs: {
        value: items => {
          items.forEach(({itemId}) => {
            _refs.deleteRefs(itemId);
          });
        },
      },
    });
  }
}

export default class UI {
  constructor ({itemId = uid, selectionId = uid} = {}) {
    const _items = new RefMap();
    const _selections = new RefMap({
      itemMap: _items,
      itemsProp: 'items',
      addProp: 'add',
      removeProp: 'remove',
    });

    Object.defineProperties(this, {
      itemId: {
        value: itemId,
      },

      selectionId: {
        value: selectionId,
      },

      items: {
        value: _items,
      },

      selections: {
        value: _selections,
      },
    });
  }

  newItem (title) {
    const itemId = this.itemId();
    const item = new Item(title);

    item.itemId = itemId;
    this.items.set(itemId, item);

    return item;
  }

  updateItem (itemId, title) {
    this.getItem(itemId).title = title;
  }

  destroyItem (itemId) {
    const {selectionId} = this.getItem(itemId);
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

    selection.itemId = itemId;
    selection.selectionId = selectionId;
    this.items.set(itemId, selection);
    this.selections.set(selectionId, selection);

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
    this.selections.add(selectionId, this.getItem(itemId));
  }

  addItemsToSelection (selectionId, itemIds) {
    this.selections.add(selectionId, ...this.getItems(itemIds));
  }

  removeItemFromSelection (selectionId, itemId) {
    this.selections.remove(selectionId, this.getItem(itemId));
  }

  removeItemsFromSelection (selectionId, itemIds) {
    this.selections.remove(selectionId, ...this.getItems(itemIds));
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
