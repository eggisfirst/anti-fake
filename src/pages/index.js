import React, { Component } from 'react'
import Variable from '../variable/variable'
//css
import '../scss/index.scss'
import bannerImg1 from '../images/bg.jpg'
import bannerImg2 from '../images/bg2.png'

//components
import Quality from '../components/quality'
import Error from '../components/error'
import { connect } from 'react-redux'
import { getBrandType } from '../action'
import { getCodeData } from '../action'
import { getStatus } from '../action'
import { getBarCode } from '../action'


class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      brand: ''
    }
    //判断防伪码
    this.getData = () => {
      //不是公众号进来的
      //检查网址有没有#/并返回没有#/的url
      let url = Variable.testUrl(window.location.href)
      //获取防伪码code,判断是calia还是aimu，更换界面  
      let caliaCode = Variable.GetQueryString('c', url)
      let aimuCode = Variable.GetQueryString('a', url)
      let code = caliaCode || aimuCode
      if (code !== '') {
        console.log('有参数', code)
        this.sendCode(code)
        this.props.getBarCode(code)
        if (caliaCode) {
          this.props.getBrandType(true)
          this.setState({ brand: 'CALIA' })
        } else {
          this.props.getBrandType(false)
          this.setState({ brand: '艾慕凯莎' })
        }
      } else {
        alert('该二维码不是防伪码')
        return false
      }



      // if (code == null) {   //不是公众号调用的扫一扫
      //   var temp = '3F466D67-5981-4D67-86A9-21AC1979171'
      //   this.sendCode(temp)
      //     this.props.getBrandType(true)
      //     this.props.getBarCode(temp)
      //   // if (caliaCode) {
      //   //   this.props.getBrandType(true)
      //   //   this.setState({brand: 'CALIA'})
      //   // } else {
      //   //   this.props.getBrandType(false)
      //   //   this.setState({ brand: '艾慕凯莎'})
      //   // }
      //   // this.props.getBarCode(code)
      //   // this.sendCode(code)
      // } else {    //公众号调用的扫一扫
      //   if (this.props.barCode !== null) {
      //     if(this.props.brandType){   //calia
      //       this.setState({ brand: 'CALIA'})
      //       if (this.props.statusChange == '') {
      //         this.sendCode(this.props.barCode)
      //       }
      //     }else{                     //kaisha
      //       this.setState({ brand: '艾慕凯莎'}) 
      //       if (this.props.statusChange == '') {
      //         this.sendCode(this.props.barCode)
      //       }
      //     }
      //   } else {
      //     alert ('该二维码不是防伪码')
      //   }

      // }
    }
    //获取数据并存在store
    this.sendCode = (code) => {
      Variable.sendCode(code)
        .then((res) => {
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
