/* eslint-disable no-invalid-this */

import {expect} from 'chai';
import Selection from '../src/selection';
import {isAMap, isAnEventEmitter} from './helpers';

describe(`Class Selection`, function () {
  isAMap(Selection);
  isAnEventEmitter(Selection);

  describe(`Connect to Selection`, function () {
    beforeEach(function () {
      const o1 = {title: 'a'};
      const o2 = {title: 'b'};
      const o3 = {title: 'c'};
      const store = new Selection([[o1.title, o1], [o2.title, o2]]);
      const sel = new Selection([[o1.title, o1]]);
      Object.assign(this, {store, sel, o1, o2, o3});
    });

    it(`Adding an item - without connection`, function () {
      const {store, sel, o1, o3} = this;
      expect(Array.from(sel.values())).to.eql([o1]);
      store.set(o3.title, o3);
      expect(Array.from(sel.values())).to.eql([o1]);
    });

    it(`Adding an item - with connection`, function () {
      const {store, sel, o1, o3} = this;
      sel.connectOnSet(store);
      expect(Array.from(sel.values())).to.eql([o1]);
      store.set(o3.title, o3);
      expect(Array.from(sel.values())).to.eql([o1, o3]);
    });

    it(`Adding with deep connection`, function () {
      const {store, sel, o1, o2, o3} = this;
      sel.connectOnSet(store);
      const sel2 = new Selection([]);
      sel2.connectOnSet(sel);

      expect(Array.from(store.values())).to.eql([o1, o2]);
      expect(Array.from(sel.values())).to.eql([o1]);
      expect(Array.from(sel2.values())).to.eql([]);

      sel.set(o1.title, o1);

      expect(Array.from(store.values())).to.eql([o1, o2]);
      expect(Array.from(sel.values())).to.eql([o1]);
      expect(Array.from(sel2.values())).to.eql([]);

      sel.set(o2.title, o2);

      expect(Array.from(store.values())).to.eql([o1, o2]);
      expect(Array.from(sel.values())).to.eql([o1, o2]);
      expect(Array.from(sel2.values())).to.eql([o2]);

      store.set(o1.title, o1);

      expect(Array.from(store.values())).to.eql([o1, o2]);
      expect(Array.from(sel.values())).to.eql([o1, o2]);
      expect(Array.from(sel2.values())).to.eql([o2]);

      store.set(o3.title, o3);

      expect(Array.from(store.values())).to.eql([o1, o2, o3]);
      expect(Array.from(sel.values())).to.eql([o1, o2, o3]);
      expect(Array.from(sel2.values())).to.eql([o2, o3]);
    });

    it(`Deleting an item - without connection`, function () {
      const {store, sel, o1} = this;
      expect(Array.from(sel.values())).to.eql([o1]);
      store.delete(o1.title);
      expect(Array.from(sel.values())).to.eql([o1]);
    });

    it(`Deleting an item - with connection`, function () {
      const {store, sel, o1} = this;
      sel.connectOnDelete(store);
      expect(Array.from(sel.values())).to.eql([o1]);
      store.delete(o1.title);
      expect(Array.from(sel.values())).to.eql([]);
    });

    it(`Deleting with deep connection`, function () {
      const {store, sel, o1, o2} = this;
      sel.connectOnDelete(store);
      const sel2 = new Selection([[o1.title, o1], [o2.title, o2]]);
      sel2.connectOnDelete(sel);

      expect(Array.from(store.values())).to.eql([o1, o2]);
      expect(Array.from(sel.values())).to.eql([o1]);
      expect(Array.from(sel2.values())).to.eql([o1, o2]);

      store.delete(o1.title);

      expect(Array.from(store.values())).to.eql([o2]);
      expect(Array.from(sel.values())).to.eql([]);
      expect(Array.from(sel2.values())).to.eql([o2]);
      // Deletion propagated by sel

      store.delete(o2.title);

      expect(Array.from(store.values())).to.eql([]);
      expect(Array.from(sel.values())).to.eql([]);
      expect(Array.from(sel2.values())).to.eql([o2]);
      // Deletion not propagated by sel

      sel.delete(o2.title);

      expect(Array.from(store.values())).to.eql([]);
      expect(Array.from(sel.values())).to.eql([]);
      expect(Array.from(sel2.values())).to.eql([o2]);
      // Ignore explicit deletion by sel
    });
  });
});
