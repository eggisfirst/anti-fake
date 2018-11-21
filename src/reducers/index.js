import { combineReducers } from 'redux'
import todos from './todos'
import clicks from './clicks'
import codeData from './codeData'
import brandType from './brandType'
import submitTips from './submitSuc'
import statusChange from './statusChange'
import barCode from './barCode'

const todoApp = combineReducers({
  todos,
  clicks,
  codeData,
  brandType,
  submitTips,
  statusChange,
  barCode
})

export default todoApp