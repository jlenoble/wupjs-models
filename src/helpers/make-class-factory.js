export const makeClassFactory = (className, classImpl) => {
  return ([name, obj]) => {
    const Class = classImpl(name, obj);

    Object.defineProperty(Class, 'name', {
      value: className(name),
    });

    return Class;
  };
};
