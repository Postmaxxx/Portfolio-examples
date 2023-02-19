const gameContainer = document.querySelector(".game-container");
const gameField = document.querySelector(".game-field");
const gameItems = document.querySelector(".game-items");

const pipesAmount = document.querySelectorAll(".pipe__amount");

const rotateBtns = document.querySelectorAll(".pipe__rotate");

const pipes = document.querySelectorAll(".pipe-item");

let gameCells = [];

const field = [
	[-1, 0], [-1, 0], [-1, 0], [-1, 0], [-1, 0],
	[-1, 0], [-1, 0], [-1, 0], [-1, 0], [-1, 0],
	[-1, 0], [-1, 0], [-1, 0], [-1, 0], [-1, 0],
	[-1, 0], [-1, 0], [-1, 0], [-1, 0], [-1, 0],
	[-1, 0], [-1, 0], [-1, 0], [-1, 0], [-1, 0],
];

const pipesInStock = [5, 3];
let pipesAngle = [1, 1]; // углы поворота труб 
let selectedPipe = 0; //выбранная труба - 1 или 2
let status = { //from - из какой ячейки, src - в какую ячейку
	from: "",
	src: 0,
};



const drowPipesInStock = () => {
	//Отрисовка труб на складе, их количества, угла повората
	pipesAmount.forEach((amountArea, index) => {
		amountArea.innerHTML = pipesInStock[index];
	});

	pipes.forEach((pipe, index) => {
		if (pipesInStock[index] < 1) {
			pipe.style.disabled = "false";
			pipe.style.opacity = "0.5";
			pipe.setAttribute("draggable", "false");
		} else {
			pipe.style.disabled = "true";
			pipe.style.opacity = "1";
			pipe.setAttribute("draggable", "true");
		}
	});

	pipes.forEach((pipe, index) => {
        if (index === 0 && pipesAngle[index] === 1) {
            pipe.style.backgroundImage = `url(https://i.ibb.co/60cjhXJ/0-1.png)`;
        }
        if (index === 0 && pipesAngle[index] === 2) {
            pipe.style.backgroundImage = `url(https://i.ibb.co/KLYvBth/0-2.png)`;
        }
        if (index === 1 && pipesAngle[index] === 1) {
            pipe.style.backgroundImage = `url(https://i.ibb.co/tDkf6pz/1-1.png)`;
        }
        if (index === 1 && pipesAngle[index] === 2) {
            pipe.style.backgroundImage = `url(https://i.ibb.co/88Xkk3S/1-2.png)`;
        }
        if (index === 1 && pipesAngle[index] === 3) {
            pipe.style.backgroundImage = `url(https://i.ibb.co/ZNgZWfc/1-3.png)`;
        }
        if (index === 1 && pipesAngle[index] === 4) {
            pipe.style.backgroundImage = `url(https://i.ibb.co/848KdDZ/1-4.png)`;
        }
	});
};

/*
            pipe.style.backgroundImage = `url(./assets/images/${index}-${pipesAngle[index]}.png)`;

https://i.ibb.co/60cjhXJ/0-1.png 0-1
https://i.ibb.co/KLYvBth/0-2.png 0-2
https://i.ibb.co/tDkf6pz/1-1.png 1-1
https://i.ibb.co/88Xkk3S/1-2.png 1-2
https://i.ibb.co/ZNgZWfc/1-3.png
https://i.ibb.co/848KdDZ/1-4.png

*/


const createGameField = (currentField) => {
	//Первоначальное создание игрового поля, listner-ов
	drowPipesInStock();

	pipes.forEach((pipe) => {
		pipe.addEventListener("dragstart", (e) => stockDragstart(e));
		pipe.addEventListener("dragend", (e) => stockDragend(e));
		pipe.addEventListener("drop", (e) => stockDragdrop(e));
		pipe.addEventListener("dragover", (e) => stockDragover(e));
		pipe.addEventListener("dragleave", (e) => stockDragleave(e));
		pipe.addEventListener(
			"dragenter",
			(e) => setTimeout(() => stockDragenter(e)),
			0
		);
	});

	rotateBtns.forEach((btn) => {
		btn.addEventListener("click", (e) => rotatePipe(e));
	});

	gameField.innerHTML = "";
	currentField.forEach((cell, index) => {
		gameField.innerHTML += `<div class="game-field__cell" id=${index} draggable="true"></div>`;
	});

	gameCells = document.querySelectorAll(".game-field__cell");

	gameCells.forEach((cell) => {
		cell.addEventListener("dragover", (e) => cellDragover(e));
		cell.addEventListener("dragleave", (e) => cellDragleave(e));
		cell.addEventListener(
			"dragenter",
			(e) => setTimeout(() => cellDragenter(e)),
			0
		);
		cell.addEventListener("drop", (e) => cellDragdrop(e));
		cell.addEventListener("dragstart", (e) => cellDragstart(e));
		cell.addEventListener("dragend", (e) => cellDragend(e));
	});
};



const stockDragover = (e) => {
	e.preventDefault();
};



const stockDragleave = (e) => {
	//при уходе убирается выделение
	e.target.classList.remove("pipe-item_drawover");
};



const stockDragenter = (e) => {
	//при входе убирается выделение
	e.target.classList.add("pipe-item_drawover");
};



const stockDragdrop = (e) => {
	e.target.classList.remove("pipe-item_drawover");
	if (status.from === "field") {
		pipesInStock[selectedPipe]++;
		pipesAngle[e.target.dataset.pipe] = field[status.src][1];
	}
	drowPipesInStock();
};



const cellDragstart = (e) => {
	const currentCell = e.target;
	status.from = "field";
	status.src = e.target.id;
	const currentCellId = currentCell.id;
	selectedPipe = field[currentCellId][0];
	gameCells[currentCellId].style.opacity = "0.5";
	pipesAngle[selectedPipe] = field[currentCellId][1];
};



const cellDragend = (e) => {
	const currentCell = e.target;
	const currentCellId = currentCell.id;
	gameCells[currentCellId].style.opacity = "1";
	field[currentCellId][0] = -1;
	redrawGameField();
	status.from = "";
};



const redrawGameField = () => {
	field.forEach((cell, index) => {
		if (cell[0] >= 0) {

            if (cell[0] === 0 && cell[1] === 1) {
                gameCells[index].style.backgroundImage  = `url(https://i.ibb.co/60cjhXJ/0-1.png)`;
            }
            if (cell[0] === 0 && cell[1] === 2) {
                gameCells[index].style.backgroundImage  = `url(https://i.ibb.co/KLYvBth/0-2.png)`;
            }
            if (cell[0] === 1 && cell[1] === 1) {
                gameCells[index].style.backgroundImage  = `url(https://i.ibb.co/tDkf6pz/1-1.png)`;
            }
            if (cell[0] === 1 && cell[1] === 2) {
                gameCells[index].style.backgroundImage  = `url(https://i.ibb.co/88Xkk3S/1-2.png)`;
            }
            if (cell[0] === 1 && cell[1] === 3) {
                gameCells[index].style.backgroundImage  = `url(https://i.ibb.co/ZNgZWfc/1-3.png)`;
            }
            if (cell[0] === 1 && cell[1] === 4) {
                gameCells[index].style.backgroundImage  = `url(https://i.ibb.co/848KdDZ/1-4.png)`;
            }



			//gameCells[index].style.backgroundImage = `url(./assets/images/${+cell[0]}-${cell[1]}.png)`;
		} else gameCells[index].style.backgroundImage = ``;
	});
};



const cellDragdrop = (e) => {
	const currentCell = e.target;
	currentCell.classList.remove("game-field__cell_drawover");
	const cellId = e.target.id;

	if (field[currentCell.id][0] > -1) {
		pipesInStock[field[currentCell.id][0]]++;
		drowPipesInStock();
		gameCells[currentCell.id].classList.remove(
			"game-field__cell_drawover-forbidden"
		);
	}

	field[cellId] = [+selectedPipe, +pipesAngle[+selectedPipe]];

	if (status.from === "store") {
		//В игровое поле пришло из хранилища
		pipesInStock[selectedPipe] -= 1;
	}

	redrawGameField();
};



const rotatePipe = (e) => {
	const pipeNumber = +e.target.dataset.rotate;
	pipesAngle[pipeNumber] += 1;
	if (pipeNumber === 0 && pipesAngle[pipeNumber] > 2) {
		pipesAngle[pipeNumber] = 1;
	}
	if (pipeNumber === 1 && pipesAngle[pipeNumber] > 4) {
		pipesAngle[pipeNumber] = 1;
	}
	drowPipesInStock();
};



const cellDragover = (e) => {
	e.preventDefault();
};



const cellDragleave = (e) => {
	const currentCell = e.target;
	currentCell.classList.remove(
		"game-field__cell_drawover",
		"game-field__cell_drawover-forbidden"
	);
	redrawGameField();
};



const cellDragenter = (e) => {
	const currentCell = e.target;
	if (field[currentCell.id][0] === -1) {
		currentCell.classList.add("game-field__cell_drawover");
		//currentCell.style.backgroundImage = `url(./assets/images/${+selectedPipe}-${pipesAngle[selectedPipe]}.png)`;

        if (selectedPipe === 0 && pipesAngle[selectedPipe] === 1) {
            currentCell.style.backgroundImage  = `url(https://i.ibb.co/60cjhXJ/0-1.png)`;
        }
        if (selectedPipe === 0 && pipesAngle[selectedPipe] === 2) {
            currentCell.style.backgroundImage  = `url(https://i.ibb.co/KLYvBth/0-2.png)`;
        }
        if (selectedPipe === 1 && pipesAngle[selectedPipe] === 1) {
            currentCell.style.backgroundImage  = `url(https://i.ibb.co/tDkf6pz/1-1.png)`;
        }
        if (selectedPipe === 1 && pipesAngle[selectedPipe] === 2) {
            currentCell.style.backgroundImage  = `url(https://i.ibb.co/88Xkk3S/1-2.png)`;
        }
        if (selectedPipe === 1 && pipesAngle[selectedPipe] === 3) {
            currentCell.style.backgroundImage  = `url(https://i.ibb.co/ZNgZWfc/1-3.png)`;
        }
        if (selectedPipe === 1 && pipesAngle[selectedPipe] === 4) {
            currentCell.style.backgroundImage  = `url(https://i.ibb.co/848KdDZ/1-4.png)`;
        }


	} else {
		currentCell.classList.add("game-field__cell_drawover-forbidden");
	}
};



const stockDragstart = (e) => {
	selectedPipe = e.target.dataset.pipe;
	status.from = "store";
};



const stockDragend = (e) => {
	status.from = "";
	drowPipesInStock();
};




createGameField(field);


/*
https://i.ibb.co/60cjhXJ/0-1.png 0-1
https://i.ibb.co/KLYvBth/0-2.png 0-2
https://i.ibb.co/tDkf6pz/1-1.png 1-1
https://i.ibb.co/88Xkk3S/1-2.png 1-2
https://i.ibb.co/ZNgZWfc/1-3.png
https://i.ibb.co/848KdDZ/1-4.png

*/