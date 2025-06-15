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
  }
}

function updateGroup() {
  const list = document.getElementById('groupList');
  const count = document.getElementById('groupCount');
  list.innerHTML = '';
  group.forEach(drink => {
    const li = document.createElement('li');
    li.textContent = drink;
    list.appendChild(li);
  });
  count.textContent = group.length;
}

function showDetails(drink) {
  document.getElementById('modalTitle').textContent = drink.name;
  document.getElementById('modalImg').src = drink.image;
  document.getElementById('modalCategory').textContent = 'Category: ' + drink.category;
  document.getElementById('modalInstructions').textContent = 'Instructions: ' + drink.instructions;
  document.getElementById('modalGlass').textContent = 'Glass: ' + drink.glass;
  document.getElementById('modalType').textContent = 'Type: ' + drink.alcoholic;
  document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

window.onload = () => {
  displayDrinks(drinks);
};
