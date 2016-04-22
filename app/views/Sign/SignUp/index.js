import React, {
  Component,
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  ToastAndroid,
  Alert,
  TouchableOpacity,
} from 'react-native'

import settings from '../../../settings.js'
import styles from './styles.js'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  }

  handleUsername(value) {
    this.setState({username: value})
  }

  handleEmail(value) {
    this.setState({email: value})
  }

  handlePassword(value) {
    this.setState({password: value})
  }

  handleConfirmPassword(value) {
    this.setState({confirmPassword: value})
  }

  goSignIn() {
    this.props.nav(settings.routes.signIn)
  }

  handleSubmit() {
    let valid = this.props.valid
    let username = this.state.username
    let email = this.state.email
    let password = this.state.password
    let confirmPassword = this.state.confirmPassword
    if (username.length < 2 || username.length > 8) {
      this.setState({username: ''})
      ToastAndroid.show(settings.valid.CN.invalidUsername, ToastAndroid.SHORT)
      return
    }
    if (!valid.isEmail(email)) {
      this.setState({email: ''})
      ToastAndroid.show(settings.valid.CN.invalidEmail, ToastAndroid.SHORT)
      return
    }
    if (password.length < 6) {
      this.setState({password: ''})
      ToastAndroid.show(settings.valid.CN.shortPassword, ToastAndroid.SHORT)
      return
    }
    if (password.length > 20) {
      this.setState({password: ''})
      ToastAndroid.show(settings.valid.CN.longPassword, ToastAndroid.SHORT)
      return
    }
    if (password != confirmPassword) {
      this.setState({password: '', confirmPassword: ''})
      ToastAndroid.show(settings.valid.CN.diffPassword, ToastAndroid.SHORT)
      return
    }
    this.signUp(username, email, password)
  }

  signUp(username, email, password) {
     let request = this.props.request
     let body = {email: email, password: password, username: username}
     let url = settings.url.signUp
     fetch(url, request('post',body))
     .then((res) => {
      if (res.ok) {
        Alert.alert(
          settings.tips.CN.success, 
          settings.tips.CN.welcome,
          [
            {
              text: settings.tips.CN.toSignIn,
              onPress: () => this.props.nav(settings.routes.signIn)
            }
          ]
        )
      }
      else
        Alert.alert(settings.tips.CN.failed, JSON.parse(res._bodyInit).error)
     })
  }

  render() {
    let username = this.state.username
    let email = this.state.email
    let password = this.state.password
    let confirmPassword = this.state.confirmPassword
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={settings.icons.e} style={styles.img}/>
        <View style={styles.input}>
          <TextInput
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholderTextColor='#ccc'
            value={username}
            onChangeText={this.handleUsername.bind(this)} 
            placeholder={settings.placeholders.CN.sign.username}/>
        </View>
        <View style={styles.input}>
          <TextInput
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholderTextColor='#ccc'
            value={email}
            onChangeText={this.handleEmail.bind(this)} 
            placeholder={settings.placeholders.CN.sign.email}/>
        </View>
        <View style={styles.input}>
          <TextInput
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholderTextColor='#ccc'
            value={password}
            secureTextEntry={true} 
            onChangeText={this.handlePassword.bind(this)}
            placeholder={settings.placeholders.CN.sign.password}/>
        </View>
        <View style={styles.input}>
          <TextInput
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholderTextColor='#ccc'
            value={confirmPassword}
            secureTextEntry={true} 
            onChangeText={this.handleConfirmPassword.bind(this)}
            placeholder={settings.placeholders.CN.sign.confirmPassword}/>
        </View>
        <View style={styles.lable}>
          <TouchableOpacity onPress={this.goSignIn.bind(this)}>
            <Text style={styles.lableText}>{settings.tips.CN.toSignIn}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={this.handleSubmit.bind(this)}>
          <View style={styles.submit}>
            <Text style={styles.submitText}>{settings.tips.CN.signUp}</Text>
          </View>
        </TouchableOpacity>

      </ScrollView>
    )
  }
}