/* eslint-disable no-invalid-this */

import {expect} from 'chai';
import {Property} from '../../src';

export const isSetOnce = ({Type, typeArgs, name, updates}) => {
  describe(`${name} is set once`, function () {
    it(`${name} provided to ctor`, function () {
      updates.filter(([input, ok]) => input[name] !== undefined && ok)
        .forEach(([input, ok]) => {
          const prop = new Type(...typeArgs);
          const value = prop instanceof Property ? 'value' : name;

          expect(() => (prop[value] = input[name])).to.throw();
          expect(() => (prop[value] = typeArgs[0][name])).to.throw();
          expect(() => (prop[value] = undefined)).to.throw();
          expect(prop[value]).to.equal(typeArgs[0][name]);
        });
    });

    it(`${name} not provided to ctor`, function () {
      const item = {...typeArgs[0]};
      delete item[name];

      updates.filter(([input, ok]) => input[name] !== undefined)
        .forEach(([input, ok]) => {
          const prop = new Type(item, typeArgs[1]);
          const value = prop instanceof Property ? 'value' : name;

          expect(prop[value]).to.be.undefined;
          expect(() => prop[value] = input[name]).not.to.throw();

          if (ok) {
            expect(prop[value]).to.eql(input[name]);
            expect(() => prop[value] = input[name]).to.throw();
          } else {
            expect(prop[value]).to.be.undefined;
            expect(() => prop[value] = input[name]).not.to.throw();
          }
        });
    });
  });
};
