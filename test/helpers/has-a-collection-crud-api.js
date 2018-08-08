/* eslint-disable no-invalid-this */

import {expect} from 'chai';

export const hasACollectionCrudApi = ({
  Type, ElementType, typeArgs, names, setOnce = [], updates}) => {
  describe('has a Collection Crud Api', function () {
    beforeEach(function () {
      const col = new Type(...typeArgs);
      const strip = value => {
        const val = {};
        names.forEach(name => {
          if (value[name] !== undefined && !setOnce.includes(name)) {
            val[name] = value[name];
          }
        });
        return val;
      };

      Object.assign(this, {col, strip});
    });

    it('creates and reads Models', function () {
      const {col} = this;
      let size = col.size;

      updates.filter(([key]) => {
        return !col.has(key);
      }).forEach(([key, value]) => {
        col.set(key, value);
        size++;
        const model = col.get(key);

        expect(size).to.equal(col.size);
        expect(model).to.be.instanceof(ElementType);
        expect(model._id).to.equal(key);
        expect(col.get(key)).to.equal(model);
      });
    });

    it('updates Models', function () {
      const {col, strip} = this;
      const size = col.size;

      updates.filter(([key]) => {
        return col.has(key);
      }).forEach(([key, value]) => {
        const model = col.get(key);
        const m0 = {...model};
        col.set(key, value);

        expect(size).to.equal(col.size);
        expect(col.get(key)).to.equal(model);
        expect(model._id).to.equal(key);
        expect({...model}).to.eql({...m0, ...strip(value)});
      });
    });

    it('deletes Models', function () {
      const {col} = this;
      let size = col.size;

      updates.forEach(([key, value]) => {
        if (col.has(key)) {
          size--;
          expect(col.delete(key)).to.be.true;
        } else {
          expect(col.delete(key)).to.be.false;
        }

        expect(col.size).to.equal(size);
      });
    });
  });
};
