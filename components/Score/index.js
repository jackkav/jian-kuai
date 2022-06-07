import React from 'react'
import {  Text, View } from 'react-native'
export const Score = ({score}) => (
  <View>
    <Text style={{ color: 'white', fontSize: 20 }}>Score: {score}</Text>
  </View>
)


export default Score
