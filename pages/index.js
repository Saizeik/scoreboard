import React from "react";
import "animate.css";

let mouseX = 0;
let mouseY = 0;
if (typeof window === "object") {
  const all_rects = Array.from(document.querySelectorAll(".container"));
  const app = document.getElementById("app");

  window.addEventListener("mousemove", function (ev) {
    mouseX = ev.clientX;
    mouseY = ev.clientY;

    all_rects.forEach(function (rect) {
      update_rect(rect);
    });

    app.style.backgroundImage = `radial-gradient(ellipse at ${mouseX}px ${mouseY}px, #fff, #bbb)`;
  });
}

function update_rect(rect) {
  const pos = rect.getBoundingClientRect();

  const hue = parseInt(rect.getAttribute("data-hue"));

  function gradient() {
    const colInner = `hsl(${hue}, 100%, 80%)`;
    const colOuter = `hsl(${hue}, 40%, 30%)`;

    const diffX = mouseX - pos.x;
    const diffY = mouseY - pos.y;

    const bg = `radial-gradient(circle at ${diffX}px ${diffY}px, ${colInner}, ${colOuter})`;
    rect.style.backgroundImage = bg;
  }

  function shadow() {
    const centerX = pos.x + pos.width * 0.5;
    const centerY = pos.y + pos.height * 0.5;

    const diffX = mouseX - centerX;
    const diffY = mouseY - centerY;

    const len = Math.sqrt(diffX * diffX + diffY * diffY);

    const val = {
      x: diffX * -0.06,
      y: diffY * -0.06,
      blur: len * 0.1,
    };

    const col = `hsla(${hue}, 100%, 15%, 0.6)`;
    const col2 = `hsla(${hue}, 100%, 60%, 0.2)`;

    rect.style.boxShadow = `${val.x}px ${val.y}px ${val.blur}px ${col}, 0px 0px 40px ${col2}`;
  }

  gradient();
  shadow();
}

let homePoints;
let guestPoints;
let homeScore = 0;
let guestScore = 0;

function scoreboard() {
  if (typeof window === "object") {
    homePoints = document.getElementById("home-points");
    guestPoints = document.getElementById("guest-points");

    homePoints.textContent = homeScore;
    guestPoints.textContent = guestScore;
  }
}

const homePlusOne = () => {
  scoreboard();
  homeScore = homeScore + 1;
  homePoints.textContent = homeScore;
  return homeScore;
};

const homePlusTwo = () => {
  scoreboard();
  homeScore = homeScore + 2;
  homePoints.textContent = homeScore;
  return homeScore;
};

const homePlusThree = () => {
  scoreboard();
  homeScore = homeScore + 3;
  homePoints.textContent = homeScore;

  return homeScore;
};

const guestPlusOne = () => {
  scoreboard();
  guestScore = guestScore + 1;
  guestPoints.textContent = guestScore;
  return guestScore;
};

const guestPlusTwo = () => {
  scoreboard();
  guestScore = guestScore + 2;
  guestPoints.textContent = guestScore;
  return guestScore;
};

const guestPlusThree = () => {
  scoreboard();
  guestScore = guestScore + 3;
  guestPoints.textContent = guestScore;
  return guestScore;
};

const resetButton = () => {
  scoreboard();
  homeScore = 0;
  guestScore = 0;
  homePoints.textContent = homeScore;
  guestPoints.textContent = guestScore;
  return homeScore + guestScore;
};

export default function Home() {
  return (
    <div id="app">
      <div class="row">
        <div class="container" data-hue="200">
          <div class="left col-3 col-s-12">
            <h3 class="animate__animated animate__rubberBand board-home">
              HOME
            </h3>
            <div class="animate__animated animate__tada score-background">
              <span
                class="animate__animated animate__flash points"
                id="home-points"
              >
                0
              </span>
            </div>
            <div class=" animate__animated animate__fadeInLeft points-container-home">
              <button class="plus-points-home-1" onClick={() => homePlusOne()}>
                +!
              </button>
              <button class="plus-points-home-2" onClick={() => homePlusTwo()}>
                +2
              </button>
              <button
                class="plus-points-home-3"
                onClick={() => homePlusThree()}
              >
                +3
              </button>
            </div>
          </div>
          <div class="right col-3 col-s-12">
            <h3 class="animate__animated animate__rubberBand board-home">
              GUEST
            </h3>
            <div class="animate__animated animate__tada score-background">
              <span
                class=" animate__animated animate__flash  points"
                id="guest-points"
              >
                0
              </span>
            </div>
            <div class="animate__animated animate__fadeInRight points-container-guest">
              <button
                class="plus-points-guest-1"
                onClick={() => guestPlusOne()}
              >
                +!
              </button>
              <button
                class="plus-points-guest-2"
                onClick={() => guestPlusTwo()}
              >
                +2
              </button>
              <button
                class="plus-points-guest-3"
                onClick={() => guestPlusThree()}
              >
                +3
              </button>
            </div>
            <div class="animate__animated  animate__flip reset-container">
              <button class="reset" onClick={() => resetButton()}>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
