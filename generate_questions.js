const compare_tamplates = require('./TEMPLATES/compare.json')
const metadata = require('./metadata.json')

  String.prototype.replaceAll = function(search, replacement) {
    return this.split(search).join(replacement);
};
// const regexForVariable = /\${(.*?)\}/gm


compare_tamplates.forEach(template => {    
    const paramNamesArray = template.params.map(p => p.name)
    const paramTypes = template.params.map(p => p.type)
    
    template.text.forEach(sentence => {
        let tmpSentence = ""
        paramNamesArray.forEach( pname=> {
            const word = 'Yolo'
            sentence.replaceAll(pname, word)
        })
    })
});

