const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-text'))
const progressText = document.querySelector('#progressText')
const scoreText = document.querySelector('#score')
const progressBarFull = document.querySelector('#progressBarFull')

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []


let questions = [
    {
        question: 'What does CSS stand for?',
        choice1: 'Cascading Style Sheets',
        choice2: 'Computer Style Sheets',
        choice3: 'Cascading Sheets Style',
        choice4: 'Creative Style Sheets',
        answer: 1,
    },

    {
        question: 'Which of the following is not a programming language?',
        choice1: 'Java',
        choice2: 'HTML',
        choice3: 'Python',
        choice4: 'CSS',
        answer: 2,
    },

    {
        question: 'What is the difference between a stack and a queue data structure?',
        choice1: 'A stack is LIFO (last in, first out), while a queue is FIFO (first in, first out).',
        choice2: 'A stack is FIFO (first in, first out), while a queue is LIFO (last in, first out).',
        choice3: 'Both a stack and a queue are LIFO (last in, first out).',
        choice4: 'Both a stack and a queue are FIFO (first in, first out).',
        answer: 1,
    },
    
    {
        question: 'Who was the first woman to win a Nobel Prize?',
        choice1: 'Dorothy Hodgkin',
        choice2: 'Mother Teresa',
        choice3: 'Marie Curie',
        choice4: 'Jane Addams',
        answer: 3,
    },

    {
        question: 'Which country is the worlds largest producer of coffee?',
        choice1: 'Vietnam',
        choice2: 'Colombia',
        choice3: 'Ethiopia',
        choice4: 'Brazil',
        answer: 4,
    },

    {
        question: 'What is the value of x in the equation 3x^2 - 12x + 9 = 0?',
        choice1: '1',
        choice2: '3',
        choice3: '4',
        choice4: '9',
        answer: 1,
    },

    {
        question: 'What is the value of x in the equation 2^(3x-2) = 16?',
        choice1: '1',
        choice2: '2',
        choice3: '3',
        choice4: '4',
        answer: 3,
    },
    
    {
        question: 'What is the smallest unit of life called?',
        choice1: 'Cell',
        choice2: 'Molecule',
        choice3: 'Atom',
        choice4: 'Electron',
        answer: 1,
    },

    {
        question: 'What is the process by which plants convert light energy into chemical energy?',
        choice1: 'Respiration',
        choice2: 'Fermentation',
        choice3: 'Digestion',
        choice4: 'Photosynthesis',
        answer: 4,
    },

    {
        question: 'What type of force holds the nucleus of an atom together?',
        choice1: 'Electromagnetic force',
        choice2: 'Gravitational force',
        choice3: 'Strong nuclear force',
        choice4: 'Weak nuclear force',
        answer: 3,
    },
    {
        question: 'Which of the following is the highest mountain in Africa?',
        choice1: 'Kilimanjaro',
        choice2: 'Mount Kenya',
        choice3: 'Mount Meru',
        choice4: 'Mount Elgon',
        answer: 1,
    },
    {
        question: 'Who painted the famous artwork "The Persistence of Memory"?',
        choice1: 'Vincent van Gogh',
        choice2: 'Salvador Dali',
        choice3: 'Pablo Picasso',
        choice4: 'Claude Monet',
        answer: 2,
    },
    {
        question: 'What is the name of the process by which liquid water becomes water vapor?',
        choice1: 'Condensation',
        choice2: 'Evaporation',
        choice3: 'Sublimation',
        choice4: 'Melting',
        answer: 2,
    },
    {
        question: 'What is the largest planet in our solar system?',
        choice1: 'Saturn',
        choice2: 'Jupiter',
        choice3: 'Neptune',
        choice4: 'Uranus',
        answer: 2,
    },
    {
        question: 'Which of the following is the oldest of the Seven Wonders of the Ancient World?',
        choice1: 'The Great Pyramid of Giza',
        choice2: 'The Hanging Gardens of Babylon',
        choice3: 'The Colossus of Rhodes',
        choice4: 'The Temple of Artemis at Ephesus',
        answer: 1,
    },


]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 15

startGame = () =>{
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestions()
}

getNewQuestions = () =>{
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('/end.html');

    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question
    

    choices.forEach(choice =>{
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]

    })

    availableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice =>{
    choice.addEventListener('click', e =>{
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']


        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS)

        }


        selectedChoice.parentElement.classList.add(classToApply)
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestions()

        }, 1000)
    })
})

incrementScore = num =>{
    score += num
    scoreText.innerText = score
}
startGame()