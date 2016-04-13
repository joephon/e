'use strict'

import React,{
  Component,
  View,
  Text,
  Image,
  StatusBar,
  TouchableNativeFeedback,
 } from 'react-native'

 const styles = require('./styles.js').styles

 class DrawerView extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }


  _pressButton() {
    const { navigator } = this.props
    navigator.pop()
  }

  render() {
    return (
      <View style={styles.container}>       
        <Image source={require('../../../images/avatarBG.png')} style={styles.avatarBox}>
          <Image source={require('../../../images/e@3x.png')} style={styles.avatar}/>
          <Text style={styles.name}>Joephon</Text>
        </Image>
        <View>
          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#fff', false)}>
            <View style={styles.list}>
              <View style={styles.li}>
                <Image source={require('../../../images/categories.png')} style={styles.liImg}/>
                <Text style={styles.liText}>点我跳转</Text>
              </View>
              <View style={styles.li}>
                <Image source={require('../../../images/categories.png')} style={styles.liImg}/>
                <Text style={styles.liText}>点我跳转</Text>
              </View>
              <View style={styles.li}>
                <Image source={require('../../../images/categories.png')} style={styles.liImg}/>
                <Text style={styles.liText}>点我跳转</Text>
              </View>
              <View style={styles.li}>
                <Image source={require('../../../images/categories.png')} style={styles.liImg}/>
                <Text style={styles.liText}>点我跳转</Text>
              </View>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    )
  }
 }

export default DrawerView
