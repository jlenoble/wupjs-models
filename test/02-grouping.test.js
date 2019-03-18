import {expect} from 'chai';

import CollectionType from '../src/collection-type';

describe('Grouping', function () {
  beforeEach(function () {
    const ideas = ['lorem', 'ipsum', 'dolor', 'sit', 'amet'];
    const List = new CollectionType();
    const everything = new List(ideas);

    // eslint-disable-next-line no-invalid-this
    Object.assign(this, {ideas, everything});
  });

  it('Selecting ideas', function () {
    // eslint-disable-next-line no-invalid-this
    const {ideas, everything} = this;

    everything.select(ideas[0]);
    everything.select(ideas[3]);
    everything.select('foobar'); // Should do nothing and not throw

    expect(everything.isSelected(ideas[0])).to.be.true;
    expect(everything.isSelected(ideas[1])).to.be.false;
    expect(everything.isSelected(ideas[2])).to.be.false;
    expect(everything.isSelected(ideas[3])).to.be.true;
    expect(everything.isSelected(ideas[4])).to.be.false;
    expect(everything.isSelected('foobar')).to.be.false;
  });

  it('Unselecting ideas', function () {
    // eslint-disable-next-line no-invalid-this
    const {ideas, everything} = this;

    everything.select(ideas[0]);
    everything.select(ideas[1]);

    everything.unselect(ideas[0]);
    everything.unselect(ideas[2]); // Should do nothing and not throw
    everything.unselect('foobar'); // Should do nothing and not throw

    expect(everything.isSelected(ideas[0])).to.be.false;
    expect(everything.isSelected(ideas[1])).to.be.true;
    expect(everything.isSelected(ideas[2])).to.be.false;
    expect(everything.isSelected(ideas[3])).to.be.false;
    expect(everything.isSelected(ideas[4])).to.be.false;
    expect(everything.isSelected('foobar')).to.be.false;
  });

  it('Grouping ideas', function () {
    // eslint-disable-next-line no-invalid-this
    const {ideas, everything} = this;

    everything.select(ideas[0]);
    everything.select(ideas[1]);

    expect([...everything.getSelected()]).to.eql([ideas[0], ideas[1]]);

    everything.clearSelected();

    expect([...everything.getSelected()]).to.eql([]);
  });

  it('Updating updates selected', function () {
    // eslint-disable-next-line no-invalid-this
    const {ideas, everything} = this;

    everything.select(ideas[0]);
    everything.select(ideas[1]);

    everything.update(ideas[1], 'foobar');

    expect([...everything.getSelected()]).to.eql([ideas[0], 'foobar']);
  });

  it('Deleting cancels selecting', function () {
    // eslint-disable-next-line no-invalid-this
    const {ideas, everything} = this;

    everything.select(ideas[0]);
    everything.select(ideas[1]);

    everything.delete(ideas[0]);

    expect([...everything]).to.eql([ideas[1], ideas[2], ideas[3], ideas[4]]);
    expect([...everything.getSelected()]).to.eql([ideas[1]]);
  });

  it('Clearing clears selected', function () {
    // eslint-disable-next-line no-invalid-this
    const {ideas, everything} = this;

    everything.select(ideas[0]);
    everything.select(ideas[1]);

    everything.clear();

    expect([...everything]).to.eql([]);
    expect([...everything.getSelected()]).to.eql([]);
  });
});
