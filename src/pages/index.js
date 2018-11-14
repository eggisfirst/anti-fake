import React,{Component} from 'react'
import Egg from '../variable/nameSpace'
import { createStore } from 'redux'
import todos from '../reducers/todos'
// let store = createStore(todos)

class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
      height: window.innerHeight
      
    
    }
   
  }
  componentDidMount () {
    // console.log(Egg.name)
    // Egg.test()
   console.log(123 );  
     
    }
  render () {
 
    
    return (
      <div className="index">
       123
      </div>
    )
  }
}

export default Index
