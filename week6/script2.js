const heading = document.querySelector("h1");
console.log(heading);
console.log(heading.textContent); // reading DOM
heading.textContent = "I already know DOM"; // modifying or updating DOM

const subheading = document.querySelectorAll("h2");
console.log(subheading);
for (let i = 0; i < subheading.length; i++) {
  console.log(subheading[i].textContent);
}
// console.log(subheading.textContent);

const blueItems = document.querySelectorAll(".blue-color");
console.log(blueItems);

const subHead = document.querySelector("#subhead-1");
console.log(subHead);

const courseName = "Interactive Media";
const courseId = "0ART1013";
const header = document.querySelector("header");
console.log(header);
console.log(header.innerHTML);
header.innerHTML += `
<h3 class="blue-color"> ${courseName} </h3>
<p> ${courseId} </p>
`;

function toggleMe() {
  const myCat = document.querySelector("#my-cat");
  console.log(myCat);
  myCat.classList.add("round");
}

const myCat = document.querySelector("#my-cat");
console.log(myCat);
myCat.addEventListener("mouseover", addMe);
myCat.addEventListener("mouseout", removeMe);

myButton = document.querySelector("#my-button");
console.log(myButton);
myButton.addEventListener("click", toggleMe);

function addMe() {
  myCat.classList.add("round");
}

function removeMe() {
  myCat.classList.remove("round");
}
