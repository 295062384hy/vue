import axios from 'axios'

export default function ajax (url='',data={},type="GET") {
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
   axios.get(url)
 }else {
   axios.post(url,data)
 }


}

