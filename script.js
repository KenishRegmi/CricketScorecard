// Initialize variables
let totalRuns = 0;
let wickets = 0;
let balls = 0;      // legal balls in current over
let overs = 0;
let totalBalls = 0;

// Update the display
function updateDisplay() {
  document.getElementById("displayScore").textContent = `${totalRuns} - ${wickets}`;
  document.getElementById("overs").textContent = overs;
  document.getElementById("balls").textContent = balls;
  document.getElementById("totalBalls").textContent = totalBalls;
}

// For runs (legal deliveries)
function addRun(runs) {
  totalRuns += runs;
  balls++;
  totalBalls++;

  // Manage over counting
  if (balls === 6) {
    overs++;
    balls = 0;
  }

  updateDisplay();
}

// For extras: wide, no ball, dead
function addExtra(type) {
  if (type === "noball" || type === "wide") {
    totalRuns += 1; // Extra run
    // Do not count as legal ball
  }
  // Dead ball: do nothing
  updateDisplay();
}

// For wickets
function addWicket() {
  if (wickets < 10) {
    wickets++;
    balls++;
    totalBalls++;

    // Over management
    if (balls === 6) {
      overs++;
      balls = 0;
    }

    updateDisplay();
  }
}
