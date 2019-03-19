import EventEmitter from 'events';
import EventEmitterSet from '../helpers/event-emitter-set';

export default function makeListType ({
  eventAggregator = new EventEmitter(),
} = {}) {
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

    _delete (li) {
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
