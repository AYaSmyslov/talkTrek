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
        const sql = 'INSERT IGNORE INTO users SET ?';
        db.query(sql, newUser, (err, result) => {
            if (err) throw err;
            console.log(result);
            if (result.affectedRows == 0)
            {
                res.status(500).send('User registered');
            }
            else {
                res.status(201).send('User registered');
            }
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
            res.status(200).send({ message: result[0].login }); 
        } else {
            res.sendStatus(401); 
        }
    });
});



app.post('/getCntPassTests', async (req, res) => {
    const requestData = req.body;
    const thresholdMinutes = 60; 
    const sqlCheck = 'SELECT * FROM users WHERE id_user = ? AND sessionToken = ? AND TIMESTAMPDIFF(MINUTE, date_last_login, NOW()) < ?;';
    db.query(sqlCheck, [requestData.id_user, requestData.sessionToken, thresholdMinutes], async (err, result) => {
        if (err) {
            console.error('Ошибка выполнения SQL-запроса:', err);
            res.sendStatus(500);
            return;
        }
        if (result.length > 0) {
            const selectSql = `SELECT COUNT(*) AS tests_passed
            FROM test
            WHERE id_test IN (
                SELECT id_test
                FROM test_results
                WHERE id_user = ?
            );
        `;
            db.query(selectSql, [requestData.id_user], (err, result) => {
                if (err) throw err;
                res.status(200).send({message: result});
            });
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
            const updateSql = 'UPDATE IGNORE  users SET login = ? WHERE id_user = ?';
            db.query(updateSql, [requestData.username,  cookieData.id_user], (err, result) => {
                if (err) throw err;
                console.log(result.message.includes('Changed: 0'));
                if (result.message.includes('Changed: 0')) {
                    console.log('Имя пользователя недоступно');
                    res.sendStatus(500);
                    return;
                }
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
            res.sendStatus(500);
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



app.post('/getTopics', async (req, res) => {
    const requestData = req.body;
    const sqlCheck = 'SELECT * FROM users WHERE id_user = ? AND sessionToken = ? AND TIMESTAMPDIFF(MINUTE, date_last_login, NOW()) < ?;';
    db.query(sqlCheck, [requestData.id_user, requestData.sessionToken, thresholdMinutes], async (err, result) => {
        if (err) {
            console.error('Ошибка выполнения SQL-запроса:', err);
            res.sendStatus(500);
            return;
        }
        if (result.length > 0) {
            const selectSql = `SELECT CONCAT(c.title, '-', ll.title, '-', t.title) AS combined_title,
                            t.descr,
                            t.timeRead,
                            t.link,
                            CASE WHEN ut.id_user IS NOT NULL THEN true ELSE false END AS readed
                            FROM topic t
                            JOIN language_levels ll ON t.id_levels = ll.id_levels
                            JOIN course c ON ll.id_course = c.id_course
                            LEFT JOIN user_topic ut ON t.id_topic = ut.id_topic AND ut.id_user = ?;`;
            db.query(selectSql, [requestData.id_user], (err, result) => {
                if (err) throw err;
                res.status(200).send({message: result});
            });
        } else {
            res.sendStatus(401); 
        }
    });
});

app.post('/getTests', async (req, res) => {
    const requestData = req.body;
    const sqlCheck = 'SELECT * FROM users WHERE id_user = ? AND sessionToken = ? AND TIMESTAMPDIFF(MINUTE, date_last_login, NOW()) < ?;';
    db.query(sqlCheck, [requestData.id_user, requestData.sessionToken, thresholdMinutes], async (err, result) => {
        if (err) {
            console.error('Ошибка выполнения SQL-запроса:', err);
            res.sendStatus(500);
            return;
        }
        if (result.length > 0) {
            const selectSql = `SELECT 
                                    t.*, 
                                    COUNT(q.id_question) AS question_count, 
                                    COALESCE(tr.score, 0) AS score
                                FROM 
                                    test t
                                LEFT JOIN 
                                    question q ON t.id_test = q.id_test
                                LEFT JOIN 
                                    test_results tr ON t.id_test = tr.id_test AND tr.id_user = ?
                                GROUP BY 
                                    t.id_test;
            `;
            db.query(selectSql, [requestData.id_user], (err, result) => {
                if (err) throw err;
                res.status(200).send({message: result});
            });
        } else {
            res.sendStatus(401); 
        }
    });
});

app.post('/markReaded', (req, res) => {
    const requestData = req.body;
    let cookieData = JSON.parse(requestData.cookieData);
    const thresholdMinutes = 60; 
    const sqlCheck = 'SELECT * FROM users WHERE id_user = ? AND sessionToken = ? AND TIMESTAMPDIFF(MINUTE, date_last_login, NOW()) < ?;';
    db.query(sqlCheck, [cookieData.id_user, cookieData.sessionToken, thresholdMinutes], (err, result) => {
        if (err) {
            console.error('Ошибка выполнения SQL-запроса:', err);
            res.sendStatus(500);
            return;
        }
        if (result.length > 0) {
            const thresholdMinutes = 60; // Пороговое значение времени здесь

            const sqlGetTopicId = 'SELECT id_topic FROM topic WHERE link = ?';
            db.query(sqlGetTopicId, [requestData.link], (err, topicResult) => {
                if (err) {
                    console.error('Ошибка при выполнении SQL-запроса:', err);
                    res.sendStatus(500);
                    return;
                }
                if (topicResult.length === 0) {
                    console.error('Тема не найдена');
                    res.sendStatus(404);
                    return;
                }

                
                const id_topic = topicResult[0].id_topic;
                console.log('id_topic ', id_topic);
                const sqlInsert = 'INSERT IGNORE INTO user_topic (id_user, id_topic) VALUES (?, ?)';
                db.query(sqlInsert, [cookieData.id_user, id_topic], (err, insertResult) => {
                    if (err) {
                        console.error('Ошибка при выполнении SQL-запроса:', err);
                        res.sendStatus(500);
                        return;
                    }
                    res.sendStatus(200);
                });
            });
            // const updateSql = 'UPDATE users SET login = ? WHERE id_user = ?';
            // db.query(updateSql, [requestData.username,  cookieData.id_user], (err, result) => {
            //     if (err) throw err;
            //     res.sendStatus(200);
            // });
        } else {
            res.sendStatus(401); 
        }
    });
});



app.post('/getTestById', async (req, res) => {
    const requestData = req.body;
    let cookieData = JSON.parse(requestData.cookieData);
    const thresholdMinutes = 60; 
    const sqlCheck = 'SELECT * FROM users WHERE id_user = ? AND sessionToken = ? AND TIMESTAMPDIFF(MINUTE, date_last_login, NOW()) < ?;';
    db.query(sqlCheck, [cookieData.id_user, cookieData.sessionToken, thresholdMinutes], async (err, result) => {
        if (err) {
            console.error('Ошибка выполнения SQL-запроса:', err);
            res.sendStatus(500);
            return;
        }
        if (result.length > 0) {
            const selectSql = `SELECT 
                                q.descr AS question,
                                q.question_type,
                                CASE 
                                    WHEN q.question_type = 1 THEN MAX(a.is_correct) 
                                    ELSE GROUP_CONCAT(CASE WHEN a.is_correct = 1 THEN a.title ELSE NULL END ORDER BY a.id_answer SEPARATOR ';')
                                END AS correct,
                                GROUP_CONCAT(DISTINCT a.title ORDER BY a.id_answer SEPARATOR ';') AS options
                            FROM 
                                question q
                            JOIN 
                                answer a ON q.id_question = a.id_question
                            WHERE 
                                q.id_test = ?
                            GROUP BY 
                                q.id_question;
        `;
            db.query(selectSql, [requestData.testId], (err, result) => {
                if (err) throw err;
                res.status(200).send({message: result});
            });
            // const selectSql = `SELECT CONCAT(c.title, '-', ll.title, '-', t.title) AS combined_title,
            //                 t.descr,
            //                 t.timeRead,
            //                 t.link,
            //                 CASE WHEN ut.id_user IS NOT NULL THEN true ELSE false END AS readed
            //                 FROM topic t
            //                 JOIN language_levels ll ON t.id_levels = ll.id_levels
            //                 JOIN course c ON ll.id_course = c.id_course
            //                 LEFT JOIN user_topic ut ON t.id_topic = ut.id_topic AND ut.id_user = ?;`;
            // db.query(selectSql, [requestData.id_user], (err, result) => {
            //     if (err) throw err;
            //     console.log('ok');
            //     res.status(200).send({message: result});
            // });
        } else {
            res.sendStatus(401); 
        }
    });
});



app.post('/saveTestRes', async (req, res) => {
    const requestData = req.body;
    let cookieData = JSON.parse(requestData.cookieData);
    const thresholdMinutes = 60; 
    const sqlCheck = 'SELECT * FROM users WHERE id_user = ? AND sessionToken = ? AND TIMESTAMPDIFF(MINUTE, date_last_login, NOW()) < ?;';
    try {
    db.query(sqlCheck, [cookieData.id_user, cookieData.sessionToken, thresholdMinutes], async (err, result) => {
        if (err) {
            console.error('Ошибка выполнения SQL-запроса:', err);
            res.sendStatus(500);
            return;
        }
        if (result.length > 0) {
            const selectSql = `INSERT INTO test_results (id_user, id_test, score)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE score = VALUES(score);
        `;
            db.query(selectSql, [cookieData.id_user, requestData.testId, requestData.score], (err, result) => {
                if (err) throw err;
                res.status(200).send({message: result});
            });
        } else {
            res.sendStatus(401); 
        }
    });
} catch (error) {
    // Обработка ошибки
    console.error('Произошла ошибка:', error.message);
    // Дополнительные действия при необходимости
}
});



app.post('/getNotPassedTests', async (req, res) => {
    const requestData = req.body;
    const thresholdMinutes = 60; 
    const sqlCheck = 'SELECT * FROM users WHERE id_user = ? AND sessionToken = ? AND TIMESTAMPDIFF(MINUTE, date_last_login, NOW()) < ?;';
    db.query(sqlCheck, [requestData.id_user, requestData.sessionToken, thresholdMinutes], async (err, result) => {
        if (err) {
            console.error('Ошибка выполнения SQL-запроса:', err);
            res.sendStatus(500);
            return;
        }
        if (result.length > 0) {
            const selectSql = `SELECT COUNT(*) AS tests_not_passed
                                FROM test
                                WHERE id_test NOT IN (
                                    SELECT id_test
                                    FROM test_results
                                    WHERE id_user = ?
                                );
        `;
            db.query(selectSql, [requestData.id_user], (err, result) => {
                if (err) throw err;
                res.status(200).send({message: result});
            });
        } else {
            res.sendStatus(401); 
        }
    });
});



app.post('/getNotReadedManuals', async (req, res) => {
    const requestData = req.body;
    const thresholdMinutes = 60; 
    const sqlCheck = 'SELECT * FROM users WHERE id_user = ? AND sessionToken = ? AND TIMESTAMPDIFF(MINUTE, date_last_login, NOW()) < ?;';
    db.query(sqlCheck, [requestData.id_user, requestData.sessionToken, thresholdMinutes], async (err, result) => {
        if (err) {
            console.error('Ошибка выполнения SQL-запроса:', err);
            res.sendStatus(500);
            return;
        }
        if (result.length > 0) {
            const selectSql = `SELECT COUNT(*) AS manuals_not_readed
                                FROM topic
                                WHERE id_topic NOT IN (
                                    SELECT id_topic
                                    FROM user_topic
                                    WHERE id_user = ?
                                );
        `;
            db.query(selectSql, [requestData.id_user], (err, result) => {
                if (err) throw err;
                res.status(200).send({message: result});
            });
        } else {
            res.sendStatus(401); 
        }
    });
});



app.post('/sendMessage', async (req, res) => {
    const requestData = req.body;
    let cookieData = JSON.parse(requestData.cookieData);
    const thresholdMinutes = 60; 
    const sqlCheck = 'SELECT * FROM users WHERE id_user = ? AND sessionToken = ? AND TIMESTAMPDIFF(MINUTE, date_last_login, NOW()) < ?;';
    db.query(sqlCheck, [cookieData.id_user, cookieData.sessionToken, thresholdMinutes], async (err, result) => {
        if (err) {
            console.error('Ошибка выполнения SQL-запроса:', err);
            res.sendStatus(500);
            return;
        }
        if (result.length > 0) {
            const insertSql = `INSERT INTO dialogue (content, date_sent, id_user) 
            VALUES (?, ?, ?);
            
        `;
            db.query(insertSql, [requestData.msg, new Date(), cookieData.id_user], (err, result) => {
                if (err) throw err;
                res.sendStatus(200);
            });
        } else {
            res.sendStatus(401); 
        }
    });
});



app.post('/getMsgHistory10', async (req, res) => {
    const requestData = req.body;
    const sqlCheck = 'SELECT * FROM users WHERE id_user = ? AND sessionToken = ? AND TIMESTAMPDIFF(MINUTE, date_last_login, NOW()) < ?;';
    db.query(sqlCheck, [requestData.id_user, requestData.sessionToken, thresholdMinutes], async (err, result) => {
        if (err) {
            console.error('Ошибка выполнения SQL-запроса:', err);
            res.sendStatus(500);
            return;
        }
        if (result.length > 0) {
            const selectSql = `SELECT dialogue.*, users.login
                                FROM dialogue
                                INNER JOIN users ON dialogue.id_user = users.id_user
                                ORDER BY dialogue.date_sent DESC
                                LIMIT 10;
            `;
            db.query(selectSql, [], (err, result) => {
                if (err) throw err;
                res.status(200).send({message: result});
            });
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