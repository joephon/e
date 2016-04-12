'use strict'

import React,{
  Component,
  View,
  Text,
  TouchableOpacity,
 } from 'react-native'


 class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  _pressButton() {
    const { navigator } = this.props
    navigator.push({name:'drawerView'})
  }

  render() {
    return (
      <View style={{flex:1, marginTop: 0}}>
        <Text>Hello I am Home！！！！!</Text>
          <TouchableOpacity onPress={this._pressButton.bind(this)}>
              <Text>点我跳转</Text>
          </TouchableOpacity>
      </View>
    )
  }
 }

export default Home
