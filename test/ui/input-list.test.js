/* eslint-disable no-invalid-this */

import {expect} from 'chai';
import {Selection} from '../../src';
import {InputList} from '../../src/ui';

describe(`Class InputList`, function () {
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
    const inputList = new InputList({
      Model, idProperty: 'id', textProperty: 'title', selection,
    });

    Object.assign(this, {Model, o1, o2, o3, objs, selection, inputList});
  });

  it(`Input a text`, function () {
    const {o3, objs, selection, inputList} = this;
    const o4 = {id: o3.id + 1, title: 'd'};

    inputList.add(o4.title);

    expect(Array.from(inputList)).to.eql(objs.concat(o4));
    expect(Array.from(selection.values())).to.eql(objs.concat(o4));
  });

  it(`Remove an item`, function () {
    const {o1, objs, selection, inputList} = this;

    inputList.remove(o1.id);

    expect(Array.from(inputList)).to.eql(objs.slice(1));
    expect(Array.from(selection.values())).to.eql(objs.slice(1));
  });

  it(`Edit an item`, function () {
    const {o1, o2, o3, selection, inputList} = this;
    const O1 = {id: o1.id, title: 'A'};

    inputList.edit(o1.id, O1.title);

    expect(Array.from(inputList)).to.eql([O1, o2, o3]);
    expect(Array.from(selection.values())).to.eql([O1, o2, o3]);
  });
});
