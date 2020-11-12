export default function makeGetMenuRestaurant ({getMenu}){
    return async function menuResto (httpRequest) {
        try{
            
            const menu = await getMenu(httpRequest.query)

            return {
                headers: {
                    'Content-Type': 'application/json',
                    // 'Last-Modified': new Date(posted.createdTime).toUTCString()
                  },
                  statusCode: 201,
                  body: {
                    status : true,
                    response_code : 200,
                    data:menu,
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