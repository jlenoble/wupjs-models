/* eslint-disable no-invalid-this */

import {expect} from 'chai';

export const hasAnItemAccessor = ({Type, typeArgs, names, updates}) => {
  describe(`has an item accessor`, function () {
    beforeEach(function () {
      this.context = (typeArgs[1] || {}).context;
      if (this.context) {
        this.context.removeAllListeners();
      }
      this.item = {};
      const item = typeArgs[0];
      Object.keys(item).forEach(key => {
        if (names.includes(key)) {
          this.item[key] = item[key];
        }
      });
      this.item['_id'] = item['_id'];
    });

    it(`has an item getter`, function () {
      const prop = new Type(...typeArgs);
      expect(prop.item).to.eql(this.item);
    });

    it(`has an item setter`, function () {
      updates.forEach(([input, ok]) => {
        const prop = new Type(...typeArgs);
        const output = {...prop};

        Object.keys(input).forEach(key => {
          if (prop.props && prop.props.has(key)) {
            if (input[key] !== undefined) {
              output[key] = input[key];
            }
          }
        });

        expect(() => prop.item = {...input}).not.to.throw();
        expect(prop.item).to.eql(output);
      });
    });
  });
};
