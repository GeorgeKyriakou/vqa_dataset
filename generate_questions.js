const compare_tamplates = require("./TEMPLATES/compare.json");
const metadata = require("./metadata.json");
const { combineAll } = require("./helpers/combineAll.js");

String.prototype.replaceAll = function(search, replacement) {
  return this.split(search).join(replacement);
};

const regexForVariable = /\${(.*?)\}/gm;

compare_tamplates.forEach(template => {
  const paramNamesArray = template.params.map(p => p.name);
  const paramTypes = template.params.map(p => p.type);

  const paramTypeFromMetadata = paramTypes.map(type => {
    return metadata.types[type];
  });
  const arrayOfWordCombinations = combineAll(...paramTypeFromMetadata);

  arrayOfWordCombinations.forEach(wordCombination => {
    wordCombination.forEach((word, index) => {
      template.text.forEach(sentence => {
        const variableToReplace = paramNamesArray[index];
        //search in sentence with 'variableToReplace', using 'regexForVariable',  and replace with word
        //push sentence in "global" array of sentences
        //repeat for next template
      });
    });
  });
});

function checkAndReplace(sentence, word) {
  //if word !exists sentence => replace
}
