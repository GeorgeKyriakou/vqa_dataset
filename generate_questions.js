
////////////////////////////////////////////////

const compare_tamplates = require("./TEMPLATES/compare.json");
const metadata = require("./metadata.json");
const { combineAll } = require("./helpers/combineAll.js");

String.prototype.replaceAll = function(search, replacement) {
  return this.split(search).join(replacement);
};

const regexForVariable = /\<(.*?)\>/gm;

compare_tamplates.forEach(template => { 
  template.text.forEach(sentence => {
    regex = sentence.match(regexForVariable).map(s => `<${s.split('')[1]}>`)
    const paramTypeFromMetadata = regex.map((name) => {
      const p = template.params.find(p=> p.name === name)
      return p && metadata.types[p.type];
    });
    try {
      const arrayOfWordCombinations = combineAll(...paramTypeFromMetadata);
      arrayOfWordCombinations.forEach((wordCombination)=> {
        const combinationOfUniqueWords = [...new Set(wordCombination)]

        if(regex.length === combinationOfUniqueWords.length) {   
          let temp = sentence      
          for(let i= 0; i < regex.length; i++ ) {
            temp = sentence.replace(regex[i], wordCombination[i])      
          }
          console.log(temp);
        }
      })
    } catch (e) {
      console.error('ERROR for:', paramTypeFromMetadata)
      console.error(e)
    }
  
  });
});


function checkAndReplace(sentence, word) {
  //if word !exists sentence => replace
}




     // wordCombination.forEach((word, index) => {
        // const variableToReplace = paramNamesArray[index];
        // regex = sentence.match(regexForVariable).map(s => `<${s.split('')[1]}>`)
        // console.log(regex)


        // regex.forEach(symbol => {

          // if (symbol === variableToReplace) {
            // finalSentence = sentence.replace(regexForVariable, word);
            // console.log(finalSentence);
          // }
      // });
      // });