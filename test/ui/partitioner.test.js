/* eslint-disable no-invalid-this */

import {expect} from 'chai';
import {Selection} from '../../src';
import {Partitioner} from '../../src/ui';

describe(`Class Partitioner`, function () {
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
    const currentPart = new Selection();
    const PartModel = class extends Selection {
      constructor (...args) {
        super(...args);
        this.id = ++id;
      }
    };
    const parts = new Selection();

    const partitioner = new Partitioner({
      idProperty: 'id',
      source,
      currentPart,
      PartModel,
      partIdProperty: 'id',
      parts,
    });

    Object.assign(this, {o1, o2, o3, partitioner, source, currentPart, parts});
  });

  it(`Select an item`, function () {
    const {o1, o2, o3, partitioner, source, currentPart, parts} = this;

    partitioner.select(o1.id);
    partitioner.select(o3.id);

    expect(Array.from(source.values())).to.eql([o2]);
    expect(Array.from(currentPart.values())).to.eql([o1, o3]);
    expect(Array.from(parts.values())).to.eql([]);
  });

  it(`Unselect an item`, function () {
    const {o1, o2, o3, partitioner, source, currentPart, parts} = this;

    partitioner.select(o1.id);
    partitioner.select(o3.id);
    partitioner.unselect(o1.id);

    expect(Array.from(source.values())).to.eql([o2, o1]);
    expect(Array.from(currentPart.values())).to.eql([o3]);
    expect(Array.from(parts.values())).to.eql([]);
  });

  it(`Save a part`, function () {
    const {o1, o2, o3, partitioner, source, currentPart, parts} = this;

    partitioner.select(o1.id);
    partitioner.select(o3.id);
    partitioner.save();

    expect(Array.from(source.values())).to.eql([o2]);
    expect(Array.from(currentPart.values())).to.eql([]);
    expect(Array.from(parts.values()).map(obj => Array.from(obj.values())))
      .to.eql([[o1, o3]]);
  });

  it(`Save all parts`, function () {
    const {o1, o2, o3, partitioner, source, currentPart, parts} = this;

    partitioner.select(o1.id);
    partitioner.select(o3.id);
    partitioner.save();
    partitioner.select(o2.id);
    partitioner.save();

    expect(Array.from(source.values())).to.eql([]);
    expect(Array.from(currentPart.values())).to.eql([]);
    expect(Array.from(parts.values()).map(obj => Array.from(obj.values())))
      .to.eql([[o1, o3], [o2]]);
  });
});
