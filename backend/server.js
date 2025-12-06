const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Base de données en mémoire
let users = [
  { id: 1, name: "Alice", email: "alice@example.com", age: 25, message: "Hello!" },
  { id: 2, name: "Bob", email: "bob@example.com", age: 30, message: "Hi there!" }
];

// GET - Récupérer les utilisateurs
app.get('/api/users', (req, res) => {
  res.json(users);
});

// POST - Ajouter un utilisateur
app.post('/api/users', (req, res) => {
  const { name, email, age, message } = req.body;
  
  const newUser = {
    id: users.length + 1,
    name,
    email,
    age: parseInt(age),
    message
  };
  
  users.push(newUser);
  res.status(201).json({ success: true, user: newUser });
});

// DELETE - Supprimer un utilisateur
app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(user => user.id !== id);
  res.json({ success: true, message: 'Utilisateur supprimé' });
});

app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur http://localhost:${PORT}`);
});