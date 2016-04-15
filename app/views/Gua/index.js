
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
 } from 'react-native'

 import styles from './styles.js'
 import settings from '../../settings.js'
 import source from '../../sources.js'

export default class Gua extends Component {
  constructor(props) {
    super(props)
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows(source.gua),
    }
  }

  renderRow(rowData) {
    return(
        <TouchableHighlight
          style={{backgroundColor:'#f5f5f5'}}
          activeOpacity={0.5}
          underlayerColor='#000'>
            <View style={styles.rowData}>
              <Text>{rowData.name}</Text>
            </View>
        </TouchableHighlight>
      )
  }

  renderHeader() {
    return(
        <View>
          <Text>hello</Text>
        </View>
      )
  }

  render() {
    let dataSource = this.state.dataSource
    return(
        <View style={styles.container}>
          <ToolbarAndroid
            style={styles.toolbar}
            title={settings.tips.CN.gua}
            titleColor='#fff'
            navIcon={settings.icons.back}
            onIconClicked={this.props.back} />
          <ListView
            dataSource={dataSource}
            renderRow={this.renderRow.bind(this)}
           />
        </View>
      )
  }
 }

