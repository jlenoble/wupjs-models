export default class CollectionType {
  constructor (name) {
    let Collection;

    if (name) {

    } else {
      Collection = this.makeList();
    }

    return Collection;
  }

  makeList () {
    return class List extends Set {
      constructor (objs) {
        super(objs);

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
    };
  }
}
