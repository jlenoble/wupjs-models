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

    class Category extends List {
      constructor (objs) {
        super(objs);

        for (const obj of objs) {
          elements.add(obj);
        }
      }
      //
      // delete (li) {
      //   this.unselect(li);
      //   super.delete(li);
      // }
      //
      // clear () {
      //   this.clearSelected();
      //   super.clear();
      // }
      //
      // update (li1, li2) {
      //   elements.update(li1, li2);
      // }

      getSelected () {
        return new Category(this.currentSelection);
      }

      // categorize (name) {
      //   if (!categories.has(name)) {
      //     categories.set(name, new CollectionType(name));
      //   }
      //   const Category = categories.get(name);
      //   return new Category(this);
      // }

      static clear () {
        elements.clear();
      }

      static equiv (collection) {
        return elements.equiv(collection);
      }

      static contains (collection) {
        return elements.contains(collection);
      }
    }

    Object.defineProperties(Category, {
      name: {value: name, enumerable: true},
      size: {
        get: () => elements.size,
        enumerable: true,
      },
      [Symbol.iterator]: {
        value: () => elements[Symbol.iterator](),
      },
    });

    return Category;
  }

  makeList () {
    return class List extends EventEmitterSet {
      constructor (objs) {
        super(objs, {eventAggregator: new EventEmitter()});

        Object.defineProperties(this, {
          currentSelection: {value: new Set()},
        });
      }

      delete (li) {
        this.unselect(li);
        super.delete(li);
      }

      clear () {
        this.clearSelected();
        super.clear();
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
