/* eslint-disable no-invalid-this */

import {expect} from 'chai';
import UI from '../src/ui';

describe('Testing class Selection', function () {
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
    this.range = [1, 4];

    this.title = 'Z';
    this.selection = this.UI.newSelection({
      title: this.title,
      items: this.items.slice(...this.range),
    });
    this.itemId = this.selection.itemId;
    this.selectionId = this.selection.selectionId;
  });

  it(`Creating a selection`, function () {
    const {UI, selection, title, titles, range} = this;
    expect(selection).not.to.be.undefined;
    expect(selection.title).to.equal(title);
    expect(selection.itemId).not.to.be.undefined;
    expect(selection.selectionId).not.to.be.undefined;
    expect(UI.getItem(selection.itemId)).to.equal(selection);
    expect(selection.getTitles()).to.eql(titles.slice(...range));
    expect(() => selection.itemId = UI.itemId()).to.throw();
    expect(() => selection.selectionId = UI.selectionId()).to.throw();
  });

  it(`Reading a selection`, function () {
    const {selection, itemId, selectionId, itemIds, title, range} = this;
    expect(selection).to.eql({
      title, itemId, selectionId, itemIds: itemIds.slice(...range),
    });
  });

  describe(`Considering a selection as an item`, function () {
    it(`Updating its title`, function () {
      const {UI, selection, itemId, title} = this;
      const title2 = 'XYZ';
      expect(selection.title).to.equal(title);
      UI.updateItem(itemId, title2);
      expect(selection.title).to.equal(title2);
    });

    it(`Deleting it`, function () {
      const {UI, selection, itemId, selectionId} = this;
      expect(UI.getItem(itemId)).to.equal(selection);
      expect(UI.getSelection(selectionId)).to.equal(selection);
      UI.destroyItem(itemId);
      expect(UI.getItem(itemId)).to.be.undefined;
      expect(UI.getSelection(selectionId)).to.be.undefined;
    });
  });

  describe(`Considering a selection as a selection`, function () {
    it(`Updating its title`, function () {
      const {UI, selection, selectionId, title} = this;
      const title2 = 'XYZ';
      expect(selection.title).to.equal(title);
      UI.updateSelection(selectionId, {title: title2});
      expect(selection.title).to.equal(title2);
    });

    it(`Updating its elements`, function () {
      const {UI, selection, selectionId, items, itemIds, range} = this;
      const range2 = [0, 3];
      expect(range2).not.to.eql(range);
      expect(selection.itemIds).to.eql(itemIds.slice(...range));
      UI.updateSelection(selectionId, {items: items.slice(...range2)});
      expect(selection.itemIds).to.eql(itemIds.slice(...range2));
    });

    it(`Updating both its title and elements`, function () {
      const {UI, selection, selectionId, items, itemIds, title, range} = this;
      const title2 = 'XYZ';
      const range2 = [0, 3];
      expect(range2).not.to.eql(range);
      expect(selection.title).to.equal(title);
      expect(selection.itemIds).to.eql(itemIds.slice(...range));
      UI.updateSelection(selectionId, {
        title: title2,
        items: items.slice(...range2),
      });
      expect(selection.title).to.equal(title2);
      expect(selection.itemIds).to.eql(itemIds.slice(...range2));
    });

    it(`Deleting it`, function () {
      const {UI, selection, itemId, selectionId} = this;
      expect(UI.getItem(itemId)).to.equal(selection);
      expect(UI.getSelection(selectionId)).to.equal(selection);
      UI.destroySelection(selectionId);
      expect(UI.getItem(itemId)).to.be.undefined;
      expect(UI.getSelection(selectionId)).to.be.undefined;
    });
  });
});
