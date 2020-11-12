export default function makePostPayment ({restoDb, requestVaNicepay}) {
    return async function PostPayment (req, orderId) 
    {
      console.log('requestpayment', req);
      
      let txId : any = null
      let merchantToken : any = null
      let paymentAccount : any = null
      let timeStamp : any = null
  
      if(req.paymentMethod == 'VirtualAccount'){
        try {
          console.log('payment',req.paymentMethod);
          
          const nicepayVa = await requestVaNicepay.registrationVaNicepay(req, orderId)
          const result =  await restoDb.insertPaymentDb(req, orderId, nicepayVa.vacctNo);
          console.log('result', result)
          const ret = {
            order_id : orderId,
            txId : txId,
            merchantToken : merchantToken,
            paymentAccount : result.payment_method_account,
            timeStamp : timeStamp
          }
          return ret
  
        } catch (error) {
          throw new Error(error)
        }
        

      }
      // else if(req.getPaymentMethod() === 'ConvenienceStore'){
      //   try {
      //     const nicepayCvs = await requestCvsNicepay.registrationCvsNicepay(req, orderId)
      //     const result =  await restoDb.insertPaymentDb(req,nicepayCvs.payNo);
      //     console.log('result', result)
      //     const ret = {
      //       txId : txId,
      //       merchantToken : merchantToken,
      //       paymentAccount : result.payment_method_account,
      //       timeStamp : timeStamp
      //     }
      //     return ret
  
      //   } catch (error) {
      //     throw new Error(error)
      //   }
      // }
    }
}