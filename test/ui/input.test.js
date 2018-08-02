/* eslint-disable no-invalid-this */

import {Selection} from '../../src';
import {inputTestSuite} from '../helpers';

describe(`Class Input`, function () {
  describe(`Wrapping a vanilla Map`, function () {
    inputTestSuite('id', 'title', Map);
  });

  describe(`Wrapping a Selection`, function () {
    inputTestSuite('uid', 'name', Selection);
  });
});
