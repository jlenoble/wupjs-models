import Item from './item';

export default class Selection extends Item {
  constructor ({title, items} = {}) {
    super(title);

    let _items = [...items];

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
          _items = [...items];
        },
      },

      itemIds: {
        get () {
          return _items.map(item => item.itemId);
        },
        enumerable: true,
      },
    });
  }

  getTitles () {
    return this.items.map(item => item.title);
  }
}
