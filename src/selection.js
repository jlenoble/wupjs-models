import EventEmitter from 'events';
import aggregation from './aggregation';

export class Selection extends aggregation(Map, EventEmitter) {}
