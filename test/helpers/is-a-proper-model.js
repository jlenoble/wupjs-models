/* eslint-disable no-invalid-this */

import {isAProperItem, emitsOnPropertyChange, isSetOnce, hasAnItemAccessor}
  from '.';

export const isAProperModel = ({
  Type, typeArgs, names, updateProperties, updateItem = []}) => {
  describe('is a proper Model', function () {
    isAProperItem(Type, typeArgs);

    names.forEach(name => {
      const {request, error} = Type.events.validate[name] || {};
      const requestEvent = request;
      const errorEvent = error;

      if (requestEvent) {
        emitsOnPropertyChange({Type, typeArgs, name, requestEvent, errorEvent,
          updates: updateProperties.filter(([input, ok]) => input[name] !==
            undefined)});
      }
    });

    const updates = updateProperties.concat(updateItem);

    isSetOnce({Type, typeArgs, name: '_id', updates});
    hasAnItemAccessor({Type, typeArgs, names, updates});
  });
};
