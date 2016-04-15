'use strict'

import React,{
  Component,
  View,
  Text,
  Image,
  StatusBar,
  TouchableNativeFeedback,
 } from 'react-native'

import settings from '../../settings.js'
import init from './init.js'
import ListItem from './ListItem'
import styles from './styles.js'

export default class DrawerView extends Component {

  render() {
    return (
      <View style={styles.container}>       
        <Image source={settings.icons.avatarBG} style={styles.avatarBox}>
          <Image source={settings.icons.e} style={styles.avatar}/>
          <Text style={styles.name}>议易</Text>
        </Image>
        <View>          
          <View style={styles.list}>
            {
              init.listItems.map((item, index) => {
                return(
                    <ListItem key={index} nav={this.props.nav.bind(this,item.path)} name={item.name} icon={item.icon}/>
                  )
              })
            }
          </View>
        </View>
      </View>
    )
  }
 }

