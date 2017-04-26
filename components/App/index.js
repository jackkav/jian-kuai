import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Board from '../Board'
import Label from '../Label'
export default (App = () => (
  <View style={styles.container}>
    <Label />
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
