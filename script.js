const API_URL = 'http://localhost:3000/tasks';

document.getElementById('taskForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('taskTitle').value;
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  });
  document.getElementById('taskTitle').value = '';
  loadTasks();
});

async function loadTasks() {
  const res = await fetch(API_URL);
  const tasks = await res.json();

  const lists = {
    'TODO': document.getElementById('todoList'),
    'IN PROGRESS': document.getElementById('progressList'),
    'DONE': document.getElementById('doneList'),
  };

  for (const list of Object.values(lists)) list.innerHTML = '';

  tasks.forEach(task => {
    const div = document.createElement('div');
    div.className = 'task';
    div.textContent = task.title;

    ['TODO', 'IN PROGRESS', 'DONE'].forEach(status => {
      if (status !== task.status) {
        const btn = document.createElement('button');
        btn.textContent = `→ ${status}`;
        btn.onclick = () => updateTaskStatus(task.id, status);
        div.appendChild(btn);
      }
    });

    lists[task.status].appendChild(div);
  });
}

async function updateTaskStatus(id, status) {
  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  loadTasks();
}

loadTasks();
