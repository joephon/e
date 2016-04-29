import React, {
  Component,
  View,
  ScrollView,
  Text,
  Image,
  ToolbarAndroid,
  TouchableOpacity,
} from 'react-native'

import styles from './styles.js'
import settings from '../../../settings.js'

export default class ItemDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      detailsHeight: true,
    }
  }

  changeDetailsHeight() {
    let detailsHeight = this.state.detailsHeight
    this.setState({detailsHeight: !detailsHeight})
  }

  render() {
    let carryData = this.props.carryData
    let detailsHeight = this.state.detailsHeight
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
            <View style={[styles.details, {height: (detailsHeight ? 60 : null)}]}>
              <TouchableOpacity onPress={this.changeDetailsHeight.bind(this)}>
                <View style={[styles.detailsTip, {backgroundColor: (detailsHeight ? '#9d55b8' : '#999')}]}>
                  <Text style={styles.detailsText}>《彖》《象》《文言》</Text>
                </View>
              </TouchableOpacity>
              {
                carryData.details.map((item, index) => {
                  return(
                      <Text key={index} style={styles.rightTextGua}>{item}</Text>
                    )
                })
              }
            </View>
          </ScrollView>
        </View>
      )
  }
}