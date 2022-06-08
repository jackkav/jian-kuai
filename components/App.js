import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Glyph } from './Glyph'
import Challenge from './Challenge'
import Timer from './Timer'
import { connect } from 'react-redux'
import {
  resetGame,
  setHighscore,
  correct,
  incorrect
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
    setHighscore: s => dispatch(setHighscore(s)),
    correct: () => dispatch(correct()),
    incorrect: () => dispatch(incorrect())
  }
}
const getPositions = ({ chinese }) => {
  var result = []

  for (var row = 0; row < SIZE; row++) {
    for (var col = 0; col < SIZE; col++) {
      var key = row * SIZE + col
      var letter = chinese[key]
      var position = {
        left: col * CELL_SIZE + CELL_PADDING,
        top: row * CELL_SIZE + CELL_PADDING
      }
      result.push({ position, letter, key })
    }
  }
  return result
}
export default connect(s => s, mapDispatchToProps,)(({ appData: { score, highscore, clue, zi, chinese }, resetGame, setHighscore, correct, incorrect }) => (
  <View style={styles.container}>
    <View style={styles.topbar}>
      <Timer
        score={score}
        highscore={highscore}
        resetGame={resetGame}
        setHighscore={setHighscore} />
      <Text style={{ color: 'white', fontSize: 20 }}>Score: {score}</Text>
    </View>
    <View style={styles.playarea}>
      <Challenge clue={clue} zi={zi} />
      <View style={{
        width: CELL_SIZE * SIZE,
        height: CELL_SIZE * SIZE,
        backgroundColor: 'transparent'
      }}>
        {getPositions({ chinese }).map(({ position, letter, key }) =>
          <Glyph
            key={key}
            zi={zi}
            letter={letter}
            position={position}
            correct={correct}
            incorrect={incorrect} />)}
      </View>
    </View>
  </View>
))

