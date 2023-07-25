const boardSize = 10;
const minesCount = 15;
const board = document.getElementById('board');
let mineLocations = new Set();
let revealedCells = 0;

$(document).on("click", "#cake3d_button", function() {
	audio.open.play(); 
	$("#cake3d").show("fold"); 
}); 

$(document).on("click", ".error-btn", function() {
    let id = $(this).attr("data");
    let hiddenData = $(".error-box[data=" + id + "]").find(".resetCake3D");
    if (hiddenData.length) {
        resetGame();
    }
});

function generateMines() {
    while (mineLocations.size < minesCount) {
        mineLocations.add(Math.floor(Math.random() * boardSize * boardSize));
    }
}

function revealCell(index, cell) {
    if (mineLocations.has(index)) {
        cell.classList.add('mine');
        error('<div class="resetCake3D">Game Over</div>');
    } else if (!cell.classList.contains('revealed')) {
        cell.classList.add('revealed');
        let mineCount = 0;
        let neighbors = [];
        // Left neighbor, if it exists
        if (index % boardSize > 0) neighbors.push(index - 1);
        // Right neighbor, if it exists
        if (index % boardSize < boardSize - 1) neighbors.push(index + 1);
        // Top neighbor, if it exists
        if (index >= boardSize) neighbors.push(index - boardSize);
        // Bottom neighbor, if it exists
        if (index < boardSize * (boardSize - 1)) neighbors.push(index + boardSize);
        // Top-left neighbor, if it exists
        if (index % boardSize > 0 && index >= boardSize) neighbors.push(index - boardSize - 1);
        // Top-right neighbor, if it exists
        if (index % boardSize < boardSize - 1 && index >= boardSize) neighbors.push(index - boardSize + 1);
        // Bottom-left neighbor, if it exists
        if (index % boardSize > 0 && index < boardSize * (boardSize - 1)) neighbors.push(index + boardSize - 1);
        // Bottom-right neighbor, if it exists
        if (index % boardSize < boardSize - 1 && index < boardSize * (boardSize - 1)) neighbors.push(index + boardSize + 1);

        neighbors.forEach(neighbor => {
            if (mineLocations.has(neighbor)) mineCount++;
        });
        cell.innerText = mineCount || '';
        revealedCells++;
        if (revealedCells + minesCount === boardSize * boardSize) {
            error('<div class="resetCake3D">You Win!</div>');
        }
        // If no neighboring mines, reveal all neighbors
        if (mineCount === 0) {
            let cells = document.getElementsByClassName('cell');
            neighbors.forEach(neighbor => {
                revealCell(neighbor, cells[neighbor]);
            });
        }
    }
}

function createBoard() {
    generateMines();
    for (let i = 0; i < boardSize; i++) {
        let row = document.createElement('div');
        for (let j = 0; j < boardSize; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            let index = i * boardSize + j;
            cell.addEventListener('click', () => {
				audio.click.play(); 
                revealCell(index, cell);
            });
            row.appendChild(cell);
        }
        board.appendChild(row);
    }
}

function resetGame() {
    mineLocations.clear();
    revealedCells = 0;
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }
    createBoard();
}

function completeGame() {
    let cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
        if (!mineLocations.has(i)) {
            cells[i].click();
        }
    }
}

createBoard();