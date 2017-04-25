import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BoardView from './components/Board'
export default class App extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <BoardView />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#644B62'
  },
  tile: {
    width: 100,
    height: 100,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BEE1D2'
  },
  letter: {
    color: '#333',
    fontSize: 80
  }
})
