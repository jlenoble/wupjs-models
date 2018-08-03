/* eslint-disable no-invalid-this */

import {isAProperItem} from '.';

export const isAProperModel = (Type, typeArgs = []) => {
  describe('is a proper Model', function () {
    if (!typeArgs.length) {
      const name = 'title';

      // eslint-disable-next-line no-param-reassign
      typeArgs = [{[name]: 'foo'}];
    }

    isAProperItem(Type, typeArgs);
  });
};
