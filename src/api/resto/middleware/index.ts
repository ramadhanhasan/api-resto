import makeRequestVaNicepay from './nice-pay-va'
//import makeRequestCvsNicepay from './nice-pay-cvs'

const requestVaNicepay = makeRequestVaNicepay();
//const requestCvsNicepay = makeRequestCvsNicepay();

const middlewareService = Object.freeze({
    requestVaNicepay,
    //requestCvsNicepay
})

export default middlewareService
export {requestVaNicepay}