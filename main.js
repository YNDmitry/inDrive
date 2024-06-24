import Backend from 'i18next-http-backend';
import { fadeInAudio, fadeOutAudio } from './helpers';

// Объект для отслеживания загрузки ресурсов
const resourcesLoaded = {
  video: false,
  mainAudio: false,
  carAudio: true,
  language: false
};

let currentQuestion = 0;
let score = 0;
let answeredQuestions = new Set(); // Множество для отслеживания отвеченных вопросов
let resourceCheckInterval = null
let preloaderTimeout = null

const stopTimes = [
  { start: 12, end: 15 },
  { start: 30, end: 34 },
  { start: 45, end: 49 },
  { start: 60, end: 64 },
  { start: 75, end: 79 },
  { start: 92, end: 96 },
  { start: 112, end: 116 },
  { start: 137, end: 141 },
  { start: 162, end: 165 },
  { start: 180, end: 184 },
  { start: 205, end: 209 },
  { start: 238, end: 245 }
];

// Инициализация i18next
function initializeI18next() {
  i18next
    .use(Backend)
    .init({
      lng: 'en',
      fallbackLng: 'en',
      backend: {
        loadPath: 'https://cdn.jsdelivr.net/gh/yndmitry/inDrive@master/public/locales/{{lng}}.json'
      }
    }, (err, t) => {
      if (err) {
        console.error('i18next init error:', err);
        return;
      }
      updateContent();
      resourcesLoaded.language = true;
      checkAllResourcesLoaded();
    });
}

// Проверка загрузки всех ресурсов
function checkAllResourcesLoaded() {
  if (resourcesLoaded.video && resourcesLoaded.mainAudio && resourcesLoaded.carAudio && resourcesLoaded.language) {
    $('.preloader').fadeOut(200, () => {
      $('.main-screen').fadeIn(200);
    });
  }
}

// Обновление контента на основе текущего языка
function updateContent() {
  const currentLanguage = i18next.language;
  const isRtlLanguage = ['ar', 'ur'].includes(currentLanguage);

  document.body.classList.toggle('rtl', isRtlLanguage);

  $('#intro').text(i18next.t('intro.text'));
  $('#start').text(i18next.t('intro.button'));
  $('#restart-btn').text(i18next.t('main.tryAgainButton'));
  $('#quiz-next-btn').text(i18next.t('main.nextButton'));

  if ($('#global-result').is(':visible')) {
    showFinalResult();
  }

  if ($('.quiz_result').is(':visible')) {
    showFeedback();
  }

  if ($('#quiz').is(':visible')) {
    if (!answeredQuestions.has(currentQuestion)) {
      showQuestion(currentQuestion);
    } else {
      updateQuestionContent(currentQuestion);
    }
  }
}

// Запуск видео и аудио
function startVideoAndAudio() {
  $('#main-clip').show();
  $('#main-video').get(0).play();
  $('#main-audio').get(0).play();
  $('#car-audio').get(0).play();
}

// Показ паузы видео
function showPauseClip(index) {
  const clip = document.getElementById(`clip-${index}`);
  if (clip) {
    $(clip).fadeIn(200).prop('autoplay', true).get(0).play();
    fadeOutAudio(mainAudio, 0.2, 200);
  }
}

// Скрытие паузы видео
function hidePauseClip(index) {
  const clip = document.getElementById(`clip-${index}`);
  if (clip) {
    $(clip).fadeOut(200).prop('autoplay', false).get(0).pause();
    fadeInAudio(mainAudio, 1, 200);
  }
}

// Показ вопроса
function showQuestion(index) {
  const questions = i18next.t('questions', { returnObjects: true });

  if (index >= questions.length) {
    showFinalResult();
    return;
  }

  const question = questions[index];
  if (!question || !question.options) {
    console.error(`Question or options not found for index: ${index}`);
    return;
  }

  updateQuestionContent(index);

  const questionButtons = question.options.map((option, idx) => `
    <button class="quiz_button">${idx + 1}. ${option}</button>
  `).join('');

  $('#quiz .quiz_body').show().html(questionButtons);
  $('#quiz').fadeIn(200);

  $('.quiz_button').off('click').on('click', function () {
    const selectedOption = $(this).text().replace(/^\d+\.\s*/, '');
    if (selectedOption === question.correctAnswer) {
      score++;
    }

    answeredQuestions.add(index);

    $('#quiz .quiz_body').fadeOut(200, () => {
      $('.quiz_result-message').data('feedback-key', selectedOption === question.correctAnswer ? 'correct' : 'incorrect');
      $('.quiz_result-message').data('feedback-index', index);
      showFeedback();
      $('.quiz_result').fadeIn(200);

      $('#quiz-next-btn').off('click').on('click', () => {
        $('.quiz_result').fadeOut(200, () => {
          $('#quiz').fadeOut(200, () => {
            hidePauseClip(index);
            currentQuestion++;
            if (currentQuestion < stopTimes.length) {
              video.currentTime = stopTimes[currentQuestion - 1].end;
              video.play();
              mainAudio.play();
              carAudio.play();
            } else {
              showFinalResult();
            }
          });
        });
      });
    });
  });
}

function updateQuestionContent(index) {
  const questions = i18next.t('questions', { returnObjects: true });
  const question = questions[index];
  $('#quiz .quiz_message-p').text(question.text);
}

// Показ обратной связи
function showFeedback() {
  const feedbackKey = $('.quiz_result-message').data('feedback-key');
  const feedbackIndex = $('.quiz_result-message').data('feedback-index');
  if (feedbackKey) {
    const questions = i18next.t('questions', { returnObjects: true });
    const feedbackText = i18next.t(questions[feedbackIndex].feedback[feedbackKey]);
    $('.quiz_result-message').text(feedbackText);
  }
}

// Показ финального результата
function showFinalResult() {
  $('#quiz').hide();
  const totalQuestions = i18next.t('questions', { returnObjects: true }).length;
  let resultText = '';
  let resultImageUrl = '';

  if (score >= 9) {
    resultText = i18next.t('results.9-11');
    resultImageUrl = 'https://uploads-ssl.webflow.com/6672afeafc31823192f2552f/66788f7db61f47f75879d25c_9-11.webp';
  } else if (score >= 6) {
    resultText = i18next.t('results.6-8');
    resultImageUrl = 'https://uploads-ssl.webflow.com/6672afeafc31823192f2552f/66788f7e84abff9cd9e4b9e6_6-8.webp';
  } else if (score >= 2) {
    resultText = i18next.t('results.2-5');
    resultImageUrl = 'https://uploads-ssl.webflow.com/6672afeafc31823192f2552f/66788f7de087682c0094fe9e_2-5.webp';
  } else {
    resultText = i18next.t('results.0-1');
    resultImageUrl = 'https://uploads-ssl.webflow.com/6672afeafc31823192f2552f/66788f7d859c2b8102452b2f_0-1.webp';
  }

  $('#global-result').show();
  $('#global-result .quiz_message-p').text(`${score}/${totalQuestions}: ${resultText}`);
  $('#result-sticker').attr('src', resultImageUrl);

  $('#restart-btn').off('click').on('click', restartQuiz);
}

// Перезапуск викторины
function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  answeredQuestions.clear();
  $('#global-result').hide();
  $('#clip-11').hide().get(0).pause();
  $('#quiz').fadeOut(200);

  video.pause();
  video.currentTime = 5;
  startVideoAndAudio();
}

// Инициализация событий загрузки
$(document).ready(function () {
  initializeI18next();

  $('#main-video').on('loadeddata', function () {
    resourcesLoaded.video = true;
  });

  $('#main-audio').on('loadeddata', function () {
    resourcesLoaded.mainAudio = true;
  });

  $('#main-video').get(0).load();
  $('#main-audio').get(0).load();
  $('#car-audio').get(0).load();

  // Обработка загрузки прогресса видео
  const mainVideo = $('#main-video').get(0);
  const mainAudio = $('#main-audio').get(0);
  const carAudio = $('#car-audio').get(0);

  const updateBufferingProgress = (mediaElement) => {
    let buffered = 0;
    for (let i = 0; i < mediaElement.buffered.length; i++) {
      buffered += mediaElement.buffered.end(i) - mediaElement.buffered.start(i);
    }
    return buffered / mediaElement.duration;
  };

  const handleBuffering = () => {
    const videoBuffered = updateBufferingProgress(mainVideo);
    const audioBuffered = updateBufferingProgress(mainAudio);
    const carAudioBuffered = updateBufferingProgress(carAudio);

    const totalBuffered = Math.round((videoBuffered + audioBuffered + carAudioBuffered) / 3);

    if (totalBuffered === 1) {
      checkAllResourcesLoaded()
      // $('.preloader').fadeOut(200, () => {
      //   $('.main-screen').fadeIn(200);
      //   startVideoAndAudio(); // Стартуем видео и аудио после скрытия прелоадера
      // });
    }
  };

  mainVideo.addEventListener('progress', handleBuffering);
  mainAudio.addEventListener('progress', handleBuffering);
  carAudio.addEventListener('progress', handleBuffering);
});

// Обработчик клика на кнопку старта
$('#start').click(function () {
  $('.main-screen').fadeOut(200, startVideoAndAudio);
});

// Обработчик клика для переключения звука
$('#toggleAudio').click(function () {
  const mainAudio = $('#main-audio').get(0);
  const carAudio = $('#car-audio').get(0);

  mainAudio.muted = !mainAudio.muted;
  carAudio.muted = !carAudio.muted;
  $('#sound-rect').toggle(mainAudio.muted);
});

// Обработчик клика для смены языка
$('[data-lng]').click(function () {
  const lng = $(this).attr('data-lng');
  i18next.changeLanguage(lng, function (err, t) {
    if (err) {
      console.error('Error changing language', err);
    }
    updateContent();
  });
});

const video = document.getElementById('main-video');
const mainAudio = document.getElementById('main-audio');
const carAudio = document.getElementById('car-audio');
video.playbackRate = import.meta.env.MODE === 'development' ? 10.0 : 1.0;
video.currentTime = 5.0;

video.addEventListener('timeupdate', function () {
  if (currentQuestion < stopTimes.length && video.currentTime >= stopTimes[currentQuestion].start) {
    video.pause();
    showPauseClip(currentQuestion);
    if (!answeredQuestions.has(currentQuestion)) {
      showQuestion(currentQuestion);
    } else {
      updateQuestionContent(currentQuestion);
    }
  }
});