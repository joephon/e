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

export default class Phone extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phone: '',
    }
  }

  handlePhone(value) {
    this.setState({phone: value})
  }

  matchPhone(phone) {
    let result = false
    let format = [139, 138, 137, 136, 135, 134, 147, 150, 151, 152, 157, 158, 159, 178, 182, 183, 184, 187, 188, 130, 131, 132, 155, 156, 185, 186, 145, 176, 133, 153, 177, 180, 181, 189, 170];
    format.map((item) => {
      if (Number(phone) === item) {
        result = true
        return
      }
    });
    return result
  };

  handleSubmit() {
    let phone = this.state.phone
    let invalidPhone = settings.valid.CN.invalidPhone
    if (phone.replace(/ /g, '').length != 11) {
      ToastAndroid.show(invalidPhone, ToastAndroid.SHORT)
      return
    }
    if (!this.matchPhone(phone.slice(0,3))) {
      ToastAndroid.show(invalidPhone, ToastAndroid.SHORT)
      return
    }
    this.send(phone)
  }

  send(phone) {
    let updateCurrentUser = this.props.updateCurrentUser
    let back = this.props.back
    let request = this.props.request
    let currentUser = JSON.parse(this.props.currentUser)
    let token = currentUser.sessionToken
    let userId = currentUser.objectId
    let url = `${settings.url.signUp}/${userId}`
    let body = {phone: phone}
    fetch(url, request('put', body, token))
    .then(res => res.json())
    .then(json => {
      if (!json.code) {
        updateCurrentUser()
        Alert.alert(
          settings.tips.CN.success,
          `${currentUser.phone} => ${phone}`,
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
    let phone = this.state.phone
    let submit = settings.tips.CN.submit
    return(
        <View style={styles.container}>
          <ToolbarAndroid
            style={styles.toolbar} 
            title={settings.tips.CN.modifyPhone}
            titleColor='#fff'
            navIcon={settings.icons.back}
            onIconClicked={back}
            />
          <View style={styles.wrap}>
            <View style={styles.inputBox}>
              <TextInput
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholderTextColor='#ccc'
                value={phone}
                autoFocus={true} 
                onChangeText={this.handlePhone.bind(this)} 
                placeholder={settings.placeholders.CN.sign.phone}/>
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