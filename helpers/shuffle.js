/**
 * Fischer-Yates shuffling algorithm
 * @link https://bost.ocks.org/mike/shuffle/
 * @param array Array of items
 * @returns Shuffled array 
 */

module.exports.shuffle =(array) => {
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}
