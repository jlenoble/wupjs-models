/* eslint-disable no-invalid-this */

import {isAnEventEmitter} from './is-an-event-emitter';
import {hidesEventEmitterProperties} from './hides-parent-properties';

export const isAProperItem = (Type, typeArgs) => {
  describe('is a proper Item', function () {
    isAnEventEmitter(Type, typeArgs);
    hidesEventEmitterProperties(Type, typeArgs);
  });
};
