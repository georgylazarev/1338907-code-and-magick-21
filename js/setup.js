'use strict';

// Задаем константы из ТЗ
const CHARACTER_FIRST_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const CHARACTER_LAST_NAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const COAT_COLOR = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const EYES_COLOR = [`black`, `red`, `blue`, `yellow`, `green`];
const FIREBALL_COLOR = [`#ee4830`, `#5ce6c0`, `#e848d5`, `#e6e848`];
// Задаем количество персонажей
const CHARACTERS_LIMIT = 4;
// Находим шаблон
const newTemplate = document.querySelector(`#similar-wizard-template`).content;
// Находим блок вывода
let listOfCharacters = document.querySelector(`.setup-similar-list`);

// Убираем класс hidden у заданного элемента
const showElement = function (elem) {
  let targetElement = document.querySelector(elem);
  targetElement.classList.remove(`hidden`);
};

// Генератор случайных индексов
const randomGenerator = function (length) {
  return Math.floor(Math.random() * Math.floor(length));
};

// Генерируем похожих персонажей
const generateCharacterProperties = function (firstName, lastName, firstColor, secondColor, limit) {
  let characters = [];
  for (let i = 0; i < limit; i++) {
    // Вычисляем рандомные индексы
    const firstNameIndex = randomGenerator(firstName.length);
    const lastNameIndex = randomGenerator(lastName.length);
    const coatColorIndex = randomGenerator(firstColor.length);
    const eyesColorIndex = randomGenerator(secondColor.length);

    // Формируем свойства персонажа
    const name = firstName[firstNameIndex] + ` ` + lastName[lastNameIndex];
    const coatColor = firstColor[coatColorIndex];
    const eyesColor = secondColor[eyesColorIndex];

    // Добавляем сформированные свойства в массив объектов
    characters.push({name, coatColor, eyesColor});
  }
  return characters;
};

// Создаем объект с новым персонажем
const createCharacter = function (char) {
  let newCharacter = newTemplate.cloneNode(true);

  let label = newCharacter.querySelector(`.setup-similar-label`);
  label.textContent = char.name;

  let coat = newCharacter.querySelector(`.wizard-coat`);
  coat.style.fill = char.coatColor;

  let eyes = newCharacter.querySelector(`.wizard-eyes`);
  eyes.style.fill = char.eyesColor;

  return newCharacter;
};

// Заполняем блок вывода новыми персонажами
const createCharacters = function (arrayOfCharacters) {
  for (let char of arrayOfCharacters) {
    const myCharacter = createCharacter(char);
    listOfCharacters.appendChild(myCharacter);
  }
};

const newCharacters = generateCharacterProperties(CHARACTER_FIRST_NAMES, CHARACTER_LAST_NAMES, COAT_COLOR, EYES_COLOR, CHARACTERS_LIMIT);

createCharacters(newCharacters);

showElement(`.setup-similar`);

// module4-task1
// Находим кнопку открытия окна настроек
const setupOpen = document.querySelector(`.setup-open`);
// Находим кнопку закрытия окна настроек
const setupClose = document.querySelector(`.setup-close`);
// Находим эелемент с окном настроек
const setup = document.querySelector(`.setup`);
// Находим поле ввода имени
const wizardNameField = document.querySelector(`.setup-user-name`);

// Объявялем функцию закрытия окна по нажатию эскейп
const onPopupEscPress = function (evt) {
  if (evt.key === `Escape`) {
    // Если фокус не на поле ввода, закрываем окно
    if (!wizardNameField.matches(`:focus`)) {
      evt.preventDefault();
      closePopup();
    }
  }
};
// Объявляем функцию открытия окна
const openPopup = function () {
  // Убираем класс hidden
  setup.classList.remove(`hidden`);
  // Вешаем на документ обработчик событий с функцией закрытия по нажатию эскейп
  document.addEventListener(`keydown`, onPopupEscPress);
};
// Объявляем функцию закрытия окна
const closePopup = function () {
  // Добавляем класс хидден
  setup.classList.add(`hidden`);
  // Убираем обработчик событий
  document.removeEventListener(`keydown`, onPopupEscPress);
};
// Вешаем на кнопку открытия обработчик событий на клик
setupOpen.addEventListener(`click`, function () {
  // Вызываем функцию открытия окна
  openPopup();
});
// Вешаем на кнопку открытия обработчик событий на нажатия клавиш
setupOpen.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    // Если нажат энтер - вызываем функцию закрытия окна
    openPopup();
  }
});
// Вешаем на кнопку закрытия окна обработчик событий на клик
setupClose.addEventListener(`click`, function () {
  closePopup();
});
// Вешаем на кнопку закрытия окна обработчик событий на нажатия клавиш
setupClose.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    closePopup();
  }
});

// Объявляем функцию изменения цвета элемента
const setNewColor = function (element, colorConst, inputName) {
  const colorIndex = randomGenerator(colorConst.length);
  if (element !== wizardFireball) {
    element.style.fill = colorConst[colorIndex];
  } else {
    wizardFireball.style.backgroundColor = colorConst[colorIndex];
  }
  // Задаем значение для скрытого элемента формы
  let inputValue = document.querySelector(`[name=` + inputName + `]`);
  inputValue.value = colorConst[colorIndex];
};

// Меняем цвет мантии по клику
let wizardCoat = document.querySelector(`.setup-wizard`).querySelector(`.wizard-coat`);
wizardCoat.addEventListener(`click`, function () {
  setNewColor(wizardCoat, COAT_COLOR, `coat-color`);
});
// Меняем цвет глаз по клику
let wizardEyes = document.querySelector(`.setup-wizard`).querySelector(`.wizard-eyes`);
wizardEyes.addEventListener(`click`, function () {
  setNewColor(wizardEyes, EYES_COLOR, `eyes-color`);
});
// Меняем цвет фаербола по клику
let wizardFireball = document.querySelector(`.setup-fireball-wrap`);
wizardFireball.addEventListener(`click`, function () {
  setNewColor(wizardFireball, FIREBALL_COLOR, `fireball-color`);
});
