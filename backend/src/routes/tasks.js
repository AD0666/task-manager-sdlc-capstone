const express = require('express');
const db = require('../db');

const router = express.Router();

const VALID_STATUSES = ['todo', 'in_progress', 'done'];

router.get('/', (req, res) => {
  const { status, q } = req.query;
  let sql = 'SELECT * FROM tasks WHERE 1=1';
  const params = [];

  if (status && status !== 'all') {
    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({ error: 'Invalid status filter' });
    }
    sql += ' AND status = ?';
    params.push(status);
  }

  if (q && typeof q === 'string' && q.trim()) {
    const term = `%${q.trim()}%`;
    sql += ' AND (title LIKE ? OR description LIKE ?)';
    params.push(term, term);
  }

  sql += ' ORDER BY created_at DESC';
  const tasks = db.prepare(sql).all(...params);
  res.json(tasks);
});

router.get('/:id', (req, res) => {
  const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
});

router.post('/', (req, res) => {
  const { title, description = '', status = 'todo', due_date = null } = req.body;

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'Title is required' });
  }
  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  const stmt = db.prepare(`
    INSERT INTO tasks (title, description, status, due_date)
    VALUES (?, ?, ?, ?)
  `);
  const result = stmt.run(title.trim(), description, status, due_date);

  const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(task);
});

router.put('/:id', (req, res) => {
  const existing = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.id);
  if (!existing) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const { title, description, status, due_date } = req.body;
  const updated = {
    title: title !== undefined ? title : existing.title,
    description: description !== undefined ? description : existing.description,
    status: status !== undefined ? status : existing.status,
    due_date: due_date !== undefined ? due_date : existing.due_date,
  };

  if (!updated.title || typeof updated.title !== 'string' || !updated.title.trim()) {
    return res.status(400).json({ error: 'Title is required' });
  }
  if (!VALID_STATUSES.includes(updated.status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  db.prepare(`
    UPDATE tasks
    SET title = ?, description = ?, status = ?, due_date = ?, updated_at = datetime('now')
    WHERE id = ?
  `).run(updated.title.trim(), updated.description, updated.status, updated.due_date, req.params.id);

  const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.id);
  res.json(task);
});

router.delete('/:id', (req, res) => {
  const result = db.prepare('DELETE FROM tasks WHERE id = ?').run(req.params.id);
  if (result.changes === 0) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.status(204).send();
});

module.exports = router;
