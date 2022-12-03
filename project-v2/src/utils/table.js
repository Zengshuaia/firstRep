
export function getData(root,url,params){
    root.service.get(url,{params:params || {}})
    .then(res=>{
        if(res.data.status===200){
            root.tableData=res.data.data;
            root.total=res.data.total;
            root.tableData.forEach(item=>{
                item.sex==='1'?item.sex_text='男':item.sex_text='女'
            })
        }
    }).catch(err=>{
        throw err;
    })
}

//封装作业数据表查询方法
export function getDataWork(root,url,params,arr){
    root.service.get(url,{params:params || {}})
    .then(res=>{
        if(res.data.status===200){
            root.tableData=res.data.data;
            root.total=res.data.total;
            root.tableData.map(item=>{
                //遍历数组的每一项
                arr.map(aItem=>{
                    //遍历数组aItem属性的值
                    item[aItem]? item[aItem+'_text']='是':item[aItem+'_text']='否'
                })
            })
            root.loading=false;
        }
        
    })
}

