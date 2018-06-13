/*
Author: Jovanie Lawrence 
Project: Coursework one
Date: 14 Decemeber 2017

Description: The is code that is programming tetris for the coursework one. 
*/


/* This function checks user password and tells them if their password is weak, medium or strong */ 

$('#password').keyup(function(e) {
     var strong = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
     var medium = new RegExp("^(?=.{6,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
     var enough = new RegExp("(?=.{4,}).*", "g");
    
     if (false == enough.test($(this).val())) {
             $('#passstrength').html('More characters');
     } else if (strong.test($(this).val())) {
             $('#passstrength').className = 'ok';
             $('#passstrength').html('Strong!');
     } else if (medium.test($(this).val())) {
             $('#passstrength').className = 'alert';
             $('#passstrength').html('Medium!');
     } else {
             $('#passstrength').className = 'error';
             $('#passstrength').html('Weak!');
     }
     return true;
});


// This function checks for empty text fields and display an error message of validation failed
function registerValidation() {
  
    $(".has-error").removeClass("has-error");
    $(".has-success").removeClass("has-success");
   
   //Declare local variables
    var validationPassed = true,
        ArrayOfErrors = [],
        invalidNames = [],
        duplicateEmail = false,
        existingUsersInfos = JSON.parse(localStorage.users), 
        emptyTextFields = [],
        first = $('#firstName').val().trim(),
        sur = $('#surName').val().trim(),
        lowerEmail = $('#emailReg').val().toLowerCase(), 
        phone = $('#phoneNumber').val().toString(),
        pass = $('#password').val().trim(),
        confirm = $('#confirmPassword').val().trim();

    if (first == '') {
        $("#firstName-Group").addClass("has-error");
        emptyTextFields.push("First Name");
        ArrayOfErrors.push("#firstName");
        validationPassed = false;
    }
    if (sur == '') {
        $("#surName-Group").addClass("has-error");
        emptyTextFields.push("Last Name");
        ArrayOfErrors.push("#surName");
        validationPassed = false;
    }
    if (lowerEmail == '') {
        $("#email-Group").addClass("has-error");
        emptyTextFields.push("Email Address");
        ArrayOfErrors.push("#emailReg");
        validationPassed = false;
    }
    if (phone == '') {
        $("#surName-Group").addClass("has-error");
        emptyTextFields.push("Phone Number");
        ArrayOfErrors.push("#phoneNumber");
        validationPassed = false;
    }
    if (pass == '') {
        $("#password-Group").addClass("has-error");
        emptyTextFields.push("Password");
        ArrayOfErrors.push("#password");
        validationPassed = false;
    }

    var passwordsMatch = true;
    if (pass != $('#confirmPassword').val()) {
        $("#password-Group" ).addClass( "has-error" );
        passwordsMatch = false;
        ArrayOfErrors.push("#password");
        validationPassed = false;
    }

   
    if (validationPassed == true) {
        var check = "";
        
        //Call function when vslidation is complete
        registerUser(first, sur, lowerEmail, phone, check, $.md5(check + pass, $("#terms").is(':checked')));
      
        $('#registerModal').modal('hide');
       
       //show message
        messageAlerts("signIn", "success", "You have successfully registered your account, sign in below:", true)
        $("#registerForm").trigger('reset');

    // Loop through the error array and extract error and dispay where appropriate 
    } else { 
        var errorMessage = "";
        if (emptyTextFields.length > 0) {
            errorMessage += "Please complete the ";
            for (var i=0;i < emptyTextFields.length; i++) {
                errorMessage += emptyTextFields[i];
                if (i < emptyTextFields.length - 2)
                    errorMessage += ", ";
                else if (i == emptyTextFields.length - 2)
                    errorMessage += " and ";
            }
            errorMessage += " field(s). <br>";
        }
        if (invalidNames.length > 0) {
            errorMessage += "The value you entered in the ";
            for (var i=0;i < invalidNames.length; i++) {
                errorMessage += invalidNames[i];
                if (i < invalidNames.length - 2)
                    errorMessage += ", ";
                else if (i == invalidNames.length - 2)
                    errorMessage += " and ";
            }
            errorMessage += " field(s) are invalid. <br>";
        }
        if (passwordsMatch != true) {
            errorMessage += "Your passwords do not match. Please try again.";
        }
        
        //display message to glow red
        messageAlerts("register", "danger", errorMessage, false);

     
     // Display green messages that are not in the error array
        var allInputGroups = ["#firstName-Group", "#surName-Group", "#phoneNumber-Group", "#email-Group", "#passwordGroup"];
        $.each(allInputGroups, function(index, value) {
            if ($.inArray(value, ArrayOfErrors) == -1) {
                $(value).addClass( "has-success" );
            }
        });

    }
}

// The function deletes inputs that are not text
function checkIfText(text) {
    text.value = text.value.replace(/[^a-zA-Z-'\n\r.]+/g, '');
}

// The function deletes inputs that are not numbers 
function checkPhoneNumber(number){
    var maintainplus = '';
    var numval = number.value
    if (numval.charAt(0)=='+')
    {
        var maintainplus = '';
    }
    curphonevar = numval.replace(/[\\A-Za-z!"£$%^&\,*+_={};:'@#~,.Š\/<>?|`¬\]\[]/g,'');
    number.value = maintainplus + curphonevar;
    var maintainplus = '';
    number.focus;
}


// // The function limits to user to 100 text in the text area
$(document).ready(function(){ 
    $('#characterLeft').text('100 characters left');
    $('#message').keydown(function () {
        var max = 100;
        var len = $(this).val().length;
        if (len >= max) {
            $('#characterLeft').text('You have reached the limit');
            $('#characterLeft').addClass('red');
            $('#btnSubmit').addClass('disabled');            
        } 
        else {
            var ch = max - len;
            $('#characterLeft').text(ch + ' characters left');
            $('#btnSubmit').removeClass('disabled');
            $('#characterLeft').removeClass('red');            
        }
    });    
});






