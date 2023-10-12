'use strict';

let arrCollectionOfHtml = [];
let htmlOfCard = '';
let arrOfSvgNumbers = [];
let arrOfSvgNumbersMixed = [];
let arrCollectionOfHtmlMixed = [];
const area = document.querySelector('.area');
const totaMessage = document.querySelector('.total');
const totalResult = document.querySelector('.totalResult');
const modalWrapper = document.querySelector('#modal-wrapper');
const btnStart = document.querySelector('.btn-start');
let checkSecondCard = null;
let counter = 0;
let counterOfClick = 0;
let sound = new Audio('sound/miui_bubble.mp3');
let soundWin = new Audio('sound/win.mp3');
let soundStart = new Audio('sound/click.mp3');

// Заполняю массив числами от 1 до 52 (номера файлов svg)
for (let i = 1; i <= 52; i++) {
  arrOfSvgNumbers.push(i);
}

// Копирую элементы в новый массив в случайном порядке, удаляю эти элементы из старого массива
while (arrOfSvgNumbers.length) {
  let randomIndexOfNumber = Math.floor(Math.random() * arrOfSvgNumbers.length);
  arrOfSvgNumbersMixed.push(arrOfSvgNumbers[randomIndexOfNumber]);
  arrOfSvgNumbers.splice(randomIndexOfNumber, 1);
}

//Генерирую html для каждой карточки и добавляю его в массив дважды
for (let i = 1; i <= 5; i++) {
  htmlOfCard = `
        <div class="card" id="${i}">
            <img src="img/another-side.jpg" alt="another-side" class="front-face">
            <img src="svg/${
              arrOfSvgNumbersMixed[i - 1]
            }.svg" class="back-face" >
        </div>
    `;
  arrCollectionOfHtml.push(htmlOfCard);
  arrCollectionOfHtml.push(htmlOfCard);
}

// Перемешиваю массив с html для карточек
arrCollectionOfHtmlMixed = arrCollectionOfHtml.sort(() => Math.random() - 0.5);

// Рендер карточек на странице
for (let i = 0; i < arrCollectionOfHtml.length; i++) {
  area.innerHTML += arrCollectionOfHtml[i];
}

const handleMouseClick = (e) => {
  let currentCard = e.target.closest('.card');
  if (!currentCard) return;
  open(currentCard);

  counterOfClick++;
  // const cards = document.querySelectorAll('.card');

  setTimeout(() => {
    if (checkSecondCard === null) {
      checkSecondCard = currentCard;
    } else if (checkSecondCard.id === currentCard.id) {
      currentCard.tada(500);
      checkSecondCard.tada(500);
      sound.play();
      checkSecondCard = null;
      counter++;
      console.log('YESSSS');
      if (counter === 5) {
        setTimeout(() => {
          confettiStart();
          area.removeEventListener('click', handleMouseClick);
          soundWin.play();
          totaMessage.style.display = 'block';
          totalResult.innerText = counterOfClick;
        }, 1000);
      }
    } else {
      close(currentCard, checkSecondCard);
    }
  }, 1000);
};

area.addEventListener('click', handleMouseClick);

btnStart.addEventListener('click', () => {
  soundStart.play();
  modalWrapper.classList.add('fade-out');
  setTimeout(() => {
    modalWrapper.style.display = 'none';
  }, 1500);
});

function open(cardNode) {
  cardNode.classList.add('flip');
}

function close(cardNode, cardNodeSecond) {
  cardNode.classList.remove('flip');
  cardNodeSecond.classList.remove('flip');
  checkSecondCard = null;
}

function confettiStart() {
  const duration = 15 * 1000,
    animationEnd = Date.now() + duration,
    defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    );
  }, 250);
}
