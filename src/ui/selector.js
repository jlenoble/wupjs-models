export class Selector {
  constructor ({
    idProperty, source, currentSelection, PartModel, partIdProperty, parts,
  }) {
    Object.defineProperties(this, {
      select: {
        value: id => {
          const model = source.get(id);
          return currentSelection.set(model[idProperty], model);
        },
      },

      unselect: {
        value: id => currentSelection.delete(id),
      },

      save: {
        value: () => {
          const part = new PartModel(currentSelection);
          parts.set(part[partIdProperty], part);
          currentSelection.clear();
          return part;
        },
      },
    });
  }
}
