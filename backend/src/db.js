const { DatabaseSync } = require('node:sqlite');
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'data', 'tasks.db');
const MIGRATIONS_DIR = path.join(__dirname, '..', 'db', 'migrations');

function runMigrations(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id TEXT PRIMARY KEY,
      applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  const applied = new Set(
    db.prepare('SELECT id FROM schema_migrations').all().map((row) => row.id)
  );

  const files = fs.readdirSync(MIGRATIONS_DIR).sort();
  for (const file of files) {
    if (!file.endsWith('.sql')) continue;
    const id = file.replace('.sql', '');
    if (applied.has(id)) continue;

    const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, file), 'utf8');
    db.exec(sql);
    db.prepare('INSERT INTO schema_migrations (id) VALUES (?)').run(id);
  }

  // Remove legacy tasks without an owner after auth migration
  const taskCols = db.prepare('PRAGMA table_info(tasks)').all();
  if (taskCols.some((col) => col.name === 'user_id')) {
    db.exec('DELETE FROM tasks WHERE user_id IS NULL');
  }
}

function initDb() {
  const dataDir = path.dirname(DB_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const db = new DatabaseSync(DB_PATH);
  db.exec('PRAGMA journal_mode = WAL');
  runMigrations(db);
  return db;
}

const db = initDb();

module.exports = db;
