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

let ToolbarAndroid = require('ToolbarAndroid')
let BackAndroid = require('BackAndroid')
let e = require('../images/e.png')

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: '议易',
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
      return <Home  navigator={navigator} />
    else if (route.name === 'drawerView') 
      return <DrawerView  navigator={navigator}/>
  }

  showDrawer() { 
    this.refs.drawer.openDrawer()
  }

  render() {
    let title = this.state.title
    return (
      <DrawerLayoutAndroid
        ref='drawer'
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => <DrawerView />}>
        <StatusBar backgroundColor='#000'/>
        <ToolbarAndroid
          style={styles.toolbar}
          title={title}
          titleColor='#fff'
          navIcon={e}
          onIconClicked={this.showDrawer.bind(this)}/>
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