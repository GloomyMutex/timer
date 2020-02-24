const durationInput = document.querySelector("#duration");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
const circle = document.querySelector("circle");

// Calculating the value for the stroke-dasharray
const perimeter = circle.getAttribute("r") * 2 * Math.PI;
circle.setAttribute("stroke-dasharray", perimeter);

let duration;

const timer = new Timer(durationInput, startButton, pauseButton, {
  // Callbacks that the timer will call each of them at some appropriate time (helps segment the codebase from the logic that updates border animation)
  onStart(totalDuration) {
    duration = totalDuration;
  },
  onTick(timeRemaining) {
    // Should decrement at even interval by the perimeter divided by the amount of ticks to prevent over/under-shooting
    circle.setAttribute(
      "stroke-dashoffset",
      (perimeter * timeRemaining) / duration - perimeter
    );
  },
  onComplete() {
    console.log("Timer is completed");
  }
});
