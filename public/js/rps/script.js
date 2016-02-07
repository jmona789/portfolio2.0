$(document).ready(function() {
  rps = ["Rock", "Paper", "Scissors"];
  var playerChoice;
  var computerChoice;
  var computerWins = 0;
  var playerWins = 0;
  var round = 1;
  $("#paperIcon").hide();
  $("#scissorsIcon").hide();
  $(".animation").hide();
  $(".playerChoice").hide();
  $(".choiceText").hide();
  $(".winLoseText").hide();
  $("#roundNum").html("Round: "+round);
  $(".face").hide();
  $(".roundAlert").hide();
  $(".playAgainBtn").hide();

  setTimeout(entrancePaper, 300);
  function entrancePaper(){
    $("#paperIcon").show();
  }

  setTimeout(entranceScissors, 600);
  function entranceScissors(){
    $("#scissorsIcon").show();
  }

  setTimeout(tossing, 1000);
  function tossing(){
    $("#scissorsIcon").toggleClass("bigEntrance tossing");
    $("#rockIcon").toggleClass("bigEntrance tossing");
    $("#paperIcon").toggleClass("bigEntrance tossing");
  }

  //Changes animation on mouse enter and changes back on mouse out
  $(".shown").on("mouseenter", function(){
    $(this).toggleClass("tossing");
  });
  $(".shown").on("mouseleave", function(){
    $(this).toggleClass("tossing");
  });

  function computerTurn(ranNum){
    computerChoice = rps[ranNum];
    return computerChoice;
  }

  function animateOut(){
    $("#rockIcon").hide();
    $("#scissorsIcon").hide();
    $(".animation").show();
    $(".rpsIcons").fadeOut("slow");
  }

  function animateChoices(playerChoice, computerChoice){
    playerChoiceId = "#playerChoice"+playerChoice;
    computerChoiceId = "#computerChoice"+computerChoice;
    $(playerChoiceId).delay(500).show(0);
    $(".choiceText").delay(500).fadeIn("slow");
    $(playerChoiceId).delay(4300).fadeOut("slow");
    $(".choiceText").delay(3800).fadeOut("slow");
    $(computerChoiceId).delay(1700).show(0);
    $(computerChoiceId).delay(3300).fadeOut("slow");
    animateIn();
  }

  function animateIn(){
    $("#rockIcon").delay(5500).fadeIn("slow");
    $("#paperIcon").delay(4900).fadeIn("slow");
    $("#scissorsIcon").delay(5500).fadeIn("slow");
  }

  $(".playBtn").on("click", function(){
    roundNum();
    if (roundNum()=== undefined){
      return;
    }else{
      if ($(this).attr("data-status") === "off"){
        $(this).toggleClass("btn-primary btn-danger");
        $(this).html("<i class='fa fa-pause-circle-o'></i> Pause");
        $(this).attr("data-status", "on");
      }else{
        $(this).toggleClass("btn-primary btn-danger");
        $(this).html("<i class='fa fa-play-circle-o'></i> Play");
        $(this).attr("data-status", "off");
      }
    }
  })

  function roundNum(){
    if ($("#roundPicker option:selected").text() === "Select a Number Of Rounds"){
      $(".roundAlert").slideDown();
      return;
    }else{
      $(".roundAlert").hide();
      var rounds = $("#roundPicker option:selected").text();
      return parseInt(rounds);
    }
  }

  $("a").on("click", function(){
    if ($("#roundPicker option:selected").text() === "Select a Number Of Rounds"){
      $(".roundAlert").slideDown();
      return;
    }else{
        if ($(".playBtn").attr("data-status")=== "on"){
        playerChoice = $(this).attr("id");
        var ranNum = Math.floor(Math.random() * rps.length);
        computerchoice = computerTurn(ranNum);
        animateOut();
        animateChoices(playerChoice, computerChoice);
        if (round <= roundNum()){
          round ++;
          $(this).delay(5300).queue(function(n){
            $("#roundNum").html("Round: "+round);
            n();
          })
          if (playerChoice === computerChoice){
            round --;
            $("#roundNum").html("Round: "+round);
            $(".winLoseText").html("Tie, try that round again!").delay(2000).fadeIn("slow");
            $(".winLoseText").delay(2300).fadeOut("slow");
            $("#tieFace").delay(2000).show(0);
            $("#tieFace").delay(2900).fadeOut("slow");
            GameOverCheck();
          }else if(playerChoice === "Rock"){
            if (computerChoice === "Paper"){
              computerWins ++;
              $(".winLoseText").html("Computer Wins This Round!").delay(2000).fadeIn("slow");
              $(".winLoseText").delay(2300).fadeOut("slow");
              $("#lossFace").delay(2000).show(0);
              $("#lossFace").delay(2900).fadeOut("slow");
              GameOverCheck();
            }else{
              playerWins++;
              $(".winLoseText").html("You Win This Round!").delay(2000).fadeIn("slow");
              $(".winLoseText").delay(2300).fadeOut("slow");
              $("#winFace").delay(2000).show(0);
              $("#winFace").delay(2900).fadeOut("slow");
              GameOverCheck();
            }
          }else if(playerChoice === "Paper"){
            if(computerChoice === "Scissors"){
              computerWins ++;
              $(".winLoseText").html("Computer Wins This Round!").delay(2000).fadeIn("slow");
              $(".winLoseText").delay(2300).fadeOut("slow");
              $("#lossFace").delay(2000).show(0);
              $("#lossFace").delay(2900).fadeOut("slow");         
              GameOverCheck();
            }else{
              playerWins++;
              $(".winLoseText").html("You Win This Round!").delay(2000).fadeIn("slow");
              $(".winLoseText").delay(2300).fadeOut("slow");
              $("#winFace").delay(2000).show(0);
              $("#winFace").delay(2900).fadeOut("slow");
              GameOverCheck();
            }
          }else if(playerChoice === "Scissors"){
            if(computerChoice === "Rock"){
              computerWins ++;
              $(".winLoseText").html("Computer Wins This Round!").delay(2000).fadeIn("slow");
              $(".winLoseText").delay(2300).fadeOut("slow");
              $("#lossFace").delay(2000).show(0);
              $("#lossFace").delay(2900).fadeOut("slow");
              GameOverCheck();
            }else{
              playerWins++;
              $(".winLoseText").html("You Win This Round!").delay(2000).fadeIn("slow");
              $(".winLoseText").delay(2300).fadeOut("slow");
              $("#winFace").delay(2000).show(0);
              $("#winFace").delay(2900).fadeOut("slow");
              GameOverCheck();
            }
          }
        }
      }else{
        return;
      }
      $(this).delay(2000).queue(function(n){
        $("#playerScore").html(playerWins);
        $("#computerScore").html(computerWins);
        n();
      })
    }
  });
  
  function GameOverCheck(){
    if (round === roundNum()+1){
    GameOver();
    }
  }

  function GameOver(){
    $(".playBtn").hide();
    $(".playAgainBtn").show();
    setTimeout(modal, 4500);
  }
    

  function modal(){
    round = "Game Over";
    $("#roundNum").html("Round: "+round);
    if (playerWins < computerWins){
      $("#lossModal").modal();
    }else{
      $("#winModal").modal();
    }
  }

  $(".playAgainBtn").on("click", function(){
    varReset();
    $(".playAgainBtn").hide();
    $(".playBtn").show();
  })

  function varReset(){
    computerWins = 0;
    playerWins = 0;
    round = 1;
    $("#roundNum").html("Round: "+round);
    $("#playerScore").html(playerWins);
    $("#computerScore").html(computerWins);
  }
});