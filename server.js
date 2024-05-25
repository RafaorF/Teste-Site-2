const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database(':memory:');

// Criar tabela para lista de compras
db.serialize(() => {
  db.run("CREATE TABLE shopping_list (id INTEGER PRIMARY KEY, item TEXT)");
});

// Rota para adicionar item
app.post('/add-item', (req, res) => {
  const item = req.body.item;
  db.run("INSERT INTO shopping_list (item) VALUES (?)", [item], function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(200).send({ id: this.lastID, item: item });
  });
});

// Rota para obter todos os itens
app.get('/items', (req, res) => {
  db.all("SELECT * FROM shopping_list", [], (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(200).json(rows);
  });
});

// Rota para servir o arquivo index.html (login)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para servir o arquivo site.html (lista de compras)
app.get('/shopping', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'site.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
