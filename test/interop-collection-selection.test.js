/* eslint-disable no-invalid-this */

import {expect} from 'chai';
import Collection from '../src/collection';
import Selection from '../src/selection';

describe(`Interoperability between Collection and Selection`, function () {
  beforeEach(function () {
    const o1 = {title: 'a'};
    const o2 = {title: 'b'};
    const o3 = {title: 'c'};
    const o4 = {title: 'd'};

    const objs = [o1, o2, o3];

    const col = new Collection(objs);
    const sel = new Selection(objs.map(o => [o.title, o]));

    Object.assign(this, {o1, o2, o3, o4, objs, col, sel});
  });

  it(`col connected to sel - adding`, function () {
    const {o4, objs, col, sel} = this;

    col.connectOnSet(sel);
    sel.set(o4.title, o4);

    expect(Array.from(sel.values())).to.eql(objs.concat(o4));
    expect(Array.from(col)).to.eql(objs.concat(o4));
  });

  it(`sel connected to col - adding`, function () {
    const {o4, objs, col, sel} = this;

    sel.connectOnAdd(col, 'title');
    col.add(o4);

    expect(Array.from(col)).to.eql(objs.concat(o4));
    expect(Array.from(sel.values())).to.eql(objs.concat(o4));
  });

  it(`col connected to sel - deleting`, function () {
    const {o1, objs, col, sel} = this;

    col.connectOnDelete(sel);
    sel.delete(o1.title);

    expect(Array.from(sel.values())).to.eql(objs.slice(1));
    expect(Array.from(col)).to.eql(objs.slice(1));
  });

  it(`sel connected to col - deleting`, function () {
    const {o1, objs, col, sel} = this;

    sel.connectOnDeleteInCollection(col, 'title');
    col.delete(o1);

    expect(Array.from(col)).to.eql(objs.slice(1));
    expect(Array.from(sel.values())).to.eql(objs.slice(1));
  });
});
