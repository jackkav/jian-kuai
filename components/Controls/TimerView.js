import React, { useState, useEffect } from 'react'
import { Text, Alert } from 'react-native'
import { connect } from 'react-redux'
import { resetGame, setHighscore, restoreHighscore } from '../../ducks/configureStore'
import { saveHighscore } from '../../ducks/highscore'
const TimerView = props => {
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isPaused, setPaused] = useState(0)
  const [startTime, setStartTime] = useState(Date.now())
  const [lastSavedTime, setLastSavedTime] = useState(0)
  const format = (time) => {
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
  props.restoreHighscore()
  useEffect(() => {
    const timer = setInterval(() => {
      if (timeElapsed > 30000) {
        setPaused(true)
        setTimeElapsed(0)

        if (props.appData.score > props.appData.highscore) {
          props.setHighscore(props.appData.score)
          saveHighscore(props.appData.score)
        }

        Alert.alert(
          'Thank you for playing',
          `Score: ${props.appData.score}
Highscore: ${props.appData.highscore}`,
          [
            {
              text: 'Try again',
              onPress: () => {
                props.resetGame()
                setTimeElapsed(0)
                setPaused(false)

                setStartTime(Date.now())
                setLastSavedTime(0)
              }
            }
          ],
          { cancelable: false }
        )
      }
      if (!isPaused) {
        setTimeElapsed(Date.now() - startTime + lastSavedTime)
      }


    }, 200);
    return () => {
      clearInterval(timer)
      // setStartTime(0)
      // setLastSavedTime(0)
      // setTimeElapsed(0)
    }
  });
  return (<Text {...props}>
    {format(timeElapsed)}
  </Text>)
}

function mapDispatchToProps(dispatch) {
  return {
    resetGame: () => dispatch(resetGame()),
    restoreHighscore: () => dispatch(restoreHighscore()),
    setHighscore: s => dispatch(setHighscore(s))
  }
}

export default connect(s=>s, mapDispatchToProps)(TimerView)
