// Initialize starting two batters
let batters = [
  { name: "Batter 1", runs: 0, balls: 0, fours: 0, sixes: 0, status: "not out" },
  { name: "Batter 2", runs: 0, balls: 0, fours: 0, sixes: 0, status: "not out" },
];

// Track striker and non-striker by index
let striker = 0;
let nonStriker = 1;
let nextBatter = 3; // Next batter's number

// Match stats
let totalRuns = 0;
let totalBalls = 0;
let totalWickets = 0;
let extras = 0;
let fallOfWickets = [];

// Handle runs from a ball
function playBall(run) {
  const batter = batters[striker];

  // Update batter stats
  batter.runs += run;
  batter.balls += 1;
  totalRuns += run;
  totalBalls++;

  // Count 4s and 6s
  if (run === 4) batter.fours += 1;
  if (run === 6) batter.sixes += 1;

  // Swap strike if runs is odd
  if (run % 2 === 1) switchStrike();

  // Swap strike at end of over
  if (totalBalls % 6 === 0) switchStrike();

  updateScoreboard();
}

// Handle extras like wide, no-ball
function extraRun() {
  extras++;
  totalRuns++;
  // Ball does NOT count
  updateScoreboard();
}

// Register a wicket and send new batter
function registerWicket() {
  // Set current striker as out
  batters[striker].status = "out";
  totalWickets++;
  totalBalls++;

  // Record fall of wicket
  fallOfWickets.push(`${totalRuns}/${totalWickets}`);

  // Bring in next batter (up to 11)
  if (nextBatter <= 11) {
    batters.push({
      name: `Batter ${nextBatter}`,
      runs: 0,
      balls: 0,
      fours: 0,
      sixes: 0,
      status: "not out",
    });
    striker = batters.length - 1;
    nextBatter++;
  }

  // Swap strike at over end
  if (totalBalls % 6 === 0) switchStrike();

  updateScoreboard();
}

// End over manually (if user wants control)
function endOver() {
  if (totalBalls % 6 !== 0) {
    alert("Over not yet completed!");
    return;
  }
  switchStrike();
  updateScoreboard();
}

// Switch striker and non-striker
function switchStrike() {
  [striker, nonStriker] = [nonStriker, striker];
}

// Calculate strike rate (SR = Runs / Balls * 100)
function calculateSR(runs, balls) {
  return balls === 0 ? "0.00" : ((runs / balls) * 100).toFixed(2);
}

// Update the DOM with all live data
function updateScoreboard() {
  document.getElementById("teamScore").textContent = totalRuns;
  document.getElementById("teamWickets").textContent = totalWickets;
  document.getElementById("teamOvers").textContent = `${Math.floor(totalBalls / 6)}.${totalBalls % 6}`;
  document.getElementById("extras").textContent = extras;
  document.getElementById("fow").textContent = fallOfWickets.join(", ") || "-";

  const tbody = document.getElementById("battingCard");
  tbody.innerHTML = "";

  batters.forEach((batter, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${batter.name}</td>
      <td>${batter.runs}</td>
      <td>${batter.balls}</td>
      <td>${batter.fours}</td>
      <td>${batter.sixes}</td>
      <td>${calculateSR(batter.runs, batter.balls)}</td>
      <td>${batter.status}</td>
    `;

    tbody.appendChild(row);
  });
}

// Reset everything for a new match
function resetGame() {
  batters = [
    { name: "Batter 1", runs: 0, balls: 0, fours: 0, sixes: 0, status: "not out" },
    { name: "Batter 2", runs: 0, balls: 0, fours: 0, sixes: 0, status: "not out" },
  ];
  striker = 0;
  nonStriker = 1;
  nextBatter = 3;
  totalRuns = 0;
  totalBalls = 0;
  totalWickets = 0;
  extras = 0;
  fallOfWickets = [];
  updateScoreboard();
}

// Initialize scoreboard
updateScoreboard();
