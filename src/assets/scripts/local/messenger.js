checkCookie('sessionData').then(result => {
    if (result) {
        // авторизован, остаемся тут
        getMsgHistory10();
        setInterval(getMsgHistory10, 5000);
    } else {
        // не авторизован, выкинуть на форму авторизации
        window.location.href = "/";
    }
});

var goMainBtn = document.getElementById("goMainBtn");

goMainBtn.addEventListener("click", function() {
    window.location.href = "../../../src/templates/pages/main.html";
  });

function getMsgHistory10() {
    let cookieValue = getCookieValue('sessionData');

    let cookieData;
    try {
        cookieData = JSON.parse(cookieValue);
    } catch (error) {
        return;
    }
    fetch(`/getMsgHistory10`, {
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
        // data.message[0].content;
        document.querySelector(".chat-box-container").innerHTML = "";
        console.log(data.message);
        for (let i = data.message.length-1; i >= 0; i--) {
            let messageElement = document.createElement('div');
            messageElement.classList.add('chat-block');
            let dateTimeString = data.message[i].date_sent;
            let dateTime = new Date(dateTimeString);
            let hours = dateTime.getHours().toString().padStart(2, '0');
            let minutes = dateTime.getMinutes().toString().padStart(2, '0');
            let timeString = hours + ':' + minutes;

            let messageContent = data.message[i].login + ': "' + data.message[i].content + '" ' +timeString;
            if (messageContent.length > 15) {
                messageElement.innerHTML = '<span class="chat-message">' + messageContent + '</span>';
            } else {
                messageElement.innerHTML = '<span class="chat-message big">' + messageContent + '</span>';
            }
            document.querySelector(".chat-box-container").appendChild(messageElement);
        }
      })
        .catch(error => {
          console.error('Ошибка:', error);
        });
}

document.getElementById("send").addEventListener("click", function () {
    let cookieValue = getCookieValue('sessionData');

    let cookieData;
    try {
        cookieData = JSON.parse(cookieValue);
    } catch (error) {
        return;
    }

    var text = document.querySelector(".message").value;
    var count = text.length;

    if (count > 0 && count < 15) {
        document.querySelector(".chat-box-container").insertAdjacentHTML('beforeend', '<div class="chat-block"><span class="chat-message big">' + text + '</span></div>');
    } else if (count === 0) {
        alert("Напишите что-нибудь");
        return;
    } else {
        document.querySelector(".chat-box-container").insertAdjacentHTML('beforeend', '<div class="chat-block"><span class="chat-message">' + text + '</span></div>');

        
    }

    fetch(`/sendMessage`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cookieData,
            msg: text
        })
    
      })
      .then(response => {
        if (!response.ok) {
            throw new Error('Ошибка сети');
        }
        getMsgHistory10();
    })
        .catch(error => {
          console.error('Ошибка:', error);
        });

    document.querySelector(".message").value = "";
    document.querySelector(".message").style.height = "40px";
    document.querySelector(".helper").textContent = "";
    document.querySelector(".chat-box-container").scrollTop = document.querySelector(".chat-box-container").scrollHeight;
});

document.querySelector(".message").addEventListener('input', function () {
    var text = this.value;
    document.querySelector(".helper").textContent = text;
    var height = document.querySelector(".helper").offsetHeight;
    this.style.height = height + 'px';
});

var w = document.querySelector(".message").offsetWidth;
document.querySelector(".helper").style.width = w + 'px';
