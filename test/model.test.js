import {Model} from '../src';
import {isAProperModel} from './helpers';

describe('class Model', function () {
  isAProperModel({Type: Model, typeArgs: [{title: 'foo'}]});
});