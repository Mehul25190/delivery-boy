import React from 'react';
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity, date, Picker,TextInput, ScrollView} from 'react-native';
import _ from 'lodash'; 
import {Screens, Layout, Colors } from '../../constants';
import { Logo, Statusbar, Headers } from '../../components';
import imgs from '../../assets/images';
import {
  Container,
  Content,
  Icon,
  Spinner,
  Button,
  Text,
  Header, Left, Body, Title, Right,Card,Grid,Col,Row,ListItem,Item,Input,label
} from 'native-base';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import {ReturnReason} from '../data/data';
import CheckBox from 'react-native-check-box';
import url from '../../config/api'
import moment from 'moment'

class Delivered extends React.Component {

  constructor(props) {
    super(props);
     this.state = {
      //default value of the date time
      date: '',
       time: '',
  
        checked: true,
    };

  }

   componentDidMount() {
    var that = this;
 var monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May','Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var date = new Date().getDate(); //Current Date
      var month = monthNames[new Date().getMonth()]; //Current Month
    var year = new Date().getFullYear(); //Current Year
   var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes

    that.setState({
      //Setting the value of the date time
      date:   date + ' ' + month + ' ' + year ,
      time:   hours + ':' + min 
    });
  }
    openControlPanel = () => {
      this.props.navigation.goBack(); // open drawer
    };

    dateFormate(date){
   var monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May','Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let orderDate = new Date(date);
  let getDate=orderDate.getDate() + " "+ monthNames[orderDate.getMonth()] +" "+orderDate.getFullYear();
  return getDate;
  }
  
   onPressSubmit = item => {
    this.props.navigation.navigate('Confirmation', { item });
    };
  render(){
    const { navigation, orderitem, orderdetail } = this.props;

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
                <Text style={styles.title}>{orderdetail.aptNo},{orderdetail.buildingName},{orderdetail.areaName},{orderdetail.cityName},{orderdetail.zipcode},{orderdetail.state} </Text>
                <Text style={styles.title}>{orderdetail.mobileNo}</Text>


              </View>
            </View>
            <Grid style={styles.reasonView} >
              <Row style={{ height: 55 }}>
                <Col style={{ justifyContent: 'center' }}>
                  <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'row' }}>
                    <Icon name='call' type='Zocial' style={styles.IconStyle} />
                    <Text style={styles.IconText}>Call Customer</Text>
                  </TouchableOpacity>
                </Col>

                <Col style={{ justifyContent: 'center', }}>
                  <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'row' }}>
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
                    <Image
                      style={styles.proImage}
                      source={{ uri: url.imageurl+orderitems.imagePath }}
                    />
                  </Left>
                  <Body style={styles.bodyText}>
                    <Text numberOfLines={1} style={styles.proTitle}>{orderitems.itemName}</Text>

                    {/* <Text style={styles.proTime}>{getItem.time}</Text> */}
                  </Body>
                  <Right style={styles.ListRight}>
                    <View style={styles.RigView}>
                      <Icon name='camera' type='FontAwesome' style={styles.camera} />
                    </View>

                    <View style={[styles.RigView, styles.qtyCol]}>
                      <Text style={styles.qtyText}>Qty</Text>
                      <TextInput
                        style={styles.qtyInput}
                        value={orderitems.quantity}
                        keyboardType='numeric'
                        maxLength={2} />
                    </View>

                    <CheckBox
                      style={styles.checkboxStyle}
                      onClick={() => {
                        this.setState({
                          isChecked: !this.state.isChecked
                        })
                      }}
                      checkedImage={<Icon name='check' type='AntDesign' style={{ color: Colors.primary, paddingLeft: 5, paddingTop: 1 }} />}
                      unCheckedImage={<Icon name='check-box-outline-blank' type=' MaterialIcons'
                        style={{ color: 'transparent' }} />}
                      isChecked={this.state.isChecked}
                    />
                  </Right>
                </ListItem>
                {/*   <ListItem icon style={styles.ListItems} noBorder>
                <Left>
                  <Image style={styles.proImage} source={orderitems.imagePath} />
                </Left>
                <Body style={styles.bodyText}>
                  <Text numberOfLines={1} style={styles.proTitle}>{orderitems.itemName}</Text>
                   <Text style={styles.proTime}>{orderitems.time}</Text> 
                </Body>
                <Right style={styles.ListRight}>
                  <View style={styles.RigView}>
                    <Icon name='camera' type='FontAwesome' style={styles.camera} />
                  </View>
                  <View style={[styles.RigView, styles.qtyCol]}>
                    <Text style={styles.qtyText}>Qty</Text>

                    <TextInput style={styles.qtyInput}
                      keyboardType='numeric'
                      maxLength={2} value={10} />
                  </View>

                  <CheckBox
                    style={styles.checkboxStyle}
                    onClick={() => {
                      this.setState({
                        Checked: !this.state.Checked
                      })
                    }}
                    checkedImage={<Icon name='check' type='AntDesign' style={{ color: Colors.primary, paddingLeft: 5, paddingTop: 1 }} />}
                    unCheckedImage={<Icon name='check-box-outline-blank' type=' MaterialIcons' style={{ color: 'transparent' }} />}
                    isChecked={this.state.Checked}
                  />
                </Right>
              </ListItem>
              */}
              </View>
            ))}
          </Card>
        
        </ScrollView>
       <View style={styles.doneBtnArea}>
       <Button priamary full style={styles.doneBtn}>
        <TouchableOpacity onPress={()=>this.onPressSubmit('OrderReturnDetail')}>
        <Text style={styles.btnTextDone}>Delivered</Text>
        </TouchableOpacity>
        </Button>
       </View>
     
         
      
         
        
       
        
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
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Delivered);