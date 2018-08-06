import {Model} from '../src/models';
import {ModelCollection} from '../src/collections';
import {isAProperCollection} from './helpers';
import {expect} from 'chai';

describe('class ModelCollection', function () {
  isAProperCollection(ModelCollection, []);

  describe('has a Collection Crud Api', function () {
    it('creates Models when not found', function () {
      const col = new ModelCollection();
      expect(col.get(1)).to.be.undefined;

      col.set(1, {_id: 10});
      const model = col.get(1);

      expect(model).to.be.instanceof(Model);
      expect(model._id).to.equal(1);
    });
  });
});
