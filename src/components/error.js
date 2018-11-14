import React, { Component } from 'react';
import '../scss/components/error.scss'

class Error extends Component {
  constructor (props) {
    super (props)
    this.state = {

    }
  }
  render () {
    return (
      <div className='error'>
        <div className='tips-picture'></div>
        <h1>您好，<span>暂时无法查询到</span>此商品</h1>
        <h1>请联系400客服进行查询或<span className='takeback'>立即反馈</span></h1>
      </div>
    )
  }
}

export default Error 