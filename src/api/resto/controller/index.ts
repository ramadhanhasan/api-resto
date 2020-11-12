import{
    getMenu,
    postMenu,
    checkStockFood,
    postOrder,
    postOrderDetail,
    postPurchaser,
    reduceStock,
    postPayment
} from '../use-case'

import makeGetMenuRestaurant from './get-menu-restaurant'
import makePostMenu from './post-menu'
import makePostOrder from './post-order'

const getMenuRestaurant = makeGetMenuRestaurant({getMenu})
const addPostMenu = makePostMenu({postMenu})
const addPostOrder = makePostOrder({checkStockFood, postOrder, postOrderDetail, postPurchaser, postPayment, reduceStock})

const restoController = Object.freeze({
    getMenuRestaurant,
    addPostMenu,
    addPostOrder
})

export default restoController
export {getMenuRestaurant, addPostMenu, addPostOrder}