import React, {
  Component,
  View,
  Text,
  Image,
} from 'react-native'

import styles from './styles.js'
import settings from '../../../settings.js'
import sources from '../../../sources.js'

export default class Strict extends Component {

  render() {
    return(
        <View style={styles.container}>
          <View style={styles.view} >
            <Text style={styles.text}>敬请期待...</Text>
          </View>
        </View>
      )
  }
}