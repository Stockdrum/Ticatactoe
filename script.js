window.addEventListener("DOMContentLoaded", () => {
	const tiles = Array.from(document.querySelectorAll(".tile"))
	const playerDisplay = document.querySelector(".display-player")
	const resetBtn = document.querySelector("#reset")
	const announcer = document.querySelector(".announcer")

	let board = ["", "", "", "", "", "", "", "", ""]
	let currentPlayer = "X"
	let isGameActive = true
	const playerXWon = "Player X WON!"
	const playerOWon = "Player O WON!"
	const TIE = "Tie!"

	const winningConditions = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	]

	function handleResultValidation() {
		let roundWon = false
		for (let i = 0; i <= 7; i++) {
			const winCodntion = winningConditions[i]
			const a = board[winCodntion[0]]
			const b = board[winCodntion[1]]
			const c = board[winCodntion[2]]
			if (a === "" || b === "" || c === "") {
				continue
			}
			if (a === b && b === c) {
				roundWon = true
				break
			}
		}

		if (roundWon) {
			announce(currentPlayer === "X" ? playerXWon : playerOWon)
			isGameActive = false
			return
		}

		if (!board.includes("")) announce("Tie!")
	}

	const announce = (type) => {
		switch (type) {
			case playerOWon:
				announcer.innerHTML = 'Player <span class="playerO">O</span> Won!!!!'
				break
			case playerXWon:
				announcer.innerHTML = 'Player <span class="playerX">X</span> Won!!!'
				break
			case TIE:
				announcer.innerHTML =
					"Both Player <span class='playerX'>X</span> and Player <span class='playerO'>O</span> LOSE THE GAME!"
		}
		announcer.classList.remove("hide")
	}

	const isValidAction = (tile) => {
		if (tile.innerText === "X" || tile.innerText === "O") {
			return false
		}
		return true
	}

	let updateBoard = (index) => {
		board[index] = currentPlayer
	}

	let changePlayer = () => {
		playerDisplay.classList.remove(`player${currentPlayer}`)
		currentPlayer = currentPlayer === "X" ? "O" : "X"
		playerDisplay.innerText = currentPlayer
		playerDisplay.classList.add(`player${currentPlayer}`)
	}

	const userAction = (tile, index) => {
		if (isValidAction(tile) && isGameActive) {
			tile.innerText = currentPlayer
			tile.classList.add(`player${currentPlayer}`)
			updateBoard(index)
			handleResultValidation()
			changePlayer()
		}
	}

	const resetBoard = () => {
		board = ["", "", "", "", "", "", "", "", ""]
		isGameActive = true
		announcer.classList.add("hide")

		if (currentPlayer === "O") {
			changePlayer()
		}

		tiles.forEach((tile) => {
			tile.innerText = ""
			tile.classList.remove("playerX")
			tile.classList.remove("playerO")
		})
	}

	tiles.forEach((tile, index) => {
		tile.addEventListener("click", () => userAction(tile, index))
	})

	resetBtn.addEventListener("click", resetBoard)
})
