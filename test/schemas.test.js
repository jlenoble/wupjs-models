import Schemas, {defaultSchemas} from '../src/schemas';
import Muter, {muted} from 'muter';
import {expect} from 'chai';

describe(`Schemas`, function () {
  const muter = Muter(console, 'warn'); // eslint-disable-line new-cap

  it(`Adding a new schema`, muted(muter, function () {
    const schemas = new Schemas(defaultSchemas);

    const name = {type: String, length: {min: 3}};
    const age = Number;
    const city = String;
    const person = {name, age, city};

    expect(schemas.has('name')).to.be.false;
    expect(schemas.has('age')).to.be.false;
    expect(schemas.has('city')).to.be.false;
    expect(schemas.has('person')).to.be.false;

    // May be added one by one
    schemas.addSingle('name', name);

    expect(schemas.has('name')).to.be.true;
    expect(schemas.has('age')).to.be.false;
    expect(schemas.has('city')).to.be.false;
    expect(schemas.has('person')).to.be.false;

    // May be added all in one go
    schemas.add({age, city, person});

    expect(schemas.has('name')).to.be.true;
    expect(schemas.has('age')).to.be.true;
    expect(schemas.has('city')).to.be.true;
    expect(schemas.has('person')).to.be.true;

    // Can only be added once
    schemas.addSingle('name', {type: String, length: {min: 10}});
    expect(muter.getLogs()).to.match(
      /To redefine the schema for 'name', call schemas.reset/);
    muter.forget();

    schemas.add({name, age});
    expect(muter.getLogs()).to.match(
      /To redefine the schema for 'name', call schemas.reset/);
    expect(muter.getLogs()).to.match(
      /To redefine the schema for 'age', call schemas.reset/);
  }));
});
