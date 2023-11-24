const clubList = document.getElementById('club-list');
const searchInput = document.getElementById('search');
const clubDetailsContainer = document.getElementById('main');

searchInput.addEventListener('input', handleSearchInput);

let clubData = footballClubs;
displayClubs(footballClubs);

function displayClubs(clubs) {
    const clubCardsHTML = clubs.map(createClubCardHTML).join('');
    clubList.innerHTML = clubCardsHTML;
};

function createClubCardHTML(club) {
    return `
        <div class="club-card" onclick="handleClubClick(this);">
            <h2>${club.name}</h2>
            <img src="${club.image}" alt="${club.name} Image" style="width:150px; height:150px;">
            <p><b>League: </b>${club.league}</p>
            <p><b>City: </b>${club.city}</p>
            <button onclick="viewClubPlayers('${club.name}'); event.stopPropagation();" style="width:100%;">View Players</button>
        </div>
    `
};

function handleClubClick(element) {
    const clickedClub = element.querySelector('h2').textContent;
    const foundClub = footballClubs.find(club => club.name === clickedClub);
    displayClubDetails(foundClub);
};

function displayClubDetails(club) {
    const clubDetailsHTML = `
        <div>
            <button onclick="window.location.href='index.html';">Back</button>
            <h2>${club.name}</h2>
            <img src="${club.image}" alt="${club.name} Image" style="width:300px; height:300px;">
            <p><b>League: </b>${club.league}</p>
            <p><b>City: </b>${club.city}</p>
            <p><b>Stadium: </b>${club.stadium}</p>
            <button onclick="viewClubPlayers('${club.name}'); event.stopPropagation();" style="width:100%;">View Players</button>
            <p><b>Description: </b>${club.description}</p>
        </div>
    `
    clubDetailsContainer.innerHTML = clubDetailsHTML;
};

function viewClubPlayers(clubName) {
    const selectedClub = clubData.find(club => club.name === clubName);
    const playerDetailsHTML = `
        <div>
            <button onclick="window.location.href='index.html';">Back</button>
            <h2>${selectedClub.name} Players</h2>
            ${selectedClub.players.map(player => `
                <p><b>Name: </b>${player.name}</p>
                <p><b>Position: </b>${player.position}</p>
                <p><b>Goals: </b>${player.goals}</p>
                <p><b>Assists: </b>${player.assists}</p>
                <hr>
            `).join('')}
        </div>
    `
    clubDetailsContainer.innerHTML = playerDetailsHTML;
};

function handleSearchInput() {
    let searchElement = document.querySelector('#search');
    let searchTerm = searchElement.value.toLowerCase();
    const teamsArray = [];
    footballClubs.forEach(team => {
        const { name, image, league, city } = team;
        teamsArray.push({ name, image, league, city });
    });
    let teamFilter = teamsArray.filter(team => team.name.toLowerCase().includes(searchTerm));
    displayClubs(teamFilter);
};