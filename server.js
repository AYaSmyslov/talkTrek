const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname)));

app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'talkTrek'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/templates/pages/auth.html'));
});

app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.pass, 10);
        const newUser = { login: req.body.login, pass: hashedPassword, date_registration: new Date(), date_last_login: new Date() };
        const sql = 'INSERT INTO users SET ?';
        db.query(sql, newUser, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.status(201).send('User registered');
        });
    } catch {
        res.status(500).send('Server error');
    }
});



function generateSessionToken() {
    return Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
}

  

app.post('/login', async (req, res) => {
    const { login, pass } = req.body;
    const sql = 'SELECT * FROM users WHERE login = ?';
    db.query(sql, [login], async (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            const user = result[0];
            const match = await bcrypt.compare(pass, user.pass);
            if (match) {
                const sessionToken = generateSessionToken(); 
                const updateSql = 'UPDATE users SET date_last_login = ?, sessionToken = ? WHERE id_user = ?';
                db.query(updateSql, [new Date(), sessionToken, user.id_user], (err, result) => {
                    if (err) throw err;
                    // res.status(200).send('User logged in');
                });

                // res.status(200).send('User logged in');
                const responseData = {
                    id_user: user.id_user,
                    sessionToken: sessionToken
                };

                res.status(200).send(responseData);
            } else {
                res.status(401).send('Incorrect password');
            }
        } else {
            res.status(404).send('User not found');
        }
    });
});



const thresholdMinutes = 5;
app.post('/checkSession', (req, res) => {
    const sessionData = req.body;
    if (!sessionData) {
        res.sendStatus(401);
        return;
    }

    // const cookieData = JSON.parse(sessionData);

    const sql = 'SELECT * FROM users WHERE id_user = ? AND sessionToken = ? AND TIMESTAMPDIFF(MINUTE, date_last_login, NOW()) < ?;';
    db.query(sql, [sessionData.id_user, sessionData.sessionToken, thresholdMinutes], (err, result) => {
        if (err) {
            console.error('Ошибка выполнения SQL-запроса:', err);
            res.sendStatus(500); // Если произошла ошибка при выполнении запроса, возвращаем статус ошибки сервера
            return;
        }
        if (result.length > 0) {
            res.sendStatus(200); 
        } else {
            res.sendStatus(401); 
        }
    });
});



app.post('/getUserName', (req, res) => {
    const sessionData = req.body;
    
    const sql = 'SELECT * FROM users WHERE id_user = ? AND sessionToken = ? AND TIMESTAMPDIFF(MINUTE, date_last_login, NOW()) < ?;';
    db.query(sql, [sessionData.id_user, sessionData.sessionToken, thresholdMinutes], (err, result) => {
        if (err) {
            console.error('Ошибка выполнения SQL-запроса:', err);
            res.sendStatus(500); // Если произошла ошибка при выполнении запроса, возвращаем статус ошибки сервера
            return;
        }
        if (result.length > 0) {
            // (result[0].login);
            res.status(200).send(result[0].login); 
        } else {
            res.sendStatus(401); 
        }
    });
});



app.post('/updLogin', (req, res) => {
    const requestData = req.body;
    let cookieData = JSON.parse(requestData.cookieData);
    const sqlCheck = 'SELECT * FROM users WHERE id_user = ? AND sessionToken = ? AND TIMESTAMPDIFF(MINUTE, date_last_login, NOW()) < ?;';
    db.query(sqlCheck, [cookieData.id_user, cookieData.sessionToken, thresholdMinutes], (err, result) => {
        if (err) {
            console.error('Ошибка выполнения SQL-запроса:', err);
            res.sendStatus(500); // Если произошла ошибка при выполнении запроса, возвращаем статус ошибки сервера
            return;
        }
        if (result.length > 0) {
            const updateSql = 'UPDATE users SET login = ? WHERE id_user = ?';
            db.query(updateSql, [requestData.username,  cookieData.id_user], (err, result) => {
                if (err) throw err;
                res.sendStatus(200);
            });
        } else {
            res.sendStatus(401); 
        }
    });
});



app.post('/updPass', async (req, res) => {
    const requestData = req.body;
    let cookieData = JSON.parse(requestData.cookieData);
    const sqlCheck = 'SELECT * FROM users WHERE id_user = ? AND sessionToken = ? AND TIMESTAMPDIFF(MINUTE, date_last_login, NOW()) < ?;';
    db.query(sqlCheck, [cookieData.id_user, cookieData.sessionToken, thresholdMinutes], async (err, result) => {
        if (err) {
            console.error('Ошибка выполнения SQL-запроса:', err);
            res.sendStatus(500); // Если произошла ошибка при выполнении запроса, возвращаем статус ошибки сервера
            return;
        }
        if (result.length > 0) {
            const match = await bcrypt.compare(requestData.oldPass, result[0].pass);
            if (match) {
                const hashedPassword = await bcrypt.hash(requestData.newPass, 10);
                const updateSql = 'UPDATE users SET pass = ? WHERE id_user = ?';
                db.query(updateSql, [hashedPassword,  cookieData.id_user], (err, result) => {
                    if (err) throw err;
                    res.sendStatus(200);
                });
            }
        } else {
            res.sendStatus(401); 
        }
    });
});



app.listen(3000, () => {
    console.log('Server started on port 3000');
});

// if (document.cookie.indexOf("sessionToken") == 0) {
//     console.log('Куки есть');
    
// }else{
//     console.log('Куки нет');
// }
// alert( document.cookie ); 