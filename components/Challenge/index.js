import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Animated,
  Easing
} from 'react-native'
import { connect } from 'react-redux'
class Challenge extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      fadeAnim: new Animated.Value(0) // opacity 0
    }
  }
  componentDidMount () {
    Animated.timing(this.anim, {
      toValue: 60,
      duration: 5000
    }).start() // Don't forget start!
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.appData.clue !== nextProps.appData.clue) {
      this.onRemoving(nextProps.onRemoving)
    }
  }
  onRemoving (callback) {
    this.anim = new Animated.Value(0)
    Animated.timing(this.anim, {
      toValue: 60,
      duration: 5000
    }).start(callback)
  }
  render () {
    this.anim = this.anim || new Animated.Value(0)
    return (
      <TouchableHighlight style={styles.button}>
        <Text style={styles.buttonText}>
          {this.props.appData.clue}
          {' '}
          <Animated.Text
            style={{
              fontSize: this.anim
            }}
          >
            {this.props.appData.zi}
          </Animated.Text>
        </Text>
      </TouchableHighlight>
    )
  }
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

function mapStateToProps (state) {
  return {
    appData: state.appData
  }
}

export default connect(mapStateToProps)(Challenge)
