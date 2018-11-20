import React, { Component } from 'react'
import '../scss/calia.scss'
import Rules from './../components/rules';


class Calia extends Component {
  constructor (props) {
    super(props)
    this.state = {

    } 
  }
  componentWillMount() {
   
   
  }
  componentDidMount () {
   
   
  }
   render () {
    const styleComponent = {
      show : {
        display : 'none'
      }
    }
    return (
      <div className="calia">
        <div className='banner'></div>
        <div className='content' >
          <div className='logo'></div>
          <p className='pClass'>CALIA正品查询平台</p>
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

export default Calia