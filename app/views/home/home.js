'use strict'

import React,{
  Component,
  ToolbarAndroid,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
 } from 'react-native'

let styles = require('./styles.js').styles
let categories = require('../../../images/categories.png')
let gua = require('../../../images/gua.png')
let bu = require('../../../images/bu.png')
let placeholder = 'Hi 我是Joephon，这款应用的开发及维护者，如果你有什么关于功能或者体验的建议，不妨在此留言，我会跟进反馈的 ：）' 

 class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deg: 0,
      feedback: '',
    }
  }


  goGua() {
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

  handleFeedbackChange(value) {
    this.setState({feedback: value})  
  }

  handleSubmit() {

  }

  render() {
    let deg = this.state.deg
    let feedback = this.state.feedback
    return (
      <View style={styles.container}>
        <ToolbarAndroid
          style={styles.toolbar}
          title='议易'
          titleColor='#fff'
          navIcon={categories}
          onIconClicked={this.props.showDrawer}/>
        <View style={styles.header}>
          <TouchableOpacity  onPress={this.goGua.bind(this)}>
            <View style={styles.headerItem}>
              <Image source={gua} style={styles.headerItemImg} />
              <Text style={styles.headerItemText} >品易</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.headerItem}>
            <Image source={bu} style={styles.headerItemImg} />
            <Text style={styles.headerItemText} >占卜</Text>
          </View>
        </View>
        <View style={styles.tip}>
          <Text style={styles.tipText}>给我反馈</Text>
        </View>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.textArea}
            multiline={true}
            numberOfLines={6}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholderTextColor='#ccc'
            placeholder={placeholder}
            value={feedback}
            onChangeText={this.handleFeedbackChange.bind(this)}/>
        </View>
        <TouchableOpacity style={styles.submit} onPress={this.handleSubmit.bind(this)}>
          <Text style={styles.submitText}>提交</Text>
        </TouchableOpacity>
      </View>
    )
  }
 }

export default Home
