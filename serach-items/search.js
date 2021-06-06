const formEl = document.getElementById('form'),
    playersContainer = document.querySelector('.players-main'),
    searchBar = document.getElementById('search-bar'),
    loading = document.getElementById('loading'),
    error = document.querySelector('.error'),
    playersMain = document.querySelector('.players');

loading.remove();


let allPlayers = []
    // Form submition
formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    // search bar value
    const searchVal = searchBar.value.toLowerCase();
    const filtered = allPlayers.filter((filt) => {
        return filt.competition.name.toLowerCase().includes(searchVal);
    })
    if (searchVal === '') {
        error.innerHTML = 'Enter any league name';
        error.classList.add('showError');
    } else if (filtered.length === 0) {
        error.innerHTML = 'Enter a valid league name';
        error.classList.add('showError');
    } else {
        error.innerHTML = `Search Result for "${searchVal}"`;
        error.classList.remove('showError')
        searchBar.value = '';
        document.body.appendChild(loading);
        document.body.classList.add('overlay');
        setTimeout(() => {
            loading.remove();
            document.body.classList.remove('overlay');
        }, 1000);

        setTimeout(() => {
            showOutput(filtered);
            playersMain.style.display = 'block'
        }, 2000);
    }
});


// Getting data from api with axios
function playersData() {
    const options = {
        url: "https://free-football-soccer-videos.p.rapidapi.com/",
        method: 'GET',
        headers: {
            "x-rapidapi-key": "aaf9d55d6dmshd6a2dc87e648964p11f8a8jsn5533666c75b0",
            "x-rapidapi-host": "free-football-soccer-videos.p.rapidapi.com"
        }
    }

    axios.request(options)
        .then(res => {
            allPlayers = res.data;
            showOutput(allPlayers)
            console.log(allPlayers)
        })
        .catch(err => console.error(err))
}

// show output to the DOM

function showOutput(getTeam) {
    const allDat = getTeam.map((teams) => {
        return `
        <div class="card">
            <img src="${teams.thumbnail}" alt="">
            <div class="card-body">
                <h5 class="card-title">${teams.competition.name}</h5>
                <h6 class="sub-title">${teams.title}</h6>
                <p class="card-text">${teams.date}</p>
                <a href="${teams.url}" target="_blank">Visit for more</a>
            </div>
        </div>
        `
    }).join('')

    playersContainer.innerHTML = allDat;
}

playersData();