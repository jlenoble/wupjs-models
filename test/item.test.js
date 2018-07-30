/* eslint-disable no-invalid-this */

import {expect} from 'chai';
import UI from '../src/ui';

describe('Testing class Item', function () {
  beforeEach(function () {
    this.UI = new UI();
    this.title = 'ABC';
    this.itemId = this.UI.newItem(this.title);
    this.item = this.UI.getItem(this.itemId);
  });

  it(`Creating an item`, function () {
    const {UI, itemId, title, item} = this;
    expect(item).not.to.be.undefined;
    expect(item.title).to.equal(title);
    expect(item.itemId).to.equal(itemId);
    expect(() => UI.itemId()).not.to.throw();
    expect(() => item.itemId = UI.itemId()).to.throw();
  });

  it(`Reading an item`, function () {
    const {itemId, title, item} = this;
    expect(item).to.eql({itemId, title});
  });

  it(`Updating an item`, function () {
    const {UI, itemId, title, item} = this;
    const title2 = 'XYZ';
    expect(item.title).to.equal(title);
    UI.updateItem(itemId, title2);
    expect(item.title).to.equal(title2);
  });

  it(`Deleting an item`, function () {
    const {UI, itemId, item} = this;
    expect(UI.getItem(itemId)).to.equal(item);
    UI.destroyItem(itemId);
    expect(UI.getItem(itemId)).to.be.undefined;
  });
});
