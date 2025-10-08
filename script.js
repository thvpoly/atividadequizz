const questions = [
    {
      question: "Qual é o principal objetivo da fermentação no processo de produção do café?",
      answers: [
        { id: 1, text: "Melhorar o sabor do café com acidez excessivao", correct: false },
        { id: 2, text: "Desenvolver aromas e sabores mais complexos no café", correct: true },
        { id: 3, text: "Acelerar a torra dos grãos", correct: false },
        { id: 4, text: "Reduzir o custo de produção", correct: false },
      ],
    },
    {
      question: "Qual é o método de preparação de café que utiliza pressão para forçar a água quente através do pó de café finamente moído?",
      answers: [
        { id: 1, text: "French Press", correct: false },
        { id: 2, text: "Aeropress", correct: false },
        { id: 3, text: "Espresso", correct: true },
        { id: 4, text: "V60", correct: false },
      ],
    },
    {
      question: "O que caracteriza um café de torra clara",
      answers: [
        { id: 1, text: "O café tem sabores mais amargos e fortes", correct: false },
        { id: 2, text: "O café mantém mais notas de acidez e sabores originários do grão.", correct: true },
        { id: 3, text: "O café perde completamente as notas originais e ganha sabor mais doce", correct: false },
        { id: 4, text: "A torra clara é utilizada apenas para cafés com alto teor de cafeína", correct: false },
      ],
    },
    {
      question: "Qual dos seguintes tipos de grão de café é mais comum no Brasil?",
      answers: [
        { id: 1, text: "Arábica", correct: true },
        { id: 2, text: "Robusta", correct: false },
        { id: 3, text: "Maragogipe", correct: false },
        { id: 4, text: "Liberica", correct: false },
      ],
    },
  ];
  
  const questionElement = document.getElementById("question");
  const answerButtons = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Próxima";
    showQuestion();
  }
  
  function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  
    currentQuestion.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      answerButtons.appendChild(button);
  
      button.dataset.id = answer.id;
  
      button.addEventListener("click", selectAnswer);
    });
  }
  
  function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }
  }
  
  function selectAnswer(e) {
    answers = questions[currentQuestionIndex].answers;
    const correctAnswer = answers.filter((answer) => answer.correct == true)[0];
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.id == correctAnswer.id;
    if (isCorrect) {
      selectedBtn.classList.add("correct");
      score++;
    } else {
      selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach((button) => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
      button.disabled = true;
    });
    nextButton.style.display = "block";
  }
  
  function showScore() {
    resetState();
    questionElement.innerHTML = `Você acertou ${score} de ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
  }
  
  function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  }
  
  nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
      handleNextButton();
    } else {
      startQuiz();
    }
  });
  
  startQuiz();