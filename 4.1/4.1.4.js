function multiplyNumeric(obj) {
  for (let A in obj) {
    if (typeof obj[A] == "number") {
      obj[A] *= 2;
    }
  }
}
