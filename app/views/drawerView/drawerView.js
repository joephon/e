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
 const AvatarBG = require('../../../images/avatarBG.png')
 const E = require('../../../images/e@3x.png')
 const Gua = require('../../../images/gua.png')
 const Bu = require('../../../images/bu.png')
 const User = require('../../../images/user.png')
 const Settings = require('../../../images/settings.png')

 class DrawerView extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }


  goHome() {
    this.props.nav('gua')
  }

  render() {
    return (
      <View style={styles.container}>       
        <Image source={AvatarBG} style={styles.avatarBox}>
          <Image source={E} style={styles.avatar}/>
          <Text style={styles.name}>议易</Text>
        </Image>
        <View>          
          <View style={styles.list}>
            <TouchableNativeFeedback onPress={this.goHome.bind(this)} >
              <View style={styles.li}>
                <Image source={Gua} style={styles.liImg}/>
                <Text style={styles.liText}>六十四卦</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback >
              <View style={styles.li}>
                <Image source={Bu} style={styles.liImg}/>
                <Text style={styles.liText}>占卜问路</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback >
              <View style={styles.li}>
                <Image source={User} style={styles.liImg}/>
                <Text style={styles.liText}>个人中心</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback >
              <View style={styles.li}>
                <Image source={Settings} style={styles.liImg}/>
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
