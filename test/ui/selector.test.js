/* eslint-disable no-invalid-this */

import {expect} from 'chai';
import {Selection} from '../../src';
import {Selector} from '../../src/ui';

describe(`Class Selector`, function () {
  beforeEach(function () {
    let id = 0;
    const Model = class {
      constructor ({title}) {
        this.id = ++id;
        this.title = title;
      }
    };

    const o1 = new Model({title: 'a'});
    const o2 = new Model({title: 'b'});
    const o3 = new Model({title: 'c'});

    const objs = [o1, o2, o3];

    const source = new Selection(objs.map(o => [o.id, o]));
    const currentSelection = new Selection();
    const PartModel = class extends Selection {
      constructor (...args) {
        super(...args);
        this.id = ++id;
      }
    };
    const parts = new Selection();

    const selector = new Selector({
      idProperty: 'id',
      source,
      currentSelection,
      PartModel,
      partIdProperty: 'id',
      parts,
    });

    Object.assign(this, {o1, o2, o3, objs, selector, source, currentSelection,
      parts});
  });

  it(`Select an item`, function () {
    const {o1, o3, objs, selector, source, currentSelection, parts} = this;

    selector.select(o1.id);
    selector.select(o3.id);

    expect(Array.from(source.values())).to.eql(objs);
    expect(Array.from(currentSelection.values())).to.eql([o1, o3]);
    expect(Array.from(parts.values())).to.eql([]);
  });

  it(`Unselect an item`, function () {
    const {o1, o3, objs, selector, source, currentSelection, parts} = this;

    selector.select(o1.id);
    selector.select(o3.id);
    selector.unselect(o1.id);

    expect(Array.from(source.values())).to.eql(objs);
    expect(Array.from(currentSelection.values())).to.eql([o3]);
    expect(Array.from(parts.values())).to.eql([]);
  });

  it(`Save a selection`, function () {
    const {o1, o2, o3, objs, selector, source, currentSelection, parts} = this;

    selector.select(o1.id);
    selector.select(o3.id);
    selector.save();
    selector.select(o2.id);
    selector.save();
    selector.save();
    selector.select(o2.id);
    selector.select(o1.id);
    selector.select(o3.id);
    selector.save();

    expect(Array.from(source.values())).to.eql(objs);
    expect(Array.from(currentSelection.values())).to.eql([]);
    expect(Array.from(parts.values()).map(obj => Array.from(obj.values())))
      .to.eql([[o1, o3], [o2], [], [o2, o1, o3]]);
  });
});
