/* eslint-disable no-invalid-this */

import {isAnEventEmitter, hidesEventEmitterProperties} from '.';

export const isAProperItem = (Type, typeArgs = []) => {
  describe('is a proper Item', function () {
    isAnEventEmitter(Type, typeArgs);
    hidesEventEmitterProperties(Type, typeArgs);
  });
};
