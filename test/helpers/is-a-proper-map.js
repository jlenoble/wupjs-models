/* eslint-disable no-invalid-this */

import {expect} from 'chai';

export const isAProperMap = Type => {
  describe(`is a proper Map`, function () {
    beforeEach(function () {
      const o1 = {title: 'a'};
      const o2 = {title: 'b'};
      const o3 = {title: 'c'};
      const map = new Type([[o1.title, o1], [o2.title, o2]]);

      Object.assign(this, {map, o1, o2, o3});
    });

    it(`ctor(), .size, .values()`, function () {
      const map0 = new Type();
      expect(map0.size).to.equal(0);
      expect(Array.from(map0.values())).to.eql([]);

      const {map, o1, o2} = this;
      expect(map.size).to.equal(2);
      expect(Array.from(map.values())).to.eql([o1, o2]);
    });

    it(`.keys()`, function () {
      const map0 = new Type();
      expect(Array.from(map0.keys())).to.eql([]);

      const {map, o1, o2} = this;
      expect(Array.from(map.keys())).to.eql([o1.title, o2.title]);
    });

    it(`.entries()`, function () {
      const map0 = new Type();
      expect(Array.from(map0.entries())).to.eql([]);

      const {map, o1, o2} = this;
      expect(Array.from(map.entries())).to.eql(
        [[o1.title, o1], [o2.title, o2]]);
    });

    it(`.set()`, function () {
      const {map, o1, o2, o3} = this;
      expect(map.set(o1.title, o1)).to.equal(map);
      expect(Array.from(map.values())).to.eql([o1, o2]);

      expect(map.set(o2.title, o2).set(o3.title, o3)).to.equal(map);
      expect(Array.from(map.values())).to.eql([o1, o2, o3]);
    });

    it(`.delete()`, function () {
      const {map, o1, o2, o3} = this;
      expect(map.delete(o1.title)).to.be.true;
      expect(map.delete(o2.title)).to.be.true;
      expect(Array.from(map.values())).to.eql([]);
      expect(map.delete(o3.title)).to.be.false;
    });

    it(`.has()`, function () {
      const {map, o1, o3} = this;
      expect(map.has(o1.title)).to.be.true;
      expect(map.has(o3.title)).to.be.false;
    });

    it(`.clear()`, function () {
      const {map} = this;
      expect(map.clear()).to.be.undefined;
      expect(Array.from(map.values())).to.eql([]);
    });

    it(`.forEach()`, function () {
      const map0 = new Type();
      let hasLooped = false;
      map0.forEach((obj, key, map) => {
        hasLooped = true;
      });
      expect(hasLooped).to.be.false;

      const {map, o1, o2} = this;
      const arr = [o1, o2];
      map.forEach((obj, key, mp) => {
        hasLooped = true;
        const o = arr.shift();
        expect(mp).to.equal(map);
        expect(mp.get(key)).to.equal(obj);
        expect(obj).to.equal(o);
      });
      expect(hasLooped).to.be.true;
    });

    it(`@@species`, function () {
      expect(Type[Symbol.species]).to.equal(Type);
    });

    it(`@@iterator`, function () {
      const map0 = new Type();
      let hasLooped = false;
      for (let [key, obj] of map0) {
        expect(map0.get(key)).to.equal(obj);
        hasLooped = true;
      }
      expect(hasLooped).to.be.false;

      const {map, o1, o2} = this;
      const arr = [o1, o2];
      const it = map[Symbol.iterator]();
      for (let [key, obj] of map) {
        hasLooped = true;
        const o = arr.shift();
        const {value, done} = it.next();
        expect(map.get(key)).to.equal(obj);
        expect(obj).to.equal(o);
        expect(value[1]).to.equal(o);
        expect(done).to.be.false;
      }
      expect(hasLooped).to.be.true;
      expect(it.next().done).to.be.true;
    });
  });
};
