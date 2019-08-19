import { AsyncStorage } from 'react-native'

export const storeData = async (storageKey, storageValue) => {
  try {
    await AsyncStorage.setItem(storageKey, storageValue)
  } catch (e) {
    console.log(e)
  }
}

export const getData = async storageKey => {
  try {
    const value = await AsyncStorage.getItem(storageKey)
    if (value !== null) {
      return Promise.resolve(value)
    }
  } catch (e) {
    return Promise.reject(e)
  }
}
