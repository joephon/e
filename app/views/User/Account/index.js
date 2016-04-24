import React, {
  Component,
  View,
  Text,
  TextInput,
  ToastAndroid,
  Alert,
  ToolbarAndroid,
  TouchableNativeFeedback,
  Modal,
  Image,
} from 'react-native'

import styles from './styles.js'
import settings from '../../../settings.js'

export default class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  goUsername() {
    let modifyUsername = settings.routes.modifyUsername
    let nav = this.props.nav 
    nav(modifyUsername)
  }

  goPassword() {
    let modifyPassword = settings.routes.modifyPassword
    let nav = this.props.nav 
    nav(modifyPassword)
  }

  goEmail() {
    let modifyEmail = settings.routes.modifyEmail
    let nav = this.props.nav 
    nav(modifyEmail)
  }

  goPhone() {
    let modifyPhone = settings.routes.modifyPhone
    let nav = this.props.nav 
    nav(modifyPhone)
  }

  render() {
    let e = settings.icons.e
    let back = this.props.back
    let username = settings.tags.CN.username
    let password = settings.tags.CN.password
    let email = settings.tags.CN.email
    let phone = settings.tags.CN.phone
    let uploadAvatar = settings.tags.CN.uploadAvatar
    let unBind = settings.tags.CN.unBind
    let currentUser = JSON.parse(this.props.currentUser)
    return(
        <View>
          <ToolbarAndroid
            style={styles.toolbar} 
            title={settings.tips.CN.account}
            titleColor='#fff'
            navIcon={settings.icons.back}
            onIconClicked={back}
            />
            <View style={styles.wrap}>
              <TouchableNativeFeedback onPress={this.goUsername.bind(this)}>
                <View style={styles.username}>
                  <Text style={styles.key}>{username}</Text>
                  <Text style={styles.value}>{currentUser.username}</Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback onPress={this.goPhone.bind(this)}>
                <View style={styles.options}>
                  <Text style={styles.key}>{phone}</Text>
                  <Text style={styles.value}>{currentUser.phone || unBind}</Text>
                </View>
              </TouchableNativeFeedback>
              <View style={styles.dress} />
              <TouchableNativeFeedback onPress={this.goEmail.bind(this)}>
                <View style={styles.options}>
                  <Text style={styles.key}>{email}</Text>
                  <Text style={styles.value}>{currentUser.email || unBind}</Text>
                </View>
              </TouchableNativeFeedback>
              <View style={styles.dress} />
              <TouchableNativeFeedback onPress={this.goPassword.bind(this)}>
                <View style={styles.options}>
                  <Text style={styles.key}>{password}</Text>
                  <Text style={styles.value}>**********</Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback>
                <View style={styles.uploadAvatar}>
                  <Text style={styles.key}>{uploadAvatar}</Text>
                  <Image style={styles.avatar} source={currentUser.avatar || e}/>
                </View>
              </TouchableNativeFeedback>
            </View>
        </View>
      )
  }
}