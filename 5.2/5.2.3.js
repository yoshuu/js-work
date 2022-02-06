function readNumber() {
  let num;

  do {
    num = prompt("輸入", 0);
  } while (!isFinite(num));

  if (num === null || num === "") return null;

  return +num;
}

alert(`Read: ${readNumber()}`);
