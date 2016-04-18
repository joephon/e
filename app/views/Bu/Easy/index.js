import React, {
  Component,
  View,
  Text,
  Image,
  Vibration,
  TouchableOpacity,
  ScrollView,
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
      deg: 0,
    }
  }

  begin() {
    Vibration.vibrate()
    this.shake()
  }

  shake() {
    let deg = 0
    for (let i = 1; i <= 10; i ++) {
      setTimeout(() => {
        this.setState({deg: deg + i * 5 })
      },i * 10)
    }
    setTimeout(() => {
      for (let i = 1; i <= 10; i ++) {
        setTimeout(() => {
          this.setState({deg: deg - i * 5 })
        },i * 10)
      }
    }, 500)
    setTimeout(() => {
      this.setState({deg: 0})
    },1100)
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
    let deg = this.state.deg
    return(
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity style={[styles.buBox, {transform:[{rotate: `${deg}deg`},]}]} onPress={this.begin.bind(this)}>
            <Image style={styles.bu} source={settings.icons.bu} />
          </TouchableOpacity>
          <View style={styles.yao}>
            <View style={styles.yaoLeft}>
              <Text style={styles.yaoText}>{settings.tags.CN.yaoSix}</Text>
            </View>
            <View style={styles.yaoCenter}>
              <View style={[styles.yaoDefault,{backgroundColor: rowSix ? '#000' : '#9d55b8'}]}>
              </View>
              <View style={[styles.yaoVar,{backgroundColor: varColorSix ? '#000' : '#9d55b8'}]}>
              </View>
              <View style={[styles.yaoDefault,{backgroundColor: rowSix ? '#000' : '#9d55b8'}]}>
              </View>
            </View>
            <View style={styles.yaoRight}>
              <Text style={styles.yaoText}>老阴</Text>
            </View>
          </View>
          <View style={styles.yao}>
            <View style={styles.yaoLeft}>
              <Text style={styles.yaoText}>{settings.tags.CN.yaoFive}</Text>
            </View>
            <View style={styles.yaoCenter}>
              <View style={[styles.yaoDefault,{backgroundColor: rowFive ? '#000' : '#9d55b8'}]}>
              </View>
              <View style={[styles.yaoVar,{backgroundColor: varColorFive ? '#000' : '#9d55b8'}]}>
              </View>
              <View style={[styles.yaoDefault,{backgroundColor: rowFive ? '#000' : '#9d55b8'}]}>
              </View>
            </View>
            <View style={styles.yaoRight}>
              <Text style={styles.yaoText}>老阴</Text>
            </View>
          </View>
          <View style={styles.yao}>
            <View style={styles.yaoLeft}>
              <Text style={styles.yaoText}>{settings.tags.CN.yaoFour}</Text>
            </View>
            <View style={styles.yaoCenter}>
              <View style={[styles.yaoDefault,{backgroundColor: rowFour ? '#000' : '#9d55b8'}]}>
              </View>
              <View style={[styles.yaoVar,{backgroundColor: varColorFour ? '#000' : '#9d55b8'}]}>
              </View>
              <View style={[styles.yaoDefault,{backgroundColor: rowFour ? '#000' : '#9d55b8'}]}>
              </View>
            </View>
            <View style={styles.yaoRight}>
              <Text style={styles.yaoText}>老阴</Text>
            </View>
          </View>
          <View style={styles.yao}>
            <View style={styles.yaoLeft}>
              <Text style={styles.yaoText}>{settings.tags.CN.yaoThree}</Text>
            </View>
            <View style={styles.yaoCenter}>
              <View style={[styles.yaoDefault,{backgroundColor: rowThree ? '#000' : '#9d55b8'}]}>
              </View>
              <View style={[styles.yaoVar,{backgroundColor: varColorThree ? '#000' : '#9d55b8'}]}>
              </View>
              <View style={[styles.yaoDefault,{backgroundColor: rowThree ? '#000' : '#9d55b8'}]}>
              </View>
            </View>
            <View style={styles.yaoRight}>
              <Text style={styles.yaoText}>老阴</Text>
            </View>
          </View>
          <View style={styles.yao}>
            <View style={styles.yaoLeft}>
              <Text style={styles.yaoText}>{settings.tags.CN.yaoTwo}</Text>
            </View>
            <View style={styles.yaoCenter}>
              <View style={[styles.yaoDefault,{backgroundColor: rowTwo ? '#000' : '#9d55b8'}]}>
              </View>
              <View style={[styles.yaoVar,{backgroundColor: varColorTwo ? '#000' : '#9d55b8'}]}>
              </View>
              <View style={[styles.yaoDefault,{backgroundColor: rowTwo ? '#000' : '#9d55b8'}]}>
              </View>
            </View>
            <View style={styles.yaoRight}>
              <Text style={styles.yaoText}>老阴</Text>
            </View>
          </View>
          <View style={styles.yao}>
            <View style={styles.yaoLeft}>
              <Text style={styles.yaoText}>{settings.tags.CN.yaoOne}</Text>
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
      </ScrollView>
      )
  }
}