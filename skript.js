const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();

app.use(cors()); 
app.use(express.json());

// База данных SQLite — идеальна для 1 Гб ОЗУ
const db = new sqlite3.Database('./sprint.db');
db.run("CREATE TABLE IF NOT EXISTS users (phone TEXT PRIMARY KEY)");

app.post('/login', (req, res) => {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ error: "No phone" });

    // Просто записываем номер в базу без СМС
    db.run("INSERT OR IGNORE INTO users (phone) VALUES (?)", [phone], (err) => {
        if (err) return res.status(500).json({ error: "DB Error" });
        res.json({ success: true });
    });
});

app.listen(3000, '0.0.0.0', () => {
    console.log('Sprint Backend: ONLINE');
    console.log('Port: 3000');
});