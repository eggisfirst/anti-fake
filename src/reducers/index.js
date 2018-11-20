import { combineReducers } from 'redux'
import todos from './todos'
import clicks from './clicks'
import codeData from './codeData'
import brandType from './brandType'
import submitTips from './submitSuc'

const todoApp = combineReducers({
  todos,
  clicks,
  codeData,
  brandType,
  submitTips
})

export default todoApp