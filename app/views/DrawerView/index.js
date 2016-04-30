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
import request from '../../request.js'

export default class DrawerView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  componentDidMount() {
    // this.getUser()
  }


  render() {
    let currentUser = JSON.parse(this.props.currentUser)
    return (
      <View style={styles.container}>       
        <Image source={settings.icons.avatarBG} style={styles.avatarBox}>
          <Image source={{uri: currentUser.avatarUrl} || settings.icons.e} style={styles.avatar}/>
          <Text style={styles.name}>{currentUser.username || settings.tips.CN.home}</Text>
        </Image>
        <View>          
          <View style={styles.list}>
            {
              init.listItems.map((item, index) => {
                return(
                    <ListItem key={index} reset={this.props.reset.bind(this,item.path)} name={item.name} icon={item.icon}/>
                  )
              })
            }
          </View>
        </View>
      </View>
    )
  }
 }

