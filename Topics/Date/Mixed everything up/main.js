let firstEventDate = new Date("2011-01-11");
let secondEventDate = new Date("2023-04-26");

let differenceWithSum = secondEventDate - firstEventDate
    + 3600 * 24 * 365 * 1000;

console.log(differenceWithSum / 1000 / 3600 / 24);
