PRAGMA defer_foreign_keys=TRUE;
CREATE TABLE d1_migrations(
		id         INTEGER PRIMARY KEY AUTOINCREMENT,
		name       TEXT UNIQUE,
		applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
INSERT INTO "d1_migrations" ("id","name","applied_at") VALUES(1,'0001_create_entries_table.sql','2026-08-30 03:33:51');
INSERT INTO "d1_migrations" ("id","name","applied_at") VALUES(2,'0002_add_email_column.sql','2026-08-30 03:33:51');
CREATE TABLE entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    status TEXT NOT NULL DEFAULT 'approved',
    ip_hash TEXT
, email TEXT);
INSERT INTO "entries" ("id","name","message","created_at","status","ip_hash","email") VALUES(1,'Kason','Rats','2026-08-30 03:59:59','approved',NULL,'bader.kason@gmail.com');
INSERT INTO "entries" ("id","name","message","created_at","status","ip_hash","email") VALUES(2,'Plantera','you make me so gassy','2026-08-30 04:07:28','approved',NULL,'plantera20000@gmail.com');
INSERT INTO "entries" ("id","name","message","created_at","status","ip_hash","email") VALUES(3,'Lulu','stop throwing shit at me','2026-09-02 18:52:35','approved',NULL,NULL);
INSERT INTO "entries" ("id","name","message","created_at","status","ip_hash","email") VALUES(4,'grab ass','I’m going to dig in yo butt','2026-09-03 20:14:34','approved',NULL,NULL);
DELETE FROM sqlite_sequence;
INSERT INTO "sqlite_sequence" ("name","seq") VALUES('d1_migrations',2);
INSERT INTO "sqlite_sequence" ("name","seq") VALUES('entries',4);
CREATE INDEX idx_entries_created_at ON entries (created_at DESC);
