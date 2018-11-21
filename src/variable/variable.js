import axios from 'axios'
import sha1 from 'js-sha1'


let init = (function () {
  const path = 'http://10.11.8.185/api/antifake/v1/'
  let key = true
  let temp = {
    path : path,
    secretKey : '477a1d7cc03d21d5abce55ec12170d33',
    //获取url参数
    getQueryString : (name) => {
      let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      }
      return null;
    },
    //验证参数是c
    getCaliaString : (name) => {
      let url = name
      let c = url.substring(url.indexOf('c='),url.indexOf('='))
      return c
    },
    //获取防伪码
    getBarCode : (u) => {
      let url = u
      let code = url.substring(url.indexOf('=') + 1)
      return code
    },
    //验证参数是a
    getKaishaString : (name) => {
      let url = name
      let a = url.substring(url.indexOf('a='),url.indexOf('='))
      return a
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
          axios.get(`${path}antiFakeVerify`,{
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
   //获取调用微信JS接口的临时票据
    getTicket : () => {
      let url = window.location.href
      let timestamp = temp.getTimestamp()
      let secretKey = temp.secretKey
      let arr = [
        ['url',url],
        ['secretKey',secretKey],
        ['timestamp',timestamp]
      ]
      let sign = temp.getSign(arr)
      return new Promise (function(resolve,reject){
        axios.get('https://derucci.net/api/public/v1/getTicket',{
          params: {
            url : url,
            timestamp : timestamp,
            secretKey : secretKey,
            sign : sign
          }
        })
        .then((res) => {
          if (res) {
            // console.log ('获取数据',res)
            resolve(res.data)
          }
        })
        .catch( (error) => {
          console.log ('发生错误',error)
        }) 
      })
    }
   
  }
  return temp
}())
export default init

