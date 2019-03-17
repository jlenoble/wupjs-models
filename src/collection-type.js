export default class CollectionType {
  constructor (name) {
    const Collection = this.makeList();

    Object.defineProperties(Collection, {
      name: {
        value: name,
        enumerable: true,
      },
    });

    return Collection;
  }

  makeList () {
    return class List extends Set {
      update (li1, li2) {
        if (this.has(li1)) {
          this.delete(li1);
          this.add(li2);
        }
      }
    };
  }
}
