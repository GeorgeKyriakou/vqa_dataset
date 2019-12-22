module.exports.getAnswer = (nodes, functions_map) => {
  try {
    let answer = "";
    nodes.forEach((node, index) => {
      if (index === 0) {
        answer += `${node.type} `;
      } else {
        if (node.inputs.length === 0) {
          answer += "fork ";
        } else if (node.inputs.length > 1) {
          answer += "union ";
          answer += `${node.type} `;
        }
        if (node.side_inputs) {
          node.side_inputs.forEach(si => {
            const f = functions_map.find(fm => fm.name === si);
            answer += `${f.function} `;
          });
        }
      }
    });
    return answer.trim();
  } catch (e) {
    throw new Error("FUCK!");
  }
};
