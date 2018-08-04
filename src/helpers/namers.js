const namer = method => function fn (name) {
  if (name[0] == '_') {
    return '_' + fn(name.substring(1));
  }

  return name[0][method]() + name.substring(1);
};

export const className = namer('toUpperCase');
export const instanceName = namer('toLowerCase');

export const validatorClassName = name => className(name) + 'Validator';
export const reverseValidatorClassName = name => instanceName(
  name.substring(0, name.length - 'Validator'.length));
