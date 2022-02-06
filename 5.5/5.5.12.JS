function unique(arr) {
  let result = [];
  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }
  return result;
}
let strings = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
alert(unique(strings));
