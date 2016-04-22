import Storage from 'react-native-storage'

let storage = new Storage({
  size: 1000,
  defaultExpires: 1000 * 3600 * 24 * 7,
  enableCahe: true,
  sync: {

  }
})

export default storage