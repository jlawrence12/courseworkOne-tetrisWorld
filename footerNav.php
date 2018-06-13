<!-- ********************************************************************************** 
  * Author: Jovanie Lawrence                                                       *
  * Date: October 2017                                                             *
  * This file contains code that will be used to form the navigation bar (footer)  *
  * of the game website. The server will interpret the php code and tranforms it   *
  * into html.                                                                     *
  ********************************************************************************** -->
<?php  //Open file for php coding
  //Declare variables to store information that will be used later in the code.
  	

function footerOutput(){
    
    $year = date("d-m-y");
      $time = date("H:i:s");
    
        //Open a div that will unlock the class features to make a nav bar
          echo "<div class='navbar navbar-default navbar-fixed-bottom navbar-dark' style='background-color:#ffffff'>";

          //Open a div "container-fluid" to unlock style
              echo "<div class='container-fluid'>";

                  //Open a paragraph to display value of variables
                  echo "<p id='built-by' class='navbar-text'> &copy; J Lawrence $year $time  Tetris World </p>";
    
                      //Open a unordered list to be populated later 
                      echo "<ul class='nav navbar-nav'>";

                  //Open a list item and link it to a modal
                   echo "<li> <a href='#' data-toggle='modal' data-placement='top' title='Read how to play Tetris' data-target='#howToPlayModal'> How to play </a></li>";

                //Open a list item and link it to a modal
                echo   "<li><a href='#' data-toggle='modal' data-placement='top' title=' Read the terms & conditions 'data-target='#termsModal'> Terms of use </a></li>";

              //Open a list item and link it to a modal
              echo   "<li><a href='#' <a href='#' data-toggle='modal'  data-placement='top' title='Give your feedback' data-target='#contactUsModal'> Contact us</a></li>";

          //Close the unordered list
          echo  "</ul>";

      //Close the div
    echo "</div>"; 
    //Close the div          
   echo "</div>"; 

  //Close the div
    echo "</div>"; 
  echo "</body>";
echo "</html>";
}

  //Close the php
  ?>