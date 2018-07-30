export default class Item {
  constructor (title) {
    Object.defineProperties(this, {
      title: {
        value: title,
        enumerable: true,
        writable: true,
      },

      itemId: {
        set (itemId) {
          Object.defineProperty(this, 'itemId', {
            value: itemId,
            enumerable: true,
            configurable: false,
          });
        },
        configurable: true,
      },
    });
  }
}
