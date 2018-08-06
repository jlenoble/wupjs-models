import {aggregation} from './helpers';
import {Item} from './item';

export class Collection extends aggregation(Map, Item) {}
