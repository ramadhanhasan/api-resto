export default function makeCheckStockFood ({restoDb}) {
    return async function CheckStockFood (req) {
    try{
        
        const checkStock = await restoDb.checkStockFood(req)
        
        return checkStock
        }
        catch (error){
          throw({error:error, from : 'usecase check-stock-food'})
        }
      }
    }