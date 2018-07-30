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
      itemIds: this.itemIds.slice(...this.range),
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
    expect(UI.refCount).to.equal(3);
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
      expect(UI.refCount).to.equal(3);
    });

    it(`Deleting it`, function () {
      const {UI, selection, itemId, selectionId} = this;
      expect(UI.getItem(itemId)).to.equal(selection);
      expect(UI.getSelection(selectionId)).to.equal(selection);
      UI.destroyItem(itemId);
      expect(UI.getItem(itemId)).to.be.undefined;
      expect(UI.getSelection(selectionId)).to.be.undefined;
      expect(UI.refCount).to.equal(0);
    });
  });

  describe(`Considering a selection as a selection`, function () {
    describe(`Updating`, function () {
      it(`its title`, function () {
        const {UI, selection, selectionId, title} = this;
        const title2 = 'XYZ';
        expect(selection.title).to.equal(title);
        UI.updateSelection(selectionId, {title: title2});
        expect(selection.title).to.equal(title2);
      });

      it(`its elements`, function () {
        const {UI, selection, selectionId, itemIds, range} = this;
        const range2 = [0, 3];
        expect(range2).not.to.eql(range);
        expect(selection.itemIds).to.eql(itemIds.slice(...range));
        UI.updateSelection(selectionId, {itemIds: itemIds.slice(...range2)});
        expect(selection.itemIds).to.eql(itemIds.slice(...range2));
      });

      it(`both its title and elements`, function () {
        const {UI, selection, selectionId, itemIds, title, range} = this;
        const title2 = 'XYZ';
        const range2 = [0, 3];
        expect(range2).not.to.eql(range);
        expect(selection.title).to.equal(title);
        expect(selection.itemIds).to.eql(itemIds.slice(...range));
        UI.updateSelection(selectionId, {
          title: title2,
          itemIds: itemIds.slice(...range2),
        });
        expect(selection.title).to.equal(title2);
        expect(selection.itemIds).to.eql(itemIds.slice(...range2));
      });
    });

    describe(`Adding`, function () {
      it(`an element`, function () {
        const {UI, selection, selectionId, itemIds, range} = this;
        const itemId = UI.newItem('x').itemId;
        expect(selection.itemIds).to.eql(itemIds.slice(...range));
        UI.addItemToSelection(selectionId, itemId);
        expect(selection.itemIds).to.eql(itemIds.slice(...range)
          .concat(itemId));
      });

      it(`several elements`, function () {
        const {UI, selection, selectionId, itemIds, range} = this;
        const itemId1 = UI.newItem('x').itemId;
        const itemId2 = UI.newItem('y').itemId;
        expect(selection.itemIds).to.eql(itemIds.slice(...range));
        UI.addItemsToSelection(selectionId, [itemId1, itemId2]);
        expect(selection.itemIds).to.eql(itemIds.slice(...range)
          .concat(itemId1, itemId2));
      });

      it(`a duplicate element`, function () {
        const {UI, selection, selectionId, itemIds, range} = this;
        const itemId = itemIds[range[0]];
        expect(selection.itemIds).to.eql(itemIds.slice(...range));
        UI.addItemToSelection(selectionId, itemId);
        expect(selection.itemIds).to.eql(itemIds.slice(...range));
      });

      it(`duplicate elements`, function () {
        const {UI, selection, selectionId, itemIds, range} = this;
        const itemId1 = itemIds[range[0]];
        const itemId2 = itemIds[range[0] + 1];
        expect(selection.itemIds).to.eql(itemIds.slice(...range));
        UI.addItemsToSelection(selectionId, [itemId1, itemId2]);
        expect(selection.itemIds).to.eql(itemIds.slice(...range));
      });
    });

    describe(`Removing`, function () {
      it(`an element`, function () {
        const {UI, selection, selectionId, itemIds, range} = this;
        const itemId = itemIds[range[0]];
        const range2 = [range[0] + 1, range[1]];
        expect(selection.itemIds).to.eql(itemIds.slice(...range));
        UI.removeItemFromSelection(selectionId, itemId);
        expect(selection.itemIds).to.eql(itemIds.slice(...range2));
      });

      it(`several elements`, function () {
        const {UI, selection, selectionId, itemIds, range} = this;
        const itemId1 = itemIds[range[0]];
        const itemId2 = itemIds[range[0] + 1];
        const range2 = [range[0] + 2, range[1]];
        expect(selection.itemIds).to.eql(itemIds.slice(...range));
        UI.removeItemsFromSelection(selectionId, [itemId1, itemId2]);
        expect(selection.itemIds).to.eql(itemIds.slice(...range2));
      });

      it(`a non-element`, function () {
        const {UI, selection, selectionId, itemIds, range} = this;
        const itemId = UI.newItem('x').itemId;
        expect(selection.itemIds).to.eql(itemIds.slice(...range));
        UI.removeItemFromSelection(selectionId, itemId);
        expect(selection.itemIds).to.eql(itemIds.slice(...range));
      });

      it(`several non-elements`, function () {
        const {UI, selection, selectionId, itemIds, range} = this;
        const itemId1 = UI.newItem('x').itemId;
        const itemId2 = UI.newItem('y').itemId;
        expect(selection.itemIds).to.eql(itemIds.slice(...range));
        UI.removeItemsFromSelection(selectionId, [itemId1, itemId2]);
        expect(selection.itemIds).to.eql(itemIds.slice(...range));
      });

      it(`both an element and a non-element`, function () {
        const {UI, selection, selectionId, itemIds, range} = this;
        const itemId1 = UI.newItem('x').itemId;
        const itemId2 = itemIds[range[0]];
        const range2 = [range[0] + 1, range[1]];
        expect(selection.itemIds).to.eql(itemIds.slice(...range));
        UI.removeItemsFromSelection(selectionId, [itemId1, itemId2]);
        expect(selection.itemIds).to.eql(itemIds.slice(...range2));
      });
    });

    describe(`Deleting`, function () {
      it(`the selection itself`, function () {
        const {UI, selection, itemId, selectionId} = this;
        expect(UI.getItem(itemId)).to.equal(selection);
        expect(UI.getSelection(selectionId)).to.equal(selection);
        UI.destroySelection(selectionId);
        expect(UI.getItem(itemId)).to.be.undefined;
        expect(UI.getSelection(selectionId)).to.be.undefined;
      });

      it(`an element`, function () {
        const {UI, selection, itemIds, range} = this;
        const itemId = itemIds[range[0]];
        const range2 = [range[0] + 1, range[1]];
        expect(selection.itemIds).to.eql(itemIds.slice(...range));
        UI.destroyItem(itemId);
        expect(selection.itemIds).to.eql(itemIds.slice(...range2));
      });

      it(`several elements`, function () {
        const {UI, selection, itemIds, range} = this;
        const itemId1 = itemIds[range[0]];
        const itemId2 = itemIds[range[0] + 1];
        const range2 = [range[0] + 2, range[1]];
        expect(selection.itemIds).to.eql(itemIds.slice(...range));
        UI.destroyItem(itemId1);
        UI.destroyItem(itemId2);
        expect(selection.itemIds).to.eql(itemIds.slice(...range2));
      });

      it(`a non-element`, function () {
        const {UI, selection, itemIds, range} = this;
        const itemId = UI.newItem('x').itemId;
        expect(selection.itemIds).to.eql(itemIds.slice(...range));
        UI.destroyItem(itemId);
        expect(selection.itemIds).to.eql(itemIds.slice(...range));
      });

      it(`several non-elements`, function () {
        const {UI, selection, itemIds, range} = this;
        const itemId1 = UI.newItem('x').itemId;
        const itemId2 = UI.newItem('y').itemId;
        expect(selection.itemIds).to.eql(itemIds.slice(...range));
        UI.destroyItem(itemId1);
        UI.destroyItem(itemId2);
        expect(selection.itemIds).to.eql(itemIds.slice(...range));
      });

      it(`both an element and a non-element`, function () {
        const {UI, selection, itemIds, range} = this;
        const itemId1 = UI.newItem('x').itemId;
        const itemId2 = itemIds[range[0]];
        const range2 = [range[0] + 1, range[1]];
        expect(selection.itemIds).to.eql(itemIds.slice(...range));
        UI.destroyItem(itemId1);
        UI.destroyItem(itemId2);
        expect(selection.itemIds).to.eql(itemIds.slice(...range2));
      });
    });
  });
});
