$(document).ready(function() {
  // set vars up and fill wins &losses on screen with 0's, set pics in order to color.
  var wins = 0;
  var losses = 0;
  var counter = 0;
  $('#win').text(wins);
  $('#loss').text(losses);
  crystals = ['assets/images/red.png','assets/images/blue.png','assets/images/yellow.png','assets/images/green.png'];
  
  //Call the funtions to setup the crystal values and start the game.
  crystalValues();
  gameStart();
  
  //Get a random number between 1 - 12 for each crystal also make sure no duplicate numbers are used.
  function crystalValues() {   
    var numbers = [];
      while(numbers.length < 4)
      {
        var randomnum = Math.floor((Math.random() * 12) +1);
        var duplicate = false;
        for (var i = 0; i < numbers.length; i++)
        {
          if (numbers[i] == randomnum)
          {
            duplicate = true;
          }
        }
        if(!duplicate){
          numbers[numbers.length]=randomnum;
        }
      }  
      for (i = 0; i < numbers.length; i++) 
      {
        var imageCrystal = $('<img>');
        imageCrystal.attr({'data-num':numbers[i],'src':crystals[i],'alt':'crystals'});
        imageCrystal.addClass('crystalImage')
        $('#crystals').append(imageCrystal);
      }
  }

  //Start game and manage the score.
  function gameStart() {
    counter = 0;
    $('#yourScore').text(counter);
    //generate the random number needed to win.
    function getRndInteger(min, max){
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
    // get a random number between 19 - 120
    var guessNumber = getRndInteger(19, 120);

    $('.value').text(guessNumber);

    // get click value and continue to add and compare to gen random number.
    $('.crystalImage').on('click', function(){
        counter += parseInt($(this).data('num'));
       
        $('#yourScore').text(counter);

        if (counter == guessNumber) //set stats for wins.
        {
          $('#status').text('You won!!');
          wins ++;
          $('#win').text(wins);
          $('#crystals').empty();
          crystalValues();
          gameStart();            
        } 
        else if (counter > guessNumber) //set stats for losses.
        {
          $('#status').text('You lost!!');
          losses ++;
          $('#loss').text(losses);
          $('#crystals').empty();
          crystalValues();
          gameStart();
        }
    });
  }

});
