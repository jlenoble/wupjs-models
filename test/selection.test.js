/* eslint-disable no-invalid-this */

import {expect} from 'chai';
import Store from '../src/store';
import Selection from '../src/selection';
import {isASet, isAnEventEmitter} from './helpers';

describe(`Class Selection`, function () {
  isASet(Selection);
  isAnEventEmitter(Selection);

  describe(`Connect to Store`, function () {
    beforeEach(function () {
      const o1 = {title: 'a'};
      const o2 = {title: 'b'};
      const store = new Store([o1, o2]);

      Object.assign(this, {store, o1, o2});
    });

    it(`Deleting an item - without connection`, function () {
      const {store, o1} = this;
      const sel = new Selection([o1]);

      expect(Array.from(sel)).to.eql([o1]);

      store.delete(o1);

      expect(Array.from(sel)).to.eql([o1]);
    });

    it(`Deleting an item - with connection`, function () {
      const {store, o1} = this;
      const sel = new Selection([o1]);
      sel.connect(store);

      expect(Array.from(sel)).to.eql([o1]);

      store.delete(o1);

      expect(Array.from(sel)).to.eql([]);
    });
  });
});
