/* eslint-disable space-before-function-paren */
/* eslint-disable semi */

// get add-player, delete, add and subtract btn
const addPlayer = document.getElementById('add-player');
const deleteButtons = document.querySelectorAll('.delete-btn');
const addFiveButtons = document.querySelectorAll('.add-btn');
const subFiveButtons = document.querySelectorAll('.subtract-btn');

// first-name, last-name, country and score ids
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const country = document.getElementById('country');
const score = document.getElementById('score');
const warning = document.querySelector('.warning');

const playersLogDiv = document.querySelector('.players-log');

const dateAdded = document.querySelectorAll('.date-added');
dateAdded.forEach((date) => {
  date.textContent = updateTime();
})

function handleDelBtn(e) {
  const parentElement = e.target.closest('.player-details');

  parentElement.style.opacity = 0;
  setTimeout(() => {
    parentElement.remove();
  }, 500);
}

function handleAddBtn(e) {
  const playerDetails = e.target.closest('.player-details');
  const playerScoreValue = playerDetails.querySelector('.player-score');

  const currentScore = parseInt(playerScoreValue.innerHTML);
  const updatedScore = currentScore + 5;

  playerScoreValue.textContent = updatedScore;

  sortPlayerDetails();
}

function handleSubtractBtn(e) {
  const playerDetails = e.target.closest('.player-details');
  const playerScoreValue = playerDetails.querySelector('.player-score');

  const currentScore = parseInt(playerScoreValue.innerHTML);
  const updatedScore = currentScore - 5;

  playerScoreValue.textContent = updatedScore;

  sortPlayerDetails();
}

function sortPlayerDetails() {
  const playerDetailsArray = Array.from(document.querySelectorAll('.player-details'));

  const sortedPlayerDetails = playerDetailsArray.sort((a, b) => {
    const scoreA = parseInt(a.querySelector('.player-score').textContent);
    const scoreB = parseInt(b.querySelector('.player-score').textContent);
    return scoreB - scoreA;
  });

  sortedPlayerDetails.forEach((details) => {
    playersLogDiv.appendChild(details);
  });
}

function updateTime() {
  const currentTime = new Date();
  const hour = currentTime.getHours();
  const minute = currentTime.getMinutes();
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  const currentDate = currentTime.toLocaleDateString('en-US', options);
  return `${currentDate} ${hour}:${minute}`
}

function createNewPlayer(e) {
  e.preventDefault();

  const fname = firstName.value;
  const lname = lastName.value;
  const pCountry = country.value;
  const pScore = parseInt(score.value);

  if (fname === '' || lname === '' || pCountry === '' || pScore === '') {
    warning.hidden = false;
  }
  warning.hidden = true;
  firstName.value = '';
  lastName.value = '';
  country.value = '';
  score.value = '';

  const playerDetailsDiv = document.createElement('div');
  playerDetailsDiv.classList.add('player-details');

  const html = `<span class="name-date">
                  <span class="player-name">${fname} ${lname}</span>
                  <span class="date-added">${updateTime()}</span>
                </span>
                <span class="player-country">${pCountry}</span>
                <span class="player-score">${pScore}</span>
                <span class="inline-btn">
                  <div class="delete-btn sml-btn"><i class="fa-regular fa-trash-can"></i></div>
                  <div class="add-btn sml-btn">+5</div>
                  <div class="subtract-btn sml-btn">-5</div>
                </span>       
                `

  playerDetailsDiv.innerHTML = html;
  console.log(playerDetailsDiv)
  playersLogDiv.appendChild(playerDetailsDiv);

  // event listeners for delete add and subtract classes
  const deleteBtn = playerDetailsDiv.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', handleDelBtn);

  const addBtn = playerDetailsDiv.querySelector('.add-btn');
  addBtn.addEventListener('click', handleAddBtn);

  const subBtn = playerDetailsDiv.querySelector('.subtract-btn');
  subBtn.addEventListener('click', handleSubtractBtn);

  sortPlayerDetails();
}

deleteButtons.forEach((delBtn) => delBtn.addEventListener('click', handleDelBtn))
addFiveButtons.forEach((addButton) => addButton.addEventListener('click', handleAddBtn))
subFiveButtons.forEach((subButton) => subButton.addEventListener('click', handleSubtractBtn))
addPlayer.addEventListener('click', createNewPlayer)
