export default function makeRestoDb({mysqlConnection}) {
  return Object.freeze({
    dbGetMenuById,
    dbPostMenu,
    dbPostOrder,
    dbPostOrderDetail,
    dbPostPurchaser,
    checkStockFood,
    reduceStockFood,
    insertPaymentDb
  })



async function dbGetMenuById(id){
  return new Promise(function(resolve, reject){
         const db = mysqlConnection
         const connection = db.getConnection(function (error, conn){
           if(error){
               reject(new Error(error))
             }else{
               const res1 =  conn.query("SELECT r.name_restaurant , r.status as statusRestaurant, m.name_of_menu, m.price, m.status as statusMenu from tbl_restaurant r join tbl_menu m on r.id = m.id_restaurant where r.id ="+id, (err, rows, fields)=>{
                 if(err){
                   reject(new Error(err))
                }else if(rows.length < 1){
                    reject(new Error('no data menu'))
                 }else{
                   resolve(rows)
                   // return rows
                 }
               })
             }
           })

     })
}

async function dbPostMenu(body){
  return new Promise(function(resolve, reject){
    //console.log('b',body.id_restaurant);
    
         const db = mysqlConnection

         let param = {
           id_restaurant : body.id_restaurant,
           name_of_menu : body.name_of_menu,
           price : body.price,
           qty : body.qty,
         }
         const connection = db.getConnection(function (error, conn){
           if(error){
               reject(new Error(error))
             }else{
               const res1 =  conn.query("INSERT INTO tbl_menu SET ?",param,(err, rows, fields)=>{
                //  console.log ('rr',rows)
                //  console.log('1',res1);
                //  console.log('ff',fields);
                 const idMenu = rows.insertId
                 
                 if(err){
                   reject(new Error(err))
                 }else{
                   resolve({idMenu,param})
                   // return rows
                 }
               })
             }
           })

     })
}

async function dbPostOrder(body){
  return new Promise(function(resolve, reject){
         const db = mysqlConnection

         let param = {
           price : body.price,
           special_instruction : body.specialInstruction,
         }
         const connection = db.getConnection(function (error, conn){
           if(error){
               reject(new Error(error))
             }else{
               const res1 =  conn.query("INSERT INTO tbl_orders_food SET ?",param,(err, rows, fields)=>{
                 // console.log ('rr',rows)
                 if(err){
                   reject(new Error(err))
                 }else{
                   resolve(rows.insertId)
                   // return rows
                 }
               })
             }
           })

     })
}

async function dbPostOrderDetail(body, orderId){
  return new Promise(function(resolve, reject){
      const db = mysqlConnection
      console.log('body',body)
      console.log('orderID',orderId)
      body.map (async items=>{
          let param = {
            order_id : orderId,
            type : items.type,
            description : items.description,
            price : items.price,
            qty : items.qty,
            other_id : items.otherId
          }
          const connection = db.getConnection(function (error, conn){
            if(error){
                reject(new Error(error))
              }else{
                const res1 =  conn.query("INSERT INTO tbl_orders_detail_food SET ?",param,(err, rows, fields)=>{
                  // console.log ('rr',rows)
                  if(err){
                    reject(new Error(err))
                  }else{
                    resolve(rows.insertId)
                    // return rows
                  }
                })
              }
        })
      })
    })
}

async function dbPostPurchaser(body, orderId){
  return new Promise(function(resolve, reject){
         const db = mysqlConnection

         let param = {
           order_id : orderId ,
           name : body.name,
           email : body.email,
           phone : body.phone
         }
         const connection = db.getConnection(function (error, conn){
           if(error){
               reject(new Error(error))
             }else{
               const res1 =  conn.query("INSERT INTO tbl_purchasers SET ?",param,(err, rows, fields)=>{
                 // console.log ('rr',rows)
                 if(err){
                   reject(new Error(err))
                 }else{
                   resolve(rows.insertId)
                   // return rows
                 }
               })
             }
           })

     })
}

async function checkStockFood(data){  
  return new Promise(function(resolve, reject){
      let qtyPurchaser : any;
      let idMenu : any;
      const db = mysqlConnection
      // console.log(body)
      data.map (async items=>{
        if(items.type == 'food'){
          qtyPurchaser = items.qty
          idMenu = items.otherId
        }
          const connection = db.getConnection(function (error, conn){
            if(error){
                reject(new Error(error))
              }else{
                const res1 =  conn.query('SELECT qty from tbl_menu where id ='+idMenu,(err, rows, fields)=>{
                  //console.log ('rr',idMenu)
                  let stockFoodQty = rows[0].qty
                  if(err){
                    reject(new Error(err))

                  }else if (stockFoodQty < qtyPurchaser){
                    reject(new Error('Food Sold Out'))

                  }else{
                    resolve('Available')
                    // return rows
                  }
                })
              }
        })
      })
    })

}

async function reduceStockFood (data){
  console.log('data', data);
  
  return new Promise(function(resolve, reject){
      const db = mysqlConnection
      const mapItems = Promise.all(data.map (async items=>{
        if(items.type == 'food'){
          const connection = db.getConnection(function (error, conn){
            if(error){
                reject(new Error(error))
              }else{
                const res1 =  conn.query('SELECT qty from tbl_menu where id ='+items.otherId,(err, rows, fields)=>{
                  // console.log ('rr',rows[0].qty)
                  let stockFoodQty = rows[0].qty
                  if(err){
                    reject(new Error(err))
                  }else{
                    let totalQtyFood = stockFoodQty - items.qty
                    const res2 = conn.query('update tbl_menu set qty = '+totalQtyFood+ ' where id = '+items.otherId,(err, rows, fields)=>{
                      if (err){
                        reject(new Error(err))
                      }else{
                        resolve('success reduce qty')
                        // return 'succes reduce'
                      }
                    })
                  }
                })
              }
            })
        }

      }))

      // resolve(mapItems)
    })
  }

    async function insertPaymentDb(req,orderId, vacctNo){
      return new Promise(function(resolve, reject) {
        const db =  mysqlConnection

        let post = {
            order_id: orderId,
            price: req.price,
            description : 'test',
            payment_method : 'CENA',
            payment_method_detail : 'testing',
            payment_method_account : vacctNo,
            status : 'wait',
            }
        
        const connection = db.getConnection(function (error, conn){
          if(error){
            reject(new Error(error))
          }else{
           const res1 = conn.query("INSERT INTO tbl_payment SET ?", post ,(err, rows, fields)=>{
           console.log('err',err);
           console.log('post',post);
           
           
            if(err){
              reject(new Error(err))

            }else{
              resolve(post)
            }
          })
        }
        })
      })
    }
}