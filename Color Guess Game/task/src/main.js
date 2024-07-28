document.addEventListener('DOMContentLoaded', () => {

	// Global Scope Variables
	const colorBoxContainer = document.getElementById('color-blocks-container');
	const rgbGuessColor = document.getElementById('rgb-color');
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

// Restarts the game when the restart button is clicked.
	document.getElementById('restart').addEventListener('click', () => {
		// reset global scope variable colorBoxContainer
		colorsInColorBox.length = 0;
		generateColorSet(colorBox, 6);
		choseRandomColorInColorBox();
	});

	// Function calls and hoisting
	// or Invoke function's
	generateColorSet(colorBox, 6);

	console.log(choseRandomColorInColorBox());
	console.log(colorsInColorBox);



});



