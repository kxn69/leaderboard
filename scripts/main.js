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
const playerDetails = document.querySelectorAll('.player-details')

const dateAdded = document.querySelectorAll('.date-added');
dateAdded.forEach((date) => {
    date.textContent = updateTime()
})

//
addPlayer.addEventListener('click', e => {
    e.preventDefault();

    const fname = firstName.value;
    const lname = lastName.value;
    const pCountry = country.value;
    const pScore = Number(score.value);

    if (fname === '' || lname === '' || pCountry === '' || pScore === '') {
        warning.innerHTML = 'All fields are required'
    } else {
        warning.innerHTML = '';
        firstName.value = '';
        lastName.value = '';
        country.value = '';
        score.value= '';
        
        const playerDetailsDiv =  document.createElement('div')
        playerDetailsDiv.classList.add('player-details');

        const inlineBtnSpan = document.createElement('span')
        inlineBtnSpan.classList.add('inline-btn');

        const nameDateSpan = document.createElement('span');
        nameDateSpan.classList.add('name-date');

        const playerNameSpan = document.createElement('span');
        playerNameSpan.classList.add('player-name');
        playerNameSpan.textContent = `${fname} ${lname}`;

        const dateAddedSpan = document.createElement('span');
        dateAddedSpan.classList.add('date-added');
        dateAddedSpan.textContent = updateTime();

        nameDateSpan.appendChild(playerNameSpan);
        nameDateSpan.appendChild(dateAddedSpan);

        const playerCountrySpan = document.createElement('span')
        playerCountrySpan.classList.add('player-country');
        playerCountrySpan.textContent = pCountry;

        const playerScoreSpan = document.createElement('span')
        playerScoreSpan.classList.add('player-score');
        playerScoreSpan.textContent = pScore;

        const deleteBtnDiv = document.createElement('div')
        deleteBtnDiv.classList.add('delete-btn', 'sml-btn');
        const icon = document.createElement('i');
        icon.classList.add('fa-regular', 'fa-trash-can');
        deleteBtnDiv.appendChild(icon);

        const addBtnDiv = document.createElement('div')
        addBtnDiv.classList.add('add-btn', 'sml-btn');
        addBtnDiv.textContent = '+5'

        const subBtnDiv = document.createElement('div')
        subBtnDiv.classList.add('subtract-btn', 'sml-btn');
        subBtnDiv.textContent = '-5';

        inlineBtnSpan.appendChild(deleteBtnDiv);
        inlineBtnSpan.appendChild(addBtnDiv);
        inlineBtnSpan.appendChild(subBtnDiv);

        playerDetailsDiv.appendChild(nameDateSpan);
        playerDetailsDiv.appendChild(playerCountrySpan);
        playerDetailsDiv.appendChild(playerScoreSpan);
        playerDetailsDiv.appendChild(inlineBtnSpan);

        playersLogDiv.appendChild(playerDetailsDiv);

        //event listeners for delete add and subtract classes
        const deleteBtn = playerDetailsDiv.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', (e) => {
            const parentElement = e.target.closest('.player-details');

            parentElement.style.opacity = 0;
            setTimeout(() => {
                parentElement.style.display = 'none';
                parentElement.remove();
            }, 500);
        });

        const addBtn = playerDetailsDiv.querySelector('.add-btn');
        addBtn.addEventListener('click', (e) => {
            const playerDetails = e.target.closest('.player-details');
            const playerScoreDiv = playerDetails.querySelector('.player-score');
            const currentScore = parseInt(playerScoreDiv.textContent);
            const updatedScore = currentScore + 5;

            playerScoreDiv.textContent = updatedScore;

            sortPlayerDetails();
        });

        const subBtn = playerDetailsDiv.querySelector('.subtract-btn');
        subBtn.addEventListener('click', (e) => {
            const playerDetails = e.target.closest('.player-details');
            const playerScoreDiv = playerDetails.querySelector('.player-score');
            const currentScore = parseInt(playerScoreDiv.textContent);
            const updatedScore = currentScore - 5;

            playerScoreDiv.textContent = updatedScore;
            
            sortPlayerDetails();
        });
        sortPlayerDetails();
       
    }      
})


deleteButtons.forEach((delBtn) => {
    delBtn.addEventListener('click', (e) => {
        const parentElement = e.target.closest('.player-details')
    
            parentElement.style.opacity = 0;
            setTimeout(() => {
                parentElement.style.display = 'none';
                parentElement.remove();
            }, 500);
    })
})

addFiveButtons.forEach((addButton) => {
    addButton.addEventListener('click', (e) => {
        const playerDetails = e.target.closest('.player-details');
        const playerScoreValue = playerDetails.querySelector('.player-score');
        
        const currentScore = parseInt(playerScoreValue.innerHTML);
        const updatedScore = currentScore + 5;

        playerScoreValue.innerHTML = updatedScore;

        sortPlayerDetails();
    })
})

subFiveButtons.forEach((subButton) => {
    subButton.addEventListener('click', (e) => {
        const playerDetails = e.target.closest('.player-details');
        const playerScoreValue = playerDetails.querySelector('.player-score');

        const currentScore = parseInt(playerScoreValue.innerHTML);
        const updatedScore = currentScore - 5;

        playerScoreValue.innerHTML = updatedScore;

        sortPlayerDetails();
    })
})

function sortPlayerDetails() {
    const playerDetailsArray = Array.from(document.getElementsByClassName('player-details'));
    const sortedPlayerDetails = playerDetailsArray.sort((a, b) => {
    const scoreA = parseInt(a.querySelector('.player-score').textContent);
    const scoreB = parseInt(b.querySelector('.player-score').textContent);
    return scoreB - scoreA;
});
    sortedPlayerDetails.forEach((details) => {
      playersLogDiv.appendChild(details);
    });
  }

sortPlayerDetails();

function updateTime() {
    const currentTime = new Date();
    const hour = currentTime.getHours();
    const minute = currentTime.getMinutes();
    const options = { month: 'short',  year: 'numeric', day: 'numeric' };
    const currentDate = currentTime.toLocaleDateString('en-US', options);
    return `${currentDate} ${hour}:${minute}`
}

// call the updateTime function
updateTime()