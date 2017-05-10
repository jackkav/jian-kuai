import React from 'react'
import { StyleSheet, View } from 'react-native'
import Board from '../Board'
import Challenge from '../Challenge'
import Score from '../Score'
import Controls from '../Controls'
export default (App = () => (
  <View style={styles.container}>
    <View style={styles.topbar}>
      <Controls />
      <Score />
    </View>
    <View style={styles.playarea}>
      <Challenge />
      <Board />
    </View>
  </View>
))

var styles = StyleSheet.create({
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
