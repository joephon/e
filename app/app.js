'use strict'

import React, {
  Component,
  Navigator,
  StatusBar,
  StyleSheet,
  DrawerLayoutAndroid,
  ProgressBarAndroid,
  Text,
  View
} from 'react-native';

import Home from './views/home/home.js'
import DrawerView from './views/drawerView/drawerView.js'

// let ToolbarAndroid = require('ToolbarAndroid')
let BackAndroid = require('BackAndroid')
// let categories = require('../images/categories.png')

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showDrawer: this.showDrawer.bind(this)
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
      return <Home  navigator={navigator} showDrawer={this.showDrawer.bind(this)}/>
    else if (route.name === 'drawerView') 
      return <DrawerView  navigator={navigator} />
  }

  renderDrawerView() {
    return <DrawerView nav={this.getNavigator.bind(this)} />
  }

  getNavigator(name) {
    const nav = this.refs.navigator
    const drawer = this.refs.drawer
    drawer.closeDrawer()
    nav.replace({name:name})
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
        renderNavigationView={() => this.renderDrawerView() }>
        <StatusBar
          backgroundColor='#111'
          />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'blue',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  toolbar: {
    backgroundColor: '#000',
    height: 56,
  },
});


export default App