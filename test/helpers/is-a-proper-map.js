/* eslint-disable no-invalid-this */

import {expect} from 'chai';

export const isAProperMap = ({Type, typeArgs, names, updates}) => {
  describe(`is a proper Map`, function () {
    beforeEach(function () {
      const input = typeArgs[0];
      const map = new Type(...typeArgs);

      const keys = map => Array.from(map.keys());
      const values = map => Array.from(map.values()).map(value => ({...value}));
      const entries = map => Array.from(map.entries()).map(([key, value]) =>
        [key, {...value}]);

      const strip = value => {
        const val = {};
        names.forEach(name => val[name] = value[name]);
        return val;
      };

      const outputKeys = input.map(([key, value]) => key);
      const outputValues = input.map(([key, value]) => strip(value));
      const outputEntries = outputKeys.map((key, i) => [key, outputValues[i]]);

      Object.assign(this, {map, input, strip, keys, entries, values, outputKeys,
        outputValues, outputEntries});
    });

    it(`ctor(), .size, .values()`, function () {
      const map0 = new Type();
      expect(map0.size).to.equal(0);
      expect(Array.from(map0.values())).to.eql([]);

      const {map, values, outputValues} = this;
      expect(map.size).to.equal(outputValues.length);
      expect(values(map)).to.eql(outputValues);
    });

    it(`.keys()`, function () {
      const map0 = new Type();
      expect(Array.from(map0.keys())).to.eql([]);

      const {map, keys, outputKeys} = this;
      expect(keys(map)).to.eql(outputKeys);
    });

    it(`.entries()`, function () {
      const map0 = new Type();
      expect(Array.from(map0.entries())).to.eql([]);

      const {map, entries, outputEntries} = this;
      expect(entries(map)).to.eql(outputEntries);
    });

    it(`.set()`, function () {
      const {map, values, outputKeys, outputValues, strip} = this;
      expect(map.set(outputKeys[0], outputValues[0])).to.equal(map);
      expect(values(map)).to.eql(outputValues);

      updates.forEach(([key, value]) => {
        expect(map.set(outputKeys[1], outputValues[1])
          .set(key, value)).to.equal(map);
        outputValues.push(strip(value));
        expect(values(map)).to.eql(outputValues);
      });
    });

    it(`.delete()`, function () {
      const {map, keys, values} = this;
      keys(map).forEach(key => {
        expect(map.delete(key)).to.be.true;
      });
      expect(values(map)).to.eql([]);

      updates.forEach(([key, value]) => {
        expect(map.delete(key)).to.be.false;
        expect(values(map)).to.eql([]);
      });
    });

    it(`.has()`, function () {
      const {map, keys} = this;
      expect(map.has(keys(map)[0])).to.be.true;

      updates.forEach(([key, value]) => {
        expect(map.has(key)).to.be.false;
      });
    });

    it(`.clear()`, function () {
      const {map, values} = this;
      expect(map.clear()).to.be.undefined;
      expect(values(map)).to.eql([]);
    });

    it(`.forEach()`, function () {
      const map0 = new Type();
      let hasLooped = false;
      map0.forEach((obj, key, map) => {
        hasLooped = true;
      });
      expect(hasLooped).to.be.false;

      const {map} = this;
      const arr = Array.from(map.values());
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

      const {map} = this;
      const arr = Array.from(map.values());
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
