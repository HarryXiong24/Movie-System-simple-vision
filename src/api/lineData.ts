import service from '../util/service'

const reqLineData = () => {
  let promise: Promise<any> = service({
    url: '/movieBoxOffice',
    method: 'post',
  })

  return new Promise<any>( function (resolve, reject) {
    promise.then(function (response) {
      // 成功了调用resolve()
      resolve(response)
    }).catch(function (error) {
      //失败了调用reject()
      reject(error)
    })
  })
}

export default reqLineData
