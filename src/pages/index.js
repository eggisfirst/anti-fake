import React, { Component } from 'react'
import Variable from '../variable/variable'
//css
import '../scss/index.scss'
import bannerImg1 from '../images/bg.jpg'
import bannerImg2 from '../images/bg2.png'

//components
import Quality from '../components/quality'
import Error from '../components/error'
import { connect } from 'react-redux';
import { getBrandType } from '../action'
import { getCodeData } from '../action'

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      brand: '',
      brandJudge: '',
      status:''
    }
    //判断防伪码
    this.getData = () => {
      //获取防伪码code,判断是calia还是aimu，更换界面  
      let caliaCode = Variable.getQueryString('c')
      let aimuCode = Variable.getQueryString('a')
      let code = caliaCode || aimuCode
      if (code) {
        this.sendCode(code)
        if (caliaCode) {
          this.props.getBrandType(true)
          this.setState({
            brand: 'CALIA',
            brandJudge: true
        })
        }else {
          this.props.getBrandType(false)
          this.setState({
            brand: '艾慕凯莎',
            brandJudge: false
          })
        } 
      }
    }
    //获取数据并存在store
    this.sendCode = (code) => {
      Variable.sendCode(code)
      .then((res) => {
        if( res.data.status == 1) {
          this.setState({status: true})
          this.props.getCodeData(res.data)
        }else if (res.data.status == 0) {
          this.setState({status: false})
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
      width:'100%',
      height:'100%',
      backgroundImage: `url(${bannerImg1})`
    }
    let styleIndex2 = {
      width:'100%',
      height:'100%',
      backgroundImage: `url(${bannerImg2})` 
    }
    let contentStyle1 = {
      paddingTop : '4.4vw'
    }
    let contentStyle2 = {
      paddingTop : '12.8vw'
    }
    let bannerClass,indexClass,contentClass,logoClass,pClass;
      if (this.state.brandJudge) {
        bannerClass = 'banner';
        indexClass = styleIndex1
        contentClass = contentStyle1
        logoClass = 'logo'
        pClass = 'p1'
      }else{
        bannerClass = ''
        indexClass = styleIndex2
        contentClass = contentStyle2
        logoClass = 'logo2'
        pClass = 'p2'
      }
    return (
      <div className="index" style= {indexClass} >
        <div className={bannerClass}></div>
        <div className='content' style={contentClass}>
          <div className={logoClass}></div>
          <p className={pClass}>{this.state.brand}正品查询平台</p>
          <Quality status={this.state.status}/>
          <Error status={this.state.status}/>
        </div>
      </div>
    )
  }
}


const mapStateToProps = store => ({
  brandType: store.brandType,
  codeData: store.codeData
})
const mapDispatchToProps = dispatch => ({
  getBrandType: (arr) => dispatch(getBrandType(arr)),
  getCodeData : (arr) => dispatch(getCodeData(arr))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)
