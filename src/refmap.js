export default class RefMap {
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
