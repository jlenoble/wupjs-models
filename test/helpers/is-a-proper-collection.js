/* eslint-disable no-invalid-this */

import {isAMap, isAProperItem} from '.';

export const isAProperCollection = (Type, typeArgs = []) => {
  describe('is a proper Collection', function () {
    isAMap(Type, typeArgs);
    isAProperItem(Type, typeArgs);
  });
};
