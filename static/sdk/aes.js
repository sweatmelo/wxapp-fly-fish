var crypto = require("./crypto-js/index.js");
var AES = crypto.AES;
var Utf8 = crypto.enc.Utf8;
var ECB = crypto.mode.ECB;
var Pkcs7 = crypto.pad.Pkcs7;

/**
 * 加密
 * @param word
 * @returns {*}
 */

function encrypt(word, secret) {
  var key = Utf8.parse(secret);
  var srcs = Utf8.parse(word);
  var encrypted = AES.encrypt(srcs, key, { mode: ECB, padding: Pkcs7 });
  return encrypted.toString() // 返回的是base64格式的密文
}

/**
 * 解密
 * @param word
 * @returns {*}
 */

function decrypt(word, secret) {
  var key = Utf8.parse(secret);
  var decrypt = AES.decrypt(word, key, { mode: ECB, padding: Pkcs7 });
  return Utf8.stringify(decrypt).toString();
}

module.exports = {
  encrypt,
  decrypt
};
