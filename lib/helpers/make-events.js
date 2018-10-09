'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const stages = ['request', 'success', 'error'];
const actions = ['create', 'read', 'update', 'delete'];

const makeEvents = exports.makeEvents = (Model, name) => {
  const events = { validate: {} };
  const props = Model.props;

  // Property validation events
  props.forEach(prop => {
    const property = events.validate[prop] = {};

    stages.forEach(stage => {
      property[stage] = `${stage}:validate:${name}:${prop}`;
    });
  });

  // Model CRUD events
  actions.forEach(action => {
    const eventAction = events[action] = {};

    stages.forEach(stage => {
      eventAction[stage] = `${stage}:${action}:${name}`;
    });
  });

  return events;
};