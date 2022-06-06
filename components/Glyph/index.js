import React,{useRef} from 'react'
import { StyleSheet, Text, Animated } from 'react-native'
import { LETTER_SIZE, BORDER_RADIUS, TILE_SIZE } from '../../constants'
import { connect } from 'react-redux'
import {
  correct,
  incorrect,
  nextClue
} from '../../ducks/configureStore'

export const Glyph = (props) => {
  const anim = useRef(new Animated.Value(0)).current;
  const coloranim = useRef(new Animated.Value(0)).current
  const incorrectColor = 'rgba(255, 0, 0, 1)'

  return (
    <Animated.View
      key={props.id}
      style={[
        styles.tile,
        props.style,
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
        if (props.appData.zi === props.letter) {
          props.correct()
          props.nextClue()
          Animated.spring(anim, {
            toValue: 0, // Returns to the start
            velocity: 3, // Velocity makes it move
            tension: -10, // Slow
            friction: 1, // Oscillate a lot
            useNativeDriver: false
          }).start()
        } else {
          props.incorrect()
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
      <Text style={styles.letter}>{props.letter}</Text>
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

export default connect(s => s, dispatch => ({
  resetLevel: g => dispatch(resetLevel()),
  correct: g => dispatch(correct()),
  nextClue: g => dispatch(nextClue()),
  incorrect: g => dispatch(incorrect())
}))(Glyph)
