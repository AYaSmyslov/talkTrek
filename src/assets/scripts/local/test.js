checkCookie('sessionData').then(result => {
    if (result) {
        // авторизован, остаемся тут
        getTestById();
    } else {
        // не авторизован, выкинуть на форму авторизации
        window.location.href = "/";
    }
});

const urlParams = new URLSearchParams(window.location.search);
const testId = urlParams.get('id');

function generateQuestionButtons() {
    const questionsContainer = document.getElementById('questions');
    const numQuestions = quizData.length;
    const numContainers = Math.ceil(numQuestions / 5);

    for (let i = 0; i < numContainers; i++) {
        const container = document.createElement('div');
        container.classList.add('button-container');

        for (let j = 1; j <= 5; j++) {
            const questionNumber = i * 5 + j;
            if (questionNumber > numQuestions) break;

            const button = document.createElement('button');
            button.classList.add('question');
            button.id = 'q' + questionNumber;
            button.textContent = questionNumber;
            button.onclick = function() {
    highlightCurrentQuestionButton('#ade2ff');

                currentQuiz = button.textContent;
                currentQuiz--;
                loadQuiz();
            };
            container.appendChild(button);
        }

        questionsContainer.appendChild(container);
    }
}

function highlightCurrentQuestionButton(color) {
    const currentQuizButtonId = 'q' + (currentQuiz + 1).toString();
    const currentQuizButton = document.getElementById(currentQuizButtonId);
    if (currentQuizButton) {
        currentQuizButton.style.backgroundColor = color;

    }
}



let quizData;
function getTestById() {
    let cookieValue = getCookieValue('sessionData');

    let cookieData;
    try {
        cookieData = JSON.parse(cookieValue);
    } catch (error) {
        return;
    }
    fetch(`/getTestById`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cookieData,
            testId: testId
        })
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Ошибка при получении имени пользователя');
            }
        })
        .then(data => {
            console.log(data);
            quizData = data.message.map(row => {
                // Разделяем варианты ответов на отдельные строки
                const options = row.options.split(';');

                const optionsArray = row.options.split(';'); // Разделяем строку на массив по разделителю ';'
                const questionData = {
                    question: row.question,
                    question_type: row.question_type,
                    correct: row.correct,
                    options: optionsArray // Передаем варианты ответов как массив
                };

                return questionData;
            });
            generateQuestionButtons();

            console.log(quizData);
            loadQuiz();

        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
}

// function loadQuiz() {
const quiz = document.getElementById("quiz");
let answerElements = document.querySelectorAll(".answer");
const questionElement = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const prevButton = document.getElementById("prev");
const submitButton = document.getElementById("submit");

let currentQuiz = 0;
let score = 0;

const deselectAnswers = () => {
    answerElements.forEach((answer) => (answer.checked = false));
};

const getSelected = () => {
    let answer;
    answerElements.forEach((answerElement) => {

        if (answerElement.checked) answer = answerElement.id;
    });
    return answer;
};

const loadQuiz = () => {
    highlightCurrentQuestionButton('#7d7d7d');
    deselectAnswers();
    if (currentQuiz == quizData.length - 1) {
        submitButton.textContent = 'Завершить тест';
    }
    const currentQuizData = quizData[currentQuiz];
    questionElement.innerText = currentQuizData.question;
    const ul = document.createElement('ul');

    // Переменная для хранения порядкового номера ответа
    let optionNumber = 1;
    const inputType = currentQuizData.question_type === 1 ? 'radio' : (currentQuizData.question_type === 2 ? 'checkbox' : 'text');

    // Перебираем все варианты ответов текущего вопроса и создаем для каждого элемент списка
    for (let i = 0; i < currentQuizData.options.length; i++) {
        const li = document.createElement('li');
        const input = document.createElement('input');
        input.type = inputType;
        input.className = 'answer'; // Добавляем класс 'answer'
        input.id = 'a' + optionNumber.toString(); // Задаем значение input в соответствии с порядковым номером ответа
        const label = document.createElement('label');
        if (currentQuizData.question_type !== 3) {
            label.innerText = currentQuizData.options[i]; // Устанавливаем текст ответа
        } else {
            input.placeholder = "Введите ответ"
        }
        li.appendChild(input);
        li.appendChild(label);
        ul.appendChild(li);

        // Увеличиваем порядковый номер ответа для следующего варианта
        optionNumber++;
    }

    // Заменяем текущий список вариантов ответа новым
    const quizHeader = document.querySelector('.quiz-header');
    quizHeader.replaceChild(ul, quizHeader.querySelector('ul'));
    answerElements = document.querySelectorAll(".answer");
};

//   loadQuiz();
function formatSelectedOptions() {
    const selectedOptions = []; // Массив для хранения выбранных ответов

    // Получаем все чекбоксы с классом 'answer'
    const checkboxes = document.querySelectorAll('.answer');

    // Перебираем каждый чекбокс
    checkboxes.forEach((checkbox) => {
        // Если чекбокс отмечен
        if (checkbox.checked) {
            // Получаем текст ответа, используя связанный с ним label
            const labelText = checkbox.nextElementSibling.textContent;
            // Добавляем текст ответа в массив выбранных ответов
            selectedOptions.push(labelText);
        }
    });

    // Соединяем выбранные ответы в строку, разделяя их точкой с запятой
    const formattedOptions = selectedOptions.join(';');

    return formattedOptions;
}

const getTextAnswer = () => {
    const textInput = document.getElementById('a1'); // Получаем элемент текстового поля по его ID
    return textInput.value; // Возвращаем значение введенного текста
};

prevButton.addEventListener("click", () => {
    highlightCurrentQuestionButton('#ade2ff');
    if (currentQuiz > 0) {
        currentQuiz--;
        loadQuiz();
    }
});
submitButton.addEventListener("click", () => {
    if (quizData[currentQuiz].question_type === 1) {
        const answer = getSelected();
        // alert(answer);
        if (answer) {
            // alert(answer.charCodeAt(0) - 97 + 1);
            // alert(quizData[currentQuiz].correct);
            if (answer === 'a' + quizData[currentQuiz].correct.toString()) {
                // alert('Верно!^^');
                score++;
            }
        }
    }
    else if (quizData[currentQuiz].question_type === 2) {
        const answer = formatSelectedOptions();
        console.log(answer);
        if (answer === quizData[currentQuiz].correct) {
            // alert('Верно!^^');
            score++;
        }
    }
    else if (quizData[currentQuiz].question_type === 3) {
        const answer = getTextAnswer();
        if (answer.toLowerCase() === quizData[currentQuiz].correct.toLowerCase()) {
            // alert('Верно!^^');
            score++;
        }
    }



    highlightCurrentQuestionButton('#ade2ff');
    currentQuiz++;

    if (currentQuiz < quizData.length) {
        loadQuiz();
    }
    else {
        stopTest();
    }

});


function stopTest() {

    let cookieValue = getCookieValue('sessionData');

    let cookieData;
    try {
        cookieData = JSON.parse(cookieValue);
    } catch (error) {
        return;
    }
    fetch(`/saveTestRes`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cookieData,
            testId: testId,
            score: score
        })
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Ошибка при получении имени пользователя');
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
    quiz.innerHTML = `
    <h2>You answered ${score}/${quizData.length} questions correctly</h2>
    <button onclick="window.location.href = '/src/templates/pages/exam.html'" style="background-color: #1f9c00;">Завершить тест</button>
`;
}
