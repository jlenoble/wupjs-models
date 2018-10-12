import Collections from '../src/collections';
import {defaultSchemas} from '../src/schemas';
import Muter, {muted} from 'muter';
import {expect} from 'chai';

describe(`Collections`, function () {
  const muter = Muter(console, 'warn'); // eslint-disable-line new-cap

  it(`Adding a new collection`, muted(muter, function () {
    const collections = new Collections(defaultSchemas);

    const name = {type: String, length: {min: 3}};
    const age = Number;
    const city = String;
    const person = {name, age, city};
    const person2 = {name, age};

    expect(collections.has('name')).to.be.false;
    expect(collections.has('age')).to.be.false;
    expect(collections.has('city')).to.be.false;
    expect(collections.has('person')).to.be.false;
    expect(collections.has('person2')).to.be.false;

    // May be added one by one
    collections.addSingle('person', person);

    expect(collections.has('name')).to.be.false;
    expect(collections.has('age')).to.be.false;
    expect(collections.has('city')).to.be.false;
    expect(collections.has('person')).to.be.true;
    expect(collections.has('person2')).to.be.false;

    // May be added all in one go
    collections.add({age, city, person2});

    expect(collections.has('name')).to.be.false;
    expect(collections.has('age')).to.be.false;
    expect(collections.has('city')).to.be.false;
    expect(collections.has('person')).to.be.true;
    expect(collections.has('person2')).to.be.true;

    // Can only be added once
    collections.addSingle('person', {city});
    expect(muter.getLogs()).to.match(
      /Resetting Collections is not implemented/);
    muter.forget();

    collections.add({person, person2});
    expect(muter.getLogs()).to.match(
      /Resetting Collections is not implemented/);
    expect(muter.getLogs()).to.match(
      /Resetting Collections is not implemented/);
  }));
});
