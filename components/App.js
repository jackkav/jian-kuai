import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Glyph } from './Glyph'
import Challenge from './Challenge'
import Timer from './Timer'
import { connect } from 'react-redux'
import {
  resetGame, setHighscore, restoreHighscore,
  correct,
  incorrect,
  nextClue
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
    restoreHighscore: () => dispatch(restoreHighscore()),
    setHighscore: s => dispatch(setHighscore(s)),
    resetLevel: () => dispatch(resetLevel()),
    correct: () => dispatch(correct()),
    nextClue: () => dispatch(nextClue()),
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
export default connect(s => s, mapDispatchToProps,)(({ appData: { score, highscore, clue, zi, chinese }, restoreHighscore, setHighscore, correct, incorrect, nextClue }) => (
  <View style={styles.container}>
    <View style={styles.topbar}>
      <Timer
        score={score}
        highscore={highscore}
        restoreHighscore={restoreHighscore}
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
            nextClue={nextClue}
            incorrect={incorrect} />)}
      </View>
    </View>
  </View>
))

