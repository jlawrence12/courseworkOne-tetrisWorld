<!-- ********************************************************************************** 
  * Author: Jovanie Lawrence                                                       *
  * Date: October 2017                                                             *
  * This file contains code that will be used to form the navigation bar (header)  *
  * of the game website. The server will interpret the php code and tranforms it   *
  * into html.                                                                     *
  ********************************************************************************** -->
<?php 

function headerOutput($title){
echo "<!DOCTYPE html>"; //Declare to web browsers that this is a html file
    echo "<html>";
    
        echo   "<head>";
    
            echo   '<title>' . $title . '</title>';
    
                echo   "<link rel='shortcut icon' href='tetris1.png'>";
    
                    echo "<link rel='stylesheet' type='text/css' href='bootstrap.min.css'>";
    
                        echo "<link rel='stylesheet' type='text/css' href='bootstrap.css'>";

                        echo "<script src='jquery-3.1.1.min.js'></script>";
    
                    echo "<script src='https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js'> </script>";
    
                echo "<script src='bootstrap.min.js'> </script>";

                 echo "<script src='jquery.md5.js'></script>";
    
            echo "<link rel='stylesheet' type='text/css' href='StyleSheet.css'>";
        
    echo "</head>";
    
echo"<body>";
}
    
function navigationBar(){
  echo "<nav class='navbar navbar-dark' navbar-fixed-top style='background-color:#ffffff'>";
      //Open a div "container-fluid" to unlock style
      echo "<div class='container-fluid'>";
          //Open div class 
          echo "<div class='navbar-header'>";
              //insert a logo in within the nav bar 
              echo  "<a href='#' class='d-inline-block align-top'> <img src='tetrisloading.gif' height='50' width='70'> </a> <br>";
                     //Close div
                      echo "</div>";
                             //Open div class
                              echo "<div class='collapse navbar-collapse' id='navbarNavDropdown'>";
  
                                  //Open a unordered list to be populated later 
                                  echo "<ul class='nav navbar-nav'>";

                                echo " <li id='gameButton' class='active'><a href='#'> Game</a></li>";
                            
                                //Open a list item and link it to a modal
                      echo "<li id='rankingsButton'> <a href='#' data-toggle='modal' data-placement='bottom' title='Click to see score rankings'data-target='#rankingsModal'> Rankings </a></li>";

                        
                          //Open a list item and link it to a modal
                          echo "<li id='guestLogInButton'> <a href='#' data-toggle='modal' data-placement='bottom' title='Click to log in' data-target='#loginModal'> Login/Register </a> </li>";
                    
                    

                     echo "<li id='loggedInInButton' class='dropdown'>

                            <a href='#' class='dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>Welcome <span id='userNameDisplay'></span> <span class='glyphicon glyphicon-user nav-icon'></span> <span class='caret'></span></a>

                            <ul class='dropdown-menu'>
                                <li id='settingsButton'><a href='#' data-toggle='modal' data-target='#profileModal'>Profile <span class='glyphicon glyphicon-cog nav-icon'></span></a></li>
                                <li class='divider'></li>
                                <li><a id='logOutButton' href='#'> Log Out <span class='glyphicon glyphicon-hand-right nav-icon'></span></a></li> ";
                          
              //Close div
              echo "</div";
  
          //Close div
          echo  "</ul>";
  
      //Close div
      echo "</div>";
  
  //Close nav
  echo  "</nav>";
}
//Close php
?>