const compare_tamplates = require("./TEMPLATES/compare.json");
const metadata = require("./metadata.json");
const { combineAll } = require("./helpers/combineAll.js");

String.prototype.replaceAll = function(search, replacement) {
  return this.split(search).join(replacement);
};

const regexForVariable = /\<(.*?)\>/gm;

compare_tamplates.forEach(template => {
  template.text.forEach(sentence => {
    const original = sentence;
    regex = sentence.match(regexForVariable);

    const paramTypeFromMetadata = regex.map(name => {
      const p = template.params.find(p => p.name === name);
      return p && metadata.types[p.type];
    });
    const arrayOfWordCombinations = combineAll(...paramTypeFromMetadata);

    arrayOfWordCombinations.forEach(wordCombination => {
      const combinationOfUniqueWords = [...new Set(wordCombination)];

      if (regex.length === combinationOfUniqueWords.length) {
        console.log({ wordCombination });
        let temp = sentence;
        regex.forEach((variableByLetter, i) => {
          temp = sentence.replace(variableByLetter, wordCombination[i]);
          sentence = temp;
        });
        console.log("DONE: ", sentence);
        sentence = original;
      }
    });
  });
});
