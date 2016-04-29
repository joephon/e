import React, {
  Component,
  View,
  Text,
  TextInput,
  ToastAndroid,
  Alert,
  ToolbarAndroid,
  TouchableNativeFeedback,
  Image,
  CameraRoll,
} from 'react-native'

import styles from './styles.js'
import settings from '../../../settings.js'


export default class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      avatarSource: '',
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

  showUpload() {
    let ImagePickerManager = this.props.ImagePickerManager
    let cameraInit = settings.cameraInit
    ImagePickerManager.showImagePicker(cameraInit, (response) => {
      const source = {uri: response.path, isStatic: true}
      this.setState({avatarSource: source}, () => this.upload(response))
    })
  }

  upload(response) {
    let token = JSON.parse(this.props.currentUser).sessionToken
    let url = `${settings.url.files}/${response.fileName}`
    let upload = this.props.upload
    let qiniu = this.props.qiniu
    let putPolicy = new qiniu.auth.PutPolicy2({
      scope: `yiefile:${response.fileName}`
    })
    let qiniuToken = putPolicy.token()
    qiniu.rpc.uploadImage(response.uri, response.fileName, qiniuToken, (res) => {
      if (res.ok)
        this.updateUser(JSON.parse(res._bodyInit))
      else
         Alert.alert('failed',JSON.stringify(res))
    })
  }

  updateUser(json) {
    let updateCurrentUser = this.props.updateCurrentUser
    let currentUser = JSON.parse(this.props.currentUser)
    let token = currentUser.sessionToken
    let userId = currentUser.objectId
    let url = `${settings.url.signUp}/${userId}`
    let body = {avatarUrl: settings.url.qiniu + json.key, avatarId: json.hash}
    let request = this.props.request
    fetch(url, request('put', body, token))
    .then(res => res.json())
    .then(json => {
      if (!json.code) {
        updateCurrentUser()
        Alert.alert('ok', '上传成功')
      }
      else
        Alert.alert('failed',json.error)
    })
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
    let avatarSource = this.state.avatarSource
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
              <TouchableNativeFeedback onPress={this.showUpload.bind(this)}>
                <View style={styles.uploadAvatar}>
                  <Text style={styles.key}>{uploadAvatar}</Text>
                  <Image style={styles.avatar} source={{uri:currentUser.avatarUrl} || e}/>
                </View>
              </TouchableNativeFeedback>
            </View>
        </View>
      )
  }
}