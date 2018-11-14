import React, { Component } from 'react';
import '../scss/components/quality.scss'

class Quality extends Component {
  constructor (props) {
    super(props)
    this.state = {
      
    }
  }


  render () {
    
    return (
      <div className='quality'>
        <div className='tips-picture'></div>
        <h1>您好，您所查询的商品是<span>首次</span>验证</h1>
        <h1>您所购买的商品是慕思品牌的<span>正品</span>，请放心使用!</h1>
        <div className='details'>
          <div className='title'>
            <div className='title-picture'></div>
            <span>详细信息</span>
          </div>
          <ul>
            <li>
              <span>产品代号</span>
              <span>DH-2乳胶枕</span>
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

export default Quality