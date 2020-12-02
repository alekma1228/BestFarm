import AsyncStorage from '@react-native-community/async-storage'

// Taken from https://aws-amplify.github.io/docs/js/authentication and fixed to use the new async storage.

const MEMORY_KEY_PREFIX = '@CustomAsyncStorage:'
let dataMemory: { [key: string]: string | null } = {}

export class CustomAsyncStorage {
  static syncPromise: Promise<unknown> | undefined = undefined
  /**
   * This is used to set a specific item in storage
   */
  static setItem(key: string, value: string) {
    AsyncStorage.setItem(MEMORY_KEY_PREFIX + key, value)
    dataMemory[key] = value
    return dataMemory[key]
  }

  /**
   * This is used to get a specific key from storage
   */
  static getItem(key: string) {
    return Object.prototype.hasOwnProperty.call(dataMemory, key) ? dataMemory[key] : undefined
  }

  /**
   * This is used to remove an item from storage
   */
  static removeItem(key: string) {
    AsyncStorage.removeItem(MEMORY_KEY_PREFIX + key)
    return delete dataMemory[key]
  }

  /**
   * This is used to clear the storage
   */
  static clear() {
    dataMemory = {}
    return dataMemory
  }

  /**
   * Will sync the MemoryStorage data from AsyncStorage to storageWindow MemoryStorage
   */
  static sync() {
    if (!CustomAsyncStorage.syncPromise) {
      CustomAsyncStorage.syncPromise = new Promise((resolve, reject) => {
        AsyncStorage.getAllKeys((errKeys, keys) => {
          if (errKeys) {
            reject(errKeys)
          }

          if (!keys) {
            resolve()
            return
          }

          const memoryKeys = keys.filter(key => key.startsWith(MEMORY_KEY_PREFIX))
          AsyncStorage.multiGet(memoryKeys, (err, stores) => {
            if (err) {
              reject(err)
            }

            if (!stores) {
              resolve()
              return
            }

            stores.map((_result, index, store) => {
              const key = store[index][0]
              const value = store[index][1]
              const memoryKey = key.replace(MEMORY_KEY_PREFIX, '')
              dataMemory[memoryKey] = value
            })
            resolve()
          })
        })
      })
    }
    return CustomAsyncStorage.syncPromise
  }
}
