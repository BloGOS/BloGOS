'use strict';

var elliptic = Meteor.npmRequire('elliptic');
var ecdsa = new elliptic.ec(elliptic.curves.secp256k1);

var BitAuth = require('./bitauth-common');

BitAuth._generateRandomPair = function() {
  var keys = ecdsa.genKeyPair();
  var privateKey = keys.getPrivate('hex');
  var publicKey = BitAuth.getPublicKeyFromPrivateKey(privateKey);
  return [privateKey, publicKey];
};

BitAuth._getPublicKeyFromPrivateKey = function(privkey) {
  var privKeyString;
  if (Buffer.isBuffer(privkey)) {
    privKeyString = privkey.toString('hex');
  } else {
    privKeyString = privkey;
  }
  var keys = ecdsa.keyPair(privkey, 'hex');

  // compressed public key
  var pubKey = keys.getPublic();
  var xbuf = new Buffer(pubKey.x.toString('hex', 64), 'hex');
  var ybuf = new Buffer(pubKey.y.toString('hex', 64), 'hex');
  var pub;

  if (ybuf[ybuf.length - 1] % 2) { //odd
    pub = Buffer.concat([new Buffer([3]), xbuf]);
  } else { //even
    pub = Buffer.concat([new Buffer([2]), xbuf]);
  }
  return pub;
};

BitAuth._sign = function(hashBuffer, privkey) {
  var signature = ecdsa.sign(hashBuffer.toString('hex'), privkey);
  var hexsignature = signature.toDER('hex');
  return hexsignature;
};

BitAuth._verifySignature = function(hashBuffer, signatureBuffer, pubkey) {
  return ecdsa.verify(hashBuffer.toString('hex'), signatureBuffer, pubkey);
};

module.exports = BitAuth;
