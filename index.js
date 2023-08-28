
const apiURL = 'https://swapi.dev/api/people';
const characterList = document.getElementById('characterList');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const characterInfoTable = document.getElementById('characterInfo');

let currentPage = 1;

// функція яка витягує дані від  API
async function fetchCharacters(page) {
  const response = await fetch(`${apiURL}/?page=${page}`);
  const data = await response.json();

 
  while (characterList.firstChild) {
    characterList.firstChild.remove();
  }

  // добавляємо нові ел до списків героїв
  data.results.forEach(character => {
    const characterItem = document.createElement('button');
    characterItem.textContent = character.name;
    characterItem.addEventListener('click', () => {
      showCharacterInfo(character);
    });
    characterList.appendChild(characterItem);
  });

}

// Функція яка показує інформацію героя
function showCharacterInfo(character) {
 
  while (characterInfoTable.firstChild) {
    characterInfoTable.firstChild.remove();
  }

  //  таблиця з інформацією героя
  const keys = Object.keys(character);
  keys.forEach(key => {
    const row = document.createElement('tr');
    const cell1 = document.createElement('th');
    cell1.textContent = key;
    const cell2 = document.createElement('td');
    cell2.textContent = character[key];
    row.appendChild(cell1);
    row.appendChild(cell2);
    characterInfoTable.appendChild(row);
  });

  // Показувати таблицю з інформацією 
  characterInfoTable.style.display = 'table';
}

// Обробка на натискання на кнопки "Назад" и "Вперед"
prevBtn.addEventListener('click', () => {
  currentPage--;
  fetchCharacters(currentPage);
});

nextBtn.addEventListener('click', () => {
  currentPage++;
  fetchCharacters(currentPage);
});


fetchCharacters(currentPage);

