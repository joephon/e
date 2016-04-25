import React, {
  Component,
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
} from 'react-native'

import styles from './styles.js'
import settings from '../../../../settings.js'

export default class Upload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      avatarSource: '',
    }
  }

  goCamera() {
    let ImagePickerManager = this.props.ImagePickerManager
    let cameraInit = settings.cameraInit
    ImagePickerManager.launchCamera(cameraInit, res => {
      const source = {uri: res.uri, isStatic: true}
      this.setState({avatarSource: source})
    })
  }

  goPhoto() {
    let ImagePickerManager = this.props.ImagePickerManager
    let cameraInit = settings.cameraInit
    ImagePickerManager.launchImageLibrary(cameraInit, res => {
      const source = {uri: res.uri, isStatic: true}
      this.setState({avatarSource: source})
    })
  }

  render() {
    let avatarSource = this.state.avatarSource
    return(
        <Modal>
          <View style={styles.container}>
            <View style={styles.wrap}>
              <TouchableOpacity onPress={this.goCamera.bind(this)}>
                <Text>照相</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.goPhoto.bind(this)}>
                <Text>相册</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.changeUpload.bind(this, false)}>
                <Text>取消</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Image source={avatarSource ? avatarSource : settings.icons.e}/>
        </Modal>
      )
  }
}