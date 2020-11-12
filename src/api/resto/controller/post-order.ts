import { brotliDecompressSync } from "zlib"

export default function makePostOrder ({checkStockFood, postOrder, postOrderDetail, postPurchaser, postPayment, reduceStock}){
    return async function createPostOrder (req) {
        try{            
            const checkStockQtyFood = await checkStockFood(req.body.items)
            const addPostOrder = await postOrder(req.body)            
            const addPostOrderDetail = await postOrderDetail(req.body.items, addPostOrder)
            const addPostPurchaser = await postPurchaser(req.body.purchaser, addPostOrder)
            const addPostPayment = await postPayment(req.body, addPostOrder)
            const reduceStockFood = await reduceStock(req.body.items)

            const posted = {
                order_id : addPostOrder,
                final_price : req.body.price,
            }
            return {
                headers: {
                    'Content-Type': 'application/json',
                    // 'Last-Modified': new Date(posted.createdTime).toUTCString()
                  },
                  statusCode: 201,
                  body: {
                    status : true,
                    response_code : 200,
                    data:posted,
                    message : "OK",
                  }
            }

        } catch (e) {
            return {
                headers: {
                  'Content-Type': 'application/json'
                },
                statusCode: 400,
                body: {
                  response_code:400,
                  status:false,
                  error: e.error.message,
                  from : e.from
                }
              }
        }
    }
}