
import React, {
  Component, 
  ListView,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ToolbarAndroid,
  Alert,
 } from 'react-native'

import styles from './styles.js'
import settings from '../../../settings.js'
import ListItem from '../../Gua/ListItem'

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

export default class Mark extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: ds.cloneWithRows(this.props.markSource),
    }
  }

  goGua() {
    this.props.reset(settings.routes.gua)
  }

  renderNoMark() {
    return(
        <View style={styles.container}>
          <ToolbarAndroid
            style={styles.toolbar}
            title={settings.tips.CN.mark}
            titleColor='#fff'
            navIcon={settings.icons.back}
            onIconClicked={this.props.back} />
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress={this.goGua.bind(this)}>
              <Image source={settings.icons.gua} style={{height: 70, width: 70}}/>
            </TouchableOpacity>
            <Text style={{marginTop: 15,textAlign: 'center'}}>木有收藏哦，点我</Text>
          </View>
        </View>
      )  
  }

  renderListItem(rowData) { 
    return <ListItem rowData={rowData} {...this.props}/>
  }

  render() {
    let dataSource = this.state.dataSource
    if (!this.props.markSource.length) {
      return this.renderNoMark()
    }
    return(
        <View style={styles.container}>
          <ToolbarAndroid
            style={styles.toolbar}
            title={settings.tips.CN.mark}
            titleColor='#fff'
            navIcon={settings.icons.back}
            onIconClicked={this.props.back} />
          <ListView
              dataSource={dataSource}
              renderRow={this.renderListItem.bind(this)}/>
        </View>
      )
  }
 }

