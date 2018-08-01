/* eslint-disable no-invalid-this */

import {expect} from 'chai';
import Selection from '../src/selection';
import InputList from '../src/input-list';

describe(`Class InputList`, function () {
  beforeEach(function () {
    const Model = class {
      constructor ({title}) {
        this.title = title;
      }
    };

    const o1 = new Model({title: 'a'});
    const o2 = new Model({title: 'b'});
    const o3 = new Model({title: 'c'});
    const o4 = new Model({title: 'd'});

    const objs = [o1, o2, o3];

    const selection = new Selection(objs.map(o => [o.title, o]));
    const inputList = new InputList({
      Model, idProperty: 'title', textProperty: 'title', selection,
    });

    Object.assign(this, {Model, o1, o2, o3, o4, objs, selection, inputList});
  });

  it(`Input a text`, function () {
    const {o4, objs, selection, inputList} = this;

    inputList.add(o4.title);

    expect(Array.from(inputList.values())).to.eql(objs.concat(o4));
    expect(Array.from(selection.values())).to.eql(objs.concat(o4));
  });

  it(`Remove an item`, function () {
    const {o1, objs, selection, inputList} = this;

    inputList.remove(o1.title);

    expect(Array.from(inputList.values())).to.eql(objs.slice(1));
    expect(Array.from(selection.values())).to.eql(objs.slice(1));
  });
});
