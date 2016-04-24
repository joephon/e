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

export default class Password extends Component {
  constructor(props) {
    super(props)
    this.state = {
      oldPassword: '',
      newPassword: '',
    }
  }

  handleOldPassword(value) {
    this.setState({oldPassword: value})
  }

  handleNewPassword(value) {
    this.setState({newPassword: value})
  }

  handleSubmit() {
    let oldPassword = this.state.oldPassword
    let newPassword = this.state.newPassword
    let shortPassword = settings.valid.CN.shortPassword
    let longPassword = settings.valid.CN.longPassword
    if (oldPassword.length < 6) {
      ToastAndroid.show(shortPassword, ToastAndroid.SHORT)
      this.setState({oldPassword: ''})
      return
    }
    if (oldPassword.length > 20) {
      ToastAndroid.show(longPassword, ToastAndroid.SHORT)
      this.setState({oldPassword: ''})
      return
    }
    if (newPassword.length < 6) {
      ToastAndroid.show(shortPassword, ToastAndroid.SHORT)
      this.setState({newPassword: ''})
      return
    }
    if (newPassword.length > 20) {
      ToastAndroid.show(longPassword, ToastAndroid.SHORT)
      this.setState({newPassword: ''})
      return
    }
    this.send(oldPassword, newPassword)
  }

  send(oldPassword, newPassword) {
    let updateCurrentUser = this.props.updateCurrentUser
    let signOut = this.props.signOut
    let request = this.props.request
    let currentUser = JSON.parse(this.props.currentUser)
    let token = currentUser.sessionToken
    let userId = currentUser.objectId
    let url = `${settings.url.signUp}/${userId}/updatePassword`
    let body = {old_password: oldPassword, new_password: newPassword}
    fetch(url, request('put', body, token))
    .then(res => res.json())
    .then(json => {
      if (!json.code) {
        Alert.alert(
          settings.tips.CN.success,
          `${settings.tips.CN.modifyPassword} => ${settings.tips.CN.success}`,
          [
            {
              text: settings.tips.CN.ok,
              onPress: () => signOut()
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
    let oldPassword = this.state.oldPassword
    let newPassword = this.state.newPassword
    let submit = settings.tips.CN.submit
    return(
        <View style={styles.container}>
          <ToolbarAndroid
            style={styles.toolbar} 
            title={settings.tips.CN.modifyPassword}
            titleColor='#fff'
            navIcon={settings.icons.back}
            onIconClicked={back}
            />
          <View style={styles.wrap}>
            <View style={styles.inputBox}>
              <TextInput
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholderTextColor='#ccc'
                value={oldPassword}
                secureTextEntry={true}
                autoFocus={true} 
                onChangeText={this.handleOldPassword.bind(this)} 
                placeholder={`旧${settings.placeholders.CN.sign.password}`}/>
            </View>
            <View style={styles.inputBox}>
              <TextInput
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholderTextColor='#ccc'
                value={newPassword}
                onChangeText={this.handleNewPassword.bind(this)} 
                placeholder={`新${settings.placeholders.CN.sign.password}`}/>
            </View>
            <Text style={styles.warning}>{`＊ ${settings.tips.CN.passwordWarning}`}</Text>
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