import axios from 'axios'
import sha1 from 'js-sha1'

let init = (function () {
  const path = 'http://10.11.8.185/api/'
  let key = true
  let temp = {
    path : path,
    appId :'wx877a7e37b0de0a87',
    secretKey : '477a1d7cc03d21d5abce55ec12170d33',
    key : '994061370314006529',
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
          .then((res) => {
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
    },
    //获取token码
    getToken : () => {
      return new Promise(function(resolve, reject) {
        axios({
          method: 'post',
          url: 'https://derucci.net/app/token.api',
          params: {
            key: temp.key,
            secretKey: temp.secretKey
          }
        })
        .then((response) => {
          if (response) {
            resolve(response.data.token)
          }
        }).catch((error) => {
          if (error) {
            alert('token获取失败！')
          }
        })
      })
    },
    // 获取时间戳
    getTimestamp : () => {
      let date = new Date()
      let timestamp = date.getTime()
      return timestamp
    },
    // 参数加密
    getSign : (arr) => {
      let str = ''
      for (let i = 0; i < arr.length; i++) {
        str = str === '' ? `${arr[i][0]}=${arr[i][1]}` : `${str}&${arr[i][0]}=${arr[i][1]}`
      }
      return sha1.hex(str)
    },
   //获取openid
   getOpenId : (token) => {
    let timestamp = temp.getTimestamp()
    let code = '3DFAC448-75BD-48E5-A272-236389400FB5'
    return new Promise(function(resolve, reject) {
      temp.getToken().then(function(token){
        console.log('获取token',token)
        let arr = [
          ['code' , code],
          ['secretKey',temp.secretKey],
          ['timestamp',timestamp]
        ]
        let sign = temp.getSign(arr)
        axios({
          method: 'get',
          url: 'http://10.11.8.7:8081/api/public/v1/getWxAccessToken',
          headers: {
            'Authorization': token
          },
          params: {
            code : code,
            appId : temp.appId,
            timestamp : timestamp,
            // sign : sign
          }
        })
        .then((response) => {
          if (response) {
            console.log('success')
            // resolve(response.data)
          }
        }).catch((error) => {
          if (error) {
            alert('openid获取失败！')
          }
        })
      })

    })
  }
  }
  return temp
}())
export default init

