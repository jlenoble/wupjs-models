/* eslint-disable no-invalid-this */

import {Selection} from '../../src';
import {inputTestSuite} from '../helpers';

describe(`Class Input`, function () {
  describe(`Wrapping a vanilla Map`, function () {
    inputTestSuite({Selection: Map, idProperty: 'id', inputProperty: 'title'});
  });

  describe(`Wrapping a Selection`, function () {
    inputTestSuite({Selection, idProperty: 'uid', inputProperty: 'name'});
  });
});
