
import React, {
  Component,
  Navigator,
  StatusBar,
  DrawerLayoutAndroid,
  ProgressBarAndroid,
  BackAndroid,
  Text,
  View,
  Alert,
  Platform,
  AsyncStorage,
  Linking,
  ToastAndroid,
} from 'react-native'

import { ImagePickerManager } from 'NativeModules'
import qiniu from 'react-native-qiniu'

import Scene from './views/Scene'
import Sign from './views/Sign'
import Home from './views/Home'
import DrawerView from './views/DrawerView'
import Gua from './views/Gua'
import Mark from './views/User/Mark'
import GuaDetails from './views/Gua/ItemDetails'
import Bu from './views/Bu'
import User from './views/User'
import Account from './views/User/Account'
import Username from './views/User/Account/Username'
import Password from './views/User/Account/Password'
import Phone from './views/User/Account/Phone'
import Email from './views/User/Account/Email'
import request from './request.js'
import upload from './upload.js'
import myApp from '../myKeys.js'
import settings from './settings.js'
import source from './sources.js'

qiniu.conf.ACCESS_KEY = myApp.AK 
qiniu.conf.SECRET_KEY = myApp.SK

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      carryData: [],
      markSource: null,
      source: source,
      setCarryData: this.setCarryData.bind(this),
      setMarkSource: this.setMarkSource.bind(this),
      isLogin: false,
      showScene: true,
      oldVersion: false,
      request: request,
      upload: upload,
      ImagePickerManager: ImagePickerManager,
      qiniu: qiniu,
      currentUser: '',
      signOut: this.signOut.bind(this),
      setCurrentUser: this.setCurrentUser.bind(this),
      updateCurrentUser: this.updateCurrentUser.bind(this),
      myApp: myApp,
      nav: this.getNavigator.bind(this),
      reset: this.getResetNavigator.bind(this),
      showDrawer: this.showDrawer.bind(this),
      back: this.back.bind(this),
    }
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.backPress.bind(this))
  }

  componentWillUnmout() {
    BackAndroid.removeEventListener('hardwareBackPress', this.backPress.bind(this))
  }

  componentDidMount() {
    this.hideScene()
    this.isCurrentUser()
    this.checkVersion()
  }

  checkVersion() {
    let firToken = myApp.FIR
    let version = myApp.V
    let checkUrl = `${settings.url.firUpdate}${firToken}`
    fetch(checkUrl, {method: 'GET'})
    .then(res => res.json())
    .then(json => {
      if (!json.code) {
        let currentVersion = json.versionShort
        let updateUrl = json.install_url
        if (currentVersion > version) {
          Alert.alert(
            '有新版本哦，安装否',
            json.changelog,
            [
              {
                text: '我不！',
                onPress: () => ToastAndroid.show('算你狠',ToastAndroid.SHORT)
              },
              {
                text: '好！',
                onPress: () => Linking.openURL(updateUrl)
              },
            ]
          )
        }
      }
    })
  }

  hideScene() {
    this.checkPlatform()
    setTimeout(() => {
      this.setState({showScene: false})
    },3000)
  }

  isCurrentUser() {
    AsyncStorage.getItem('currentUser')
    .then(result => {
      if (result)
        this.setState({currentUser: result, isLogin: true})
    })
  }

  updateCurrentUser() {
    let currentUser = JSON.parse(this.state.currentUser)
    let userId = currentUser.objectId
    let url = `${settings.url.signUp}/${userId}`
    let request = this.state.request
    let token = currentUser.sessionToken
    fetch(url, request('get'))
    .then(res => res.json())
    .then(json => {
      if (!json.code) {
        json.sessionToken = token
        AsyncStorage.setItem('currentUser', JSON.stringify(json))
        .then(() => AsyncStorage.getItem('currentUser'))
        .then(result => this.setCurrentUser(result))
      }
      else
        Alert.alert(settings.tips.CN.failed, settings.tips.CN.networkError)
    })
  }

  signOut() {
    AsyncStorage.removeItem('currentUser')
    .then(() => this.setState({isLogin: false}))
  }

  hideSign() {
    this.setState({isLogin: true})
  }


  checkPlatform() {
    if (Platform.Version < 21)
      this.setState({oldVersion: true})
  }

  setCurrentUser(currentUser) {
    this.setState({currentUser: currentUser})
  }

  setCarryData(carryData) {
    this.setState({carryData: carryData})
  }

  setMarkSource(markSource, fn) {
    this.setState({markSource: markSource}, ()=> fn)
  }

  backPress() {
    const nav = this.refs.navigator
    if (!nav)
      return false
    const routers = nav.getCurrentRoutes()
    if (routers.length > 1) {
      nav.pop();
      return true
    }
    return false
  }

  renderScene(route, navigator) {
    switch(route.name) {
      case 'home':
      return <Home navigator={navigator} {...this.state}/>
      // case 'drawerView': 
      // return <DrawerView  navigator={navigator} {...this.state}/>
      case 'gua': 
      return <Gua navigator={navigator} {...this.state}/>
      case 'mark':
      return <Mark navigator={navigator} {...this.state}/>
      case 'guaDetails':
      return <GuaDetails  navigator={navigator}  {...this.state}/>
      case 'bu':
      return <Bu navigator={navigator} {...this.state}/>
      case 'user':
      return <User navigator={navigator} {...this.state}/>
      case 'account':
      return <Account navigator={navigator} {...this.state}/>
      case 'modifyUsername':
      return <Username navigator={navigator} {...this.state}/>
      case 'modifyPassword':
      return <Password navigator={navigator} {...this.state}/>
      case 'modifyEmail':
      return <Email navigator={navigator} {...this.state}/>
      case 'modifyPhone':
      return <Phone navigator={navigator} {...this.state}/>
      default :
      return <Home  navigator={navigator} {...this.state}/>
    }
  }

  renderDrawerView() {
    return <DrawerView {...this.state} />
  }

  getNavigator(name) {
    const nav = this.refs.navigator
    const routes = nav.getCurrentRoutes()
    const drawer = this.refs.drawer
    drawer.closeDrawer()
    nav.push({name: name})
  }

  getResetNavigator(name) {
    const nav = this.refs.navigator
    const drawer = this.refs.drawer
    drawer.closeDrawer()
    nav.resetTo({name: name}) 
  }

  back() {
    const nav = this.refs.navigator
    const routers = nav.getCurrentRoutes()
    if (routers.length > 0)
      nav.pop()
    else 
      nav.push({name:'home'})
  }

  showDrawer() { 
    this.refs.drawer.openDrawer()
  }

  render() {
    let carryData = this.state.carryData
    let showScene = this.state.showScene
    let oldVersion = this.state.oldVersion
    let isLogin = this.state.isLogin
    let setCurrentUser = this.state.setCurrentUser
    let currentUser = this.state.currentUser
    if (showScene)
      return( 
          <View style={{flex: 1}}>
            <StatusBar hidden={oldVersion ? false : true}/>
            <Scene />
          </View>
        )
    if (!isLogin)
      return(
          <View style={{flex: 1}}>
            <StatusBar hidden={oldVersion ? false : true}/>
            <Sign hideSign={this.hideSign.bind(this)} setCurrentUser={setCurrentUser} currentUser={currentUser}/>
          </View>
        )
    return (
      <DrawerLayoutAndroid
        ref='drawer'
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={this.renderDrawerView.bind(this)}>
        <StatusBar backgroundColor='#111' />
        <Navigator 
          ref='navigator'
          initialRoute={{name:'home'}}           
          renderScene={this.renderScene.bind(this)}/>
      </DrawerLayoutAndroid>
    );
  }
}







