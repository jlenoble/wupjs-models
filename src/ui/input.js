export class Input {
  constructor ({Model, idProperty, inputProperty, selection}) {
    Object.defineProperties(this, {
      create: {
        value: input => {
          const model = new Model({[inputProperty]: input});
          return selection.set(model[idProperty], model);
        },
      },

      update: {
        value: (id, input) => {
          const model = selection.get(id);
          model[inputProperty] = input;
          return this;
        },
      },

      delete: {
        value: id => selection.delete(id),
      },
    });
  }
}
