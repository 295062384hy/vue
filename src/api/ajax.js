import axios from 'axios'
//自己定义一个Promise对象 为了能够直接获取到数据而不用 const response=await ...   response.data
export default function ajax (url='',data={},type="GET") {
  return new Promise(function (resolve,reject) {
    //定义变量
    let promise
    if(type==='GET'){
      let querSteing=''
      Object.keys(data).forEach(key=>{
        const value=data[key]
        querSteing+=key+'='+value+'&'
      })
      if(querSteing){
        querSteing=querSteing.substring(0,querSteing.length-1)
        url+='?'+querSteing
      }
      promise= axios.get(url)
    }else {
      promise= axios.post(url,data)
    }
    promise.then(
      response=>{resolve(response.data)},
      err=>{reject(err)}
    )
  })

}

