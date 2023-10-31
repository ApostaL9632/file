const express = require("express")
const bodyParser = require("body-parser")
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('users.db');
const cors = require("cors")
const { open } = require('sqlite')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

// Создаем таблицу пользователей, если ее нет
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  password TEXT NOT NULL
)`);

// Функция регистрации нового пользователя
function registerUser(username, password) {
  return new Promise((resolve, reject) => {
    // Проверяем, существует ли пользователь с таким же именем
    db.get('SELECT COUNT(*) as count FROM users WHERE username = ?', [username], (err, row) => {
      if (err) {
        reject(err.message);
      } else if (row.count > 0) {
        reject('Пользователь с таким именем уже существует');
      } else {
        // Вставляем нового пользователя в базу данных
        db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], function(err) {
          if (err) {
            reject(err.message);
          } else {
            resolve(`Пользователь успешно зарегистрирован с ID: ${this.lastID}`);
          }
        });
      }
    });
  });
}




// app.get("/", (req, res) => {
//     res.send("Проверка")

// })






app.listen(3000, () => {
    console.log("rabotaet" + 3000)
  })