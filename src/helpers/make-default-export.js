export const makeDefaultExport = (map, factory, getKey, getValue, byName) => {
  const defaultExport = Object.entries(map).map(factory)
    .reduce((map, obj) => {
      const key = getKey(obj);
      const value = getValue(obj);
      map[key] = value; // eslint-disable-line no-param-reassign
      // eslint-disable-next-line no-param-reassign
      map.byName[byName(key)] = value;
      return map;
    }, {byName: {}});

  Object.defineProperty(defaultExport, 'byName', {enumerable: false});

  Object.freeze(defaultExport.byName);
  Object.freeze(defaultExport);

  return defaultExport;
};
