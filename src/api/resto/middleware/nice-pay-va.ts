import moment from 'moment'
import sha256 from 'sha256'
import os from 'os'
import axios from 'axios'

moment.locale('id')

export default function makeRequestNicepay() {
  return Object.freeze({
    registrationVaNicepay
  })
  async function registrationVaNicepay(param, orderId){
    return new Promise(function(resolve, reject) {
    console.log(param)
    let merchantKey: any;
    let iMid: any;
    let url: any;

    url = 'https://dev.nicepay.co.id/nicepay/direct/v2/registration'
    merchantKey = '33F49GnCMS1mFYlGXisbUDzVf2ATWCl9k3R++d5hDd3Frmuos/XLx8XhXpe+LDYAbpGKZYSwtlyyLOtS/8aD7A=='
    iMid = 'IONPAYTEST'
    
    // console.log('imid', iMid)

     // param['data_order'].sell_price = '10000'

    // var dt = dateTime.create();
    // var formatDateTime = dt.format('YmdHMS');

    let formatDateTime = moment().format('YYYYMMDDHHmmss')
    // console.log('formatDateTime',formatDateTime)

    // let date = moment(param['data_order'].expired_time).format('YYYYMMDD')
    // let time = moment(param['data_order'].expired_time).format('HHmmss')

    var a = os.hostname()
    // console.log('a', a)

    // let billAddress = ((param['data_order'].type === 'event-offline' || (param['data_order'].type=== 'membership' && param['data_order'].source_funnel === 'Starterkit')) ? 'Jalan Rawa Buntu Utara Blok H2/7' : param['data_order_detail']['shipping'].address )
    // let billCityName = ((param['data_order'].type === 'event-offline' || (param['data_order'].type === 'membership' && param['data_order'].source_funnel === 'Starterkit')) ? 'Tangerang' : param['data_order_detail']['shipping'].city_name )
    // let billState = ((param['data_order'].type === 'event-offline' || (param['data_order'].type === 'membership' && param['data_order'].source_funnel === 'Starterkit')) ? 'Banten' : param['data_order_detail']['shipping'].province_name )
    // let billZipCode = ((param['data_order'].type === 'event-offline' || (param['data_order'].type === 'membership' && param['data_order'].source_funnel === 'Starterkit')) ? '15310' : param['data_order_detail']['shipping'].zip_code )

    let urlCallback = 'test'

    const paramRequest =  {   timeStamp:formatDateTime, //date_now
          iMid: iMid,
          //mitraCd : 'CENA',
          payMethod: '02',
          currency: 'IDR',
          amt: param.price,
          referenceNo: orderId,
          goodsNm: 'Transaction Resto',
          billingNm:  param.purchaser.name,
          billingPhone:  '089613607945',
          billingEmail: param.purchaser.email,
          billingAddr: 'Jalan Muara',
          billingCity:  'Jakarta',
          billingState: 'Jakarta',
          billingPostCd:  '12530',
          billingCountry: 'Indonesia',
          deliveryNm: 'Resto',
          deliveryPhone: '02139706677',
          deliveryAddr: 'Jalan Rawa Buntu Utara Blok H2/7',
          deliveryCity: 'Tangerang',
          deliveryState: 'Banten',
          deliveryPostCd: '15310',
          deliveryCountry: 'Indonesia',
          description: 'Transaction of Order#' + orderId,
          dbProcessUrl: urlCallback,
          // dbProcessUrl: 'https://sra-api.abdi.app/callback',
          merchantToken: sha256(formatDateTime + iMid + orderId + param.price + merchantKey ) ,
          reqDomain:'merchant.com', //2 $_SERVER['SERVER_NAME'] masih hard code
          reqServerIP: '172.29.2.178' , //3  $_SERVER['SERVER_ADDR'] masih hard code
          userIP: '0:0:0:0:0:0:0:1', //4 order->databse masih hardcode
          userSessionID: '697D6922C961070967D3BA1BA5699C2C', //5
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML,like Gecko) Chrome/60.0.3112.101 Safari/537.36' , //6 $_SERVER['HTTP_USER_AGENT'] masih hard code
          userLanguage: 'id-en', //7 id-en
          cartData: '{}',
          bankCd: 'CENA',//$data['payment_method_detail'],masih hard code
          vacctValidDt: '', // =>lebih dari current time
          vacctValidTm: ''
        }

    axios({ method: 'POST',
      url: url,
      headers:
       { 'cache-control': 'no-cache',
         Connection: 'keep-alive',
         'Accept-Encoding': 'gzip, deflate',
         Host: 'dev.nicepay.co.id',
         'Postman-Token': '11d1dde8-9239-4ea5-96bd-30773aba808f,a828b3d1-7553-49a7-a2a7-027b9e01a5d1',
         'Cache-Control': 'no-cache',
         Accept: '*/*',
         'User-Agent': 'PostmanRuntime/7.20.1',
         'Content-Type': 'application/json' },
      data: paramRequest
    })
    .then(body =>{
    //   console.log('np',body)
      if(body.data.resultMsg == 'SUCCESS'){
        const ret = {
          timeStamp : formatDateTime,
          merchantToken :  sha256(formatDateTime + iMid + orderId + param.price + merchantKey ),
          callback : urlCallback,
          txId : body.data.tXid,
          iMid : iMid,
          amt :  param.price,
          vacctNo : body.data.vacctNo,
          status : 'wait'
        }
        resolve(ret)
        // resolve(body.vacctNo)
      }else{
        reject(body.data.resultMsg)
      }
    })
  })
}

}
