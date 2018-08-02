/* eslint-disable no-invalid-this */

import {expect} from 'chai';
import {Selection} from '../../src';
import {Select} from '../../src/ui';

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
    const selection = new Selection();

    const select = new Select({source, selection});

    Object.assign(this, {o1, o2, o3, objs, select, source, selection});
  });

  it(`Select an item`, function () {
    const {o1, o3, objs, select, source, selection} = this;

    select.select(o1.id);
    select.select(o3.id);

    expect(Array.from(source.values())).to.eql(objs);
    expect(Array.from(selection.values())).to.eql([o1, o3]);
  });

  it(`Unselect an item`, function () {
    const {o1, o3, objs, select, source, selection} = this;

    select.select(o1.id);
    select.select(o3.id);
    select.unselect(o1.id);

    expect(Array.from(source.values())).to.eql(objs);
    expect(Array.from(selection.values())).to.eql([o3]);
  });
});
