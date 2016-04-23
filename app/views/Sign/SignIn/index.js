import React, {
  Component,
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  Alert,
  ToastAndroid,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native'

import settings from '../../../settings.js'
import styles from './styles.js'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }

  handleUsername(value) {
    this.setState({username: value})
  }

  handlePassword(value) {
    this.setState({password: value})
  }

  goSignUp() {
    this.props.nav(settings.routes.signUp)
  }

  goForgot() {
    this.props.nav(settings.routes.forgot)
  }

  handleSubmit() {
    let username = this.state.username
    let password = this.state.password
    if (!username || !password) {
      ToastAndroid.show(settings.valid.CN.shouldFill, ToastAndroid.SHORT)
      return
    }
    this.signIn(username, password)
  }

  signIn(username, password) {
    let request = this.props.request
    let setCurrentUser = this.props.setCurrentUser
    let url = settings.url.signIn
    let body = {username: username, password: password}
    fetch(url, request('post',body))
    .then(res => res.json())
    .then(json => {
      if (!json.code) {
        AsyncStorage.setItem('currentUser',JSON.stringify(json))
        .then(() => AsyncStorage.getItem('currentUser'))
        .then(result => {
          setCurrentUser(JSON.stringify(result))
          this.props.hideSign()
        })
      }
      else
        Alert.alert('j', json.error)
    })
  }

  render() {
    let username = this.state.username
    let password = this.state.password
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
            value={password}
            secureTextEntry={true} 
            onChangeText={this.handlePassword.bind(this)} 
            placeholder={settings.placeholders.CN.sign.password}/>
        </View>
        <View style={styles.lable}>
          <TouchableOpacity onPress={this.goForgot.bind(this)}>
            <Text style={styles.lableText}>{settings.tips.CN.forgot}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.goSignUp.bind(this)}>
            <Text style={styles.lableText}>{settings.tips.CN.toSignUp}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={this.handleSubmit.bind(this)}>
          <View style={styles.submit}>
            <Text style={styles.submitText}>{settings.tips.CN.signIn}</Text>
          </View>
        </TouchableOpacity>

      </ScrollView>
    )
  }
}