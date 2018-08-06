/* eslint-disable no-invalid-this */

import {expect} from 'chai';
import {Property} from '../../src';

export const emitsOnPropertyChange = ({Type, typeArgs, name, updates}) => {
  describe(`emits on change`, function () {
    beforeEach(function () {
      this.context = (typeArgs[1] || {}).context;
      if (this.context) {
        this.context.removeAllListeners();
      }
    });

    it(`on ${name} change success`, function () {
      const prop = new Type(...typeArgs);
      const value = prop instanceof Property ? 'value' : name;
      let hasEmitted = false;
      let result;
      const success = updates.filter(([input, ok]) => ok)
        .map(([input, ok]) => input);

      expect(prop.listeners(`change:property:${name}`)).to.be.empty;
      expect(prop.listeners(`error:change:property:${name}`)).to.be.empty;

      prop.addListener(`change:property:${name}`, (ctx, prevValue) => {
        expect(ctx.value).to.equal(result);
        hasEmitted = true;
        result = undefined;
      });

      expect(prop.listeners(`change:property:${name}`)).not.to.be.empty;
      expect(prop.listeners(`error:change:property:${name}`)).to.be.empty;

      success.forEach(input => {
        prop[value] = result = input[name];
        expect(hasEmitted).to.be.true;
        hasEmitted = false;
      });
    });

    it(`on ${name} change error`, function () {
      const prop = new Type(...typeArgs);
      const value = prop instanceof Property ? 'value' : name;
      let hasEmitted = false;

      const failure = updates.filter(([input, ok]) => !ok)
        .map(([input, ok]) => input);

      expect(prop.listeners(`change:property:${name}`)).to.be.empty;
      expect(prop.listeners(`error:change:property:${name}`)).to.be.empty;

      prop.addListener(`error:change:property:${name}`,
        (ctx, v, errors) => {
          expect(errors).not.to.be.undefined;
          expect(errors[0]).to.be.instanceof(Error);
          hasEmitted = true;
        });

      expect(prop.listeners(`change:property:${name}`)).to.be.empty;
      expect(prop.listeners(`error:change:property:${name}`)).not.to.be.empty;

      failure.forEach(input => {
        prop[value] = input[name];
        expect(hasEmitted).to.be[prop instanceof Property || prop.props &&
          prop.props.has(name) ? 'true' : 'false'];
        hasEmitted = false;
      });
    });
  });
};
