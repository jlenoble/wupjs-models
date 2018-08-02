/* eslint-disable no-invalid-this */

import {Selection} from '../src';
import {isAMap, isAnEventEmitter} from './helpers';

describe(`Class Selection`, function () {
  isAMap(Selection);
  isAnEventEmitter(Selection);
});
