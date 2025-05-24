const NodeRSA = require("node-rsa");
const key = new NodeRSA({ b: 2048 });
console.log('public :'+key.exportKey('public'))
console.log('private: '+key.exportKey('private'))      
let a = key.exportKey('public').replace(/-----BEGIN PUBLIC KEY-----|-----END PUBLIC KEY-----/g, '').replace(/\n/g, '~')
let b= key.exportKey('private').replace(/-----BEGIN RSA PRIVATE KEY-----|-----END RSA PRIVATE KEY-----/g, '').replace(/\n/g, '~')
console.log('public :' + `-----BEGIN PUBLIC KEY-----`+a.replace(/~/g, '\n')+`-----END PUBLIC KEY-----`)
console.log('private: '+`-----BEGIN RSA PRIVATE KEY-----`+b.replace(/~/g, '\n')+`-----END RSA PRIVATE KEY-----`)