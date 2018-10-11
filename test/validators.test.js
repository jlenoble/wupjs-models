import Validators from '../src/validators';
import {defaultSchemas} from '../src/schemas';
import Muter, {muted} from 'muter';
import {expect} from 'chai';

describe(`Validators`, function () {
  const muter = Muter(console, 'warn'); // eslint-disable-line new-cap

  it(`Adding a new validator`, muted(muter, function () {
    const validators = new Validators(defaultSchemas);

    const name = {type: String, length: {min: 3}};
    const age = Number;
    const city = String;
    const person = {name, age, city};

    expect(validators.has('name')).to.be.false;
    expect(validators.has('age')).to.be.false;
    expect(validators.has('city')).to.be.false;
    expect(validators.has('person')).to.be.false;

    // May be added one by one
    validators.addSingle('name', name);

    expect(validators.has('name')).to.be.true;
    expect(validators.has('age')).to.be.false;
    expect(validators.has('city')).to.be.false;
    expect(validators.has('person')).to.be.false;

    // May be added all in one go
    validators.add({age, city, person});

    expect(validators.has('name')).to.be.true;
    expect(validators.has('age')).to.be.true;
    expect(validators.has('city')).to.be.true;
    expect(validators.has('person')).to.be.true;

    // Can only be added once
    validators.addSingle('name', {type: String, length: {min: 10}});
    expect(muter.getLogs()).to.match(
      /To redefine the validator for 'name', call validators.reset/);
    muter.forget();

    validators.add({name, age});
    expect(muter.getLogs()).to.match(
      /To redefine the validator for 'name', call validators.reset/);
    expect(muter.getLogs()).to.match(
      /To redefine the validator for 'age', call validators.reset/);
  }));

  it(`Redefining a validator`, muted(muter, function () {
    const validators = new Validators(defaultSchemas);

    const title = {type: String, length: {min: 3}};
    const age = Number;
    const city = String;
    const person = {title, age, city};

    expect(validators.has('title')).to.be.true;
    expect(validators.has('age')).to.be.false;
    expect(validators.has('city')).to.be.false;
    expect(validators.has('person')).to.be.false;
    expect(muter.getLogs()).to.equal('');

    // May be redefined one by one
    validators.resetSingle('title', title);

    expect(validators.has('title')).to.be.true;
    expect(validators.has('age')).to.be.false;
    expect(validators.has('city')).to.be.false;
    expect(validators.has('person')).to.be.false;
    expect(muter.getLogs()).to.equal('');

    // May be redefined all in one go
    validators.reset({age, city, person});

    expect(validators.has('title')).to.be.true;
    expect(validators.has('age')).to.be.true;
    expect(validators.has('city')).to.be.true;
    expect(validators.has('person')).to.be.true;
    expect(muter.getLogs()).to.equal('');

    // Can be redefined more than once
    validators.reset({person, age});
    expect(muter.getLogs()).to.equal('');
  }));
});
