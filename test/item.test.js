import {Item} from '../src';
import EventEmitter from 'events';
import {isAnEventEmitter, hidesParentProperties} from './helpers';

describe('class Item', function () {
  isAnEventEmitter(Item);
  hidesParentProperties({Type: Item, ParentType: EventEmitter});
});
