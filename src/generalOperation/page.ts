import { operPage } from '../api/api.js'

//  根据页面id查询 组信息 给数据库 
export async function queryPage(pass_id: string): Promise<{}> {
  const { data } = await operPage({
    "oper_type": "selectPage",
    pass_id
  })
  let Message: {}
  return new Promise<{}>((resolve, reject) => {
    if(data.code==200){
      Message = data.data
      resolve(Message)
    }else{
      reject(new Error(data.msg))
    }

  })
}