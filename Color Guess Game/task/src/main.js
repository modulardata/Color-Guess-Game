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
		document.querySelectorAll('.color-block').forEach((block) => {
			block.style.display = '';
		});
	}

	// Check if the clicked box is a color block and if it's the correct color.
	const isBoxCorrect = (event) => {
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
	};

	//  Start or restart in invoked after the game when the DOM is fully loaded.
	restartGame();
	// Handle click event's
	colorBoxContainer.addEventListener('click', isBoxCorrect);
	restartButton.addEventListener('click', restartGame);


}); // End of DOMContentLoaded event listener



