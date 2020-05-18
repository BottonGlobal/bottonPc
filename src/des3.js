/**
 * Created by xuwenjie on 2019-01-24
 * @format
 * @flow
 */

import CryptoJS from 'crypto-js';
const secretKey = '20200416ylkj@ckcoin@163.com';
const iv = '_ckcoin_';

/**
 * des3加密
 * @param str   加密的字符串
 * @param isMd5 在进行des3加密之前是否需要md5加密一次
 * @returns {string}
 */
const encrypt = (str, isMd5 = false) => {
  //let key			= CryptoJS.MD5(secretKey).toString();
  //let iv			= CryptoJS.MD5('_wallet_').toString();
  const string = isMd5
    ? CryptoJS.MD5(str)
      .toString()
      .toLowerCase()
    : str;
  const crypto_key = CryptoJS.enc.Utf8.parse(secretKey);
  const crypto_iv = CryptoJS.enc.Utf8.parse(iv.substr(0, 8));
  const encode_str = CryptoJS.TripleDES.encrypt(string + '', crypto_key, {
    iv: crypto_iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encode_str.toString();
};

/**
 * des3解密
 * @param str
 * @returns {string}
 */
const decrypt = (str) => {
  //let key			= CryptoJS.MD5(secretKey).toString();
  //let iv			= CryptoJS.MD5('_wallet_').toString();
  const crypto_key = CryptoJS.enc.Utf8.parse(secretKey);
  const crypto_iv = CryptoJS.enc.Utf8.parse(iv.substr(0, 8));
  const decrypt_str = CryptoJS.TripleDES.decrypt(str, crypto_key, {
    iv: crypto_iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypt_str.toString(CryptoJS.enc.Utf8);
};
/**
 * 签名
 * @param str
 * @returns {string}
 */


export default { encrypt, decrypt };
