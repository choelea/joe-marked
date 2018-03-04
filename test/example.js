var { marked,fetchMeta } = require('../lib/joe-marked.js');
var fs  = require('fs')

fs.readFile('./test/example.md', 'utf8', function (error, content){
    var basicResult = marked(content, { toc: true });
    console.log(JSON.stringify(basicResult))
})