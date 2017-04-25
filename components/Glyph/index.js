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
export default class Glyph extends React.Component {
  render () {
    return (
      <Animated.View
        key={this.props.id}
        style={[styles.tile, this.props.style]}
        onStartShouldSetResponder={() =>
          this.clickTile(
            this.props.id,
            this.props.style.opacity,
            this.props.tilt
          )}
      >
        <Text style={styles.letter}>{this.props.letter}</Text>
      </Animated.View>
    )
  }
  clickTile (id, opacity, tilt) {
    opacity.setValue(0.5)
    Animated.timing(opacity, {
      toValue: 1, // fully opaque
      duration: 250 // milliseconds
    }).start()
    tilt.setValue(1) // mapped to -30 degrees
    Animated.timing(tilt, {
      toValue: 0, // mapped to 0 degrees (no tilt)
      duration: 250, // milliseconds
      easing: Easing.quad // quadratic easing function: (t) => t * t
    }).start()
  }
}
/* export const Glyph = (key, style, letter) => {
  return (
    <Animated.View
      key={id}
      style={[styles.tile, style]}
      onStartShouldSetResponder={() => clickTile(id)}
    >
      <Text style={styles.letter}>{letter}</Text>
    </Animated.View>
  )
} */

var styles = StyleSheet.create({
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
