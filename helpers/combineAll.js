module.exports.combineAll = function() {
  try {
    const r = [],
      arg = arguments,
      max = arg.length - 1;
    function helper(arr, i) {
      for (let j = 0, l = arg[i].length; j < l; j++) {
        const a = arr.slice(0);
        a.push(arg[i][j]);
        if (i === max) {
          r.push(a);
        } else {
          helper(a, i + 1);
        }
      }
    }
    helper([], 0);
    return r;
  } catch (e) {
    console.error("Could not combine for args:", arguments);
  }
};
