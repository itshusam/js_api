
const publicKey = '3a55aeef83f55cc3123bf3f66a454253';
const privateKey = '8aaf49a22ce44e482f233043e2d6083f7264b81b';
const baseURL = 'https://gateway.marvel.com/v1/public/characters';
const ts = new Date().getTime();
const hash = md5(ts + privateKey + publicKey);

function md5(string) {
    return CryptoJS.MD5(string).toString();
}

async function fetchMarvelCharacters() {
    const url = `${baseURL}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const characters = data.data.results;

        const characterContainer = document.getElementById('character-container');
        characterContainer.innerHTML = '';

        characters.forEach(character => {
            const characterElement = document.createElement('div');
            characterElement.classList.add('character');

            characterElement.innerHTML = `
                <h3>${character.name}</h3>
                <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
                <p>${character.description || 'No description available.'}</p>
            `;

            characterContainer.appendChild(characterElement);
        });
    } catch (error) {
        console.error('Error fetching characters:', error);
    }
}

document.getElementById('load-characters').addEventListener('click', fetchMarvelCharacters);
