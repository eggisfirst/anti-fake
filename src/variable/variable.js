import axios from 'axios'

let init = (function () {
  const path = 'http://10.11.8.185/api/'
  let key = true
  let temp = {
    path : path,
    //获取url参数
    getQueryString : (name) => {
      let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      }
      return null;
    },
     // 校验人名
     testName : (name) => {
      const nameReg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
      return nameReg.test(name)
    },
    //验证手机格式
    testPhone : (phone) => {
      const phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/
      return phoneReg.test(phone)
    },
    //获取防伪码数据
    sendCode : (code) => {
      return new Promise (function(resolve,reject){
        if(key){
          key = false
          axios.get(`${path}antifake/antiFakeVerify`,{
            params: {
              code:code 
            }
          })
          .then( (res) => {
            if (res) {
              key = true
              // console.log ('获取数据',res)
              resolve(res)
            }
          })
          .catch( (error) => {
            key = true
            console.log ('发生错误',error)
          })
          
        }
      })
    }
   
  }
  return temp
}())
export default init

