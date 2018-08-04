import {_id} from './_id';
import {title} from './title';

const schemas = {_id, title};

Object.values(schemas).forEach(schema => Object.freeze(schema));

export default schemas;
