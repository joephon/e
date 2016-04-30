
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
import ListItem from './ListItem'

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

export default class Gua extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: ds.cloneWithRows(this.props.source),
    }
  }

  renderListItem(rowData) {
    return <ListItem rowData={rowData} {...this.props}/>
  }

  render() {
    let dataSource = this.state.dataSource
    return(
        <View style={styles.container}>
          <ToolbarAndroid
            style={styles.toolbar}
            title={settings.tips.CN.gua}
            titleColor='#fff'
            navIcon={settings.icons.categories}
            onIconClicked={this.props.showDrawer} />
          <ListView
            dataSource={dataSource}
            renderRow={this.renderListItem.bind(this)}
           />
        </View>
      )
  }
 }

