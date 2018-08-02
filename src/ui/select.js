export class Select {
  constructor ({source, selection}) {
    Object.defineProperties(this, {
      select: {
        value: id => {
          const model = source.get(id);
          return selection.set(id, model);
        },
      },

      unselect: {
        value: id => selection.delete(id),
      },
    });
  }
}
