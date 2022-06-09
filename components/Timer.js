import React, { useEffect, useRef, useState } from 'react'
import { Text, Animated } from 'react-native'
import { gameOver } from '../ducks/events'

const useInterval = (callback, delay) => {
  const savedCallback = useRef(() => { });

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    if (delay !== null) {
      const interval = setInterval(() => savedCallback.current(), delay || 0);
      return () => clearInterval(interval);
    }

    return undefined;
  }, [delay]);
};

const Timer = ({ score, highscore, resetGame }) => {
  const [count, setCount] = useState(10);
  const [isRunning, setIsRunning] = useState(true);
  useInterval(
    () => {
      if (count > 1) {
        return setCount(count - 1);
      }
      gameOver({
        score,
        highscore: score > highscore ? score : highscore,
        onComplete: () => {
          resetGame()

          setCount(10)
          setIsRunning(true)
        }
      })
    },
    isRunning ? 1000 : null
  );

  return (<Text style={{ color: 'white', fontSize: 20 }}>00:{("" + count).padStart(2, '0')}</Text>)
}

export default Timer
