export default function makeGetMenu ({restoDb}) {
    return async function GetMenu (data) {
    try{
        const idRes = data.idRes
        const getMenu = await restoDb.dbGetMenuById(idRes)
        return getMenu
  
    } catch (error){
      throw({error:error, from : 'usecase get-menu-restaurant'})
      }
    }
}
