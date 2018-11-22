import React, { Component } from 'react'
import Variable from '../variable/variable'
//css
import '../scss/index.scss'
import bannerImg1 from '../images/bg.jpg'
import bannerImg2 from '../images/bg2.png'

//components
import Quality from '../components/quality'
import Error from '../components/error'
import ErrorTips from '../components/errorTips'

import { connect } from 'react-redux'
import { getBrandType } from '../action'
import { getCodeData } from '../action'
import { getStatus } from '../action'
import { getBarCode } from '../action'


class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      brand: '',
      status: ''
    }
    //判断防伪码
    this.getData = () => {
      //检查网址有没有#/并返回没有#/的url
      let url = Variable.testUrl(window.location.href)
      let caliaCode = Variable.GetQueryString('c', url)
      let aimuCode = Variable.GetQueryString('a', url)
      let code = caliaCode || aimuCode
      let a = Variable.getKaishaString(url)
      let c = Variable.getCaliaString(url)
      //如果有a或者c参数
      if (a || c) {
        console.log(111, code)
        this.props.getBarCode(code)
        //空值直接返回错误页面
        if (code.length >= 20 && code.length <= 50) {
          this.sendCode(code)
        } else {
          this.props.getStatus(false)
        }
        //更换calia或者艾慕凯莎的界面
        if (c) {
          this.props.getBrandType(true)
          this.setState({ brand: 'CALIA' })
        } else {
          this.props.getBrandType(false)
          this.setState({ brand: '艾慕凯莎' })
        }
      } else {
        this.setState({ status: true })
      }
    }
    //获取数据并存在store
    this.sendCode = (code) => {
      Variable.sendCode(code)
        .then((res) => {
          console.log('发送请求')
          if (res.data.status == 1) {
            this.props.getStatus(true)
            this.props.getCodeData(res.data)
          } else if (res.data.status == 0) {
            this.props.getStatus(false)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
  componentWillMount() {
    this.getData()
  }
  render() {
    let styleIndex1 = {
      width: '100%',
      height: '100%',
      backgroundImage: `url(${bannerImg1})`
    }
    let styleIndex2 = {
      width: '100%',
      height: '100%',
      backgroundImage: `url(${bannerImg2})`
    }
    let contentStyle1 = {
      paddingTop: '4.4vw'
    }
    let contentStyle2 = {
      paddingTop: '12.8vw'
    }
    let bannerClass, indexClass, contentClass, logoClass, pClass;
    if (this.props.brandType) {
      bannerClass = 'banner';
      indexClass = styleIndex1
      contentClass = contentStyle1
      logoClass = 'logo'
      pClass = 'p1'
    } else {
      bannerClass = ''
      indexClass = styleIndex2
      contentClass = contentStyle2
      logoClass = 'logo2'
      pClass = 'p2'
    }
    return (
      <div className="index" style={indexClass} >
        <div className={bannerClass}></div>
        <div className='content' style={contentClass}>
          <div className={logoClass}></div>
          <p className={pClass}>{this.state.brand}正品查询平台</p>
          <Quality status={this.props.statusChange} />
          <Error status={this.props.statusChange} />
          <ErrorTips status={this.state.status} />
        </div>
      </div>
    )
  }
}


const mapStateToProps = store => ({
  brandType: store.brandType,
  codeData: store.codeData,
  statusChange: store.statusChange,
  barCode: store.barCode
})
const mapDispatchToProps = dispatch => ({
  getBrandType: (arr) => dispatch(getBrandType(arr)),
  getCodeData: (arr) => dispatch(getCodeData(arr)),
  getStatus: (arr) => dispatch(getStatus(arr)),
  getBarCode: (arr) => dispatch(getBarCode(arr))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)
