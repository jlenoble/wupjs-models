/* eslint-disable no-invalid-this */

import {expect} from 'chai';

export const isAnEventEmitter = (Type, typeArgs = []) => {
  describe(`is an EventEmitter`, function () {
    it(`addListener() & emit()`, function () {
      const emit = new Type(...typeArgs);
      const o1 = {title: 'a'};
      const o2 = {title: 'b'};
      let cb = (...args) => {
        expect(args).to.eql([o1, o2]);
        cb = true;
      };

      emit.addListener('event', cb);
      expect(emit.listeners('event')).to.have.length(1);
      emit.emit('event', o1, o2);

      expect(cb).to.be.true;
    });

    it(`removeListener()`, function () {
      const emit = new Type(...typeArgs);
      const o1 = {title: 'a'};
      const o2 = {title: 'b'};
      let cb = (...args) => {
        expect(args).to.eql([o1, o2]);
        cb = true;
      };

      emit.addListener('event', cb);
      expect(emit.listeners('event')).to.have.length(1);
      emit.removeListener('event', cb);
      expect(emit.listeners('event')).to.have.length(0);
      emit.emit('event', o1, o2);

      expect(cb).not.to.be.true;
    });
  });
};
