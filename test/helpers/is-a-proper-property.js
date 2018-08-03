/* eslint-disable no-invalid-this */

import Schema from 'validate';
import {isAProperItem} from '.';

export const isAProperProperty = (Type, typeArgs = []) => {
  describe('is a proper Property', function () {
    if (!typeArgs.length) {
      const name = 'title';
      const validator = new Schema({[name]: String});

      // eslint-disable-next-line no-param-reassign
      typeArgs = [{[name]: 'foo'}, {name, validator}];
    }

    isAProperItem(Type, typeArgs);
  });
};
