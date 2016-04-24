import React, {
  Component,
  View,
  Text,
  TextInput,
  ToastAndroid,
  Alert,
  ListView,
  Image,
  ToolbarAndroid,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native'

import styles from './styles.js'
import settings from '../../settings.js'

export default class User extends Component {

  nav() {
    let nav = this.props.nav
    let account = settings.routes.account
    nav(account)
  }

  render() {
    let signOutFunc = this.props.signOut
    let back = this.props.back
    let currentUser = JSON.parse(this.props.currentUser)
    let mark = settings.icons.mark
    let note = settings.icons.note
    let plan = settings.icons.plan
    let account = settings.icons.account
    let markText = settings.tips.CN.mark
    let accountText = settings.tips.CN.account
    let noteText = settings.tips.CN.note
    let planText = settings.tips.CN.plan
    let signOut = settings.tips.CN.signOut
    return(
        <View style={styles.container}>
          <ToolbarAndroid
            style={styles.toolbar} 
            title={settings.tips.CN.user}
            titleColor='#fff'
            navIcon={settings.icons.back}
            onIconClicked={back}
            />
          <View style={styles.header}>
            <Image style={styles.avatar} source={currentUser.avatar || settings.icons.e} />
            <TouchableOpacity>
              <View style={styles.userName}>
                <Text style={styles.userText}>{currentUser.username}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.body}>
            <TouchableNativeFeedback>
              <View style={styles.bodyItem}>
                <Image style={styles.bodyIcon} source={mark} />
                <Text style={styles.iconText}>{markText}</Text>
              </View>
            </TouchableNativeFeedback>
            <View style={styles.dress} />
            <TouchableNativeFeedback>
              <View style={styles.bodyItem}>
                <Image style={styles.bodyIcon} source={note} />
                <Text style={styles.iconText}>{noteText}</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
          <TouchableNativeFeedback onPress={this.nav.bind(this)}>
            <View style={styles.options}>
              <Image style={styles.optionIcon} source={account} />
              <Text>{accountText}</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback>
            <View style={styles.options}>
              <Image style={styles.optionIcon} source={plan} />
              <Text>{planText}</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={signOutFunc}>
            <View style={styles.signOutWrap}>
              <View style={styles.signOut}>
                <Text style={styles.signOutText}>{signOut}</Text>
              </View>
            </View>
          </TouchableNativeFeedback>
        </View>
      )
  }
}