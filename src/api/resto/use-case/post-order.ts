export default function makePostOrder ({restoDb}) {
    return async function PostOrder (req) {
    try{
      
        const postOrder = await restoDb.dbPostOrder(req)
        
        return postOrder
        }
        catch (error){
          throw({error:error, from : 'usecase post-order'})
        }
      }
    }