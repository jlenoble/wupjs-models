/* eslint-disable no-invalid-this */

import {expect} from 'chai';
import {Select} from '../../src/ui';
import {setup} from './setup';

export function selectTestSuite (idProperty = '_id', inputProperty = 'title',
  Selection = Map) {
  beforeEach(function () {
    setup.call(this, idProperty, inputProperty, Selection);

    const source = this.selection;
    const selection = new Selection();
    const select = new Select({source, selection});

    Object.assign(this, {select, source, selection});
  });

  it(`Select an item`, function () {
    const {u1, u2, u3, select, source, selection} = this;
    select.select(u1[idProperty]);
    select.select(u3[idProperty]);
    expect(Array.from(source.values())).to.eql([u1, u2, u3]);
    expect(Array.from(selection.values())).to.eql([u1, u3]);
  });

  it(`Unselect an item`, function () {
    const {u1, u2, u3, select, source, selection} = this;
    select.select(u1[idProperty]);
    select.select(u3[idProperty]);
    select.unselect(u1[idProperty]);
    expect(Array.from(source.values())).to.eql([u1, u2, u3]);
    expect(Array.from(selection.values())).to.eql([u3]);
  });
}
