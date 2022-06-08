import React, { useEffect, useRef, useState } from 'react'
import { Text, Animated } from 'react-native'
import {gameOver} from '../ducks/events'

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

const Timer = ({ score, highscore, setHighscore, resetGame }) => {
  const [count, setCount] = useState(10);
  const [delay, setDelay] = useState(1000);
  const [isRunning, setIsRunning] = useState(true);
  useInterval(
    () => {
      if (count > 1) {
        return setCount(count - 1);
      }
      setIsRunning(false)
      gameOver({ score, highscore, setHighscore, resetGame })
      setCount(10)
    },
    isRunning ? delay : null
  );

  return (<Text style={{ color: 'white', fontSize: 20 }}>00:{("" + count).padStart(2, '0')}</Text>)
}

export default Timer
