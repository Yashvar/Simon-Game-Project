var buttonColors =["red","blue","green","yellow"];
var randomChosenColour ="none";
var userClickedPattern =[];


var gamePattern =[];
//////////////////////////////////////////////////////////////////
var started = false;

var level = 0;

//if user presses a key on keyboard
$(document).keypress(function() {
  if (!started) {

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//if user presses the start button
$(".start-button").click(function(){
  if (!started) {

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//////////////////////////////////////////////////////////////////
function nextSequence(){
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.random()*4;
  randomNumber = Math.floor(randomNumber);

  ranColor = buttonColors[randomNumber];

  gamePattern.push(ranColor);

  //$("#"+ranColor).

  $("#"+ranColor).fadeOut(100).fadeIn(100);
  playSound(ranColor);
  //var colorAudio = new Audio("./sounds/"+ranColor+".mp3");
  //colorAudio.play();

}


function playSound(name){
  var colorAudio = new Audio("./sounds/"+name+".mp3");
  colorAudio.play();
}


$(".btn").click(function(){


  var eventElement = event.target;

  // Access the id of the event element using eventElement.id
  var userChosenColour = eventElement.id;

  userClickedPattern.push(userChosenColour);

  ///////////////////////////////////////////////////console.log(userClickedPattern);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  //console.log(userClickedPattern.length);
  checkAnswer(userClickedPattern.length-1);

  //nextSequence();
  //var userChosenColour = $("#"+ranColor).attr("id")
});


function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  var delayInMilliseconds = 150;

  setTimeout(function() {
    $("#"+currentColor).removeClass("pressed");
  }, delayInMilliseconds);
}


function checkAnswer(currLevel){

  if (gamePattern[currLevel]==userClickedPattern[currLevel]){
    //////////////////////////////////////console.log(userClickedPattern[currLevel]);
    console.log("success");
    if (userClickedPattern.length==gamePattern.length){
      //delay
          var delayInMilliseconds = 1000;

          setTimeout(function() {
            nextSequence();
            userClickedPattern=[];
          }, delayInMilliseconds);
      //delay
    }


  }else{
    console.log("wrong");
    var wrongAudio = new Audio("./sounds/wrong.mp3");
    wrongAudio.play();
    startOver();
    $("h1").text("Game Over, Press Any Key to Restart");
    //delay
        var delay = 200;
        $("body").addClass("game-over");
        setTimeout(function() {
          $("body").removeClass("game-over");
        }, delay);


    //delay
    startOver();
  }

}
function startOver(){
  level=0;
  gamePattern=[];
  userClickedPattern=[];
  started=false;
}
