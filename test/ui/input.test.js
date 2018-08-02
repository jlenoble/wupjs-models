/* eslint-disable no-invalid-this */

import {expect} from 'chai';
import {Selection} from '../../src';
import {Input} from '../../src/ui';

describe(`Class Input`, function () {
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

    const selection = new Selection(objs.map(o => [o.id, o]));
    const input = new Input({
      Model, idProperty: 'id', inputProperty: 'title', selection,
    });

    Object.assign(this, {Model, o1, o2, o3, objs, selection, input});
  });

  it(`Input a text`, function () {
    const {o3, objs, selection, input} = this;
    const o4 = {id: o3.id + 1, title: 'd'};

    input.create(o4.title);

    expect(Array.from(selection.values())).to.eql(objs.concat(o4));
  });

  it(`Delete an item`, function () {
    const {o1, objs, selection, input} = this;

    input.delete(o1.id);

    expect(Array.from(selection.values())).to.eql(objs.slice(1));
  });

  it(`Edit an item`, function () {
    const {o1, o2, o3, selection, input} = this;
    const O1 = {id: o1.id, title: 'A'};

    input.update(o1.id, O1.title);

    expect(Array.from(selection.values())).to.eql([O1, o2, o3]);
  });
});
