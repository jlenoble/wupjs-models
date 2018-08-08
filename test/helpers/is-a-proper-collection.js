/* eslint-disable no-invalid-this */

import {isMapLike, isAProperItem} from '.';

export const isAProperCollection = ({Type, typeArgs, names, updates}) => {
  describe('is a proper Collection', function () {
    isMapLike({Type, typeArgs, names, updates});
    isAProperItem(Type, typeArgs);
  });
};
