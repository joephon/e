'use strict'

import React, {
  Component,
  Navigator,
  StyleSheet,
  DrawerLayoutAndroid,
  ProgressBarAndroid,
  Text,
  View
} from 'react-native';

import Home from './views/home/home.js'
import DrawerView from './views/drawerView/drawerView.js'

let ToolbarAndroid = require('ToolbarAndroid')
let e = require('../images/e.png')

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: '易',
    }
  }

  renderScene(route, navigator) {
    let Component = route.component
    if (route.name === 'home') 
      return <Home {...route.params} navigator={navigator} />
    else if (route.name === 'drawerView') 
      return <DrawerView {...route.params} navigator={navigator}/>
  }

  setting(route, navigator) {
    let Component = route.component
    return <DrawerView {...route.params} navigator={navigator}/>
  }

  test() {
    this.setState({title: '个人中心'})
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
        <ToolbarAndroid
          style={styles.toolbar}
          title={title}
          titleColor='#fff'
          navIcon={e}
          onIconClicked={this.test.bind(this)}/>
        <Navigator 
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