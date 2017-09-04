import { combineReducers } from 'redux'
import form from './form'
import list from './list'

const webregatorReactApp = combineReducers({
  form,
  list
})

export default webregatorReactApp
