import Backend from 'i18next-http-backend';

i18next
  .use(Backend)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    backend: {
      loadPath: 'https://cdn.jsdelivr.net/gh/yndmitry/inDrive/public/locales/{{lng}}.json'
    }
  }, function (err, t) {
    if (err) return console.error(err);
    updateContent();
  });

$('#start').click(function () {
  $('.main-screen').fadeOut(200, function () {
    startVideoAndAudio();
  });
});

function startVideoAndAudio() {
  document.getElementById('main-video').play();
  document.getElementById('main-audio').play();
  document.getElementById('car-audio').play();
}

function updateContent() {
  $('#intro').text(i18next.t('intro.text'));
  $('#start').text(i18next.t('intro.button'));
  if (currentQuestion > 0 && currentQuestion < stopTimes.length - 1) {
    if ($('.quiz_body').is(':visible')) {
      showQuestion(currentQuestion); // Refresh current question in new language
    } else if ($('.quiz_result').is(':visible')) {
      showFeedback(); // Refresh feedback in new language
    }
  }
}

const video = document.getElementById('main-video');
const mainAudio = document.getElementById('main-audio');
const carAudio = document.getElementById('car-audio');
video.playbackRate = 10.0; // Установите желаемую скорость воспроизведения для тестирования

const stopTimes = [
  { start: 12, end: 16 },
  { start: 30, end: 34 },
  { start: 45, end: 49 },
  { start: 60, end: 64 },
  { start: 75, end: 79 },
  { start: 92, end: 96 },
  { start: 112, end: 116 },
  { start: 136, end: 141 },
  { start: 161, end: 165 },
  { start: 180, end: 184 },
  { start: 205, end: 209 },
  { start: 238, end: 245 }
];

let currentQuestion = 0;
let score = 0;
let isLooping = false;
let loopHandler = null;

video.addEventListener('timeupdate', function () {
  if (!isLooping && currentQuestion < stopTimes.length && video.currentTime >= stopTimes[currentQuestion].start) {
    video.pause();
    if (currentQuestion < stopTimes.length - 1) {
      showQuestion(currentQuestion);
      startLooping(stopTimes[currentQuestion].start, stopTimes[currentQuestion].end);
    } else {
      showFinalResult();
      startLooping(stopTimes[currentQuestion].start, stopTimes[currentQuestion].end);
    }
  }
});

function startLooping(start, end) {
  isLooping = true;

  loopHandler = function () {
    if (video.currentTime >= end) {
      video.currentTime = start;
      video.play();
    }
  };

  video.addEventListener('timeupdate', loopHandler);

  // Start playing the video to initiate the loop
  video.currentTime = start;
  video.play();
}

function stopLooping(end) {
  if (loopHandler) {
    video.removeEventListener('timeupdate', loopHandler);
    loopHandler = null;
  }
  isLooping = false;
  video.currentTime = end;
  video.play();
}

function showQuestion(index) {
  const question = i18next.t(`questions.${index}`, { returnObjects: true });

  if (!question || !question.options) {
    console.error(`Question or options not found for index: ${index}`);
    return;
  }

  const questionButtons = question.options.map(option => `
    <button class="quiz_button">${option}</button>
  `).join('');

  $('#quiz .quiz_message-p').text(question.text);
  $('#quiz .quiz_body').show().html(questionButtons);
  $('#quiz').fadeIn(200);

  $('.quiz_button').off('click').on('click', function () {
    const selectedOption = $(this).text();
    const feedback = selectedOption === question.correctAnswer ? question.feedback.correct : question.feedback.incorrect;

    if (selectedOption === question.correctAnswer) {
      score++;
    }

    $('#quiz .quiz_body').fadeOut(200, function () {
      $('.quiz_result-message').data('feedback', feedback);
      showFeedback();
      $('.quiz_result').fadeIn(200);

      $('#quiz-next-btn').off('click').on('click', function () {
        $('.quiz_result').fadeOut(200, function () {
          $('#quiz').fadeOut(200, function () {
            stopLooping(stopTimes[currentQuestion].end);
            currentQuestion++;
            if (currentQuestion < stopTimes.length - 1) {
              video.currentTime = stopTimes[currentQuestion - 1].end;
              video.play();
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
  const feedback = $('.quiz_result-message').data('feedback');
  $('.quiz_result-message').text(feedback);
}

function showFinalResult() {
  $('#quiz').hide();
  const totalQuestions = i18next.t('questions', { returnObjects: true }).length;
  let resultText = "";

  if (score >= 9) {
    resultText = i18next.t('results.9-11');
  } else if (score >= 6) {
    resultText = i18next.t('results.6-8');
  } else if (score >= 2) {
    resultText = i18next.t('results.2-5');
  } else {
    resultText = i18next.t('results.0-1');
  }

  $('#global-result').show()
  $('#global-result .quiz_message-p').text(`Your score: ${score}/${totalQuestions}\n${resultText}`)

  // Show restart button
  $('#restart-btn').off('click').on('click', function () {
    restartQuiz();
  });
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  $('#global-result').hide();
  $('#quiz').fadeIn(200);

  video.pause();
  stopLooping(stopTimes[stopTimes.length - 1].end);
  video.currentTime = 0;
  startVideoAndAudio();
}

// Toggle audio
$('#toggleAudio').click(function () {
  if (mainAudio.muted) {
    mainAudio.muted = false;
    carAudio.muted = false;
  } else {
    mainAudio.muted = true;
    carAudio.muted = true;
  }
});

// Change language
$('[data-lng]').click(function () {
  const lng = $(this).attr('data-lng');
  i18next.changeLanguage(lng, function (err, t) {
    if (err) return console.error('Error changing language', err);
    updateContent();
  });
});
