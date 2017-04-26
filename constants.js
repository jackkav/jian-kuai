var { width, height } = require('Dimensions').get('window')
export const SIZE = 4 // four-by-four grid
export const CELL_SIZE = Math.floor(width * 0.2) // 20% of the screen width
export const CELL_PADDING = Math.floor(CELL_SIZE * 0.05) // 5% of the cell size
export const BORDER_RADIUS = CELL_PADDING * 2
export const TILE_SIZE = CELL_SIZE - CELL_PADDING * 2
export const LETTER_SIZE = Math.floor(TILE_SIZE * 0.75)
