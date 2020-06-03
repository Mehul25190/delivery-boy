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

class ProductList extends React.Component {

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
    const { navigation } = this.props;
    const getItem = navigation.getParam('item');

    return (
      <Container style={appStyles.container}>

           <Headers
              IconLeft='arrowleft'
              onPress={() => this.openControlPanel()}
             
              bgColor='transparent'
              Title='View Order Details'
             />
      
   
       <ScrollView>
        <Card style={[appStyles.addBox,{height:'auto'},styles.orderBox]}>
          <View style={{paddingLeft:10, paddingTop:10}}>
              <View style={styles.orderInfo}>
                <Text style={styles.orderId}>
                Order ID - {getItem.orderId}
                </Text>
                <Text style={styles.Qty}>
                 {getItem.quantity} Items
                </Text>
                <Text style={styles.dateTime}>
                 {this.dateFormate(getItem.date)} 
                </Text>
                <Text style={styles.dateTime}>{getItem.time}</Text>
              </View>
              <View style={{merginRight:Layout.indent, justifyContent:'center', marginTop:5}}>
                <Text style={styles.title}>{getItem.name}&nbsp;{getItem.surname}</Text>
                <Text style={styles.title}>{getItem.location}</Text>
                <Text style={styles.title}>{getItem.phone}</Text>

            
               </View>
          </View>
          <Grid style={styles.reasonView} >
               <Row style={{height:55}}>
                <Col style={{justifyContent:'center'}}>
                  <TouchableOpacity style={{justifyContent:'center', alignItems:'flex-start', flexDirection:'row'}}>
                    <Icon name='call' type='Zocial' style={styles.IconStyle} />
                    <Text style={styles.IconText}>Call Customer</Text>
                  </TouchableOpacity>
                </Col>
                  
                 <Col style={{justifyContent:'center',}}>
                 <TouchableOpacity style={{justifyContent:'center', alignItems:'flex-start', flexDirection:'row'}}>
                  <Icon name='location-on' type='MaterialIcons' style={styles.IconStyle} />
                    <Text style={styles.IconText}>View Map</Text>
                    
                  </TouchableOpacity>
                </Col>
               </Row>
                
          </Grid>
         
          <View style={{paddingLeft:Layout.indent-10,paddingRight:Layout.indent-5}}>
            <ListItem icon style={styles.ListItems}>
            <Left>
               <Image style={styles.proImage} source={getItem.image} />
            </Left>
            <Body style={styles.bodyText}>
              <Text numberOfLines={1}  style={styles.proTitle}>{getItem.proName}</Text>
              <Text style={styles.proTime}>{getItem.time}</Text>
            </Body>
            <Right  style={styles.ListRight}>
            <View style={styles.RigView}>
                        <Icon name='camera' type='FontAwesome' style={styles.camera} />
            </View>  

            <View style={[styles.RigView,styles.qtyCol]}>
            <Text style={styles.qtyText}>Qty</Text>
                <TextInput style={styles.qtyInput}
                 keyboardType='numeric'
                    maxLength = {2} value={10}  />
            </View> 
         
            <CheckBox
              style={styles.checkboxStyle}
                onClick={()=>{
                this.setState({
                isChecked:!this.state.isChecked
                })
              }}
              checkedImage={<Icon name='check' type='AntDesign' style={{color:Colors.primary, paddingLeft:5,paddingTop:1}} />}
              unCheckedImage={<Icon name='check-box-outline-blank' type=' MaterialIcons'
              style={{color:'transparent'}} /> }
              isChecked={this.state.isChecked} 
             />
            </Right>
          </ListItem>
            <ListItem icon style={styles.ListItems} noBorder>
            <Left>
               <Image style={styles.proImage} source={getItem.image} />
            </Left>
            <Body style={styles.bodyText}>
              <Text numberOfLines={1}  style={styles.proTitle}>{getItem.proName}</Text>
                    <Text style={styles.proTime}>{getItem.time}</Text>
            </Body>
            <Right  style={styles.ListRight}>
            <View style={styles.RigView}>
                        <Icon name='camera' type='FontAwesome' style={styles.camera} />
              </View>     
              <View style={[styles.RigView,styles.qtyCol]}>
              <Text style={styles.qtyText}>Qty</Text>

              <TextInput style={styles.qtyInput}
                   keyboardType='numeric'
                      maxLength = {2} value={10}  />
              </View> 
                 
                <CheckBox
                style={styles.checkboxStyle}
                  onClick={()=>{
                  this.setState({
                  Checked:!this.state.Checked
                  })
                }}
                checkedImage={<Icon name='check' type='AntDesign' style={{color:Colors.primary, paddingLeft:5,paddingTop:1}} />}
                unCheckedImage={<Icon name='check-box-outline-blank' type=' MaterialIcons' style={{color:'transparent'}} /> }
                isChecked={this.state.Checked} 
               />
            </Right>
          </ListItem>
          </View>
        </Card>
        
        </ScrollView>
       <View style={styles.doneBtnArea}>
       <Button priamary full style={styles.doneBtn}>
        <TouchableOpacity onPress={()=>this.onPressSubmit('OrderReturnDetail')}>
        <Text style={styles.btnTextDone}>Picked</Text>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      logout: () => dispatch(userActions.logoutUser()),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);