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

  it(`Creating selections of duplicate items`, function () {
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
      itemIds: [id1, id5, id2, id5, id5],
    }).itemIds).to.eql([id1, id5, id2]);

    expect(UI.refCount).to.equal(5);

    expect(UI.newSelection({
      title: 'C',
      itemIds: [id3, id1, id5, id4, id3, id5, id1, id3],
    }).itemIds).to.eql([id3, id1, id5, id4]);

    expect(UI.refCount).to.equal(9);
  });

  it(`Updating overlapping selections`, function () {
    const {UI, itemIds} = this;
    const [id1, id2, id3, id4, id5] = itemIds;

    const it6 = UI.newItem('x');
    const it7 = UI.newItem('y');
    const it8 = UI.newItem('z');

    const id6 = it6.itemId;
    const id7 = it7.itemId;
    const id8 = it8.itemId;

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

    UI.updateSelection(sel1.selectionId, {
      itemIds: [id6, id7, id8],
    });

    expect(UI.refCount).to.equal(10);
    expect(sel1.title).to.equal('A');
    expect(sel2.title).to.equal('B');
    expect(sel3.title).to.equal('C');
    expect(sel1.itemIds).to.eql([id6, id7, id8]);
    expect(sel2.itemIds).to.eql([id1, id5, id2]);
    expect(sel3.itemIds).to.eql([id3, id1, id5, id4]);

    UI.updateSelection(sel2.selectionId, {
      title: 'BB',
      itemIds: [id6, id1, id2, id7],
    });

    expect(UI.refCount).to.equal(11);
    expect(sel1.title).to.equal('A');
    expect(sel2.title).to.equal('BB');
    expect(sel3.title).to.equal('C');
    expect(sel1.itemIds).to.eql([id6, id7, id8]);
    expect(sel2.itemIds).to.eql([id1, id2, id6, id7]);
    expect(sel3.itemIds).to.eql([id3, id1, id5, id4]);
  });

  it(`Adding a shared item`, function () {
    const {UI, itemIds} = this;
    const [id1, id2, id3, id4, id5] = itemIds;

    const it6 = UI.newItem('x');
    const it7 = UI.newItem('y');
    const it8 = UI.newItem('z');

    const id6 = it6.itemId;
    const id7 = it7.itemId;
    const id8 = it8.itemId;

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

    UI.addItemToSelection(sel2.selectionId, id6);

    expect(UI.refCount).to.equal(10);
    expect(sel1.itemIds).to.eql([id1, id4]);
    expect(sel2.itemIds).to.eql([id1, id5, id2, id6]);
    expect(sel3.itemIds).to.eql([id3, id1, id5, id4]);

    UI.addItemsToSelection(sel3.selectionId, [id7, id8]);

    expect(UI.refCount).to.equal(12);
    expect(sel1.itemIds).to.eql([id1, id4]);
    expect(sel2.itemIds).to.eql([id1, id5, id2, id6]);
    expect(sel3.itemIds).to.eql([id3, id1, id5, id4, id7, id8]);

    UI.addItemsToSelection(sel1.selectionId, [id4, id1]);

    expect(UI.refCount).to.equal(12);
    expect(sel1.itemIds).to.eql([id1, id4]);
    expect(sel2.itemIds).to.eql([id1, id5, id2, id6]);
    expect(sel3.itemIds).to.eql([id3, id1, id5, id4, id7, id8]);
  });

  it(`Removing a shared item`, function () {
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

    UI.removeItemFromSelection(sel2.selectionId, id5);

    expect(UI.refCount).to.equal(8);
    expect(sel1.itemIds).to.eql([id1, id4]);
    expect(sel2.itemIds).to.eql([id1, id2]);
    expect(sel3.itemIds).to.eql([id3, id1, id5, id4]);

    UI.removeItemsFromSelection(sel3.selectionId, [id4, id1]);

    expect(UI.refCount).to.equal(6);
    expect(sel1.itemIds).to.eql([id1, id4]);
    expect(sel2.itemIds).to.eql([id1, id2]);
    expect(sel3.itemIds).to.eql([id3, id5]);
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
