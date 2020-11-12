export default function makePostMenu ({postMenu}){
    return async function createPostMenu (httpRequest) {
        try{
            
            const addMenu = await postMenu(httpRequest.body)

            return {
                headers: {
                    'Content-Type': 'application/json',
                    // 'Last-Modified': new Date(posted.createdTime).toUTCString()
                  },
                  statusCode: 201,
                  body: {
                    status : true,
                    response_code : 200,
                    data:addMenu,
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