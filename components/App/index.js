import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Board from '../Board'
export default (App = () => (
  <View style={styles.container}>
    <Board />
  </View>
))

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#644B62'
  }
})
