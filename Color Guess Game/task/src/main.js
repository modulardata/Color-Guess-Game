document.addEventListener('DOMContentLoaded', () => {

	// Global Scope Variables
	const colorBoxContainer = document.getElementById('color-blocks-container');
	const rgbGuessColor = document.getElementById('rgb-color');
	const statusMessage = document.getElementById('status');
	const restartButton = document.getElementById('restart');
	const colorsInColorBox = [];


	// Function hoisting tree

	// Generate random color function
	const generateRandomColor = () => {
		return [0, 1, 2].map(() => Math.floor(Math.random() * 256)).join(',');
	}

	// Adds html in browser for color box and adds it to the color box container using the generateRandomColor function
	const colorBox = () => {
		const color = generateRandomColor();
		const colorBoxElement = document.createElement('div');
		colorBoxElement.style.backgroundColor = `rgb(${color})`;
		colorBoxElement.classList.add('color-block');
		colorsInColorBox.push(colorBoxElement.style.backgroundColor);
		return colorBoxElement;
	}

	// Returns a random color from the colorsInColorBox array to guess a color from the color box
	const choseRandomColorInColorBox = () => {
		const randomColor = Math.floor(Math.random() * colorsInColorBox.length);
		rgbGuessColor.innerText = colorsInColorBox[randomColor].toUpperCase();
		return colorsInColorBox[randomColor];
	}


	// Function to generate a set of color boxes and appends them to the color box container.
	// This function is hoisted and can be invoked before it's defined.
	// Generates a set of color boxes and appends them to the color box container
	const generateColorSet = (colorBox, numOfColorBoxSet) => {
		colorBoxContainer.innerHTML = '';
		for (let i = 0; i < numOfColorBoxSet; i++) {
			colorBoxContainer.appendChild(colorBox());
		}
	}

	// restart function to restart the game.
	const restartGame = () => {
    colorsInColorBox.length = 0;
		generateColorSet(colorBox, 6);
		choseRandomColorInColorBox();
		statusMessage.innerText = 'Start Guessing!';
	}

 // generateColorSet(colorBox, 6);
	// // Restarts the game when the restart button is clicked.
	// restartButton.addEventListener('click', restartGame);
	//
	// console.log(colorsInColorBox);

	    // Handle click event on a color block

    colorBoxContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('color-block')) {
            const clickedColor = event.target.style.backgroundColor;
            if (clickedColor === rgbGuessColor.innerText.toLowerCase()) {
                statusMessage.innerText = 'Correct!';
                // Optionally, set all color blocks to display the correct color
                document.querySelectorAll('.color-block').forEach((block) => {
                    block.style.backgroundColor = clickedColor;
                });
            } else {
                statusMessage.innerText = 'Try Again!';
                // Hide the clicked block
                event.target.style.display = 'none';
            }
        }
    });

    // Restart the game when clicked on the restart button
    restartButton.addEventListener('click', () => {
        // Reset the status message
        statusMessage.innerText = 'Start Guessing!';
        // Show all color blocks
        document.querySelectorAll('.color-block').forEach((block) => {
            block.style.display = '';
        });
        // Start a new game
        restartGame();
    });

	  restartGame();
});



