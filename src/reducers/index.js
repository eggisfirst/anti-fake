import { combineReducers } from 'redux'
import todos from './todos'
import clicks from './clicks'
import codeData from './codeData'

// import visibilityFilter from './visibilityFilter'

const todoApp = combineReducers({
  todos,
  clicks,
  codeData
})

export default todoApp