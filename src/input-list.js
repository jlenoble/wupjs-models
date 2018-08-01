export default class InputList {
  constructor ({Model, idProperty, textProperty, selection}) {
    Object.defineProperties(this, {
      add: {
        value: text => {
          const model = new Model({[textProperty]: text});
          return selection.set(model[idProperty], model);
        },
      },

      remove: {
        value: id => selection.delete(id),
      },

      edit: {
        value: (id, title) => {
          const model = selection.get(id);
          model[textProperty] = title;
          return this;
        },
      },

      [Symbol.iterator]: {
        value: () => selection.values(),
      },
    });
  }
}
