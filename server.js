const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(require('cors')());

const DATA_FILE = './tasks.json';

// Lire les tâches
app.get('/tasks', (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(tasks);
});

// Ajouter une tâche
app.post('/tasks', (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(DATA_FILE));
  const newTask = {
    id: Date.now(),
    title: req.body.title,
    status: 'TODO'
  };
  tasks.push(newTask);
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks));
  res.json(newTask);
});

// Modifier une tâche (changement de statut par exemple)
app.put('/tasks/:id', (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(DATA_FILE));
  const id = parseInt(req.params.id);
  const updatedTasks = tasks.map(task =>
    task.id === id ? { ...task, ...req.body } : task
  );
  fs.writeFileSync(DATA_FILE, JSON.stringify(updatedTasks));
  res.json({ message: 'Tâche mise à jour' });
});

app.listen(PORT, () => {
  console.log(`Serveur backend lancé sur http://localhost:${PORT}`);
});
