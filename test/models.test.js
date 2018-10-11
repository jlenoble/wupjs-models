import Models from '../src/models';
import {defaultSchemas} from '../src/schemas';
import Muter, {muted} from 'muter';
import {expect} from 'chai';

describe(`Models`, function () {
  const muter = Muter(console, 'warn'); // eslint-disable-line new-cap

  it(`Adding a new model`, muted(muter, function () {
    const models = new Models(defaultSchemas);

    const name = {type: String, length: {min: 3}};
    const age = Number;
    const city = String;
    const person = {name, age, city};
    const person2 = {name, age};

    expect(models.has('name')).to.be.false;
    expect(models.has('age')).to.be.false;
    expect(models.has('city')).to.be.false;
    expect(models.has('person')).to.be.false;
    expect(models.has('person2')).to.be.false;

    // May be added one by one
    models.addSingle('person', person);

    expect(models.has('name')).to.be.false;
    expect(models.has('age')).to.be.false;
    expect(models.has('city')).to.be.false;
    expect(models.has('person')).to.be.true;
    expect(models.has('person2')).to.be.false;

    // May be added all in one go
    models.add({age, city, person2});

    expect(models.has('name')).to.be.false;
    expect(models.has('age')).to.be.false;
    expect(models.has('city')).to.be.false;
    expect(models.has('person')).to.be.true;
    expect(models.has('person2')).to.be.true;

    // Can only be added once
    models.addSingle('person', {city});
    expect(muter.getLogs()).to.match(
      /To redefine the model for 'person', call models.reset/);
    muter.forget();

    models.add({person, person2});
    expect(muter.getLogs()).to.match(
      /To redefine the model for 'person', call models.reset/);
    expect(muter.getLogs()).to.match(
      /To redefine the model for 'person2', call models.reset/);
  }));

  it(`Redefining a model`, muted(muter, function () {
    const models = new Models(defaultSchemas);

    const title = {type: String, length: {min: 3}};
    const age = Number;
    const city = String;
    const person = {title, age, city};

    expect(models.has('title')).to.be.false;
    expect(models.has('age')).to.be.false;
    expect(models.has('city')).to.be.false;
    expect(models.has('person')).to.be.false;
    expect(muter.getLogs()).to.equal('');

    // May be redefined one by one
    models.resetSingle('person', person);

    expect(models.has('title')).to.be.false;
    expect(models.has('age')).to.be.false;
    expect(models.has('city')).to.be.false;
    expect(models.has('person')).to.be.true;
    expect(muter.getLogs()).to.equal('');

    // May be redefined all in one go
    models.reset({age, city, person});

    expect(models.has('title')).to.be.false;
    expect(models.has('age')).to.be.false;
    expect(models.has('city')).to.be.false;
    expect(models.has('person')).to.be.true;
    expect(muter.getLogs()).to.equal('');

    // Can be redefined more than once
    models.reset({person, age});
    expect(muter.getLogs()).to.equal('');
  }));
});
