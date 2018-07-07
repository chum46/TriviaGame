var questionArr = [{
    question: "In the episode 'Get Schwifty, which rapper is the sole survivor of a catastrophe at the Grammys that kills all of Earth's musical artists?",
    choices: ["Ice Cube","Ice-T","Vanilla Ice","Jay-Z"],
    correctAns: "Ice-T",
    image: "./assets/images/schwifty.gif"
}, {
    question: "Which of these is NOT a Rick catchphrase?",
    choices: ["And that's the wayyyyy the news goes", "Wubbalubbadubdub","Hit the sack, Jack","Death to Cromulon"],
    correctAns: "Death to Cromulon",
    image: "./assets/images/wubba.gif"
}];

$('#start').on('click',function(){
    $('#start').remove();
    game.loadQ();
})

$(document).on('click','.button2',function(e){
    game.clicked(e);
})

var game = {
    questions: questionArr,
    questionNow: 0,
    counter: 10,
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
        $('#subcontainer').html("<h2>"+questionArr[game.questionNow].question+"</h2>");
        for(var i=0;i<questionArr[game.questionNow].choices.length;i++){
            $('#subcontainer').append('<button class="button2" id="button-'+ i + '" data-name="'+questionArr[game.questionNow].choices[i]+'">'+questionArr[game.questionNow].choices[i]+'</button>'+'\n');

        }
    },
    nextQ: function(){
        game.counter = 10;
        $('#counter').html(game.counter);
        game.questionNow++;
        game.loadQ();
    },
    timesUp: function(){
        clearInterval(timer);
        game.incorrect++;
        $('#subcontainer').html('<h2> OUT OF TIME! </h2>');
        if (game.questionNow==questionArr.length-1){
            setTimeout(game.results,3*1000);
        } else {
            setTimeout(game.nextQ,3*1000);
        }
    },
    results: function(){
        clearInterval(timer);
        $('#subcontainer').html('<h1> Game Completed! </h1>');
        $('#subcontainer').append('<h2>'+game.correct+' Correct </h2>');
        $('#subcontainer').append('<h2> out of '+questionArr.length+'</h2>');
    },
    clicked: function(e){
        clearInterval(timer);
        if($(e.target).data("name")==questionArr[game.questionNow].correctAns){
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
        $('#subcontainer').append("<img src = "+questionArr[game.questionNow].image+">");
        if (game.questionNow==questionArr.length-1){
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
        if (game.questionNow==questionArr.length-1){
            setTimeout(game.results,3*1000);
        } else {
            setTimeout(game.nextQ,3*1000);
        }
    },
    resetGame: function(){

    }
}