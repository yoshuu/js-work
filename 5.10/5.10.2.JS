function topSalary(salaries) {
  let [top = null, ...rest] = Object.entries(salaries).sort(
    (a, b) => b[1] - a[1]
  );
  return Array.isArray(top) ? top[0] : top;
}
