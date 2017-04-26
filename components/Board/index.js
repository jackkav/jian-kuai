import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing
} from 'react-native'
import shuffle from 'lodash.shuffle'
import {SIZE,CELL_SIZE,CELL_PADDING} from '../../constants'
import Glyph from '../Glyph'

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
    var chinese = shuffle('的是不我一有大在人了中到資要以可這個你')
    for (var row = 0; row < SIZE; row++) {
      for (var col = 0; col < SIZE; col++) {
        var key = row * SIZE + col
        var letter = chinese[key]
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
        result.push(
          <Glyph
            key={key}
            style={style}
            letter={letter}
            tilt={this.state.tilt[key]}
          />
        )
      }
    }
    return result
  }
}

var styles = StyleSheet.create({
  container: {
    width: CELL_SIZE * SIZE,
    height: CELL_SIZE * SIZE,
    backgroundColor: 'transparent'
  }
})
