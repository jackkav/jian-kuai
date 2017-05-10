import React from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { resetGame } from '../../ducks/actions'
import TimerView from './TimerView'
export const Controls = props => (
  <View>
    <TimerView style={styles.buttonText} />
    {/* <TouchableHighlight style={styles.button} onPress={() => props.resetGame()}>
      <Text style={styles.buttonText}>Restart</Text>
    </TouchableHighlight> */}
  </View>
)

var styles = StyleSheet.create({
  button: {
    height: 60,
    margin: 10,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 20
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
