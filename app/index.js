
import React, {
  Component,
  Navigator,
  StatusBar,
  DrawerLayoutAndroid,
  ProgressBarAndroid,
  BackAndroid,
  Text,
  View
} from 'react-native';

import Scene from './views/Scene'
import Home from './views/Home'
import DrawerView from './views/DrawerView'
import Gua from './views/Gua'
import GuaDetails from './views/Gua/ItemDetails'
import Bu from './views/Bu'

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      carryData: '',
      showScene: true,
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
  }

  hideScene() {
    setTimeout(() => {
      this.setState({showScene: false})
    },4000)
  }

  backPress() {
    const nav = this.refs.navigator
    const routers = nav.getCurrentRoutes()
    if (routers.length > 1) {
      nav.pop();
      return true
    }
    return false
  }

  renderScene(route, navigator, carryData) {
    if (route.name === 'home') 
      return <Home  navigator={navigator} showDrawer={this.showDrawer.bind(this)} nav={this.getNavigator.bind(this)}/>
    else if (route.name === 'drawerView') 
      return <DrawerView  navigator={navigator} />
    else if (route.name === 'gua') 
      return <Gua  navigator={navigator} back={this.back.bind(this)} nav={this.getNavigator.bind(this)}/>
    else if (route.name === 'guaDetails') 
      return <GuaDetails  navigator={navigator} back={this.back.bind(this)} nav={this.getNavigator.bind(this)} carryData={this.state.carryData}/>
    else if (route.name === 'bu') 
      return <Bu navigator={navigator} back={this.back.bind(this)} nav={this.getNavigator.bind(this)}/>
    else
      return <Home  navigator={navigator} showDrawer={this.showDrawer.bind(this)} nav={this.getNavigator.bind(this)}/>
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
    if (showScene)
      return( 
          <View style={{flex: 1}}>
            <StatusBar hidden={true}/>
            <Scene />
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







