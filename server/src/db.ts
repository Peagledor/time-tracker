// src/db.ts
import sqlite3 from 'sqlite3';
import { Database } from 'sqlite3';

const db = new sqlite3.Database('timetracker.db');

const initDb = () => {
  db.serialize(() => {
    // Time entries table
    db.run(`
      CREATE TABLE IF NOT EXISTS time_entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_id INTEGER,
        start_time DATETIME NOT NULL,
        end_time DATETIME,
        description TEXT,
        FOREIGN KEY(client_id) REFERENCES clients(id)
      )
    `);

    // Clients table
    db.run(`
      CREATE TABLE IF NOT EXISTS clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT,
        rate_per_hour DECIMAL(10,2)
      )
    `);

    // Invoices table
    db.run(`
      CREATE TABLE IF NOT EXISTS invoices (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_id INTEGER NOT NULL,
        invoice_number TEXT NOT NULL,
        issued_date DATE NOT NULL,
        due_date DATE NOT NULL,
        status TEXT DEFAULT 'draft',
        FOREIGN KEY(client_id) REFERENCES clients(id)
      )
    `);
  });
};

export { db, initDb };