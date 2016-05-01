import React, {
  Component,
  View,
  Text,
  ListView,
  Alert,
  ToastAndroid,
  ProgressBarAndroid,
  Image,
  TouchableOpacity,
} from 'react-native'

import styles from './styles.js'
import settings from '../../../../settings.js'

export default class Comment extends Component {

  renderLike(commentId, like, likeArr) {
    let currentUser = JSON.parse(this.props.currentUser)
    let userId = currentUser.objectId
    let include = likeArr.indexOf(userId)
    if (include == -1) {
      return(
          <TouchableOpacity onPress={this.addLike.bind(this,commentId, like, likeArr)}>
            <Image source={settings.icons.good} tintColor='#ccc' style={styles.good}/>
          </TouchableOpacity>
        )
    }
    else {
     return(
        <TouchableOpacity onPress={this.deleteLike.bind(this,commentId, like, likeArr)}>
          <Image source={settings.icons.good} style={styles.good}/>
        </TouchableOpacity>
      )     
    }
  }

  renderControl(commentId, belongs) {
    let currentUser = JSON.parse(this.props.currentUser)
    let userId = currentUser.objectId
    if (userId == belongs) {
      return(
          <View style={styles.deleteBox}>
            <TouchableOpacity onPress={this.confirmDelete.bind(this, commentId)}>
              <Image source={settings.icons.trash} tintColor='#999' style={styles.delete}/>
            </TouchableOpacity>
          </View>
        )
    }
  }

  confirmDelete(commentId) {
    Alert.alert(
        settings.tips.CN.deleteConfirm,
        settings.tips.CN.deleteExplain,
        [
          {
            text: settings.tips.CN.deleteMistake,
            onPress: () => ToastAndroid.show(settings.tips.CN.happy, ToastAndroid.SHORT)
          },
          {
            text: settings.tips.CN.ok,
            onPress: () => this.handleDelete(commentId)
          },
        ]
      )
  }

  handleDelete(commentId) {
    let url = `${settings.url.comment}/${commentId}`
    let request = this.props.request 
    fetch(url, request('delete'))
    .then(res => res.json())
    .then(json => {
      if (!json.code) {
        this.props.getComments()
        ToastAndroid.show(settings.tips.CN.delete,ToastAndroid.SHORT)
      }
      else
        Alert.alert('a', json.error)
    })  
  }

  addLike(commentId, like, likeArr) {
    let currentUser = JSON.parse(this.props.currentUser)
    let userId = currentUser.objectId
    let url = `${settings.url.comment}/${commentId}`
    let request = this.props.request
    likeArr.push(userId)
    let body = {
      like: like + 1,
      likeArr: likeArr,
    }
    fetch(url, request('put',body))
    .then(res => res.json())
    .then(json => {
      if (!json.code) {
        this.props.getComments()
        ToastAndroid.show(settings.tips.CN.like,ToastAndroid.SHORT)
      }
      else
        Alert.alert('a', json.error)
    })
  }

  deleteLike(commentId, like, likeArr) {
    let currentUser = JSON.parse(this.props.currentUser)
    let userId = currentUser.objectId
    let url = `${settings.url.comment}/${commentId}`
    let request = this.props.request
    let index = likeArr.indexOf(userId)
    likeArr.splice(likeArr[index], 1)
    let body = {
      like: like - 1,
      likeArr: likeArr,
    }
    fetch(url, request('put',body))
    .then(res => res.json())
    .then(json => {
      if (!json.code) {
        this.props.getComments()
        ToastAndroid.show(settings.tips.CN.unlike,ToastAndroid.SHORT)
      }
      else
        Alert.alert('a', json.error)
    })
  }

  formatDate(date) {
    let uDate = Date.parse(date)
    let now = Date.now()
    let ago = Math.floor((now - uDate) / 1000 / 60)
    let year = (new Date(date)).getFullYear()
    let month = (new Date(date)).getMonth()
    let day = (new Date(date)).getDate()
    switch(true) {
      case ago < 1:
      return '刚刚'
      case ago >= 1 && ago < 60:
      return `${ago} 分钟前`
      case ago >= 60 && ago < 1440:
      return `${Math.floor(ago/60)} 小时前`
      case ago >= 1440 && ago < 2880:
      return `昨天`
      case ago >= 2880 && ago < 4320:
      return `前天`
      case ago >= 4320 && ago < 7200:
      return `大前天`
      default:
      return `${year} 年 ${month + 1} 月 ${day} 日`
    }
  }

  renderRow(rowData) {
    return(
        <View style={styles.wrap}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Image source={{uri:rowData.userDetails.avatarUrl} || settings.icons.e} style={styles.avatar}/>
              <Text style={styles.username}>{rowData.userDetails.username}</Text>
            </View>
            <View style={styles.headerRight}>
              <View style={styles.like}>
                <View style={styles.goodBox}>
                {this.renderLike(rowData.objectId, rowData.like, rowData.likeArr)}
                </View>
                <View style={styles.goodTextBox}>
                  <Text style={styles.goodText}>{rowData.like}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.dress}/>
          <View style={styles.body}>
            <Text style={styles.bodyText}>{rowData.comment}</Text>
          </View>
          <View style={styles.dress}/>
          <View style={styles.footer}>
            <View style={styles.dateBox}>
              <Text style={styles.date}>{this.formatDate(rowData.createdAt)}</Text>
            </View>
            {this.renderControl(rowData.objectId, rowData.userId)}
          </View>
        </View>
      )
  }

  render() {
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    })
    let comments = this.props.comments
    if (comments && comments.length > 0 ) {
      let dataSource = ds.cloneWithRows(comments)
      return <ListView 
                dataSource={dataSource}
                renderRow={this.renderRow.bind(this)}/>
    }
    else if (comments && comments.length == 0) {
      return(
          <View style={styles.noComment}>
            <Text>{settings.tips.CN.noComment}</Text>
          </View>
        )
    }
    else {
      return(
          <View style={styles.progress}>
            <ProgressBarAndroid styleAttr="Large"/>
          </View>
        )
    }
  }
}