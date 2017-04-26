import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing
} from 'react-native'
import { LETTER_SIZE, BORDER_RADIUS, TILE_SIZE } from '../../constants'
import { connect } from 'react-redux'
import { selectGlyph } from '../../ducks/actions'

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
          this.props.selectGlyph(this.props.letter)
          this.clickTile(this.anim)
          return true
        }}
      >
        <Text style={styles.letter}>{this.props.letter}</Text>
      </Animated.View>
    )
  }
  clickTile (anim) {
    Animated.spring(this.anim, {
      toValue: 0, // Returns to the start
      velocity: 3, // Velocity makes it move
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
    selectGlyph: g => dispatch(selectGlyph(g))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Glyph)
