<!-- ********************************************************************************************
   * Author: Jovanie Lawrence                                                                    *
   * Date: October 2017                                                                          *
   * This file contains code that will be used to set the overvall structure of the game website * 
   * It is linked with css, php and in the future will be linked with javascript.                *             
   *********************************************************************************************** -->
<?php // Open PHP 

   //Include the outside file "headerNar.php" to display header and nav bar

   include 'headerNav.php';
   
       //Call these functions inside the "headerNac.php" file to output its contents
       headerOutput("Tetris World");
       navigationBar();
   ?>
<!-- The below code will display the login Modal -->
<div class='modal fade' id='loginModal' tabindex='-1' role='dialog' aria-labelledby='myModalLabel'      aria-hidden='true'>
   <!-- Open div classes to establish the login modal -->
   <div class='modal-dialog'>
      <div class='modal-dialog modal-sm'>
         <div class='modal-content'>
            <!-- Open a div that acts as the header of the modal -->
            <div class='modal-header'>
               <!-- Add a button to the modal that will close the modal when clicked -->
               <button type='button' class='close' data-dismiss='modal' title='Close modal'  aria-hidden='true'>×</button>
               <!-- Display a header at the top of the modal -->
               <h2 class='login_title text-center'>Login</h2>
               <!-- Close modal header -->
            </div>
            <!-- Open the body of the modal -->
            <div class='modal-body'>
               <div id="signInAlert"></div>
                <form id="logIn-form" onsubmit="checkLogIn(); return false;">
                  <div id="logIn-Group" class="form-group">
                     <!--Display username icon -->
                     <i class='glyphicon glyphicon-user'></i>
                     <!-- Create a text field  "username"   -->
                     <input type='text' id="emailLog" placeholder='Enter email'> <br> <br>
                     <!-- Display password icon -->
                     <i class='glyphicon glyphicon-lock'></i> 
                     <!-- Create a text field "password"  -->
                     <input type='password' id="passwordLoginIn" id="passwordLogIn" placeholder='Enter Password'> <br> <br>
                     <!-- Link the forgot password modal to the text  -->
                     <p> <a href='#' data-toggle='modal' data-target='#forgotPasswordModal'> Forgotten password? </a></p>
                     <!-- Link the register modal to the text  -->
                     <p> No account? <a href='#' data-toggle='modal' data-target='#registerModal'> Register </a></p>
                  </div>
                     <!-- Create a button for the user to click to log in -->
                  <button class='btn btn-lg btn-primary' id="logInButton" type='submit'>Login <i class='glyphicon glyphicon-log-in'> </i></button>
               </form>
               <!-- Close modal body -->
            </div>
            <!-- Close the modal-content -->
         </div>
         <!-- Close the modal-content dialog modal sm -->
      </div>
      <!-- Close the modal-content dialog modal sm --> 
   </div>
   <!-- Close entire modal -->
</div>
<!-- The below code will display the register Modal -->
<div id='registerModal' class='modal fade' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>
   <!-- Open div classes to establish the register modal -->
   <div class='modal-dialog'>
      <div class='modal-dialog modal-sm'>
         <div class='modal-content'>
            <!-- Open a div that acts as the header of the modal -->
            <div class='modal-header'>
               <!-- Add a button to the modal that will close the modal when clicked -->
               <button type='button' class='close' data-dismiss='modal' title='Close modal' aria-hidden='true'>×</button>
               <!-- Display a header at the top of the modal -->
               <h2 class='login_title text-center'>Register</h2>
               <!-- Close modal-header  -->
            </div>
            <!-- Open the body of the modal -->
            <div class='modal-body'>
               <!-- Open a form to the body -->
               <div id="registerAlert"></div>
               <form id="registerForm" onsubmit="registerValidation(); return false;">
                  <div id="firstName-Group" class="form-group">
                        <!--Display username icon -->
                     <i class='glyphicon glyphicon-user'></i>
                     <!-- Create a text field "firstname"  -->
                     <input type='text' onkeyup='checkIfText(this);' maxlength='15' id='firstName' placeholder='* Enter firstname'> 
                  </div>
                  <div id="surName-Group" class="form-group">
                     <!--Display username icon -->
                     <i class='glyphicon glyphicon-user'></i>
                     <!-- Create a text field "surname"   -->
                     <input type='text' onkeyup='checkIfText(this);' maxlength='15' id="surName"  name='surname' placeholder='Enter surname'> 
                  </div>
                  <div id="email-Group" class="form-group">
                     <!--Display email icon -->
                     <i class='glyphicon glyphicon-envelope'></i>
                     <!-- Create a text field "email"  -->
                     <input type='text' id="emailReg" data-validation='email' placeholder='* Enter email'><div class="status" id="status"></div> <span id='error_email' class='text-danger'></span> 
                     <!--Display mobile phone icon -->
                  </div>
                  <div id="phoneNumber-Group" class="form-group">
                     <i class='glyphicon glyphicon-phone'></i>
                     <!-- Create a text field "phonenumber"   -->
                     <input type='text' onkeyup='checkPhoneNumber(this)' id='phoneNumber' name='number' maxlength="11" placeholder='Enter phone number'> 
                  </div>
                  <div id="password-Group" class="form-group">
                     <!--Display password lock icon -->
                     <i class='glyphicon glyphicon-lock'></i>
                     <!-- Create a text field "password" -->
                     <input type='password' id="password" minlength='4' maxlength='16' name='password' placeholder='* Enter password'> <br><span id="passstrength"></span> <br> 
                     <!--Display username icon -->
                     <i class='glyphicon glyphicon-lock'></i>
                     <!-- Create a text field "reEnterPassword" -->
                     <input type='password' id="confirmPassword" minlength='4' maxlength='16'  name='confirmPassword' placeholder='* Re-enter password'> 
                  </div>
                   <div class="checkbox">
                     <label>
                        <input type="checkbox"  id="terms" name="agree" value="true"> <p> Agree on terms and to post Scores </p>
                     </label>
                     </div>
                  <!-- Create a button when clicked, creates an account for the new user -->
                  <button class='btn btn-lg btn-primary' id="registerButton" type='submit'>
                     Sign up
                     <!--Display tick icon on the button -->
                     <i class='glyphicon glyphicon-ok'></i>
                  </button>
                  <!--Display username icon -->
                  <button class='btn btn-lg btn-primary' value="Reset" id="reset" type='reset'>
                     Reset
                     <!--Display username icon -->
                     <i class='glyphicon glyphicon-remove'></i>
                  </button>

                  <!-- Close form -->
               </form>
               <!-- Close modal body -->
            </div>
            <!-- Close the modal-content -->
         </div>
         <!-- Close the modal-content dialog modal sm -->
      </div>
      <!-- Close the modal-content dialog modal sm --> 
   </div>
   <!-- Close entire modal -->
</div>
<!-- The below code will display the how to play Modal -->
<div class='modal fade' id='howToPlayModal' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>
   <!-- Open div classes to establish the register modal -->
   <div class='modal-dialog'>
      <div class='modal-dialog modal-sm'>
         <div class='modal-content'>
            <!-- Open a div that acts as the header of the modal -->
            <div class='modal-header'>
               <!-- Add a button to the modal that will close the modal when clicked -->
               <button type='button' class='close' data-dismiss='modal' title='Close modal' aria-hidden='true'>×</button>
               <!-- Display a header at the top of the modal -->
               <h2 class='login_title text-center'>How to play</h2>
               <!-- Close modal-header  -->
            </div>
            <!-- Open modal body  -->
            <div class='modal-body'>
               <!-- Display a paragraph with instructions how to play the game -->
               <p>
                  Instructions <br>
                  Use the <b>left arrow </b> and <b>right</b> arrow keys to move
                  left and right respectively.
                  Use the <b> up arrow </b> key to rotate
                  Use the <b> down arrow </b> key to soft drop
                  Use the <b> space bar </b> to hard drop
             </p>
               <p> Your scores will be records and saves in the rankings page with your user name, proving that you successully log in. </p>
               <!-- Close modal body -->
            </div>
            <!-- Close the modal-content -->
         </div>
         <!-- Close the modal-content dialog modal sm -->
      </div>
      <!-- Close the modal-content dialog modal sm --> 
   </div>
   <!-- Close entire modal -->
</div>
<!-- The below code will display the how to play Modal -->
<div class='modal fade' id='termsModal' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>
   <!-- Open div classes to establish the register modal -->
   <div class='modal-dialog'>
      <div class='modal-dialog modal-sm'>
         <div class='modal-content'>
            <!-- Open a div that acts as the header of the modal -->
            <div class='modal-header'>
               <!-- Add a button to the modal that will close the modal when clicked -->
               <button type='button' class='close' data-dismiss='modal' title='Close modal' aria-hidden='true'>×</button>
               <!-- Display a header at the top of the modal -->
               <h2 class='login_title text-center'>Terms of use</h2>
               <!-- Close modal-header  -->
            </div>
            <!-- Open modal body  -->
            <div class='modal-body'>
               <!-- Display a paragraph with an list displaing the temrs of play -->
               <p> We would like everyone to enjoy our <b> Tetris </b>game. However, there are a few rules to stick to:</p>
               <ul>
                  <li> Do not plagiarise </li>
                  <li> Do not vandalise the blocks </li>
                  <li> Do not cheat the game </li>
                  <li> Enjoy! </li>
               </ul>
               <p> Your scores will be records and saves in the rankings page with your user name, proving that you successully log in. </p>
               <!-- Close modal body -->
            </div>
            <!-- Close the modal-content -->
         </div>
         <!-- Close the modal-content dialog modal sm -->
      </div>
      <!-- Close the modal-content dialog modal sm --> 
   </div>
   <!-- Close entire modal -->
</div>
<!-- The below code will display the how to play Modal -->
<div class='modal fade' id='contactUsModal' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>
   <!-- Open div classes to establish the register modal -->
   <div class='modal-dialog'>
      <div class='modal-dialog modal-sm'>
         <div class='modal-content'>
            <!-- Open a div that acts as the header of the modal -->
            <div class='modal-header'>
               <!-- Add a button to the modal that will close the modal when clicked -->
               <button type='button' class='close' data-dismiss='modal' title='Close modal' aria-hidden='true'>×</button>
               <!-- Display a header at the top of the modal -->
               <h2 class='login_title text-center'> Contact us </h2>
               <!-- Close modal-header  -->
            </div>
            <!-- Open modal body  -->
            <div class='modal-body'>
               <!-- Open paragraph -->
               <p> Please contact head developer Jay Lawrence : jl1119@live.mdx.ac.uk </p>
               <form role="form" id="contact-form" class="contact-form">
               <i class='glyphicon glyphicon-user'></i>
                     <!-- Create a text field "firstname"  -->
                     <input type='text' onkeyup='checkIfText(this);' maxlength='15'id='firstNameRegister' placeholder='Enter Name'> <br><br>
               <i class='glyphicon glyphicon-envelope'></i>
               <!-- Create a text field "reEnterPassword" -->
               <input type='text' id='email' name='password' placeholder='Enter email'> <br><br>
               <!-- Create a text area div where the user can write website feedback -->
               <div class="form-group">
                  <textarea class="form-control" type="textarea" id="message" placeholder="Message" maxlength="100" rows="7"></textarea>
                  <span class="help-block">
                     <p id="characterLeft" class="help-block ">You have reached the limit</p>
                  </span>
                  <button class="btn btn-lg btn-primary" id="submit" type="submit">
                     Send
                     <li class= 'glyphicon glyphicon-send'> </li>
                  </button>
               </form>
                  <!-- Close form -->
               </div>
               <!-- Close modal body -->
            </div>
            <!-- Close the modal-content -->
         </div>
         <!-- Close the modal-content dialog modal sm -->
      </div>
      <!-- Close the modal-content dialog modal sm --> 
   </div>
   <!-- Close entire modal -->
</div>
<!-- The below code will display the how to play Modal -->
<div class='modal fade' id='forgotPasswordModal' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>
   <!-- Open div classes to establish the forgot password modal -->
   <div class='modal-dialog'>
      <div class='modal-dialog modal-sm'>
         <div class='modal-content'>
            <!-- Open modal header  -->
            <div class='modal-header'>
               <!-- Add a button to the modal that will close the modal when clicked -->
               <button type='button' class='close' data-dismiss='modal' title='Close modal' aria-hidden='true'>×</button>
               <!-- Display a header at the top of the modal -->
               <h2 class='login_title text-center'> Reset password </h2>
               <!-- Close modal-header  -->   
            </div>
            <!-- Open modal body  -->
            <div class='modal-body'>
               <!-- Open form  -->
               <form action>
                  <i class="glyphicon glyphicon-envelope"></i>
                  <input type="text" name="username" style="width:200px; height:30px;" placeholder="Enter email"> <br> <br>
                  <button class="btn btn-lg btn-primary"  type="submit">
                     Reset 
                     <li class= 'glyphicon glyphicon-send'> </li>
                  </button>
                  <!-- Close form  -->
               </form>
            </div>
            <!-- Close the modal-content -->
         </div>
         <!-- Close the modal-content dialog modal sm -->
      </div>
      <!-- Close the modal-content dialog modal sm --> 
   </div>
   <!-- Close entire modal -->
</div>
<!-- The below code will display the rankings page Modal -->
<div class='modal fade' id='rankingsModal' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>
   <!-- Open div classes to establish the rankings page modal -->
   <div class='modal-dialog'>
      <div class='modal-dialog modal-sm'>
         <div class='modal-content'>
            <!-- Open modal header  -->
            <div class='modal-header'>
               <!-- Add a button to the modal that will close the modal when clicked -->
               <button type='button' class='close' data-dismiss='modal' title='Close modal' aria-hidden='true'>×</button>
               <!-- Display a header at the top of the modal -->
               <h2 class='login_title text-center'>Rankings</h2>
               <!-- Close modal-header  --> 
            </div>
            <!-- Line break to put the next element on the next line --> 
            <br>
            <!-- Open a table for the users' scores to be displayed in. its is jus and example of the layout of the actually page will be --> 
            <table class="table table-striped" id="tblGrid">
               <thead id="tblHead">
                <!-- Open table row --> 
               <tr>
                  <!-- Open table header --> 
                  <th>Name</th>
                  <th>Score</th>
                  <!-- Close table row -->
               </tr>
               </thead>
               <tbody id="rankingsTable">
               </tbody>
            </table>
         </div>
         <!-- Close the modal-content dialog modal sm -->
      </div>
      <!-- Close the modal-content dialog modal sm --> 
   </div>
   <!-- Close entire modal -->
</div>
<!-- The below code will display the login Modal -->
<div class='modal fade' id='profileModal' tabindex='-1' role='dialog' aria-labelledby='myModalLabel'      aria-hidden='true'>
   <!-- Open div classes to establish the login modal -->
   <div class='modal-dialog'>
      <div class='modal-dialog modal-sm'>
         <div class='modal-content'>
            <!-- Open a div that acts as the header of the modal -->
            <div class='modal-header'>
               <!-- Add a button to the modal that will close the modal when clicked -->
               <button type='button' class='close' data-dismiss='modal' title='Close modal'  aria-hidden='true'>×</button>
               <!-- Display a header at the top of the modal -->
               <h2 class='login_title text-center'>Login</h2>
               <!-- Close modal header -->
            </div>
            <!-- Open the body of the modal -->
            <div class='modal-body'>
               <div id="signInAlert"></div>
                <form id="signInForm" onsubmit="processSignIn(); return false;">
                  <div id="signInGroup" class="form-group">
                     <!--Display username icon -->
                     <i class='glyphicon glyphicon-user'></i>
                     <!-- Create a text field  "username"   -->
                     <input type='text'  id="emailLogIn" placeholder='Enter email'> <br> <br>
                     <!-- Display password icon -->
                     <i class='glyphicon glyphicon-lock'></i> 
                     <!-- Create a text field "password"  -->
                     <input type='password' id="passwordLogIn" placeholder='Enter Password'> <br> <br>
                     <!-- Link the forgot password modal to the text  -->
                     <p> <a href='#' data-toggle='modal' data-target='#forgotPasswordModal'> Forgotten password? </a></p>
                     <!-- Link the register modal to the text  -->
                     <p> <a href='#' data-toggle='modal' data-target='#registerModal'> Register </a></p>
                  </div>
                     <!-- Create a button for the user to click to log in -->
                  <button class='btn btn-lg btn-primary' id="signInButton" type='submit'>Login <i class='glyphicon glyphicon-log-in' > </i></button>
               </form>
               <!-- Close modal body -->
            </div>
            <!-- Close the modal-content -->
         </div>
         <!-- Close the modal-content dialog modal sm -->
      </div>
      <!-- Close the modal-content dialog modal sm --> 
   </div>
   <!-- Close entire modal -->
</div>
<div id = "mainAlert"></div>
<div id="tetrisBackground">
   <div class='centreCanvas'>
   <canvas id='canvas'></canvas>
   <canvas id="preview"></canvas>
    <br>
    
    <div id="score">
       <p id="LoginResult">Not logged in.</p>
    </div>

    <div id="level"></div>

    <div id="gameOver"></div>

   <div id="logo">  <img src="tetris1.png" width="200px" height="200px">  </div>

   <div id="time"></div>


   <script src='tetrisWorldGame.js'> </script>
   <script src='accountManagement.js'> </script>
  <script src='validation.js'> </script>
   </div>
</div>

<?php include 'footerNav.php';
   footerOutput();
   ?>