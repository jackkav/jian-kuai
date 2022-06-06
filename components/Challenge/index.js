import React, { useRef, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  Animated
} from 'react-native'
import { connect } from 'react-redux'
const Challenge = (props) => {
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
  });
  return (
    <TouchableHighlight style={styles.button}>
      <Text style={styles.buttonText}>
        {props.appData.clue}
        {' '}
        <Animated.Text
          style={{
            fontSize: anim
          }}
        >
          {props.appData.zi}
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

export default connect(s => s)(Challenge)
