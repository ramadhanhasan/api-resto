export default function buildMakeMenu(){
    return function makeMenu({
      name_of_menu = '',
      price = 0,
      qty  = 0
      } = {}) {
  
      return Object.freeze({
        // getOrderId : () => orderId,
        getQty : () => qty,
        getNameOfMenu : () => name_of_menu,
        getPrice : () => price,
        })
    }
  }
  