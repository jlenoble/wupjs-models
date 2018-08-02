/* eslint-disable no-invalid-this */

import {expect} from 'chai';
import {Input} from '../../src/ui';
import {setup} from './setup';

export function inputTestSuite (Selection = Map, idProperty = '_id',
  inputProperty = 'title') {
  beforeEach(function () {
    setup.call(this, Selection, idProperty, inputProperty);
    const {Model, selection} = this;

    this.input = new Input({Model, idProperty, inputProperty, selection});
  });

  it(`Input a text`, function () {
    const {u1, u2, u3, u4, u5, selection, input} = this;
    input.create(u4[inputProperty]);
    input.create(u5[inputProperty]);
    expect(Array.from(selection.values())).to.eql([u1, u2, u3, u4, u5]);
  });

  it(`Delete an item`, function () {
    const {u1, u2, u3, selection, input} = this;
    input.delete(u1[idProperty]);
    expect(Array.from(selection.values())).to.eql([u2, u3]);
  });

  it(`Edit an item`, function () {
    const {u1, u2, u3, selection, input} = this;
    const O1 = {[idProperty]: u1[idProperty], [inputProperty]: 'A'};
    input.update(u1[idProperty], O1[inputProperty]);
    expect(Array.from(selection.values())).to.eql([O1, u2, u3]);
  });
}
