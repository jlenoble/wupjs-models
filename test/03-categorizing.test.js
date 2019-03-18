import {expect} from 'chai';

import CollectionType from '../src/collection-type';

describe('Categorizing', function () {
  beforeEach(function () {
    const tokens = ['lorem', 'ipsum', 'dolor', 'sit', 'amet'];
    const List = new CollectionType();
    const lTokens = new List(tokens);
    const cTokens = lTokens.categorize('Tokens');
    const Tokens = cTokens.constructor;

    // eslint-disable-next-line no-invalid-this
    Object.assign(this, {tokens, lTokens, cTokens, Tokens});
  });

  afterEach(function () {
    // eslint-disable-next-line no-invalid-this
    const {Tokens} = this;
    Tokens.clear();
  });

  it('Creating a category', function () {
    // eslint-disable-next-line no-invalid-this
    const {tokens, lTokens, cTokens, Tokens} = this;

    expect(Tokens.name).to.equal('Tokens');
    expect(cTokens.equiv(tokens)).to.be.true;
    expect(cTokens.equiv(lTokens)).to.be.true;
    expect(cTokens.equiv(Tokens)).to.be.true;
  });

  it('Adding to a category', function () {
    // eslint-disable-next-line no-invalid-this
    const {cTokens, Tokens} = this;

    const tokens = ['consectetur', 'adipiscing', 'elit'];
    const cTokens2 = new Tokens(tokens);

    expect(cTokens2.equiv(tokens)).to.be.true;
    expect(Tokens.contains(cTokens)).to.be.true;
    expect(Tokens.contains(cTokens2)).to.be.true;
    expect(Tokens.equiv(cTokens2)).to.be.false;
  });

  it('Selecting from a category', function () {
    // eslint-disable-next-line no-invalid-this
    const {tokens, cTokens} = this;

    cTokens.select(tokens[0]);
    cTokens.select(tokens[1]);

    cTokens.unselect(tokens[0]);
    cTokens.unselect(tokens[2]); // Should do nothing and not throw
    cTokens.unselect('foobar'); // Should do nothing and not throw

    expect(cTokens.isSelected(tokens[0])).to.be.false;
    expect(cTokens.isSelected(tokens[1])).to.be.true;
    expect(cTokens.isSelected(tokens[2])).to.be.false;
    expect(cTokens.isSelected(tokens[3])).to.be.false;
    expect(cTokens.isSelected(tokens[4])).to.be.false;
    expect(cTokens.isSelected('foobar')).to.be.false;
  });

  it('Unselecting from a category', function () {
    // eslint-disable-next-line no-invalid-this
    const {tokens, cTokens} = this;

    cTokens.select(tokens[0]);
    cTokens.select(tokens[3]);
    cTokens.select('foobar'); // Should do nothing and not throw

    expect(cTokens.isSelected(tokens[0])).to.be.true;
    expect(cTokens.isSelected(tokens[1])).to.be.false;
    expect(cTokens.isSelected(tokens[2])).to.be.false;
    expect(cTokens.isSelected(tokens[3])).to.be.true;
    expect(cTokens.isSelected(tokens[4])).to.be.false;
    expect(cTokens.isSelected('foobar')).to.be.false;
  });

  describe('Updating within a category', function () {
    describe('Updated element is unshared', function () {
      it('Updated element is unselected', function () {
        // eslint-disable-next-line no-invalid-this
        const {tokens, cTokens} = this;

        cTokens.update(tokens[2], 'foobar');

        expect(cTokens.has(tokens[0])).to.be.true;
        expect(cTokens.has(tokens[1])).to.be.true;
        expect(cTokens.has(tokens[2])).to.be.false;
        expect(cTokens.has(tokens[3])).to.be.true;
        expect(cTokens.has(tokens[4])).to.be.true;
        expect(cTokens.has('foobar')).to.be.true;
      });

      it('Updated element is selected', function () {
        // eslint-disable-next-line no-invalid-this
        const {tokens, cTokens} = this;

        cTokens.select(tokens[2]);
        cTokens.update(tokens[2], 'foobar');

        expect(cTokens.has(tokens[0])).to.be.true;
        expect(cTokens.has(tokens[1])).to.be.true;
        expect(cTokens.has(tokens[2])).to.be.false;
        expect(cTokens.has(tokens[3])).to.be.true;
        expect(cTokens.has(tokens[4])).to.be.true;
        expect(cTokens.has('foobar')).to.be.true;

        expect(cTokens.isSelected(tokens[0])).to.be.false;
        expect(cTokens.isSelected(tokens[1])).to.be.false;
        expect(cTokens.isSelected(tokens[2])).to.be.false;
        // expect(cTokens.isSelected(tokens[3])).to.be.false;
        // expect(cTokens.isSelected(tokens[4])).to.be.false;
        // expect(cTokens.isSelected('foobar')).to.be.true;
      });
    });

    describe('Updated element is shared', function () {
      beforeEach(function () {
        // eslint-disable-next-line no-invalid-this
        const {tokens, Tokens} = this;

        // eslint-disable-next-line no-invalid-this
        this.cTokens2 = new Tokens([tokens[2], tokens[4]]);
      });

      it('Updated element is unselected', function () {
        // eslint-disable-next-line no-invalid-this
        const {tokens, cTokens, cTokens2} = this;

        cTokens.update(tokens[2], 'foobar');

        expect(cTokens.has(tokens[0])).to.be.true;
        expect(cTokens.has(tokens[1])).to.be.true;
        expect(cTokens.has(tokens[2])).to.be.false;
        expect(cTokens.has(tokens[3])).to.be.true;
        expect(cTokens.has(tokens[4])).to.be.true;
        expect(cTokens.has('foobar')).to.be.true;

        expect(cTokens2.has(tokens[2])).to.be.false;
        expect(cTokens2.has(tokens[4])).to.be.true;
        expect(cTokens2.has('foobar')).to.be.true;
      });

      it('Updated element is selected', function () {
        // eslint-disable-next-line no-invalid-this
        const {tokens, cTokens, cTokens2} = this;

        cTokens.select(tokens[2]);
        cTokens.update(tokens[2], 'foobar');

        expect(cTokens.has(tokens[0])).to.be.true;
        expect(cTokens.has(tokens[1])).to.be.true;
        expect(cTokens.has(tokens[2])).to.be.false;
        expect(cTokens.has(tokens[3])).to.be.true;
        expect(cTokens.has(tokens[4])).to.be.true;
        expect(cTokens.has('foobar')).to.be.true;

        expect(cTokens.isSelected(tokens[0])).to.be.false;
        expect(cTokens.isSelected(tokens[1])).to.be.false;
        expect(cTokens.isSelected(tokens[2])).to.be.false;
        expect(cTokens.isSelected(tokens[3])).to.be.false;
        expect(cTokens.isSelected(tokens[4])).to.be.false;
        expect(cTokens.isSelected('foobar')).to.be.true;

        expect(cTokens2.has(tokens[2])).to.be.false;
        expect(cTokens2.has(tokens[4])).to.be.true;
        expect(cTokens2.has('foobar')).to.be.true;

        expect(cTokens2.isSelected(tokens[2])).to.be.false;
        expect(cTokens2.isSelected(tokens[4])).to.be.false;
        expect(cTokens2.isSelected('foobar')).to.be.false;
      });
    });
  });

  it('Renaming a category');

  it('Removing from a category', function () {
    // eslint-disable-next-line no-invalid-this
    const {tokens, cTokens, Tokens} = this;

    cTokens.delete(tokens[2]);

    expect(cTokens.has(tokens[0])).to.be.true;
    expect(cTokens.has(tokens[1])).to.be.true;
    expect(cTokens.has(tokens[2])).to.be.false;
    expect(cTokens.has(tokens[3])).to.be.true;
    expect(cTokens.has(tokens[4])).to.be.true;

    expect(Tokens.has(tokens[0])).to.be.true;
    expect(Tokens.has(tokens[1])).to.be.true;
    expect(Tokens.has(tokens[2])).to.be.true;
    expect(Tokens.has(tokens[3])).to.be.true;
    expect(Tokens.has(tokens[4])).to.be.true;
  });

  it('Clearing a category', function () {
    // eslint-disable-next-line no-invalid-this
    const {tokens, cTokens, Tokens} = this;

    cTokens.clear();

    expect(cTokens.has(tokens[0])).to.be.false;
    expect(cTokens.has(tokens[1])).to.be.false;
    expect(cTokens.has(tokens[2])).to.be.false;
    expect(cTokens.has(tokens[3])).to.be.false;
    expect(cTokens.has(tokens[4])).to.be.false;

    expect(Tokens.has(tokens[0])).to.be.true;
    expect(Tokens.has(tokens[1])).to.be.true;
    expect(Tokens.has(tokens[2])).to.be.true;
    expect(Tokens.has(tokens[3])).to.be.true;
    expect(Tokens.has(tokens[4])).to.be.true;
  });

  it('Erasing from a category', function () {
    // eslint-disable-next-line no-invalid-this
    const {tokens, cTokens, Tokens} = this;

    cTokens.erase(tokens[2]);

    expect(cTokens.has(tokens[0])).to.be.true;
    expect(cTokens.has(tokens[1])).to.be.true;
    expect(cTokens.has(tokens[2])).to.be.false;
    expect(cTokens.has(tokens[3])).to.be.true;
    expect(cTokens.has(tokens[4])).to.be.true;
    expect(cTokens.size).to.equal(4);

    expect(Tokens.has(tokens[0])).to.be.true;
    expect(Tokens.has(tokens[1])).to.be.true;
    expect(Tokens.has(tokens[2])).to.be.false;
    expect(Tokens.has(tokens[3])).to.be.true;
    expect(Tokens.has(tokens[4])).to.be.true;
    expect(Tokens.size).to.equal(4);
  });

  it('Erasing all from a category', function () {
    // eslint-disable-next-line no-invalid-this
    const {tokens, cTokens, Tokens} = this;

    Tokens.clear();

    expect(cTokens.has(tokens[0])).to.be.false;
    expect(cTokens.has(tokens[1])).to.be.false;
    expect(cTokens.has(tokens[2])).to.be.false;
    expect(cTokens.has(tokens[3])).to.be.false;
    expect(cTokens.has(tokens[4])).to.be.false;
    expect(cTokens.size).to.equal(0);

    expect(Tokens.has(tokens[0])).to.be.false;
    expect(Tokens.has(tokens[1])).to.be.false;
    expect(Tokens.has(tokens[2])).to.be.false;
    expect(Tokens.has(tokens[3])).to.be.false;
    expect(Tokens.has(tokens[4])).to.be.false;
    expect(cTokens.size).to.equal(0);
  });
});
