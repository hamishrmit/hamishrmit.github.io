console.log("Hi");

let myStudentId = 1234;
console.log(myStudentId);
myStudentId = 4567;
console.log(myStudentId);
let myBudget = 30.57;
console.log("I can spend today: $", myBudget);

{
  let a = 20;
  let b = 40;
  let c = a * b;
  console.log(c);
}

let x = "40";
if (x === 40) {
  console.log(true);
} else {
  console.log(false);
}

let isItFriday = true;
let isItPublicHoliday = false;

if (isItPublicHoliday) {
  console.log("thank god no class today");
} else {
  console.log("Sorry there is class today");
}

let iAmUnknown;
let emptyBox = null;
console.log(emptyBox);

const myName = "Hamish Rylan Talko";
console.log("Hello", myName);
const myName2 = "Stanley";
console.log("Hello", myName2);

let myCity = "Melbourne";
console.log("Hello", myCity);

const myRecord = { myName: "Hamish", id: 1234, city: "Perth" };
console.log(myRecord);
console.log(myRecord.city);

const grade1 = 67;
const grade2 = 84;

if (grade1 >= 60 && grade1 < 70) {
  console.log("you got C");
} else if (grade1 >= 70 && grade1 < 80) {
  if (grade1 >= 80 && grade1 < 100) {
    console.log("you got HD");
  }
}

const grades = [67, 84, 76, 90, 45];
const cities = ["mel", "syd", "ade"];
console.log("grade of student 3", grades[2]);
console.log("second city I visited", cities[1]);

const students = ["alice", "bob", "carol", "deb"];
// console.log ("hello", students[0])
// console.log ("hello", students[1])
// console.log ("hello", students[2])
// console.log ("hello", students[3])
console.log(students.length);
for (let i = 0; i < students.length; i++) {
  console.log("hello", students[i]);
}

const expenditures = [34, 4, 78, 5, 10];
let totalSpend = 0;
console.log(expenditures.length);
for (let i = 0; i < expenditures.length; i++) {
  totalSpend = totalSpend + expenditures[i];
  console.log("expenditure so far: ", totalSpend);
}
console.log("total expenditure is: ", totalSpend);

let shoppingCart = [
  { name: "T-shirt", price: 20 },
  { name: "Jeans", price: 50 },
  { name: "Sneakers", price: 80 },
  { name: "Backpack", price: 30 },
];

console.log(shoppingCart[0].price);
let purchases = 0;
console.log(shoppingCart.length);
for (let i = 0; i < shoppingCart.length; i++) {
  purchases = purchases + shoppingCart[i].price;
  console.log(
    "purchased: ",
    shoppingCart[i].name,
    "for: $",
    shoppingCart[i].price,
  );
}
console.log("total purchase is: ", purchases);
let discount = 0;
if (purchases > 100) {
  discount = purchases - 10 * (purchases / 100);
  console.log("your discounted price is: ", discount);
}
