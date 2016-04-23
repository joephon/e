
import React, {
  Component,
  Navigator,
  StatusBar,
  DrawerLayoutAndroid,
  ProgressBarAndroid,
  BackAndroid,
  Text,
  View,
  Platform,
} from 'react-native';

import Scene from './views/Scene'
import Sign from './views/Sign'
import Home from './views/Home'
import DrawerView from './views/DrawerView'
import Gua from './views/Gua'
import GuaDetails from './views/Gua/ItemDetails'
import Bu from './views/Bu'
import request from './request.js'
import myApp from '../myKeys.js'
import storage from './storage.js'

const Session = storage.load({key:'currentUser'})

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      carryData: [],
      isLogin: false,
      showScene: true,
      oldVersion: false,
      request: request,
      storage: storage,
      myApp: myApp,
      nav: this.getNavigator.bind(this),
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
  }

  hideScene() {
    this.checkPlatform()
    setTimeout(() => {
      this.setState({showScene: false})
    },3000)
  }

  hideSign() {
    this.setState({isLogin: true})
  }

  isCurrentUser() {
    if (Session)
      this.setState({isLogin: true})
  }

  checkPlatform() {
    if (Platform.Version < 21)
      this.setState({oldVersion: true})
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

  renderScene(route, navigator, carryData) {
    if (route.name === 'home') 
      return <Home  navigator={navigator} {...this.state}/>
    else if (route.name === 'drawerView') 
      return <DrawerView  navigator={navigator} />
    else if (route.name === 'gua') 
      return <Gua  navigator={navigator} {...this.state}/>
    else if (route.name === 'guaDetails') 
      return <GuaDetails  navigator={navigator}  {...this.state}/>
    else if (route.name === 'bu') 
      return <Bu navigator={navigator} {...this.state}/>
    else
      return <Home  navigator={navigator} {...this.state}/>
  }

  renderDrawerView() {
    return <DrawerView nav={this.getNavigator.bind(this)} />
  }

  getNavigator(name, carryData) {
    if (!carryData)
      carryData = ''
    const nav = this.refs.navigator
    const drawer = this.refs.drawer
    drawer.closeDrawer()
    this.setState({carryData: carryData}, () => nav.push({name:name}))
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
            <Sign hideSign={this.hideSign.bind(this)} storage={storage}/>
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
          renderScene={(route, navigator, carryData) => this.renderScene(route, navigator, carryData)}/>
      </DrawerLayoutAndroid>
    );
  }
}







