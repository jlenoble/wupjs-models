/* eslint-disable no-invalid-this */

import {isAProperItem, emitsOnPropertyChange, isSetOnce, hasAnItemAccessor}
  from '.';

export const isAProperModel = ({Type, typeArgs, names, updates}) => {
  describe('is a proper Model', function () {
    isAProperItem(Type, typeArgs);

    names.forEach(name => {
      emitsOnPropertyChange({Type, typeArgs, name,
        updates: updates.filter(([input, ok]) => input[name] !== undefined)});
    });

    isSetOnce({Type, typeArgs, name: '_id', updates});

    hasAnItemAccessor({Type, typeArgs, names, updates});
  });
};
