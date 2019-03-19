import makeListType from './list';

export default function makeCategoryType ({name}) {
  const List = makeListType();
  const fwd = new Map();
  const bck = new Map();
  const update = (li1, li2) => {
    const o = fwd.get(li1);
    if (o) {
      bck.set(o, li2);
      fwd.delete(li1);
      fwd.set(li2, o);
    }
  };

  class Category extends List {
    constructor (objs) {
      super(objs);

      Object.defineProperty(this, 'size', {
        get: () => {
          let size = 0;
          // eslint-disable-next-line no-unused-vars
          for (const v of this) { // Implicit garbage collection, see iterator
            size++;
          }
          return size;
        },
      });
    }

    add (obj) {
      let o;

      if (fwd.has(obj)) {
        o = fwd.get(obj);
      } else {
        o = {};
        fwd.set(obj, o);
        bck.set(o, obj);
      }

      return super.add(o);
    }

    has (obj) {
      return super.has(fwd.get(obj));
    }

    delete (li) {
      this.unselect(li);
      return super._delete(fwd.get(li));
    }

    erase (li) {
      this.delete(li);
      return Category.delete(li);
    }

    update (li1, li2) {
      const selected = this.isSelected(li1);
      this.unselect(li1);
      update(li1, li2);
      if (selected) {
        this.select(li2);
      }
    }

    select (li) {
      if (this.has(li)) {
        this.currentSelection.add(fwd.get(li));
      }
    }

    unselect (li) {
      this.currentSelection.delete(fwd.get(li));
    }

    isSelected (li) {
      return this.currentSelection.has(fwd.get(li));
    }

    getSelected () {
      return new Category(Array.from(this.currentSelection).map(o => {
        return bck.get(o);
      }).filter(o => o)); // Don't copy erased elements
    }

    garbageCollect (collection) {
      for (const item of collection) {
        this.currentSelection.delete(item);
        super._delete(item);
      }
    }

    [Symbol.iterator] () {
      return {
        next: function () {
          const {value, done} = this.iterator.next();

          if (done) {
            if (this.garbage) {
              this.garbageCollect(this.garbage);
            }
            return {done};
          }

          const li = bck.get(value);

          if (li) {
            return {value: li, done: false};
          }

          if (!this.garbage) {
            this.garbage = [];
          }

          this.garbage.push(value);

          return this.next();
        },
        iterator: super[Symbol.iterator](),
        garbageCollect: collection => this.garbageCollect(collection),
      };
    }

    static has (li) {
      return fwd.has(li);
    }

    static delete (li) {
      if (fwd.has(li)) {
        const o = fwd.get(li);
        fwd.delete(li);
        bck.delete(o);
      }
    }

    static clear () {
      fwd.clear();
      bck.clear();
    }

    static [Symbol.iterator] () {
      return fwd.keys();
    }
  }

  Object.defineProperties(Category, {
    name: {value: name},
    size: {get: () => fwd.size},
    contains: {value: List.prototype.contains},
    equiv: {value: List.prototype.equiv},
  });

  return Category;
}
