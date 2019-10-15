const metadata = require("../metadata.json");

module.exports.getAnswer = (scene, wordsCombination) => {
  const functions = metadata.functions;

  wordsCombination.forEach(word => {
    const connectors = functions.map(f => f.connector);
    const functionForAnswer = connectors.indexOf(word);
    // console.log(connectors, word);
    if (functionForAnswer === -1) return false;
  });

  let answersFunctionArray = [scene];
  return answersFunctionArray;
};
