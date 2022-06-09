import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Glyph } from './Glyph'
import Challenge from './Challenge'
import Timer from './Timer'
import { connect } from 'react-redux'
import {
  resetGame,
  onTouch
} from '../ducks/configureStore'
import { SIZE, CELL_SIZE, CELL_PADDING } from '../constants'


let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#644B62'
  },
  playarea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#644B62'
  },
  topbar: {
    margin: 30,
    flexDirection: 'column'
  }
})

function mapDispatchToProps(dispatch) {
  return {
    resetGame: () => dispatch(resetGame()),
    onTouch: s => dispatch(onTouch(s)),
  }
}
const getPositions = ({ chinese }) => {
  var result = []

  for (var row = 0; row < SIZE; row++) {
    for (var col = 0; col < SIZE; col++) {
      var key = row * SIZE + col
      var character = chinese[key]
      var position = {
        left: col * CELL_SIZE + CELL_PADDING,
        top: row * CELL_SIZE + CELL_PADDING
      }
      result.push({ position, character, key })
    }
  }
  return result
}

export default connect(s => s, mapDispatchToProps)(({ appData: { score, highscore, expectedEmoji, expectedCharacter, chinese }, resetGame, onTouch }) => (
  <View style={styles.container}>
    <View style={styles.topbar}>
      <Timer
        score={score}
        highscore={highscore}
        resetGame={resetGame}
         />
      <Text style={{ color: 'white', fontSize: 20 }}>Score: {score}</Text>
    </View>
    <View style={styles.playarea}>
      <Challenge expectedEmoji={expectedEmoji} expectedCharacter={expectedCharacter} />
      <View style={{
        width: CELL_SIZE * SIZE,
        height: CELL_SIZE * SIZE,
        backgroundColor: 'transparent'
      }}>
        {getPositions({ chinese }).map(({ position, character, key }) =>
          <Glyph
            key={key}
            expectedCharacter={expectedCharacter}
            character={character}
            position={position}
            onTouch={onTouch}
            />)}
      </View>
    </View>
  </View>
))

