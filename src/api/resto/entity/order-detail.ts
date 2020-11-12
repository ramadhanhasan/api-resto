export default function buildMakeOrderDetail(){
    return function makeOrderDetail({
      qty = 0,
      type = '',
      description = '',
      otherId = 0,
      price = 0
      } = {}) {
  
      return Object.freeze({
        // getOrderId : () => orderId,
        getQty : () => qty,
        getType : () => type,
        getOtherId : () => otherId,
        getDescription : () => description,
        getPrice : () => price,
        })
    }
  }
  