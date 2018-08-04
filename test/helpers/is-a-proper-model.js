/* eslint-disable no-invalid-this */

import {isAProperItem, emitsOnPropertyChange} from '.';

export const isAProperModel = ({
  Type,
  typeArgs,
  names = ['_id', 'title'],
}) => {
  describe('is a proper Model', function () {
    isAProperItem(Type, typeArgs);

    names.forEach(name => {
      emitsOnPropertyChange({Type, typeArgs, name});
    });
  });
};
