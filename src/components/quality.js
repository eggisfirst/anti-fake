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
  componentWillMount () {
    console.log('组件即将挂载',this.props.codeData)
  }

  render () {
    const styleComponent = {
      show : {
        display : this.props.status ? 'block' : 'none'
      }
    }
    const codeData = this.props.codeData.map(() =>
    <li>
      <span>
      </span>
      <span></span>
  </li>
    )
    return (
      <div className='quality' style={styleComponent.show}>
        <div className='tips-picture'></div>
        <h1>您好，您所查询的商品是
          <span>{this.times(this.props.codeData.count)}</span>验证
        </h1>
        <h1>您所购买的商品是慕思品牌的<span>正品</span>，请放心使用!</h1>
        <div className='details'>
          <div className='title'>
            <div className='title-picture'></div>
            <span>详细信息</span>
          </div>
          <ul>
            <li>
              <span>产品代号</span>
              <span></span>
            </li>
            <li>
              <span>产品名称</span>
              <span></span>
            </li>
            <li>
              <span>产品规格</span>
              <span></span>
            </li>
            <li>
              <span>出货单号</span>
              <span></span>
            </li>
            <li>
              <span>生产指令号</span>
              <span></span>
            </li>
            <li>
              <span>生产部门</span>
              <span></span>
            </li>
            <li>
              <span>出货扫描人</span>
              <span></span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
  
}

const mapStateToProps = store => ({
  codeData: store.codeData
})
const mapDispatchToProps = dispatch => ({
  getCodeData: (arr) => dispatch(getCodeData(arr))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quality)