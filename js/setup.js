'use strict';

// Задаем константы из ТЗ
const CHARACTER_FIRST_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const CHARACTER_LAST_NAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const COAT_COLOR = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const EYES_COLOR = [`black`, `red`, `blue`, `yellow`, `green`];
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

showElement(`.setup`);

const newCharacters = generateCharacterProperties(CHARACTER_FIRST_NAMES, CHARACTER_LAST_NAMES, COAT_COLOR, EYES_COLOR, CHARACTERS_LIMIT);

createCharacters(newCharacters);

showElement(`.setup-similar`);
