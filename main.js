import Backend from 'i18next-http-backend';
import { fadeInAudio, fadeOutAudio } from './helpers';
// Функция для проверки загрузки всех ресурсов
function checkAllResourcesLoaded() {
  if (resourcesLoaded.video && resourcesLoaded.mainAudio && resourcesLoaded.carAudio && resourcesLoaded.language) {
    $('.preloader').fadeOut(200, function () {
      $('.main-screen').fadeIn(200);
    });
  }
}

// Объект для отслеживания загрузки ресурсов
const resourcesLoaded = {
  video: false,
  mainAudio: true,
  carAudio: true,
  language: false
};

$(document).ready(function () {
  // Инициализация i18next
  i18next
    .use(Backend)
    .init({
      lng: 'en',
      fallbackLng: 'en',
      backend: {
        loadPath: 'https://cdn.jsdelivr.net/gh/yndmitry/inDrive@master/public/locales/{{lng}}.json'
      }
    }, function (err, t) {
      if (err) return console.error(err);
      updateContent();
      resourcesLoaded.language = true;
      checkAllResourcesLoaded();
    });

  // Отслеживание загрузки видео
  $('#main-video').on('loadeddata', function () {
    resourcesLoaded.video = true;
    checkAllResourcesLoaded();
  });

  // Отслеживание загрузки основного аудио
  // $('#main-audio').on('loadeddata', function () {
  //   resourcesLoaded.mainAudio = true;
  //   checkAllResourcesLoaded();
  // });

  // Отслеживание загрузки аудио автомобиля
  // $('#car-audio').on('loadeddata', function () {
  //   resourcesLoaded.carAudio = true;
  //   checkAllResourcesLoaded();
  // });

  // Убедитесь, что аудио и видео загружаются
  $('#main-video').get(0).load();
  $('#main-audio').get(0).load();
  $('#car-audio').get(0).load();
});

$('#start').click(function () {
  $('.main-screen').fadeOut(200, function () {
    startVideoAndAudio();
  });
});

function startVideoAndAudio() {
  $('#main-clip').show();
  $('#main-video').get(0).play();
  $('#main-audio').get(0).play();
  $('#car-audio').get(0).play();
}

function updateContent() {
  const currentLanguage = i18next.language;
  const isRtlLanguage = ['ar', 'ur'].includes(currentLanguage);

  if (isRtlLanguage) {
    document.body.classList.add('rtl');
  } else {
    document.body.classList.remove('rtl');
  }

  $('#intro').text(i18next.t('intro.text'));
  $('#start').text(i18next.t('intro.button'));
  $('#restart-btn').text(i18next.t('main.tryAgainButton'))
  $('#quiz-next-btn').text(i18next.t('main.nextButton'))

  // Update feedback and result texts if visible
  if ($('#global-result').is(':visible')) {
    showFinalResult(); // Обновить результат при переключении языка
  }

  if ($('.quiz_result').is(':visible')) {
    showFeedback(); // Обновить feedback при переключении языка
  }

  // Refresh current question and feedback if needed
  if (currentQuestion < stopTimes.length) {
    $('.quiz_result').hide()
    showQuestion(currentQuestion); // Refresh current question in new language
  }
}

const video = document.getElementById('main-video');
const mainAudio = document.getElementById('main-audio');
const carAudio = document.getElementById('car-audio');
video.playbackRate = 10.0; // Установите желаемую скорость воспроизведения для тестирования
video.currentTime = 5.0

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

let currentQuestion = 0;
let score = 0;

video.addEventListener('timeupdate', function () {
  if (currentQuestion < stopTimes.length && video.currentTime >= stopTimes[currentQuestion].start) {
    video.pause();
    showPauseClip(currentQuestion);
    showQuestion(currentQuestion);
  }
});

function showPauseClip(index) {
  const clip = document.getElementById(`clip-${index}`);
  if (clip) {
    $(clip).fadeIn(200).prop('autoplay', true).get(0).play();
    fadeOutAudio(mainAudio, 0.2, 200)
  }
}

function hidePauseClip(index) {
  const clip = document.getElementById(`clip-${index}`);
  if (clip) {
    $(clip).fadeOut(200).prop('autoplay', false).get(0).pause();
    fadeInAudio(mainAudio, 1, 200)
  }
}

function showQuestion(index) {
  console.log(index)
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

  const questionButtons = question.options.map((option, idx) => `
    <button class="quiz_button">${idx + 1}. ${option}</button>
  `).join('');

  $('#quiz .quiz_message-p').text(question.text);
  $('#quiz .quiz_body').show().html(questionButtons);
  $('#quiz').fadeIn(200);

  $('.quiz_button').off('click').on('click', function () {
    const selectedOption = $(this).text();
    const cleanedOption = selectedOption.replace(/^\d+\.\s*/, '');

    if (cleanedOption === question.correctAnswer) {
      score++;
    }

    $('#quiz .quiz_body').fadeOut(200, function () {
      $('.quiz_result-message').data('feedback-key', cleanedOption === question.correctAnswer ? 'correct' : 'incorrect');
      $('.quiz_result-message').data('feedback-index', question);
      showFeedback();
      $('.quiz_result').fadeIn(200);

      $('#quiz-next-btn').off('click').on('click', function () {
        $('.quiz_result').fadeOut(200, function () {
          $('#quiz').fadeOut(200, function () {
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

function showFeedback() {
  const feedbackKey = $('.quiz_result-message').data('feedback-key');
  const feedbackIndex = $('.quiz_result-message').data('feedback-index');
  if (feedbackKey) { // Убедимся, что feedbackKey существует
    const feedbackText = i18next.t(feedbackIndex['feedback'][feedbackKey]);
    $('.quiz_result-message').text(feedbackText);
  }
}

function showFinalResult() {
  $('#quiz').hide();
  const totalQuestions = i18next.t('questions', { returnObjects: true }).length;
  let resultText = "";
  let resultImageUrl = ""; // Новый URL изображения

  if (score >= 9) {
    resultText = i18next.t('results.9-11');
    resultImageUrl = "https://uploads-ssl.webflow.com/6672afeafc31823192f2552f/66788f7db61f47f75879d25c_9-11.webp";
  } else if (score >= 6) {
    resultText = i18next.t('results.6-8');
    resultImageUrl = "https://uploads-ssl.webflow.com/6672afeafc31823192f2552f/66788f7e84abff9cd9e4b9e6_6-8.webp";
  } else if (score >= 2) {
    resultText = i18next.t('results.2-5');
    resultImageUrl = "https://uploads-ssl.webflow.com/6672afeafc31823192f2552f/66788f7de087682c0094fe9e_2-5.webp";
  } else {
    resultText = i18next.t('results.0-1');
    resultImageUrl = "https://uploads-ssl.webflow.com/6672afeafc31823192f2552f/66788f7d859c2b8102452b2f_0-1.webp";
  }

  $('#global-result').show()
  $('#global-result .quiz_message-p').text(`${score}/${totalQuestions}: ${resultText}`);
  $('#result-sticker').attr('src', resultImageUrl); // Установка URL изображения

  // Show restart button
  $('#restart-btn').off('click').on('click', function () {
    restartQuiz();
  });
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  $('#global-result').hide();
  $('#clip-11').hide().get(0).pause()
  $('#quiz').fadeOut(200);

  video.pause();
  video.currentTime = 0;
  startVideoAndAudio();
}

// Toggle audio
$('#toggleAudio').click(function () {
  if (mainAudio.muted) {
    mainAudio.muted = false;
    carAudio.muted = false;
    $('#sound-rect').hide()
  } else {
    mainAudio.muted = true;
    carAudio.muted = true;
    $('#sound-rect').show()
  }
});

i18next.on('languageChanged', () => {
  console.log('Language changed to:', i18next.language);
  updateContent();
});

// Change language
$('[data-lng]').click(function () {
  const lng = $(this).attr('data-lng');
  i18next.changeLanguage(lng, function (err, t) {
    if (err) return console.error('Error changing language', err);
  });
});
