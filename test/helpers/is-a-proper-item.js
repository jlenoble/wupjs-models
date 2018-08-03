/* eslint-disable no-invalid-this */

import {isAnEventEmitter, hidesEventEmitterProperties} from '.';

export const isAProperItem = (Type, typeArgs = []) => {
  isAnEventEmitter(Type, typeArgs);
  hidesEventEmitterProperties(Type, typeArgs);
};
