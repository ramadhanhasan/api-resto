import restoDb from '../data-access'
import makeGetMenu from './get-menu-restaurant'
import makePostMenu from './post-menu'
import makeCheckStockFood from './check-stockfood'
import makePostOrder from './post-order'
import makePostOrderDetail from './post-order-detail'
import makePostPurchaser from './post-purchaser'
import makeReduceStock from './reduce-stock'
import makePostPayment from './post-payment'

import {requestVaNicepay} from '../middleware'

const getMenu = makeGetMenu({restoDb})
const postMenu = makePostMenu({restoDb})
const checkStockFood = makeCheckStockFood({restoDb})
const postOrder = makePostOrder({restoDb})
const postOrderDetail = makePostOrderDetail({restoDb})
const postPurchaser = makePostPurchaser({restoDb})
const reduceStock = makeReduceStock({restoDb})
const postPayment = makePostPayment({restoDb, requestVaNicepay})

const restoService = Object.freeze({
    getMenu,
    postMenu,
    checkStockFood,
    postOrder,
    postOrderDetail,
    postPurchaser,
    reduceStock,
    postPayment
})

export default restoService
export {getMenu, postMenu, checkStockFood, postOrder, postOrderDetail, postPurchaser, reduceStock, postPayment}