/* eslint-disable no-invalid-this */

import {expect} from 'chai';
import EventEmitter from 'events';

export const hidesParentProperties = ({
  Type, ParentType, typeArgs, parentTypeArgs = [],
}) => {
  describe(`hides parent properties`, function () {
    const obj = new Type(...typeArgs);
    const parent = new ParentType(...parentTypeArgs);
    const objKeys = Object.keys(obj);

    Object.keys(parent).forEach(key => { // eslint-disable-line guard-for-in
      it(`.${key}`, function () {
        expect(objKeys).not.to.include(key);
      });
    });
  });
};

export const hidesEventEmitterProperties = (Type, typeArgs) => {
  return hidesParentProperties({Type, ParentType: EventEmitter, typeArgs});
};
