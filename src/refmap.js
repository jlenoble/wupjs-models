export default class RefMap {
  constructor () {
    const _map = new Map();
    const _refs = new Map();

    const removeRef = key => {
      const referends = _refs.get(key);

      if (referends) {
        const item = _map.get(key);

        Array.from(referends).forEach(([referend, removeProps]) => {
          Array.from(removeProps).forEach(removeProp => {
            referend[removeProp](item);
          });
        });

        _refs.delete(key);
      }
    };

    Object.defineProperties(this, {
      get: {
        value: key => _map.get(key),
      },

      set: {
        value: (key, value) => {
          _map.set(key, value);
        },
      },

      delete: {
        value: key => {
          removeRef(key);
          _map.delete(key);
        },
      },

      addRefs: {
        value: (referend, items, removeProp) => {
          items.forEach(({itemId}) => {
            if (!_refs.has(itemId)) {
              _refs.set(itemId, new Map());
            }

            const referends = _refs.get(itemId);

            if (!referends.has(referend)) {
              referends.set(referend, new Set());
            }

            referends.get(referend).add(removeProp);
          });
        },
      },

      removeRefs: {
        value: items => {
          items.forEach(({itemId}) => removeRef(itemId));
        },
      },

      refCount: {
        get () {
          let n = 0;

          for (let referends of _refs.values()) {
            for (let removeProps of referends.values()) {
              n += removeProps.size;
            }
          }

          return n;
        },
      },
    });
  }
}

export class ReferringMap {
  constructor ({refMap, itemsProp, addProp, removeProp} = {}) {
    const _map = new Map();

    Object.defineProperties(this, {
      get: {
        value: key => _map.get(key),
      },

      set: {
        value: (key, elt) => {
          _map.set(key, elt);
          refMap.addRefs(elt, elt[itemsProp], removeProp);
        },
      },

      add: {
        value: (key, items) => {
          const referend = this.get(key);
          items.forEach(item => referend[addProp](item));
          refMap.addRefs(referend, items, removeProp);
        },
      },

      remove: {
        value: (key, items) => {
          const referend = this.get(key);
          items.forEach(item => referend[removeProp](item));
          refMap.removeRefs(items);
        },
      },

      delete: {
        value: key => {
          const referend = this.get(key);
          refMap.removeRefs(referend.items);
          _map.delete(key);
        },
      },
    });
  }
}
