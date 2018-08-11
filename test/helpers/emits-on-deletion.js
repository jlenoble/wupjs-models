/* eslint-disable no-invalid-this */

import {expect} from 'chai';

export const emitsOnDeletion = ({Type, options, names, creates}) => {
  describe(`emits on deletion`, function () {
    beforeEach(function () {
      this.context = options.context;
      this.opts = {...options};
    });

    it(`emits on deletion (proper init)`, function () {
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
        this.context.on(Type.events.delete.request, model => {
          expect(model.item).to.eql(this.item);
          hasEmitted = true;
        });

        const model = new Type(item, this.opts);
        model.delete();

        expect(hasEmitted).to.be.true;
      });
    });

    it(`emits on deletion (improper init)`, function () {
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
        this.context.on(Type.events.delete.request, model => {
          expect(model.item).not.to.eql(this.item);
          hasEmitted = true;
        });

        const model = new Type(item, this.opts);
        model.delete();

        expect(hasEmitted).to.be.true;
      });
    });
  });
};
