const fs = require('fs');
const path = require('path');
const Parser = require('./utils/index');
const fileContent = fs.readFileSync(path.join(__dirname,'./resources/6.tex'),{encoding:'utf-8'})
const parser = new Parser(fileContent);
console.log(parser.getHtml())

