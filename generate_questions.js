const compare_tamplates = require("./TEMPLATES/compare_v2.json");
const metadata = require("./metadata.json");
const { combineAll } = require("./helpers/combineAll.js");
const { writeFile } = require("./helpers/writeToFile.js");
const { getAnswer } = require("./helpers/getAnswer");

String.prototype.replaceAll = function(search, replacement) {
  return this.split(search).join(replacement);
};

const regexForVariable = /\<(.*?)\>/gm;
let sentenceArray = [];
compare_tamplates.forEach(template => {
  const answer = getAnswer(template.nodes, template.functions_map);

  template.questions.forEach(({ text }) => {
    const original = text;
    regex = text.match(regexForVariable);
    const paramTypeFromMetadata = regex.map(name => {
      const p = template.params.find(p => p.name === name);
      return p && metadata.types[p.type];
    });

    const arrayOfWordCombinations = combineAll(...paramTypeFromMetadata);

    arrayOfWordCombinations.forEach(wordCombination => {
      const combinationOfUniqueWords = [...new Set(wordCombination)];
      if (regex.length === combinationOfUniqueWords.length) {
        let temp = text;
        regex.forEach((variableByLetter, i) => {
          temp = text.replace(variableByLetter, wordCombination[i]);
          text = temp;
        });
        if (answer) {
          sentenceArray.push(JSON.stringify({ text, answer }));
        } else {
          console.log("could not answer question :(");
        }

        text = original;
      }
    });
  });
});
writeFile(sentenceArray);
