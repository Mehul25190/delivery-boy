import React from 'react';
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity, Linking, TextInput, ScrollView, Alert } from 'react-native';
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
  Header, Left, Body, Title, Right, Card, Grid, Col, Row, ListItem, Picker, Input, label
} from 'native-base';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import * as orderActions from "../../actions/Order";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import { ReturnReason } from '../data/data';
import CheckBox from 'react-native-check-box';
import url from '../../config/api'
import moment from 'moment'
import { showToast } from '../../utils/common';

class Delivered extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      //default value of the date time
      date: '',
      time: '',
      selected: "NULL",
      isChecked: false,
      recivedby: '',
      qty: '',
      changeReturn: '',
      collectCash: ''
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
  }
  openControlPanel = () => {
    this.props.navigation.goBack(); // open drawer
  };

  dateFormate(date) {
    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let orderDate = new Date(date);
    let getDate = orderDate.getDate() + " " + monthNames[orderDate.getMonth()] + " " + orderDate.getFullYear();
    return getDate;
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


  onPressSubmit(id, status) {
    if (this.state.selected == 'NULL') {
      return showToast("Please Select Status Field", "danger")
    }
    if (this.state.selected == 'DEL') {
      if (this.state.recivedby == '') {
        return showToast("Please Select Recived by", "danger")
      }
    }
    this.props.updatestatus(id, this.state.selected, this.state.recivedby).then(res => {
      if (res.status == "success") {

        this.props.orderlist(this.props.user[0].id, status).then(res => {

          if (res.status == "success") {
            this.props.navigation.goBack()
            this.setState({
              selected: "NULL",
              isChecked: false,
              recivedby: ''
            })

          }
        })
      }
    })
  };

  onValueChange(value: string) {
    this.setState({
      selected: value,

    });
  }

  changeCollectCash(value, orderAmount){
    var returnAmount = value - orderAmount;
    if(returnAmount >= 0){
      this.setState({ changeReturn: ""+returnAmount.toFixed(2)+"" })
    }else{
      this.setState({ changeReturn: '' }); 
    }
    //console.log (test)
    this.setState({ collectCash: value })
  }

  render() {
    const { navigation, orderitem, orderdetail } = this.props;
    var Address = orderdetail.aptNo + ',' + orderdetail.buildingName + ',' + orderdetail.areaName + ',' + orderdetail.cityName + ',' + orderdetail.zipcode + ',' + orderdetail.state
console.log('rerawrwr', orderdetail)
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
                  Order ID - {orderdetail.orderNumber}{orderdetail.orderStatus}
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
                <Text style={styles.title}>{orderdetail.aptNo},{orderdetail.buildingName},{orderdetail.areaName},{orderdetail.cityName},{orderdetail.zipcode},{orderdetail.state} </Text>
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
            {orderitem.map((orderitems, key) => (

              <View style={{ paddingLeft: Layout.indent - 10, paddingRight: Layout.indent - 5 }}>
                <ListItem icon style={styles.ListItems} noBorder>
                  <Left>
                    {/* <Image
                      style={styles.proImage}
                      source={{ uri: url.imageurl + orderitems.imagePath }}
                    /> */}
                  </Left>
                  <Body style={styles.bodyText}>
                    <Text numberOfLines={1} style={styles.proTitle}>Item {key+1}</Text>


                  </Body> 
                  <Right style={styles.ListRight}>


                    <View style={[styles.RigView, styles.qtyCol]}>
                      <Text style={styles.qtyText}>Qty</Text>
                      <Text style={styles.qtyInput}>{orderitems.quantity}</Text>
                    </View>


                  </Right>
                </ListItem>
              </View>
            ))}
          </Card>


          <View style={{marginBottom:20}}>
            <Picker
              headerStyle={{ backgroundColor: Colors.primary }}
              mode="dropdown"
              iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: '#fff', fontSize: 25 }} />}
              textStyle={{ color: "#fff", fontSize: 18 }}
              style={{ backgroundColor: Colors.primary, marginLeft: 10, marginRight: 10, borderRadius: 15, top: 10, color: '#fff', }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="Select Status" value="NULL" />
              <Picker.Item label="In Process" value="INP" />
              <Picker.Item label="Assign back to admin" value="ASGNBACK" />
              <Picker.Item label="Delivered" value="DEL" />
              <Picker.Item label="Not delivered" value="NOTDEL" />
            </Picker>
          </View>

          {orderdetail.paymentMode == 'COD'  ?
           (<View style={{ marginLeft: 10, marginRight: 10}}>
          <Row style={{ justifyContent:'center', }}>
                <Col >
                <Text style={{ textAlign:'center'}}>Collect Cash</Text>
                  <TouchableOpacity
                    onPress={() => this.dialCall(orderdetail.mobileNo)} style={styles.collectCash}>
                    <TextInput style={styles.CallText}
                  placeholder="AED 100"
                  placeholderTextColor='#ffffff'
                  autoCapitalize="none"
                  keyboardType={'numeric'}
                  onChangeText={(value) => this.changeCollectCash(value, orderdetail.paymentAmount)} />
                  </TouchableOpacity>
                </Col>

                <Col>
                <Text style={{ textAlign:'center'}}>Change Return</Text>
                  <TouchableOpacity
                    onPress={() => Linking.openURL('https://www.google.com/maps/search/?api=1&query=' + Address)} style={styles.collectReturn} >
                    <TextInput style={styles.CallText}
                  placeholder="AED 1"
                  placeholderTextColor='#ffffff'
                  autoCapitalize="none"
                  //keyboardType={'numeric'}
                  //onChangeText = {this.state.changeReturn}
                  value={this.state.changeReturn}
                  //onChangeText={(text) => this.setState({ changeReturn: text })} 
                  />
                  </TouchableOpacity>
                </Col>
              </Row>
        </View>) : null }

          {
            this.state.selected == 'DEL' ?
              <View style={{ marginTop: 15, marginStart: 15, borderRadius: 15, borderColor: Colors.primary, borderWidth: 1, padding: 15, marginEnd: 15, flexDirection: 'row' }}>
                <Text>Recived by :</Text>
                <TextInput
                  style={{ marginStart: 10, borderBottomWidth: 1, borderBottomColor: Colors.primary, width: Layout.indent * 11, top: -3 }}

                  placeholder="Recived by"
                  placeholderTextColor='#000'
                  autoCapitalize="none"
                  onChangeText={(text) => this.setState({ recivedby: text })} />
              </View>

              : null
          }

       
        
        <View style={styles.doneBtnArea}>
          <Button priamary full style={styles.doneBtn}>
            <TouchableOpacity onPress={() => this.onPressSubmit(orderdetail.id, orderdetail.orderStatus)}>
              <Text style={styles.btnTextDone}>Save</Text>
            </TouchableOpacity>
          </Button>
        </View>
        </ScrollView>

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
    updatestatus: (id, status) => dispatch(orderActions.updatestatus({
      'orderId': id,
      'status': status,
    })),
    orderlist: (id, status) => dispatch(orderActions.orderlist({
      'deliveryBoyId': id,
      'orderStatus': status,
    })),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Delivered);