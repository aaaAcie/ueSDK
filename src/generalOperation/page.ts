import { operPage } from '../api/api.js'
interface pageParams {
  pass_id: string;
  page_id: string;
}

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

// 新增页面 from数睿 给数据库 
export async function addPage(page_list: Array<pageParams>): Promise<{}> {
  const { data } = await operPage({
    "oper_type": "batchReplacePage",
    page_list
  })
  let Message: {}
  return new Promise<{}>((resolve, reject) => {
    if(data.code==200){
      Message = data.data
      resolve({Message})
    }else{
      reject(new Error(data.msg))
    }

  })
}
// 删除页面 from数睿 给数据库 
export async function deletePage(page_list: Array<pageParams>): Promise<{}> {
  const { data } = await operPage({
    "oper_type": "batchDeletePage",
    page_list
  })
  let Message: {}
  return new Promise<{}>((resolve, reject) => {
    if(data.code==200){
      Message = data.data
      resolve({Message})
    }else{
      reject(new Error(data.msg))
    }

  })
}