
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
 import ListItem from './ListItem'

export default class Gua extends Component {
  constructor(props) {
    super(props)
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows(source),
    }
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
            renderRow={(rowData) => <ListItem rowData={rowData} {...this.props}/>}
           />
        </View>
      )
  }
 }

