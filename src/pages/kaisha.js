import React, { Component } from 'react'
import '../scss/kaisha.scss'
import Rules from './../components/rules';

class Kaisha extends Component {
  constructor(props){
    super(props)
    this.state = {
      isToggleOn : false
    } 
    this.rulesClickOn = () => {
      this.setState({isToggleOn : true})
    }
    this.rulesClickIn = () => {
      this.setState({isToggleOn : false})
    }
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
          <div className='QRcode'></div>
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

export default Kaisha