/* eslint-disable no-invalid-this */

import {expect} from 'chai';

export const hidesParentProperties = ({
  Type, ParentType, typeArgs = [], parentTypeArgs = [],
}) => {
  const obj = new Type(...typeArgs);
  const parent = new ParentType(...parentTypeArgs);
  const objKeys = Object.keys(obj);

  describe(`hides parent properties`, function () {
    for (let key in parent) { // eslint-disable-line guard-for-in
      it(`.${key}`, function () {
        expect(objKeys).not.to.include(key);
      });
    }
  });
};
