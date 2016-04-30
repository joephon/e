import React, {
  Component,
  View,
  ScrollView,
  Text,
  TextInput,
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
      comment: '',
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

  handleCommentChange(value) {
    this.setState({comment: value})
  }

  handleSubmit() {
    let comment = this.state.comment
    let size = comment.length
    switch(true) {
      case size < 10:
      ToastAndroid.show(settings.valid.CN.shortComment, ToastAndroid.SHORT)
      break
      case size > 1000:
      ToastAndroid.show(settings.valid.CN.longComment, ToastAndroid.SHORT)
      break
      default:
      this.send(comment)
    }
  }

  send(comment) {
    let currentUser = JSON.parse(this.props.currentUser)
    let request = this.props.request
    let url = settings.url.comment 
    let body = {
      guaId: this.props.carryData.id,
      userId: currentUser.objectId,
      comment: comment,
    }
    fetch(url, request('post', body))
    .then(res => res.json())
    .then(json => {
      if (!json.code) {
        Alert.alert(settings.tips.CN.success ,settings.tips.CN.nice)
      }
      else
        Alert.alert(settings.tips.CN.failed, json.error)
    })
  }

  render() {
    let carryData = this.props.carryData
    let detailsHeight = this.state.detailsHeight
    let open = settings.icons.open
    let comment = this.state.comment
    let say = settings.tips.CN.say
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
            <View style={styles.comment}>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.textArea}
                  multiline={true}
                  numberOfLines={6}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholderTextColor='#ccc'
                  placeholder={settings.placeholders.CN.comment}
                  value={comment}
                  onChangeText={this.handleCommentChange.bind(this)}/>
              </View>
              <View style={styles.control}>
                <Text style={styles.warning}>{`还能写${1000 - comment.length}字`}</Text>
                <TouchableOpacity style={styles.say} onPress={this.handleSubmit.bind(this)}>
                  <Text style={styles.sayText}>{say}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      )
  }
}