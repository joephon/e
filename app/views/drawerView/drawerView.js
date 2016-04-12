'use strict'

import React,{
  Component,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
 } from 'react-native'

 class DrawerView extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  _pressButton() {
    console.log(navigator)
    const { navigator } = this.props
    navigator.pop()
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
        <TouchableOpacity onPress={this._pressButton.bind(this)}>
          <Text>点我跳转</Text>
        </TouchableOpacity>
      </View>
    )
  }
 }

export default DrawerView
