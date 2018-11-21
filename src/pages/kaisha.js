import React, { Component } from 'react'
import '../scss/kaisha.scss'
import Rules from './../components/rules';
import Variable from '../variable/variable'
import wx from 'weixin-js-sdk'
import { connect } from 'react-redux'
import { getStatus } from '../action'
import { getBarCode } from '../action'
import { getBrandType } from '../action'

class Kaisha extends Component {
  constructor(props){
    super(props)
    this.state = {
      isToggleOn : false
    } 
    //规则
    this.rulesClickOn = () => {
      this.setState({isToggleOn : true})
    }
    this.rulesClickIn = () => {
      this.setState({isToggleOn : false})
    }
    //微信配置
    this.wxConfig = () => {
      Variable.getTicket()
      .then(function(res){
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
    //调用扫一扫
    this.scanCode = () => {
      console.log('调用扫一扫',this)
      wx.scanQRCode({
        needResult : 1,
        scanType : ['qrCode','barCode'],
        success:  (res) => {
          let result = res.resultStr
          //判断是否艾慕的二维码
          if(result){
            let barCode = Variable.getKaishaString(result)
            this.props.getBrandType(false)
            let code = Variable.getBarCode(result)
            this.props.getBarCode(code)
            if (barCode === 'a'){
              this.props.history.push('/')
            }else{
              this.props.getStatus(false)
              this.props.history.push('/')
            }
          }
        }
      })
    }
  }
 
  componentWillMount() {
    this.wxConfig()
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
    return(
      <div className="kaisha">
        <div className='content' >
          <div className='logo'></div>
          <p className='pClass'>艾慕凯莎正品查询平台</p>
          <p className='scan'>点击扫一扫</p>
          <div className='QRcode'  onTouchEnd={this.scanCode.bind(this)}></div>
          <p className='rules' 
           onClick={this.rulesClickIn.bind(this)}  
           style={styleComponent.on}>
            了解规则
          </p>
          <p className='rules drop'
           onClick={this.rulesClickOn.bind(this)}
           style={styleComponent.in}>
            了解规则>>
          </p>
        </div>
        <Rules  status={this.state.isToggleOn}/>
      </div>
    )
   }
}

const mapStateToProps = store => ({
  statusChange : store.statusChange,
  barCode : store.barCode,
  brandType: store.brandType
})
const mapDispatchToProps = dispatch => ({
  getStatus : (arr) => dispatch(getStatus(arr)),
  getBarCode : (arr) => dispatch(getBarCode(arr)),
  getBrandType: (arr) => dispatch(getBrandType(arr)),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Kaisha)