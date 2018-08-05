import {Model} from '../src';
import {isAProperModel, isSetOnce} from './helpers';

describe('class Model', function () {
  isAProperModel({
    Type: Model,
    typeArgs: [{_id: 1, title: 'foo'}],
    names: ['title'],
  });

  isSetOnce({
    Type: Model,
    typeArgs: [{_id: 1, title: 'foo'}],
    name: '_id',
  });
});
