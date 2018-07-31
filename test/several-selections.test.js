/* eslint-disable no-invalid-this */

import {expect} from 'chai';
import UI from '../src/ui';

describe('Testing several selections', function () {
  beforeEach(function () {
    this.UI = new UI();

    this.titles = ['a', 'b', 'c', 'd', 'e'];
    this.items = [];
    this.itemIds = [];
    this.titles.forEach(title => {
      const item = this.UI.newItem(title);
      this.items.push(item);
      this.itemIds.push(item.itemId);
    });
  });

  it(`Creating overlapping selections`, function () {
    const {UI, itemIds} = this;
    const [id1, id2, id3, id4, id5] = itemIds;

    expect(UI.refCount).to.equal(0);

    expect(UI.newSelection({
      title: 'A',
      itemIds: [id1, id4],
    }).itemIds).to.eql([id1, id4]);

    expect(UI.refCount).to.equal(2);

    expect(UI.newSelection({
      title: 'B',
      itemIds: [id1, id5, id2],
    }).itemIds).to.eql([id1, id5, id2]);

    expect(UI.refCount).to.equal(5);

    expect(UI.newSelection({
      title: 'C',
      itemIds: [id3, id1, id5, id4],
    }).itemIds).to.eql([id3, id1, id5, id4]);

    expect(UI.refCount).to.equal(9);
  });
});
