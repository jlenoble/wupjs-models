/* eslint-disable no-invalid-this */

import Store from '../src/store';
import {isASet, isAnEventEmitter} from './helpers';

describe(`Class Store`, function () {
  isASet(Store);
  isAnEventEmitter(Store);
});
