module.exports = function makeExpressCallback (controller) {
    return (req, res) => {
      // console.log('callback req',req)
      // console.log('header ip',req.headers['x-forwarded-for'])
      // console.log('req ip', req.ip)
      // console.log('req remoteAddress', req.connection.remoteAddress)
      const httpRequest = {    
        body: req.body,
        query: req.query,
        params: req.params,
        // ip: req.ip,
        // ip : req.connection.remoteAddress,
        ip : req.headers['x-forwarded-for'],
        method: req.method,
        path: req.path,
        headers: {
          'Content-Type': req.get('Content-Type'),
          Referer: req.get('referer'),
          'User-Agent': req.get('User-Agent')
        }
      }
      controller(httpRequest)
        .then(httpResponse => {
          if (httpResponse.headers) {
            res.set(httpResponse.headers)
          }
          res.type('json')
          res.status(httpResponse.statusCode).send(httpResponse.body)
        })
        .catch(e => {
          res.status(500).send({ error: 'An unkown error occurred.' })
        })
    }
  }