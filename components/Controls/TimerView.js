import React, { Component } from 'react'
import { Text, AppState, Alert, AsyncStorage } from 'react-native'
import FormatTime from 'minutes-seconds-milliseconds'
import { connect } from 'react-redux'
import { resetGame, setHighscore, restoreHighscore } from '../../ducks/actions'
import { saveHighscore } from '../../ducks/highscore'
export class TimerView extends Component {
  constructor (props) {
    super(props)

    this.state = {
      timeElapsed: 0,
      isPaused: false,
      tickInterval: props.interval || 200
    }
  }

  componentDidMount () {
    this.startTime = new Date()
    this.lastSavedTime = 0
    this.props.restoreHighscore()
    this.interval = setInterval(() => {
      if (this.state.timeElapsed > 5000) {
        this.setState({
          isPaused: true,
          timeElapsed: 0
        })
        if (this.props.appData.score > this.props.appData.highscore) {
          this.props.setHighscore(this.props.appData.score)
          saveHighscore(this.props.appData.score)
        }

        Alert.alert(
          'Thank you for playing',
          `Score: ${this.props.appData.score}
Highscore: ${this.props.appData.highscore}`,
          [
            {
              text: 'Try again',
              onPress: () => {
                this.props.resetGame()
                this.setState({
                  timeElapsed: 0,
                  isPaused: false
                })
                this.startTime = new Date()
                this.lastSavedTime = 0
              }
            }
          ],
          { cancelable: false }
        )
      }
      if (!this.state.isPaused) {
        this.setState({
          timeElapsed: new Date() - this.startTime + this.lastSavedTime
        })
      }
    }, this.state.tickInterval)
  }

  componentWillUnmount () {
    clearInterval(this.interval)

    this.startTime = 0
    this.lastSavedTime = 0

    this.setState({
      timeElapsed: 0
    })
  }
  format (time) {
    const pad = (time, length) => {
      while (time.length < length) {
        time = '0' + time
      }
      return time
    }

    time = new Date(time)
    let m = pad(time.getMinutes().toString(), 2)
    let s = pad(time.getSeconds().toString(), 2)

    return `${m}:${s}`
  }
  render () {
    return (
      <Text {...this.props}>
        {this.format(this.state.timeElapsed)}
      </Text>
    )
  }
}
function mapStateToProps (state) {
  return {
    appData: state.appData
  }
}

function mapDispatchToProps (dispatch) {
  return {
    resetGame: () => dispatch(resetGame()),
    restoreHighscore: () => dispatch(restoreHighscore()),
    setHighscore: s => dispatch(setHighscore(s))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimerView)
