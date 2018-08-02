/* eslint-disable no-invalid-this */

import {expect} from 'chai';
import {Collection} from '../src';
import {isASet, isAnEventEmitter} from './helpers';

describe(`Class Collection`, function () {
  isASet(Collection);
  isAnEventEmitter(Collection);

  describe(`Connect to Collection`, function () {
    beforeEach(function () {
      const o1 = {title: 'a'};
      const o2 = {title: 'b'};
      const o3 = {title: 'c'};
      const store = new Collection([o1, o2]);
      const col = new Collection([o1]);
      Object.assign(this, {store, col, o1, o2, o3});
    });

    describe('Not connecting', function () {
      it(`Adding an item`, function () {
        const {store, col, o1, o3} = this;
        expect(Array.from(col)).to.eql([o1]);
        store.add(o3);
        expect(Array.from(col)).to.eql([o1]);
      });

      it(`Deleting an item`, function () {
        const {store, col, o1} = this;
        expect(Array.from(col)).to.eql([o1]);
        store.delete(o1);
        expect(Array.from(col)).to.eql([o1]);
      });

      it(`Clearing`, function () {
        const {store, col, o1} = this;
        expect(Array.from(col)).to.eql([o1]);
        store.clear();
        expect(Array.from(col)).to.eql([o1]);
      });

      it(`Resetting`, function () {
        const {store, col, o1, o3} = this;
        expect(Array.from(col)).to.eql([o1]);
        store.reset([o1, o3]);
        expect(Array.from(col)).to.eql([o1]);
      });
    });

    describe('Connecting', function () {
      it(`Adding an item`, function () {
        const {store, col, o1, o3} = this;
        col.connectOnAdd(store);
        expect(Array.from(col)).to.eql([o1]);
        store.add(o3);
        expect(Array.from(col)).to.eql([o1, o3]);
      });

      it(`Deleting an item`, function () {
        const {store, col, o1} = this;
        col.connectOnDelete(store);
        expect(Array.from(col)).to.eql([o1]);
        store.delete(o1);
        expect(Array.from(col)).to.eql([]);
      });

      it(`Clearing`, function () {
        const {store, col, o1} = this;
        col.connectOnDelete(store);
        expect(Array.from(col)).to.eql([o1]);
        store.clear();
        expect(Array.from(col)).to.eql([]);
      });

      it(`Resetting`, function () {
        const {store, col, o1, o3} = this;
        col.connectOnAdd(store);
        col.connectOnDelete(store);
        expect(Array.from(col)).to.eql([o1]);
        store.reset([o1, o3]);
        expect(Array.from(col)).to.eql([o1, o3]);
      });
    });

    describe(`Deeply connecting`, function () {
      it(`Adding`, function () {
        const {store, col, o1, o2, o3} = this;
        col.connectOnAdd(store);
        const col2 = new Collection([]);
        col2.connectOnAdd(col);

        expect(Array.from(store)).to.eql([o1, o2]);
        expect(Array.from(col)).to.eql([o1]);
        expect(Array.from(col2)).to.eql([]);

        col.add(o1);

        expect(Array.from(store)).to.eql([o1, o2]);
        expect(Array.from(col)).to.eql([o1]);
        expect(Array.from(col2)).to.eql([]);

        col.add(o2);

        expect(Array.from(store)).to.eql([o1, o2]);
        expect(Array.from(col)).to.eql([o1, o2]);
        expect(Array.from(col2)).to.eql([o2]);

        store.add(o1);

        expect(Array.from(store)).to.eql([o1, o2]);
        expect(Array.from(col)).to.eql([o1, o2]);
        expect(Array.from(col2)).to.eql([o2]);

        store.add(o3);

        expect(Array.from(store)).to.eql([o1, o2, o3]);
        expect(Array.from(col)).to.eql([o1, o2, o3]);
        expect(Array.from(col2)).to.eql([o2, o3]);
      });

      it(`Deleting`, function () {
        const {store, col, o1, o2} = this;
        col.connectOnDelete(store);
        const col2 = new Collection([o1, o2]);
        col2.connectOnDelete(col);

        expect(Array.from(store)).to.eql([o1, o2]);
        expect(Array.from(col)).to.eql([o1]);
        expect(Array.from(col2)).to.eql([o1, o2]);

        store.delete(o1);

        expect(Array.from(store)).to.eql([o2]);
        expect(Array.from(col)).to.eql([]);
        expect(Array.from(col2)).to.eql([o2]); // Deletion propagated by col

        store.delete(o2);

        expect(Array.from(store)).to.eql([]);
        expect(Array.from(col)).to.eql([]);
        expect(Array.from(col2)).to.eql([o2]);
        // Deletion not propagated by col

        col.delete(o2);

        expect(Array.from(store)).to.eql([]);
        expect(Array.from(col)).to.eql([]);
        expect(Array.from(col2)).to.eql([o2]);
        // Ignore explicit deletion by col
      });

      it(`Clearing`, function () {
        const {store, col, o1, o2} = this;
        col.connectOnDelete(store);
        const col2 = new Collection([o1, o2]);
        col2.connectOnDelete(col);

        expect(Array.from(store)).to.eql([o1, o2]);
        expect(Array.from(col)).to.eql([o1]);
        expect(Array.from(col2)).to.eql([o1, o2]);

        store.clear();

        expect(Array.from(store)).to.eql([]);
        expect(Array.from(col)).to.eql([]);
        expect(Array.from(col2)).to.eql([o2]); // Clearing propagated by col

        col.clear();

        expect(Array.from(store)).to.eql([]);
        expect(Array.from(col)).to.eql([]);
        expect(Array.from(col2)).to.eql([o2]);
        // Ignore explicit clearing by col
      });

      it(`Resetting`, function () {
        const {store, col, o1, o2, o3} = this;
        col.connectOnAdd(store);
        col.connectOnDelete(store);
        const col2 = new Collection([o1, o2]);
        col2.connectOnAdd(col);
        col2.connectOnDelete(col);

        expect(Array.from(store)).to.eql([o1, o2]);
        expect(Array.from(col)).to.eql([o1]);
        expect(Array.from(col2)).to.eql([o1, o2]);

        col.reset([o1, o3]);

        expect(Array.from(store)).to.eql([o1, o2]);
        expect(Array.from(col)).to.eql([o1, o3]);
        expect(Array.from(col2)).to.eql([o2, o1, o3]);

        store.reset([o2, o1]);

        expect(Array.from(store)).to.eql([o2, o1]);
        expect(Array.from(col)).to.eql([o3, o2, o1]);
        expect(Array.from(col2)).to.eql([o2, o3, o1]);
      });
    });
  });
});
