/* eslint-disable no-invalid-this */

import {Selection} from '../../src';
import {selectTestSuite} from '../helpers';

describe(`Class Select`, function () {
  describe(`Wrapping a vanilla Map`, function () {
    selectTestSuite({Selection: Map, idProperty: 'id'});
  });

  describe(`Wrapping a Selection`, function () {
    selectTestSuite({Selection, idProperty: 'uid'});
  });
});
