import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native'

const store = Platform.OS === 'web' ? localStorage : AsyncStorage
export const saveHighscore = async score => {
  try {
    if(isNaN(score)) return
    await store.setItem('@jian-kuai:highscore', '' + score)
  } catch (error) {
    console.log(error)
  }
}
export const getHighscore = async () => {
  try {
    const value = await store.getItem('@jian-kuai:highscore')
    if (value !== null && !isNaN(value)) {
      return value
    }
    return 0
  } catch (error) {
    console.log(error)
  }
}
