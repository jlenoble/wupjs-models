'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _aggregation = require('./aggregation');

Object.defineProperty(exports, 'aggregation', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_aggregation).default;
  }
});

var _makeClassFactory = require('./make-class-factory');

Object.keys(_makeClassFactory).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _makeClassFactory[key];
    }
  });
});

var _makeDefaultExport = require('./make-default-export');

Object.keys(_makeDefaultExport).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _makeDefaultExport[key];
    }
  });
});

var _makeEvents = require('./make-events');

Object.keys(_makeEvents).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _makeEvents[key];
    }
  });
});

var _makeName = require('./make-name');

Object.keys(_makeName).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _makeName[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }