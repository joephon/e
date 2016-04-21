'use strict'

import React,{
  Component,
  ToolbarAndroid,
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  Alert,
 } from 'react-native'

import styles from './styles.js'
import settings from '../../settings.js'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      feedback: '',
    }
  }

  // handleRotate() {
  //   let deg = this.state.deg
  //   for (let i = 1; i < 19; i ++) {
  //     setTimeout(() => {
  //       this.setState({deg: deg + i * 20})
  //     },i * 40)
  //   }
  // }

  handleFeedbackChange(value) {
    this.setState({feedback: value})  
  }

  handleSubmit() {
    let url = settings.url.feedback
    let feedback = {feedback: this.state.feedback}
    let request = this.props.request('post', feedback)
    fetch(url, request)
    .then((res) => {
      if (res.ok)
        Alert.alert(settings.tips.CN.success)
      else
        Alert.alert(JSON.stringify(res))
    })
  }

  render() {
    let feedback = this.state.feedback
    return (
      <View style={styles.container}>
        <ToolbarAndroid
          style={styles.toolbar}
          title={settings.tips.CN.home}
          titleColor='#fff'
          navIcon={settings.icons.categories}
          onIconClicked={this.props.showDrawer}/>
        <ScrollView 
          style={styles.scroll}>
          <View style={styles.header}>
            <TouchableOpacity  onPress={this.props.nav.bind(this, settings.routes.gua)}>
              <View style={styles.headerItem}>
                <Image source={settings.icons.gua} style={styles.iconGua} />
                <Text style={styles.headerItemText} >{settings.tags.CN.gua}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={this.props.nav.bind(this, settings.routes.bu)}>
              <View style={styles.headerItem}>
                <Image source={settings.icons.bu} style={styles.iconBu} />
                <Text style={styles.headerItemText} >{settings.tags.CN.bu}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.tip}>
            <Text style={styles.tipText}>{settings.tags.CN.about}</Text>
          </View>
          <View style={styles.about}>
            <Text style={styles.aboutText}>{settings.tips.CN.about}</Text>
          </View>

          <View style={styles.tip}>
            <Text style={styles.tipText}>{settings.tags.CN.feedback}</Text>
          </View>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.textArea}
              multiline={true}
              numberOfLines={6}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholderTextColor='#ccc'
              placeholder={settings.placeholders.CN.home.feedback}
              value={feedback}
              onChangeText={this.handleFeedbackChange.bind(this)}/>
          </View>
          <TouchableOpacity style={styles.submit} onPress={this.handleSubmit.bind(this)}>
            <Text style={styles.submitText}>{settings.tips.CN.submit}</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
 }

