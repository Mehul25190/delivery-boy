// Imports: Reducers
import auth from './auth';
import common from './common';
import order from './Order'
import { reducer as formReducer } from 'redux-form';

// Redux: Root Reducer
const rootReducer = {
  auth: auth,
  common: common,
  form: formReducer,
  order:order,
};

// Exports
export default rootReducer;