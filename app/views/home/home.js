'use strict'

import React,{
  Component,
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
 } from 'react-native'


 class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deg: 0,
    }
  }


  _pressButton() {
    const { navigator } = this.props
    navigator.push({name:'drawerView'})
  }

  handleRotate() {
    let deg = this.state.deg
    for (let i = 1; i < 19; i ++) {
      setTimeout(() => {
        this.setState({deg: deg + i * 20})
      },i * 40)
    }
  }

  render() {
    let deg = this.state.deg
    return (
      <View style={{flex:1, marginTop:0}}>
        <TouchableNativeFeedback onPress={this.handleRotate.bind(this)} background={TouchableNativeFeedback.Ripple('#fff',false)}>
          <View style={{height: 50,backgroundColor:'#ccc'}}>
            <Text>点我旋转</Text>
          </View>
        </TouchableNativeFeedback>
        <Text style={{height:50 ,transform:[{rotateY: `${deg}deg`}]}}>Hello I am rotateY</Text>
        <Text style={{height:50 ,transform:[{rotateX: `${deg}deg`}]}}>Hello I am rotateX</Text>
        <Text style={{height:50 ,transform:[{rotate: `${deg}deg`}]}}>Hello I am rotate</Text>
        <TouchableOpacity onPress={this._pressButton.bind(this)}>
          <Text>点我跳转</Text>
        </TouchableOpacity>
      </View>
    )
  }
 }

export default Home
