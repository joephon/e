import React, {
  Component,
  View,
  Text,
  Image,
} from 'react-native'

import styles from './styles.js'
import settings from '../../../settings.js'
import sources from '../../../sources.js'

export default class Easy extends Component {
  constructor(props) {
    super(props)
    this.state = {
      varColorOne: false,
      varColorTwo: false,
      varColorThree: false,
      varColorFour: false,
      varColorFive: false,
      varColorSix: false,
      rowOne: false,
      rowTwo: false,
      rowThree: false,
      rowFour: false,
      rowFive: false,
      rowSix: false,
    }
  }

  render() {
    let varColorOne = this.state.varColorOne
    let varColorTwo = this.state.varColorTwo
    let varColorThree = this.state.varColorThree
    let varColorFour = this.state.varColorFour
    let varColorFive = this.state.varColorFive
    let varColorSix = this.state.varColorSix
    let rowOne = this.state.rowOne
    let rowTwo = this.state.rowTwo
    let rowThree = this.state.rowThree
    let rowFour = this.state.rowFour
    let rowFive = this.state.rowFive
    let rowSix = this.state.rowSix
    return(
        <View style={styles.container}>
          <Image style={styles.bu} source={settings.icons.bu} />
          <View style={styles.yao}>
            <View style={styles.yaoLeft}>
              <Text style={styles.yaoText}>上爻</Text>
            </View>
            <View style={styles.yaoCenter}>
              <View style={[styles.yaoDefault,{backgroundColor: rowOne ? '#000' : '#9d55b8'}]}>
              </View>
              <View style={[styles.yaoVar,{backgroundColor: varColorOne ? '#000' : '#9d55b8'}]}>
              </View>
              <View style={[styles.yaoDefault,{backgroundColor: rowOne ? '#000' : '#9d55b8'}]}>
              </View>
            </View>
            <View style={styles.yaoRight}>
              <Text style={styles.yaoText}>老阴</Text>
            </View>
          </View>

        </View>
      )
  }
}