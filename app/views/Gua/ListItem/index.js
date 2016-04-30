import React, {
  Component,
  View,
  Text,
  Image,
  TouchableNativeFeedback,
} from 'react-native'

import styles from './styles.js'
import settings from '../../../settings.js'

export default class ListItem extends Component {

  handlePress(rowData) {
    this.props.setCarryData(rowData)
    this.props.nav(settings.routes.guaDetails, rowData)   
  }

  render() {
    let rowData = this.props.rowData
    return(
        <TouchableNativeFeedback onPress={this.handlePress.bind(this, rowData)}>
          <View style={styles.rowData}>
            <Image style={styles.img} source={rowData.img}/>
            <View style={styles.textBox}>
              <Text style={styles.tip}>{rowData.tip}</Text>
              <View style={styles.description}>
                <Text style={styles.tag}>{rowData.tag}</Text>
                <Text style={styles.hint}>{rowData.hint}</Text>
              </View>
            </View>
            <Image style={styles.go} source={settings.icons.back}/>
          </View>
        </TouchableNativeFeedback>
      )
  }
}