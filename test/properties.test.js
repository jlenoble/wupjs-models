import Properties from '../src/properties';
import {defaultSchemas} from '../src/schemas';
import Muter, {muted} from 'muter';
import {expect} from 'chai';

describe(`Properties`, function () {
  const muter = Muter(console, 'warn'); // eslint-disable-line new-cap

  it(`Adding a new property`, muted(muter, function () {
    const properties = new Properties(defaultSchemas);

    const name = {type: String, length: {min: 3}};
    const age = Number;
    const city = String;
    const person = {name, age, city};

    expect(properties.has('name')).to.be.false;
    expect(properties.has('age')).to.be.false;
    expect(properties.has('city')).to.be.false;
    expect(properties.has('person')).to.be.false;

    // May be added one by one
    properties.addSingle('name', name);

    expect(properties.has('name')).to.be.true;
    expect(properties.has('age')).to.be.false;
    expect(properties.has('city')).to.be.false;
    expect(properties.has('person')).to.be.false;

    // May be added all in one go
    properties.add({age, city, person});

    expect(properties.has('name')).to.be.true;
    expect(properties.has('age')).to.be.true;
    expect(properties.has('city')).to.be.true;
    expect(properties.has('person')).to.be.false; // Model, not Property

    // Can only be added once
    properties.addSingle('name', {type: String, length: {min: 10}});
    expect(muter.getLogs()).to.match(
      /To redefine the property for 'name', call properties.reset/);
    muter.forget();

    properties.add({name, age});
    expect(muter.getLogs()).to.match(
      /To redefine the property for 'name', call properties.reset/);
    expect(muter.getLogs()).to.match(
      /To redefine the property for 'age', call properties.reset/);
  }));

  it(`Redefining a property`, muted(muter, function () {
    const properties = new Properties(defaultSchemas);

    const title = {type: String, length: {min: 3}};
    const age = Number;
    const city = String;
    const person = {title, age, city};

    expect(properties.has('title')).to.be.true;
    expect(properties.has('age')).to.be.false;
    expect(properties.has('city')).to.be.false;
    expect(properties.has('person')).to.be.false;
    expect(muter.getLogs()).to.equal('');

    // May be redefined one by one
    properties.resetSingle('title', title);

    expect(properties.has('title')).to.be.true;
    expect(properties.has('age')).to.be.false;
    expect(properties.has('city')).to.be.false;
    expect(properties.has('person')).to.be.false;
    expect(muter.getLogs()).to.equal('');

    // May be redefined all in one go
    properties.reset({age, city, person});

    expect(properties.has('title')).to.be.true;
    expect(properties.has('age')).to.be.true;
    expect(properties.has('city')).to.be.true;
    expect(properties.has('person')).to.be.false; // Model, not Property
    expect(muter.getLogs()).to.equal('');

    // Can be redefined more than once
    properties.reset({person, age});
    expect(muter.getLogs()).to.equal('');
  }));
});
