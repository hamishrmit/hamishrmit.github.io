// function checkWeather() {
//   let body = document.querySelector("body");
//   let outer = document.querySelector(".outer");
//   console.log("I am just being clicked");
//   let myInput = document.querySelector("#myTemp");
//   let temp = myInput.value;
//   console.log("current temp is", temp);
//   if (temp >= 20 && temp < 30) {
//     body.style.backgroundColor = "orange";
//     outer.style.backgroundColor = "purple";
//     console.log("it feels sunny and warm");
//   } else if (temp >= 10 && temp < 20) {
//     body.style.backgroundColor = "lightblue";
//     outer.style.backgroundColor = "lime";
//     console.log("it feels cold");
//   } else if (temp >= 30) {
//     body.style.backgroundColor = "crimson";
//     outer.style.backgroundColor = "blue";
//     console.log("it is boiling hot");
//   } else if (temp < 10) {
//     body.style.backgroundColor = "gray";
//     outer.style.backgroundColor = "yellow";
//     console.log("it is freezing");
//   }
// }

function checkWeather() {
  const myTemp = document.querySelector("#myTemp");
  console.log(myTemp.value);
  const body = document.querySelector("body");
  let temp = myTemp.value;

  if (temp < 10) {
    console.log("it is quite cold today");
    body.style.backgroundColor = "gray";
  } else if (temp >= 10 && temp < 20) {
    console.log("the weather is nice today");
    body.style.backgroundColor = "blue";
  } else if (temp >= 20 && temp < 30) {
    console.log("it is quite warm today");
    body.style.backgroundColor = "orange";
  } else if (temp >= 30) {
    console.log("it is burning hot");
    body.style.backgroundColor = "red";
  }
}
