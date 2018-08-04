export const makeDefaultExport = (map, factory, getKey, getValue) => {
  const defaultExport = Object.entries(map).map(factory)
    .reduce((map, obj) => {
      map[getKey(obj)] = getValue(obj); // eslint-disable-line no-param-reassign
      return map;
    }, {});

  Object.freeze(defaultExport);

  return defaultExport;
};
