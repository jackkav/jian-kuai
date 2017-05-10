import React from 'react'
import { StyleSheet, Text, Animated } from 'react-native'
import { LETTER_SIZE, BORDER_RADIUS, TILE_SIZE } from '../../constants'
import { connect } from 'react-redux'
import {
  selectGlyph,
  resetLevel,
  correct,
  incorrect,
  nextClue
} from '../../ducks/actions'

export class Glyph extends React.Component {
  render () {
    this.anim = this.anim || new Animated.Value(0)
    return (
      <Animated.View
        key={this.props.id}
        style={[
          styles.tile,
          this.props.style,
          {
            transform: [
              // Array order matters
              {
                scale: this.anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 4]
                })
              },
              {
                translateX: this.anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 500]
                })
              },
              {
                rotate: this.anim.interpolate({
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
          if (this.props.appData.findMe === this.props.letter) {
            this.props.correct()
            this.props.nextClue()
            this.clickCorrectTile(this.anim)
          } else {
            this.props.incorrect()
            this.clickWrongTile(this.anim)
          }

          return true
        }}
      >
        <Text style={styles.letter}>{this.props.letter}</Text>
      </Animated.View>
    )
  }
  clickWrongTile (anim) {
    Animated.spring(this.anim, {
      toValue: 0, // Returns to the start
      velocity: 3, // Velocity makes it move
      tension: -10, // Slow
      friction: 1 // Oscillate a lot
    }).start()
  }
  clickCorrectTile (anim) {
    Animated.spring(this.anim, {
      toValue: 0, // Returns to the start
      velocity: 1, // Velocity makes it move
      tension: -10, // Slow
      friction: 1 // Oscillate a lot
    }).start()
  }
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
function mapStateToProps (state) {
  return {
    appData: state.appData
  }
}

function mapDispatchToProps (dispatch) {
  return {
    selectGlyph: g => dispatch(selectGlyph(g)),
    resetLevel: g => dispatch(resetLevel()),
    correct: g => dispatch(correct()),
    nextClue: g => dispatch(nextClue()),
    incorrect: g => dispatch(incorrect())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Glyph)
