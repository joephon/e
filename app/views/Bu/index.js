import React, {
  Component,
  ToolbarAndroid,
  View,
  ViewPagerAndroid,
  Text,
  TouchableNativeFeedback,
  Image,
  ToastAndroid,
} from 'react-native'

import styles from './styles.js'
import settings from '../../settings.js'
import Easy from './Easy'
import Strict from './Strict'

export default class Bu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageIndex: 0,
      pos: -190,
    }
  }

  setPage(pageIndex) {
    let viewPage = this.refs.viewPage
    if (pageIndex != this.state.pageIndex)
        this.showToast(pageIndex)
    else
      return
    this.setState({pageIndex: pageIndex},() => {
      viewPage.setPage(pageIndex)
      this.moveUnderLine()
    })
  }

  updatePage() {
    let pageIndex = this.state.pageIndex
    pageIndex = (pageIndex == 1 ? 0 : 1)
    this.setState({pageIndex: pageIndex}, () => {
      this.showToast(pageIndex)
      this.moveUnderLine()
    })
  }

  showToast(pageIndex) {
    let tip = pageIndex ? settings.tags.CN.strict : settings.tags.CN.easy
    ToastAndroid.show(tip,ToastAndroid.SHORT)
  }

  moveUnderLine(event) {
    let pos = this.state.pos 
    let pageIndex = this.state.pageIndex
    if (pageIndex == 1) {
      for (let i = 1; i <= 10; i ++) {
        setTimeout(() => {
          this.setState({pos: pos + 39 * i})
        }, i * 10)
      }
    }
    else {
      for (let i = 1; i <= 10; i ++) {
        setTimeout(() => {
          this.setState({pos: pos + -39 * i})
        }, i * 10)
      }
    }

  }

  render() {
    let back = this.props.back
    let pageIndex = this.state.pageIndex
    let pos = this.state.pos
    return(
        <View style={styles.container}>
          <ToolbarAndroid
            style={styles.toolbar} 
            title={settings.tips.CN.bu}
            titleColor='#fff'
            navIcon={settings.icons.back}
            onIconClicked={back}
            />
          <View style={styles.segment}>
            <TouchableNativeFeedback onPress={this.setPage.bind(this,0)}>
              <View style={styles.segmentItem}>
                <Text style={[styles.segmentText,{color: (pageIndex ? '#ccc' : '#9d55b8')}]}>{settings.tags.CN.easy}</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={this.setPage.bind(this,1)}>
              <View style={styles.segmentItem}>
                <Text style={[styles.segmentText,{color: (pageIndex ? '#9d55b8' : '#ccc')}]}>{settings.tags.CN.strict}</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
          <View style={[styles.underLine,{marginLeft: pos}]}>
          </View>
          <ViewPagerAndroid
            ref='viewPage'
            style={styles.pager}
            initialPage={0}
            onPageSelected={this.updatePage.bind(this)}>
            <View>
              <TouchableNativeFeedback>
                <View style={styles.page}>
                  <Easy {...this.props} />
                </View>
              </TouchableNativeFeedback>
            </View>
            <View>
              <TouchableNativeFeedback>
                <View style={styles.page}>
                  <Strict {...this.props} />
                </View>
              </TouchableNativeFeedback>
            </View>
          </ViewPagerAndroid>
        </View>
      )
  }
}