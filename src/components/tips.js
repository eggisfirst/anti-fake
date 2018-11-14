import React, { Component } from 'react';
import '../scss/components/tips.scss'

class Tips extends Component {
  constructor (props) {
    super (props) 
    this.state = {

    }
  }
  render () {
    return (
      <div className='tips'>
        <div className='bg'></div>
        <div className='tips-box'>
          <div className='check-icon'></div>
          <h3>提交成功</h3>
          <h3>请耐心等候客服回访</h3>
        </div>
      </div>
    )
  }
}

export default Tips