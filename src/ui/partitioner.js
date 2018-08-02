export class Partitioner {
  constructor ({
    idProperty, source, currentPart, PartModel, partIdProperty, parts,
  }) {
    Object.defineProperties(this, {
      select: {
        value: id => {
          const model = source.get(id);
          source.delete(id);
          return currentPart.set(model[idProperty], model);
        },
      },

      unselect: {
        value: id => {
          const model = currentPart.get(id);
          source.set(id, model);
          return currentPart.delete(id);
        },
      },

      save: {
        value: () => {
          const part = new PartModel(currentPart);
          parts.set(part[partIdProperty], part);
          currentPart.clear();
          return part;
        },
      },
    });
  }
}
