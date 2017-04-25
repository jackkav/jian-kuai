import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
var { width, height } = require('Dimensions').get('window')
var SIZE = 4 // four-by-four grid
var CELL_SIZE = Math.floor(width * 0.2) // 20% of the screen width
var CELL_PADDING = Math.floor(CELL_SIZE * 0.05) // 5% of the cell size
var BORDER_RADIUS = CELL_PADDING * 2
var TILE_SIZE = CELL_SIZE - CELL_PADDING * 2
var LETTER_SIZE = Math.floor(TILE_SIZE * 0.75)

export default class BoardView extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        {this.renderTiles()}
      </View>
    )
  }

  renderTiles () {
    var result = []
    for (var row = 0; row < SIZE; row++) {
      for (var col = 0; col < SIZE; col++) {
        var key = row * SIZE + col
        var letter = String.fromCharCode(65 + key)
        var position = {
          left: col * CELL_SIZE + CELL_PADDING,
          top: row * CELL_SIZE + CELL_PADDING
        }
        result.push(this.renderTile(key, position, letter))
      }
    }
    return result
  }
  renderTile (id, position, letter) {
    return (
      <TouchableOpacity key={id} onPress={() => console.log(id)}>
        <View style={[styles.tile, position]}>
          <Text style={styles.letter}>{letter}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    width: CELL_SIZE * SIZE,
    height: CELL_SIZE * SIZE,
    backgroundColor: 'transparent'
  },
  tile: {
    position: 'absolute',
    width: TILE_SIZE,
    height: TILE_SIZE,
    borderRadius: BORDER_RADIUS,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BEE1D2'
  },
  letter: {
    color: '#333',
    fontSize: LETTER_SIZE,
    backgroundColor: 'transparent'
  }
})
