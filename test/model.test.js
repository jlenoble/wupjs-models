import {Model} from '../src';
import {isAProperModel} from './helpers';

describe('class Model', function () {
  isAProperModel({
    Type: Model,
    typeArgs: [{_id: 1, title: 'foo'}],
    names: ['title'],
  });
});
