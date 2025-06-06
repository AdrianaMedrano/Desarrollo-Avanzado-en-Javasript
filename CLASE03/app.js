// Referencias a botones y contenedor
const fetchBtn = document.getElementById('fetch-btn');
const axiosBtn = document.getElementById('axios-btn');
const dataContainer = document.getElementById('data-container');

// Función para renderizar personajes
function renderCharacters(characters, origen) {
  dataContainer.innerHTML = `<p><strong>Datos obtenidos usando: ${origen}</strong></p>`;
  
  characters.forEach(character => {
    const characterElement = document.createElement('div');
    characterElement.classList.add('character');
    characterElement.innerHTML = `
      <h3>${character.name}</h3>
      <img src="${character.image}" alt="${character.name}">
    `;
    dataContainer.appendChild(characterElement);
  });
}

// FETCH: requiere .json() y verificar manualmente response.ok
fetchBtn.addEventListener('click', () => {
  dataContainer.innerHTML = '<p>Cargando datos con <strong>fetch</strong>...</p>';
  
  fetch('https://rickandmortyapi.com/api/character')
    .then(response => {
      console.log('[Fetch] response:', response); // Mostrar el objeto Response
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      return response.json(); // Se convierte manualmente
    })
    .then(data => {
      console.log('[Fetch] data (ya convertido):', data);
      renderCharacters(data.results, 'fetch');
    })
    .catch(error => {
      console.error('[Fetch] Error:', error);
      dataContainer.innerHTML = '<p>Error al obtener datos con <strong>fetch</strong>.</p>';
    });
});

// AXIOS: ya devuelve un objeto JavaScript (response.data)
axiosBtn.addEventListener('click', () => {
  dataContainer.innerHTML = '<p>Cargando datos con <strong>axios</strong>...</p>';
  
  axios.get('https://rickandmortyapi.com/api/character')
    .then(response => {
      console.log('[Axios] response:', response);        // Mostrar el objeto completo
      console.log('[Axios] response.data:', response.data); // Ya viene en JSON
      renderCharacters(response.data.results, 'axios');
    })
    .catch(error => {
      console.error('[Axios] Error:', error);
      dataContainer.innerHTML = '<p>Error al obtener datos con <strong>axios</strong>.</p>';
    });
});
