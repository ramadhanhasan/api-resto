export default function makeReduceStock ({restoDb}) {
    return async function ReduceStock (req) {
    try{
      
        const reduceStock = await restoDb.reduceStockFood(req)
        
        return reduceStock
        }
        catch (error){
          throw({error:error, from : 'usecase reduce-stock'})
        }
      }
    }