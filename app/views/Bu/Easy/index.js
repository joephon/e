import React, {
  Component,
  View,
  Text,
  Image,
  Vibration,
  TouchableOpacity,
  ScrollView,
  Alert,
  ToastAndroid,
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
      allowPress: true,
      deg: 0,
      step: 0,
      result: [],
      resultYao: [],
      resultOut: [],
    }
  }

  begin() {
    let step = this.state.step
    let allowPress = this.state.allowPress
    if (step > 5)
      return
    if (allowPress) {
      this.setState({allowPress: false})
      Vibration.vibrate()
      this.shake()
    }
  }

  shake() {
    for (let i = 0; i < 20; i ++) {
      setTimeout(() => {
        this.setState({deg: this.state.deg + 18})
      },i * 10)
    }
    setTimeout(() => {
      this.getStep()
      this.setState({allowPress: true})
    },1000)
  }

  getStep() {
    let step = this.state.step 
    if (step > 5) 
      return
    switch(step) {
      case 0:
      this.setState({step: step + 1,rowOne: true, varColorOne: this.getYao()})
      this.callToast(step)
      break
      case 1:
      this.setState({step: step + 1,rowTwo: true, varColorTwo: this.getYao()})
      this.callToast(step)
      break
      case 2:
      this.setState({step: step + 1,rowThree: true, varColorThree: this.getYao()})
      this.callToast(step)
      break
      case 3:
      this.setState({step: step + 1,rowFour: true, varColorFour: this.getYao()})
      this.callToast(step)
      break
      case 4:
      this.setState({step: step + 1,rowFive: true, varColorFive: this.getYao()})
      this.callToast(step)
      break
      case 5:
      this.setState({step: step + 1,rowSix: true, varColorSix: this.getYao()})
      this.formatResult()
      break
    }
  }

  getYao() {
    let result = this.state.result
    let resultYao = this.state.resultYao
    let figure = Math.floor(Math.random() * 10 + 1)
    let varColor
    switch(true) {
      case figure < 5:
      result.push(1)
      resultYao.push('少阳')
      this.setState({result: result, resultYao: resultYao})
      varColor = true
      break
      case figure > 5:
      result.push(0)
      resultYao.push('少阴')
      this.setState({result: result, resultYao: resultYao})
      varColor = false
      break
      case figure == 5:
      result.push(3)
      resultYao.push('老阴')
      this.setState({result: result, resultYao: resultYao})
      varColor = false
      break
      case figure == 10:
      result.push(2)
      resultYao.push('老阳')
      this.setState({result: result, resultYao: resultYao})
      varColor = true
      break
    }
    return varColor
  }

  callToast(step) {
    ToastAndroid.show(`还剩${5 - step}次`,ToastAndroid.SHORT)
  }

  formatResult() {
    let result = this.state.result
    result.map((item, index) => {
      if (item == 3)
        result[index] = 0
      else if (item == 2)
        result[index] = 1
    })
    this.setState({resultOut: result}, () => {
      this.matchResult(result)
    })
  }

  matchResult(result) {
    setTimeout(() => {
      Alert.alert(
        '你占中了ooxx卦',
        '用ooxx卦的ooxx爻来解签',
        [
          {text: '现在去看', onPress: () => this.props.nav(settings.routes.guaDetails, sources[0])}
        ]
      )
    }, 500)
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
    let result = this.state.result
    let resultYao = this.state.resultYao
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
              <Text style={styles.yaoText}>{resultYao[5]}</Text>
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
              <Text style={styles.yaoText}>{resultYao[4]}</Text>
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
              <Text style={styles.yaoText}>{resultYao[3]}</Text>
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
              <Text style={styles.yaoText}>{resultYao[2]}</Text>
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
              <Text style={styles.yaoText}>{resultYao[1]}</Text>
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
              <Text style={styles.yaoText}>{resultYao[0]}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      )
  }
}