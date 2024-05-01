# TalkTrek

## Требуемое ПО

- node (https://nodejs.org/en/download)
- MySQL Server (mysql-installer-community-8.0.36.0.msi: https://dev.mysql.com/downloads/windows/installer/8.0.html)
- MySQL Workbench (https://dev.mysql.com/downloads/workbench/)

## Подготовка проекта к запуску
  
Ожидается, что на MySql Server был создан пользователь root (пароль root)
Иначе внести соответствующий логин и пароль в server.js:

```js
// server.js
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // сюда вписать логин
    password: 'root', // сюда вписать пароль
    database: 'talkTrek'
});

```
## Подготовка БД

1. Заходим на MySQL сервер (Например MySQL Workbench), логинимся (root)
3. Выполняем скрипты на создание и заполнение бд (в ./src/db лежит два скрипта - create_db.sql и insert.db)
4. Заходим в MySQL CLI, логинимся (root)
   
![](img/Pasted%20image%2020240430023048.png)


5. Выполнить:
```sql

ALTER USER 'username'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password'; -- имя пользователя (username) и пароль (your_password) заменить на соответствующие

FLUSH PRIVILEGES;

```


## Подготовка сервера node

Далее открываем терминал, заходим в папку проекта
`cd путь_до_проекта/talkTrek`

Устанавливаем зависимости проекта
`npm install`

Запускаем сервер проекта
`npm start`

![](img/Pasted%20image%2020240430023139.png)

Сервер проекта будет работать на порте 3000

На локальной машине - "127.0.0.1:3000"

![](img/Pasted%20image%2020240430023215.png)

Чтобы подрубиться с других устройств по локальной сети чекаем адрес в той или иной локалке, выполнив в терминале Windows: "ipconfig" или Mac/Linux: "ifconfig" - один из этих адресов надо будет вписать вместо 127.0.0.1

![](img/Pasted%20image%2020240430023316.png)

Важно, чтобы правила фаервола или брандмауэра не запрещали подключение по порту 3000, иначе с других устройств не получится подключиться (По дефолту на винде это запрещено)
