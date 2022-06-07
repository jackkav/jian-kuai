import React, { useRef } from 'react'
import { StyleSheet, View, Animated, Text } from 'react-native'
import { SIZE, CELL_SIZE, CELL_PADDING, LETTER_SIZE, BORDER_RADIUS, TILE_SIZE } from '../../constants'

const BoardView = ({ chinese, correct, nextClue, incorrect }) => {
  return (
    <View style={{
      width: CELL_SIZE * SIZE,
      height: CELL_SIZE * SIZE,
      backgroundColor: 'transparent'
    }}>
      {renderTiles({ chinese, correct, nextClue, incorrect })}
    </View>
  )
}
const renderTiles = ({ chinese, correct, nextClue, incorrect }) => {
  var result = []

  for (var row = 0; row < SIZE; row++) {
    for (var col = 0; col < SIZE; col++) {
      var key = row * SIZE + col
      var letter = chinese[key]
      var position = {
        left: col * CELL_SIZE + CELL_PADDING,
        top: row * CELL_SIZE + CELL_PADDING
      }
      result.push(<Glyph key={key} position={position} letter={letter} correct={correct} nextClue={nextClue} incorrect={incorrect} />)
    }
  }
  return result
}

export const Glyph = ({ position, letter, correct, nextClue, incorrect }) => {
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
        if (appData.zi === letter) {
          correct()
          nextClue()
          Animated.spring(anim, {
            toValue: 0, // Returns to the start
            velocity: 3, // Velocity makes it move
            tension: -10, // Slow
            friction: 1, // Oscillate a lot
            useNativeDriver: false
          }).start()
        } else {
          incorrect()
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
export default BoardView
