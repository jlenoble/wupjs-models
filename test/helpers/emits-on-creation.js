/* eslint-disable no-invalid-this */

import {expect} from 'chai';

export const emitsOnCreation = ({Type, options, names, creates}) => {
  describe(`emits on creation`, function () {
    beforeEach(function () {
      this.context = options.context;
      this.opts = {...options};
    });

    it(`emits on creation success`, function () {
      creates.forEach(([item, ok]) => {
        if (!ok) {
          return;
        }

        this.item = {};
        names.forEach(key => {
          this.item[key] = item[key];
        });

        let hasEmitted = false;

        this.context.removeAllListeners();
        this.context.on(Type.events.create.request, model => {
          expect(model.item).to.eql(this.item);
          hasEmitted = true;
        });

        new Type(item, this.opts);

        expect(hasEmitted).to.be.true;
      });
    });

    it(`emits on creation error`, function () {
      creates.forEach(([item, ok]) => {
        if (ok) {
          return;
        }

        this.item = {};
        names.forEach(key => {
          this.item[key] = item[key];
        });

        let hasEmitted = false;

        this.context.removeAllListeners();
        this.context.on(Type.events.create.request, model => {
          expect(model.item).not.to.eql(this.item);
          hasEmitted = true;
        });

        new Type(item, this.opts);

        expect(hasEmitted).to.be.true;
      });
    });
  });
};
