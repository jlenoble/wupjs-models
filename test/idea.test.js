import {Idea} from '../src/models';
import {isAProperModel} from './helpers';

describe('class Idea', function () {
  isAProperModel({
    Type: Idea,
    typeArgs: [{_id: 1, title: 'foo'}],
    names: ['title'],
  });
});
