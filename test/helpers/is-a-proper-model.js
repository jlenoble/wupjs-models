/* eslint-disable no-invalid-this */

import {isAProperItem, emitsOnPropertyChange, isSetOnce, hasAnItemAccessor}
  from '.';

export const isAProperModel = ({Type, typeArgs, names}) => {
  describe('is a proper Model', function () {
    isAProperItem(Type, typeArgs);

    names.forEach(name => {
      emitsOnPropertyChange({Type, typeArgs, name});
    });

    isSetOnce({Type, typeArgs, name: '_id'});

    hasAnItemAccessor({Type, typeArgs, names});
  });
};
