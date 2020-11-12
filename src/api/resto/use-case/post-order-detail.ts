import {entityOrderDetail} from '../entity'

export default function makePostOrderDetail ({restoDb}) {
    return async function PostOrderDetail (req, orderId) {
    try{
      
        const postOrderDetail = await restoDb.dbPostOrderDetail(req, orderId)
        
        return postOrderDetail
        }
        catch (error){
          throw({error:error, from : 'usecase post-order-detail'})
        }
      }
    }