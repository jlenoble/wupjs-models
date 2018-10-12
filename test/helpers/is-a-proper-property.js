/* eslint-disable no-invalid-this */

import Schema from 'validate';
import {isAProperItem} from './is-a-proper-item';
import {emitsOnPropertyChange} from './emits-on-property-change';

export const isAProperProperty = ({Type, typeArgs, name, updates,
  requestEvent, errorEvent}) => {
  describe('is a proper Property', function () {
    if (!typeArgs.length) {
      const validator = new Schema({[name]: String});

      // eslint-disable-next-line no-param-reassign
      typeArgs = [{[name]: 'foo'}, {name, validator}];
    }

    isAProperItem(Type, typeArgs);
    emitsOnPropertyChange({Type, typeArgs, name, updates,
      requestEvent, errorEvent});
  });
};
