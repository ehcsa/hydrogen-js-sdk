let Bmob = require('./bmob')
const utils = require('./utils')

const setHeader = (config) => {
  let header = {
    'content-type': 'application/json',
    'X-Bmob-SDK-Type': 'wechatApp',
    'X-Bmob-Application-Id': config.applicationId,
    'X-Bmob-REST-API-Key': config.applicationKey
  }
  if(config.applicationMasterKey){
    header['X-Bmob-Master-Key']=config.applicationMasterKey
  }
  return header
}

const request = (route, method = "get", parma = {}) => {
  return new Promise((resolve, reject) => {
    const header = setHeader(Bmob._config)

    if (undefined == Bmob.User) {
      Bmob = require('./bmob')
    }
    var current = Bmob.User.current()
    if (current) {
      header['X-Bmob-Session-Token'] = current.sessionToken
    }
    wx.request({
      url: Bmob._config.host + route, //仅为示例，并非真实的接口地址
      method: method,
      data: parma,
      header: header,
      success: res => {
        if(res.data.code){
          reject(res.data);
        }
        resolve(res.data);
      },
      fail: err => {
        console.log(err)
        reject(err);
      }
    })
  })
}

module.exports = request