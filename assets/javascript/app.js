// ARRAY OF TRIVIA QUESTIONS
var questionArr = [{
    question: "In the episode 'Get Schwifty', which rapper is the sole survivor of a catastrophe at the Grammys that kills all of Earth's musical artists?",
    choices: ["Ice Cube","Ice-T","Vanilla Ice","Jay-Z"],
    correctAns: "Ice-T",
    image: "./assets/images/schwifty.gif"
}, {
    question: "Which of these is NOT a Rick catchphrase?",
    choices: ["And that's the wayyyyy the news goes", "Wubbalubbadubdub","Hit the sack, Jack","Death to Cromulon"],
    correctAns: "Death to Cromulon",
    image: "./assets/images/wubba.gif"
}, {
    question: "Which of these cartoons is considered to be in the same universe as Rick and Morty?",
    choices: ["The Simpsons", "Family Guy", "Gravity Falls", "Futurama"],
    correctAns: "Gravity Falls",
    image: "./assets/images/wubba.gif"
}, {
    question: "What was the original name for Rick and Morty?",
    choices: ["Back to the Future with Rick and Morty", "The Real Animated Adventures of Doc and Marty", "Doc and Morty", "House of Cosbys"],
    correctAns: "The Real Animated Adventures of Doc and Marty",
    image: "./assets/images/wubba.gif"
}, {
    question: "Inside whom was Rick's creation, 'Anatomy Park', located?",
    choices: ["Ruben", "Morty", "Jerry", "Beth"],
    correctAns: "Ruben",
    image: "./assets/images/wubba.gif"
}, {
    question: "The character 'Scary Terry' is a loose parody of... ",
    choices: ["Jason Voohrees", "Chucky", "Hannibal Lecter", "Freddy Krueger"],
    correctAns: "Freddy Krueger",
    image: "./assets/images/wubba.gif"
}, {
    question: "What is the name of Morty's school crush?",
    choices: ["Jody", "Jenny", "Jacqueline", "Jessica"],
    correctAns: "Jessica",
    image: "./assets/images/wubba.gif"
}];

// MAIN PROCESS CLICK EVENTS //

$('#start').on('click',function(){
    // Removes the start button and instructions and loads the game
    $('#start').remove();
    $('#instruction').remove();
    game.loadQ();
})

$(document).on('click','.button2',function(e){
    // Passes the answer that the user clicks on to function
    game.clicked(e);
})

$(document).on('click','#reset',function(){
    // Resets the game without reloading the page
    game.qIndex=0;
    game.correct=0;
    game.incorrect=0;
    game.counter=15;
    game.loadQ();
})

// OBJECT CONTAINING THE GAME FUNCTIONS //
var game = {
    qIndex: 0,
    counter: 15,
    correct: 0,
    incorrect: 0,
    countdown: function(){
        game.counter--;
        $('#counter').html(game.counter);
        if (game.counter<=0){
            // console.log('Time Up!');
            game.timesUp();
        }
    },
    loadQ: function(){
        timer = setInterval(game.countdown,1000);
        $('#subcontainer').html("<h2 id='counter'>15</h2>");
        $('#subcontainer').append("<h2>"+questionArr[game.qIndex].question+"</h2>");
        for(var i=0;i<questionArr[game.qIndex].choices.length;i++){
            $('#subcontainer').append('<button class="button2" id="button-'+ i + '" data-name="'+questionArr[game.qIndex].choices[i]+'">'+questionArr[game.qIndex].choices[i]+'</button>'+'\n');

        }
    },
    nextQ: function(){
        game.counter = 15;
        $('#counter').html(game.counter);
        game.qIndex++;
        game.loadQ();
    },

    timesUp: function(){
        clearInterval(timer);
        game.incorrect++;
        $('#subcontainer').html('<h2> OUT OF TIME! </h2>');
        if (game.qIndex==questionArr.length-1){
            setTimeout(game.results,3*1000);
        } else {
            setTimeout(game.nextQ,3*1000);
        }
    },

    clicked: function(e){
        clearInterval(timer);
        if($(e.target).data("name")==questionArr[game.qIndex].correctAns){
            game.rightAns();
        } else {
            game.wrongAns();
        }
    },
    rightAns: function(){
        // console.log("right");
        clearInterval(timer);
        game.correct++;
        $('#subcontainer').html('<h2> CORRECT!</h2>');
        $('#subcontainer').append("<img src = "+questionArr[game.qIndex].image+"><p><a href='https://giphy.com/gifs/adultswim-3o7TKVH7nbfCVgzaBq'>via GIPHY</a></p>");
        if (game.qIndex==questionArr.length-1){
            setTimeout(game.results,3*1000);
        } else {
            setTimeout(game.nextQ,3*1000);
        }
    },
    wrongAns: function(){
        // console.log("wrong");
        clearInterval(timer);
        game.incorrect++;
        $('#subcontainer').html('<h2> WRONG ANSWER!</h2>');
        $('#subcontainer').append('<div style="width:50%;height:0;padding-bottom:30%;position:relative;"><iframe src="https://giphy.com/embed/Lfa0tFqDoHzd6" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/rick-and-morty-sanchez-smith-Lfa0tFqDoHzd6">via GIPHY</a></p>');
        if (game.qIndex==questionArr.length-1){
            setTimeout(game.results,3*1000);
        } else {
            setTimeout(game.nextQ,3*1000);
        }
    },
    results: function(){
        clearInterval(timer);
        $('#subcontainer').html('<h1> Game Completed! </h1>');
        $('#subcontainer').append('<h2>Correct Answers: '+game.correct+' </h2>');
        $('#subcontainer').append('<h2>Wrong Answers: '+game.incorrect+' </h2><br>');
        if (game.correct>game.incorrect) {
            $('#subcontainer').append('<h2>WINNER!!! You kept Summer Safe </h2>');
            $('#subcontainer').append("<button class='button1' id='reset'>RESTART</button>");
            $('#subcontainer').append("<div style='width:50%;height:0;padding-bottom:30%;position:relative;'><iframe src='https://giphy.com/embed/3o7TKVH7nbfCVgzaBq' width='100%' height='100%' style='position:absolute' frameBorder='0' class='giphy-embed' allowFullScreen></iframe></div><p><a href='https://giphy.com/gifs/adultswim-3o7TKVH7nbfCVgzaBq'>via GIPHY</a></p>");
        } else {
            $('#subcontainer').append('<h2>YOU LOSE... </h2><br><p>Your function is to keep Summer safe. Not to keep Summer being, like... totally stoked about, like... the general vibe and stuff. Try Again.');
            $('#subcontainer').append("<button class='button1' id='reset'>RESTART</button>");
            $('#subcontainer').append("<div style='width:50%;height:0;padding-bottom:30%;position:relative;'><iframe src='https://giphy.com/embed/3o7TKVH7nbfCVgzaBq' width='100%' height='100%' style='position:absolute' frameBorder='0' class='giphy-embed' allowFullScreen></iframe></div><p><a href='https://giphy.com/gifs/adultswim-3o7TKVH7nbfCVgzaBq'>via GIPHY</a></p>");
        }
        // $('#subcontainer').append("<button class='button1' id='reset'>RESTART</button>");
    }
}