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
import { increment } from '../../ducks/actions'
export const Label = props => (
  <TouchableHighlight style={styles.button} onPress={() => props.increment()}>
    <Text style={styles.buttonText}>Load Data{props.appData.count}</Text>
  </TouchableHighlight>
)

var styles = StyleSheet.create({
  button: {
    height: 60,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0b7eff'
  },
  buttonText: {
    color: 'white'
  }
})

function mapStateToProps (state) {
  return {
    appData: state.appData
  }
}

function mapDispatchToProps (dispatch) {
  return {
    increment: () => dispatch(increment())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Label)
