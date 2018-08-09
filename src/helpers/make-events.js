const stages = ['request', 'success', 'error'];
const actions = ['create', 'read', 'update', 'delete'];

export const makeEvents = (Model, name) => {
  const events = {validate: {}};
  const props = Model.props;

  props.forEach(prop => {
    // const property =
    events.validate[prop] = {
      request: `change:property:${prop}`,
      error: `error:change:property:${prop}`,
    };

    // stages.forEach(stage => {
    //   property[stage] = `${stage}:validate:${name}:${prop}`;
    // });
  });

  actions.forEach(action => {
    const eventAction = events[action] = {};

    stages.forEach(stage => {
      eventAction[stage] = `${stage}:${action}:${name}`;
    });
  });

  console.log(events);

  return events;
};
