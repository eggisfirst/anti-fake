import React, { Component } from 'react';
import '../scss/components/errorTips.scss'

class  ErrorTips extends Component {
  constructor (props) {
    super (props) 
    this.state = {
      
    }
  }

  render () {
    const styleComponent = {
      show : {
        display : this.props.status? 'block' : 'none'
      }
    }
    return (
      <div className='ErrorTips' style={styleComponent.show}>
        <div className='mybg'></div>
        <div className='tips-box'>
          <div className='check-icon'></div>
          <h3>该二维码</h3>
          <h3>不是防伪码</h3>
        </div>
      </div>
    )
  }
}


export default ErrorTips