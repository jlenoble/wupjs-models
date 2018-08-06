import {Collection} from '../src';
import {isAMap, isAProperItem} from './helpers';

describe('class Collection', function () {
  isAMap(Collection, []);
  isAProperItem(Collection, []);
});
