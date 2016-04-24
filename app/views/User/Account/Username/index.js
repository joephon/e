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

export default class Username extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
    }
  }

  handleUsername(value) {
    this.setState({username: value})
  }

  handleSubmit() {
    let username = this.state.username
    let invalidUsername = settings.valid.CN.invalidUsername
    if (username.length < 2 || username.length > 8) {
      ToastAndroid.show(invalidUsername, ToastAndroid.SHORT)
      return
    }
    this.send(username)
  }

  send(username) {
    let updateCurrentUser = this.props.updateCurrentUser
    let back = this.props.back
    let request = this.props.request
    let currentUser = JSON.parse(this.props.currentUser)
    let token = currentUser.sessionToken
    let userId = currentUser.objectId
    let url = `${settings.url.signUp}/${userId}`
    let body = {username: username}
    fetch(url, request('put', body, token))
    .then(res => res.json())
    .then(json => {
      if (!json.code) {
        updateCurrentUser()
        Alert.alert(
          settings.tips.CN.success,
          `${currentUser.username} => ${username}`,
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
    let username = this.state.username
    let submit = settings.tips.CN.submit
    return(
        <View style={styles.container}>
          <ToolbarAndroid
            style={styles.toolbar} 
            title={settings.tips.CN.modifyUsername}
            titleColor='#fff'
            navIcon={settings.icons.back}
            onIconClicked={back}
            />
          <View style={styles.wrap}>
            <View style={styles.inputBox}>
              <TextInput
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholderTextColor='#ccc'
                value={username}
                autoFocus={true} 
                onChangeText={this.handleUsername.bind(this)} 
                placeholder={settings.placeholders.CN.sign.username}/>
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