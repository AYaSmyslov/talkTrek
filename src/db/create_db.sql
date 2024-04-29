CREATE DATABASE talkTrek;
USE talkTrek;

CREATE TABLE course (
    id_course INTEGER  AUTO_INCREMENT,
    title VARCHAR (255) ,
    -- id_levels INTEGER ,
    PRIMARY KEY (id_course)
    -- FOREIGN KEY (id_levels) REFERENCES language_levels(id_levels) ON DELETE CASCADE
);

CREATE TABLE language_levels (
    id_levels INTEGER  AUTO_INCREMENT,
    title VARCHAR (255) ,
    descr VARCHAR (255) ,
    id_course INTEGER ,
    PRIMARY KEY (id_levels),
    FOREIGN KEY (id_course) REFERENCES course(id_course) ON DELETE CASCADE
);

CREATE TABLE topic (
    id_topic INTEGER  AUTO_INCREMENT,
    title VARCHAR (255) ,
    descr VARCHAR (255) ,
    id_levels INTEGER,
    timeRead INTEGER,
    link VARCHAR (255), 
    PRIMARY KEY (id_topic),
    FOREIGN KEY (id_levels) REFERENCES language_levels(id_levels) ON DELETE CASCADE
    -- FOREIGN KEY (id_course) REFERENCES course(id_course) ON DELETE CASCADE
);


CREATE TABLE test (
    id_test INTEGER  AUTO_INCREMENT,
    title VARCHAR (255) ,
    descr VARCHAR (255) ,
    PRIMARY KEY (id_test)
    -- FOREIGN KEY (id_levels) REFERENCES language_levels(id_levels) ON DELETE CASCADE
    -- FOREIGN KEY (id_course) REFERENCES course(id_course) ON DELETE CASCADE
);

CREATE TABLE question (
    id_question INTEGER  AUTO_INCREMENT,
    descr VARCHAR (255) ,
    id_test INTEGER,
    question_type INTEGER,
    PRIMARY KEY (id_question),
    FOREIGN KEY (id_test) REFERENCES test(id_test) ON DELETE CASCADE
);

CREATE TABLE answer (
    id_answer INTEGER  AUTO_INCREMENT,
    title VARCHAR (255) ,
    is_correct BOOLEAN,
    id_question INTEGER,
    PRIMARY KEY (id_answer),
    FOREIGN KEY (id_question) REFERENCES question(id_question) ON DELETE CASCADE
);


CREATE TABLE users (
    id_user INTEGER  AUTO_INCREMENT,
    sex CHAR(1) ,
    login VARCHAR (100) UNIQUE,
    pass VARCHAR (100) ,
    date_registration DATETIME ,
    date_last_login DATETIME ,
    url_user_image VARCHAR (255),
    id_levels INTEGER ,
    sessionToken VARCHAR(100),
    PRIMARY KEY (id_user)
    -- FOREIGN KEY (id_levels) REFERENCES language_levels(id_levels) ON DELETE CASCADE
);

CREATE TABLE dialogue (
    id_dialogue INTEGER  AUTO_INCREMENT,
    content VARCHAR (3000) ,
    date_sent DATETIME ,
    id_user INTEGER,
    PRIMARY KEY (id_dialogue),
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE
);

CREATE TABLE user_topic (
    id_user INTEGER,
    id_topic INTEGER,
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE,
    FOREIGN KEY (id_topic) REFERENCES topic(id_topic) ON DELETE CASCADE,
    PRIMARY KEY (id_user, id_topic)
);

CREATE TABLE test_results (
    id_result INTEGER AUTO_INCREMENT PRIMARY KEY,
    id_user INTEGER,
    id_test INTEGER,
    score INTEGER,
    UNIQUE KEY unique_user_test (id_user, id_test),
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE,
    FOREIGN KEY (id_test) REFERENCES test(id_test) ON DELETE CASCADE
);







