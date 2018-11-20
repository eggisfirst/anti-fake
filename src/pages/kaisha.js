import React, { Component } from 'react'
import '../scss/kaisha.scss'
import Rules from './../components/rules';

class Kaisha extends Component {
  constructor(props){
    super(props)
    this.state = {

    } 
  }
   render () {
    const styleComponent = {
      show : {
        display : 'none'
      }
    }
    return(
      <div className="kaisha">
        <div className='content' >
          <div className='logo'></div>
          <p className='pClass'>艾慕凯莎正品查询平台</p>
          <p className='scan'>点击扫一扫</p>
          <div className='QRcode'></div>
          <p className='rules' style={styleComponent.show}>了解规则</p>
          <p className='rules drop'>了解规则>></p>
        </div>
        <Rules/>
      </div>
    )
   }
}

export default Kaisha