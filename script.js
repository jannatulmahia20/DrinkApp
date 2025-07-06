const drinks = [
  {
    name: 'Mojito',
    category: 'Cocktail',
    instructions: 'Muddle mint leaves with sugar and lime juice.',
    image: 'https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg',
    glass: 'Highball glass',
    alcoholic: 'Alcoholic'
  },
  {
    name: 'Martini',
    category: 'Cocktail',
    instructions: 'Stir in a mixing glass with ice cubes.',
    image: 'https://www.thecocktaildb.com/images/media/drink/71t8581504353095.jpg',
    glass: 'Cocktail glass',
    alcoholic: 'Alcoholic'
  },
  {
    name: 'Blue Margarita',
    category: 'Cocktail',
    instructions: 'Rub the rim of the glass with the lime slice.',
    image: 'https://www.thecocktaildb.com/images/media/drink/bry4qh1582751040.jpg',
    glass: 'Cocktail glass',
    alcoholic: 'Alcoholic'
  },
  // New drinks added here
  {
    name: 'Pina Colada',
    category: 'Cocktail',
    instructions: 'Blend all ingredients with ice until smooth.',
    image: 'https://www.thecocktaildb.com/images/media/drink/cpf4j51504371346.jpg',
    glass: 'Hurricane glass',
    alcoholic: 'Alcoholic'
  },
  {
    name: 'Strawberry Daiquiri',
    category: 'Cocktail',
    instructions: 'Blend strawberries, rum, lime juice, and sugar with ice.',
    image: 'https://www.thecocktaildb.com/images/media/drink/mrz9091589574515.jpg',
    glass: 'Cocktail glass',
    alcoholic: 'Alcoholic'
  }
  

  
  
  
];

let group = [];

function displayDrinks(list) {
  const container = document.getElementById('drinkCards');
  container.innerHTML = '';
  document.getElementById('notFoundMessage').style.display = list.length === 0 ? 'block' : 'none';

  list.forEach(drink => {
    const card = document.createElement('div');
    card.className = 'drink-card';
    card.innerHTML = `
      <img src="${drink.image}" alt="${drink.name}" />
      <h3>${drink.name}</h3>
      <p><strong>Category:</strong> ${drink.category}</p>
      <p><strong>Instructions:</strong> ${drink.instructions.slice(0, 15)}...</p>
      <button onclick="addToGroup('${drink.name}')">Add to Group</button>
      <button onclick="showDetails(${JSON.stringify(drink).replace(/"/g, '&quot;')})">Details</button>
    `;
    container.appendChild(card);
  });
}

function searchDrink() {
  const query = document.getElementById('searchInput').value.toLowerCase().trim();
  const result = drinks.filter(drink => drink.name.toLowerCase().includes(query));
  displayDrinks(result);
  
}

function addToGroup(name) {
  if (group.length >= 7) {
    alert("You can't add more than 7 drinks!");
    return;
  }
  if (!group.includes(name)) {
    group.push(name);
    updateGroup();
    showToast(`${name} added to group`);
  }

}

function updateGroup() {
  const list = document.getElementById('groupList');
  const count = document.getElementById('groupCount');
  list.innerHTML = '';
  group.forEach(drink => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${drink}
      <button onclick="removeFromGroup('${drink}')" style="margin-left: 10px;">❌</button>
    `;
    list.appendChild(li);
  });
  count.textContent = group.length;
}

function removeFromGroup(name) {
  group = group.filter(drink => drink !== name);
  updateGroup();
}


function showDetails(drink) {
  document.getElementById('modalTitle').textContent = drink.name;
  document.getElementById('modalImg').src = drink.image;
  document.getElementById('modalCategory').textContent = 'Category: ' + drink.category;
  document.getElementById('modalInstructions').textContent = 'Instructions: ' + drink.instructions;
  document.getElementById('modalGlass').textContent = 'Glass: ' + drink.glass;
  document.getElementById('modalType').textContent = 'Type: ' + drink.alcoholic;

  const modal = document.getElementById('modal');
  modal.classList.add('show');  // fade in
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.classList.remove('show'); // fade out
}


window.onload = () => {
  displayDrinks(drinks);
};

function showToast(message) {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #198754;
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    z-index: 1000;
    opacity: 0.95;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
  
}
// toggle button dark mode
const toggleBtn = document.getElementById('darkModeToggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
}

toggleBtn.addEventListener('click', () => {
  if (document.documentElement.getAttribute('data-theme') === 'dark') {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }
});


