const { DatabaseSync } = require('node:sqlite');
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'data', 'tasks.db');
const MIGRATION_PATH = path.join(__dirname, '..', 'db', 'migrations', '001_init.sql');

function initDb() {
  const dataDir = path.dirname(DB_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const db = new DatabaseSync(DB_PATH);
  db.exec('PRAGMA journal_mode = WAL');

  const migration = fs.readFileSync(MIGRATION_PATH, 'utf8');
  db.exec(migration);

  const { count } = db.prepare('SELECT COUNT(*) AS count FROM tasks').get();
  if (count === 0) {
    const insert = db.prepare(`
      INSERT INTO tasks (title, description, status, due_date) VALUES (?, ?, ?, ?)
    `);
    insert.run('Review project requirements', 'Read capstone brief and identify gaps', 'done', '2026-08-10');
    insert.run('Set up development environment', 'Install Node.js and dependencies', 'in_progress', '2026-08-15');
    insert.run('Implement task CRUD API', 'Basic REST endpoints for tasks', 'todo', '2026-08-20');
  }

  return db;
}

const db = initDb();

module.exports = db;
