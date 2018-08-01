/* eslint-disable no-invalid-this */

import {expect} from 'chai';

export const isAMap = Type => {
  describe(`is a Map`, function () {
    beforeEach(function () {
      const o1 = {title: 'a'};
      const o2 = {title: 'b'};
      const map = new Type([[o1.title, o1], [o2.title, o2]]);

      Object.assign(this, {map, o1, o2});
    });

    it(`ctor()`, function () {
      const map = new Type();
      expect(map.size).to.equal(0);
    });

    it(`ctor([[o1.title, o1], [o2.title, o2]]])`, function () {
      const {map, o1, o2} = this;
      expect(map.size).to.equal(2);
      expect(Array.from(map.values())).to.eql([o1, o2]);
    });

    it(`set(o1.title, o1)`, function () {
      const {map, o1, o2} = this;
      map.set(o1.title, o1);
      expect(Array.from(map.values())).to.eql([o1, o2]);
    });

    it(`set(o1.title, o1).set(o2.title, o2)`, function () {
      const {map, o1, o2} = this;
      expect(() => map.set(o1.title, o1).set(o2.title, o2)).not.to.throw();
      expect(Array.from(map.values())).to.eql([o1, o2]);
    });

    it(`set(o1.title, o1).set(o2.title, o2).set(o3.title, o3)`, function () {
      const {map, o1, o2} = this;
      const o3 = {title: 'c'};
      map.set(o1.title, o1).set(o2.title, o2).set(o3.title, o3);
      expect(Array.from(map.values())).to.eql([o1, o2, o3]);
    });

    it(`delete(o1.title)`, function () {
      const {map, o1, o2} = this;
      map.delete(o1.title);
      expect(Array.from(map.values())).to.eql([o2]);
    });

    it(`delete(o1.title), delete(o2.title)`, function () {
      const {map, o1, o2} = this;
      map.delete(o1.title);
      map.delete(o2.title);
      expect(Array.from(map.values())).to.eql([]);
    });

    it(`delete(o1.title), delete(o2.title), delete(o3.title)`, function () {
      const {map, o1, o2} = this;
      const o3 = {title: 'c'};
      map.delete(o1.title);
      map.delete(o2.title);
      expect(() => map.delete(o3.title)).not.to.throw();
      expect(Array.from(map.values())).to.eql([]);
    });

    it(`has(o1.title)`, function () {
      const {map, o1} = this;
      const o3 = {title: 'c'};
      expect(map.has(o1.title)).to.be.true;
      expect(map.has(o3.title)).to.be.false;
    });
  });
};
