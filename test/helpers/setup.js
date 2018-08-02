/* eslint-disable no-invalid-this */

export function setup (Selection = Map, idProperty = '_id',
  inputProperty = 'title') {
  let id = 0;

  const Model = class {
    constructor (opts) {
      this[idProperty] = ++id;
      this[inputProperty] = opts[inputProperty];
    }

    toEntry () {
      return [this[idProperty], this];
    }
  };

  const o1 = {[inputProperty]: 'a'};
  const o2 = {[inputProperty]: 'b'};
  const o3 = {[inputProperty]: 'c'};
  const o4 = {[inputProperty]: 'd'};
  const o5 = {[inputProperty]: 'e'};

  const m1 = new Model(o1);
  const m2 = new Model(o2);
  const m3 = new Model(o3);

  const u1 = {[idProperty]: m1[idProperty], [inputProperty]: 'a'};
  const u2 = {[idProperty]: m2[idProperty], [inputProperty]: 'b'};
  const u3 = {[idProperty]: m3[idProperty], [inputProperty]: 'c'};
  const u4 = {[idProperty]: m3[idProperty] + 1, [inputProperty]:
    o4[inputProperty]};
  const u5 = {[idProperty]: m3[idProperty] + 2, [inputProperty]:
    o5[inputProperty]};

  const models = [m1, m2, m3];
  const selection = new Selection(models.map(m => m.toEntry()));

  Object.assign(this, {Model, idProperty, inputProperty, selection,
    u1, u2, u3, u4, u5});
}
