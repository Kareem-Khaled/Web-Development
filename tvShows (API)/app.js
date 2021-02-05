
async function getShows() {
    const res = await axios.get(`http://api.tvmaze.com/search/shows?q=${form.elements.searchInput.value}`);
    return res.data;
}

async function addShows() {
    clearimgs();
    const shows = await getShows();
    for (res of shows) {
        if (res.show.image) {
            const img = document.createElement('img');
            img.src = res.show.image.medium;
            document.body.append(img);
        }
    }
}

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    addShows();
})

function clearimgs() {
    const imgs = document.querySelectorAll('img');
    for (img of imgs) {
        document.body.removeChild(img);
    }
}