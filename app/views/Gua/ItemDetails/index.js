import React, {
  Component,
  View,
  ScrollView,
  Text,
  Image,
  ToolbarAndroid,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native'

import styles from './styles.js'
import settings from '../../../settings.js'

export default class ItemDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      detailsHeight: true,
      isMark: false,
    }
  }

  componentDidMount() {
    this.checkMark()
  }

  changeDetailsHeight() {
    let detailsHeight = this.state.detailsHeight
    this.setState({detailsHeight: !detailsHeight})
  }

  checkMark() {
    let carryData = this.props.carryData
    let currentUser = JSON.parse(this.props.currentUser)
    if (currentUser.markArr && (currentUser.markArr.indexOf(carryData.id) != -1))
      this.setState({isMark: true})
    else
      this.setState({isMark: false})
  }

  addMark() {
    let isMark = this.state.isMark
    if (isMark)
      return
    let updateCurrentUser = this.props.updateCurrentUser
    let carryData = this.props.carryData
    let currentUser = JSON.parse(this.props.currentUser)
    let markArr = currentUser.markArr
    let token = currentUser.sessionToken
    let request = this.props.request
    let url = `${settings.url.signUp}/${currentUser.objectId}`
    if (!markArr)
      markArr = [carryData.id]
    else
      markArr.push(carryData.id)
    fetch(url, request('put', {markArr: markArr}, token ))
    .then(res => res.json())
    .then(json => {
      if (!json.code) {
        updateCurrentUser()
        this.setState({isMark: true})
        Alert.alert(settings.tips.CN.markSuccess,carryData.gua)
      }
      else
        Alert.alert(settings.tips.CN.failed,carryData.gua)
    })
  }

  deleteMark() {
    let isMark = this.state.isMark
    if (!isMark)
      return
    let updateCurrentUser = this.props.updateCurrentUser
    let carryData = this.props.carryData
    let currentUser = JSON.parse(this.props.currentUser)
    let markArr = currentUser.markArr
    let token = currentUser.sessionToken
    let request = this.props.request
    let url = `${settings.url.signUp}/${currentUser.objectId}`
    if (!markArr)
      return
    else {
      let index = markArr.indexOf(carryData.id)
      markArr.splice(index,1)
    }
    fetch(url, request('put', {markArr: markArr}, token ))
    .then(res => res.json())
    .then(json => {
      if (!json.code) {
        updateCurrentUser()
        this.setState({isMark: false})
        Alert.alert(settings.tips.CN.markDelete,carryData.gua)
      }
      else
        Alert.alert(settings.tips.CN.failed,carryData.gua)
    })

  }

  renderMark() {
    let isMark = this.state.isMark  
    let mark2 = settings.icons.mark2
    if (!isMark) {
      return(
          <TouchableOpacity style={styles.mark} onPress={this.addMark.bind(this)}>
            <Image source={mark2} tintColor='#ccc'/>
          </TouchableOpacity>
        )
    }
    else {
      return(
          <TouchableOpacity style={styles.mark} onPress={this.deleteMark.bind(this)}>
            <Image source={mark2} tintColor='#9d55b8'/>
          </TouchableOpacity>
        )
    }
  }

  render() {
    let carryData = this.props.carryData
    let detailsHeight = this.state.detailsHeight
    let open = settings.icons.open
    return(
        <View style={styles.container}>
          <ToolbarAndroid
            style={styles.toolbar}
            title={carryData.tag + ' ' + carryData.tip}
            titleColor='#fff'
            navIcon={settings.icons.back}
            onIconClicked={this.props.back} />
          <ScrollView>
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <Image style={styles.img} source={carryData.img} />
              </View>
              <View style={styles.headerRight}>
                <View style={styles.split}>
                  <Text style={styles.splitText}>{settings.tags.CN.guaci}</Text>
                </View>
                {this.renderMark()}
                <Text style={styles.rightTextGua}>{carryData.gua}</Text>
              </View>
            </View>
            <View style={styles.body}>
              <View style={styles.split}>
                <Text style={styles.splitText}>{settings.tags.CN.yaoci}</Text>
              </View>
              <View>
                {
                  carryData.yaos.map((item, index) => {
                    return(
                        <Text key={index} style={[styles.rightTextGua]}>{item}</Text>
                      )
                  })
                }
              </View>
            </View>
            <View style={[styles.details, {height: (detailsHeight ? 60 : null)}]}>
              <TouchableOpacity onPress={this.changeDetailsHeight.bind(this)}>
                <View style={[styles.detailsTip, {backgroundColor: (detailsHeight ? '#9d55b8' : '#999')}]}>
                  <Text style={styles.detailsText}>《彖》《象》《文言》</Text>
                  <Image style={[styles.openIcon, {transform: (detailsHeight ? [{rotate: '0deg'}] : [{rotate: '180deg'}])}]} source={open} tintColor={detailsHeight ? '#f5f5f5' : '#000'}/>
                </View>
              </TouchableOpacity>
              {
                carryData.details.map((item, index) => {
                  return(
                      <Text key={index} style={styles.rightTextGua}>{item}</Text>
                    )
                })
              }
            </View>
          </ScrollView>
        </View>
      )
  }
}