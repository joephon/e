import React, {
  Component,
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native'

import settings from '../../../settings.js'
import styles from './styles.js'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
    }
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

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={settings.icons.e} style={styles.img}/>
        <View style={styles.input}>
          <TextInput
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholderTextColor='#ccc'
            onChangeText={this.handleEmail.bind(this)} 
            placeholder={settings.placeholders.CN.sign.email}/>
        </View>
        <View style={styles.input}>
          <TextInput
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholderTextColor='#ccc'
            secureTextEntry={true} 
            onChangeText={this.handlePassword.bind(this)}
            placeholder={settings.placeholders.CN.sign.password}/>
        </View>
        <View style={styles.input}>
          <TextInput
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholderTextColor='#ccc'
            secureTextEntry={true} 
            onChangeText={this.handleConfirmPassword.bind(this)}
            placeholder={settings.placeholders.CN.sign.confirmPassword}/>
        </View>
        <View style={styles.lable}>
          <TouchableOpacity onPress={this.goSignIn.bind(this)}>
            <Text style={styles.lableText}>{settings.tips.CN.toSignIn}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <View style={styles.submit}>
            <Text style={styles.submitText}>{settings.tips.CN.signUp}</Text>
          </View>
        </TouchableOpacity>

      </ScrollView>
    )
  }
}