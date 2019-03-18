import EventEmitter from 'events';
import EventEmitterSet from './helpers/event-emitter-set';

const categories = new Map();

export default class CollectionType {
  constructor (name) {
    if (name) {
      return this.makeCategory(name);
    }
    return this.makeList();
  }

  makeCategory (name) {
    const List = this.makeList();
    const elements = new List();
    const fwd = new Map();
    const bck = new Map();
    const update = (li1, li2) => {
      const o = fwd.get(li1);
      if (o) {
        bck.set(o, li2);
        fwd.delete(li1);
        fwd.set(li2, o);
        elements.delete(li1);
        elements.add(li2);
      }
    };

    class Category extends List {
      add (obj) {
        let o;

        if (elements.has(obj)) {
          o = fwd.get(obj);
        } else {
          elements.add(obj);
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
        return super.delete(fwd.get(li));
      }

      update (li1, li2) {
        update(li1, li2);
        this.unselect(li1);
        this.select(li2);
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

      [Symbol.iterator] () {
        return {
          next: function () {
            const {value, done} = this.iterator.next();
            if (done) {
              return {done};
            }
            const li = bck.get(value);
            return li ? {value: li, done: false} : this.next();
          },
          iterator: super[Symbol.iterator](),
        };
      }

      static has (li) {
        return elements.has(li);
      }

      static clear () {
        elements.clear();
        fwd.clear();
        bck.clear();
      }

      static equiv (collection) {
        return elements.equiv(collection);
      }

      static contains (collection) {
        return elements.contains(collection);
      }

      static [Symbol.iterator] () {
        return elements[Symbol.iterator]();
      }
    }

    Object.defineProperties(Category, {
      name: {value: name, enumerable: true},
      size: {
        get: () => elements.size,
        enumerable: true,
      },
    });

    return Category;
  }

  makeList () {
    const eventAggregator = new EventEmitter();

    return class List extends EventEmitterSet {
      constructor (objs) {
        super(objs, {eventAggregator});

        Object.defineProperties(this, {
          currentSelection: {value: new Set()},
        });
      }

      delete (li) {
        this.unselect(li);
        return super.delete(li);
      }

      clear () {
        this.clearSelected();
        return super.clear();
      }

      update (li1, li2) {
        if (this.has(li1)) {
          const selected = this.isSelected(li1);
          this.delete(li1);
          this.add(li2);
          if (selected) {
            this.select(li2);
          }
        }
      }

      select (li) {
        if (this.has(li)) {
          this.currentSelection.add(li);
        }
      }

      unselect (li) {
        this.currentSelection.delete(li);
      }

      isSelected (li) {
        return this.currentSelection.has(li);
      }

      getSelected () {
        return new List(this.currentSelection);
      }

      clearSelected () {
        this.currentSelection.clear();
      }

      categorize (name) {
        if (!categories.has(name)) {
          categories.set(name, new CollectionType(name));
        }
        const Category = categories.get(name);
        return new Category(this);
      }

      equiv (collection) {
        return (collection.size || collection.length) == this.size &&
          this.contains(collection);
      }

      contains (collection) {
        if ((collection.size || collection.length) > this.size) {
          return false;
        }
        let eq = true;
        for (const item of collection) {
          eq = eq && this.has(item);
        }
        return eq;
      }
    };
  }
}
