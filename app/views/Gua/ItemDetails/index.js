import React, {
  Component,
  View,
  ScrollView,
  Text,
  Image,
  ToolbarAndroid,
} from 'react-native'

import styles from './styles.js'
import settings from '../../../settings.js'

export default class ItemDetails extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     setYao: this.props.
  //   }
  // }

  render() {
    let carryData = this.props.carryData
    return(
        <View style={styles.container}>
          <ToolbarAndroid
            style={styles.toolbar}
            title={carryData.tag + ' ' + carryData.tip}
            titleColor='#fff'
            navIcon={settings.icons.back}
            onIconClicked={this.props.back} />
          <ScrollView>
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <Image style={styles.img} source={carryData.img} />
              </View>
              <View style={styles.headerRight}>
                <View style={styles.split}>
                  <Text style={styles.splitText}>{settings.tags.CN.guaci}</Text>
                </View>
                <Text style={styles.rightTextGua}>{carryData.gua}</Text>
              </View>
            </View>
            <View style={styles.body}>
              <View style={styles.split}>
                <Text style={styles.splitText}>{settings.tags.CN.yaoci}</Text>
              </View>
              <View>
                {
                  carryData.yaos.map((item, index) => {
                    return(
                        <Text key={index} style={[styles.rightTextGua]}>{item}</Text>
                      )
                  })
                }
              </View>
            </View>
          </ScrollView>
        </View>
      )
  }
}