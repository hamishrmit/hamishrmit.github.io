const myButton = document.querySelector("#my-button");
console.log(myButton);

myButton.addEventListener("click", doJump);

const duck = document.querySelector("#duck");
console.log(duck);

let clicked = false;

function doJump() {
  //   console.log("did you just click me?");

  if (clicked) {
    clicked = false;
    duck.style.translate = "0px 0px";
  } else {
    clicked = true;
    duck.style.translate = "0px -60px";
  }

  console.log(clicked);
}
