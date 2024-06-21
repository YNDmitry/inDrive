import Backend from 'i18next-http-backend';

i18next
  .use(Backend)
  .init({
    lng: 'en', // Set the default language
    fallbackLng: 'en',
    backend: {
      loadPath: 'http://localhost:5173/locales/{{lng}}.json' // Path to the language files
    }
  }, function (err, t) {
    if (err) return console.error(err);
    updateContent();
  });

$('#start').click(function () {
  $('.main-screen').fadeOut(200, function () {
    document.getElementById('main-video').play();
  })
})

function updateContent() {
  const language = i18next.language;
  $('#intro').text(i18next.t('intro.text'));
  $('#start').text(i18next.t('intro.button'))
  const quizDiv = $('#quiz');
  quizDiv.empty();

  quizData.questions.forEach(question => {
    const questionDiv = $(`
          <div class="question" data-id="${question.id}">
            <p>${i18next.t(`questions.${question.id - 1}.text`)}</p>
            ${question.options[language].map(option => `
              <label>
                <input type="radio" name="question${question.id}" value="${option}">
                ${option}
              </label>
            `).join('')}
          </div>
        `);
    quizDiv.append(questionDiv);
  });
}

const video = document.getElementById('main-video');
const stopTimes = [
  { start: 12, end: 16 },
  { start: 30, end: 34 },
  { start: 22, end: 30 },
  { start: 40, end: 45 },
  { start: 50, end: 55 },
  { start: 60, end: 65 },
  { start: 70, end: 75 },
  { start: 80, end: 85 },
  { start: 90, end: 95 },
  { start: 100, end: 105 },
  { start: 110, end: 115 },
  { start: 120, end: 125 },
  { start: 130, end: 135 }
];
let currentQuestion = 0;
let loopInterval = null;

video.addEventListener('timeupdate', function () {
  if (currentQuestion < stopTimes.length && video.currentTime >= stopTimes[currentQuestion].start) {
    video.pause();
    loopVideoSegment(stopTimes[currentQuestion].start, stopTimes[currentQuestion].end);
    showQuestion(currentQuestion);
    currentQuestion++;
  }
});

function loopVideoSegment(start, end) {
  video.currentTime = start;
  video.play();

  video.addEventListener('timeupdate', function loop() {
    if (video.currentTime >= end) {
      video.currentTime = start;
      video.play();
    }
  });

  // Stop looping when the question is answered
  $('#quiz button.continue').click(function () {
    video.removeEventListener('timeupdate', loop);
    video.currentTime = end;
    video.play();
  });
}

function showQuestion(index) {
  const question = quizData.questions[index];
  const language = i18next.language;
  const questionDiv = $(`
    <div class="question" data-id="${question.id}">
      <p>${i18next.t(`questions.${question.id - 1}.text`)}</p>
      ${question.options[language].map(option => `
        <label>
          <input type="radio" name="question${question.id}" value="${option}">
          ${option}
        </label>
      `).join('')}
      <button class="continue">Continue</button>
    </div>
  `);
  $('#quiz').html(questionDiv).fadeIn(200);
}

$('#submitQuiz').click(function () {
  let score = 0;
  const language = i18next.language;

  quizData.questions.forEach(question => {
    const selectedOption = $(`input[name=question${question.id}]:checked`).val();
    const correctAnswer = question.correctAnswer[language];
    const feedbackDiv = $(`<div class="feedback"></div>`);

    if (selectedOption === correctAnswer) {
      score++;
      feedbackDiv.text(i18next.t(`questions.${question.id - 1}.feedback.correct`));
    } else {
      feedbackDiv.text(i18next.t(`questions.${question.id - 1}.feedback.incorrect`));
    }

    $(`div[data-id=${question.id}]`).append(feedbackDiv);
  });

  const resultDiv = $('#result');
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

  resultDiv.text(`Your score: ${score}\n${resultText}`);
});