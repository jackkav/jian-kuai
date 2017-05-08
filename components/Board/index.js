import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
  TouchableHighlight
} from 'react-native'
import shuffle from 'lodash.shuffle'
import { SIZE, CELL_SIZE, CELL_PADDING } from '../../constants'
import Glyph from '../Glyph'

export default class BoardView extends React.Component {
  constructor () {
    super()
    var chinese = shuffle('大小中饭面肉牛鸡猪鞋上下左右前后') // 手足
    this.state = { chinese }
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
        var letter = this.state.chinese[key]
        var style = {
          left: col * CELL_SIZE + CELL_PADDING,
          top: row * CELL_SIZE + CELL_PADDING
        }
        result.push(<Glyph key={key} style={style} letter={letter} />)
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
