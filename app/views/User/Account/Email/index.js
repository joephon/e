import React, {
  Component,
  View,
  Text,
  TextInput,
  ToastAndroid,
  Alert,
  ToolbarAndroid,
  TouchableNativeFeedback,
} from 'react-native'

import styles from './styles.js'
import settings from '../../../../settings.js'
import valid from 'validator'

export default class Email extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
    }
  }

  handleEmail(value) {
    this.setState({email: value})
  }

  handleSubmit() {
    let email = this.state.email
    let invalidEmail = settings.valid.CN.invalidEmail
    if (!valid.isEmail(email)) {
      ToastAndroid.show(invalidEmail, ToastAndroid.SHORT)
      this.setState({email: ''})
      return
    }
    this.send(email)
  }

  send(email) {
    let updateCurrentUser = this.props.updateCurrentUser
    let back = this.props.back
    let request = this.props.request
    let currentUser = JSON.parse(this.props.currentUser)
    let token = currentUser.sessionToken
    let userId = currentUser.objectId
    let url = `${settings.url.signUp}/${userId}`
    let body = {email: email}
    fetch(url, request('put', body, token))
    .then(res => res.json())
    .then(json => {
      if (!json.code) {
        updateCurrentUser()
        Alert.alert(
          settings.tips.CN.success,
          `${currentUser.email} => ${email}`,
          [
            {
              text: settings.tips.CN.ok,
              onPress: () => back()
            },
          ]
        )
      }
      else
        Alert.alert(settings.tips.CN.failed ,json.error)
    })
  }

  render() {
    let back = this.props.back
    let email = this.state.email
    let submit = settings.tips.CN.submit
    return(
        <View style={styles.container}>
          <ToolbarAndroid
            style={styles.toolbar} 
            title={settings.tips.CN.modifyEmail}
            titleColor='#fff'
            navIcon={settings.icons.back}
            onIconClicked={back}
            />
          <View style={styles.wrap}>
            <View style={styles.inputBox}>
              <TextInput
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholderTextColor='#ccc'
                value={email}
                autoFocus={true} 
                onChangeText={this.handleEmail.bind(this)} 
                placeholder={settings.placeholders.CN.sign.email}/>
            </View>
            <View style={styles.submitBox}>
              <TouchableNativeFeedback onPress={this.handleSubmit.bind(this)}>
                <View style={styles.submit}>
                  <Text style={styles.submitText}>{submit}</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        </View>
      )
  }
}