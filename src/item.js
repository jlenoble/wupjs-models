export default class Item {
  constructor (title) {
    Object.defineProperties(this, {
      title: {
        value: title,
        enumerable: true,
        writable: true,
      },

      uid: {
        set (uid) {
          Object.defineProperty(this, 'uid', {
            value: uid,
            enumerable: true,
            configurable: false,
          });
        },
        configurable: true,
      },
    });
  }
}
