import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Board from '../Board'
import Challenge from '../Challenge'
import TimerView from '../Controls/TimerView'

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
import { connect } from 'react-redux'
import {
  resetGame, setHighscore, restoreHighscore,
  correct,
  incorrect,
  nextClue
} from '../../ducks/configureStore'
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
export default connect(s => s, mapDispatchToProps,)(({ appData: { score, highscore, clue, zi, chinese }, restoreHighscore, setHighscore, correct, incorrect, nextClue }) => (
  <View style={styles.container}>
    <View style={styles.topbar}>
      <TimerView
        score={score}
        highscore={highscore}
        restoreHighscore={restoreHighscore}
        setHighscore={setHighscore} />
      <Text style={{ color: 'white', fontSize: 20 }}>Score: {score}</Text>
    </View>
    <View style={styles.playarea}>
      <Challenge clue={clue} zi={zi} />
      <Board chinese={chinese} correct={correct} nextClue={nextClue} incorrect={incorrect} />
    </View>
  </View>
))

