import React, { useState, useEffect } from 'react'
import { Text, Alert } from 'react-native'
const Timer = ({ score, highscore, restoreHighscore, setHighscore, resetGame }) => {
  const [isPaused, setPaused] = useState(0)
  const [seconds, setSeconds] = useState(0)

  restoreHighscore()
  useEffect(() => {
    let isMounted = true

    const timer = setInterval(() => {
      if (!isPaused) {
        isMounted && setSeconds(seconds + 1)
      }
      if (seconds >= 30) {
        isMounted && setPaused(true)

        if (score > highscore) {
          isMounted && setHighscore(score)
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
                isMounted && setPaused(false)
              }
            }
          ],
          { cancelable: false }
        )
      }
    }, 1000);
    return () => {
      clearInterval(timer)
      isMounted = false
    }
  });
  return (<Text style={{ color: 'white', fontSize: 20 }}>00:{('' + seconds).padStart(2, '0')}</Text>)
}

export default Timer
