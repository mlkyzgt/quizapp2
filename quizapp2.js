const quizData = [
    {
        question: "Hangi yıl ve nerede, ilk insanlı uzay uçuşu gerçekleşmiştir?",
        imgLink: 'https://cdn.mos.cms.futurecdn.net/ZsAT7365H9z2re2tF4CJwa.jpg',
        answers: [
            { text: "1961-ABD", isCorrect: false },
            { text: "1961-Sovyetler Birliği", isCorrect: true },
            { text: "1969-ABD", isCorrect: false },
            { text: "1969-Sovyetler Birliği", isCorrect: false }
        ]
    },
    {
        question: "Ünlü ressam Pablo Picasso hangi ülkenin vatandaşıdır?",
        imgLink: 'https://wp.oggusto.com/wp-content/uploads/2023/04/pablo-picasso-hayati-eserleri-ve-bilinmeyenleri.webp',
        answers: [
            { text: "İtalya", isCorrect: false },
            { text: "Fransa", isCorrect: false },
            { text: "İspanya", isCorrect: true },
            { text: "Almanya", isCorrect: false }
        ]
    },
    {
        question: "Altın elementi periyodik tabloda nasıl gösterilir?",
        imgLink: 'https://i.bigpara.com/i/55big/altin1234.jpg',
        answers: [
            { text: "Ag", isCorrect: false },
            { text: "Au", isCorrect: true },
            { text: "Cu", isCorrect: false },
            { text: "Pt", isCorrect: false }
        ]
    },
    {
        question: "Hangi gezegen, Güneş Sistemi'nde en büyük çaplı gezegendir?",
        imgLink: 'https://imageio.forbes.com/specials-images/imageserve/624c6d084510a29690cb8b21/0x0.jpg?format=jpg&height=600&width=1200&fit=bounds',
        answers: [
            { text: "Mars", isCorrect: false },
            { text: "Jüpiter", isCorrect: true },
            { text: "Venüs", isCorrect: false },
            { text: "Satürn", isCorrect: false }
        ]
    },
    {
        question: 'Hangi yıl ve hangi şehirde, modern Olimpiyat Oyunları\'nın ilk kez düzenlendi?',
        imgLink: 'https://i0.wp.com/mesutozdemir.org/wp-content/uploads/2023/01/olimpiyat-oyunlari-scaled.jpg?fit=2560%2C1810&ssl=1',
        answers: [
            { text: '1896 - Atina', isCorrect: true },
            { text: '1900 - Paris', isCorrect: false },
            { text: '1924 - Amsterdam', isCorrect: false },
            { text: '1988 - Seul', isCorrect: false }
        ]
    },
    {
        question: 'Hangi ünlü fizikçi, "E=mc²" formülünü geliştirmiştir?',
        imgLink: 'https://www.bilimseldunya.com/wp-content/uploads/2022/03/Emc².jpg',
        answers: [
            { text: "Isaac Newton", isCorrect: false },
            { text: "Albert Einstein", isCorrect: true },
            { text: "Niels Bohr", isCorrect: false },
            { text: "Max Planck", isCorrect: false }
        ]
    },
];
let activeQuestionIndex = 0;
let correctAnswers = 0;
let quizStarted = false;

function startQuiz() {
    quizStarted = true;
    document.getElementById('start-quiz').style.display = 'none';
    loadQuestion();
}

function loadQuestion() {
    if (!quizStarted) {
        return;
    }

    const currentQuestion = quizData[activeQuestionIndex];
    const questionElement = document.getElementById('question');
    const answerListElement = document.getElementById('answer-list');
    const imageElement = document.getElementById('question-image');
    const questionNumberElement = document.getElementById('question-number');

    questionNumberElement.textContent = activeQuestionIndex + 1 + '/' + quizData.length;

    questionElement.textContent = '';
    answerListElement.innerHTML = '';

    questionElement.textContent = currentQuestion.question;
    imageElement.setAttribute('src', currentQuestion.imgLink);

    currentQuestion.answers.forEach(answer => {
        const li = document.createElement('li');
        li.textContent = answer.text;
        li.onclick = () => checkAnswer(answer.isCorrect);
        answerListElement.appendChild(li);
    });
}

function checkAnswer(isCorrect) {
    if (!quizStarted) {
        return;
    }

    if (isCorrect) {
        correctAnswers++;
    }

    if (activeQuestionIndex < quizData.length - 1) {
        activeQuestionIndex++;
        loadQuestion();
    } else {
        showResult();
    }
}

function nextQuestion() {
    if (!quizStarted) {
        return;
    }

    if (activeQuestionIndex < quizData.length - 1) {
        activeQuestionIndex++;
        loadQuestion();
    } else {
        showResult();
    }
}

function resetQuiz() {
    quizStarted = false;
    activeQuestionIndex = 0;
    correctAnswers = 0;
    document.getElementById('start-quiz').style.display = 'block';
    document.getElementById('next-question').style.display = '';
    loadQuestion();
}

function showResult() {
    quizStarted = false;
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';

    const resultElement = document.createElement('div');
    resultElement.classList.add('result');
    resultElement.textContent = `Test tamamlandı! Toplam doğru sayısı: ${correctAnswers}`;
    quizContainer.appendChild(resultElement);

    const correctAnswersList = document.createElement('ul');
    correctAnswersList.classList.add('correct-list');

    quizData.forEach((question, index) => {
        const listItem = document.createElement('li');
        const correctAnswer = question.answers.find(answer => answer.isCorrect);
        listItem.textContent = `Soru ${index + 1}: ${question.question} - Doğru Cevap: ${correctAnswer.text}`;
        correctAnswersList.appendChild(listItem);
    });

    quizContainer.appendChild(correctAnswersList);
}


loadQuestion();