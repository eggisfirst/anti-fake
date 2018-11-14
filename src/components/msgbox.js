import React, { Component } from 'react'; 
import '../scss/components/msgbox.scss'

class Msgbox extends Component {
  constructor (props) {
    super (props)
    this.state = {

    }
  }
  render (){
    return (
      <div className='msgbox'>
        <div className='bg'></div>
        <div className='box'>
          <h2>为协助客服快速处理，请提供以下信息</h2>
          <div className='close-icon'></div>
          <div className='detail'>
            <div>
              <div className='name-icon'></div>
              <input type='text' placeholder='请填写姓名' className='name'/>
              <div className='clear icon1'></div>
            </div>
            <div>
              <div className='phone-icon'></div>
              <input type='number' placeholder='请输入手机号码' className='pwd'/>
              <div className='clear icon2'></div>
            </div>
            <div className='tips'>您输入的号码有误，请重新输入</div>
          </div>
          <input type='submit' value='提交' className='submit'/>
        </div>
      </div>
    )
  }
}
export default Msgbox