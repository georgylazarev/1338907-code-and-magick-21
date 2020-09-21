'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const GAP = 10;
const FONT_GAP = 15;
const INTRO_TEXT = [``, ``, `Ура вы победили!`, `Список результатов:`];
const HISTOGRAM_HEIGHT = 150;
const COLUMN_WIDTH = 40;
const COLUMN_GAP = 50;
const COLOR_OF_YOU = 0;
const COLOR_OF_OTER = 240;

const renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const renderIntro = function (ctx, introText) {
  let introHeight = 0;
  for (let i = 0; i < introText.length; i++) {
    ctx.fillText(introText[i], CLOUD_X + GAP, CLOUD_Y + GAP + FONT_GAP * i);
    introHeight = CLOUD_Y + GAP + FONT_GAP * i;
  }
  return introHeight;
};


const setPlayersToObject = function (players, times) {

  // Перегоняем данные в массив объектов
  let playersObject = [];
  for (let i = 0; i < players.length; i++) {
    playersObject.push({name: players[i], time: Math.round(times[i])});
  }

  // Ищем максимальное значение времени
  let max = 0;
  for (let i = 0; i < playersObject.length; i++) {
    if (playersObject[i].time > max) {
      max = playersObject[i].time;
    }
  }

  // Рассчитываем высоту столбца для каждого игрока и присваиваем объекту третьим свойством
  for (let i = 0; i < playersObject.length; i++) {
    if (playersObject[i].time === max) {
      playersObject[i].height = HISTOGRAM_HEIGHT;
    } else {
      playersObject[i].height = Math.round(playersObject[i].time * HISTOGRAM_HEIGHT / max);
    }
  }

  // Возвращаем массив объектов с тремя свойствами: name, time, height
  return playersObject;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(
      ctx,
      CLOUD_X + GAP,
      CLOUD_Y + GAP,
      `rgba(0, 0, 0, 0.7)`
  );

  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      `#fff`
  );

  ctx.fillStyle = `#000`;

  const introHeight = renderIntro(ctx, INTRO_TEXT);

  const playersObject = setPlayersToObject(players, times);

  for (let i = 0; i < playersObject.length; i++) {

    // Выводим время игрока смещая его на разницу текущей высоты столбца от максимальной
    ctx.fillStyle = `#000`;
    ctx.fillText(
        playersObject[i].time,
        CLOUD_X + GAP + (COLUMN_WIDTH + COLUMN_GAP) * i,
        introHeight + GAP + FONT_GAP + (HISTOGRAM_HEIGHT - playersObject[i].height));

    // Меняем цвет заливки в зависимости от того, Вы это или кто-то другой
    if (playersObject[i].name === `Вы`) {
      ctx.fillStyle = `hsl(` + COLOR_OF_YOU + `, 100%, 50%)`;
    } else {
      const randomSaturation = Math.floor(Math.random() * 100) + 1 + `%`;
      ctx.fillStyle = `hsl(` + COLOR_OF_OTER + `, ` + randomSaturation + `, 50%)`;
    }

    // Рисуем столбец игрока нужного цвета со смещением
    ctx.fillRect(
        CLOUD_X + GAP + (COLUMN_WIDTH + COLUMN_GAP) * i,
        introHeight + GAP * 2 + FONT_GAP + (HISTOGRAM_HEIGHT - playersObject[i].height),
        COLUMN_WIDTH,
        playersObject[i].height);

    // Выводим имя игрока
    ctx.fillStyle = `#000`;
    ctx.fillText(
        playersObject[i].name,
        CLOUD_X + GAP + (COLUMN_WIDTH + COLUMN_GAP) * i,
        introHeight + (GAP + FONT_GAP) * 2 + HISTOGRAM_HEIGHT);
  }
};
