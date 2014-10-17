var request = require('request');
var Q = require('q');




var OneAPI = function OneAPI(options) {
  this.password = options.password;
  this.username = options.username;
};

/**
 *
 * @type {string}
 */
OneAPI.basePath = 'https://oneapi.infobip.com/';

/**
 *
 * @type {string}
 */
OneAPI.contentType = 'application/json';

/**
 *
 * @param message
 * @returns {*}
 */
OneAPI.prototype.sendSMS = function(message) {
  if(toString.call(message.address) === '[object String]') {
    message.address = [message.address];
  }

  var options = {
    'url': OneAPI.basePath + '1/smsmessaging/outbound/give/requests',
    'method': 'POST',
    'headers': {
      'Authorization': authorization(this.username, this.password),
      'Content-type': OneAPI.contentType
    },
    'json': true,
    'body': message
  };

  return Q.Promise(function(resolve, reject) {
    request(options, requestResolver(resolve, reject));
  });
};

OneAPI.prototype.getDeliveryInfo = function(clientCorrelator) {
  var endpoint = '1/smsmessaging/outbound/give/requests/{clientCorrelator}/deliveryInfos';

  var options = {
    'headers': {
      'Authorization': authorization(this.username, this.password),
      'Content-type': OneAPI.contentType
    },
    'json': true,
    'url': OneAPI.basePath + endpoint.replace('{clientCorrelator}', clientCorrelator)
  };

  return Q.Promise(function(resolve, reject) {
    request(options, requestResolver(resolve, reject));
  });
};

/**
 *
 * @param authorization
 * @param clientCorrelator
 * @returns {*}
 */
OneAPI.getDeliveryInfo = function(authorization, clientCorrelator) {
  return new OneAPI(authorization).getDeliveryInfo(clientCorrelator);
};

/**
 *
 * @param authorization
 * @param message
 * @returns {*}
 */
OneAPI.sendSMS = function(authorization, message) {
  return new OneAPI(authorization).sendSMS(message);
};


function authorization(username, password) {
  return 'Basic ' + new Buffer(username + ':' + password).toString('base64');
}

function requestResolver (resolve, reject) {
  return function(err, response, body) {
    if(err) {
      return reject(err);
    }
    if(body.requestError) {
      return reject(new Error(body.requestError.serviceException.text));
    }
    return resolve(body);
  }
}



module.exports = OneAPI;