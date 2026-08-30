-- Migration number: 0001 	 2026-08-27T23:34:56.632Z
CREATE TABLE IF NOT EXISTS entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    status TEXT NOT NULL DEFAULT 'approved',
    ip_hash TEXT
);

CREATE INDEX IF NOT EXISTS idx_entries_created_at ON entries (created_at DESC);