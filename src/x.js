function boom(param) {
  console.log("boom is called", param);
}

// let timer = null;
// function foo(text) {
//   clearTimeout(timer);
//   timer = setTimeout(() => {
//     boom(text);
//   }, 500);
// }

// foo("m");
// foo("ma");

// foo("man");

function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

let deBounceBoom = debounce(boom, 500);

deBounceBoom("m");
deBounceBoom("ma");
deBounceBoom("mana");
