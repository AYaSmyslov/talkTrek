USE talkTrek;

INSERT INTO course (title) VALUES 
('Английский'),
('Немецкий'),
('Японский'),
('Китайский'),
('Казахский'),
('Беларусский'),
('Дореволюционный');


INSERT INTO language_levels (title, descr, id_course) VALUES 
('Beginner', 'Основной уровень для начинающих', 1),
('Elementary', 'Базовый уровень для изучающих', 1),
('Pre-Intermediate', 'Промежуточный уровень для изучающих', 1),
('Intermediate', 'Промежуточный уровень', 1),
('Upper-Intermediate', 'Продвинутый промежуточный уровень', 1),
('Advanced', 'Продвинутый уровень', 1),
('Proficiency', 'Ты - профи', 1);

INSERT INTO topic (title, descr, timeRead, link, id_levels) VALUES 
('greetingss and Introductions', 'Expressions for greetingss and introductions',  5, 'greetings', 1),
('Basic Communication Phrases', 'Useful phrases for everyday communication',  5, 'useful_phrases',1),

('Shopping and Ordering Food', 'Phrases for shopping and ordering food',  15, 'shopping_and_food', 2),
('Describing People and Appearances', 'Expressions for describing people and their appearances', 10,'descriptions', 2),

('Travel Planning', 'Conversational topics about travel planning', 30,'travel-planning', 3),
('Entertainment and Hobbies', 'Discussion about entertainment and hobbies', 15, 'entertainment-hobbies',3),

('Work and Career', 'Discussion about work and career', 10,'work-career', 4),
('Discussing News and Events', 'Conversations about current events and news', 20,'news-events', 4),

('Business and Professional Life', 'Conversational topics about business and professional life', 15,'business-professional-life', 5),
('Politics and Social Issues', 'Discussion about politics and social issues', 20,'politics-social-issues', 5),

('Scientific Research and Academic Life', 'Conversational topics about scientific research and academic life', 15,'scientific-research-academic-life', 6),
('Philosophy and Art', 'Discussion about philosophical research and art', 30,'philosophy-art', 6),

('Literature and Culture', 'Discussion about literature and culture', 10,'literature-culture', 7),
('Language Study and Linguistics', 'Conversational topics about language study and linguistics', 25,'language-linguistics', 7);

INSERT INTO test (title, descr)
VALUES 
('greetingss and Introductions', 'Expressions for greetingss and introductions'),
('Basic Communication Phrases', 'Useful phrases for everyday communication'),
('Shopping and Ordering Food', 'Phrases for shopping and ordering food'),
('Describing People and Appearances', 'Expressions for describing people and their appearances'),
('Travel Planning', 'Conversational topics about travel planning'),
('Entertainment and Hobbies', 'Discussion about entertainment and hobbies'),
('Work and Career', 'Discussion about work and career'),
('Discussing News and Events', 'Conversations about current events and news'),
('Business and Professional Life', 'Conversational topics about business and professional life'),
('Politics and Social Issues', 'Discussion about politics and social issues'),
('Scientific Research and Academic Life', 'Conversational topics about scientific research and academic life'),
('Philosophy and Art', 'Discussion about philosophical research and art'),
('Literature and Culture', 'Discussion about literature and culture'),
('Language Study and Linguistics', 'Conversational topics about language study and linguistics');


-- ТЕСТ 1 --------------------------------------------------------------------------------------------------------
INSERT INTO question (descr, id_test, question_type)
VALUES 
('What is a common greeting in English?', 1, 1), -- Тип вопроса: 1 (один правильный ответ)
('How do you say "hello" in Spanish?', 1, 1),
('What is the correct response to "How are you?"', 1, 1),
('Which of the following is a polite way to introduce yourself?', 1, 1),
('How do you say "goodbye" in French?', 1, 1),
('Select the common greeting phrases in English.', 1, 2), -- Тип вопроса: 2 (один или несколько правильных ответов)
('Select the phrases that can be used to introduce yourself.', 1, 2),
('Choose the phrases that can be used to respond to "How are you?"', 1, 2),
('Which phrases are commonly used for saying goodbye?', 1, 2),
('Choose the correct responses to the given greetings.', 1, 2),
('What is the correct response to the greeting "Nice to meet you"?', 1, 3), -- Тип вопроса: 3 (один правильный ответ без выбора)
('How would you respond to "Thank you" in English?', 1, 3),
('What is an appropriate response to "Good morning" in English?', 1, 3),
('How do you reply to "See you later" in English?', 1, 3),
('What would you say in response to "Excuse me" in English?', 1, 3);

-- Вопросы с типом 1 (один правильный ответ)
INSERT INTO answer (title, is_correct, id_question)
VALUES 
('Hello', TRUE, 1), -- Правильный ответ на вопрос 1
('Goodbye', FALSE, 1),
('Thank you', FALSE, 1),
('How are you?', FALSE, 1),

('Hola', TRUE, 2), -- Правильный ответ на вопрос 2
('Buenos días', FALSE, 2),
('Adiós', FALSE, 2),
('Gracias', FALSE, 2),

('I am fine, thank you.', TRUE, 3), -- Правильный ответ на вопрос 3
('I am fine, thank you. And you?', FALSE, 3),
('Goodbye', FALSE, 3),
('Thank you', FALSE, 3),

('Nice to meet you.', TRUE, 4), -- Правильный ответ на вопрос 4
('See you later.', FALSE, 4),
('Goodbye', FALSE, 4),
('How are you?', FALSE, 4),

('Au revoir', TRUE, 5), -- Правильный ответ на вопрос 5
('Bonjour', FALSE, 5),
('Merci', FALSE, 5),
('Ça va?', FALSE, 5),

-- Вопросы с типом 2 (один или несколько правильных ответов)
('Hello', TRUE, 6), -- Правильный ответ на вопрос 6
('Goodbye', TRUE, 6),
('Thank you', FALSE, 6),
('How are you?', FALSE, 6),

('Hola', TRUE, 7), -- Правильный ответ на вопрос 7
('Buenos días', TRUE, 7),
('Adiós', FALSE, 7),
('Gracias', FALSE, 7),

('I am fine, thank you.', TRUE, 8), -- Правильный ответ на вопрос 8
('I am fine, thank you. And you?', FALSE, 8),
('Goodbye', FALSE, 8),
('Thank you', FALSE, 8),

('Nice to meet you.', TRUE, 9), -- Правильный ответ на вопрос 9
('See you later.', TRUE, 9),
('Goodbye', FALSE, 9),
('How are you?', FALSE, 9),

('Au revoir', TRUE, 10), -- Правильный ответ на вопрос 10
('Bonjour', FALSE, 10),
('Merci', FALSE, 10),
('Ça va?', FALSE, 10),

-- Вопросы с типом 3 (один правильный ответ без выбора)
('Goodbye', TRUE, 11), -- Правильный ответ на вопрос 11
('Buenas tardes', TRUE, 12), -- Правильный ответ на вопрос 12
('Fine, thank you. And you?', TRUE, 13), -- Правильный ответ на вопрос 13
('See you later.', TRUE, 14), -- Правильный ответ на вопрос 14
('Excuse me.', TRUE, 15); -- Правильный ответ на вопрос 15

-- ТЕСТ 2 --------------------------------------------------------------------------------------------------------
INSERT INTO question (descr, id_test, question_type)
VALUES 
('What is a common greeting in English?', 2, 1), -- Тип вопроса: 1 (один правильный ответ)
('How do you ask "How are you?" in English?', 2, 1),
('Select the common phrases for saying "thank you" in English.', 2, 2), -- Тип вопроса: 2 (один или несколько правильных ответов)
('Select the phrases that can be used to say "goodbye" in English.', 2, 2),
('What is the correct response to "Nice to meet you" in English?', 2, 3); -- Тип вопроса: 3 (один правильный ответ без выбора)

-- Вставка ответов
INSERT INTO answer (title, is_correct, id_question)
VALUES 
('Hello', TRUE, 16), -- Правильный ответ на вопрос 1
('Hi', FALSE, 16),
('Goodbye', FALSE, 16),
('How are you?', FALSE, 16),

('How are you?', TRUE, 17), -- Правильный ответ на вопрос 2
('What is your name?', FALSE, 17),
('Thank you', FALSE, 17),
('Goodbye', FALSE, 17),

('Thank you', TRUE, 18), -- Правильный ответ на вопрос 3
('Thanks', TRUE, 18),
('Goodbye', FALSE, 18),
('How are you?', FALSE, 18),

('Goodbye', TRUE, 19), -- Правильный ответ на вопрос 4
('See you later', TRUE, 19),
('Thank you', FALSE, 19),
('How are you?', FALSE, 19),

('Nice to meet you too.', TRUE, 20); -- Правильный ответ на вопрос 5


-- ТЕСТ 3 --------------------------------------------------------------------------------------------------------
INSERT INTO question (descr, id_test, question_type)
VALUES 
('Which of the following is a common phrase when ordering food?', 3, 1), -- Тип вопроса: 1 (один правильный ответ)
('What is the correct way to ask for the bill in a restaurant?', 3, 1),
('Select the phrases used for shopping in English.', 3, 2), -- Тип вопроса: 2 (один или несколько правильных ответов)
('Choose the phrases that can be used when ordering food in a restaurant.', 3, 2),
('What is an appropriate response to "How much does it cost?" in English?', 3, 3); -- Тип вопроса: 3 (один правильный ответ без выбора)

-- Вставка ответов
INSERT INTO answer (title, is_correct, id_question)
VALUES 
('I would like to order...', TRUE, 21), -- Правильный ответ на вопрос 1
('Where is the restroom?', FALSE, 21),
('Thank you', FALSE, 21),
('How are you?', FALSE, 21),

('Can I have the bill, please?', TRUE, 22), -- Правильный ответ на вопрос 2
('Is the food good?', FALSE, 22),
('What is your name?', FALSE, 22),
('Goodbye', FALSE, 22),

('How much does it cost?', TRUE, 23), -- Правильный ответ на вопрос 3
('Where is the supermarket?', TRUE, 23),
('Thank you', FALSE, 23),
('How are you?', FALSE, 23),

('I would like to buy...', TRUE, 24), -- Правильный ответ на вопрос 4
('What time is it?', FALSE, 24),
('Nice to meet you', FALSE, 24),
('How much does it cost?', FALSE, 24),

('It costs $10.', TRUE, 25); -- Правильный ответ на вопрос 5

-- ТЕСТ 4 --------------------------------------------------------------------------------------------------------
INSERT INTO question (descr, id_test, question_type)
VALUES 
('Which of the following phrases can be used to describe someone''s appearance?', 4, 1), -- Тип вопроса: 1 (один правильный ответ)
('What is a common way to describe someone''s personality?', 4, 1),
('Select the phrases that can be used to describe clothing in English.', 4, 2), -- Тип вопроса: 2 (один или несколько правильных ответов)
('Choose the phrases that can be used to compliment someone''s appearance.', 4, 2),
('What is an appropriate response to "You look nice today" in English?', 4, 3); -- Тип вопроса: 3 (один правильный ответ без выбора)

-- Вставка ответов
INSERT INTO answer (title, is_correct, id_question)
VALUES 
('She has long hair.', TRUE, 26), -- Правильный ответ на вопрос 1
('He likes pizza.', FALSE, 26),
('Thank you', FALSE, 26),
('How are you?', FALSE, 26),

('She is friendly and outgoing.', TRUE, 27), -- Правильный ответ на вопрос 2
('She has blue eyes.', FALSE, 27),
('Goodbye', FALSE, 27),
('How are you?', FALSE, 27),

('She is wearing a red dress.', TRUE, 28), -- Правильный ответ на вопрос 3
('He is tall.', TRUE, 28),
('Thank you', FALSE, 28),
('How are you?', FALSE, 28),

('You have a beautiful smile.', TRUE, 29), -- Правильный ответ на вопрос 4
('I like your shoes.', TRUE, 29),
('Goodbye', FALSE, 29),
('How are you?', FALSE, 29),

('Thank you', TRUE, 30); -- Правильный ответ на вопрос 5

-- ТЕСТ 5 --------------------------------------------------------------------------------------------------------
INSERT INTO question (descr, id_test, question_type)
VALUES 
('What is a common way to book accommodation when traveling?', 5, 1), -- Тип вопроса: 1 (один правильный ответ)
('How do you typically plan your transportation for a trip?', 5, 1),
('Select the phrases used for asking directions in English.', 5, 2), -- Тип вопроса: 2 (один или несколько правильных ответов)
('Choose the phrases that can be used to describe tourist attractions.', 5, 2),
('What is an appropriate response to "How do I get to the museum?" in English?', 5, 3); -- Тип вопроса: 3 (один правильный ответ без выбора)

-- Вставка ответов
INSERT INTO answer (title, is_correct, id_question)
VALUES 
('By booking a hotel online.', TRUE, 31),
('By taking a taxi.', FALSE, 31),
('Thank you', FALSE, 31),
('How are you?', FALSE, 31),

('By plane, train, or bus.', TRUE, 32),
('By walking.', FALSE, 32),
('Goodbye', FALSE, 32),
('How are you?', FALSE, 32),

('Excuse me, can you tell me how to get to the train station?', TRUE, 33),
('Where is the supermarket?', TRUE, 33),
('Thank you', FALSE, 33),
('How are you?', FALSE, 33),

('Its a famous landmark known for its historic architecture.', TRUE, 34),
('Its a grocery store.', FALSE, 34),
('Goodbye', FALSE, 34),
('How are you?', FALSE, 34),

('Go straight ahead and then turn left at the first intersection.', TRUE, 35); -- Правильный ответ на вопрос 5

-- ТЕСТ 6 --------------------------------------------------------------------------------------------------------
INSERT INTO question (descr, id_test, question_type)
VALUES 
('Which of the following activities is a common hobby?', 6, 1), -- Тип вопроса: 1 (один правильный ответ)
('What is a popular form of entertainment?', 6, 1),
('Select the phrases used for inviting someone to an activity in English.', 6, 2), -- Тип вопроса: 2 (один или несколько правильных ответов)
('Choose the phrases that can be used to describe a movie or TV show.', 6, 2),
('What is an appropriate response to "Would you like to go to the movies with me?" in English?', 6, 3); -- Тип вопроса: 3 (один правильный ответ без выбора)

-- Вставка ответов
INSERT INTO answer (title, is_correct, id_question)
VALUES 
('Reading', TRUE, 36), -- Правильный ответ на вопрос 1
('Sleeping', FALSE, 36),
('Thank you', FALSE, 36),
('How are you?', FALSE, 36),

('Watching movies', TRUE, 37), -- Правильный ответ на вопрос 2
('Eating broccoli', FALSE, 37),
('Goodbye', FALSE, 37),
('How are you?', FALSE, 37),

('Would you like to go to the park?', TRUE, 38), -- Правильный ответ на вопрос 3
('Lets go for a walk.', TRUE, 38),
('Thank you', FALSE, 38),
('How are you?', FALSE, 38),

('Its a romantic comedy.', TRUE, 39), -- Правильный ответ на вопрос 4
('Its about cooking.', TRUE, 39),
('Goodbye', FALSE, 39),
('How are you?', FALSE, 39),

('Sure, Id love to.', TRUE, 40); -- Правильный ответ на вопрос 5

-- ТЕСТ 7 --------------------------------------------------------------------------------------------------------
INSERT INTO question (descr, id_test, question_type)
VALUES 
('What is a common way to say "I work as a teacher" in English?', 7, 1), -- Тип вопроса: 1 (один правильный ответ)
('Select the phrases used for discussing job responsibilities in English.', 7, 2), -- Тип вопроса: 2 (один или несколько правильных ответов)
('What is an appropriate response to "What do you do for a living?" in English?', 7, 3); -- Тип вопроса: 3 (один правильный ответ без выбора)

-- Вставка ответов
INSERT INTO answer (title, is_correct, id_question)
VALUES 
('I am a teacher.', TRUE, 41), -- Правильный ответ на вопрос 1
('I am studying.', FALSE, 41),
('Thank you', FALSE, 41),
('How are you?', FALSE, 41),

('I manage projects and teams.', TRUE, 42), -- Правильный ответ на вопрос 2
('I cook meals.', FALSE, 42),
('I play soccer.', FALSE, 42),
('I drive a taxi.', FALSE, 42),

('I am a software engineer.', TRUE, 43); -- Правильный ответ на вопрос 3

-- ТЕСТ 8 --------------------------------------------------------------------------------------------------------
INSERT INTO question (descr, id_test, question_type)
VALUES 
('Which of the following is a common way to stay updated on current events?', 8, 1), -- Тип вопроса: 1 (один правильный ответ)
('What is a popular news source?', 8, 1),
('Select the phrases used for expressing opinions in English.', 8, 2), -- Тип вопроса: 2 (один или несколько правильных ответов)
('Choose the phrases that can be used to discuss recent events.', 8, 2),
('What is an appropriate response to "Did you hear about the earthquake?" in English?', 8, 3); -- Тип вопроса: 3 (один правильный ответ без выбора)

-- Вставка ответов
INSERT INTO answer (title, is_correct, id_question)
VALUES 
('Reading the news online', TRUE, 44), -- Правильный ответ на вопрос 1
('Listening to music', FALSE, 44),
('Thank you', FALSE, 44),
('How are you?', FALSE, 44),

('BBC News', TRUE, 45), -- Правильный ответ на вопрос 2
('Cooking Channel', FALSE, 45),
('Goodbye', FALSE, 45),
('How are you?', FALSE, 45),

('I believe...', TRUE, 46), -- Правильный ответ на вопрос 3
('In my opinion...', TRUE, 46),
('Thank you', FALSE, 46),
('How are you?', FALSE, 46),

('There was a protest downtown.', TRUE, 47), -- Правильный ответ на вопрос 4
('The weather has been nice lately.', TRUE, 47),
('Goodbye', FALSE, 47),
('How are you?', FALSE, 47),

('Yes, it was devastating.', TRUE, 48); -- Правильный ответ на вопрос 5

-- ТЕСТ 9 --------------------------------------------------------------------------------------------------------
INSERT INTO question (descr, id_test, question_type)
VALUES 
('What is a common way to greet someone in a professional setting?', 9, 1), -- Тип вопроса: 1 (один правильный ответ)
('How do you typically address someone in a business email?', 9, 1),
('Select the phrases used for scheduling meetings in English.', 9, 2), -- Тип вопроса: 2 (один или несколько правильных ответов)
('Choose the phrases that can be used to discuss business strategies.', 9, 2),
('What is an appropriate response to "Thank you for your hard work" in English?', 9, 3); -- Тип вопроса: 3 (один правильный ответ без выбора)

-- Вставка ответов
INSERT INTO answer (title, is_correct, id_question)
VALUES 
('Hello', TRUE, 49), -- Правильный ответ на вопрос 1
('Goodbye', FALSE, 49),
('Thank you', FALSE, 49),
('How are you?', FALSE, 49),

('Dear Mr./Ms. [Last Name]', TRUE, 50), -- Правильный ответ на вопрос 2
('Hey there!', FALSE, 50),
('Thank you', FALSE, 50),
('How are you?', FALSE, 50),

('Can we meet on Monday at 10:00 AM?', TRUE, 51), -- Правильный ответ на вопрос 3
('Let''s go to the movies.', FALSE, 51),
('Thank you', FALSE, 51),
('How are you?', FALSE, 51),

('We need to increase our market share.', TRUE, 52), -- Правильный ответ на вопрос 4
('What''s for lunch?', FALSE, 52),
('Thank you', FALSE, 52),
('How are you?', FALSE, 52),

('You''re welcome.', TRUE, 53); -- Правильный ответ на вопрос 5

-- ТЕСТ 10 --------------------------------------------------------------------------------------------------------
INSERT INTO question (descr, id_test, question_type)
VALUES 
('Which of the following is a common political ideology?', 10, 1), -- Тип вопроса: 1 (один правильный ответ)
('What is a typical social issue?', 10, 1),
('Select the phrases used for expressing opinions on political topics in English.', 10, 2), -- Тип вопроса: 2 (один или несколько правильных ответов)
('Choose the phrases that can be used to discuss social justice.', 10, 2),
('What is an appropriate response to "Do you support the new policy?" in English?', 10, 3); -- Тип вопроса: 3 (один правильный ответ без выбора)

-- Вставка ответов
INSERT INTO answer (title, is_correct, id_question)
VALUES 
('Liberalism', TRUE, 54), -- Правильный ответ на вопрос 1
('Eating ice cream', FALSE, 54),
('Thank you', FALSE, 54),
('How are you?', FALSE, 54),

('Climate change', TRUE, 55), -- Правильный ответ на вопрос 2
('Learning guitar', FALSE, 55),
('Goodbye', FALSE, 55),
('How are you?', FALSE, 55),

('I believe...', TRUE, 56), -- Правильный ответ на вопрос 3
('In my opinion...', TRUE, 56),
('Thank you', FALSE, 56),
('How are you?', FALSE, 56),

('We need to address income inequality.', TRUE, 57), -- Правильный ответ на вопрос 4
('Let''s go to the beach.', FALSE, 57),
('Thank you', FALSE, 57),
('How are you?', FALSE, 57),

('Yes, I think it will have a positive impact.', TRUE, 58); -- Правильный ответ на вопрос 5

-- ТЕСТ 11 --------------------------------------------------------------------------------------------------------
INSERT INTO question (descr, id_test, question_type)
VALUES 
('What is a common method used in scientific research?', 11, 1), -- Тип вопроса: 1 (один правильный ответ)
('What is an essential component of an academic paper?', 11, 1),
('Select the phrases used for discussing research findings in English.', 11, 2), -- Тип вопроса: 2 (один или несколько правильных ответов)
('Choose the phrases that can be used to describe the scientific method.', 11, 2),
('What is an appropriate response to "What are your research interests?" in English?', 11, 3); -- Тип вопроса: 3 (один правильный ответ без выбора)

-- Вставка ответов
INSERT INTO answer (title, is_correct, id_question)
VALUES 
('Experimentation', TRUE, 59), -- Правильный ответ на вопрос 1
('Sleeping', FALSE, 59),
('Thank you', FALSE, 59),
('How are you?', FALSE, 59),

('Abstract', TRUE, 60), -- Правильный ответ на вопрос 2
('Shopping list', FALSE, 60),
('Goodbye', FALSE, 60),
('How are you?', FALSE, 60),

('Our results indicate that...', TRUE, 61), -- Правильный ответ на вопрос 3
('According to Wikipedia...', TRUE, 61),
('Thank you', FALSE, 61),
('How are you?', FALSE, 61),

('Hypotheses are tested through observation and experimentation.', TRUE, 62), -- Правильный ответ на вопрос 4
('Mathematical equations are used to analyze data.', FALSE, 62),
('Goodbye', FALSE, 62),
('How are you?', FALSE, 62),

('I am interested in studying climate change.', TRUE, 63); -- Правильный ответ на вопрос 5

-- ТЕСТ 12 --------------------------------------------------------------------------------------------------------
INSERT INTO question (descr, id_test, question_type)
VALUES 
('Who is considered the father of Western philosophy?', 12, 1), -- Тип вопроса: 1 (один правильный ответ)
('What is a common theme in Renaissance art?', 12, 1),
('Select the phrases used for discussing philosophical concepts in English.', 12, 2), -- Тип вопроса: 2 (один или несколько правильных ответов)
('Choose the phrases that can be used to describe different art movements.', 12, 2),
('What is an appropriate response to "What is the meaning of life?" in English?', 12, 3); -- Тип вопроса: 3 (один правильный ответ без выбора)

-- Вставка ответов
INSERT INTO answer (title, is_correct, id_question)
VALUES 
('Socrates', TRUE, 64), -- Правильный ответ на вопрос 1
('Leonardo da Vinci', FALSE, 64),
('Thank you', FALSE, 64),
('How are you?', FALSE, 64),

('Humanism', TRUE, 65), -- Правильный ответ на вопрос 2
('Space exploration', FALSE, 65),
('Goodbye', FALSE, 65),
('How are you?', FALSE, 65),

('Existentialism explores questions of existence and individual freedom.', TRUE, 66), -- Правильный ответ на вопрос 3
('Renaissance art focused on realism and perspective.', TRUE, 66),
('Thank you', FALSE, 66),
('How are you?', FALSE, 66),

('Impressionism emphasizes the use of light and color.', TRUE, 67), -- Правильный ответ на вопрос 4
('Baroque art is characterized by dramatic lighting and emotional intensity.', TRUE, 67),
('Goodbye', FALSE, 67),
('How are you?', FALSE, 67),

('That is a complex question with many possible interpretations.', TRUE, 68); -- Правильный ответ на вопрос 5

-- ТЕСТ 13 --------------------------------------------------------------------------------------------------------
INSERT INTO question (descr, id_test, question_type)
VALUES 
('Who wrote the novel "Pride and Prejudice"?', 13, 1), -- Тип вопроса: 1 (один правильный ответ)
('What is a common theme in Shakespearean tragedies?', 13, 1),
('Select the phrases used for discussing literary devices in English.', 13, 2), -- Тип вопроса: 2 (один или несколько правильных ответов)
('Choose the phrases that can be used to describe major literary movements.', 13, 2),
('What is an appropriate response to "What is your favorite book?" in English?', 13, 3); -- Тип вопроса: 3 (один правильный ответ без выбора)

-- Вставка ответов
INSERT INTO answer (title, is_correct, id_question)
VALUES 
('Jane Austen', TRUE, 69), -- Правильный ответ на вопрос 1
('Stephen King', FALSE, 69),
('Thank you', FALSE, 69),
('How are you?', FALSE, 69),

('Tragic flaws in characters', TRUE, 70), -- Правильный ответ на вопрос 2
('Happy endings', FALSE, 70),
('Goodbye', FALSE, 70),
('How are you?', FALSE, 70),

('Foreshadowing creates suspense in the narrative.', TRUE, 71), -- Правильный ответ на вопрос 3
('Symbolism adds depth to the story.', TRUE, 71),
('Thank you', FALSE, 71),
('How are you?', FALSE, 71),

('Romanticism focused on individualism and emotion.', TRUE, 72), -- Правильный ответ на вопрос 4
('Modernism explored disillusionment with traditional values.', TRUE, 72),
('Goodbye', FALSE, 72),
('How are you?', FALSE, 72),

('There are so many great books to choose from!', TRUE, 73); -- Правильный ответ на вопрос 5

-- ТЕСТ 14 --------------------------------------------------------------------------------------------------------
INSERT INTO question (descr, id_test, question_type)
VALUES 
('What is morphology in linguistics?', 14, 1), -- Тип вопроса: 1 (один правильный ответ)
('What is a common feature of agglutinative languages?', 14, 1),
('Select the terms used for describing language acquisition theories in English.', 14, 2), -- Тип вопроса: 2 (один или несколько правильных ответов)
('Choose the terms that can be used to explain phonological processes.', 14, 2),
('What is the name of the theory proposing that language shapes the way we think?', 14, 3); -- Тип вопроса: 3 (один правильный ответ без выбора)

-- Вставка ответов
INSERT INTO answer (title, is_correct, id_question)
VALUES 
('Study of word structure', TRUE, 74), -- Правильный ответ на вопрос 1
('Study of word pronunciation', FALSE, 74),
('Thank you', FALSE, 74),
('How are you?', FALSE, 74),

('Word formation through affixation', TRUE, 75), -- Правильный ответ на вопрос 2
('Word order as the primary syntax feature', FALSE, 75),
('Goodbye', FALSE, 75),
('How are you?', FALSE, 75),

('Nativist theory', TRUE, 76), -- Правильный ответ на вопрос 3
('Social interactionist theory', TRUE, 76),
('Thank you', FALSE, 76),
('How are you?', FALSE, 76),

('Critical period hypothesis', TRUE, 77), -- Правильный ответ на вопрос 4
('Sociolinguistics', FALSE, 77),
('Goodbye', FALSE, 77),
('How are you?', FALSE, 77),

('Sapir-Whorf hypothesis', TRUE, 78); -- Правильный ответ на вопрос 5
