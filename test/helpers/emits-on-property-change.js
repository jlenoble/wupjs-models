/* eslint-disable no-invalid-this */

import {expect} from 'chai';

export const emitsOnPropertyChange = ({
  Type,
  typeArgs = [],
  name = 'name',
} = {}) => {
  describe('emits on property change', function () {
    if (!typeArgs.length) {
      const validator = new Schema({[name]: String});

      // eslint-disable-next-line no-param-reassign
      typeArgs = [{[name]: 'foo'}, {name, validator}];
    }

    it('on success', function () {
      const prop = new Type(...typeArgs);
      let hasEmitted = false;

      prop.addListener(`change:property:${name}`, (ctx, prevValue) => {
        expect(ctx.value).to.equal(prevValue ? prevValue + 1 : 1);
        hasEmitted = true;
      });

      prop.value = prop.value ? prop.value + 1 : 1;
      expect(hasEmitted).to.be.true;
    });

    it('on error', function () {
      const prop = new Type(...typeArgs);
      let hasEmitted = false;

      prop.addListener(`error:change:property:${name}`,
        (ctx, v, errors) => {
          expect(errors).not.to.be.undefined;
          expect(errors[0]).to.be.instanceof(Error);
          hasEmitted = true;
        });

      prop.value = {};
      expect(hasEmitted).to.be.true;
    });
  });
};
