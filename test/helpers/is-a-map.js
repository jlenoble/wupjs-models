/* eslint-disable no-invalid-this */

import {expect} from 'chai';

export const isAMap = Type => {
  describe(`is a Map`, function () {
    beforeEach(function () {
      const o1 = {title: 'a'};
      const o2 = {title: 'b'};
      const o3 = {title: 'c'};
      const map = new Type([[o1.title, o1], [o2.title, o2]]);

      Object.assign(this, {map, o1, o2, o3});
    });

    it(`ctor()`, function () {
      const map0 = new Type();
      expect(map0.size).to.equal(0);

      const {map, o1, o2} = this;
      expect(map.size).to.equal(2);
      expect(Array.from(map.values())).to.eql([o1, o2]);
    });

    it(`set()`, function () {
      const {map, o1, o2, o3} = this;
      expect(map.set(o1.title, o1)).to.equal(map);
      expect(Array.from(map.values())).to.eql([o1, o2]);

      expect(map.set(o2.title, o2).set(o3.title, o3)).to.equal(map);
      expect(Array.from(map.values())).to.eql([o1, o2, o3]);
    });

    it(`delete()`, function () {
      const {map, o1, o2, o3} = this;
      expect(map.delete(o1.title)).to.be.true;
      expect(map.delete(o2.title)).to.be.true;
      expect(Array.from(map.values())).to.eql([]);
      expect(map.delete(o3.title)).to.be.false;
    });

    it(`has()`, function () {
      const {map, o1, o3} = this;
      expect(map.has(o1.title)).to.be.true;
      expect(map.has(o3.title)).to.be.false;
    });

    it(`clear()`, function () {
      const {map} = this;
      expect(map.clear()).to.be.undefined;
      expect(Array.from(map.values())).to.eql([]);
    });
  });
};
