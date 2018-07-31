import Item from './item';

export default class Selection extends Item {
  constructor ({title, items} = {}) {
    super(title);

    const _items = new Set(items);

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
          return Array.from(_items);
        },
      },

      add: {
        value: item => _items.add(item),
      },

      remove: {
        value: item => _items.delete(item),
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
