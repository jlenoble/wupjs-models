/* eslint-disable no-invalid-this */

import {isAProperMap, isAProperItem} from '.';

export const isAProperCollection = (Type, typeArgs = []) => {
  describe('is a proper Collection', function () {
    isAProperMap(Type, typeArgs);
    isAProperItem(Type, typeArgs);
  });
};
