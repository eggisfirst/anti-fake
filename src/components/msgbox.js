import React, { Component } from 'react'; 
import Variable from '../variable/variable'
import Tips from './tips';
import '../scss/components/msgbox.scss'
import axios from 'axios'
import { connect } from 'react-redux';
import { clickBtn } from '../action'
import { tips } from '../action'
import { runInThisContext } from 'vm';

class Msgbox extends Component {
  constructor (props) {
    super (props)
    this.state = {
      phoneTips: '',
      inpNumVal: '',
      inpNameVal: '',
      clearBtn1: false,
      clearBtn2: false ,
      key : true
    }
    //获取手机号码
    this.handelNumChange = (e) => {
      this.setState({
        inpNumVal: e.target.value,
        phoneTips: false
      })
    }
    //获取姓名
    this.handelNameChange = (e) => {
      this.setState({
        inpNameVal : e.target.value
      })
    }
    //清空input框
    this.clearBtn1 = () => {
      this.setState({
        inpNameVal: ''
      })   
    }
    this.clearBtn2 = () => {
      this.setState({
        inpNumVal: '',
        phoneTips: false
      })   
    }
    //光标聚焦

    //关闭反馈弹框
    this.closeBtn = () => {
      this.props.clickBtn(false)
    }
    //提交
    this.submitMsg = () => {
      let phoneNum = this.state.inpNumVal
      let name = this.state.inpNameVal
      let isName = Variable.testName(name) 
      let isPhoneNum = Variable.testPhone(phoneNum)
      //判断名字格式
      if (!isName) {
        alert('请填写真实姓名')
      }else {
        //判断手机号码格式
        if (isPhoneNum) {
          if (this.state.key) {
            axios.post(`${Variable.path}feedback/saveFeedback`,{
              params:{
               name : name,
               phone : phoneNum
              }
            })
            .then((res) => {
              console.log('提交成功',res)
              this.props.tips(true)
              this.setState({ key : false})
            })
            .catch((error) => {
              console.log(error)
            })
          }else {
            alert ('您的反馈已提交')
          }
          }
         else{
          this.setState({
            phoneTips: true
          })
        }
      }
    }
  }

  render (){
    const styleComponent = {
      show : {
        display : this.props.clicks? 'block' : 'none'
      },
      phoneTips : {
        display : this.state.phoneTips ? 'block' : 'none'
      },
      clearBtn1 : {
        display : this.state.clearBtn1 ? 'block' : 'none'
      },
      clearBtn2 : {
        display : this.state.clearBtn2 ? 'block' : 'none'
      }
    }
    return (
      <div className='msgbox' style={(styleComponent.show)}  >
        <div className='bg'></div>
        <div className='box'>
          <h2>为协助客服快速处理，请提供以下信息</h2>
          <div className='close-icon' onClick={this.closeBtn}></div>
          <div className='detail'>
            <div className='name'>
              <div className='name-icon'></div>
              <input type='text' placeholder='请填写姓名' 
                onChange={this.handelNameChange.bind(this)}
              
                value={this.state.inpNameVal}/>
              <div className='clear icon1' 
                onClick={this.clearBtn1}
                style={styleComponent.clearBtn1}>
              </div>
            </div>
            <div className='phone'>
              <div className='phone-icon'></div>
              <input type='number' placeholder='请输入手机号码' 
                onChange={this.handelNumChange.bind(this)} 
                value={this.state.inpNumVal}/>
              <div className='clear icon2' 
                onClick={this.clearBtn2}
                style={styleComponent.clearBtn2}>
              </div>
            </div>
            <div className='tips' style={styleComponent.phoneTips}>
              您输入的号码有误，请重新输入
            </div>
          </div>
          <input type='submit' value='提交' className='submit' onClick={this.submitMsg}/>
        </div>
        <Tips/>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  clicks: store.clicks,
  todos: store.todos
})
const mapDispatchToProps = dispatch => ({
  clickBtn: (arr) => dispatch(clickBtn(arr)),
  tips: (arr) => dispatch(tips(arr))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Msgbox)