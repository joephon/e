import React, {
  Component,
  ToolbarAndroid,
  View,
  ViewPagerAndroid,
  Text,
  TouchableNativeFeedback,
  Image,
} from 'react-native'

import styles from './styles.js'
import settings from '../../settings.js'

export default class Bu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageIndex: 0,
    }
  }

  renderPages() {
    let length = [0, 1]
    length.map(index => {
      return(
        <View key={index} style={styles.pageOne}>
          <Text>{`Hi I am page${index}`}</Text>
        </View>
        )
    })
  }

  render() {
    let back = this.props.back
    let pageIndex = this.state.pageIndex
    return(
        <View style={styles.container}>
          <ToolbarAndroid
            style={styles.toolbar} 
            title={settings.tips.CN.bu}
            titleColor='#fff'
            navIcon={settings.icons.back}
            onIconClicked={back}
            />
          <View>
            <Text>{pageIndex ? '专业模式' : '简易模式'}</Text>
          </View>
          <ViewPagerAndroid
            style={styles.pager}
            initialPage={pageIndex}
            onPageSelected={() => this.setState({pageIndex: pageIndex ? 0 : 1})}
            >
            <View>
              <TouchableNativeFeedback>
                <View style={styles.pageOne}>
                  <Text>Hi I am page 0</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
            <View>
              <TouchableNativeFeedback>
                <View style={styles.pageTwo}>
                  <Text>Hi I am page 1</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </ViewPagerAndroid>
        </View>
      )
  }
}