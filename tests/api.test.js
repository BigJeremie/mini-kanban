const request = require('supertest');
const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

const DATA_FILE = './tasks.json';

// Simule juste ta route GET ici
app.get('/tasks', (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(tasks);
});

describe('GET /tasks', () => {
  it('devrait retourner un tableau', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
