import React from 'react';
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity, Alert, Linking, TextInput, ScrollView } from 'react-native';
import _ from 'lodash';
import { Screens, Layout, Colors } from '../../constants';
import { Logo, Statusbar, Headers } from '../../components';
import imgs from '../../assets/images';
import {
  Container,
  Content,
  Icon,
  Spinner,
  Button,
  Text,
  Header, Left, Body, Title, Right, Card, Grid, Col, Row, ListItem, Item, Input, label, Thumbnail
} from 'native-base';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
import * as orderActions from "../../actions/Order";
import styles from './styles';
import { ReturnReason } from '../data/data';
import CheckBox from 'react-native-check-box';
import url from '../../config/api'
import moment from 'moment'
import { showToast } from '../../utils/common';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

class ProductList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      //default value of the date time
      date: '',
      time: '',
      checked: true,
      qty: '',
      slectedProp: [],
      folder: '',
      itemid: '',
      image: '',
      imageindex: []
    };

  }

  componentDidMount() {
    var that = this;
    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var date = new Date().getDate(); //Current Date
    var month = monthNames[new Date().getMonth()]; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes

    that.setState({
      //Setting the value of the date time
      date: date + ' ' + month + ' ' + year,
      time: hours + ':' + min
    });
    this.getPermissionAsync()
  }
  openControlPanel = () => {
    this.props.navigation.goBack(); // open drawer
  };

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _pickImage = async (clickIndex) => {
    Alert.alert(
      'Select Image',
      'Please select Image mediam for pickup.',
      [
        { text: 'Open Camera', onPress: () => this.Camera(clickIndex) },
        { text: 'Open Gellary', onPress: () => this.Gellary(clickIndex) },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      { cancelable: false }
    )
  };

  Camera = async (clickIndex) => {
    let result = await ImagePicker.launchCameraAsync({
      //launchImageLibraryAsync
      //launchCameraAsync
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      this.ValidateSize(result.base64)
    }
  }

  Gellary = async (clickIndex) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      this.ValidateSize(result.base64)
    }
  }
  ValidateSize(file) {
    const File = file.length
    const size = Math.round((File / 1024))
    if (size > 2048) {
      alert(
        "File too small, please select a file greater than 2mb");
    } else {
      this.setState({ image: file });
    }
  }


  checkbox(clickIndex, OrderID, Name) {

    const { folder, image } = this.state
    var array = [...this.state.qty];
    var index = array.indexOf(clickIndex)

    this.data = {
      'orderId': OrderID,
      'orderItemId': clickIndex,
      'pickedQty': this.state.folder[0],
      'image': JSON.stringify(image),
    }
    console.log("THIS=======>", this.data)
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ qty: array, });
    }
    else {
      if (this.state.folder[0] != undefined)  {
        console.log("ZERO",folder.length)
        array.push(clickIndex)
        this.setState({ qty: array, });
        console.log("qty",this.state.qty)
        this.props.pickedOrder(this.data).then(res => {
          if (res.status == "success") {
            this.setState({ image: '' })
            showToast(Name + " is Picked-Up", "success")
            this.props.navigation.goBack(null)
          }
        })
      } else {
        showToast("Please Add Qty", "danger")
      }
      
    }

  }


  agregarFavoritos(clickIndex, val, itemsid, quantity) {

    var array = [...this.state.slectedProp];
    var folder = [...this.state.folder]
    var item = [...this.state.itemid]

    var index = array.indexOf(clickIndex)
    var idindex = folder.indexOf(val)
    var itemindex = item.indexOf(val)

    if (val > quantity) {
      array.splice(index, 1);
      folder.splice(idindex, 1);
      item.splice(itemindex, 1);
      return showToast(" Please verify ordered quantity", "danger")
    }

    if (val == '') {
      var checkbox = [...this.state.qty];
      var index = checkbox.indexOf(itemsid)
      checkbox.splice(index, 1);
      this.setState({ qty: checkbox, });
    }

    if (index !== -1) {
      array.splice(index, 1);
      folder.splice(idindex, 1);
      item.splice(itemindex, 1);

      array.push(clickIndex)
      folder.push(val)
      item.push(itemsid)

      this.setState({ slectedProp: array, folder: folder, itemid: item, });
    }
    else {
      array.push(clickIndex)
      folder.push(val)
      item.push(itemsid)

      this.setState({ slectedProp: array, folder: folder, itemid: item, });
    }

  }

  dialCall = (phone) => {
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phone}`;
    }
    else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        console.log(supported)
        if (!supported) {
          Alert.alert('Phone number is not available');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(err => console.log(err));
  };

  pickedUpOrder() {
    if (this.state.itemid < 1
      || this.state.qty.length != this.state.itemid.length) {
      return showToast("Please Double Check Fields", "danger")
    }
    this.setState({
      itemid: '', qty: '', slectedProp: [], folder: []
    })
    this.props.navigation.goBack();
  }
  dateFormate(date) {
    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let orderDate = new Date(date);
    let getDate = orderDate.getDate() + " " + monthNames[orderDate.getMonth()] + " " + orderDate.getFullYear();
    return getDate;
  }

  onPressSubmit = item => {
    this.props.navigation.navigate('Confirmation', { item });
  };



  render() {
    const { navigation, orderitem, orderdetail } = this.props;
    console.log("STATUS", orderdetail.itemStatus)
    var Address = orderdetail.aptNo + ',' + orderdetail.buildingName + ',' + orderdetail.areaName + ',' + orderdetail.cityName + ',' + orderdetail.zipcode + ',' + orderdetail.state
    return (
      <Container style={appStyles.container}>

        <Headers
          IconLeft='arrowleft'
          onPress={() => this.openControlPanel()}

          bgColor='transparent'
          Title='View Order Details'
        />


        <ScrollView>
          <Card style={[appStyles.addBox, { height: 'auto' }, styles.orderBox]}>
            <View style={{ paddingLeft: 10, paddingTop: 10 }}>
              <View style={styles.orderInfo}>
                <Text style={styles.orderId}>
                  Order ID - {orderdetail.orderNumber}
                </Text>
                <Text style={styles.Qty}>
                  {orderdetail.itemCount} Items
                </Text>
                <Text style={styles.dateTime}>
                  {moment(orderdetail.orderDate).format('DD MMM YYYY')}
                </Text>
                <Text style={styles.dateTime}>{moment(orderdetail.orderDate).format('LT')}</Text>
              </View>
              <View style={{ merginRight: Layout.indent, justifyContent: 'center', marginTop: 5 }}>
                <Text style={styles.title}>{orderdetail.firstName}&nbsp;{orderdetail.lastName}</Text>
                <Text style={styles.title}>{Address} </Text>
                <Text style={styles.title}>{orderdetail.mobileNo}</Text>


              </View>
            </View>
            <Grid style={styles.reasonView} >
              <Row style={{ height: 55 }}>
                <Col style={{ justifyContent: 'center' }}>
                  <TouchableOpacity
                    onPress={() => this.dialCall(orderdetail.mobileNo)}
                    style={{ justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'row' }}>
                    <Icon name='call' type='Zocial' style={styles.IconStyle} />
                    <Text style={styles.IconText}>Call Customer</Text>
                  </TouchableOpacity>
                </Col>

                <Col style={{ justifyContent: 'center', }}>
                  <TouchableOpacity

                    onPress={() => Linking.openURL('https://www.google.com/maps/search/?api=1&query=' + Address)}

                    style={{ justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'row' }}>
                    <Icon name='location-on' type='MaterialIcons' style={styles.IconStyle} />
                    <Text style={styles.IconText}>View Map</Text>

                  </TouchableOpacity>
                </Col>
              </Row>

            </Grid>
            {orderitem.map((orderitems, index) => (
              <View>
              {orderitems.itemStatus == 'RET' ? 
              (<View style={{ paddingLeft: Layout.indent - 10, paddingRight: Layout.indent - 5 }}>
                <ListItem icon style={styles.ListItems} noBorder>
                  <Left>
                    <Image
                      style={styles.proImage}
                      source={{ uri: url.imageurl + orderitems.imagePath }}
                    />
                  </Left>
                  <Body style={styles.bodyText}>
                    <Text numberOfLines={2} ellipsizeMode='tail' style={styles.proTitle}>{orderitems.itemName}  {orderitems.quantity}x </Text>
                  </Body>
                  {
                    orderitems.itemStatus == 'PICKED'
                      ? <Text note>PICKED </Text> :
                      <Right style={styles.ListRight}>
                        <TouchableOpacity                          
                          onPress={() => this._pickImage(orderitems.itemId)}
                          style={styles.RigView}>
                          <Icon name='camera' type='FontAwesome' style={styles.camera} />
                        </TouchableOpacity>

                        <View style={[styles.RigView, styles.qtyCol]}>
                          <Text style={styles.qtyText}>Qty</Text>
                          <TextInput                           
                            value={this.state.folder == '' ? '' : this.state.folder}
                            onChangeText={(text) => this.agregarFavoritos(index + 1, text, orderitems.itemId, orderitems.quantity)}
                            style={styles.qtyInput}
                            keyboardType='numeric'
                            maxLength={2} />
                        </View>

                        <CheckBox          
                          style={styles.checkboxStyle}
                          onClick={() => this.checkbox(orderitems.id, orderdetail.id, orderitems.itemName)}
                          checkedImage={<Icon name='check' type='AntDesign' style={{ color: Colors.primary, paddingLeft: 5, paddingTop: 1 }} />}
                          unCheckedImage={<Icon name='check-box-outline-blank' type=' MaterialIcons'
                            style={{ color: 'transparent' }} />}
                          isChecked={this.state.qty.indexOf(orderitems.id) !== -1}
                          
                        />
                      </Right>
                      
                  }

                </ListItem>
              </View>) : null }
              </View>
            ))}
          </Card>

        </ScrollView>
        {/* <View style={styles.doneBtnArea}>
          <Button priamary full style={styles.doneBtn}>
            <TouchableOpacity
              onPress={() => this.pickedUpOrder(orderdetail.orderNumber)}>
              <Text style={styles.btnTextDone}>Picked</Text>
            </TouchableOpacity>
          </Button>
        </View> */}
      </Container>

    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    orderitem: state.order.orderItems,
    orderdetail: state.order.orderdetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(userActions.logoutUser()),
    pickedOrder: (data) => dispatch(orderActions.pickedOrder(data)),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);