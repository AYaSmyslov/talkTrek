checkCookie('sessionData').then(result => {
  if (result) {
    // авторизован, остаемся тут
    getTests();
  } else {
    // не авторизован, выкинуть на форму авторизации
    window.location.href = "/";
  }
});

var goMainBtn = document.getElementById("goMainBtn");

goMainBtn.addEventListener("click", function () {
  window.location.href = "/src/templates/pages/main.html";
});

// window.addEventListener('load', function() {
//   var container = document.getElementById('container');
//   var windowHeight = window.innerHeight;
//   var windowWidth = window.innerWidth;

//   if (windowHeight > windowWidth) {
//       container.style.width = '50vh';
//       container.style.marginLeft = '5%'; 
//   }
// });


function getTests() {
  let cookieValue = getCookieValue('sessionData');

  let cookieData;
  try {
    cookieData = JSON.parse(cookieValue);
  } catch (error) {
    return;
  }

  fetch(`/getTests`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: cookieData
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
      const container = document.querySelector('.container');

      for (let i = 0; i < data.message.length; i++) {
        console.log(i);
        const item = data.message[i];

        const card = document.createElement('div');
        card.classList.add('card');
        card.style.setProperty('--cards', '12');


        const child = document.createElement('div');
        child.classList.add('child');

        const h2 = document.createElement('h2');
        h2.textContent = item.title;

        const h5 = document.createElement('h5');
        h5.textContent = item.descr;

        const p = document.createElement('p');
        p.textContent = item.score.toString() + '/' + item.question_count.toString();

        child.appendChild(h2);
        child.appendChild(h5);
        child.appendChild(p);

        if (item.score == 0) {

          child.style.background = '#fff';
        }
        else if ((item.score/item.question_count*100) < 50) {

          child.style.background = '#ffc7c7';
        }
        else if ((item.score/item.question_count*100) < 75) {
          child.style.background = '#ffebc7';
          // child.style.background = '#ccffc7';
        }
        else if ((item.score/item.question_count*100) < 100) {
          child.style.background = '#ccffc7';
        }
        else{
          child.style.background = '#e6c7ff';

          // child.style.background = '#ccffc7';
        }
        card.onclick = function () {
          window.location.href = `/src/templates/pages/test.html?id=${item.id_test}`;
        };

        card.appendChild(child);

        // const childCount = Math.floor(item.timeRead / 5);
        // // Пропало описание статьи? Загляни в CSS .child и .child:nth-child
        // for (let j = 0; j < childCount - 1 && childCount > 1; j++) {
        //   const additionalChild = document.createElement('div');
        //   // if (item.readed === 1) {
        //   //   additionalChild.style.background = '#ccffc7'; // Устанавливаем зеленый цвет фона
        //   // }
        //   additionalChild.classList.add('child');
        //   card.appendChild(additionalChild);
        // }

        container.appendChild(card);
      }
    })
    .catch(error => {
      console.error('Ошибка:', error);
    });
}