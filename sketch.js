let grid
let sandResolution = 5
let cols, rows
let hueValue = 2

function setup() {
  let width = floor(windowWidth * 0.9)
  let height = floor(windowHeight * 0.8)
  createCanvas(width, height)
  colorMode(HSB, 360, 255, 255)

  cols = floor(width / sandResolution)
  rows = floor(height / sandResolution)
  grid = make2DArray(cols, rows)

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = 0
    }
  }
}

function draw() {
  background(0)

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      noStroke()
      if (grid[i][j] > 0) {
        fill(grid[i][j], 255, 255)
        let x = i * sandResolution
        let y = j * sandResolution
        square(x, y, sandResolution)
      }
    }
  }

  let nextGrid = make2DArray(cols, rows)

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j]

      if (state > 0) {
        let below = grid[i][j + 1]

        let dir = random([-1, 1])

        let belowA, belowB

        if (checkColumnBoundary(i + dir)) {
          belowA = grid[i + dir][j + 1]
        }

        if (checkColumnBoundary(i - dir)) {
          belowB = grid[i - dir][j + 1]
        }

        if (below === 0) {
          nextGrid[i][j + 1] = state
        } else if (belowA === 0) {
          nextGrid[i + dir][j + 1] = state
        } else if (belowB === 0) {
          nextGrid[i - dir][j + 1] = state
        } else {
          nextGrid[i][j] = state
        }
      }
    }
  }

  grid = nextGrid
}

function releaseSand() {
  let mouseCol = floor(mouseX / sandResolution)
  let mouseRow = floor(mouseY / sandResolution)

  let matrix = 3
  let extent = floor(matrix / 2)

  for (let i = -extent; i <= extent; i++) {
    for (let j = -extent; j <= extent; j++) {

      if (random(1) < 0.75) {
        let col = mouseCol + i
        let row = mouseRow + j

        if (checkColumnBoundary(col) && checkRowBoundary(row)) {
          grid[col][row] = hueValue
        }
      }
    }
  }

  hueValue = hueValue <= 360 ? hueValue + 0.15 : 1
}

function mouseDragged() {
  releaseSand()
}

function mousePressed() {
  releaseSand()
}

function make2DArray(cols, rows) {
  let arr = new Array(cols)
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows)
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = 0
    }
  }

  return arr
}

function checkColumnBoundary(i) {
  return i > 0 && i <= cols - 1
}

function checkRowBoundary(j) {
  return j > 0 && j <= rows - 1
}
