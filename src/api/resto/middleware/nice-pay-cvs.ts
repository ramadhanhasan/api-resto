// // import request from 'request-promise'
// import axios from 'axios'
// import moment from 'moment'
// import dateTime from 'node-datetime'
// import sha256 from 'sha256'
// import os from 'os'
// require('dotenv').config();

// const environment = process.env.ENVIRONMENT

// export default function makeRequestCvsNicepay() {
//   return Object.freeze({
//     registrationCvsNicepay
//   })
//   async function registrationCvsNicepay(param, payment){
//     return new Promise(function(resolve, reject) {
//     console.log(param)
//     let merchantKey: any;
//     let iMid: any;
//     let url: any;
//     const abdiTransactionType = ['membership','event-offline'];
//     const essenzoTransactionType = ['sales','upgrade','pre-order'];

//     if(environment === 'production'){
//       url = process.env.URL_NICEPAY_PROD;
//       if(abdiTransactionType.indexOf(param['data_order'].type) >= 0){
//         merchantKey = process.env.MERCHANT_KEY_ESSENZO_002
//         iMid = process.env.IMID_ESSENZO_002
//       }
//       if(essenzoTransactionType.indexOf(param['data_order'].type) >= 0){
//         merchantKey = process.env.MERCHANT_KEY_ESSENZO_001
//         iMid = process.env.IMID_ESSENZO_001
//       }
//     }else{
//       url = process.env.URL_NICEPAY_DEV
//       iMid = process.env.IMID_DEV;
//       // merchant key Development
//       merchantKey = process.env.MERCHANT_KEY_DEV
//     }

//     // console.log('imid', iMid)



//     // var dt = dateTime.create();
//     // var formatDateTime = dt.format('YmdHMS');
//     //
//     // var date = new Date(param['data_order'].expired_time).toISOString().replace('-','').replace('-','').substr(0,8)
//     // var time = param['data_order'].expired_time.replace(':','').replace(':','').substr(11,6)

//     let formatDateTime = moment().format('YYYYMMDDHHmmss')
//     console.log('formatDateTime',formatDateTime)

//     let date = moment(param['data_order'].expired_time).format('YYYYMMDD')
//     let time = moment(param['data_order'].expired_time).format('HHmmss')


//     var a = os.hostname()
//     // console.log('a', a)

//     let billAddress = ((param['data_order'].type === 'event-offline' || (param['data_order'].type=== 'membership' && param['data_order'].source_funnel === 'Starterkit')) ? 'Jalan Rawa Buntu Utara Blok H2/7' : param['data_order_detail']['shipping'].address )
//     let billCityName = ((param['data_order'].type === 'event-offline' || (param['data_order'].type=== 'membership' && param['data_order'].source_funnel === 'Starterkit')) ? 'Tangerang' : param['data_order_detail']['shipping'].city_name )
//     let billState = ((param['data_order'].type === 'event-offline' || (param['data_order'].type=== 'membership' && param['data_order'].source_funnel === 'Starterkit')) ? 'Banten' : param['data_order_detail']['shipping'].province_name )
//     let billZipCode = ((param['data_order'].type === 'event-offline' || (param['data_order'].type=== 'membership' && param['data_order'].source_funnel === 'Starterkit')) ? '15310' : param['data_order_detail']['shipping'].zip_code )

//     let urlCallback = ((environment === 'production') ? process.env.END_POINT_API_CALLBACK_PROD : process.env.END_POINT_API_CALLBACK_DEV)

//     const paramRequest = {
//       timeStamp:formatDateTime, //date_now
//       iMid: iMid,
//       payMethod: '03',
//       currency: 'IDR',
//       amt: param['data_order'].sell_price,
//       referenceNo: param['data_order'].order_id,
//       goodsNm: 'Transaction Essenzo/Abdi',
//       billingNm:  param['data_purchaser'].name,
//       billingPhone:  param['data_purchaser'].phone,
//       billingEmail: param['data_purchaser'].email,
//       billingAddr: billAddress,
//       billingCity:  billCityName,
//       billingState: billState,
//       billingPostCd:  billZipCode,
//       billingCountry: 'Indonesia',
//       deliveryNm: 'ESSENZO',
//       deliveryPhone: '02139706677',
//       deliveryAddr: 'Jalan Rawa Buntu Utara Blok H2/7',
//       deliveryCity: 'Tangerang',
//       deliveryState: 'Banten',
//       deliveryPostCd: '15310',
//       deliveryCountry: 'Indonesia',
//       description: 'Transaction of Order#' + param['data_order'].order_id,
//       dbProcessUrl: urlCallback,
//       // dbProcessUrl: 'https://sra-api.abdi.app/callback',
//       merchantToken: sha256(formatDateTime + iMid + param['data_order'].order_id + param['data_order'].sell_price + merchantKey ) ,
//       reqDomain:'merchant.com', //2 $_SERVER['SERVER_NAME'] masih hard code
//       reqServerIP: '' , //3  $_SERVER['SERVER_ADDR'] masih hard code
//       userIP: param['data_order'].ip_address, //4 order->databse masih hardcode
//       userSessionID: '', //5
//       userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML,like Gecko) Chrome/60.0.3112.101 Safari/537.36' , //6 $_SERVER['HTTP_USER_AGENT'] masih hard code
//       userLanguage: 'id-en', //7 id-en
//       cartData: '{}',
//       mitraCd: payment.getPaymentDetail(),//$data['payment_method_detail'],masih hard code
//       payValidDt: date, // =>lebih dari current time
//       payValidTm: time
//     }

//     axios({ method: 'POST',
//       url: url,
//       headers:
//        { 'cache-control': 'no-cache',
//          Connection: 'keep-alive',
//          'Accept-Encoding': 'gzip, deflate',
//          Host: 'dev.nicepay.co.id',
//          'Postman-Token': '11d1dde8-9239-4ea5-96bd-30773aba808f,a828b3d1-7553-49a7-a2a7-027b9e01a5d1',
//          'Cache-Control': 'no-cache',
//          Accept: '*/*',
//          'User-Agent': 'PostmanRuntime/7.20.1',
//          'Content-Type': 'application/json' },
//       data: paramRequest
//       })
//     .then(body =>{
//       // console.log('np',body.data)
//       // console.log('payNo',body.data.payNo)
//       if(body.data. resultMsg == 'SUCCESS'){
//         const ret = {
//           timeStamp : formatDateTime,
//           merchantToken :  sha256(formatDateTime + iMid + param['data_order'].order_id + param['data_order'].sell_price + merchantKey ),
//           callback : urlCallback,
//           txId : body.data.tXid,
//           iMid : iMid,
//           amt :  param['data_order'].sell_price,
//           payNo : body.data.payNo,
//           status : 'wait'
//         }
//         resolve(ret)
//       }else{
//         reject(body.data.resultMsg)
//       }
//     })
//   })
//   }

// }
