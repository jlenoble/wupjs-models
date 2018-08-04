/* eslint-disable no-invalid-this */

import {expect} from 'chai';
import {Property} from '../../src';

export const emitsOnPropertyChange = ({Type, typeArgs, name}) => {
  describe(`emits on change`, function () {
    it(`on ${name} change success`, function () {
      const prop = new Type(...typeArgs);
      const value = prop instanceof Property ? 'value' : name;
      let hasEmitted = false;

      prop.addListener(`change:property:${name}`, (ctx, prevValue) => {
        expect(ctx.value).to.equal(prevValue ? prevValue + 1 : 1);
        hasEmitted = true;
      });

      prop[value] = prop[value] ? prop[value] + 1 : 1;

      expect(hasEmitted).to.be.true;
    });

    it(`on ${name} change error`, function () {
      const prop = new Type(...typeArgs);
      const value = prop instanceof Property ? 'value' : name;
      let hasEmitted = false;

      prop.addListener(`error:change:property:${name}`,
        (ctx, v, errors) => {
          expect(errors).not.to.be.undefined;
          expect(errors[0]).to.be.instanceof(Error);
          hasEmitted = true;
        });

      prop[value] = {};
      expect(hasEmitted).to.be.true;
    });
  });
};
