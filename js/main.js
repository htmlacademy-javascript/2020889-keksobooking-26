//Функция, возвращающая случайное целое число из переданного диапазона включительно
function getRandomPositiveInteger (a, b) {
    const lower = Math.min(Math.abs(a), Math.abs(b));
    const upper = Math.max(Math.abs(a), Math.abs(b));
    const result = Math.random() * (upper - lower) + lower;

    return Math.round(result);
  }
console.log(getRandomPositiveInteger(1,100))

//Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно
function getRandomPositiveFloat (a, b, digits) {
    const lower = Math.min(Math.abs(a), Math.abs(b));
    const upper = Math.max(Math.abs(a), Math.abs(b));
    const result = Math.random() * (upper - lower) + lower;

    return +result.toFixed(digits);
  }
  console.log(getRandomPositiveFloat(1,100,6))