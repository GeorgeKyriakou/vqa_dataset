const metadata = require("../metadata.json");

module.exports.getAnswer = (nodes, functions_map) => {
  let answer = [];
  nodes.forEach((node, index) => {
    if (index === 0) {
      answer.push(node.type);
    } else {
      if (node.inputs.length === 0) {
        answer.push("fork");
      } else if (node.inputs.length > 1) {
        answer.push("union");
        answer.push(node.type);
      }
      if (node.side_inputs) {
        node.side_inputs.forEach(si => {
          const f = functions_map.find(fm => fm.name === si);
          answer.push(f.function);
        });
      }
    }
  });

  return answer;
};
