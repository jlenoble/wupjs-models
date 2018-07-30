/* eslint-disable no-invalid-this */

import {expect} from 'chai';
import UI from '../src/ui';

describe('Testing class Item', function () {
  beforeEach(function () {
    this.UI = new UI();
    this.title = 'ABC';
    this.uid = this.UI.newItem(this.title);
    this.item = this.UI.getItem(this.uid);
  });

  it(`Creating an item`, function () {
    const {UI, uid, title, item} = this;
    expect(item).not.to.be.undefined;
    expect(item.title).to.equal(title);
    expect(item.uid).to.equal(uid);
    expect(() => UI.itemId()).not.to.throw();
    expect(() => item.uid = UI.itemId()).to.throw();
  });

  it(`Reading an item`, function () {
    const {uid, title, item} = this;
    expect(item).to.eql({uid, title});
  });

  it(`Updating an item`, function () {
    const {UI, uid, title, item} = this;
    const title2 = 'XYZ';
    expect(item.title).to.equal(title);
    UI.updateItem(uid, title2);
    expect(item.title).to.equal(title2);
  });

  it(`Deleting an item`, function () {
    const {UI, uid, item} = this;
    expect(UI.getItem(uid)).to.equal(item);
    UI.destroyItem(uid);
    expect(UI.getItem(uid)).to.be.undefined;
  });
});
