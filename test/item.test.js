import {Item} from '../src';
import {isAnEventEmitter, hidesEventEmitterProperties} from './helpers';

describe('class Item', function () {
  isAnEventEmitter(Item);
  hidesEventEmitterProperties(Item);
});
