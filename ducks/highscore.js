import AsyncStorage from '@react-native-async-storage/async-storage';
export const saveHighscore = async score => {
  try {
    if(isNaN(value)) return
    await AsyncStorage.setItem('jian-kuai:highscore', '' + score)
  } catch (error) {
    console.log(error)
  }
}
export const getHighscore = async () => {
  try {
    const value = await AsyncStorage.getItem('jian-kuai:highscore')
    if (value !== null && !isNaN(value)) {
      return value
    }
    return 0
  } catch (error) {
    console.log(error)
  }
}
