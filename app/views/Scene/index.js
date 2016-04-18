import React, {
  Component,
  View,
  Text,
  Image,
} from 'react-native'

import styles from './styles.js'
import settings from '../../settings.js'

export default class Scene extends Component {

  render() {
    return(
        <View style={styles.container}>
          <Image style={styles.bg} source={settings.icons.avatarBG}/>
          <View style={styles.wrap}>
            <Image style={styles.img} source={settings.icons.e}/>
            <View style={styles.textBox}>
              <Text style={styles.text}>《议易》-- 开启全民议《易》</Text>
            </View>
          </View>
        </View>
      )
  }
}