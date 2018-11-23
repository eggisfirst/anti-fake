import React, { Component } from 'react';
import '../scss/components/quality.scss'
import { connect } from 'react-redux';
import { getCodeData } from '../action'

class Quality extends Component {
  constructor (props) {
    super(props)
    this.state = {
  
    }
    //验证次数
    this.times = (count) => {
      if (count == 1) {
        return "首次"
      }else {
        return "第" + count + '次'
      }
    }  
  }
  render () {
    const styleComponent = {
      show : {
        display : this.props.status ? 'block' : 'none'
      }
    }   
    //转化数据格式 
    let arr = []
    Object.keys(this.props.codeData).forEach(item =>
      arr.push({ key : item }),
    )
    const data = arr.map((item, i) => 
      <li key={i}>
        <span className='span1'>{
          (() => {
            let type
            switch(item.key){
              case 'brand':
                type = '品牌'
                break;
              case 'moNo':
                type = '制令号'
                break;
              case 'goodsCode':
                type = '产品代号'
                break;
              case 'goodsName':
                type = '产品名称'
                break;
              case 'pdName':
                type = '生产部门'
                break;
              case 'scanName':
                type = '出货扫描人'
                break;
              case 'goodsSpec':
                type = '产品规格'
                break;
            default:
              return ''
            }
            return type
          })()
        }</span>
        <span className='span2'>{
          (() => {
            let type
            switch(item.key){
              case 'brand':
                type = this.props.codeData.brand
                break;
              case 'moNo':
                type = this.props.codeData.moNo
                break;
              case 'goodsCode':
                type = this.props.codeData.goodsCode
                break;
              case 'goodsName':
                type = this.props.codeData.goodsName
                break;
              case 'pdName':
                type = this.props.codeData.pdName
                break;
              case 'scanName':
                type = this.props.codeData.scanName
                break;
              case 'goodsSpec':
                type = this.props.codeData.goodsSpec
                break;
            default:
              return ''
            }
            return type
          })()
        }</span>
      </li>
    )
    let tipsClass,hClass
    if (this.props.brandType){
      tipsClass = 'tips-picture'
      hClass = 'h1'
    }else {
      tipsClass = 'tips-picture2'
      hClass = 'h2'
    }
    return (
      <div className='quality' style={styleComponent.show}>
        <div className={tipsClass}></div>
        <h1 className={hClass}>
          您好，您所查询的商品是
          <span>{this.times(this.props.codeData.count)}</span>验证
        </h1>
        <h1 className={hClass}>
          您所购买的商品是慕思品牌的<span>正品</span>，请放心使用!
        </h1>
        <div className='details'>
          <div className='title'>
            <div className='title-picture'></div>
            <span>详细信息</span>
          </div>
          <ul>
           {data}
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  codeData: store.codeData,
  brandType: store.brandType
})
const mapDispatchToProps = dispatch => ({
  getCodeData: (arr) => dispatch(getCodeData(arr))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quality)