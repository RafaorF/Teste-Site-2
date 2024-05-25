document.getElementById('add-item-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const itemInput = document.getElementById('item');
  const item = itemInput.value;

  fetch('/add-item', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ item: item })
  })
  .then(response => response.json())
  .then(data => {
    addItemToDOM(data.item, data.id);
    itemInput.value = '';
  })
  .catch(error => console.error('Error:', error));
});

function addItemToDOM(item, id) {
  const listItem = document.createElement('li');
  listItem.textContent = item;
  document.getElementById('shopping-list').appendChild(listItem);
}

function loadItems() {
  fetch('/items')
  .then(response => response.json())
  .then(items => {
    items.forEach(item => {
      addItemToDOM(item.item, item.id);
    });
  })
  .catch(error => console.error('Error:', error));
}

// Carregar itens ao iniciar a página
document.addEventListener('DOMContentLoaded', loadItems);
