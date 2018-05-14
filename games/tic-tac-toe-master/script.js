var gameboard; /* Declare a *variable* called 'gameboard'. */
var whoseTurnIsIt; /* Declare a *variable* to remember whose turn it is. */

/* Sets 'whoseTurnIsIt' to the other player. (whoever's turn it ISN'T) */
function newTurn(){
	if( gameboard.find('td:contains(?)').length < 1 ) {
		alert("Cat's game!\nPress OK to reset.");
		resetGameboard();
	}

	if( whoseTurnIsIt === 'X' )
		whoseTurnIsIt = 'O';
	else
		whoseTurnIsIt = 'X';

	$('.whose-turn-is-it').text('Player '+whoseTurnIsIt+', GO!');
		/* Updates the text on the player's screen to show whose turn it is. */

	var playingAgainstComputer = document.getElementById('play-against-computer').checked;
	if( playingAgainstComputer && whoseTurnIsIt === 'O'	 )
		AI_pickRandomSpace();

}

/* picks a random space for whoever's turn it is, so you can play against the computer */
function AI_pickRandomSpace() {
	var availableSpaces = gameboard.find('td:contains(?)');
		/* Get a list of all spaces that have a question-mark in them. */

	var spaceToPlay = availableSpaces.eq(Math.floor(Math.random() * availableSpaces.length))

	spaceToPlay.trigger('click');
}



/* Fill in all spaces with '?', to reset the gameboard. */
function resetGameboard() {
	gameboard = $('.tic-tac-toe-gameboard');
		/* The *variable* 'gameboard' now refers to the gameboard as a whole. */

	var allSpaces = gameboard.find('td').text('?');
		/* Find all of the spaces, and set their text to "?". */

	newTurn();
}

/* This can be used to check and see which player has claimed a given space. */
function whichPlayerHoldsSpaceAt(x, y) {
	var row = gameboard.find('tr').eq(y);
		/* Find row number 'y' on the 'gameboard' and remember it as the *variable* 'row' */
	var space = row.find('td').eq(x);
		/* Within that 'row', find the cell in column number 'x', and remember it as the *variable* 'cell' */

	return space.text();
		/* Return the text of the cell at (x, y), which will be X or O or ? */
}

/* Tells us the X, Y coordinate of a given 'space' in the table. */
/* Graciously copied+pasted from http://stackoverflow.com/a/6691501 */
function getSpaceXY(space){
	col = $(space).parent().children().index($(space));
	row = $(space).parent().parent().children().index($(space).parent());

	return [col, row];
}

/* Attach an *event listener* to the body, so that any time a space is clicked, the code below is executed. */
$(document).on('click', 'td.tic-tac-toe-space', function onSpaceClicked(e){
	if( $(this).text() !== '?' )
		return; /* If the space was already claimed, do nothing. */

	$(this).text(whoseTurnIsIt);
		/* Set the text of this cell to whoever's turn it is */

	var coordinatesOfSpace = getSpaceXY(this);
		/* Find the XY coords of the space clicked. */

	console.log('TicTacToe space ',coordinatesOfSpace,'was clicked by ',whoseTurnIsIt);
		/* Output debugging information to console log. */

	checkForWinner(coordinatesOfSpace[0], coordinatesOfSpace[1]);
});

/* Checks for a winner in the row and column clicked. */
function checkForWinner(row, col) {
	var winner = 
		checkForWinnerInRow(row)
		|| /* If they didn't win this row, try this column */
		checkForWinnerInCol(col)
		|| /* If they didn't win this column, check diagonally. */
		checkForWinnerDiagonal()
		|| /* Finally, try checking diagonally the opposite direction. */
		checkForWinnerDiagonalReverse()
		|| /* Otherwise, the variable 'winner' shall be false. */
		false
	;

	if(winner) {
		alert('Player '+winner+' has won the game!\nClick Ok to reset the gameboard and play again!');
		resetGameboard();
	} else {
		newTurn();
	}

}

/* Checks a given row for a winner */
function checkForWinnerInRow(row) {
	console.log('Checking for a winner in row', row);
	var countX=0; /* How many spaces player X has claimed */
	var countO=0; /* How many spaces player O has claimed */
	for(var col=0; col<3; col++) {
		var spaceClaimedBy = whichPlayerHoldsSpaceAt(row, col);

		if( spaceClaimedBy === 'X' )
			countX = countX+1;
		else if( spaceClaimedBy === 'O' )
			countO = countO+1;
	}

	if(countX === 3)
		return 'X';
	if(countO === 3)
		return 'O';
	else
		return undefined;
}

/* Checks a given column for a winner (this code was copy+pasted from above, and slightly modified. */
function checkForWinnerInCol(col) {
	var countX=0; /* How many spaces player X has claimed */
	var countO=0; /* How many spaces player O has claimed */
	for(var row=0; row<3; row++) {
		var spaceClaimedBy = whichPlayerHoldsSpaceAt(row, col);

		if( spaceClaimedBy === 'X' )
			countX = countX+1;
		else if( spaceClaimedBy === 'O' )
			countO = countO+1;
	}

	if(countX === 3)
		return 'X';
	if(countO === 3)
		return 'O';
	else
		return undefined;

}
/* Checks for a [top-left to bottom-right] diagonal winner  */
function checkForWinnerDiagonal() {
	var countX=0; /* How many spaces player X has claimed */
	var countO=0; /* How many spaces player O has claimed */
	for(var i=0; i<3; i++) {
		var spaceClaimedBy = whichPlayerHoldsSpaceAt(i, i);

		if( spaceClaimedBy === 'X' )
			countX = countX+1;
		else if( spaceClaimedBy === 'O' )
			countO = countO+1;
	}

	if(countX === 3)
		return 'X';
	if(countO === 3)
		return 'O';
	else
		return undefined;

}


/* Checks for a [top-right to bottom-left] diagonal winner  */
function checkForWinnerDiagonalReverse() {
	var countX=0; /* How many spaces player X has claimed */
	var countO=0; /* How many spaces player O has claimed */
	for(var i=0; i<3; i++) {
		var spaceClaimedBy = whichPlayerHoldsSpaceAt(2-i, i);

		if( spaceClaimedBy === 'X' )
			countX = countX+1;
		else if( spaceClaimedBy === 'O' )
			countO = countO+1;
	}

	if(countX === 3)
		return 'X';
	if(countO === 3)
		return 'O';
	else
		return undefined;

}

/* Tells the browser to run resetGameboard() when the page has loaded. */
$(resetGameboard);