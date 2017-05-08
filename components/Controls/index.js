import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Animated,
  Easing
} from 'react-native'
import { connect } from 'react-redux'
import { resetGame } from '../../ducks/actions'
export const Controls = props => (
  <TouchableHighlight style={styles.button} onPress={() => props.resetGame()}>
    <Text style={styles.buttonText}>New Game</Text>
  </TouchableHighlight>
)

var styles = StyleSheet.create({
  button: {
    height: 60,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 40
  }
})

function mapStateToProps (state) {
  return {
    appData: state.appData
  }
}

function mapDispatchToProps (dispatch) {
  return {
    resetGame: g => dispatch(resetGame())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls)
