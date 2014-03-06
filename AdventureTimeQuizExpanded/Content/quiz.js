$(document).ready(function () {


    $('a#topScoreButton.btn.btn-primary.btn-lg').click(function () {

        getScores();


        $('#topScores').toggleClass('hidden');
        $('#topScoreButton').addClass('hidden');
        $('#reset').toggleClass('hidden');
        $('#question').toggleClass('hidden');

    });


    $('a#gameSetup.btn.btn-primary.btn-lg').click(function () {
        questionManager();

        playerName = $('#playerName').val();
        $('.radio').removeClass('hidden');
        $('#submit').toggleClass('hidden');
        $('.userSetup').toggleClass('hidden');
        $('a#gameSetup.btn.btn-primary.btn-lg').toggleClass('hidden');
    });

    $('a#submit.btn.btn-primary.btn-lg').click(function () {
        submitAnswer();

        $('#answerFeedBack').removeClass('hidden');
        $('.radio').toggleClass('hidden');
        $('#submit').toggleClass('hidden');
        $('#nextQuestion').toggleClass('hidden');

        progressBar();
    });

    $('a#nextQuestion.btn.btn-primary.btn-lg').click(function () {


        $('input[name=optionsRadios]').attr('checked', false);
        $('#answerFeedBack').addClass('hidden');
        $('.radio').toggleClass('hidden');
        $('#submit').toggleClass('hidden');
        $('#nextQuestion').toggleClass('hidden');
        $('#imageContainer').addClass('hidden');
        questionManager();
        progressBar();
    });

    $('a#reset.btn.btn-primary.btn-lg').click(function () {

        $('a#reset.btn.btn-primary.btn-lg').toggleClass('hidden');
        $('.radio').removeClass('hidden');
        $('.form-group').removeClass('hidden');
        $('#topScores').toggleClass('hidden');
        $('#submit').toggleClass('hidden')
        $('#imageContainer').toggleClass('hidden');
        correctGuesses = 0;
        wrongGuesses = 0;
        currentQuestionNumber = -1;
        questionManager();
        progressBar();

    });
});

//nasty nasty globals

var correctGuesses = 0;
var playerName = 0;
var wrongGuesses = 0;
var currentQuestionNumber = -1;


var progressBar = function () {

    var percentageSuccess = correctGuesses / 10 * 100;

    var percentageWrong = wrongGuesses / 10 * 100;

    $('div.progress-bar.progress-bar-success').css('width', percentageSuccess + '%');
    $('div.progress-bar.progress-bar-danger').css('width', percentageWrong + '%');

    if (correctGuesses + wrongGuesses == 0) {
        $('.div.progress-bar.progress-bar-success').css('width', '0%');
        $('.div.progress-bar.progress-bar-danger').css('width', '0%');
    }

};

//credit goes to http://www.braingle.com/trivia/quiz.php?id=31634 for some of the quiz questions, thanks guys! Used for non commemrcial purposes and for mah edumahkation. 
var allQuestions = [{
    question: 'How old is Jake?',
    options: ['28', '37', '45', '13'],
    answer: 0,
    gif: '/content/question1.gif',
},
        {
            question: 'Who is ready for Brad?',
            options: ['Jake', 'Lumpy Space Princess', 'BEEMO', 'Gunther'],
            answer: 1,
            gif: '/content/question2.gif',
        },
        {
            question: 'Who is the mightiest hero of Ooo?',
            options: ['Marceline', 'Billy', 'Finn', 'Flame Princess'],
            answer: 1,
            gif: '/content/question3.gif',
        },
        {
            question: "Who has been driven insane by his crown?",
            options: ['Ice King', 'Jake', 'Finn', 'Ghost Princess'],
            answer: 0,
            gif: '/content/question4.gif',
        },
          {
              question: "Who dubbed Finn's voice in the TV series?",
              options: ['Tom Kenny', 'Jeremy Shada', 'Nate Ruess', 'None of the above'],
              answer: 2,
              gif: '/content/question6.gif',
          },
          {
              question: "Who is Jake's girlfriend?",
              options: ['Muscle Princess', 'Sandwhiches', 'Cake', 'Lady Rainicorn'],
              answer: 3,
              gif: '/content/question7.gif',
          },
          {
              question: "Princess Bubblegum has a pet hamster named:",
              options: ['Cuddles', 'Math', 'Science', 'Gunter'],
              answer: 2,
              gif: '/content/question8.gif',
          },
          {
              question: "Who is the most evilest, vilest creature in the Adventure time universe?",
              options: ['Ice King', 'The Liche', 'Princess BubbleGum', 'Gunter'],
              answer: 3,
              gif: '/content/question9.gif',
          },
           {
               question: "What is Finn afraid of?",
               options: ['Ghosts', 'The Liche', 'The Sea', 'Gunter'],
               answer: 2,
               gif: '/content/question10.gif',
           },
        {
            question: "Out of all the princesses, who does the ice king stalk the most?",
            options: ['Lumpy Space Princess', 'Embryo Princess', 'Jungle Princess', 'Princess Bubblegum'],
            answer: 3,
            gif: '/content/question5.gif',
        }
];


//handles the presentation of the answer and returns the correct answer
var questionManager = function () {

    $('#imageContainer').addClass('hidden');



    $('#question').removeClass('hidden');

    $('.radio').removeClass('hidden');


    if (currentQuestionNumber <= 8) {
        var question = allQuestions[currentQuestionNumber + 1]
        $('#question').html(question.question);
        $('#answer0').html(question.options[0]);
        $('#answer1').html(question.options[1]);
        $('#answer2').html(question.options[2]);
        $('#answer3').html(question.options[3]);

    }

    else {
        gameOver();
    }
}

var submitAnswer = function () {


    var userAnswer = $('input[name=optionsRadios]:radio:checked').val();
    var checkBlanks = $("input:radio[name='optionsRadios']").is(":checked")

    var question = allQuestions[currentQuestionNumber + 1]

    if (checkBlanks == false) {
        $('#answerFeedBack').html('<div class="alert alert-danger">Please select an answer, Ooo is a pretty radical place, so you get to try again!</div>');
    }

    else if (userAnswer == question.answer) {
        $('#answerFeedBack').html('<div class="alert alert-success">Correct answer! Awesome man,' + ' your answer ' + question.options[question.answer] + ' was totes radical!</div>');
        $('#answerFeedBack').toggleClass('hidden');
        correctGuesses++;
        currentQuestionNumber++;
        $('#imageContainer').html("<img id= 'images' src=" + question.gif + ">");
        $('#imageContainer').removeClass('hidden');

    }

    else {
        $('#answerFeedBack').html('<div class="alert alert-danger">' + 'Wrong! The correct answer is ' + question.options[question.answer] + '. You guessed: ' + question.options[userAnswer] + '</div>');
        $('#answerFeedBack').toggleClass('hidden');
        wrongGuesses++;
        currentQuestionNumber++;
        $('#imageContainer').html("<img id= 'images' src=" + question.gif + ">");
        $('#imageContainer').removeClass('hidden');

    }
};

var gameOver = function () {

    saveQuiz();

    $('.form-group').toggleClass('hidden');
    $('#submit').toggleClass('hidden')
    $('#topScoreButton').toggleClass('hidden');
    $('#nextQuestion').addClass('hidden');
    $('#question').html('<div class="alert alert-danger">' + 'You finished the quiz! ' + 'You got ' + correctGuesses + ' / 10' + ' questions correct.</div>');

};

function getScores() {

    event.preventDefault();

    $.ajax({
        type: 'post',
        url: "/Home/getScores",

        success: function (data, status) {
            console.log(data);
            for (var i = 0; i < 10; i++) {
                $('#topScores').append("<p>" + data.AllScores[i].Name + " got " + data.AllScores[i].Correct + " questions correct" + "</p>");
                console.log("showing top scores");
            }
        }
    });

}

var saveQuiz = function () {

    event.preventDefault();

    var quiz = new quizModel();

    $.ajax({
        type: 'post',
        url: "/Home/Insert",
        data: quiz,

        success: function (data, status) {
            console.log("saving data");
        }
    });

}

var quizModel = function () {
    var self = this;
    self.Name = playerName;
    self.Correct = correctGuesses;
    self.Incorrect = wrongGuesses;
}