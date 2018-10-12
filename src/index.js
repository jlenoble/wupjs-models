import {Collections} from './collections';

let collections;

export function getModel (name) {
  return collections && collections.models.byName[name] || null;
}

export function getCollection (name) {
  return collections && collections.byName[name] || null;
}

export function getModels (names) {
  return names.map(getModel);
}

export function getCollections (names) {
  return names.map(getCollection);
}

export default function create (schemas) {
  if (!collections) {
    collections = new Collections(schemas);
  } else {
    collections.add(schemas);
  }
}

export function reset (schemas) {
  if (!collections) {
    collections = new Collections(schemas);
  } else {
    collections.reset(schemas);
  }
}

export function createModels (schemas) {
  create(schemas);
  return getModels(Object.keys(schemas));
}

export function createCollections (schemas) {
  create(schemas);
  return getCollections(Object.keys(schemas));
}

export function resetModels (schemas) {
  reset(schemas);
  return getModels(Object.keys(schemas));
}

export function resetCollections (schemas) {
  reset(schemas);
  return getCollections(Object.keys(schemas));
}
