/*

Author: Jovanie Lawrence 
Project: Coursework one
Date: 14 Decemeber 2017

Description: The is code that is programming tetris for the coursework one. 
*/

var authentication,
usersObj,
newUserObj,
scoresObj,
newScoreObj;


// Reset all values in session storage to null
function defaultStorage() {
    sessionStorage.loggedIn = false;
    sessionStorage.currentFirstName = "";
    sessionStorage.currentSurName = "";
    sessionStorage.currentEmail = "";
    sessionStorage.currentPhoneNumber = "";
    sessionStorage.currentScore = false;
}

// if session strage is empty call the deault method 
if (sessionStorage.length == 0){
    defaultStorage();
}

//Reset all object in local storage
function initialiseLocalStorage(){

if (localStorage.length == 0) {
    localStorage.numOfUsers = 0;
    localStorage.users = "[]";
    localStorage.scores = "[]";
    }
}

//Call default local storage functions
if (localStorage.length == 0){
    initialiseLocalStorage();
}

/* This function registers new users and add their credentials to local storage */ 
function registerUser(firstName, surName, emailAdr, phoneNumber, pwd, pwdConfirm, scores) {
    
    usersObj = JSON.parse(localStorage.users);
    newUserObj = {
        firstName: firstName,
        surName: surName,
        emailAddress: emailAdr,
        phoneNumber: phoneNumber,
        passWord: pwd,
        passWordConfirm: pwdConfirm,
        saveScore: scores,
        highScore: 0,
    }
    
    usersObj.push(newUserObj);
    localStorage.users = JSON.stringify(usersObj);
    localStorage.numOfUsers = parseInt(localStorage.numOfUsers) + 1;
}


// Here the function checks the localstrage object for existing email and password if none found an error message will be displayed
function checkLogIn() {

    // All the user to try again to reset other attempts
    $(".has-error").removeClass("has-error");
    $(".has-success").removeClass("has-success");

    authentication = false,
    users = JSON.parse(localStorage.users); 

    // Declare variable for Ids
    email = $('#emailLog').val().toLowerCase(),
    passWordLogIn = $('#passwordLogIn').val();

    for (var i = 0; i < users.length; i++) { 

       if (users[i].emailAddress == email && users[i].passwordHash == ($.md5(users[i].passwordSalt + passWordLogIn))) {

                authentication == true;
                sessionStorage.loggedIn = true;
                
               //Hide the login modal 
                $('#loginModal').modal('hide');
                $("#logIn-form").trigger('reset');

               //Store data to session storage
                sessionStorage.currentEmail = users[i].emailAddress;
                sessionStorage.currentFirstName = users[i].firstName;
                sessionStorage.currentSurName = users[i].surName;
                sessionStorage.currentPhoneNumber = users[i].phoneNumber;
                sessionStorage.currentScore = users[i].saveScore;
                sessionStorage.highScore = users[i].highScore,
                logInStatus();

                //Display success alert to glow green 
                messageAlerts("main", "success", "You have successfuly logged in.", true);
         }

        //Display danger alert to glow red, informing the user that it is unsuccessful log in
       if( authentication == false)
        $("#logIn-Group").addClass("has-error"); 
        messageAlerts("signIn", "danger", "Incorrect email or password, please try again", false); 
    
    }
}

//This function will create an alert to appear in the modal, via the div tags 
function messageAlerts(location, type, message, closable) {

    if (closable == true) 
        $('#'+location +'Alert').html('<div class="alert alert-'+type+' alert-dismissible fade in '+location+'" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +message+'</div>');
    else
        $('#'+location+'Alert').html('<div class="alert alert-'+type+' fade in '+location+'" role="alert">'+message+'</div>');
}

// IF the user is logged in, display the first name of the user next to the 'welcome' tag in the nav bar.
function logInStatus() {
    if (sessionStorage.loggedIn == true) {
       
        $("#userNameDisplay").html(sessionStorage.currentFirstName);
       
        $("#guestLogInButton").hide();
        $("#signedInButton").show();
        
    } else {
        $("#guestNavButton").show();
        $("#signedInButton").hide();
    }
}

function activateNavButton(buttonID) {
    $( ".active" ).removeClass( "active" )
    $( "#"+buttonID ).addClass( "active" );
}

    
    // Log the user out and reset session and local storage
  $( "#logOutButton" ).click(function() {
        defaultStorage();
        initialiseLocalStorage();
        logInStatus();
        $('.alert').hide();

        //Display green message
        messageAlerts("main", "success", "You have successfully logged out!", true);
        
});

  // if button is clicked, diplay ranking table and pause the game.
   $("#rankingsButton" ).click(function() {
        activateNavButton("rankingsButton");
       displayRankingsTable();
        pauseGame();

});

   // if button is clicked, pause the game 
   $("#guestLogInButton" ).click(function() {
        activateNavButton("guestLogInButton");
        pauseGame();

});

    // if button is clicked, resume game
      $("#gameButton" ).click(function() {
        activateNavButton("gameButton");
        resumeGame();

});


// Save user scores to localstage
function saveScoresToTable(score) {

    scoresObj = JSON.parse(localStorage.scores);
    newScoreObj = {
       
        name: sessionStorage.currentFirstName +" "+sessionStorage.currentSurName,
        score: score,
};
    
    scoresObj.push(newScoreObj);
    localStorage.scores = JSON.stringify(scoresObj);
}

/// Sort the score to display in decending order
function sortScores(){

    scoresObj.sort(function(a, b){ 
        return b - a });
}

/// Display the ranking table
function displayRankingsTable() {

    saveScoresToTable(piece.score);

    scoresObj = JSON.parse(localStorage.scores), 

    sortScores();

    $.each(scoresObj, function(index, value) {
       
            $("#rankingsTable").append("<tr><td>"+value.name+"</td><td>"+value.score+"</td></tr>");
          
        
        
    });

}

// Ensure logged in user nav bar stays intact
$(document).ready(function() {
    logInStatus();
});
