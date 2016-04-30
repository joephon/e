import React,{
  Component,
  View,
  Text,
  Image,
  TouchableNativeFeedback,
 } from 'react-native'

 import styles from './styles.js'

 export default class ListItem extends Component {

  render() {
    let name = this.props.name
    let reset = this.props.reset
    let icon = this.props.icon
    return(
        <TouchableNativeFeedback onPress={reset} >
          <View style={styles.li}>
            <Image source={icon} style={styles.liImg}/>
            <Text style={styles.liText}>{name}</Text>
          </View>
        </TouchableNativeFeedback>
      )
  }
 }