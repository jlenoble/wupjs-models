/* eslint-disable no-invalid-this */

import {expect} from 'chai';

export const isASet = Type => {
  describe(`is a Set`, function () {
    beforeEach(function () {
      const o1 = {title: 'a'};
      const o2 = {title: 'b'};
      const set = new Type([o1, o2]);

      Object.assign(this, {set, o1, o2});
    });

    it(`ctor()`, function () {
      const set = new Type();
      expect(set.size).to.equal(0);
    });

    it(`ctor([o1, o2])`, function () {
      const {set, o1, o2} = this;
      expect(set.size).to.equal(2);
      expect(Array.from(set)).to.eql([o1, o2]);
    });

    it(`add(o1)`, function () {
      const {set, o1, o2} = this;
      set.add(o1);
      expect(Array.from(set)).to.eql([o1, o2]);
    });

    it(`add(o1).add(o2)`, function () {
      const {set, o1, o2} = this;
      expect(() => set.add(o1).add(o2)).not.to.throw();
      expect(Array.from(set)).to.eql([o1, o2]);
    });

    it(`add(o1).add(o2).add(o3)`, function () {
      const {set, o1, o2} = this;
      const o3 = {title: 'c'};
      set.add(o1).add(o2).add(o3);
      expect(Array.from(set)).to.eql([o1, o2, o3]);
    });

    it(`delete(o1)`, function () {
      const {set, o1, o2} = this;
      set.delete(o1);
      expect(Array.from(set)).to.eql([o2]);
    });

    it(`delete(o1), delete(o2)`, function () {
      const {set, o1, o2} = this;
      set.delete(o1);
      set.delete(o2);
      expect(Array.from(set)).to.eql([]);
    });

    it(`delete(o1), delete(o2), delete(o3)`, function () {
      const {set, o1, o2} = this;
      const o3 = {title: 'c'};
      set.delete(o1);
      set.delete(o2);
      expect(() => set.delete(o3)).not.to.throw();
      expect(Array.from(set)).to.eql([]);
    });

    it(`has(o1)`, function () {
      const {set, o1} = this;
      const o3 = {title: 'c'};
      expect(set.has(o1)).to.be.true;
      expect(set.has(o3)).to.be.false;
    });
  });
};
