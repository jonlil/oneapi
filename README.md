oneapi
======

Infobip oneapi wrapper


```javascript

var OneAPI = require('oneapi');

var oneapi = new OneAPI({
  'username': 'yourusername',
  'password': 'yourpassword'
});

oneapi.sendSMS({
    'senderName': '',
    'senderAddress': '',
    'message': 'testing'.toString('utf8'),
    'dataCoding': 8,
    'address': '+46730000000'
})
.then(function(result) {
    /** if you want to get deliveryInfo */
    return oneapi.getDeliveryInfo(result.clientCorrelator);
})
.then(function(result) {})
.catch(function(err) {});

```