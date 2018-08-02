export class InputList {
  constructor ({Model, idProperty, textProperty, selection}) {
    Object.defineProperties(this, {
      create: {
        value: text => {
          const model = new Model({[textProperty]: text});
          return selection.set(model[idProperty], model);
        },
      },

      update: {
        value: (id, title) => {
          const model = selection.get(id);
          model[textProperty] = title;
          return this;
        },
      },

      delete: {
        value: id => selection.delete(id),
      },
    });
  }
}
