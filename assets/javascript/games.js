// JavaScript function that wraps everything
$(document).ready(function () {

    // set variables

    var farmWords = ["Accio", "Alchemy", "Alohomora", "Animagus", "Auror", "Azkaban", "Basilisk", "Bludgers", "Bowtruckle", "Butterbeer", "Charm", "Chimaera", "Chocoballs",];

    var wins = 0;
    var losses = 0;
    var lettersGuessed = [];
    var hiddenWord = [];
    var userGuesses;
    var theme = new Audio("assets/sounds/Harry Potter.mp3")
    var loserAudio = new Audio("assets/sounds/require.mp3")
    var winnerAudio = new Audio("assets/sounds/dobby.mp3")
    let docLettersUsed = document.getElementsByClassName("lettersUsed");
    

    // Hides the winning and losing divs
    $("#winner").hide();
    $("#loser").hide();
    

    // Generate a random word from the farm Words array
    let randomWordGenerator = function() {
        randomWord = farmWords[Math.floor(Math.random() * farmWords.length)].toLowerCase();
        return randomWord
    }

    // Generates the underscores for the letters in the randon farm word
    let underscore = function(randomWord) {
        hiddenWord = [];
        document.getElementById("test").innerHTML = '';

        for (let i = 0; i < randomWord.length; i++) {
            hiddenWord[i] = "_";
        }   
        
        var underscoredWord = hiddenWord.join(" ");
        document.getElementById("test").innerHTML = underscoredWord; 
    
        return randomWord, hiddenWord
    }

    // Game begins on a click of div
    $("strong").on("click", function () {
        randomWordGenerator(farmWords);
        underscore(randomWord);
        theme.play();
        theme.volume = 0.2;
        console.log(randomWord);
        userGuesses =  randomWord.length + 3;

        // Records the letter from the user and converts to lowerCase
        document.addEventListener("keypress", function (event) {
            let userLetter = String.fromCharCode(event.keyCode).toLowerCase();

            // looking for good letters
            if (randomWord.indexOf(userLetter) > -1) {
                
                // Testing
                if (lettersGuessed.includes(userLetter) == true) {
                    // console.log("duplicate letter " + userLetter)
                }

                else {
                    // loop through current word and verify user good letter
                    // and display to the screen
                    for (var i = 0; i < randomWord.length; i++) {
                        if (randomWord[i] === userLetter) {
                            hiddenWord[i] = userLetter;
                        }
                    document.getElementById("test").innerHTML = hiddenWord.join(" ");
                    }

                    // Declares a winner
                    if (randomWord === hiddenWord.join("")) {
                        wins++;
                        $("#winner").show("WINNER");
                        $(".wins").text(wins)
                        theme.pause();
                        winnerAudio.play();

                        // Hides loser banner after 4 seconds
                        setTimeout(function () {
                            $("#winner").hide();
                            theme.play()
                         },
                            4000);

                        // Resets variables and calls for a new word
                        lettersGuessed = [];
                        docLettersUsed[0].innerHTML = lettersGuessed;
                        randomWordGenerator(farmWords);
                        underscore(randomWord);
                        userGuesses = randomWord.length + 3;
                        console.log(randomWord); 
                    }
                }
            }

            // looking for wrong letter pressed
            else {

                if (lettersGuessed.includes(userLetter) == true) {                
                    console.log("duplicate letter " + userLetter)
                }

                else {
                    lettersGuessed.push(userLetter);
                    docLettersUsed[0].innerHTML = lettersGuessed.join(" ");
                    userGuesses--;
                    $(".guesses").text(userGuesses);

                    // Declares a loser
                    if (userGuesses === 0) {
                        losses++;
                        $(".losses").text(losses);
                        $("#loser").show();
                        theme.pause();
                        loserAudio.play();

                        // Hides loser banner after 4 seconds
                        setTimeout(function () {
                            $("#loser").hide();
                            theme.play()
                        },
                            4000);
                        
                        // Resets variables and calls for a new word
                        lettersGuessed = [];
                        docLettersUsed[0].innerHTML = lettersGuessed;
                        randomWordGenerator(farmWords);
                        underscore(randomWord);
                        userGuesses = randomWord.length + 3;
                    }
                }

            }

        })   
    })

});

