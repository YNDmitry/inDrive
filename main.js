import info from './public/info.json'
const quizData = info
console.log(info)
i18next.init({
  lng: 'en', // Language can be dynamically changed
  resources: {
    en: { translation: quizData },
    ru: { translation: quizData }
  }
}, function (err, t) {
  updateContent();
});

$('#start').click(function () {
  $('.main-screen').fadeOut(200, function () {
    document.querySelector('video').play();
  })
})

function updateContent() {
  const language = i18next.language;
  $('#intro').text(i18next.t('intro'));
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