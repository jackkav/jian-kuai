import React, { Component } from 'react'
import { Text, AppState } from 'react-native'
import FormatTime from 'minutes-seconds-milliseconds'

export default class TimerView extends Component {
  constructor (props) {
    super(props)

    this.state = {
      timeElapsed: 0,
      isPaused: false,
      tickInterval: props.interval || 100
    }
  }

  componentDidMount () {
    this.startTime = new Date()
    this.lastSavedTime = 0

    this.interval = setInterval(() => {
      this.setState({
        timeElapsed: new Date() - this.startTime + this.lastSavedTime
      })
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

  render () {
    return (
      <Text {...this.props}>
        {FormatTime(this.state.timeElapsed)}
      </Text>
    )
  }
}
