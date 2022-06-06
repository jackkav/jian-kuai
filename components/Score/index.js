import React from 'react'
import {  Text, View } from 'react-native'
import { connect } from 'react-redux'
export const Score = props => (
  <View>
    <Text style={{ color: 'white', fontSize: 20 }}>Score: {props.appData.score}</Text>
  </View>
)


export default connect(s => s)(Score)
