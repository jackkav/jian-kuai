import React, { useState, useEffect } from 'react'
import { Text, Alert } from 'react-native'
import { saveHighscore } from '../../ducks/highscore'
const TimerView = ({ score, highscore, restoreHighscore, setHighscore, resetGame }) => {
  const [isPaused, setPaused] = useState(0)
  const [seconds, setSeconds] = useState(0)

  restoreHighscore()
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPaused) {
        setSeconds(seconds + 1)
      }
      if (seconds > 30) {
        setPaused(true)

        if (score > highscore) {
          setHighscore(score)
          saveHighscore(score)
        }

        Alert.alert(
          'Thank you for playing',
          `Score: ${score}
Highscore: ${highscore}`,
          [
            {
              text: 'Try again',
              onPress: () => {
                resetGame()
                setPaused(false)
              }
            }
          ],
          { cancelable: false }
        )
      }
    }, 1000);
    return () => clearInterval(timer)
  });
  return (<Text style={{ color: 'white', fontSize: 20 }}>00:{('' + seconds).padStart(2, '0')}</Text>)
}

export default TimerView
