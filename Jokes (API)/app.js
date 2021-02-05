const button = document.querySelector('#button');
const jokes = document.querySelector('#jokes');

async function getJoke() {
    const config = {
        headers: { Accept: 'application/json' }
    }
    const newJoke = await axios.get(' https://icanhazdadjoke.com/', config);
    return newJoke.data.joke;
}

async function addJoke() {
    const newJoke = document.createElement('li');
    newJoke.append(await getJoke());
    jokes.append(newJoke);
}

button.addEventListener('click', addJoke);