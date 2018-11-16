import React, { Component } from 'react'

//js
import Variable from '../variable/variable'

//css
import '../scss/index.scss'

//components
import Quality from '../components/quality'
import Error from '../components/error'
import { connect } from 'react-redux';
import { getCodeData } from '../action'


class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status:true
    }
  //判断防伪码
  this.getData = () => {
    //获取防伪码code  
    let code = Variable.getQueryString('c')
    if (code == null) {
      code = Variable.getQueryString('a')
    }
    Variable.sendCode(code)
    .then(function (res) {
      console.log('success',res)
      if (res.status == '1'){
        this.setState({status:true})
        this.props.getCodeData(res)  
      }else if (res.state == '0'){
        this.setState({status:false})
      }
    })
    .catch(function (error) {
      console.log('error',error)
    })

  } 
  }
  componentWillMount () {
    this.getData()
    // console.log('组件即将挂载')
  }
  componentDidMount () {
    // console.log('组件渲染完成')
  }
  render() {
 
    return (
      <div className="index">
        <div className='banner'></div>
        <div className='content'>
          <div className='logo'></div>
          <p>CALIA正品查询平台</p>
          {/* <Quality status={this.state.status} />
          <Error status={this.state.status}/> */}
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
)(Index)
