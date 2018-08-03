/* eslint-disable no-invalid-this */

import {isAnEventEmitter, hidesEventEmitterProperties} from '.';

export const isAProperItem = Type => {
  isAnEventEmitter(Type);
  hidesEventEmitterProperties(Type);
};
