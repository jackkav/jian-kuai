import React, { useRef } from 'react'
import { StyleSheet, Animated, Text } from 'react-native'
import { LETTER_SIZE, BORDER_RADIUS, TILE_SIZE } from '../constants'

export const Glyph = ({ position, letter, onTouch, zi }) => {
  const anim = useRef(new Animated.Value(0)).current;
  const coloranim = useRef(new Animated.Value(0)).current
  const incorrectColor = 'rgba(255, 0, 0, 1)'

  return (
    <Animated.View
      style={[
        styles.tile,
        position,
        {
          backgroundColor: coloranim.interpolate({
            inputRange: [0, 300],
            outputRange: ['#BEE1D2', incorrectColor]
          }),
          transform: [
            // Array order matters
            {
              scale: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 4]
              })
            },
            {
              translateX: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 500]
              })
            },
            {
              rotate: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [
                  '0deg',
                  '360deg' // 'deg' or 'rad'
                ]
              })
            }
          ]
        }
      ]}
      onStartShouldSetResponder={() => {
        onTouch(letter)
        if (zi === letter) {
          Animated.spring(anim, {
            toValue: 0, // Returns to the start
            velocity: 3, // Velocity makes it move
            tension: -10, // Slow
            friction: 1, // Oscillate a lot
            useNativeDriver: false
          }).start()
        } else {
          Animated.sequence([
            Animated.timing(coloranim, {
              toValue: 300,
              useNativeDriver: false
            }),
            Animated.timing(coloranim, {
              toValue: 0,
              useNativeDriver: false
            })
          ]).start()
        }
        return true
      }}
    >
      <Text style={styles.letter}>{letter}</Text>
    </Animated.View>
  )
}

var styles = StyleSheet.create({
  tile: {
    position: 'absolute',
    width: TILE_SIZE,
    height: TILE_SIZE,
    borderRadius: BORDER_RADIUS,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BEE1D2'
  },
  letter: {
    color: '#333',
    fontSize: LETTER_SIZE,
    backgroundColor: 'transparent'
  }
})
