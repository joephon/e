
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

import Home from './views/Home'
import DrawerView from './views/DrawerView'
import Gua from './views/Gua'

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.backPress.bind(this))
  }

  componentWillUnmout() {
    BackAndroid.removeEventListener('hardwareBackPress', this.backPress.bind(this))
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

  renderScene(route, navigator) {
    if (route.name === 'home') 
      return <Home  navigator={navigator} showDrawer={this.showDrawer.bind(this)} nav={this.getNavigator.bind(this)}/>
    else if (route.name === 'drawerView') 
      return <DrawerView  navigator={navigator} />
    else if (route.name === 'gua') 
      return <Gua  navigator={navigator} back={this.back.bind(this)} nav={this.getNavigator.bind(this)}/>
    else
      return <Home  navigator={navigator} showDrawer={this.showDrawer.bind(this)} nav={this.getNavigator.bind(this)}/>
  }

  renderDrawerView() {
    return <DrawerView nav={this.getNavigator.bind(this)} />
  }

  getNavigator(name) {
    const nav = this.refs.navigator
    const drawer = this.refs.drawer
    drawer.closeDrawer()
    nav.push({name:name})
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
          renderScene={(route, navigator) => {
            return this.renderScene(route, navigator)
          }}/>
      </DrawerLayoutAndroid>
    );
  }
}

