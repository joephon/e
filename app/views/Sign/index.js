import React, {
  Component,
  Toast,
  Navigator,
  // View,
} from 'react-native'

import styles from './styles.js'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Forgot from './Forgot'
import valid from 'validator'
import request from '../../request.js'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nav: this.getNavigator.bind(this),
      valid: valid,
      request: request,
      hideSign: this.props.hideSign,
      storage: this.props.storage,
    }
  }

  getNavigator(name) {
    const nav = this.refs.navigator
    if (nav.name != name)
      nav.push({name: name})
  }

  renderScene(route, navigator, carryData) {
    switch(route.name) {
      case 'signIn' :
      return <SignIn navigator={navigator} {...this.state}/>
      case 'signUp' :
      return <SignUp navigator={navigator} {...this.state}/>
      case 'forgot' :
      return <Forgot navigator={navigator} {...this.state}/>
    }
  }

  render() {
    return (
        <Navigator 
          ref='navigator'
          initialRoute={{name:'signIn'}}           
          renderScene={(route, navigator, carryData) => this.renderScene(route, navigator, carryData)}/>
    )
  }
}


