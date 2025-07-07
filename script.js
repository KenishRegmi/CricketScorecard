// Player objects
let batter1 = { runs: 0, balls: 0 };
let batter2 = { runs: 0, balls: 0 };
let striker = 1; // 1 = batter1, 2 = batter2

// Team stats
let totalRuns = 0;
let wickets = 0;
let overs = 0;
let balls = 0; // 0–5 (6 balls per over)

function updateUI() {
  // Update batter stats
  document.getElementById("p1Runs").textContent = batter1.runs;
  document.getElementById("p1Balls").textContent = batter1.balls;
  document.getElementById("p2Runs").textContent = batter2.runs;
  document.getElementById("p2Balls").textContent = batter2.balls;

  // Update team stats
  document.getElementById("totalRuns").textContent = totalRuns;
  document.getElementById("wickets").textContent = wickets;
  document.getElementById("overs").textContent = overs;
  document.getElementById("balls").textContent = balls;

  // Highlight striker
  document.getElementById("player1").querySelector("strong").textContent =
    striker === 1 ? "Batter 1 (Striker):" : "Batter 1:";
  document.getElementById("player2").querySelector("strong").textContent =
    striker === 2 ? "Batter 2 (Striker):" : "Batter 2:";
}

function addRun(run) {
  totalRuns += run;
  if (striker === 1) {
    batter1.runs += run;
    batter1.balls += 1;
  } else {
    batter2.runs += run;
    batter2.balls += 1;
  }

  // Ball bowled
  balls += 1;

  // Over completed?
  if (balls === 6) {
    overs += 1;
    balls = 0;

    // Strike changes every 2 overs
    if (overs % 2 === 0) {
      switchStrike();
    }
  }

  // Change strike if odd run
  if (run % 2 === 1) {
    switchStrike();
  }

  updateUI();
}

function addWicket() {
  wickets += 1;

  // Ball bowled
  balls += 1;
  if (striker === 1) {
    batter1.balls += 1;
  } else {
    batter2.balls += 1;
  }

  // Over completed?
  if (balls === 6) {
    overs += 1;
    balls = 0;

    if (overs % 2 === 0) {
      switchStrike();
    }
  }

  updateUI();
}

function addExtra() {
  totalRuns += 1;
  // Extra run — ball does not count
  updateUI();
}

function nextBall() {
  // Dot ball with no run
  if (striker === 1) {
    batter1.balls += 1;
  } else {
    batter2.balls += 1;
  }

  balls += 1;

  if (balls === 6) {
    overs += 1;
    balls = 0;

    if (overs % 2 === 0) {
      switchStrike();
    }
  }

  updateUI();
}

function switchStrike() {
  striker = striker === 1 ? 2 : 1;
}

function reset() {
  batter1 = { runs: 0, balls: 0 };
  batter2 = { runs: 0, balls: 0 };
  striker = 1;
  totalRuns = 0;
  wickets = 0;
  overs = 0;
  balls = 0;
  updateUI();
}

// Initial load
updateUI();
