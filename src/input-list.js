import Selection from './selection';

export default class InputList extends Selection {
  constructor ({Model, idProperty, textProperty, selection}) {
    super(selection);

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
    });

    this.connectOnSet(selection);
    this.connectOnDelete(selection);
  }
}
