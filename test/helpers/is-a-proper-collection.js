/* eslint-disable no-invalid-this */

import {isAProperMap, isAProperItem} from '.';

export const isAProperCollection = ({Type, typeArgs, names, updates}) => {
  describe('is a proper Collection', function () {
    isAProperMap({Type, typeArgs, names, updates});
    isAProperItem(Type, typeArgs);
  });
};
