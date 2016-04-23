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
  AsyncStorage,
  Alert,
  ToastAndroid,
 } from 'react-native'

import styles from './styles.js'
import settings from '../../settings.js'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      feedback: '',
      userToken: '',
    }
  }

  handleFeedbackChange(value) {
    this.setState({feedback: value})  
  }

  handleSubmit() {
    let feedback = this.state.feedback
    if (!feedback) {
      ToastAndroid.show(settings.valid.CN.invalidFeedback, ToastAndroid.SHORT)
      return
    }
    this.send(feedback)
  }

  send(feedback) {
    let url = settings.url.feedback
    let currentUser = this.props.currentUser
    let body = {
      content: JSON.stringify({
        content: feedback,
        title: settings.tags.CN.feedback,
        currentUser: currentUser,
      })
    }
    let request = this.props.request('post', body)
    fetch(url, request)
    .then(res => res.json())
    .then((json) => {
      if (!json.code) {
        Alert.alert(settings.tips.CN.success, settings.tips.CN.thanks)
        this.setState({feedback: ''})
      }
      else
        Alert.alert(settings.tips.CN.failed, json.error)
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

