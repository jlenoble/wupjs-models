import {expect} from 'chai';

import CollectionType from '../src/collection-type';

describe('Brainstorming', function () {
  beforeEach(function () {
    const ideas = ['lorem', 'ipsum', 'dolor', 'sit', 'amet'];
    const List = new CollectionType('List');
    const everything = new List();

    // eslint-disable-next-line no-invalid-this
    Object.assign(this, {ideas, everything});
  });

  it('Collecting ideas', function () {
    // eslint-disable-next-line no-invalid-this
    const {ideas, everything} = this;

    ideas.forEach(idea => {
      everything.add(idea);
    });

    ideas.forEach(idea => {
      expect(everything.has(idea)).to.be.true;
    });
  });

  it('Dropping ideas', function () {
    // eslint-disable-next-line no-invalid-this
    const {ideas, everything} = this;

    ideas.forEach(idea => {
      everything.add(idea);
    });

    everything.delete(ideas[2]);
    everything.delete(ideas[3]);

    expect(everything.has(ideas[0])).to.be.true;
    expect(everything.has(ideas[1])).to.be.true;
    expect(everything.has(ideas[2])).to.be.false;
    expect(everything.has(ideas[3])).to.be.false;
    expect(everything.has(ideas[4])).to.be.true;
  });

  it('Editing ideas', function () {
    // eslint-disable-next-line no-invalid-this
    const {ideas, everything} = this;

    ideas.forEach(idea => {
      everything.add(idea);
    });

    everything.update(ideas[2], 'foobar');

    expect(everything.has(ideas[0])).to.be.true;
    expect(everything.has(ideas[1])).to.be.true;
    expect(everything.has(ideas[2])).to.be.false;
    expect(everything.has('foobar')).to.be.true;
    expect(everything.has(ideas[3])).to.be.true;
    expect(everything.has(ideas[4])).to.be.true;
  });
});
