export default function makePostPurchaser ({restoDb}) {
    return async function PostPurchaser (req, orderId) {
    try{
      
        const postPurchaser = await restoDb.dbPostPurchaser(req, orderId)
        
        return postPurchaser
        }
        catch (error){
          throw({error:error, from : 'usecase post-purchaser'})
        }
      }
    }