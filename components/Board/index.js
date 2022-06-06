import React from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { SIZE, CELL_SIZE, CELL_PADDING } from '../../constants'
import Glyph from '../Glyph'

const BoardView = props => {
  return (
    <View style={styles.container}>
      {renderTiles(props.appData.chinese)}
    </View>
  )
}
const renderTiles = chinese => {
  var result = []

  for (var row = 0; row < SIZE; row++) {
    for (var col = 0; col < SIZE; col++) {
      var key = row * SIZE + col
      var letter = chinese[key]
      var style = {
        left: col * CELL_SIZE + CELL_PADDING,
        top: row * CELL_SIZE + CELL_PADDING
      }
      result.push(<Glyph key={key} style={style} letter={letter} />)
    }
  }
  return result
}

var styles = StyleSheet.create({
  container: {
    width: CELL_SIZE * SIZE,
    height: CELL_SIZE * SIZE,
    backgroundColor: 'transparent'
  }
})

export default connect(s=>s)(BoardView)
