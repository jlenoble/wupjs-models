/* eslint-disable no-invalid-this */

import {expect} from 'chai';
import Collection from '../src/collection';
import {isASet, isAnEventEmitter} from './helpers';

describe(`Class Collection`, function () {
  isASet(Collection);
  isAnEventEmitter(Collection);

  describe(`Connect to Collection`, function () {
    beforeEach(function () {
      const o1 = {title: 'a'};
      const o2 = {title: 'b'};
      const store = new Collection([o1, o2]);
      const col = new Collection([o1]);
      Object.assign(this, {store, col, o1, o2});
    });

    it(`Deleting an item - without connection`, function () {
      const {store, col, o1} = this;
      expect(Array.from(col)).to.eql([o1]);
      store.delete(o1);
      expect(Array.from(col)).to.eql([o1]);
    });

    it(`Deleting an item - with connection`, function () {
      const {store, col, o1} = this;
      col.connectOnDelete(store);
      expect(Array.from(col)).to.eql([o1]);
      store.delete(o1);
      expect(Array.from(col)).to.eql([]);
    });

    it(`Deleting with deep connection`, function () {
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
      expect(Array.from(col2)).to.eql([o2]); // Deletion not propagated by col

      col.delete(o2);

      expect(Array.from(store)).to.eql([]);
      expect(Array.from(col)).to.eql([]);
      expect(Array.from(col2)).to.eql([o2]); // Ignore explicit deletion by col
    });
  });
});
