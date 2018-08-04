import {Item} from './item';
import {_Id, Title} from './properties';

export class Model extends Item {
  constructor (item) {
    super();

    const id = new _Id(item, {context: this});
    const title = new Title(item, {context: this});

    Object.defineProperties(this, {
      [id.name]: {
        get () {
          return id.value;
        },
        set (i) {
          id.value = i;
        },
        enumerable: true,
      },

      [title.name]: {
        get () {
          return title.value;
        },
        set (t) {
          title.value = t;
        },
        enumerable: true,
      },
    });
  }
}
