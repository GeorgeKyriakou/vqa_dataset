const fs = require("fs");

const compare_tamplates = require("./TEMPLATES/compare.json");
const metadata = require("./metadata.json");
const { combineAll } = require("./helpers/combineAll.js");

let questionsArray = [];
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
        try {
          const variableToReplace = paramNamesArray[index];
          const regEx = new RegExp(variableToReplace, "gm");
          const updatedSentence = sentence.replace(regEx, word);
          if (regEx.test(sentence)) {
            questionsArray.push(updatedSentence);
          } else {
            console.info(`Could not match ${variableToReplace} in sentence`);
          }
        } catch (e) {
          console.error("ERROR", e);
        }
      });
    });
  });
});

var file = fs.createWriteStream(
  `./generated_questions/combination_questions.txt`
);
file.on("error", err => {
  console.error("Error while writing to file:", err);
});
questionsArray.forEach(v => {
  file.write(v + "\n");
});
file.end();

String.prototype.replaceAll = function(search, replacement) {
  return this.split(search).join(replacement);
};
