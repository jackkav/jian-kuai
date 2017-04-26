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
export const Label = props => (
  <TouchableHighlight style={styles.button} onPress={() => props.increment()}>
    <Text style={styles.buttonText}>{props.appData.label}</Text>
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

export default connect(mapStateToProps)(Label)
