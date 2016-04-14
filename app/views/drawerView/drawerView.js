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


  goHome() {
    this.props.nav('home')
  }

  render() {
    return (
      <View style={styles.container}>       
        <Image source={require('../../../images/avatarBG.png')} style={styles.avatarBox}>
          <Image source={require('../../../images/e@3x.png')} style={styles.avatar}/>
          <Text style={styles.name}>议易</Text>
        </Image>
        <View>          
          <View style={styles.list}>
            <TouchableNativeFeedback onPress={this.goHome.bind(this)} >
              <View style={styles.li}>
                <Image source={require('../../../images/gua.png')} style={styles.liImg}/>
                <Text style={styles.liText}>六十四卦</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback >
              <View style={styles.li}>
                <Image source={require('../../../images/bu.png')} style={styles.liImg}/>
                <Text style={styles.liText}>占卜问路</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback >
              <View style={styles.li}>
                <Image source={require('../../../images/user.png')} style={styles.liImg}/>
                <Text style={styles.liText}>个人中心</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback >
              <View style={styles.li}>
                <Image source={require('../../../images/settings.png')} style={styles.liImg}/>
                <Text style={styles.liText}>设置</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
    )
  }
 }

export default DrawerView
