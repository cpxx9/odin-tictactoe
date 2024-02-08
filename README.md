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
**Initialize board to gameboard**  
**create array of player objects**  
&emsp;>each player has a value for their marker (x or o)

### factory for creating players  

  
## DOM integration