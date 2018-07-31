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
      col.connect(store);
      expect(Array.from(col)).to.eql([o1]);
      store.delete(o1);
      expect(Array.from(col)).to.eql([]);
    });
  });
});
