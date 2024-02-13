# Odin Project tic tac toe game  
  
## *Psuedocode*  
## Game itself
### module for game board  
**store the board as an array**  
&emsp;>initialize the rows and columns variables for the board  
&emsp;>initialize board array as empty  
&emsp;>push Cell object to array making 2d array  
**create method to get the array**  
**create method to add user move to gameboard (x or o)**  
&emsp;>checks to make sure move is valid  
**create method to print gameboard to console so we can see what is happening**  
&emsp;>will be removed later  
  
return the 3 methods
  
### factory for Cell update methods  
**represents one cell on the game board**  
&emsp;can have one of three:  
&emsp;&emsp;> 0: no x or o  
&emsp;&emsp;> 1: x  
&emsp;&emsp;> 2: o  
**initialize variable for value**  
**create method to make the move**  
**create method to get the move**  
  
return the 2 methods

### module for game controller  
**Takes two players as parameters**  
&emsp;>controls flow and state of game turns  
**initialize board to gameboard module**  
**create array of player objects**  
&emsp;>each player has a value for their marker (x or o)  
**set the active player to random player in the array**  
  
**create method to switch the active player**  
  
**create method to get the active player**  
  
**create method to print the new round text**  
&emsp;>will show whose turn it is  
  
**create method to play the round**  
&emsp;>print what player made what move  
&emsp;>store the move in the board with method on the board object  
&emsp;>switch whose turn it is with the switch player method  
&emsp;>print whose turn it is with the print round method
  
**start the game**  
&emsp;>call the print round method  
  
return the method to get the active player and the play round method  
  
### store the controller object in a variable
  
## DOM integration  
  
### Module for controlling the screen  
**store game controller in a variable**  
**grab the DOM elements for board and turn notif**  
**get the current value of the board**  
**make a button for every cell in the board**  
**add event listeners to play the game when buttons are clicked**
**display the winner**
