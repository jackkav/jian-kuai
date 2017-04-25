import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing
} from 'react-native'
var { width, height } = require('Dimensions').get('window')
var SIZE = 4 // four-by-four grid
var CELL_SIZE = Math.floor(width * 0.2) // 20% of the screen width
var CELL_PADDING = Math.floor(CELL_SIZE * 0.05) // 5% of the cell size
var BORDER_RADIUS = CELL_PADDING * 2
var TILE_SIZE = CELL_SIZE - CELL_PADDING * 2
var LETTER_SIZE = Math.floor(TILE_SIZE * 0.75)

export default class BoardView extends React.Component {
  constructor () {
    super()
    var opacities = new Array(SIZE * SIZE)
    for (var i = 0; i < opacities.length; i++) {
      opacities[i] = new Animated.Value(1)
    }
    var tilt = new Array(SIZE * SIZE)
    for (var i = 0; i < tilt.length; i++) {
      tilt[i] = new Animated.Value(0)
    }
    this.state = { opacities, tilt }
  }

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
        var tilt = this.state.tilt[key].interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '-30deg']
        })
        var style = {
          left: col * CELL_SIZE + CELL_PADDING,
          top: row * CELL_SIZE + CELL_PADDING,
          opacity: this.state.opacities[key],
          transform: [{ perspective: CELL_SIZE * 8 }, { rotateX: tilt }]
        }
        result.push(this.renderTile(key, style, letter))
      }
    }
    return result
  }
  renderTile (id, style, letter) {
    return (
      <Animated.View
        key={id}
        style={[styles.tile, style]}
        onStartShouldSetResponder={() => this.clickTile(id)}
      >
        <Text style={styles.letter}>{letter}</Text>
      </Animated.View>
    )
  }
  clickTile (id) {
    var opacity = this.state.opacities[id]
    opacity.setValue(0.5)
    Animated.timing(opacity, {
      toValue: 1, // fully opaque
      duration: 250 // milliseconds
    }).start()
    var tilt = this.state.tilt[id]
    tilt.setValue(1) // mapped to -30 degrees
    Animated.timing(tilt, {
      toValue: 0, // mapped to 0 degrees (no tilt)
      duration: 250, // milliseconds
      easing: Easing.quad // quadratic easing function: (t) => t * t
    }).start()
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
