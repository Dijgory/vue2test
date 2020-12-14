// const fs = require('fs')
// const path = require('path')
// const Mock = require('mockjs')
// const JSON5 = require('json5')

// function getJsonFile (filePath) {
//   var json = fs.readFileSync(path.join(__dirname,'./userinfo.json5'), 'utf-8')
//   return JSON5.parse(json)
// }
// module.exports = function (app) {
//     app.get('/user/userinfo', function (rep, res) {
//       var json = getJsonFile('./userinfo.json5')
//       res.json(Mock.mock(json))
//     })
// }