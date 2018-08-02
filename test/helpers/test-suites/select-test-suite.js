/* eslint-disable no-invalid-this */

import {expect} from 'chai';
import {Select} from '../../../src/ui';
import {setup} from '../setup';

export function selectTestSuite (Selection = Map, idProperty = '_id',
  UI = Select) {
  beforeEach(function () {
    setup.call(this, Selection, idProperty);

    const source = this.selection;
    const selection = new Selection();
    const ui = new UI({source, selection});

    Object.assign(this, {ui, source, selection});
  });

  it(`Select an item`, function () {
    const {u1, u2, u3, ui, source, selection} = this;
    ui.select(u1[idProperty]);
    ui.select(u3[idProperty]);
    expect(Array.from(source.values())).to.eql([u1, u2, u3]);
    expect(Array.from(selection.values())).to.eql([u1, u3]);
  });

  it(`Unselect an item`, function () {
    const {u1, u2, u3, ui, source, selection} = this;
    ui.select(u1[idProperty]);
    ui.select(u3[idProperty]);
    ui.unselect(u1[idProperty]);
    expect(Array.from(source.values())).to.eql([u1, u2, u3]);
    expect(Array.from(selection.values())).to.eql([u3]);
  });
}
