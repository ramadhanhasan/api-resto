import {entityMenu} from '../entity'

export default function makePostMenu ({restoDb}) {
    return async function PostMenu (req) {
    try{
      console.log('re',req);
      
        const postMenu = await restoDb.dbPostMenu(req)
        console.log('postMenu', postMenu);
        
        
        return postMenu
        }
        catch (error){
          throw({error:error, from : 'usecase post-menu'})
        }
      }
    }