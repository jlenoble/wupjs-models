const makeName = method => function fn (name) {
  if (name[0] == '_') {
    return '_' + fn(name.substring(1));
  }

  return name[0][method]() + name.substring(1);
};

export const className = makeName('toUpperCase');
export const instanceName = makeName('toLowerCase');

export const collectionClassName = name => className(name) + 'Collection';
export const reverseCollectionClassName = name => instanceName(
  name.substring(0, name.length - 'Collection'.length));

export const validatorClassName = name => className(name) + 'Validator';
