import Item from './item';

export default class Selection extends Item {
  constructor ({title, items} = {}) {
    super(title);

    let _items = new Set(items);

    Object.defineProperties(this, {
      selectionId: {
        set (selectionId) {
          Object.defineProperty(this, 'selectionId', {
            value: selectionId,
            enumerable: true,
            configurable: false,
          });
        },
        configurable: true,
      },

      items: {
        get () {
          return [..._items];
        },
        set (items) {
          _items = new Set(items);
        },
      },

      add: {
        value: (...items) => items.forEach(item => _items.add(item)),
      },

      itemIds: {
        get () {
          return this.items.map(item => item.itemId);
        },
        enumerable: true,
      },
    });
  }

  getTitles () {
    return this.items.map(item => item.title);
  }
}
