import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
export const Score = props => (
  <View style={styles.container}>
    <Text style={styles.buttonText}>Score: {props.appData.score}</Text>
  </View>
)

var styles = StyleSheet.create({
  container: {
    // height: 60,
    // margin: 10
    // justifyContent: 'center',
    // alignItems: 'center'
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

export default connect(mapStateToProps)(Score)
