import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing
} from 'react-native'
import {LETTER_SIZE,BORDER_RADIUS,TILE_SIZE} from '../../constants'

 const clickTile = (id, opacity, tilt) => {
    opacity.setValue(0.5)
    Animated.timing(opacity, {
      toValue: 1, // fully opaque
      duration: 250 // milliseconds
    }).start()
    tilt.setValue(4) // mapped to -30 degrees
    Animated.timing(tilt, {
      toValue: 0, // mapped to 0 degrees (no tilt)
      duration: 250, // milliseconds
      easing: Easing.quad // quadratic easing function: (t) => t * t
    }).start()
  }

export default Glyph = ({id,style,tilt,letter}) =>{
return (
      <Animated.View
        key={id}
        style={[styles.tile, style]}
        onStartShouldSetResponder={() =>
          clickTile(
            id,
            style.opacity,
            tilt
          )}
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
