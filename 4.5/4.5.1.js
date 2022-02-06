let C = {};

function A() {
  return C;
}
function B() {
  return C;
}

alert(new A() == new B());
