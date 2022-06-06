import React from 'react'
import { StyleSheet, View } from 'react-native'
import Board from '../Board'
import Challenge from '../Challenge'
import Score from '../Score'
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

export default () => (
  <View style={styles.container}>
    <View style={styles.topbar}>
      <TimerView style={{
        color: 'white',
        fontSize: 20
      }} />
      <Score />
    </View>
    <View style={styles.playarea}>
      <Challenge />
      <Board />
    </View>
  </View>
)

