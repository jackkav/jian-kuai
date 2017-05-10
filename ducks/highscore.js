import { AsyncStorage } from 'react-native'
export const saveHighscore = async score => {
  try {
    await AsyncStorage.setItem('@jian-kuai:highscore', '' + score)
  } catch (error) {
    console.log(error)
  }
}
export const getHighscore = async () => {
  try {
    const value = await AsyncStorage.getItem('@jian-kuai:highscore')
    if (value !== null) {
      // We have data!!
      // console.log(value)
      return value
    }
    return 0
  } catch (error) {
    console.log(error)
  }
}
