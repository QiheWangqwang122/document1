import "./style.css";

// Find the div with the id of app in HTML
const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Money Money Money 💰💰💰";
document.title = gameName;

// Add the game name as a header
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Create a display for the current counter value
const counterDisplay = document.createElement("div");
let counter = 0;
counterDisplay.innerHTML = `${counter.toFixed(2)} units`;
app.append(counterDisplay);

const growthRateDisplay = document.createElement("div");
let growthRate = 0; // Initial growth rate, no auto increase initially
growthRateDisplay.innerHTML = `Growth Rate: ${growthRate.toFixed(2)} units/sec`;
app.append(growthRateDisplay);

// Create a display for the items purchased
const itemsPurchasedDisplay = document.createElement("div");
let itemsPurchased = { A: 0, B: 0, C: 0 };
itemsPurchasedDisplay.innerHTML = `Items purchased: A: ${itemsPurchased.A}, B: ${itemsPurchased.B}, C: ${itemsPurchased.C}`;
app.append(itemsPurchasedDisplay);

let priceA = 10;
let priceB = 100;
let priceC = 1000;
// Create the button to click for units
const button = document.createElement("button");
button.innerHTML = "Click me! 😈";
app.append(button);

// Create buttons for upgrades
const upgradeAButton = document.createElement("button");
upgradeAButton.innerHTML = `Buy A (${priceA} units , +0.1 units/sec)`;
upgradeAButton.disabled = true;
app.append(upgradeAButton);

const upgradeBButton = document.createElement("button");
upgradeBButton.innerHTML = `Buy B (${priceB} units , +2.0 units/sec)`;
upgradeBButton.disabled = true;
app.append(upgradeBButton);

const upgradeCButton = document.createElement("button");
upgradeCButton.innerHTML = `Buy C (${priceC} units , +50 units/sec)`;
upgradeCButton.disabled = true;
app.append(upgradeCButton);

let isFirstClick = false;

upgradeAButton.onclick = () => {
  if (counter >= priceA) {
    counter -= priceA;
    growthRate += 0.1;
    itemsPurchased.A += 1;
    priceA *= 1.15;
    updateDisplays();
  }
};

upgradeBButton.onclick = () => {
  if (counter >= priceB) {
    counter -= 100;
    growthRate += 2.0;
    itemsPurchased.B += 1;
    priceB *= 1.15;
    updateDisplays();
  }
};

upgradeCButton.onclick = () => {
  if (counter >= priceC) {
    counter -= 1000;
    growthRate += 50.0;
    itemsPurchased.C += 1;
    priceC *= 1.15;
    updateDisplays();
  }
};

function updateDisplays() {
  counterDisplay.innerHTML = `${counter.toFixed(2)} units`;
  growthRateDisplay.innerHTML = `Growth Rate: ${growthRate.toFixed(2)} units/sec`;
  itemsPurchasedDisplay.innerHTML = `Items purchased: A: ${itemsPurchased.A}, B: ${itemsPurchased.B}, C: ${itemsPurchased.C}`;

  upgradeAButton.innerHTML = `Buy A (${priceA.toFixed(2)} units, +0.1 units/sec)`;
  upgradeBButton.innerHTML = `Buy B (${priceB.toFixed(2)} units, +2.0 units/sec)`;
  upgradeCButton.innerHTML = `Buy C (${priceC.toFixed(2)} units, +50 units/sec)`;
  // Enable/disable upgrade buttons based on current counter
  upgradeAButton.disabled = counter < priceA;
  upgradeBButton.disabled = counter < priceB;
  upgradeCButton.disabled = counter < priceC;
}

let lastFrameTime = 0;

function updateCounter(timestamp: number) {
  if (lastFrameTime === 0) {
    lastFrameTime = timestamp;
  }

  const deltaTime = timestamp - lastFrameTime;
  lastFrameTime = timestamp;

  counter += (growthRate * deltaTime) / 1000;
  updateDisplays();

  // Continue the loop
  requestAnimationFrame(updateCounter);
}

button.onclick = () => {
  counter++; // Increment on click
  button.innerHTML = `🤑🤑🤑`;

  if (!isFirstClick) {
    isFirstClick = true;
    growthRate = 1;
    requestAnimationFrame(updateCounter);
  }

  updateDisplays();
};
