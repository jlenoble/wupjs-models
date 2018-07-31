/* eslint-disable no-invalid-this */

import Selection from '../src/selection';
import {isASet, isAnEventEmitter} from './helpers';

describe(`Class Selection`, function () {
  isASet(Selection);
  isAnEventEmitter(Selection);
});
