/* eslint-disable no-invalid-this */

import {expect} from 'chai';
import {Property} from '../../src';

export const isSetOnce = ({Type, typeArgs, name}) => {
  describe(`${name} is set once`, function () {
    it(`${name} provided to ctor`, function () {
      const prop = new Type(...typeArgs);
      const value = prop instanceof Property ? 'value' : name;

      expect(() => (prop[value] = prop[value] + 1)).to.throw();
      expect(prop[value]).to.equal(typeArgs[0][name]);
    });

    it(`${name} not provided to ctor`, function () {
      const item = {...typeArgs[0]};
      delete item[name];

      const prop = new Type(item, typeArgs[1]);
      const value = prop instanceof Property ? 'value' : name;

      expect(prop[value]).to.be.undefined;
      expect(() => (prop[value] = typeArgs[0][name])).not.to.throw();

      expect(prop[value]).to.equal(typeArgs[0][name]);
      expect(() => (prop[value] = prop[value] + 1)).to.throw();
    });
  });
};
