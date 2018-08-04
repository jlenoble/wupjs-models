/* eslint-disable no-invalid-this */

import Schema from 'validate';
import {isAProperItem, emitsOnPropertyChange} from '.';

export const isAProperProperty = ({Type, typeArgs, name}) => {
  describe('is a proper Property', function () {
    if (!typeArgs.length) {
      const validator = new Schema({[name]: String});

      // eslint-disable-next-line no-param-reassign
      typeArgs = [{[name]: 'foo'}, {name, validator}];
    }

    isAProperItem(Type, typeArgs);
    emitsOnPropertyChange({Type, typeArgs, name});
  });
};
