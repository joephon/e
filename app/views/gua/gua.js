import React, {
  Component, 
  ListView,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  ToolbarAndroid,
 } from 'react-native'

 let styles = require('./styles.js').styles
 let back = require('../../../images/back.png')
 let data = [{a:'222'},{a:'222333'},{a:'222'},{a:'222333'},{a:'222'},{a:'222333'},{a:'222'},{a:'222333'},{a:'222'},{a:'222333'},{a:'222'},{a:'ooxx'}]

 class Gua extends Component {
  constructor(props) {
    super(props)
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows(data),
    }
  }

  renderRow(rowData) {
    return(
        <TouchableHighlight
          style={{backgroundColor:'#f5f5f5'}}
          activeOpacity={0.5}
          underlayerColor='#000'>
            <View style={styles.rowData}>
              <Text>{rowData.a}</Text>
            </View>
        </TouchableHighlight>
      )
  }


  render() {
    let dataSource = this.state.dataSource
    return(
        <View style={styles.container}>
          <ToolbarAndroid
            style={styles.toolbar}
            title='六十四卦'
            titleColor='#fff'
            navIcon={back}
            onIconClicked={this.props.back} />
          <ListView
            dataSource={dataSource}
            renderRow={this.renderRow.bind(this)}
           />
        </View>
      )
  }
 }


 export default Gua