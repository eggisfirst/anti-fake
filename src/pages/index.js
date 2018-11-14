import React, { Component } from 'react'
import '../scss/index.scss'
import Quality from '../components/quality'
import Error from '../components/error'
import Msgbox from './../components/msgbox';
import Tips from './../components/tips';

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {



    }

  }
  componentDidMount() {

  }
  render() {


    return (
      <div className="index">
        <div className='banner'></div>
        <div className='content'>
          <div className='logo'></div>
          <p>CALIA正品查询平台</p>
          <Quality/>
          {/* <Error/> */}
          {/* <Msgbox/> */}
          {/* <Tips /> */}
        </div>

      </div>
    )
  }
}

export default Index
