const baseUel = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
const container = document.querySelector('.container');
for (let i = 1; i < 100; i++) {
    const div = document.createElement('div');
    div.classList.add('pokemon');
    const span = document.createElement('span');
    span.innerText = `#${i}`;
    const img = document.createElement('img');
    img.src = baseUel + `${i}.png`;

    div.appendChild(img);
    div.appendChild(span);
    container.appendChild(div);
}