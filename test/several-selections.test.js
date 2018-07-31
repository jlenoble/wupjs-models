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

  it(`Deleting a shared item`, function () {
    const {UI, itemIds} = this;
    const [id1, id2, id3, id4, id5] = itemIds;

    const sel1 = UI.newSelection({
      title: 'A',
      itemIds: [id1, id4],
    });

    const sel2 = UI.newSelection({
      title: 'B',
      itemIds: [id1, id5, id2],
    });

    const sel3 = UI.newSelection({
      title: 'C',
      itemIds: [id3, id1, id5, id4],
    });

    expect(UI.refCount).to.equal(9);

    UI.destroyItem(id5);

    expect(UI.refCount).to.equal(7);
    expect(sel1.itemIds).to.eql([id1, id4]);
    expect(sel2.itemIds).to.eql([id1, id2]);
    expect(sel3.itemIds).to.eql([id3, id1, id4]);

    UI.destroyItem(id1);

    expect(UI.refCount).to.equal(4);
    expect(sel1.itemIds).to.eql([id4]);
    expect(sel2.itemIds).to.eql([id2]);
    expect(sel3.itemIds).to.eql([id3, id4]);
  });
});
