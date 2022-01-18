let salaries = {
  John: 100,
  Ann: 160,
  Pete: 130,
};
let sum = 0;
for (let A in salaries) {
  sum += salaries[A];
}
alert(sum);
