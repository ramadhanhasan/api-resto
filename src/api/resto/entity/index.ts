//import buildMakeOrder from './order';
//import buildMakePurchaser from './purchaser'
import buildMakeOrderDetail from './order-detail'
import buildMakeMenu from './menu'

// const entityOrder = buildMakeOrder()
// const entityPurchaser = buildMakePurchaser()
const entityOrderDetail = buildMakeOrderDetail()
const entityMenu = buildMakeMenu()

const buildEntity =  Object.freeze({
//   entityOrder,
//   entityPurchaser,
  entityOrderDetail,
  entityMenu
})

export default buildEntity
export{entityOrderDetail, entityMenu}
