import React, { Component } from 'react'
import '../scss/calia.scss'
import Rules from './../components/rules';
import Variable from '../variable/variable'
import wx from 'weixin-js-sdk'

class Calia extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isToggleOn : false
      
    } 
    this.rulesClickOn = () => {
      this.setState({isToggleOn : true})
    }
    this.rulesClickIn = () => {
      this.setState({isToggleOn : false})
    }
    this.temp = () => {
     Variable.getTicket()
     .then(function(res){
       console.log(1111,res.nonceStr,res.signature,res.timestamp)
       wx.config({
         debug : false,
         appId :'wx877a7e37b0de0a87',
         timestamp : res.timestamp,
         nonceStr : res.nonceStr,
         signature : res.signature,
         jsApiList :['scanQRCode',]
       })
     })
     .catch(function(error){
       console.log('error',error)
     }) 
    }
    this.scanCode = () => {
      console.log('调用扫一扫')
      wx.scanQRCode({
        needResult : 0,
        scanType : ['qrCode','barCode'],
        success:function(res){
          var result = res.resultStr
         
        }
      })
    }
  }
  
  componentWillMount() {
    this.temp()
  }
  componentDidMount() {
  
  }
   render () {
    const styleComponent = {
      on : {
        display : this.state.isToggleOn ? 'block' : 'none'
      },
      in : {
        display : this.state.isToggleOn ? 'none' : 'block'
      }
    }
    return (
      <div className="calia">
        <div className='banner'></div>
        <div className='content' >
          <div className='logo'></div>
          <p className='pClass'>CALIA正品查询平台</p>
          <p className='scan'>点击扫一扫</p>
          <div className='QRcode' onTouchEnd={this.scanCode.bind(this)}></div>
          <p className='rules' 
          style={styleComponent.on}
          onClick={this.rulesClickIn.bind(this)}>
            了解规则
          </p>
          <p className='rules drop' 
          onClick={this.rulesClickOn.bind(this)}
          style={styleComponent.in}>
            了解规则>>
          </p>
        </div>
        <Rules status={this.state.isToggleOn}/>
      </div>
    )
   }
}

export default Calia