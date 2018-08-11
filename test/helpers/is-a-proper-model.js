/* eslint-disable no-invalid-this */

import {Item} from '../../src';
import {isAProperItem, emitsOnPropertyChange, isSetOnce, hasAnItemAccessor,
  emitsOnCreation} from '.';

export const isAProperModel = ({
  Type, typeArgs, createNames, updateNames, updateProperties, createItem = [],
  updateItem = []}) => {
  describe('is a proper Model', function () {
    isAProperItem(Type, typeArgs);

    updateNames.forEach(name => {
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
    hasAnItemAccessor({Type, typeArgs, names: updateNames, updates});

    emitsOnCreation({
      Type,
      options: typeArgs[1] || {context: new Item()},
      names: createNames,
      creates: createItem,
    });
  });
};
