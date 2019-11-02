const compare_tamplates = require("./TEMPLATES/compare_v2.json");
const query_template = require("./TEMPLATES/query_v2.json");
const count_template = require("./TEMPLATES/count.json");
const existence_template = require("./TEMPLATES/existence.json");

const metadata = require("./metadata.json");
const { combineAll } = require("./helpers/combineAll.js");
const { writeFile } = require("./helpers/writeToFile.js");
const { getAnswer } = require("./helpers/getAnswer");

const templatesArray = [
  compare_tamplates,
  query_template,
  count_template,
  existence_template
];

const regexForVariable = /\<(.*?)\>/gm;
let sentenceArray = [];

templatesArray.forEach(t => {
  t.forEach(template => {
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
});

writeFile(sentenceArray);

String.prototype.replaceAll = function(search, replacement) {
  return this.split(search).join(replacement);
};
