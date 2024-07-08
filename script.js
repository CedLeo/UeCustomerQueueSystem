// Arrays to hold regular customers, priority customers, and currently serving customers
let regularCustomers = [];
let priorityCustomers = [];
let servingCustomersRegular = [];
let servingCustomersPriority = [];
let regularCustomerNumber = 1; // Initialize regular customer number
let priorityCustomerNumber = 1; // Initialize priority customer number

// Function to update the display of regular customers queue
function updateRegularQueueDisplay() {
  document.getElementById("regularQueueCount").textContent =
    regularCustomers.length;
  document.getElementById("regularList").innerHTML = regularCustomers
    .slice(0, 3)
    .map((customer) => `<li>${customer}</li>`)
    .join("");
  document.getElementById("regularList2").innerHTML = regularCustomers
    .slice(3, 6)
    .map((customer) => `<li>${customer}</li>`)
    .join("");
}

// Function to update the display of priority customers queue
function updatePriorityQueueDisplay() {
  document.getElementById("priorityCount").textContent =
    priorityCustomers.length;
  document.getElementById("priorityList").innerHTML = priorityCustomers
    .slice(0, 3)
    .map((customer) => `<li>${customer}</li>`)
    .join("");
  document.getElementById("priorityList2").innerHTML = priorityCustomers
    .slice(3, 6)
    .map((customer) => `<li>${customer}</li>`)
    .join("");
}

// Function to update the display of currently serving customers
function updateServingDisplay() {
  document.getElementById("serving1").textContent =
    servingCustomersRegular.length > 0 ? servingCustomersRegular[0] : "-";
  document.getElementById("serving2").textContent =
    servingCustomersPriority.length > 0 ? servingCustomersPriority[0] : "-";
}

// Function to add a regular customer
function addRegularCustomer() {
  regularCustomers.push(regularCustomerNumber++);
  updateRegularQueueDisplay();
}

// Function to add a priority customer
function addPriorityCustomer() {
  priorityCustomers.push(priorityCustomerNumber++);
  updatePriorityQueueDisplay();
}

// Function to serve next customer
function serveNextCustomer(type) {
  if (type === "regular" && regularCustomers.length > 0) {
    servingCustomersRegular.unshift(regularCustomers.shift());
  } else if (type === "priority" && priorityCustomers.length > 0) {
    servingCustomersPriority.unshift(priorityCustomers.shift());
  }
  updateRegularQueueDisplay();
  updatePriorityQueueDisplay();
  updateServingDisplay();
}

// Event listeners
document.getElementById("addRegular").addEventListener("click", function () {
  addRegularCustomer();
});

document.getElementById("addPriority").addEventListener("click", function () {
  addPriorityCustomer();
});

document.getElementById("nextRegular").addEventListener("click", function () {
  serveNextCustomer("regular");
});

document.getElementById("nextPriority").addEventListener("click", function () {
  serveNextCustomer("priority");
});

document
  .getElementById("resetRegularQueue")
  .addEventListener("click", function () {
    regularCustomers = [];
    regularCustomerNumber = 1; // Reset regular customer number
    updateRegularQueueDisplay();
  });

document
  .getElementById("resetPriorityQueue")
  .addEventListener("click", function () {
    priorityCustomers = [];
    priorityCustomerNumber = 1; // Reset priority customer number
    updatePriorityQueueDisplay();
  });

// Initial display update
updateRegularQueueDisplay();
updatePriorityQueueDisplay();
updateServingDisplay();

// Get all the left and right Windows buttons
const leftWindowsBtns = document.querySelectorAll(".leftWinBtn");
const rightWindowsBtns = document.querySelectorAll(".rightWinBtn");

// Add click event listeners to each left Windows button
leftWindowsBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove the 'selected' class from all left buttons
    leftWindowsBtns.forEach((btn) => {
      btn.classList.remove("selected");
    });
    // Add the 'selected' class to the clicked button
    btn.classList.add("selected");
  });
});

// Add click event listeners to each right Windows button
rightWindowsBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove the 'selected' class from all right buttons
    rightWindowsBtns.forEach((btn) => {
      btn.classList.remove("selected");
    });
    // Add the 'selected' class to the clicked button
    btn.classList.add("selected");
  });
});

function displayNowServing() {
  if (typeof nowservingWindow === "undefined" || nowservingWindow.closed) {
    nowservingWindow = window.open("", "nowServingWindow");
  }
  var regularWindow;
  var priorityWindow;

  // Determine the selected regular window
  const selectedRegularWindow = document.querySelector(".leftWinBtn.selected");
  if (selectedRegularWindow) {
    regularWindow = selectedRegularWindow.textContent.trim();
  }

  // Determine the selected priority window
  const selectedPriorityWindow = document.querySelector(
    ".rightWinBtn.selected"
  );
  if (selectedPriorityWindow) {
    priorityWindow = selectedPriorityWindow.textContent.trim();
  }

  var sound = document.getElementById("sound");
  sound.volume = 0.02;
  sound.play();
  nowservingWindow.document.body.innerHTML =
    nowservingWindow.document.body.innerHTML =
      `<h1 style="font-family:Roboto, sans-serif;font-size:3rem; margin: 0 auto; text-align:center; background:#ba0000; color:white; width:80%;">NOW SERVING</h1>
  <div style="display:flex; flex-direction: row; height:90vh; width: 80%; margin: 0 auto; background:rgba(255, 255, 255, 0.9); text-align:center; justify-content:center; gap:50px;">
    <div style="width:42.5%">
      <h1 style="font-size: 3rem;font-family:Roboto, sans-serif;background-color:#d4d4d4;padding:20px;border-radius:10px;box-shadow:10px 14px 12px -6px rgba(0, 0, 0, 0.75);-webkit-box-shadow:10px 14px 12px -6px rgba(0, 0, 0, 0.75);-moz-box-shadow:10px 14px 12px -6px rgba(0, 0, 0, 0.75);">Regular</h1>
      <h1 style="font-family:arial;font-size:13rem">` +
      (servingCustomersRegular.length > 0 ? servingCustomersRegular[0] : "-") +
      `</h1>
      <h1 style="background-color:#ba0000; color:white; font-family:arial; font-size:2.5rem;">Proceed to ` +
      regularWindow +
      `</h1>
    </div>
    <div style="border-right:3px black solid; height:80%; align-self:center"></div>
    <div style="width:42.5%">
      <h1 style="font-size: 3rem; font-family:Roboto, sans-serif;background-color:#d4d4d4;padding:20px;border-radius:10px;box-shadow:10px 14px 12px -6px rgba(0, 0, 0, 0.75);-webkit-box-shadow:10px 14px 12px -6px rgba(0, 0, 0, 0.75);-moz-box-shadow:10px 14px 12px -6px rgba(0, 0, 0, 0.75);">Priority</h1>
      <h1 style="font-size:13rem; font-family:arial;"> ` +
      (servingCustomersPriority.length > 0
        ? servingCustomersPriority[0]
        : "-") +
      `</h1>
      <h1 style="background-color:#ba0000; color:white; font-family:arial; font-size:2.5rem;">
      Proceed to ` +
      priorityWindow +
      `</h1>
    </div>
  </div>
  <img src="uelogo.png" style="width:40%;position:absolute;top:20%;left:30%;z-index:-10;"/>`;
}
