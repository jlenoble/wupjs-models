/* eslint-disable no-invalid-this */

import {isMapLike} from './is-map-like';
import {isAProperItem} from './is-a-proper-item';

export const isAProperCollection = ({Type, typeArgs, names, updates}) => {
  describe('is a proper Collection', function () {
    isMapLike({Type, typeArgs, names, updates});
    isAProperItem(Type, typeArgs);
  });
};
