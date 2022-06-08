import React, { useRef, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  Animated
} from 'react-native'
const Challenge = ({ clue, zi }) => {
  const enlarge = () => {
    Animated.timing(anim, {
      toValue: 60,
      duration: 15000,
      useNativeDriver: false
    }).start()
  }
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    enlarge();
    return () => anim.setValue(0)
  }, [clue]);
  return (
    <TouchableHighlight style={styles.button}>
      <Text style={styles.buttonText}>
        {clue}
        {' '}
        <Animated.Text
          style={{
            fontSize: anim
          }}
        >
          {zi}
        </Animated.Text>
      </Text>
    </TouchableHighlight>
  )
}

var styles = StyleSheet.create({
  button: {
    height: 60,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 60
  }
})

export default Challenge
